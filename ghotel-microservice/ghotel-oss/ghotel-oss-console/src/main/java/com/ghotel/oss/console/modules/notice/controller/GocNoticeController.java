package com.ghotel.oss.console.modules.notice.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ghotel.oss.console.core.common.bean.Message;
import com.ghotel.oss.console.core.common.controller.AbstractModuleCommonController;
import com.ghotel.oss.console.core.utils.GocWebUtils;
import com.ghotel.oss.console.core.utils.RequestStatusConstant;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.admin.service.ResourceMaintenanceService;
import com.ghotel.oss.console.modules.notice.bean.GocNoticeSearchCriteriaBean;
import com.ghotel.oss.console.modules.notice.service.GocNoticeService;

@Controller
@RequestMapping("/authorized/notice")
@RequiresPermissions("Notice")
@RequiresAuthentication
public class GocNoticeController extends AbstractModuleCommonController{
	@Autowired
	GocNoticeService noticeService;
	
	@Autowired
	ResourceMaintenanceService serviceOfResource;
	
	@RequiresPermissions("Notice:access")
	@RequestMapping("access")  
    public 	@ResponseBody Message access( HttpServletRequest request,HttpServletResponse response){  
		String returnUrl = "/module/admin/noticeMnt.html";
    	Map returnParams = new HashMap();
    	returnParams.put("url", returnUrl);
		this.message = new Message("",RequestStatusConstant.PAGE_NAVIGATION_ON, returnParams);
		return this.message; 
	}
	@RequiresPermissions("Notice:get")
	@RequestMapping(value="get",method=RequestMethod.POST)  
	public 	@ResponseBody Message get( HttpServletRequest request,HttpServletResponse response) throws Exception{  
		message = new Message();
		GocNoticeSearchCriteriaBean bean  = (GocNoticeSearchCriteriaBean)GocWebUtils.formatBeanFromRequest(request, GocNoticeSearchCriteriaBean.class);
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		PaginationResult pr  = noticeService.getNotice(bean);
		message.setMessageBody(pr);
		return this.message;
	}
	
	@RequestMapping(value="getConfig", method=RequestMethod.GET)  
	@RequiresPermissions("Notice:access")
    public @ResponseBody Message  getConfig(HttpServletRequest request,HttpServletResponse response) throws Exception{  
		this.message = new Message("",RequestStatusConstant.STATUS_CODE_SECCEED, serviceOfResource.getAllModule());
		return message;
	}
	
	@RequiresPermissions("Notice:export")
	@RequestMapping(value="noticeMntReport",method=RequestMethod.POST)  
	public 	@ResponseBody Message noticeMntReport( HttpServletRequest request,HttpServletResponse response) throws Exception{  
		GocNoticeSearchCriteriaBean bean  = (GocNoticeSearchCriteriaBean)GocWebUtils.formatBeanFromRequest(request, GocNoticeSearchCriteriaBean.class);
		String userId = request.getSession().getAttribute("userLoginId").toString();
		
		noticeService.noticeMntReportExport(bean,userId);
		this.message = new Message("",RequestStatusConstant.STATUS_CODE_SECCEED);
		return this.message; 
	}
}


