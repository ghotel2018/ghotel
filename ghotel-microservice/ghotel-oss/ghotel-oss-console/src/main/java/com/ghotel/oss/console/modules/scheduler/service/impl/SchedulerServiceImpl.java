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
import com.ghotel.oss.console.core.security.bean.UserInfoBean;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.admin.bean.PermissionSearchCriteriaBean;
import com.ghotel.oss.console.modules.admin.bean.UserSearchCriteriaBean;
import com.ghotel.oss.console.modules.scheduler.bean.JobDetailInfoBean;
import com.ghotel.oss.console.modules.scheduler.bean.JobInstanceBean;
import com.ghotel.oss.console.modules.scheduler.bean.JobInstanceSearchBean;
import com.ghotel.oss.console.modules.scheduler.bean.JobSearchCriteriaBean;
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
	
	
	@Override
	public PaginationResult<JobDetailInfoBean> getPaginationAll(PaginationBean paginationBean) throws Exception {
		int start = paginationBean.getStart();
		int end = paginationBean.getEnd();
		List<JobDetailInfoBean> groups = jobDetailInfoRepository.findAll();
		return super.getPaginationResult(groups,start,end);
	}


	@Override
	protected MongoRepository<JobDetailInfoBean, String> getRepository() {
		return null;
	}

}
