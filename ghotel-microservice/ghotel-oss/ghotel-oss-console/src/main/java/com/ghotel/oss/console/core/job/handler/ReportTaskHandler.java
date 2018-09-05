package com.ghotel.oss.console.core.job.handler;

import static com.ghotel.oss.console.core.job.util.JobUtil.getBeanFactry;
import static com.ghotel.oss.console.core.job.util.JobUtil.getProperties;
import static com.ghotel.oss.console.core.job.util.JobUtil.updateStatus;

import java.io.File;
import java.io.PrintWriter;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.quartz.Job;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ghotel.oss.console.core.job.bean.ReportGenerationInfoBean;
import com.ghotel.oss.console.core.job.bean.ResultBean;
import com.ghotel.oss.console.core.job.bean.TaskBean;
import com.ghotel.oss.console.core.job.dao.SchedulerJobMapper;
import com.ghotel.oss.console.core.job.proceedor.IReportTaskProceedor;
import com.ghotel.oss.console.core.utils.JacksonJsonUtil;
import com.ghotel.oss.console.core.utils.SystemHelper;
import com.ghotel.oss.console.modules.scheduler.bean.JobInstanceBean;

public class ReportTaskHandler extends AbstractHandler implements Job {

	public static final String JOB_TYPE = "report_New";

	private static final Logger logger = LoggerFactory.getLogger("job");

	private List<String> logSet = new ArrayList<String>();

	@Override
	public void execute(JobInstanceBean instance) throws JobExecutionException {

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		SimpleDateFormat dateF = new SimpleDateFormat("yyyy-MM-dd");
		Date now = new Date();
		String localIp = SystemHelper.getIp();
		try {
			int maxRecordLimit = Integer
					.parseInt(getProperties().getProperty("record_no_of_report_schedule_job").trim());
			String fileDir = getProperties().getProperty("report_storing_tem_dir").toString();
			String dowloadUrl = getProperties().getProperty("report_download_url").toString();
			String todatStr = dateF.format(now);
			File dir = new File(fileDir + File.separator + todatStr);
			if (!dir.exists()) {
				dir.mkdirs();
				logger.info("新建的文件目录为:" + dir.getAbsolutePath());
			}
			PrintWriter logFio = null;
			SchedulerJobMapper jobMapper = (SchedulerJobMapper) (getBeanFactry().getBean("jobMapper"));
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("jobType", JOB_TYPE);
			params.put("start", 0);
			params.put("end", maxRecordLimit);
			int executingTaskCount = jobMapper.selectExecutingTaskCount(params);
			// if there is a task being proceeding, then skip;
			if (executingTaskCount > 0) {
				logger.info("存在正在运行的任务，不能同时执行多个任务！");
				return;
			}
			List<TaskBean> taskList = jobMapper.selectAvailabelTask(params);
			logger.info("可运行的任务数目是：" + taskList.size());
			if (taskList != null && taskList.size() > 0) {
				for (TaskBean task : taskList) {
					String startStr = "********************开始执行报表生成调度工作,开始时间为" + sdf.format(now)
							+ "******************* ";
					logger.info(startStr);
					logSet.add(startStr);
					int status = 0;
					String reason = "";
					String fileName = "";
					task.setJobInstanceId(instance.getJobInstanceId());
					try {
						// 更新任务状态为进行中
						int result = updateStatus(task, jobMapper, 0, 1, null,
								new Timestamp(System.currentTimeMillis()));
						// 更新失败，则跳到下一个任务
						if (result == 0) {
							logger.info(task.getTaskCreateBy() + "的任务" + task.getTaskName() + "已经被完成！");
							continue;
						}
						final ReportGenerationInfoBean bean = (ReportGenerationInfoBean) JacksonJsonUtil
								.jsonToBean(task.getTaskParams(), ReportGenerationInfoBean.class);
						IReportTaskProceedor proceedor = (IReportTaskProceedor) getBeanFactry()
								.getBean(bean.getProceedor());
						fileName = proceedor.proceed(bean, dir.getAbsolutePath());
						// 更新任务状态为完成
						updateStatus(task, jobMapper, 1, 2, new Timestamp(System.currentTimeMillis()), null);
						logger.info("********************完成报表生成调度工作,结束时间为" + sdf.format(new Date())
								+ "******************* ");
					} catch (Exception e) {
						logger.error("", e);
						// 删除原来的文件
						new File(dir.getAbsolutePath() + File.separator + fileName).delete();
						// e.printStackTrace();
						status = 1;
						if (e.getCause() != null) {
							reason = e.getCause().getMessage();
						}

						// 更新任务状态问失败
						updateStatus(task, jobMapper, 1, -1, new Timestamp(System.currentTimeMillis()), null);
						String errorStr = task.getTaskCreateBy() + "的任务" + task.getTaskName() + "失败了, 原因是" + reason;
						fileName = task.getTaskCreateBy() + "_" + System.currentTimeMillis() + "_error.log";
						logger.info(errorStr);
						logSet.add(errorStr);
						String endStr = "********************完成报表生成调度工作,结束时间为" + sdf.format(new Date())
								+ "******************* ";
						logger.info(endStr);
						logSet.add(endStr);
						logFio = new PrintWriter(new File(dir.getAbsolutePath() + File.separator + fileName));
						for (String line : logSet) {
							logFio.println(line);
						}
					} finally {
						if (logFio != null) {
							logFio.flush();
							logFio.close();
						}
						ResultBean result = new ResultBean();
						result.setFailedReaon(reason);
						result.setResultId(UUID.randomUUID().toString().replaceAll("-", ""));
						result.setTaskId(task.getTaskId());
						result.setStatus(status);
						if (status != 1) {
							result.setTaskExecutionResultDownloadUrl(dowloadUrl.replace("{fileName}", fileName)
									.replace("{date}", todatStr).replace("{ip}", localIp));
						}
						jobMapper.addTaskResult(result);
					}

				}
				// System.gc();
			} else {
				logger.info("当前可执行的任务数为0!");
			}
		} catch (Exception e1) {
			logger.error("执行调度失败，原因是:" + e1);
			throw new JobExecutionException("执行调度失败，原因是:" + e1.getMessage());
		} finally {

		}

	}

}
