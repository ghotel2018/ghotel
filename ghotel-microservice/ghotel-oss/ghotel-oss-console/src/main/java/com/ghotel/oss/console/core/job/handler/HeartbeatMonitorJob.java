package com.ghotel.oss.console.core.job.handler;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.quartz.Job;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.ghotel.oss.console.core.job.util.JobUtil;
import com.ghotel.oss.console.modules.scheduler.bean.JobInstanceBean;
import com.ghotel.oss.console.modules.scheduler.bean.JobInstanceSearchBean;
import com.ghotel.oss.console.modules.scheduler.service.SchedulerService;
import com.ghotel.oss.console.modules.scheduler.utils.JobInstanceConstant;

/**
 * @author iBuilder
 * 
 * @description 心跳监控任务 2017-6-30
 */
public class HeartbeatMonitorJob implements Job {
	private static final Logger logger = LoggerFactory.getLogger(HeartbeatMonitorJob.class);
	@Autowired
	@Qualifier(value = "SchedulerService")
	SchedulerService service;

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		try {
			JobDataMap dataMap = context.getJobDetail().getJobDataMap();
			SchedulerService service = (SchedulerService) dataMap.get("SchedulerService");
			JobInstanceSearchBean searchBean = new JobInstanceSearchBean();
			searchBean.setEnd(9999);
			searchBean.setStart(1);
			List<JobInstanceBean> list = (List<JobInstanceBean>) service.selectJobInstanceByIpAndPort(searchBean);
			Set<String> set = getIpAndPortConllection(list);
			for (String value : set) {
				for (JobInstanceBean bean : list) {
					String jobId = bean.getJobId();
					String ipAddr = bean.getIpAddr();
					int port = bean.getPort();
					String inst = jobId + ":" + ipAddr + ":" + port;
					if (value.equals(inst)) {
						updateHearBeatStatus(bean, service);
						break; // 同一个服务器实例只更新一次状态
					}
				}
			}
		} catch (Exception e) {
			logger.error("face error:", e);
		}
	}

	/**
	 * 按"yyyy-MM-dd hh:mm:ss"格式进行日期格式转化
	 * 
	 * @param date
	 * @return
	 */
	private static String getDate2Str(Date date) {
		DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		// sdf.setTimeZone(TimeZone.getTimeZone("ETC/GMT-8"));
		String dateStr = sdf.format(date);
		return dateStr;
	}

	/*
	 * 实例去重
	 */
	private Set<String> getIpAndPortConllection(List<JobInstanceBean> list) {
		Set<String> rtnSet = null;
		if (list != null) {
			rtnSet = new HashSet<String>();
			for (JobInstanceBean bean : list) {
				if (bean.getStatus() == JobInstanceConstant.JOB_INSTANCE_STATUS_RUNNING) {
					String jobId = bean.getJobId();
					String ipAddr = bean.getIpAddr();
					int port = bean.getPort();
					rtnSet.add(jobId + ":" + ipAddr + ":" + port);
				}
			}
		}
		return rtnSet;
	}

	/*
	 * 更新时间戳，健康状态码，错误信息，异常次数等心跳监测信息
	 */
	private void updateHearBeatStatus(JobInstanceBean bean, SchedulerService service) {
		try {
			String errMsg = "";
			// TimeZone tz = TimeZone.getTimeZone("ETC/GMT-8");
			// TimeZone.setDefault(tz);
			Date thisDate = new Date();
			String timeStamp = getDate2Str(thisDate);
			int errNum = bean.getErrNum();

			String lastTimeStamp = bean.getLastTimeStamp();
			bean.setTimeStamp(timeStamp);
			bean.setErrMsg("");
			if (lastTimeStamp != null && lastTimeStamp != "") {
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				Date bDate = sdf.parse(lastTimeStamp);
				if (bDate != null) {
					long difftime = thisDate.getTime() - bDate.getTime();
					long threshold = Long
							.parseLong(JobUtil.getProperties().getProperty("heartbeat_monitor_threshold").trim());
					if (difftime <= threshold) {
						bean.setErrNum(0);
						bean.setHealthStatus(1);
						bean.setErrMsg("");
					} else {
						bean.setErrNum(errNum + 1);
						bean.setHealthStatus(-1);
						errMsg = "服务器IP:" + bean.getIpAddr() + " 端口:" + bean.getPort() + " 最后一次心跳时间:"
								+ bean.getLastTimeStamp() + " 心跳检测时间:" + bean.getTimeStamp() + " 健康状态码:"
								+ bean.getHealthStatus() + " 异常次数:" + bean.getErrNum();
						bean.setErrMsg(errMsg);
						if (logger.isDebugEnabled()) {
							logger.debug(errMsg);
						}

					}
				} else {
					bean.setErrNum(errNum + 1);
					bean.setHealthStatus(-1);
					errMsg = "获取数据库中的上次时间戳字段值的数据格式错误！";
					bean.setErrMsg(errMsg);
					logger.error(errMsg);
				}
			} else {
				bean.setErrNum(0);
				bean.setHealthStatus(0);
				bean.setErrMsg("");
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		service.updateHeartBeatInfoByIpAndPort(bean);
		if (logger.isDebugEnabled()) {
			logger.debug("服务器IP:" + bean.getIpAddr() + " 端口:" + bean.getPort() + " 最后一次心跳时间:" + bean.getLastTimeStamp()
					+ " 心跳检测时间:" + bean.getTimeStamp() + " 健康状态码:" + bean.getHealthStatus() + " 异常次数:"
					+ bean.getErrNum());
		}

	}
}
