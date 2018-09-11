package com.ghotel.oss.console.modules.statedata.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ghotel.oss.console.core.common.bean.Message;
import com.ghotel.oss.console.core.common.controller.AbstractModuleCommonController;
import com.ghotel.oss.console.core.utils.GocWebUtils;
import com.ghotel.oss.console.core.utils.RequestStatusConstant;
import com.ghotel.oss.console.core.utils.StringUtil;
import com.ghotel.oss.console.core.utils.GocUserUtils;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.statedata.bean.CmcStaticData;
import com.ghotel.oss.console.modules.statedata.bean.CmcStaticDataSearchCriteria;
import com.ghotel.oss.console.modules.statedata.service.CmcStaticDataService;

@Controller
@RequestMapping("/authorized/staticData")
@RequiresPermissions("StaticData")
@RequiresAuthentication
public class StaticDataController extends AbstractModuleCommonController {
//	@Autowired
//	@Qualifier(value = "cmcStaticDataService")
//	private CmcStaticDataService service;
//	
//	@RequiresPermissions("StaticData:access")
//	@RequestMapping("access")
//	public @ResponseBody Message access(HttpServletRequest request,
//			HttpServletResponse response) {
//		String returnUrl = "module/staticdata/staticdata.html";
//		Map returnParams = new HashMap();
//		returnParams.put("url", returnUrl);
//		this.message = new Message("",
//				RequestStatusConstant.PAGE_NAVIGATION_ON, returnParams);
//		return this.message;
//	}
//	@RequestMapping(value = "getStaticData", method = RequestMethod.POST)
//	@RequiresPermissions("StaticData:getStaticData")
//	public @ResponseBody Message getStaticData(@RequestParam("typeCodeList[]") List<String> typeCodeList,HttpServletRequest request) throws Exception {
//		message=new Message();
//		String typeKey=request.getParameter("typeKey");
//		Map valu=new HashMap();
//		if(typeCodeList!=null&&typeCodeList.size()<10&&typeCodeList.size()>0){
//			for(String typeCode:typeCodeList){
//				 if(StringUtils.isNotBlank(typeCode)){
//					 List<CmcStaticData> listData=service.staticDataCachData(typeCode, typeKey);
//					 Map<String,String> map=new HashMap<String,String>();
//					 if(listData!=null&&listData.size()>0){
//						 for(CmcStaticData o:listData){
//							map.put(o.getValue(), o.getName());
//						 }
//					 }
//					 valu.put(typeCode, map);
//				 }
//			}
//		}
//		message.setMessageBody(valu);
//		message.setStatusCode( RequestStatusConstant.STATUS_CODE_SECCEED);
//		return this.message;
//	}
//	@RequestMapping(value = "getAll", method = RequestMethod.POST)
//	@RequiresPermissions("StaticData:getAll")
//	@ResponseBody()
//	public Message getAll(HttpServletRequest request,
//			HttpServletResponse response) throws Exception {
//		message=new Message();
//		CmcStaticDataSearchCriteria bean = (CmcStaticDataSearchCriteria) CmcWebUtils
//		.formatBeanFromRequest(request,
//				CmcStaticDataSearchCriteria.class);
//		PaginationResult pr =service.getPaginationAll(bean);
//		message.setMessageBody(pr);
//		return this.message;
//	}
//	@RequestMapping(value = "delete", method = RequestMethod.POST)
//	@RequiresPermissions("StaticData:delete")
//	public @ResponseBody Message delete(HttpServletRequest request,
//			HttpServletResponse response) throws Exception {
//		message=new Message();
//		CmcStaticDataSearchCriteria bean = (CmcStaticDataSearchCriteria) CmcWebUtils
//		.formatBeanFromRequest(request,CmcStaticDataSearchCriteria.class);
//		bean.setStatus(2);
//		service.deleteObject(bean);
//		message.setMessageBody("删除成功！");
//		return this.message;
//	}
//	@RequestMapping(value = "get", method = RequestMethod.POST)
//	@RequiresPermissions("StaticData:get")
//	public @ResponseBody Message get(HttpServletRequest request,
//			HttpServletResponse response) throws Exception {
//		message=new Message();
//		CmcStaticDataSearchCriteria bean = (CmcStaticDataSearchCriteria) CmcWebUtils
//		.formatBeanFromRequest(request,
//				CmcStaticDataSearchCriteria.class);
//		message.setMessageBody(service.get(bean));
//		return this.message;
//	}
//	@RequestMapping(value = "update", method = RequestMethod.POST)
//	@RequiresPermissions("StaticData:update")
//	public @ResponseBody Message update(HttpServletRequest request,
//			HttpServletResponse response) throws Exception {
//		message=new Message();
//		try{
//			CmcStaticData bean = (CmcStaticData) CmcWebUtils
//					.formatBeanFromRequest(request,CmcStaticData.class);
//			bean.setOptDate(new Date());
//			bean.setOptBy(UserUtils.getUserLoginId());
//			service.update(bean);
//			message.setMessageBody("修改成功！");
//			message.setStatusCode( RequestStatusConstant.STATUS_CODE_SECCEED);
//		}catch(Exception e){
//			message.setMessageBody(e.getLocalizedMessage());
//			message.setStatusCode( RequestStatusConstant.STATUS_CODE_FAILED);
//		}
//		return this.message;
//	}
//	@RequestMapping(value = "effect", method = RequestMethod.POST)
//	@RequiresPermissions("StaticData:effect")
//	public @ResponseBody Message effect(HttpServletRequest request,
//			HttpServletResponse response) throws Exception {
//		message=new Message();
//		CmcStaticData bean = (CmcStaticData) CmcWebUtils
//				.formatBeanFromRequest(request,CmcStaticData.class);
//		bean.setOptDate(new Date());
//		bean.setOptBy(UserUtils.getUserLoginId());
//		//checkData( bean);
//		bean.setStatus("1");
//		service.updateObject(bean);
//		
//		message.setMessageBody("生效成功！");
//		return this.message;
//	}
//	@RequestMapping(value = "expire", method = RequestMethod.POST)
//	@RequiresPermissions("StaticData:expire")
//	public @ResponseBody Message expire(HttpServletRequest request,
//			HttpServletResponse response) throws Exception {
//		message=new Message();
//		CmcStaticData bean = (CmcStaticData) CmcWebUtils
//				.formatBeanFromRequest(request,CmcStaticData.class);
//		bean.setOptDate(new Date());
//		bean.setOptBy(UserUtils.getUserLoginId());
//		//checkData( bean);
//		bean.setStatus("2");
//		service.updateObject(bean);
//		message.setMessageBody("失效成功！");
//		return this.message;
//	}
//	@RequestMapping(value = "add", method = RequestMethod.POST)
//	@RequiresPermissions("StaticData:add")
//	public @ResponseBody Message add(HttpServletRequest request,
//			HttpServletResponse response) throws Exception {
//		message=new Message();
//		try{
//			CmcStaticData bean = (CmcStaticData) CmcWebUtils
//					.formatBeanFromRequest(request,CmcStaticData.class);
//			bean.setCreateBy(UserUtils.getUserLoginId());
//			bean.setCreateTime(new Date());
//			bean.setStatus("2");
//			checkData( bean);
//			service.add(bean);
//			message.setMessageBody("新建成功！");
//			message.setStatusCode( RequestStatusConstant.STATUS_CODE_SECCEED);
//		}catch(Exception e){
//			message.setMessageBody(e.getLocalizedMessage());
//			message.setStatusCode( RequestStatusConstant.STATUS_CODE_FAILED);
//		}
//		return this.message;
//	}
//	@RequestMapping(value = "expireBykeyCode", method = {RequestMethod.POST,RequestMethod.GET})
//	@RequiresPermissions("StaticData:expireBykeyCode")
//	public @ResponseBody Message expireBykeyCode(HttpServletRequest request,
//			HttpServletResponse response) throws Exception {
//		message=new Message();
//		CmcStaticData bean = (CmcStaticData) CmcWebUtils
//				.formatBeanFromRequest(request,CmcStaticData.class);
//		service.expireCodeKey(bean.getTypeCode(),bean.getTypeKey());
//		message.setMessageBody("清除成功！");
//		return this.message;
//	}	
//	@RequestMapping(value = "expireAll", method = RequestMethod.GET)
//	@RequiresPermissions("StaticData:expireAll")
//	public @ResponseBody Message expireAll(HttpServletRequest request,
//			HttpServletResponse response) throws Exception {
//		message=new Message();
//		message.setMessageBody("清空成功");
//		service.expireAll();
//		return this.message;
//	}
//	private void checkData(CmcStaticData bean) throws Exception{
//		if(StringUtil.isBlank(bean.getTypeCode())||StringUtil.isBlank(
//				bean.getTypeCode())){
//			throw new Exception("传入条件不足！");
//		}
//		
//	}
	
}