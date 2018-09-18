package com.ghotel.oss.console.modules.admin.controller;

import java.util.HashMap;
import java.util.Map;

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
import com.ghotel.oss.console.modules.admin.bean.MqMsgRecordBean;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.admin.bean.SystemMessageBean;
import com.ghotel.oss.console.modules.admin.service.MqMsgRecordService;

/**
 * @author yys
 *
 */
@Controller
@RequiresAuthentication
@RequiresPermissions("MqMsgRecord")
@RequestMapping("authorized/mqMsgRecord")
public class MqMsgRecordController extends AbstractModuleCommonController {
	//
	// @Autowired
	// private MqMsgRecordService mqMsgRecordService;
	//
	// @ResponseBody
	// @RequestMapping("access")
	// @RequiresPermissions("MqMsgRecord:access")
	// public Message access(HttpServletRequest request, HttpServletResponse
	// response) {
	// String returnUrl = "/module/admin/mqMsgRecord.html";
	// Map<String, String> returnParams = new HashMap<String, String>();
	// returnParams.put("url", returnUrl);
	// this.message = new Message("", RequestStatusConstant.PAGE_NAVIGATION_ON,
	// returnParams);
	// return this.message;
	// }
	//
	// @ResponseBody
	// @RequiresPermissions("MqMsgRecord:access")
	// @RequestMapping(value = "getAll", method = RequestMethod.POST)
	// public Message getAll(HttpServletRequest request, HttpServletResponse
	// response) throws Exception {
	// MqMsgRecordBean info = CmcWebUtils.formatBeanFromRequest(request,
	// MqMsgRecordBean.class);
	// int num = info.getEnd();
	// info.setStart(info.getStart() - 1);
	// info.setEnd(num - info.getStart());
	// PaginationResult<SystemMessageBean> pr =
	// mqMsgRecordService.getPaginationAll(info);
	// pr.setStart(pr.getStart() + 1);
	// pr.setNum(num);
	// this.message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED,
	// pr);
	// return this.message;
	// }
	//
	// @ResponseBody
	// @RequiresPermissions("MqMsgRecord:get")
	// @RequestMapping(value = "get/{id}", method = RequestMethod.POST)
	// public Message get(HttpServletRequest request, HttpServletResponse response,
	// @PathVariable("id") String id)
	// throws Exception {
	// this.message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED,
	// mqMsgRecordService.get(id));
	// return this.message;
	// }
	//
	// @ResponseBody
	// @RequiresPermissions("MqMsgRecord:update")
	// @RequestMapping(value="update", method=RequestMethod.POST)
	// public Message update(HttpServletRequest request,HttpServletResponse
	// response) throws Exception{
	// MqMsgRecordBean info =
	// CmcWebUtils.formatBeanFromRequest(request,MqMsgRecordBean.class);
	// MqMsgRecordBean bean = (MqMsgRecordBean) service.get(info);
	// bean.setNum(info.getNum());
	// bean.setStatus(info.getStatus());
	// bean.setMsg(info.getMsg());
	// service.update(bean);
	// this.message = new
	// Message("",RequestStatusConstant.STATUS_CODE_SECCEED,"更新完成");
	// return this.message;
	// }

}
