package com.ghotel.oss.console.core.security.filter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.UnauthenticatedException;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.apache.shiro.web.util.WebUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.ghotel.oss.console.core.common.bean.Message;
import com.ghotel.oss.console.core.security.GocSecurityConstant;
import com.ghotel.oss.console.core.security.dao.UserInfoRepository;
import com.ghotel.oss.console.core.utils.GocWebUtils;
import com.ghotel.oss.console.core.utils.JsonUtil;
import com.ghotel.oss.console.core.utils.RequestStatusConstant;
import com.ghotel.oss.console.core.utils.StringUtil;

public class ExtendFormAuthenticationFilter extends FormAuthenticationFilter {

	private static final Logger log = LoggerFactory.getLogger(FormAuthenticationFilter.class);

	@Autowired
	UserInfoRepository userInfoRepository;

	private String[] loginUrls;

	public UserInfoRepository getUserInfoRepository() {
		return userInfoRepository;
	}

	public void setUserInfoRepository(UserInfoRepository userInfoRepository) {
		this.userInfoRepository = userInfoRepository;
	}

	public String[] getLoginUrls() {
		return loginUrls;
	}

	public void setLoginUrls(String[] loginUrls) {
		this.loginUrls = loginUrls;
	}

	private void sendResponseToClient(ServletResponse response, Message message) throws Exception {
		HttpServletResponse httpServletResponse = WebUtils.toHttp(response);
		httpServletResponse.setCharacterEncoding("UTF-8");
		PrintWriter out = httpServletResponse.getWriter();
		out.println(JsonUtil.tojson(message));
		out.flush();
		out.close();
	}

	@Override
	protected AuthenticationToken createToken(ServletRequest request, ServletResponse response) {
		String username = WebUtils.getCleanParam(request, "username");
		String password = WebUtils.getCleanParam(request, "password");
		UsernamePasswordToken token = new UsernamePasswordToken(username, password,
				GocWebUtils.getIPAddress(WebUtils.toHttp(request)));
		token.setRememberMe(true);
		return token;
	}

	/**
	 * 表示当访问拒绝时
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@Override
	protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {

		if (this.isLoginRequest(request, response)) {
			if (this.isLoginSubmission(request, response)) {
				if (log.isTraceEnabled()) {
					log.trace("Login submission detected.  Attempting to execute login.");
				}

				HttpServletRequest httpRequest = WebUtils.toHttp(request);
				String username = httpRequest.getParameter("username");
				String password = httpRequest.getParameter("password");
				String submitCode = WebUtils.getCleanParam(request, "__txtVerifyCode");
				// 获取HttpSession中的验证码
				String verifyCode = (String) httpRequest.getSession().getAttribute("AVVerifyCode");
				String messageBody = null;
				int statusCode = 0;

				log.info("用户[" + username + "]登录时输入的验证码为[" + submitCode + "],HttpSession中的验证码为[" + verifyCode + "]");
				if (null == verifyCode || !verifyCode.equals(submitCode)) {
					messageBody = "验证码不正确，请重新输入！";
					statusCode = RequestStatusConstant.VERIFICATION_CODE_NOT_MATCH;
					httpRequest.getSession().setAttribute("AVVerifyCode", null);
					sendResponseToClient(response, new Message(null, statusCode, messageBody));
					return false;
				}

				if (StringUtil.isNullOrBlank(username) || StringUtil.isNullOrBlank(password)) {
					messageBody = "亲~ 请输入用户名或密码！";
					statusCode = RequestStatusConstant.LOGIN_FAILED;
					sendResponseToClient(response, new Message(null, statusCode, messageBody));
					return false;
				}

				log.info("对用户[" + username + "]进行登录验证..验证开始");
				return this.executeLogin(httpRequest, response);
			} else {
				if (log.isTraceEnabled()) {
					log.trace("Login page view.");
				}

				return true;
			}
		} else {
//			sendResponseToClient(response, new Message(null, RequestStatusConstant.STATUS_CODE_NOT_AUTHENTICATED));
			return true;
		}
	}

	@Override
	protected boolean isLoginRequest(ServletRequest request, ServletResponse response) {
		boolean flag = false;
		for (String loginUrl : getLoginUrls()) {
			if (pathsMatch(loginUrl, request)) {
				flag = true;
				break;
			}
		}
		return flag;
	}

	/**
	 * 当登录成功
	 * 
	 * @param token
	 * @param subject
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@Override
	protected boolean onLoginSuccess(AuthenticationToken token, Subject subject, ServletRequest request,
			ServletResponse response) throws Exception {
		String userName = (String) subject.getPrincipal();

		log.info("对用户[" + userName + "]进行登录验证..验证通过");

		HttpServletRequest httpServletRequest = WebUtils.toHttp(request);
		userInfoRepository.findFirstByUserLoginId(userName).ifPresent(user -> {
			GocWebUtils.updateUserSession(user);
			httpServletRequest.getSession().setAttribute(GocSecurityConstant.SESSION_KEY_USERINFO, user);
		});

		Message message = new Message();
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		message.setMessageBody("登录成功！");

		if (!httpServletRequest.getRequestURL().toString().contains("ajax")) {// 不是ajax请求
			Map<String, String> returnParams = new HashMap<String, String>();
			String resultPageURL = "/index.html";

			returnParams.put("url", resultPageURL);
			message.setStatusCode(RequestStatusConstant.PAGE_NAVIGATION_ON);
			message.setMessageBody(returnParams);
		}

		sendResponseToClient(response, message);

		return false;
	}

	/**
	 * 当登录失败
	 * 
	 * @param token
	 * @param e
	 * @param request
	 * @param response
	 * @return
	 */
	@Override
	protected boolean onLoginFailure(AuthenticationToken token, AuthenticationException e, ServletRequest request,
			ServletResponse response) {
		if (!"XMLHttpRequest".equalsIgnoreCase(((HttpServletRequest) request).getHeader("X-Requested-With"))) {// 不是ajax请求
			setFailureAttribute(request, e);
			return true;
		}
		String messageBody = null;
		int statusCode = 0;
		String username = (String) token.getPrincipal();

		if (e instanceof UnknownAccountException) {
			log.info("对用户[" + username + "]进行登录验证..验证未通过,未知账户");
			messageBody = e.getMessage();
			statusCode = RequestStatusConstant.LOGIN_FAILED;
		} else if (e instanceof IncorrectCredentialsException) {
			log.info("对用户[" + username + "]进行登录验证..验证未通过,错误的凭证");
			messageBody = "您输入的密码不正确！";
			statusCode = RequestStatusConstant.LOGIN_FAILED;
		} else if (e instanceof LockedAccountException) {
			messageBody = e.getMessage();
			statusCode = RequestStatusConstant.LOGIN_FAILED;
		} else if (e instanceof ExcessiveAttemptsException) {
			log.info("对用户[" + username + "]进行登录验证..验证未通过,错误次数过多");
			messageBody = "用户名或密码错误次数过多";
			statusCode = RequestStatusConstant.LOGIN_FAILED;
		} else if (e instanceof AuthenticationException) {
			// 通过处理Shiro的运行时AuthenticationException就可以控制用户登录失败或密码错误时的情景
			log.info("对用户[" + username + "]进行登录验证..验证未通过,堆栈轨迹如下");
			log.error("", e);
			messageBody = "很抱歉耽误您的时间，您的身份认证有误，请联系系统管理员求助！";
			statusCode = RequestStatusConstant.LOGIN_FAILED;
		} else {
			log.error("", e);
			messageBody = "很抱歉耽误您的时间，登录请求失败，请联系系统管理员！";
			statusCode = RequestStatusConstant.LOGIN_FAILED;
		}
		try {
			sendResponseToClient(response, new Message(null, statusCode, messageBody));
		} catch (Exception e1) {
			log.error("", e1);
		}

		return false;
	}

}