package com.ghotel.oss.console.modules.ghotel.user.controller;

import java.util.HashMap;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ghotel.model.po.user.Account;
import com.ghotel.oss.console.core.common.bean.Message;
import com.ghotel.oss.console.core.constants.RequestStatusConstant;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.ghotel.user.bean.GHotelAccountSearchCriteriaBean;
import com.ghotel.oss.console.modules.ghotel.user.service.GHotelAccountService;

@Controller
@RequestMapping("ghotel/account")
//@RequiresPermissions("GHotelUser")
@RequiresAuthentication
public class GHotelAccountController {
	@Autowired
	GHotelAccountService gHotelAccountService;

	@RequestMapping("access")
//	@RequiresPermissions("GHotelUser:access")
	public @ResponseBody Message access() {
		String returnUrl = "/module/ghotelUser/ghotel-account.html";
		Map<String, String> returnParams = new HashMap<String, String>();
		returnParams.put("url", returnUrl);
		Message message = new Message("", RequestStatusConstant.PAGE_NAVIGATION_ON, returnParams);
		return message;
	}

	@RequestMapping(value = "add", method = RequestMethod.POST)
//	@RequiresPermissions("GHotelUser:add")
	public @ResponseBody Message add(@RequestBody Account account) throws Exception {
		gHotelAccountService.add(account);
		return new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "新增记录请求成功!");
	}

	@RequestMapping(value = "update", method = RequestMethod.POST)
//	@RequiresPermissions("GHotelUser:update")
	public @ResponseBody Message update(@RequestBody Account account) throws Exception {
		gHotelAccountService.update(account);
		return new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "更新记录请求成功！");
	}

	@RequestMapping(value = "delete", method = RequestMethod.POST)
//	@RequiresPermissions("GHotelUser:delete")
	public @ResponseBody Message deleteUser(@RequestBody Account account) throws Exception {
		gHotelAccountService.delete(account);
		return new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "删除记录请求成功！");
	}

	@RequestMapping(value = "getAll", method = RequestMethod.POST)
//	@RequiresPermissions("GHotelUser:access")
	public @ResponseBody Message getAll(GHotelAccountSearchCriteriaBean bean) throws Exception {
		Message message = new Message();
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		PaginationResult<Account> pr = gHotelAccountService.getPaginationResult(bean);
		message.setMessageBody(pr);
		return message;
	}

	@RequestMapping(value = "get/{id}", method = RequestMethod.GET)
//	@RequiresPermissions("GHotelUser:access")
	public @ResponseBody Message getDetail(@PathVariable("id") String id) throws Exception {
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, gHotelAccountService.get(id));
		return message;
	}
}
