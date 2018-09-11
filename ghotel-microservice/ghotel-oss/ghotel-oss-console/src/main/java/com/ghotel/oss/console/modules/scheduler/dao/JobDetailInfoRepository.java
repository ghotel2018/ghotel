package com.ghotel.oss.console.modules.scheduler.dao;


import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ghotel.oss.console.modules.scheduler.bean.JobDetailInfoBean;
public interface JobDetailInfoRepository extends MongoRepository<JobDetailInfoBean, String> {
	
	public List<JobDetailInfoBean> findByJobIdIsNull();
	public JobDetailInfoBean findByJobId(String jobId);
	
}