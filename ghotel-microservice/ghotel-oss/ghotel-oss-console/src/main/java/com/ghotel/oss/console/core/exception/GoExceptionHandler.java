package com.ghotel.oss.console.core.exception;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import com.ghotel.oss.console.core.common.bean.Message;
import com.ghotel.oss.console.core.constants.RequestStatusConstant;

public class GoExceptionHandler implements HandlerExceptionResolver {

	private static final Logger logger = LoggerFactory.getLogger(GoExceptionHandler.class);

	// 本地异常日志记录对象
	// private static final Logger logger =
	// Logger.getLogger(GoExceptionHandler.class.getName());

	@Override
	public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler,
			Exception ex) {
		logger.error("face error:", ex);
		ex.printStackTrace();
		if ("XMLHttpRequest".equalsIgnoreCase(((HttpServletRequest) request).getHeader("X-Requested-With"))) {
			response.setCharacterEncoding("UTF-8");
			Message message = null;
			if (ex instanceof org.apache.shiro.authz.UnauthenticatedException) {
				message = new Message("", RequestStatusConstant.STATUS_CODE_NOT_AUTHENTICATED);
			} else if (ex instanceof org.apache.shiro.authz.UnauthorizedException) {
				String text = ex.getMessage();
				text = text.substring(text.lastIndexOf("["));
				message = new Message("", RequestStatusConstant.STATUS_CODE_NOT_AUTHORIZED, text);
			} else if (ex instanceof org.springframework.web.HttpRequestMethodNotSupportedException) {
				message = new Message("", RequestStatusConstant.STATUS_CODE_FAILED);
			} else if (ex instanceof org.springframework.web.multipart.MaxUploadSizeExceededException) {
				message = new Message("", RequestStatusConstant.STATUS_CODE_FAILED, "文件大小超过限制,最大为100M。");
			} else {
				message = new Message("", RequestStatusConstant.STATUS_CODE_FAILED);
			}

			try {
				response.getWriter().write(message.toString());
				response.getWriter().flush();
				response.getWriter().close();
			} catch (IOException e) {
				logger.error("face error:", ex);
			}
			return new ModelAndView();
		} else {
			Message message = null;
			if (ex instanceof org.apache.shiro.authz.UnauthenticatedException) {
				message = new Message("", RequestStatusConstant.STATUS_CODE_NOT_AUTHENTICATED);

				// return new ModelAndView(new RedirectView("/login.html"));
			} else if (ex instanceof org.apache.shiro.authz.UnauthorizedException) {
				String text = ex.getMessage();
				text = text.substring(text.lastIndexOf("["));
				message = new Message("", RequestStatusConstant.STATUS_CODE_NOT_AUTHORIZED, text);
				// return new ModelAndView(new RedirectView("/403.html"));
			} else if (ex instanceof org.springframework.web.HttpRequestMethodNotSupportedException) {
				message = new Message("", RequestStatusConstant.STATUS_CODE_FAILED);
			} else if (ex instanceof org.springframework.web.multipart.MaxUploadSizeExceededException) {
				message = new Message("", RequestStatusConstant.STATUS_CODE_FAILED, "文件大小超过限制,最大为80M。");
			} else {
				message = new Message("", RequestStatusConstant.STATUS_CODE_FAILED);
			}
			/*
			 * request.setAttribute("message", message.toString()); return new
			 * ModelAndView(new InternalResourceView("/navigation.jsp"));
			 */
			try {
				response.getWriter().write(message.toString());
				response.getWriter().close();
			} catch (IOException e) {
				logger.error("face error:", ex);
			}
			return null;
		}
	}

}
