package com.ghotel.oss.console.core.common.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.ghotel.oss.console.core.common.bean.Message;
import com.ghotel.oss.console.core.common.file.FileHandler;
import common.Logger;

public abstract class AbstractModuleCommonController {

	protected Logger logger = Logger.getLogger(this.getClass());

	public static final String LOGIN_PAGE = "/login.html";

	public static final String STATIC_RESOURCE_URL = "/resource";

	// public static final String USER_LOGIN_ID_KEY = "userLoginId";

	/*
	 * protected abstract String access(HttpServletRequest
	 * request,HttpServletResponse response);
	 * 
	 * protected abstract Message add(Object object, HttpServletRequest
	 * request,HttpServletResponse response);
	 * 
	 * protected abstract Message update(Object object, HttpServletRequest
	 * request,HttpServletResponse response);
	 * 
	 * protected abstract Message delete(int id, HttpServletRequest
	 * request,HttpServletResponse response);
	 * 
	 * protected abstract Message get(int id, HttpServletRequest
	 * request,HttpServletResponse response);
	 * 
	 * protected abstract Message getAll(Object object, HttpServletRequest
	 * request,HttpServletResponse response);
	 */

	 protected Message message;

	protected FileHandler handler;

	// public Message getMessage() {
	// return message;
	// }
	//
	// public void setMessage(Message message) {
	// this.message = message;
	// }

	@RequestMapping("/uploadFile")
	public void handlerFileUploadRequest(@RequestParam MultipartFile[] files, HttpServletRequest request,
			HttpServletResponse response) {
		for (MultipartFile file : files) {
			handler.proceedFileUpload(file, request, response);
		}
	}

	@RequestMapping("/downloadFile")
	public void handlerFileDownloadRequest(HttpServletRequest request, HttpServletResponse response) {
		handler.proceedFileDownload(request, response);
	}

	// protected String getUserLoginIdFromSession(HttpServletRequest request) {
	// return request.getSession().getAttribute(USER_LOGIN_ID_KEY).toString();
	// }

}
