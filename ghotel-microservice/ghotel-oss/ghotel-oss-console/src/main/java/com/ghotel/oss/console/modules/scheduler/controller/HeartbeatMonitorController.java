package com.ghotel.oss.console.modules.scheduler.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ghotel.oss.console.modules.scheduler.bean.JobInstanceBean;
import com.ghotel.oss.console.modules.scheduler.service.SchedulerService;

/**
 * @author iBuilder
 * 
 * @description 心跳监控任务 2017-6-30
 */
@Controller
@RequestMapping("/authorized/heartBeatMonitor")
public class HeartbeatMonitorController {
	private static final Logger logger = LoggerFactory.getLogger(HeartbeatMonitorController.class);
	@Autowired
	SchedulerService schedulerService;

	// private static String HEARTBEAT_MAP_KEY = "CMC-HEARTBEAT-MAP-KEY"; //
	// 调度实例时间戳
	// private static String SCHEDULE_INSTANCE = "SCHEDULE-INSTANCE"; // 调度实例
	// private static String SCHEDULE_INSTANCE_STATUS =
	// "SCHEDULE-INSTANCE-STATUS"; // 调度实例状态

	// @RequestMapping("access")
	// public @ResponseBody String heartBeatMonitor(HttpServletRequest request,
	// HttpServletResponse response) {
	// String strIP = request.getParameter("ip");
	// String strPort = request.getParameter("port");
	// String instanceName = SCHEDULE_INSTANCE + strIP + "-" + strPort;
	// TimeZone tz = TimeZone.getTimeZone("ETC/GMT-8");
	// TimeZone.setDefault(tz);
	// Map<String, String> map = new HashMap<String, String>();
	// String timesTamp = getDate2Str(new Date());
	// map.put(instanceName, timesTamp);
	// jedisCluster.hmset(HEARTBEAT_MAP_KEY, map);
	// String outmessage = " heartBeatMonitor date：" + timesTamp;
	// logger.info(instanceName + outmessage);
	//
	// return "SUCCESS";
	// }

	@RequestMapping("access")
	public @ResponseBody String heartBeatMonitor(HttpServletRequest request, HttpServletResponse response) {
		// TimeZone tz = TimeZone.getTimeZone("ETC/GMT-8");
		// TimeZone.setDefault(tz);
		String timeStamp = getDate2Str(new Date());
		String outmessage = " heartBeatMonitor date:" + timeStamp;

		String ipAddr = request.getParameter("ip");
		String port = request.getParameter("port");
		JobInstanceBean jobInstanceBean = new JobInstanceBean();
		jobInstanceBean.setIpAddr(ipAddr);
		jobInstanceBean.setPort(Integer.parseInt(port));
		jobInstanceBean.setLastTimeStamp(timeStamp);
		schedulerService.updateLastTimeStampByIpAndPort(jobInstanceBean);
		logger.info("服务器IP:" + ipAddr + " Port:" + port + " outmessage:" + outmessage);

		return "SUCCESS";
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

	public static void main(String[] args) throws Exception {
		// String key = "a";
		// Map<String, String> map = new HashMap<String, String>();
		// TimeZone tz = TimeZone.getTimeZone("ETC/GMT-8");
		// TimeZone.setDefault(tz);
		// String timesTamp = getDate2Str(new Date());
		// map.put(key, timesTamp);
		// System.out.println(map);
		// Thread.sleep(1000);
		// timesTamp = getDate2Str(new Date());
		// map.put(key, timesTamp);
		// System.out.println(map);

		String dateString = "2017-07-11 11:33:04";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = sdf.parse(dateString);
		System.out.println(date);
		System.out.println(new Date());
	}
}
