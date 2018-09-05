package com.ghotel.oss.console.core.security.bean;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * 
 * 
 * @description 用户组 2016-6-14
 */
@Document(collection = "groupInfo")
public class GroupInfoBean extends TreeBean<GroupInfoBean> {

	private String groupName;

	private String groupDesc;

	private String groupType;

	@DBRef
	private List<RoleInfoBean> roles = new ArrayList<>();

	public List<RoleInfoBean> getRoles() {
		return roles;
	}

	public void setRoles(List<RoleInfoBean> roles) {
		this.roles = roles;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getGroupDesc() {
		return groupDesc;
	}

	public void setGroupDesc(String groupDesc) {
		this.groupDesc = groupDesc;
	}

	public String getGroupType() {
		return groupType;
	}

	public void setGroupType(String groupType) {
		this.groupType = groupType;
	}

	public void formatAttribute() {
		this.text = this.groupName;
		// this.attributes.add(new Attribute("groupDesc",this.groupDesc));
	}

}
