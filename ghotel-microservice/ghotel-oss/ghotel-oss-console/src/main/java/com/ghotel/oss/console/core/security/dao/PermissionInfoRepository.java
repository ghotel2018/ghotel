package com.ghotel.oss.console.core.security.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ghotel.oss.console.core.security.bean.PermissionInfoBean;
import com.ghotel.oss.console.core.security.bean.ResourceInfoBean;

public interface PermissionInfoRepository extends MongoRepository<PermissionInfoBean, String> {

	public List<PermissionInfoBean> findByRelateResource_ResourceTypeIn(String[] types);

	// public List<PermissionInfoBean> findByRelateResource_ResourceType(String
	// type);

	public List<PermissionInfoBean> findByRelateResource(ResourceInfoBean resource);

	public List<PermissionInfoBean> findByIdInAndPermissionExp(List<String> permIds, String permissionExp);

	public List<PermissionInfoBean> findByPermissionExp(String permissionExp);

	public List<PermissionInfoBean> findByRelateResource_IdIn(String[] resIds);

}