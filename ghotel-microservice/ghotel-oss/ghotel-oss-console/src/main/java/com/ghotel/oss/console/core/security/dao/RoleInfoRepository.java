package com.ghotel.oss.console.core.security.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ghotel.oss.console.core.security.bean.RoleInfoBean;

public interface RoleInfoRepository extends MongoRepository<RoleInfoBean, String> {

	public List<RoleInfoBean> findByParentIdIsNull();

}