package com.ghotel.oss.console.core.job.handler;

import static com.ghotel.oss.console.core.job.util.JobUtil.getBeanFactry;

import java.util.HashMap;
import java.util.Map;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.ghotel.oss.console.core.job.QuartzJobManager;
import com.ghotel.oss.console.core.job.dao.SchedulerJobMapper;
import com.ghotel.oss.console.core.utils.GocSystemHelper;
import com.ghotel.oss.console.modules.scheduler.bean.JobInstanceBean;
import com.ghotel.oss.console.modules.scheduler.bean.JobInstanceSearchBean;
import com.ghotel.oss.console.modules.scheduler.utils.JobInstanceConstant;

public abstract class AbstractHandler  {

	protected JobExecutionContext context;
	
	public void execute(JobExecutionContext context) throws JobExecutionException {
		this.context = context;
		String jobID = context.getJobDetail().getKey().getName();
		SchedulerJobMapper jobMapper  = (SchedulerJobMapper)(getBeanFactry().getBean("jobMapper"));
		JobInstanceSearchBean searchBean = new JobInstanceSearchBean();
		searchBean.setJobId(jobID);
		searchBean.setIpAddr(GocSystemHelper.getIp());
		searchBean.setPort(GocSystemHelper.getPort());
		JobInstanceBean instance = jobMapper.selectJobInstanceId(searchBean);
		if( instance==null || JobInstanceConstant.JOB_INSTANCE_STATUS_RUNNING != instance.getStatus() ){
			QuartzJobManager.removeJob(jobID); 
			return ;
		}
		try{
			execute(instance);
		}catch(Exception e){
			Map<String,Object> dataMap = new HashMap<String,Object>();
			StringBuffer errMsgSb = new StringBuffer();
			if(e.getCause()!=null){
				for(StackTraceElement ele : e.getCause().getStackTrace()){
					errMsgSb.append(ele.toString());
				}
			}else{
				errMsgSb.append(e.getMessage());
			}

			dataMap.put("errMsg", errMsgSb.toString());
			dataMap.put("newStatus", JobInstanceConstant.JOB_INSTANCE_STATUS_FAULT);
			dataMap.put("oldStatus", JobInstanceConstant.JOB_INSTANCE_STATUS_RUNNING);
			dataMap.put("jobInstanceId", instance.getJobInstanceId());
			jobMapper.updateInstanceStatus(dataMap);
			if(QuartzJobManager.findJob(instance.getJobId()) !=null ){
				QuartzJobManager.removeJob(instance.getJobId());
			}
			throw new JobExecutionException(e);
		}
		
		
	}
	
	public abstract void execute(JobInstanceBean instance) throws JobExecutionException;

}
