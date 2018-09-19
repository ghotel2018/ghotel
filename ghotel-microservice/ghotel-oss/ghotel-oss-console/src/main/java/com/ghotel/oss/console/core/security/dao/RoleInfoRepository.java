package com.ghotel.oss.console.core.security.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ghotel.core.annotation.OSSDataSource;
import com.ghotel.oss.console.core.security.bean.RoleInfoBean;
@OSSDataSource
public interface RoleInfoRepository extends MongoRepository<RoleInfoBean, String> {

	public List<RoleInfoBean> findByParentIdIsNull();

	public List<RoleInfoBean> findByParentIdIsNullOrParentId(String string);

}