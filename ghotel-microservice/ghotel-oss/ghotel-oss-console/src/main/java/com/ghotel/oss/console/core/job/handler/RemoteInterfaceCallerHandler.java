package com.ghotel.oss.console.core.job.handler;

import static com.ghotel.oss.console.core.job.util.JobUtil.getBeanFactry;

import org.quartz.Job;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ghotel.oss.console.core.utils.HttpClientUtil;
import com.ghotel.oss.console.modules.scheduler.bean.JobDetailInfoBean;
import com.ghotel.oss.console.modules.scheduler.bean.JobInstanceBean;
import com.ghotel.oss.console.modules.scheduler.dao.SchedulerMapper;

public class RemoteInterfaceCallerHandler  extends AbstractHandler implements Job {

	private static final Logger logger = LoggerFactory.getLogger("job");
	
	@Override
	public void execute(JobInstanceBean instance) throws JobExecutionException {
		
		logger.info("。。。。。。开启执行远程调用实例。。。。。。");
		String jobId =  instance.getJobId();
		SchedulerMapper schedulerMapper  = (SchedulerMapper)(getBeanFactry().getBean("shedulerMapper"));
		JobDetailInfoBean bean = (JobDetailInfoBean)schedulerMapper.get(jobId);
		String result = HttpClientUtil.get(bean.getHandler());
		logger.info("远程调用结束, 返回的信息为: " + result);
		logger.info("。。。。。。完成远程调用实例。。。。。。");
		
	}

}
