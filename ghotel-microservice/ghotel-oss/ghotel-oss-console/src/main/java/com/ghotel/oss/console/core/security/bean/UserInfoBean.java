package com.ghotel.oss.console.core.security.bean;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.ghotel.oss.console.modules.admin.util.AdminModuleConstant;

/**
 * 
 * 
 * @description 用户信息 2016-6-14
 */
@Document(collection = "userInfo")
public class UserInfoBean {

	@Id
	private String userId;

	@DBRef
	List<GroupInfoBean> groups = new ArrayList<>();

	@Indexed(unique = true)
	private String userLoginId;

	private String password;

	private String userName;

	private Boolean isAdmin;

	private String status = AdminModuleConstant.USER_STATUS_NEW; // 默认值

	private String workPhone;

	private String workMail;

	private String cellPhone;

	private String userType;

	private String initPassword;

	private Integer resetPwdInd;

	private String groupType; // Delimited by ,

	private String lastLoginTime;

	private String personalMail;

	private String createDate;

	public List<GroupInfoBean> getGroups() {
		return groups;
	}

	public void setGroups(List<GroupInfoBean> groups) {
		this.groups = groups;
	}

	public String getUserLoginId() {
		return userLoginId;
	}

	public void setUserLoginId(String userLoginId) {
		this.userLoginId = userLoginId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getWorkPhone() {
		return workPhone;
	}

	public void setWorkPhone(String workPhone) {
		this.workPhone = workPhone;
	}

	public String getWorkMail() {
		return workMail;
	}

	public void setWorkMail(String workMail) {
		this.workMail = workMail;
	}

	public String getCellPhone() {
		return cellPhone;
	}

	public void setCellPhone(String cellPhone) {
		this.cellPhone = cellPhone;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public String getInitPassword() {
		return initPassword;
	}

	public void setInitPassword(String initPassword) {
		this.initPassword = initPassword;
	}

	public Integer getResetPwdInd() {
		return resetPwdInd;
	}

	public void setResetPwdInd(Integer resetPwdInd) {
		this.resetPwdInd = resetPwdInd;
	}

	public String getGroupType() {
		return groupType;
	}

	public void setGroupType(String groupType) {
		this.groupType = groupType;
	}

	public String getLastLoginTime() {
		return lastLoginTime;
	}

	public void setLastLoginTime(String lastLoginTime) {
		this.lastLoginTime = lastLoginTime;
	}

	public String getPersonalMail() {
		return personalMail;
	}

	public void setPersonalMail(String personalMail) {
		this.personalMail = personalMail;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public Boolean getIsAdmin() {
		return isAdmin;
	}

	public void setIsAdmin(Boolean isAdmin) {
		this.isAdmin = isAdmin;
	}

	public UserInfoBean clone() {
		try {
			return (UserInfoBean) super.clone();
		} catch (CloneNotSupportedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return this;
	}

}
