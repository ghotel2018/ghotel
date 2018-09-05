package com.ghotel.oss.console.modules.scheduler.dao;

import java.util.List;
import java.util.Map;

import com.ghotel.oss.console.core.common.dao.IPaginationDao;
import com.ghotel.oss.console.modules.scheduler.bean.JobInstanceBean;
import com.ghotel.oss.console.modules.scheduler.bean.JobInstanceSearchBean;

public interface SchedulerMapper extends IPaginationDao  {
	
	public int updateJobStatus(Map map);
	
	public int resetTaskStatus(JobInstanceSearchBean searchBean)  ;
	
	public List<JobInstanceBean> selectJobInstanceByIpAndPort(JobInstanceSearchBean searchBean);
	
	public int addJobInstance(JobInstanceBean bean);
	
	public int updateJobInstance(JobInstanceBean bean);
	
	public int deleteJobInstance(JobInstanceBean bean);
	
	public void updateLastTimeStampByIpAndPort(JobInstanceBean bean);
	
	public void updateHeartBeatInfoByIpAndPort(JobInstanceBean bean);
}
