package com.ghotel.oss.console.modules.admin.bean;



/**
 * 
 * @author goc
 * 
 * @description 用户信息
 * 2016-6-14
 */
public class UserInfoResultBean {
	
	
	private int userId;
	
	private String userLoginId;
	
	private String password;
	
	private String userName;
	
	private String status = "A"; //默认值
	
	private String workPhone;
	
	private String workMail;
	
	private String cellPhone;
	
	private String userType;
	
	private String initPassword;
	
	private String resetPwdIndStr;

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

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
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

	public String getResetPwdIndStr() {
		return resetPwdIndStr;
	}

	public void setResetPwdIndStr(String resetPwdIndStr) {
		this.resetPwdIndStr = resetPwdIndStr;
	}

}
