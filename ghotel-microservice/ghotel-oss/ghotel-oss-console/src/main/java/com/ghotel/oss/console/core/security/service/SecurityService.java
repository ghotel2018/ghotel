package com.ghotel.oss.console.core.security.service;

import java.util.List;

import com.ghotel.oss.console.core.security.bean.PageConfigBean;
import com.ghotel.oss.console.core.security.bean.PermissionInfoBean;
import com.ghotel.oss.console.core.security.bean.RoleInfoBean;
import com.ghotel.oss.console.core.security.bean.UserInfoBean;

public interface SecurityService {

	public List<RoleInfoBean> getRoleByUserId(String userId);

	public List<PermissionInfoBean> getPermissionByUserId(String userId, String Module);

	public List<PermissionInfoBean> getItAdminPermission();

	public List<PermissionInfoBean> getBaAdminPermission();

	public UserInfoBean getUserByUserId(String userId);

	public PageConfigBean getMenuConfig(UserInfoBean user, String module) throws Exception;

	// public boolean updateLastLoginTime(String userId);

	public boolean updateUserInfo(UserInfoBean bean);

	// public boolean resetPwd(Map map);

	public boolean insertLoginInfo(String username, String ipAddr, boolean blnLoginSuccess, String loginFailMsg);

	public List<PermissionInfoBean> getItAndBaAdminPermission();

	// boolean isAdminUser(String userName, String password);

	public List<PermissionInfoBean> getPermissionByUserId(String userId);

	public boolean resetPassword(UserInfoBean cacheUser, String oldPw);

	public List<PermissionInfoBean> getAllAdminPermission();
}
