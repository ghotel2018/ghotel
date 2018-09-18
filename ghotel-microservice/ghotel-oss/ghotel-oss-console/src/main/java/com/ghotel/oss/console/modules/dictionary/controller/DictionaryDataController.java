package com.ghotel.oss.console.modules.dictionary.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
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
import com.ghotel.oss.console.core.utils.GocUserUtils;
import com.ghotel.oss.console.core.constants.RequestStatusConstant;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.dictionary.bean.DictionaryDetailBean;
import com.ghotel.oss.console.modules.dictionary.bean.DictionaryTypeBean;
import com.ghotel.oss.console.modules.dictionary.bean.DictionaryTypeSearchCriteriaBean;
import com.ghotel.oss.console.modules.dictionary.service.DictionaryDetailService;
import com.ghotel.oss.console.modules.dictionary.service.DictionaryTypeService;

@Controller
@RequiresAuthentication
@RequiresPermissions("Dictionary")
@RequestMapping("authorized/dictionary")
public class DictionaryDataController extends AbstractModuleCommonController {

	@Autowired
	private DictionaryTypeService typeService;
	@Autowired
	private DictionaryDetailService detailService;

	@ResponseBody
	@RequestMapping("access")
	@RequiresPermissions("dictionary:access")
	public Message access(HttpServletRequest request, HttpServletResponse response) {
		String returnUrl = "/module/dictionary/dictionary.html";
		Map returnParams = new HashMap();
		returnParams.put("url", returnUrl);
		this.message = new Message("", RequestStatusConstant.PAGE_NAVIGATION_ON, returnParams);
		return this.message;
	}

	@ResponseBody
	@RequiresPermissions("dictionary:access")
	@RequestMapping(value = "getAll", method = RequestMethod.POST)
	public Message getType(DictionaryTypeSearchCriteriaBean bean) throws Exception {
		message = new Message();
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		PaginationResult<DictionaryTypeBean> pr = typeService.getPaginationAll(bean);
		message.setMessageBody(pr);
		return this.message;
	}

	@ResponseBody
	@RequiresPermissions("dictionary:add")
	@RequestMapping(value = "add", method = RequestMethod.POST)
	public Message add(DictionaryTypeBean type) throws Exception {
		type.setTypeId(UUID.randomUUID().toString().replaceAll("-", ""));
		type.setCreateTime(new Date());
		type.setCreateBy(GocUserUtils.getLoginUserLoginId());
		typeService.add(type);
		this.message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "新增记录请求成功!");
		return this.message;
	}

	@ResponseBody
	@RequiresPermissions("dictionary:update")
	@RequestMapping(value = "update", method = RequestMethod.POST)
	public Message update(DictionaryTypeBean type) throws Exception {
		typeService.update(type);
		this.message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "修改记录请求成功!");
		return this.message;
	}

	@ResponseBody
	@RequiresPermissions("dictionary:add")
	@RequestMapping(value = "get/{id}", method = RequestMethod.GET)
	public Message get(@PathVariable("id") String id) throws Exception {
		DictionaryTypeBean type = (DictionaryTypeBean) typeService.get(id);
		Map<String, Object> returnMap = new HashMap<String, Object>();
		returnMap.put("type", type);
		List<DictionaryDetailBean> details = type.getDetails();
		returnMap.put("detail", details);
		this.message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, returnMap);
		return this.message;
	}

	@ResponseBody
	@RequiresPermissions("dictionary:add")
	@RequestMapping(value = "addDetail", method = RequestMethod.POST)
	public Message addDetail(DictionaryDetailBean detail) throws Exception {
		detail.setDetailId(UUID.randomUUID().toString().replaceAll("-", ""));
		detailService.add(detail);
		this.message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "新增记录请求成功!");
		return this.message;
	}

	@ResponseBody
	@RequiresPermissions("dictionary:update")
	@RequestMapping(value = "updateDetail", method = RequestMethod.POST)
	public Message updateDetail(DictionaryDetailBean detail) throws Exception {
		detailService.update(detail);
		this.message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "修改记录请求成功!");
		return this.message;
	}

	@ResponseBody
	@RequestMapping(value = "deleteDetail", method = RequestMethod.POST)
	public Message deleteDetail(DictionaryDetailBean detail) throws Exception {
		detailService.delete(detail);
		this.message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "删除记录请求成功!");
		return this.message;
	}

}
