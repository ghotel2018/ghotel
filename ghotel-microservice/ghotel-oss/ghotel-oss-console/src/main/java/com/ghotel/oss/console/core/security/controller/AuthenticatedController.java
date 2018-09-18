package com.ghotel.oss.console.core.security.controller;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ghotel.oss.console.core.common.bean.Message;
import com.ghotel.oss.console.core.common.controller.AbstractModuleCommonController;
import com.ghotel.oss.console.core.security.bean.PageConfigBean;
import com.ghotel.oss.console.core.security.bean.UserInfoBean;
import com.ghotel.oss.console.core.security.service.SecurityService;
import com.ghotel.oss.console.core.utils.GocWebUtils;
import com.ghotel.oss.console.core.constants.RequestStatusConstant;

@Controller
@RequestMapping("authenticated")
public class AuthenticatedController extends AbstractModuleCommonController {

	@Autowired
	private SecurityService securityService;

	@RequestMapping(value = "getPageConfig/{module}", method = RequestMethod.GET)
	public @ResponseBody Message getPageConfig(@PathVariable("module") String module) throws Exception {
		Message message;
		Subject currentUser = SecurityUtils.getSubject();
		if (currentUser.isAuthenticated()) {
			PageConfigBean config = securityService.getMenuConfig(GocWebUtils.getSessionUser().get(), module);
			// GocWebUtils.updateUserSession(config.getUser());
			// Clear the password in case of exposing it to the Browser.
			config.getUser().setPassword(null);
			message = new Message(null, RequestStatusConstant.STATUS_CODE_SECCEED, config);
		} else {
			message = new Message(null, RequestStatusConstant.STATUS_CODE_NOT_AUTHENTICATED);
		}

		return message;
	}

	@RequestMapping(value = "updateUser", method = RequestMethod.POST)
	public @ResponseBody Message updateUserInfo(UserInfoBean bean) throws Exception {
		Message message;
		Subject currentUser = SecurityUtils.getSubject();
		if (currentUser.isAuthenticated()) {
			message = GocWebUtils.getSessionUser().map(cacheUser -> {
				if (bean.getUserId() == cacheUser.getUserId() && securityService.updateUserInfo(bean)) {
					GocWebUtils.updateUserSession(bean);
					return new Message(null, RequestStatusConstant.STATUS_CODE_SECCEED, "更新用户成功！");
				} else {
					return new Message(null, RequestStatusConstant.STATUS_CODE_FAILED, "更新用户失败！");
				}
			}).orElse(new Message(null, RequestStatusConstant.STATUS_CODE_NOT_AUTHENTICATED));
		} else {
			message = new Message(null, RequestStatusConstant.STATUS_CODE_NOT_AUTHENTICATED);
		}
		return message;
	}

	@RequestMapping(value = "pwdReset", method = RequestMethod.POST)
	public @ResponseBody Message pwdReset(@RequestParam String oldPwd, @RequestParam String newPwd) {
		Message message;
		Subject currentUser = SecurityUtils.getSubject();
		if (currentUser.isAuthenticated()) {
			UserInfoBean cacheUser = GocWebUtils.getSessionUser().get();
			cacheUser.setPassword(newPwd);
			if (securityService.resetPassword(cacheUser, oldPwd)) {
				GocWebUtils.updateUserSession(cacheUser);
				message = new Message(null, RequestStatusConstant.STATUS_CODE_SECCEED, "密码重置成功!");
			} else {
				message = new Message(null, RequestStatusConstant.STATUS_CODE_FAILED, "旧密码不对!");
			}
		} else {
			message = new Message(null, RequestStatusConstant.STATUS_CODE_NOT_AUTHENTICATED);
		}
		return message;
	}

}
