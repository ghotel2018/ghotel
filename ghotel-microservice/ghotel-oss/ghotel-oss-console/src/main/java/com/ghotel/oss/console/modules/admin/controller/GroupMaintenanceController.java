package com.ghotel.oss.console.modules.admin.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.ghotel.oss.console.core.security.bean.RoleInfoBean;
import com.ghotel.oss.console.core.security.bean.UserInfoBean;
import com.ghotel.oss.console.core.utils.GocWebUtils;
import com.ghotel.oss.console.core.utils.RequestStatusConstant;
import com.ghotel.oss.console.modules.admin.bean.GroupNRoleBindingBean;
import com.ghotel.oss.console.modules.admin.bean.GroupNUserBindingBean;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.admin.bean.UserSearchCriteriaBean;
import com.ghotel.oss.console.modules.admin.service.GroupMaintenanceService;
import com.ghotel.oss.console.modules.admin.service.UserMaintenanceService;

@Controller
@RequestMapping("authorized/group")
@RequiresPermissions("Group")
@RequiresAuthentication
public class GroupMaintenanceController extends AbstractModuleCommonController {

	@Autowired
	GroupMaintenanceService groupMaintenanceService;
	@Autowired
	UserMaintenanceService userMaintenanceService;

	@RequestMapping("access")
	@RequiresPermissions("Group:access")
	public @ResponseBody Message access() {

		Message message = new Message();
		String returnUrl = "/module/admin/groupMaintenance.html";
		Map<String, String> returnParams = new HashMap<String, String>();
		returnParams.put("url", returnUrl);
		message = new Message("", RequestStatusConstant.PAGE_NAVIGATION_ON, returnParams);
		return message;
	}

	@RequestMapping(value = "add", method = RequestMethod.POST)
	@RequiresPermissions("Group:add")
	public @ResponseBody Message add(GroupInfoBean groupInfoBean) throws Exception {

		Message message = new Message();
		groupInfoBean.setText(groupInfoBean.getGroupName());
		groupMaintenanceService.add(groupInfoBean);
		message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "新增记录请求成功!");
		return message;
	}

	@RequestMapping(value = "update", method = RequestMethod.POST)
	@RequiresPermissions("Group:update")
	public @ResponseBody Message update(GroupInfoBean groupInfoBean) throws Exception {

		Message message = new Message();
		groupInfoBean.setText(groupInfoBean.getGroupName());
		groupMaintenanceService.update(groupInfoBean);
		message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "更新记录请求成功！");
		return message;
	}

	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@RequiresPermissions("Group:delete")
	public @ResponseBody Message delete(GroupInfoBean groupInfoBean) throws Exception {
		Message message = new Message();
		groupMaintenanceService.delete(groupInfoBean);
		message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "删除记录请求成功！");
		return message;
	}

	@RequestMapping(value = "getAll", method = RequestMethod.GET)
	// @RequiresPermissions("Group:getAll")
	@RequiresPermissions("Group:access")
	public @ResponseBody Message getAll() throws Exception {
		Message message = new Message();
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);

		List<GroupInfoBean> list = GocWebUtils.getSessionUser().map(user -> {
			return userMaintenanceService.getCurrenUserRelateGroup(user);
		}).orElse(new ArrayList<>());
		message.setMessageBody(list);
		return message;
	}

	@RequestMapping(value = "get/{id}", method = RequestMethod.GET)
	// @RequiresPermissions("Group:get")
	@RequiresPermissions("Group:access")
	public @ResponseBody Message get(@PathVariable("id") String id) throws Exception {
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, groupMaintenanceService.get(id));
		return message;
	}

	@RequestMapping(value = "getBindings/{id}", method = RequestMethod.GET)
	// @RequiresPermissions("Group:getBindings")
	@RequiresPermissions("Group:access")
	public @ResponseBody Message getBindings(@PathVariable("id") String id) {
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED,
				groupMaintenanceService.getBindings(id));
		return message;
	}

	@RequestMapping(value = "getBindingsUser/{id}", method = RequestMethod.GET)
	@RequiresPermissions("Group:access")
	public @ResponseBody Message getBindingsUser(@PathVariable("id") String id) {
		Message message = new Message();
		message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED,
				groupMaintenanceService.getBindingUser(id));
		return message;
	}

	@RequestMapping(value = "addBindingUser", method = RequestMethod.POST)
	@RequiresPermissions("Group:addBindingUser")
	public @ResponseBody Message addBindingUser(GroupNUserBindingBean groupNUserBindingBean) throws Exception {
		Message message = new Message();
		groupMaintenanceService.addBindingUser(groupNUserBindingBean);
		message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "绑定用户成功！");
		return message;
	}

	@RequestMapping(value = "addBindingRole", method = RequestMethod.POST)
	@RequiresPermissions("Group:addBindingRole")
	public @ResponseBody Message addBindingRole(GroupNRoleBindingBean groupNRoleBindingBean) throws Exception {
		Message message = new Message();
		groupMaintenanceService.addBindingRole(groupNRoleBindingBean);
		message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "绑定角色成功！ ");
		return message;
	}

	@RequestMapping(value = "removeBindingUser", method = RequestMethod.POST)
	@RequiresPermissions("Group:removeBindingUser")
	public @ResponseBody Message removeBindingUser(GroupNUserBindingBean groupNUserBindingBean) throws Exception {
		Message message = new Message();
		groupMaintenanceService.removeBindingUser(groupNUserBindingBean);
		message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "解除用户绑定成功！");
		return message;
	}

	@RequestMapping(value = "removeBindingRole", method = RequestMethod.POST)
	@RequiresPermissions("Group:removeBindingRole")
	public @ResponseBody Message removeBindingRole(GroupNRoleBindingBean groupNRoleBindingBean) throws Exception {
		Message message = new Message();
		groupMaintenanceService.removeBindingRole(groupNRoleBindingBean);
		message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "解除角色绑定成功！");
		return message;
	}

	@RequestMapping(value = "getUsers", method = RequestMethod.POST)
	// @RequiresPermissions("Group:getUsers")
	@RequiresPermissions("Group:access")
	public @ResponseBody Message getUsers(UserSearchCriteriaBean userSearchCriteriaBean) throws Exception {
		Message message = new Message();
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		PaginationResult<UserInfoBean> pr = userMaintenanceService.getUserByPagination(userSearchCriteriaBean);
		message.setMessageBody(pr);
		return message;
	}

	@RequestMapping(value = "getRoles", method = RequestMethod.GET)
	// @RequiresPermissions("Group:getRoles")
	@RequiresPermissions("Group:access")
	public @ResponseBody Message getRoles() throws Exception {
		Message message = new Message();
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		List<RoleInfoBean> list = groupMaintenanceService.getRoles();
		message.setMessageBody(list);
		return message;
	}

}
