package com.ghotel.oss.console.core.security.filter;

import java.io.PrintWriter;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;

import com.ghotel.oss.console.core.common.bean.Message;
import com.ghotel.oss.console.core.utils.RequestStatusConstant;

/**
 * 
 * 
 * @description Shiro Filter 2016-6-14
 */
public class GocAuthenticationFilter extends FormAuthenticationFilter {

	private static final Logger log = LoggerFactory.getLogger(GocAuthenticationFilter.class);

	/**
	 * 所有请求都会经过的方法。
	 */
	@Override
	protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
		// System.out.println(2);
		// 处理ajax 请求, 没有通过身份认证
		if ("XMLHttpRequest".equalsIgnoreCase(((HttpServletRequest) request).getHeader("X-Requested-With"))) {// 不是ajax请求
			response.setCharacterEncoding("UTF-8");
			PrintWriter out = response.getWriter();
			Message message = new Message("", RequestStatusConstant.STATUS_CODE_NOT_AUTHENTICATED);
			out.println(message.toString());
			out.flush();
			out.close();
			return false;
		}
		return executeLogin(request, response);

	}
}