package com.ghotel.oss.console.core.security.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ghotel.core.annotation.OSSDataSource;
import com.ghotel.oss.console.core.security.bean.MenuConfigInfoBean;

@OSSDataSource
public interface MenuConfigRepository extends MongoRepository<MenuConfigInfoBean, String> {
	public List<MenuConfigInfoBean> findByParentIdIsNull();

	public List<MenuConfigInfoBean> findByChildrenIsNull();

	// public List<MenuConfigInfoBean> findByChildrenIsNotNull();
}