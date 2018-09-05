package com.ghotel.oss.console.core.security.filter;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;

import com.ghotel.oss.console.core.security.dao.UserInfoRepository;
import com.ghotel.oss.console.core.utils.GocWebUtils;

public class GocUserSessionFilter extends FormAuthenticationFilter {

	UserInfoRepository userInfoRepository;

	public UserInfoRepository getUserInfoRepository() {
		return userInfoRepository;
	}

	public void setUserInfoRepository(UserInfoRepository userInfoRepository) {
		this.userInfoRepository = userInfoRepository;
	}

	@Override
	// protected boolean onLoginSuccess(AuthenticationToken token, Subject subject,
	// ServletRequest request,
	// ServletResponse response) throws Exception {
	protected boolean onLoginSuccess(AuthenticationToken token, Subject subject, ServletRequest request,
			ServletResponse response) throws Exception {
		// 获取已登录的用户信息
		String userName = (String) subject.getPrincipal();
		// 获取session
		// 把用户信息保存到session
		userInfoRepository.findFirstByUserLoginId(userName).ifPresent(user -> {
			GocWebUtils.updateUserSession(user);
			System.out.println(SecurityUtils.getSubject().getSession().getId());
		});
		return true;
	}

	@Override
	protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
		// boolean loggedIn = false; // false by default or we wouldn't be in this
		// method
		// if (isLoginAttempt(request, response)) {
		// loggedIn = executeLogin(request, response);
		// }
		// if (!loggedIn) {
		// sendChallenge(request, response);
		// }
		// return loggedIn;
		super.onAccessDenied(request, response);
		return executeLogin(request, response);
	}

	// @Override
	// protected AuthenticationToken createToken(ServletRequest request,
	// ServletResponse response) throws Exception {
	// // TODO Auto-generated method stub
	// UsernamePasswordToken token = new UsernamePasswordToken();
	// token.setUsername(request.getParameter("username"));
	// token.setPassword(request.getParameter("password").toCharArray());
	// return token;
	// }
}