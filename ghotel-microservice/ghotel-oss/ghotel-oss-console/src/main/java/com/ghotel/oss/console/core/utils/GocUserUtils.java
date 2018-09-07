package com.ghotel.oss.console.core.utils;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;

import com.ghotel.oss.console.core.security.bean.UserInfoBean;

public class GocUserUtils {
	public static Subject isAuthenticated() {
		Subject currentUser = SecurityUtils.getSubject();
		if (!currentUser.isAuthenticated()) {
			throw new org.apache.shiro.authz.UnauthenticatedException("用户未登陆！");
		}
		return currentUser;
	}

	public static String getLoginUserId() {

		return GocWebUtils.getSessionUser().map(user -> {
			return user.getUserId();
		}).orElse(null);
	}

	public static String getLoginUserLoginId() {
		return GocWebUtils.getSessionUser().map(user -> {
			return user.getUserName();
		}).orElse(null);
	}

	public static String getLoginUserName() {
		return GocWebUtils.getSessionUser().map(user -> {
			return user.getUserName();
		}).orElse(null);
	}

	// public static String getUserId() {
	// Subject currentUser = SecurityUtils.getSubject();
	// UserInfoBean user = (UserInfoBean)
	// currentUser.getSession().getAttribute("user");
	// return user.getUserId() + "";
	// }

	public static Subject getCurrentUser() {
		Subject currentUser = SecurityUtils.getSubject();
		if (currentUser == null) {
			throw new org.apache.shiro.authz.UnauthenticatedException("用户未登陆！");
		}
		return currentUser;
	}

	public static boolean isAdminUser(UserInfoBean user) {
		return user.getIsAdmin() == null ? false : user.getIsAdmin();
	}
}
