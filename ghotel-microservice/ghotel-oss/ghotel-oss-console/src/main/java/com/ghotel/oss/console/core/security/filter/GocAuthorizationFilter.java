package com.ghotel.oss.console.core.security.filter;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.web.filter.authz.PermissionsAuthorizationFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ghotel.oss.console.core.common.bean.Message;
import com.ghotel.oss.console.core.utils.RequestStatusConstant;

public class GocAuthorizationFilter extends PermissionsAuthorizationFilter {

	// TODO - complete JavaDoc
	private static final Logger log = LoggerFactory.getLogger(GocAuthorizationFilter.class);

	public boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue)
			throws IOException {
		log.info("执行authz filter");
		boolean isPermitted = super.isAccessAllowed(request, response, mappedValue);
		// 处理ajax 请求没有授权资源的请求返回
		if ("XMLHttpRequest".equalsIgnoreCase(((HttpServletRequest) request).getHeader("X-Requested-With"))) {// 不是ajax请求
			response.setCharacterEncoding("UTF-8");
			PrintWriter out = response.getWriter();
			Message message = new Message("", RequestStatusConstant.STATUS_CODE_NOT_AUTHORIZED);
			out.println(message.toString());
			out.flush();
			out.close();
			return false;
		}

		return isPermitted;
	}

}
