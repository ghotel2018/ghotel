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

import com.ghotel.model.po.order.Payment;
import com.ghotel.oss.console.core.common.bean.Message;
import com.ghotel.oss.console.core.constants.RequestStatusConstant;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.ghotel.order.bean.GHotelPaymentSearchCriteriaBean;
import com.ghotel.oss.console.modules.ghotel.order.service.GHotelPaymentService;

@Controller
@RequestMapping("ghotel/payment")
//@RequiresPermissions("GHotelPayment")
@RequiresAuthentication
public class GHotelPaymentController {
	@Autowired
	GHotelPaymentService gHotelPaymentService;

	@RequestMapping("access")
//	@RequiresPermissions("GHotelPayment:access")
	public @ResponseBody Message access() {
		String returnUrl = "/module/ghotelOrder/ghotel-payment.html";
		Map<String, String> returnParams = new HashMap<String, String>();
		returnParams.put("url", returnUrl);
		Message message = new Message("", RequestStatusConstant.PAGE_NAVIGATION_ON, returnParams);
		return message;
	}

	@RequestMapping(value = "add", method = RequestMethod.POST)
//	@RequiresPermissions("GHotelPayment:add")
	public @ResponseBody Message add(@RequestBody Payment payment) throws Exception {
		gHotelPaymentService.add(payment);
		return new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "新增记录请求成功!");
	}

	@RequestMapping(value = "update", method = RequestMethod.POST)
//	@RequiresPermissions("GHotelPayment:update")
	public @ResponseBody Message update(@RequestBody Payment payment) throws Exception {
		gHotelPaymentService.update(payment);
		return new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "更新记录请求成功！");
	}

	@RequestMapping(value = "delete", method = RequestMethod.POST)
//	@RequiresPermissions("GHotelPayment:delete")
	public @ResponseBody Message deletePayment(@RequestBody Payment payment) throws Exception {
		gHotelPaymentService.delete(payment);
		return new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "删除记录请求成功！");
	}

	@RequestMapping(value = "getAll", method = RequestMethod.POST)
//	@RequiresPermissions("GHotelPayment:access")
	public @ResponseBody Message getAll(GHotelPaymentSearchCriteriaBean bean) throws Exception {
		Message message = new Message();
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		PaginationResult<Payment> pr = gHotelPaymentService.getPaginationResult(bean);
		message.setMessageBody(pr);
		return message;
	}

	@RequestMapping(value = "get/{id}", method = RequestMethod.GET)
//	@RequiresPermissions("GHotelPayment:access")
	public @ResponseBody Message getDetail(@PathVariable("id") String id) throws Exception {
		Message message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, gHotelPaymentService.get(id));
		return message;
	}
}
