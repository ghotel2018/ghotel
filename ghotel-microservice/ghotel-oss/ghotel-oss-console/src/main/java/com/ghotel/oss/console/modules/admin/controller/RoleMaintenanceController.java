package com.ghotel.oss.console.modules.admin.controller;

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
import com.ghotel.oss.console.core.security.bean.PermissionInfoBean;
import com.ghotel.oss.console.core.security.bean.RoleInfoBean;
import com.ghotel.oss.console.core.utils.GocWebUtils;
import com.ghotel.oss.console.core.utils.RequestStatusConstant;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.admin.bean.PermissionSearchCriteriaBean;
import com.ghotel.oss.console.modules.admin.bean.RoleNPermissionBean;
import com.ghotel.oss.console.modules.admin.service.PermissionMaintenanceService;
import com.ghotel.oss.console.modules.admin.service.roleMaintenanceService;

@Controller
@RequestMapping("authorized/role")
@RequiresPermissions("Role")
@RequiresAuthentication
public class RoleMaintenanceController extends AbstractModuleCommonController {

	@Autowired
	roleMaintenanceService roleMaintenanceService;
	@Autowired
	PermissionMaintenanceService permissionMaintenanceService;

	@RequestMapping("access")
	@RequiresPermissions("Role:access")
	public @ResponseBody Message access() {
		String returnUrl = "/module/admin/roleMaintenance.html";
		Map<String, String> returnParams = new HashMap<String, String>();
		returnParams.put("url", returnUrl);
		Message message = new Message("", RequestStatusConstant.PAGE_NAVIGATION_ON, returnParams);
		return message;
	}

	@RequestMapping(value = "add", method = RequestMethod.POST)
	@RequiresPermissions("Role:add")
	public @ResponseBody Message add(RoleInfoBean bean) throws Exception {
		bean.setText(bean.getRoleName());
		roleMaintenanceService.add(bean);
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "新增记录请求成功!");
		return message;
	}

	@RequestMapping(value = "update", method = RequestMethod.POST)
	@RequiresPermissions("Role:update")
	public @ResponseBody Message update(RoleInfoBean bean) throws Exception {
		bean.setText(bean.getRoleName());
		roleMaintenanceService.update(bean);
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "更新记录请求成功！");
		return message;
	}

	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@RequiresPermissions("Role:delete")
	public @ResponseBody Message delete(RoleInfoBean bean) throws Exception {
		roleMaintenanceService.delete(bean);
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "删除记录请求成功！");
		return message;
	}

	@RequestMapping(value = "getAll", method = RequestMethod.GET)
	@RequiresPermissions("Role:access")
	public @ResponseBody Message getAllRoles() throws Exception {
		Message message = new Message();
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		List<RoleInfoBean> list = roleMaintenanceService.getAll();
		message.setMessageBody(GocWebUtils.treeMenuList(list, null));
		return message;
	}

	@RequestMapping(value = "get/{id}", method = RequestMethod.GET)
	@RequiresPermissions("Role:access")
	public @ResponseBody Message getRole(@PathVariable("id") String id) throws Exception {
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, roleMaintenanceService.get(id));
		return message;
	}

	@RequestMapping(value = "addBindingPerm", method = RequestMethod.POST)
	@RequiresPermissions("Role:addBindingPerm")
	public @ResponseBody Message addBindingPermission(RoleNPermissionBean bean) throws Exception {
		roleMaintenanceService.addBindingPermission(bean);
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "绑定权限成功！");
		return message;
	}

	@RequestMapping(value = "rmBindingPerm", method = RequestMethod.POST)
	@RequiresPermissions("Role:rmBindingPerm")
	public @ResponseBody Message removeBindingPermission(RoleNPermissionBean bean) throws Exception {
		roleMaintenanceService.removeBindingPermission(bean);
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "解除权限绑定成功！");
		return message;
	}

	@RequestMapping(value = "getBindingPerms/{id}", method = RequestMethod.GET)
	@RequiresPermissions("Role:access")
	public @ResponseBody Message getBindingPermissions(@PathVariable("id") String id) {
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED,
				roleMaintenanceService.getBindingPermission(id));
		return message;
	}

	@RequestMapping(value = "getAllPerms", method = RequestMethod.POST)
	@RequiresPermissions("Role:access")
	public @ResponseBody Message getAllPermissions(PermissionSearchCriteriaBean bean) throws Exception {
		Message message = new Message();
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		PaginationResult<PermissionInfoBean> pr = permissionMaintenanceService.getPermissionByPagination(bean);
		message.setMessageBody(pr);
		return message;
	}

}
