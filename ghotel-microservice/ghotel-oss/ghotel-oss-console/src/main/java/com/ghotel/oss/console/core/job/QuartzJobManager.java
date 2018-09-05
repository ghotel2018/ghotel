package com.ghotel.oss.console.core.job;

import static org.quartz.CronScheduleBuilder.cronSchedule;
import static org.quartz.JobBuilder.newJob;
import static org.quartz.TriggerBuilder.newTrigger;

import org.quartz.CronTrigger;
import org.quartz.Job;
import org.quartz.JobDetail;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.quartz.Trigger;
import org.quartz.TriggerKey;
import org.quartz.impl.StdSchedulerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @Description: 定时任务管理类
 * 
 * @ClassName: QuartzManager
 */
public class QuartzJobManager {

	private static final Logger logger = LoggerFactory.getLogger(QuartzJobManager.class);

	private static final SchedulerFactory gSchedulerFactory = new StdSchedulerFactory();
	private static Scheduler sched = null;
	private static String JOB_GROUP_NAME = "CMC_JOBGROUP";
	private static String TRIGGER_GROUP_NAME = "CMC_TRIGGERGROUP";
	private static String SCHEDULER_NAME = "CMC_SCHEDULER";

	private static String TRIGGER_KEY_SUFFIX = "_trigger";

	static {
		try {

			sched = gSchedulerFactory.getScheduler();
			sched.start();
			// sched =gSchedulerFactory.getScheduler(SCHEDULER_NAME);
		} catch (SchedulerException e) {
			logger.error("", e);
		}
	}

	/**
	 * @Description: 添加一个定时任务，使用默认的任务组名，触发器名，触发器组名
	 * 
	 * @param jobName
	 *            任务名
	 * @param cls
	 *            任务
	 * @param time
	 *            时间设置，参考quartz说明文档
	 * 
	 * @Title: QuartzManager.java
	 */
	public static void addJob(String jobName, Class<? extends Job> cls, String time) {
		try {
			// Scheduler sched = gSchedulerFactory.getScheduler();
			// JobDetail jobDetail = new JobDetail(jobName, JOB_GROUP_NAME, cls);//
			// 任务名，任务组，任务执行类
			JobKey jobKey = new JobKey(jobName, JOB_GROUP_NAME);
			JobDetail jobDetail = newJob(cls).withIdentity(jobKey).build();
			// 触发器
			// CronTrigger trigger = new CronTrigger(jobName, TRIGGER_GROUP_NAME);//
			// 触发器名,触发器组
			// trigger.setCronExpression(time);// 触发器时间设定
			Trigger trigger = newTrigger().withIdentity(jobName + "_trigger", TRIGGER_GROUP_NAME)
					.withSchedule(cronSchedule(time)).forJob(jobKey).build();
			// sched.addJob(jobDetail, false);
			sched.scheduleJob(jobDetail, trigger);
			// 启动
			if (sched.isShutdown()) {
				sched.start();
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * @Description: 添加一个定时任务
	 * 
	 * @param jobName
	 *            任务名
	 * @param jobGroupName
	 *            任务组名
	 * @param triggerName
	 *            触发器名
	 * @param triggerGroupName
	 *            触发器组名
	 * @param jobClass
	 *            任务
	 * @param time
	 *            时间设置，参考quartz说明文档
	 * 
	 */
	public static void addJob(String jobName, String jobGroupName, String triggerName, String triggerGroupName,
			Class<? extends Job> jobClass, String time) {
		try {
			JobKey jobKey = new JobKey(jobName, JOB_GROUP_NAME);
			JobDetail jobDetail = newJob(jobClass).withIdentity(jobKey).build();// 任务名，任务组，任务执行类
			// 触发器
			Trigger trigger = newTrigger().withIdentity(jobName + "_trigger", TRIGGER_GROUP_NAME)
					.withSchedule(cronSchedule(time)).forJob(jobKey).build();
			// sched.addJob(jobDetail, false);
			sched.scheduleJob(jobDetail, trigger);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * @Description: 修改一个任务的触发时间(使用默认的任务组名，触发器名，触发器组名)
	 * 
	 * @param jobName
	 * @param time
	 * 
	 * @Title: QuartzManager.java
	 */
	public static void modifyJobTime(String jobName, String time) {
		try {
			// Scheduler sched = gSchedulerFactory.getScheduler();
			TriggerKey triggerKey = new TriggerKey(jobName + TRIGGER_KEY_SUFFIX, TRIGGER_GROUP_NAME);
			JobKey jobKey = new JobKey(jobName, JOB_GROUP_NAME);
			CronTrigger trigger = (CronTrigger) sched.getTrigger(triggerKey);
			if (trigger == null) {
				return;
			}

			String oldTime = trigger.getCronExpression();
			if (!oldTime.equalsIgnoreCase(time)) {
				sched.pauseTrigger(triggerKey);
				// 修改时间
				sched.unscheduleJob(triggerKey);
				// 重启触发器
				trigger = newTrigger().withIdentity(triggerKey).withSchedule(cronSchedule(time)).forJob(jobKey).build();
				sched.scheduleJob(trigger);
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * @Description: 修改一个任务的触发时间
	 * 
	 * @param triggerName
	 * @param triggerGroupName
	 * @param time
	 * 
	 * @Title: QuartzManager.java
	 */
	public static void modifyJobTime(String triggerName, String triggerGroupName, String time) {
		try {
			// Scheduler sched = gSchedulerFactory.getScheduler();
			TriggerKey triggerKey = new TriggerKey(triggerName, triggerGroupName);
			CronTrigger trigger = (CronTrigger) sched.getTrigger(triggerKey);
			if (trigger == null) {
				return;
			}

			String oldTime = trigger.getCronExpression();
			if (!oldTime.equalsIgnoreCase(time)) {
				sched.pauseTrigger(triggerKey);
				JobKey jobkey = sched.getTrigger(triggerKey).getJobKey();
				// 修改时间
				sched.unscheduleJob(triggerKey);
				// 重启触发器
				trigger = newTrigger().withIdentity(triggerName, triggerGroupName).withSchedule(cronSchedule(time))
						.forJob(jobkey).build();
				sched.scheduleJob(trigger);
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * @Description: 移除一个任务(使用默认的任务组名，触发器名，触发器组名)
	 * 
	 * @param jobName
	 * 
	 * @Title: QuartzManager.java
	 */
	public static void removeJob(String jobName) {
		try {
			// Scheduler sched = gSchedulerFactory.getScheduler();
			JobKey jobKey = new JobKey(jobName, JOB_GROUP_NAME);
			TriggerKey triggerKey = new TriggerKey(jobName, JOB_GROUP_NAME);
			sched.pauseJob(jobKey);// 停止触发器
			sched.unscheduleJob(triggerKey);// 移除触发器
			sched.deleteJob(jobKey);// 删除任务
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * @Description: 移除一个任务
	 * 
	 * @param jobName
	 * @param jobGroupName
	 * @param triggerName
	 * @param triggerGroupName
	 */
	public static void removeJob(String jobName, String jobGroupName, String triggerName, String triggerGroupName) {
		try {
			TriggerKey triggerKey = new TriggerKey(triggerName, triggerGroupName);
			JobKey jobKey = new JobKey(jobName, jobGroupName);
			// Scheduler sched = gSchedulerFactory.getScheduler();
			sched.pauseTrigger(triggerKey);// 停止触发器
			sched.unscheduleJob(triggerKey);// 移除触发器
			sched.deleteJob(jobKey);// 删除任务
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * @Description:启动所有定时任务
	 * 
	 * 
	 * @Title: QuartzManager.java
	 * @Copyright: Copyright (c) 2014
	 * 
	 * @author Comsys-LZP
	 * @date 2014-6-26 下午03:50:18
	 * @version V2.0
	 */
	public static void startScheduler() {
		try {
			// Scheduler sched = gSchedulerFactory.getScheduler();
			if (sched.isShutdown()) {
				sched.start();
			}

		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * @Description:关闭所有定时任务
	 * 
	 * 
	 */
	public static void shutdownScheduler() {
		try {
			// Scheduler sched = gSchedulerFactory.getScheduler();

			if (!sched.isShutdown()) {
				sched.shutdown();
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * @Description: findJob
	 * 
	 * 
	 */
	public static JobDetail findJob(String jobName) {
		try {
			// Scheduler sched = gSchedulerFactory.getScheduler();
			return sched.getJobDetail(new JobKey(jobName, JOB_GROUP_NAME));
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * @Description: remove All jobs
	 * 
	 * 
	 */
	public static void removeAllJobs() {
		try {
			// Scheduler sched = gSchedulerFactory.getScheduler();
			sched.pauseAll();
			sched.clear();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	public static boolean healthCheck() {
		try {
			return sched.isStarted();
		} catch (SchedulerException e) {
			logger.error("", e);
			return false;
		}
	}

	/**
	 * @param jobName
	 */
	public static void runJobOne(String jobName) {

		JobKey jobKey = JobKey.jobKey(jobName, JOB_GROUP_NAME);
		try {
			sched.triggerJob(jobKey);
		} catch (SchedulerException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}

		/*
		 * Trigger.TriggerState st = null; JobKey jobKey = null; Scheduler
		 * scheduler=null; try { scheduler= new StdSchedulerFactory().getScheduler(); if
		 * (scheduler.isShutdown()) scheduler.start(); jobKey = new JobKey(jobName,
		 * JOB_GROUP_NAME); JobDetail jobDetail = newJob(jobClass) .withIdentity(jobKey)
		 * .build(); SimpleTrigger simpleTrigger =
		 * newTrigger().withIdentity(triggerName, triggerGroupName) .startAt(new Date())
		 * .withSchedule(SimpleScheduleBuilder.simpleSchedule()
		 * .withIntervalInSeconds(15) //每隔15秒 .withRepeatCount(0))
		 * //重复次数为0,因为加入Job时会执行一次 .forJob(jobKey) .build();
		 * scheduler.scheduleJob(jobDetail, simpleTrigger); // jobKey =
		 * JobKey.jobKey(jobName,JOB_GROUP_NAME); scheduler.triggerJob(jobKey);
		 * 
		 * List<? extends Trigger> triggersOfJob = scheduler.getTriggersOfJob(jobKey);
		 * 
		 * for (Trigger trigger : triggersOfJob) { System.out.println("trigger key:" +
		 * trigger.getKey()); st = scheduler.getTriggerState(trigger.getKey());
		 * System.out.println(st.name()); } st =
		 * sched.getTriggerState(TriggerKey.triggerKey(triggerName, triggerGroupName));
		 * } catch (Exception e) { throw new RuntimeException(e); } finally {
		 * System.out.println("状态：" + st.name()); try { if (st.name().equals("ERROR")) {
		 * scheduler.resumeJob(jobKey); System.out.println("重启Job"); }else {
		 * scheduler.shutdown(true); System.out.println("完成！"); } } catch (Exception e)
		 * { throw new RuntimeException(e); } }
		 */
	}
}
