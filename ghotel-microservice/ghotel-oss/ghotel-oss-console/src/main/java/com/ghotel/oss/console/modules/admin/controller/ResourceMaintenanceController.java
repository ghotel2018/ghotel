package com.ghotel.oss.console.modules.admin.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ghotel.oss.console.core.common.bean.Message;
import com.ghotel.oss.console.core.common.controller.AbstractModuleCommonController;
import com.ghotel.oss.console.core.security.bean.MenuConfigInfoBean;
import com.ghotel.oss.console.core.security.bean.MenuConfigSearchCriteriaBean;
import com.ghotel.oss.console.core.security.bean.ResourceInfoBean;
import com.ghotel.oss.console.core.utils.GocWebUtils;
import com.ghotel.oss.console.core.utils.RequestStatusConstant;
import com.ghotel.oss.console.modules.admin.bean.ModuleInfoBean;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.admin.bean.ResourceSearchCriteriaBean;
import com.ghotel.oss.console.modules.admin.service.ResourceMaintenanceService;

@Controller
@RequestMapping("authorized/resource")
@RequiresPermissions("Resource")
@RequiresAuthentication
public class ResourceMaintenanceController extends AbstractModuleCommonController {

	@Autowired
	ResourceMaintenanceService resourceMaintenanceService;

	@RequestMapping("access")
	@RequiresPermissions("Resource:access")
	public @ResponseBody Message access() {
		String returnUrl = "/module/admin/resourceMaintenance.html";
		Map<String, String> returnParams = new HashMap<String, String>();
		returnParams.put("url", returnUrl);
		Message message = new Message("", RequestStatusConstant.PAGE_NAVIGATION_ON, returnParams);
		return message;
	}

	@RequestMapping(value = "add", method = RequestMethod.POST)
	@RequiresPermissions("Resource:add")
	public @ResponseBody Message add(ResourceInfoBean bean) throws Exception {
		resourceMaintenanceService.add(bean);
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "新增记录请求成功!");
		return message;
	}

	@RequestMapping(value = "update", method = RequestMethod.POST)
	@RequiresPermissions("Resource:update")
	public @ResponseBody Message updateResource(ResourceInfoBean bean) throws Exception {
		resourceMaintenanceService.update(bean);
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "更新记录请求成功！");
		return message;
	}

	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@RequiresPermissions("Resource:delete")
	public @ResponseBody Message deleteResource(ResourceInfoBean bean) throws Exception {
		resourceMaintenanceService.delete(bean);
		Message message = new Message("", 1, "删除记录请求成功！");
		return message;
	}

	@RequestMapping(value = "getAll", method = RequestMethod.POST)
	@RequiresPermissions("Resource:access")
	public @ResponseBody Message getRoleResources(ResourceSearchCriteriaBean bean) throws Exception {
		Message message = new Message();
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		PaginationResult<ResourceInfoBean> pr = resourceMaintenanceService.getPaginationAll(bean);
		message.setMessageBody(pr);
		return message;
	}

	@RequestMapping(value = "get/{id}", method = RequestMethod.GET)
	@RequiresPermissions("Resource:access")
	public @ResponseBody Message getResource(@PathVariable("id") String id) throws Exception {
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED,
				resourceMaintenanceService.get(id));
		return message;
	}

	@RequestMapping(value = "getConfig", method = RequestMethod.GET)
	@RequiresPermissions("Resource:access")
	public @ResponseBody Message getConfig() throws Exception {
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED,
				resourceMaintenanceService.getAllModule());
		return message;
	}

	@RequestMapping(value = "addModule", method = RequestMethod.POST)
	@RequiresPermissions("Resource:addModule")
	public @ResponseBody Message addModule(ModuleInfoBean bean) throws Exception {
		resourceMaintenanceService.addModule(bean);
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "添加模块成功!");
		return message;
	}

	@RequestMapping(value = "loadMenuConfig", method = RequestMethod.GET)
	@RequiresPermissions("Resource:loadMenuConfig")
	public @ResponseBody Message loadMenuConfig() throws Exception {
		Message message = new Message();
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		List<MenuConfigInfoBean> list = resourceMaintenanceService.getAllMenuConfig();
		message.setMessageBody(list);
		return message;
	}

	@RequestMapping(value = "updateMenu", method = RequestMethod.POST)
	@RequiresPermissions("Resource:updateMenu")
	public @ResponseBody Message updateMenu(@RequestBody MenuConfigSearchCriteriaBean bean) throws Exception {
		resourceMaintenanceService.updateMenuConfig(bean);
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "更新菜单配置成功!");
		return message;
	}

	@RequestMapping(value = "deleteMenu", method = RequestMethod.POST)
	@RequiresPermissions("Resource:deleteMenu")
	public @ResponseBody Message deleteMenu(MenuConfigInfoBean bean) throws Exception {
		resourceMaintenanceService.deleteMenuConfig(bean);
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "删除菜单配置成功!");
		return message;
	}

	@RequestMapping(value = "addMenu", method = RequestMethod.POST)
	@RequiresPermissions("Resource:addMenu")
	public @ResponseBody Message addMenu(MenuConfigSearchCriteriaBean bean) throws Exception {
		resourceMaintenanceService.addMenuConfig(bean);
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "添加菜单配置成功!");
		return message;
	}

	@RequestMapping(value = "updateMenuOrder", method = RequestMethod.POST)
	@RequiresPermissions("Resource:updateMenuOrder")
	public @ResponseBody Message updateMenuOrder(MenuConfigInfoBean[] beanArray) throws Exception {

		resourceMaintenanceService.updateMenuOrder(Arrays.asList(beanArray));
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED);
		return message;
	}

}
