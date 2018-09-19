package com.ghotel.oss.console.modules.ghotel.user.controller;

import java.util.Date;
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

import com.ghotel.model.po.CommonMeta;
import com.ghotel.model.po.user.User;
import com.ghotel.oss.console.core.common.bean.Message;
import com.ghotel.oss.console.core.constants.RequestStatusConstant;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.ghotel.user.beam.GHotelUserSearchCriteriaBean;
import com.ghotel.oss.console.modules.ghotel.user.service.GHotelUserService;

@Controller
@RequestMapping("ghotel/user")
//@RequiresPermissions("GHotelUser")
@RequiresAuthentication
public class GHotelUserController {
	@Autowired
	GHotelUserService gHotelUserService;

	@RequestMapping("access")
//	@RequiresPermissions("GHotelUser:access")
	public @ResponseBody Message access() {
		String returnUrl = "/module/ghotelUser/userMaintenance.html";
		Map<String, String> returnParams = new HashMap<String, String>();
		returnParams.put("url", returnUrl);
		Message message = new Message("", RequestStatusConstant.PAGE_NAVIGATION_ON, returnParams);
		return message;
	}

	@RequestMapping(value = "add", method = RequestMethod.POST)
//	@RequiresPermissions("GHotelUser:add")
	public @ResponseBody Message add(User user) throws Exception {
		Date now = new Date();

		user.setJoinDate(now);

		CommonMeta commonMeta = new CommonMeta();
		commonMeta.setCreateTime(now);
		commonMeta.setDelFlag(false);
		commonMeta.setLastUpdateTime(now);
		user.setCommonMeta(commonMeta);
		gHotelUserService.add(user);
		return new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "新增记录请求成功!");
	}

	@RequestMapping(value = "update", method = RequestMethod.POST)
//	@RequiresPermissions("GHotelUser:update")
	public @ResponseBody Message update(User user) throws Exception {
		gHotelUserService.update(user);
		return new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "更新记录请求成功！");
	}

	@RequestMapping(value = "delete", method = RequestMethod.POST)
//	@RequiresPermissions("GHotelUser:delete")
	public @ResponseBody Message deleteUser(@RequestBody User user) throws Exception {
		gHotelUserService.delete(user);
		return new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "删除记录请求成功！");
	}

	@RequestMapping(value = "getAll", method = RequestMethod.POST)
//	@RequiresPermissions("GHotelUser:access")
	public @ResponseBody Message getAll(GHotelUserSearchCriteriaBean bean) throws Exception {
		Message message = new Message();
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		PaginationResult<User> pr = gHotelUserService.getPaginationResult(bean);
		message.setMessageBody(pr);
		return message;
	}

	@RequestMapping(value = "get/{id}", method = RequestMethod.GET)
//	@RequiresPermissions("GHotelUser:access")
	public @ResponseBody Message getDetail(@PathVariable("id") String id) throws Exception {
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, gHotelUserService.get(id));
		return message;
	}
}
