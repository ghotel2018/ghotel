package com.ghotel.oss.console.core.security.filter;

import org.aopalliance.intercept.MethodInvocation;
import org.apache.shiro.authz.UnauthenticatedException;
import org.apache.shiro.authz.UnauthorizedException;
import org.apache.shiro.spring.security.interceptor.AopAllianceAnnotationsAuthorizingMethodInterceptor;

import com.ghotel.oss.console.core.common.bean.Message;
import com.ghotel.oss.console.core.utils.RequestStatusConstant;

public class GocPermissionAnnotationMethodInterceptor extends AopAllianceAnnotationsAuthorizingMethodInterceptor {

	public GocPermissionAnnotationMethodInterceptor() {
		super();
	}

	@Override
	public Object invoke(MethodInvocation mi) throws Throwable {
		try {
			return super.invoke(mi);
		} catch (UnauthenticatedException ae) {
			// Annotation handler doesn't know why it was called, so add the information
			// here if possible.
			// Don't wrap the exception here since we don't want to mask the specific
			// exception, such as
			// UnauthenticatedException etc.
			return new Message(null, RequestStatusConstant.STATUS_CODE_NOT_AUTHENTICATED);
		} catch (UnauthorizedException e) {
			return new Message(null, RequestStatusConstant.STATUS_CODE_NOT_AUTHORIZED);
		}
	}

}
