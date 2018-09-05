package com.ghotel.oss.console.core.listener;

import static com.ghotel.oss.console.core.job.util.JobUtil.getProperties;
import static org.quartz.CronScheduleBuilder.cronSchedule;
import static org.quartz.JobBuilder.newJob;
import static org.quartz.TriggerBuilder.newTrigger;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.quartz.JobDetail;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.quartz.Trigger;
import org.quartz.impl.StdSchedulerFactory;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.ghotel.oss.console.core.job.handler.HeartbeatMonitorJob;
import com.ghotel.oss.console.modules.scheduler.service.SchedulerService;

/**
 * @author iBuilder
 * 
 * @description 心跳监控任务 2017-6-28
 */
public class HeartbeatMonitorListener implements ServletContextListener {
	// 获取spring注入的bean对象
	private WebApplicationContext springContext;
	private SchedulerService service;

	private static final Logger logger = LoggerFactory.getLogger(HeartbeatMonitorListener.class);
	private static final SchedulerFactory gSchedulerFactory = new StdSchedulerFactory();
	private static Scheduler sched = null;
	static {
		try {
			sched = gSchedulerFactory.getScheduler();
			sched.start();
		} catch (SchedulerException e) {
			logger.error("", e);
		}
	}

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		try {
			springContext = WebApplicationContextUtils.getWebApplicationContext(sce.getServletContext());
			service = (SchedulerService) springContext.getBean("SchedulerService");

			String jobName = "HeartbeatMonitorJob";
			String jobGroup = "HeartbeatMonitorJobGroup";
			String triggerGroup = "HeartbeatMonitorTriggerGroup";
			JobKey jobKey = new JobKey(jobName, jobGroup);
			String schedule = getProperties().getProperty("heartbeat_monitor_schedule").toString();

			// 定时任务实现
			JobDetail jobDetail = newJob(HeartbeatMonitorJob.class).withIdentity(jobKey).build();
			jobDetail.getJobDataMap().put("SchedulerService", service);
			// 触发器
			Trigger trigger = newTrigger().withIdentity(jobName + "_trigger", triggerGroup)
					.withSchedule(cronSchedule(schedule)).forJob(jobKey).build();
			sched.scheduleJob(jobDetail, trigger);
			// 启动
			if (sched.isShutdown()) {
				sched.start();
				logger.info("心跳监控任务实例【" + jobName + "】已经启动!");
			}
		} catch (Exception e) {
			logger.error("", e);
		}
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		if (sched != null) {
			try {
				sched.shutdown();
				logger.info("心跳监控任务停止");
			} catch (SchedulerException e) {
				logger.error("", e);
			}
		}
	}

}
