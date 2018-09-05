package com.ghotel.oss.console.modules.admin.bean;

import com.ghotel.oss.console.core.common.bean.PaginationBean;

public class PermissionSearchCriteriaBean extends PaginationBean {

	private String permissionDesc;

	private String roleId;

	public String getPermissionDesc() {
		return permissionDesc;
	}

	public void setPermissionDesc(String permissionDesc) {
		this.permissionDesc = permissionDesc;
	}

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

}
