package com.ghotel.oss.console.modules.admin.bean;

public class PermissionWithResourceDetailBean {

	private String id;

	private String permissionDesc;

	private String permissionExp;

	private String resourceId;

	private String resourceName;

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

	public String getResourceId() {
		return resourceId;
	}

	public void setResourceId(String resourceId) {
		this.resourceId = resourceId;
	}

	public String getResourceName() {
		return resourceName;
	}

	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}

}
