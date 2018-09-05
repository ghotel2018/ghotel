package com.ghotel.oss.console.modules.admin.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ghotel.oss.console.core.common.bean.Message;
import com.ghotel.oss.console.core.common.controller.AbstractModuleCommonController;
import com.ghotel.oss.console.core.security.bean.GroupInfoBean;
import com.ghotel.oss.console.core.security.bean.UserInfoBean;
import com.ghotel.oss.console.core.utils.GocWebUtils;
import com.ghotel.oss.console.core.utils.RequestStatusConstant;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.admin.bean.UserSearchCriteriaBean;
import com.ghotel.oss.console.modules.admin.service.UserMaintenanceService;

@Controller
@RequestMapping("authorized/user")
@RequiresPermissions("User")
@RequiresAuthentication
public class UserMaintenanceController extends AbstractModuleCommonController {

	@Autowired
	UserMaintenanceService userMaintenanceService;

	@RequestMapping("access")
	@RequiresPermissions("User:access")
	public @ResponseBody Message access() {
		String returnUrl = "/module/admin/userMaintenance.html";
		Map<String, String> returnParams = new HashMap<String, String>();
		returnParams.put("url", returnUrl);
		Message message = new Message("", RequestStatusConstant.PAGE_NAVIGATION_ON, returnParams);
		return message;
	}

	@RequestMapping(value = "add", method = RequestMethod.POST)
	@RequiresPermissions("User:add")
	public @ResponseBody Message add(UserInfoBean userInfoBean) throws Exception {
		userMaintenanceService.add(userInfoBean);
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "新增记录请求成功!");
		return message;
	}

	@RequestMapping(value = "update", method = RequestMethod.POST)
	@RequiresPermissions("User:update")
	public @ResponseBody Message update(UserInfoBean userInfoBean) throws Exception {
		userMaintenanceService.update(userInfoBean);
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "更新记录请求成功！");
		return message;
	}

	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@RequiresPermissions("User:delete")
	public @ResponseBody Message deleteUser(UserInfoBean userInfoBean, HttpSession session) throws Exception {
		Message message;
		String userId = GocWebUtils.getSessionUser().map(user -> {
			return user.getUserId();
		}).orElse(null);

		if (userId != null && !userId.equals(userInfoBean.getUserId())) {
			userMaintenanceService.delete(userInfoBean);
			message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "删除记录请求成功！");
		} else {
			message = new Message("", RequestStatusConstant.STATUS_CODE_FAILED, "您不能删除自己！");
		}

		return message;
	}

	@RequestMapping(value = "getAll", method = RequestMethod.POST)
	@RequiresPermissions("User:access")
	public @ResponseBody Message getAll(UserSearchCriteriaBean bean) throws Exception {
		Message message = new Message();
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		PaginationResult<UserInfoBean> pr = userMaintenanceService.getPaginationAll(bean);
		message.setMessageBody(pr);
		return message;
	}

	@RequestMapping(value = "get/{id}", method = RequestMethod.GET)
	@RequiresPermissions("User:access")
	public @ResponseBody Message getRole(@PathVariable("id") String id) throws Exception {
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, userMaintenanceService.get(id));
		return message;
	}

	@RequestMapping(value = "getConfig", method = RequestMethod.GET)
	@RequiresPermissions("User:access")
	public @ResponseBody Message getGroups() throws Exception {
		Message message = new Message();
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		List<GroupInfoBean> list = GocWebUtils.getSessionUser().map(user -> {
			return userMaintenanceService.getCurrenUserRelateGroup(user);
		}).orElse(new ArrayList<>());
		message.setMessageBody(list);
		return message;
	}

}
