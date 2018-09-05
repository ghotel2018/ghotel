package com.ghotel.oss.console.core.security.bean;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.DBRef;

/**
 * 
 * 
 * @description 角色信息 2016-6-14
 */
public class RoleInfoBean extends TreeBean<RoleInfoBean> {

	private String roleName;

	private String roleDesc;
	private String roleType;

	@DBRef
	private List<PermissionInfoBean> permissions = new ArrayList<>();

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getRoleDesc() {
		return roleDesc;
	}

	public void setRoleDesc(String roleDesc) {
		this.roleDesc = roleDesc;
	}

	public List<PermissionInfoBean> getPermissions() {
		return permissions;
	}

	public void setPermissions(List<PermissionInfoBean> permissions) {
		this.permissions = permissions;
	}

	public String getRoleType() {
		return roleType;
	}

	public void setRoleType(String roleType) {
		this.roleType = roleType;
	}

	@Override
	public void formatAttribute() {
		this.text = this.roleName;
		/*
		 * Attribute attr = new Attribute("roleDesc",this.roleDesc); boolean exist =
		 * false; for (Attribute a: this.attributes){
		 * if(a.getName().equals(attr.getName())){ exist = true; break; } } if(exist){
		 * this.attributes.add(attr); }
		 */

	}

}
