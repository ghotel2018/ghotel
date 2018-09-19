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
import com.ghotel.oss.console.core.constants.RequestStatusConstant;
import com.ghotel.oss.console.core.security.bean.PermissionInfoBean;
import com.ghotel.oss.console.core.security.bean.ResourceInfoBean;
import com.ghotel.oss.console.core.security.bean.RoleInfoBean;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.admin.bean.PermissionSearchCriteriaBean;
import com.ghotel.oss.console.modules.admin.bean.PermissionWithResourceDetailBean;
import com.ghotel.oss.console.modules.admin.bean.ResourceSearchCriteriaBean;
import com.ghotel.oss.console.modules.admin.service.PermissionMaintenanceService;
import com.ghotel.oss.console.modules.admin.service.ResourceMaintenanceService;

@Controller
@RequestMapping("authorized/permission")
@RequiresPermissions("Permission")
@RequiresAuthentication
public class PermissionMaintenanceController extends AbstractModuleCommonController {

	@Autowired
	PermissionMaintenanceService permissionMaintenanceService;
	@Autowired
	ResourceMaintenanceService resourceMaintenanceService;

	@RequestMapping("access")
	@RequiresPermissions("Permission:access")
	public @ResponseBody Message access() {
		String returnUrl = "/module/admin/permissionMaintenance.html";
		Map<String, String> returnParams = new HashMap<String, String>();
		returnParams.put("url", returnUrl);
		Message message = new Message("", RequestStatusConstant.PAGE_NAVIGATION_ON, returnParams);
		return message;
	}

	// 新增permission需要的资源
	@RequestMapping(value = "add", method = RequestMethod.POST)
	@RequiresPermissions("Permission:add")
	public @ResponseBody Message add(PermissionWithResourceDetailBean permissionWithResourceDetailBean)
			throws Exception {
		String id = permissionMaintenanceService.add(permissionWithResourceDetailBean);
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, id);
		return message;
	}
	// 新增permission需要的资源

	// 更新permission需要的资源
	@RequestMapping(value = "update", method = RequestMethod.POST)
	@RequiresPermissions("Permission:update")
	public @ResponseBody Message updatePermission(PermissionInfoBean bean) throws Exception {
		permissionMaintenanceService.updatePermission(bean);
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "更新记录请求成功！");
		return message;
	}

	@RequestMapping(value = "get/{id}", method = RequestMethod.GET)
	@RequiresPermissions("Permission:update")
	public @ResponseBody Message getPermission(@PathVariable("id") int id) throws Exception {

		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED,
				permissionMaintenanceService.get(String.valueOf(id)));
		return message;
	}
	// 更新permission需要的资源

	// 删除permission需要的资源
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@RequiresPermissions("Permission:delete")
	public @ResponseBody Message deletePermission(PermissionInfoBean bean) throws Exception {
		permissionMaintenanceService.delete(bean);
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "删除记录请求成功！");
		return message;
	}
	// 删除permission需要的资源

	// 查询permission需要的资源

	@RequestMapping(value = "getAll", method = RequestMethod.POST)
	@RequiresPermissions("Permission:access")
	public @ResponseBody Message getPermissions(PermissionSearchCriteriaBean permissionSearchCriteriaBean)
			throws Exception {
		Message message = new Message();
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		PaginationResult<PermissionInfoBean> pr = permissionMaintenanceService
				.getPaginationResult(permissionSearchCriteriaBean);
		message.setMessageBody(pr);
		return message;
	}

	@RequestMapping(value = "getRoles", method = RequestMethod.GET)
	@RequiresPermissions("Permission:access")
	public @ResponseBody Message getRoles() throws Exception {
		Message message = new Message();
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		List<RoleInfoBean> list = permissionMaintenanceService.getRoles();
		message.setMessageBody(list);
		return message;
	}
	// 查询需要的permission

	// 新增，更新需要的共用
	@RequestMapping(value = "getBindingResource/{id}", method = RequestMethod.GET)
	@RequiresPermissions("Permission:access")
	public @ResponseBody Message getBindingResource(@PathVariable("id") String id) throws Exception {
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED,
				permissionMaintenanceService.getBindingResources(id));
		return message;
	}

	@RequestMapping(value = "addBindingResource", method = RequestMethod.POST)
	@RequiresPermissions("Permission:addBindingResource")
	public @ResponseBody Message addBindingResource(PermissionWithResourceDetailBean bean) throws Exception {
		permissionMaintenanceService.addBindingResource(bean);
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "绑定资源成功！");
		return message;
	}

	@RequestMapping(value = "removeBindingResource", method = RequestMethod.POST)
	@RequiresPermissions("Permission:removeBindingResource")
	public @ResponseBody Message removeBindingResource(PermissionWithResourceDetailBean bean) throws Exception {
		permissionMaintenanceService.removeBindingResource(bean);
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "资源解绑成功！");
		return message;
	}

	// 插叙资源页面需要的permission
	@RequestMapping(value = "getAllResources", method = RequestMethod.POST)
	@RequiresPermissions("Permission:access")
	public @ResponseBody Message getAllResources(ResourceSearchCriteriaBean resourceSearchCriteriaBean)
			throws Exception {
		Message message = new Message();
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		PaginationResult<ResourceInfoBean> pr = resourceMaintenanceService
				.getResourceByPagination(resourceSearchCriteriaBean);
		message.setMessageBody(pr);
		return message;
	}

	@RequestMapping(value = "getConfig", method = RequestMethod.GET)
	@RequiresPermissions("Permission:access")
	public @ResponseBody Message getConfig() throws Exception {
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED,
				resourceMaintenanceService.getAllModule());
		// return options;
		return message;
	}
	// 插叙资源页面需要的方法, 所以permission是一类

}
