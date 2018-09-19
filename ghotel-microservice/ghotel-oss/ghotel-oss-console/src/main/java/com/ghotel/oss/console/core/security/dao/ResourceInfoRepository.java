package com.ghotel.oss.console.core.security.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ghotel.core.annotation.OSSDataSource;
import com.ghotel.oss.console.core.security.bean.ResourceInfoBean;
@OSSDataSource
public interface ResourceInfoRepository extends MongoRepository<ResourceInfoBean, String> {

	public List<ResourceInfoBean> findByCategoryInAndResourceTypeIn(String[] categorys, String[] types);

	public List<ResourceInfoBean> findByResourceTypeIn(String[] types);

	public List<ResourceInfoBean> findByCategoryIn(String[] categorys);

	public List<ResourceInfoBean> findByIdIn(List<String> resourceIds);

}