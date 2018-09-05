package com.ghotel.oss.console.core.security.bean;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * 
 * 
 * @description 用户权限列表 2016-6-14
 */
@Document(collection = "permissionInfo")
public class PermissionInfoBean {

	@Id
	private String id;

	private String permissionDesc;

	private String permissionExp;

	@DBRef
	private List<ResourceInfoBean> relateResource = new ArrayList<>();

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPermissionDesc() {
		return permissionDesc;
	}

	public void setPermissionDesc(String permissionDesc) {
		this.permissionDesc = permissionDesc;
	}

	public String getPermissionExp() {
		return permissionExp;
	}

	public void setPermissionExp(String permissionExp) {
		this.permissionExp = permissionExp;
	}

	public List<ResourceInfoBean> getRelateResource() {
		return relateResource;
	}

	public void setRelateResource(List<ResourceInfoBean> relateResource) {
		this.relateResource = relateResource;
	}

}
