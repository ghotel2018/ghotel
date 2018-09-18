package com.ghotel.oss.console.core.listener;

import java.util.List;

import javax.servlet.ServletContextEvent;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.quartz.Job;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.WebApplicationContext;

import com.ghotel.oss.console.core.job.QuartzJobManager;
import com.ghotel.oss.console.core.utils.GocSystemHelper;
import com.ghotel.oss.console.modules.scheduler.bean.JobDetailInfoBean;
import com.ghotel.oss.console.modules.scheduler.bean.JobInstanceBean;
import com.ghotel.oss.console.modules.scheduler.bean.JobInstanceSearchBean;
import com.ghotel.oss.console.modules.scheduler.service.SchedulerService;
import com.ghotel.oss.console.modules.scheduler.utils.JobInstanceConstant;

public class CmcCoreListener extends ContextLoaderListener {

	private static final Logger logger = LoggerFactory.getLogger(CmcCoreListener.class);

	private ContextLoader contextLoader;

	public CmcCoreListener() {
	}

	/**
	 * Initialize the root web application context.
	 */

	public CmcCoreListener(WebApplicationContext context) {
		super(context);
	}

	public void contextInitialized(ServletContextEvent event) {
		if (this.contextLoader == null) {
			this.contextLoader = this;
		}

		this.contextLoader.initWebApplicationContext(event.getServletContext());
		BeanFactory factory = (BeanFactory) getCurrentWebApplicationContext();
		SchedulerService service = (SchedulerService) factory.getBean("SchedulerService");
		initializeSchedulerJob(service);
	}

	/*
	 * Close the root web application context.
	 */
	public void contextDestroyed(ServletContextEvent event) {
		if (this.contextLoader != null) {
			this.contextLoader.closeWebApplicationContext(event.getServletContext());
		}

		super.contextDestroyed(event);
	}

	private void initializeSchedulerJob(SchedulerService service) {

		JobInstanceSearchBean searchBean = new JobInstanceSearchBean();
		try {
			searchBean.setEnd(9999);
			searchBean.setStart(1);
			searchBean.setPort(GocSystemHelper.getPort());
			searchBean.setIpAddr(GocSystemHelper.getIp());
			// reset execution task status as 0
			service.resetTaskStatus(searchBean);
			// Get automatically starting job and put them into scheduler
			// searchBean.setJobEnableInd(SchedulerConstant.JOB_ENABLED);
			// searchBean.setJobAutoStartId(SchedulerConstant.JOB_AUTO_START_IND_ENABLE);
			// searchBean.setJobStatus(SchedulerConstant.JOB_STATUS_RUNNING);

			// com.ghotel.oss.console.modules.scheduler.bean.JobDetailInfoBean
			List<JobInstanceBean> list = (List<JobInstanceBean>) service.selectJobInstanceByIpAndPort(searchBean);
			for (JobInstanceBean bean : list) {
				if (bean.getStatus() == JobInstanceConstant.JOB_INSTANCE_STATUS_RUNNING) {
					JobDetailInfoBean jobDetial = (JobDetailInfoBean) service.get(bean.getJobId());
					logger.info("任务实例【" + jobDetial.getJobName() + "】已经启动!");
					QuartzJobManager.addJob(bean.getJobId(),
							(Class<? extends Job>) Class.forName(jobDetial.getHandler()), jobDetial.getJobCronExp());
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			logger.error("", e);
		}
		// Int JOB manager
		// QuartzJobManager.addJob("Report Task Handler", ReportTaskHandler.class, "0/3
		// * * * * ? *");
	}

}
