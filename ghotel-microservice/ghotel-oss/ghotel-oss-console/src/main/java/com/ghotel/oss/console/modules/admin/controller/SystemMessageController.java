package com.ghotel.oss.console.modules.admin.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import com.ghotel.oss.console.core.utils.GocWebUtils;
import com.ghotel.oss.console.core.constants.RequestStatusConstant;
import com.ghotel.oss.console.core.utils.GocUserUtils;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.admin.bean.SystemMessageBean;
import com.ghotel.oss.console.modules.admin.service.SystemMessageService;

@Controller
@RequestMapping("authorized/systemMessage")
@RequiresPermissions("systemMessage")
@RequiresAuthentication
public class SystemMessageController extends AbstractModuleCommonController {

	@Autowired
	SystemMessageService systemMessageService;

	@ResponseBody
	@RequestMapping("access")
	@RequiresPermissions("systemMessage:access")
	public Message access(HttpServletRequest request, HttpServletResponse response) {
		String returnUrl = "/module/admin/systemMessage.html";
		Map<String, String> returnParams = new HashMap<String, String>();
		returnParams.put("url", returnUrl);
		Message message = new Message("", RequestStatusConstant.PAGE_NAVIGATION_ON, returnParams);
		return message;
	}

	@ResponseBody
	@RequiresPermissions("systemMessage:access")
	@RequestMapping(value = "getAll", method = RequestMethod.POST)
	public Message getSystemMessage(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Message message = new Message();
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		PaginationResult pr = systemMessageService
				.getPaginationAll(GocWebUtils.formatBeanFromRequest(request, SystemMessageBean.class));
		message.setMessageBody(pr);
		return message;
	}

	@ResponseBody
	@RequiresPermissions("systemMessage:delete")
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	public Message deleteResource(HttpServletRequest request, HttpServletResponse response) throws Exception {
		SystemMessageBean systemMessage = GocWebUtils.formatBeanFromRequest(request, SystemMessageBean.class);
		systemMessageService.delete(systemMessage);
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "删除记录成功");
		// message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		// message.setMessageCode("删除记录成功");
		// message.setMessageBody("删除记录成功");
		return message;
	}

	@ResponseBody
	@RequiresPermissions("systemMessage:add")
	@RequestMapping(value = "add", method = RequestMethod.POST)
	public Message add(HttpServletRequest request) throws Exception {
		SystemMessageBean message = GocWebUtils.formatBeanFromRequest(request, SystemMessageBean.class);
		message.setMessageId(UUID.randomUUID().toString());
		message.setCreateDate(new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
		message.setCreateBy(GocUserUtils.getLoginUserLoginId());
		systemMessageService.add(message);
		Message result = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "新增记录请求成功!");
		return result;
	}

	@ResponseBody
	@RequiresPermissions("systemMessage:access")
	@RequestMapping(value = "get/{id}", method = RequestMethod.GET)
	public Message getResource(@PathVariable("id") String id, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, systemMessageService.get(id));
		return message;
	}

	@ResponseBody
	@RequiresPermissions("systemMessage:update")
	@RequestMapping(value = "update", method = RequestMethod.POST)
	public Message updateResource(HttpServletRequest request) throws Exception {
		Message message;
		systemMessageService.update(GocWebUtils.formatBeanFromRequest(request, SystemMessageBean.class));
		message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "更新记录请求成功！");
		return message;
	}

}
