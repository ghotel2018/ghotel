package com.ghotel.oss.console.modules.ghotel.order.controller;

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

import com.ghotel.model.po.order.Order;
import com.ghotel.oss.console.core.common.bean.Message;
import com.ghotel.oss.console.core.constants.RequestStatusConstant;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.ghotel.order.bean.GHotelOrderSearchCriteriaBean;
import com.ghotel.oss.console.modules.ghotel.order.service.GHotelOrderService;

@Controller
@RequestMapping("ghotel/order")
//@RequiresPermissions("GHotelOrder")
@RequiresAuthentication
public class GHotelOrderController {
	@Autowired
	GHotelOrderService gHotelOrderService;

	@RequestMapping("access")
//	@RequiresPermissions("GHotelOrder:access")
	public @ResponseBody Message access() {
		String returnUrl = "/module/ghotelOrder/ghotel-order.html";
		Map<String, String> returnParams = new HashMap<String, String>();
		returnParams.put("url", returnUrl);
		Message message = new Message("", RequestStatusConstant.PAGE_NAVIGATION_ON, returnParams);
		return message;
	}

	@RequestMapping(value = "add", method = RequestMethod.POST)
//	@RequiresPermissions("GHotelOrder:add")
	public @ResponseBody Message add(@RequestBody Order order) throws Exception {
		gHotelOrderService.add(order);
		return new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "新增记录请求成功!");
	}

	@RequestMapping(value = "update", method = RequestMethod.POST)
//	@RequiresPermissions("GHotelOrder:update")
	public @ResponseBody Message update(@RequestBody Order order) throws Exception {
		gHotelOrderService.update(order);
		return new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "更新记录请求成功！");
	}

	@RequestMapping(value = "delete", method = RequestMethod.POST)
//	@RequiresPermissions("GHotelOrder:delete")
	public @ResponseBody Message deleteOrder(@RequestBody Order order) throws Exception {
		gHotelOrderService.delete(order);
		return new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "删除记录请求成功！");
	}

	@RequestMapping(value = "getAll", method = RequestMethod.POST)
//	@RequiresPermissions("GHotelOrder:access")
	public @ResponseBody Message getAll(GHotelOrderSearchCriteriaBean bean) throws Exception {
		Message message = new Message();
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		PaginationResult<Order> pr = gHotelOrderService.getPaginationResult(bean);
		message.setMessageBody(pr);
		return message;
	}

	@RequestMapping(value = "get/{id}", method = RequestMethod.GET)
//	@RequiresPermissions("GHotelOrder:access")
	public @ResponseBody Message getDetail(@PathVariable("id") String id) throws Exception {
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, gHotelOrderService.get(id));
		return message;
	}
}
