package com.ghotel.oss.console.modules.admin.bean;

import java.util.ArrayList;
import java.util.List;

import com.ghotel.oss.console.core.security.bean.RoleInfoBean;
import com.ghotel.oss.console.core.security.bean.UserInfoBean;

public class GroupBindingBean {

	private String groupId;

	private List<RoleInfoBean> bindingRoles = new ArrayList<RoleInfoBean>();

	private List<UserInfoBean> bindingUsers = new ArrayList<UserInfoBean>();

	public String getGroupId() {
		return groupId;
	}

	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}

	public List<RoleInfoBean> getBindingRoles() {
		return bindingRoles;
	}

	public void setBindingRoles(List<RoleInfoBean> bindingRoles) {
		this.bindingRoles = bindingRoles;
	}

	public List<UserInfoBean> getBindingUsers() {
		return bindingUsers;
	}

	public void setBindingUsers(List<UserInfoBean> bindingUsers) {
		this.bindingUsers = bindingUsers;
	}

}
