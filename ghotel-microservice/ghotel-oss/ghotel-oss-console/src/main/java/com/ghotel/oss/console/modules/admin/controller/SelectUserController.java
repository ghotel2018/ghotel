package com.ghotel.oss.console.modules.admin.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authz.annotation.RequiresAuthentication;
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
import com.ghotel.oss.console.modules.admin.service.GroupMaintenanceService;
import com.ghotel.oss.console.modules.admin.service.UserMaintenanceService;

@Controller
@RequestMapping("authorized/selectuser")
// @RequiresPermissions("SelectUser")
@RequiresAuthentication
public class SelectUserController extends AbstractModuleCommonController {

	@Autowired
	GroupMaintenanceService groupMaintenanceService;
	@Autowired
	UserMaintenanceService userMaintenanceService;

	@RequestMapping("access")
	// @RequiresPermissions("SelectUser:access")
	public @ResponseBody Message access(HttpServletRequest request, HttpServletResponse response) {
		String returnUrl = "module/user/selectGroupUser.html";
		Map<String, String> returnParams = new HashMap<String, String>();
		returnParams.put("url", returnUrl);
		this.message = new Message("", RequestStatusConstant.PAGE_NAVIGATION_ON, returnParams);
		return this.message;
	}

	@RequestMapping(value = "getAll", method = RequestMethod.GET)
	// @RequiresPermissions("SelectUser:access")
	public @ResponseBody Message getAll(HttpServletRequest request, HttpServletResponse response) throws Exception {
		message = new Message();
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		// String groupType = ((UserInfoBean)
		// request.getSession().getAttribute("user")).getGroupType();
		List<GroupInfoBean> list = groupMaintenanceService
				.getParentGroupsInfo(((UserInfoBean) request.getSession().getAttribute("user")).getUserId());
		message.setMessageBody(GocWebUtils.treeMenuList(list, null));
		return this.message;
	}

	@RequestMapping(value = "queryAll", method = RequestMethod.GET)
	// @RequiresPermissions("SelectUser:access")
	public @ResponseBody Message queryAll() throws Exception {
		message = new Message();
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		List<GroupInfoBean> list = GocWebUtils.getSessionUser().map(user -> {
			return userMaintenanceService.getCurrenUserRelateGroup(user);
		}).orElse(new ArrayList<>());
		message.setMessageBody(list);
		return this.message;
	}

	@RequestMapping(value = "getBindingsUser/{id}", method = RequestMethod.GET)
	// @RequiresPermissions("SelectUser:access")
	public @ResponseBody Message getBindingsUser(@PathVariable("id") String id, HttpServletRequest request,
			HttpServletResponse response) {
		this.message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED,
				groupMaintenanceService.getBindingUser(id));
		return this.message;
	}

	@RequestMapping(value = "getUsers", method = RequestMethod.POST)
	// @RequiresPermissions("SelectUser:access")
	public @ResponseBody Message getUsers(UserSearchCriteriaBean userSearchCriteriaBean) throws Exception {
		message = new Message();
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		PaginationResult<UserInfoBean> pr = userMaintenanceService.getUserByPagination(userSearchCriteriaBean);
		message.setMessageBody(pr);
		return message;
	}

}
