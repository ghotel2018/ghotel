package com.ghotel.oss.console.core.job.dao;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ghotel.oss.console.core.job.bean.TaskBean;
import com.ghotel.oss.console.modules.scheduler.bean.JobInstanceBean;
import com.ghotel.oss.console.modules.scheduler.bean.JobInstanceSearchBean;

public interface SchedulerJobMapper {
	
	public  static  final Logger logger = LoggerFactory.getLogger("job");    

	public List<TaskBean> selectAvailabelTask(Object params);
	
	public int updateTaskDetail(Object params);
	
	public int addTaskResult(Object params);
	
	public List genReportDataForExportAesKeyByGroupId(Map map);
	
	public List genReportDataForExportAesKeyByDiscountCode(Map map);
	
	public List genReportDataForCoupon(Map map);
	
	public int genReportDataForCouponCount(Map map);
	
	public int selectExecutingTaskCount(Object params);
	
	public JobInstanceBean selectJobInstanceId(JobInstanceSearchBean bean);

	public int updateInstanceStatus(Map map);
	
}
