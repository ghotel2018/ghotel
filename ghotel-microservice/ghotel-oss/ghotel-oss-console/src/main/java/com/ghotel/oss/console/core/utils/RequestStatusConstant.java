package com.ghotel.oss.console.core.utils;

public class RequestStatusConstant {

	//请求成功
	public static int STATUS_CODE_SECCEED = 0 ; 
	
	//请求出错/系统错误
	public static int STATUS_CODE_FAILED = 1 ;
	
	//权限不足
	public static int STATUS_CODE_NOT_AUTHORIZED = -1 ;
	
	//登录超时，重新登录请求
	public static int STATUS_CODE_RELOGIN_REQUEST = -2 ;
	
	//存在数据库表记录关联关系 
	public static int STATUS_CODE_CONSTRAINT_EXISTS = -3; 
	
	//登录失
	public static int LOGIN_FAILED = -4;
	
	//没有认证
	public static int STATUS_CODE_NOT_AUTHENTICATED = -5 ;
	
	//验证码错误
	public static int VERIFICATION_CODE_NOT_MATCH = -6 ;
	
	//页面跳转
	public static int PAGE_NAVIGATION_ON = 2;
}
