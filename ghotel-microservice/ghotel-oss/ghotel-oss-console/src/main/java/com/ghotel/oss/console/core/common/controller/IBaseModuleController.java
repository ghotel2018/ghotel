package com.ghotel.oss.console.core.common.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ghotel.oss.console.core.common.bean.Message;

public interface IBaseModuleController {

	public String access(HttpServletRequest request,HttpServletResponse response);
	
	public Message add(Object param, HttpServletRequest request,HttpServletResponse response);
	
	public Message update(Object param, HttpServletRequest request,HttpServletResponse response);
	
	public Message delete(int id, HttpServletRequest request,HttpServletResponse response);
	
	public Message get(int id, HttpServletRequest request,HttpServletResponse response);
	
	public Message getAll(Object param, HttpServletRequest request,HttpServletResponse response);
	

}
