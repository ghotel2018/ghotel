package com.ghotel.oss.console.modules.scheduler.service;

import java.util.List;

import com.ghotel.oss.console.core.common.service.ICommonPaginationService;
import com.ghotel.oss.console.modules.scheduler.bean.JobDetailInfoBean;
import com.ghotel.oss.console.modules.scheduler.bean.JobInstanceBean;
import com.ghotel.oss.console.modules.scheduler.bean.JobInstanceSearchBean;


public interface SchedulerService extends ICommonPaginationService<JobDetailInfoBean>   {

	public void updateToStartJob(JobInstanceBean bean) throws Exception  ;
	
	public void updateToStopJob(JobInstanceBean bean) throws Exception ;
	
	public void updateToPauseAllJobs()  throws Exception;
	
	public void updateToStartAllJobs()  throws Exception;
	
	public void resetTaskStatus(JobInstanceSearchBean bean)  throws Exception;
	
	public List<JobInstanceBean> selectJobInstanceByIpAndPort(JobInstanceSearchBean searchBean);
	
	public int addJobInstance(JobInstanceBean bean);
	
	public int deleteJobInstance(JobInstanceBean bean);
	
	public void updateLastTimeStampByIpAndPort(JobInstanceBean bean);
	
	public void updateHeartBeatInfoByIpAndPort(JobInstanceBean bean);
	
	void runJobOne(JobInstanceBean bean) throws Exception;
}
 