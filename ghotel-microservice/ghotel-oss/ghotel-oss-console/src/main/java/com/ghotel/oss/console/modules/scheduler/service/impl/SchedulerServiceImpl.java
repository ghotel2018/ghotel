package com.ghotel.oss.console.modules.scheduler.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import com.ghotel.oss.console.core.common.bean.PaginationBean;
import com.ghotel.oss.console.core.common.service.AbstractPaginationCommonServiceWrapper;
import com.ghotel.oss.console.core.logging.annotation.GocLogAnnotation;
import com.ghotel.oss.console.core.security.bean.GroupInfoBean;
import com.ghotel.oss.console.core.security.bean.PermissionInfoBean;
import com.ghotel.oss.console.core.security.bean.ResourceInfoBean;
import com.ghotel.oss.console.core.security.bean.UserInfoBean;
import com.ghotel.oss.console.core.utils.RequestStatusConstant;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.admin.bean.PermissionSearchCriteriaBean;
import com.ghotel.oss.console.modules.admin.bean.UserSearchCriteriaBean;
import com.ghotel.oss.console.modules.scheduler.bean.JobDetailInfoBean;
import com.ghotel.oss.console.modules.scheduler.bean.JobInstanceBean;
import com.ghotel.oss.console.modules.scheduler.bean.JobInstanceSearchBean;
import com.ghotel.oss.console.modules.scheduler.bean.JobSearchCriteriaBean;
import com.ghotel.oss.console.modules.scheduler.contant.SchedulerStatusEnum;
import com.ghotel.oss.console.modules.scheduler.dao.JobDetailInfoRepository;
import com.ghotel.oss.console.modules.scheduler.service.SchedulerService;

@GocLogAnnotation(moduleId = "Scheduler")
@Service
public class SchedulerServiceImpl extends AbstractPaginationCommonServiceWrapper<JobDetailInfoBean> implements SchedulerService {

	@Autowired
	JobDetailInfoRepository jobDetailInfoRepository;
	
	@Override
	public void updateToStartJob(JobInstanceBean bean) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void updateToStopJob(JobInstanceBean bean) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void updateToPauseAllJobs() throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void updateToStartAllJobs() throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void resetTaskStatus(JobInstanceSearchBean bean) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public List<JobInstanceBean> selectJobInstanceByIpAndPort(JobInstanceSearchBean searchBean) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int addJobInstance(JobInstanceBean bean) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int deleteJobInstance(JobInstanceBean bean) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void updateLastTimeStampByIpAndPort(JobInstanceBean bean) {
		// TODO Auto-generated method stub

	}

	@Override
	public void updateHeartBeatInfoByIpAndPort(JobInstanceBean bean) {
		// TODO Auto-generated method stub

	}

	@Override
	public void runJobOne(JobInstanceBean bean) throws Exception {
		// TODO Auto-generated method stub

	}
	
	@GocLogAnnotation(description = "新增")
	public JobDetailInfoBean add(JobDetailInfoBean jobDetailInfoBean) throws Exception {
		addChInfo(jobDetailInfoBean);
		return super.add(jobDetailInfoBean);
	}
	
	@GocLogAnnotation(description = "删除")
	public int delete(JobDetailInfoBean jobDetailInfoBean) throws Exception {
		return super.delete(jobDetailInfoBean);
	}
	
	@GocLogAnnotation(description = "更新")
	public JobDetailInfoBean update(JobDetailInfoBean jobDetailInfoBean) throws Exception {
		addChInfo(jobDetailInfoBean);
		return super.update(jobDetailInfoBean);
	}
	
	@Override
	public JobDetailInfoBean get(String id) throws Exception {
		return jobDetailInfoRepository.findByJobId(id);
	}
	
	@Override
	public PaginationResult<JobDetailInfoBean> getPaginationAll(PaginationBean paginationBean) throws Exception {
		int start = paginationBean.getStart();
		int end = paginationBean.getEnd();
		List<JobDetailInfoBean> groups = jobDetailInfoRepository.findAll();
		return super.getPaginationResult(groups,start,end);
	}


	@Override
	protected MongoRepository<JobDetailInfoBean, String> getRepository() {
		return jobDetailInfoRepository;
	}

//	
//	//0,'未启动',1,'执行中',-1,'出错',2,'挂起','未知'
//	private Integer jobStatus;
//	//状态中文描述
//	private String jobStatusStr;
//	//是否自动启动0,'不自动启动',1,'自动启动','未知'
//	private int jobAutoStartId;
//	//是否自动启动中文描述
//	private String jobAutoStartIdStr;
//	//是否启用
//	private Integer jobEnableInd;
//	//0,'未启用',1,'已启用','未知'
//	private String jobEnableIndStr;
	
	protected JobDetailInfoBean addChInfo(JobDetailInfoBean bean) {
		if(bean.getJobStatus()==-1) {
			bean.setJobStatusStr(SchedulerStatusEnum.JOBSTATUS_ERROR.getDesc());
		}else {
			bean.setJobStatusStr(SchedulerStatusEnum.valueOf("JOBSTATUS_"+bean.getJobStatus()).getDesc());
		}
		
		bean.setJobAutoStartIdStr(SchedulerStatusEnum.valueOf("JOBAUTOSTART_"+bean.getJobAutoStartId()).getDesc());
		bean.setJobEnableIndStr(SchedulerStatusEnum.valueOf("JOBENABLE_"+bean.getJobEnableInd()).getDesc());
		return bean;
	}
}
