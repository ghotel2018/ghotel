package com.ghotel.oss.console.modules.index.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ghotel.oss.console.core.common.bean.Message;
import com.ghotel.oss.console.core.common.controller.AbstractModuleCommonController;
import com.ghotel.oss.console.core.job.bean.TaskBean;
import com.ghotel.oss.console.core.utils.GocWebUtils;
import com.ghotel.oss.console.core.constants.RequestStatusConstant;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.admin.bean.SystemMessageBean;
import com.ghotel.oss.console.modules.admin.service.SystemMessageService;
import com.ghotel.oss.console.modules.index.bean.NoticeSearchCriteria;
import com.ghotel.oss.console.modules.index.bean.TaskSearchCriteriaBean;
import com.ghotel.oss.console.modules.index.service.IndexService;
import com.ghotel.oss.console.modules.notice.service.GocNoticeService;

@Controller
@RequestMapping("/authenticated/index")
public class IndexController extends AbstractModuleCommonController {

	@Autowired
	private IndexService indexService;

	@Autowired
	private SystemMessageService systemMessageService;

	@Autowired
	private GocNoticeService noticeService;
	// @Value("${ftp_server_hostname}")
	// private String ftpIp;
	// @Value("${ftp_server_port}")
	// private int ftpPort;
	// @Value("${ftp_server_username}")
	// private String ftpuser;
	// @Value("${ftp_server_password}")
	// private String ftpPassWord;

	// @RequiresAuthentication
	@RequestMapping(value = "getTasks", method = RequestMethod.POST)
	public @ResponseBody Message getTasks(HttpServletRequest request) throws Exception {
		Message message = new Message();
		Subject currentUser = SecurityUtils.getSubject();
		if (currentUser.isAuthenticated()) {
			message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
			TaskSearchCriteriaBean bean = (TaskSearchCriteriaBean) GocWebUtils.formatBeanFromRequest(request,
					TaskSearchCriteriaBean.class);
			bean.setTaskCreateBy(request.getSession().getAttribute("userLoginId").toString());
			PaginationResult pr = indexService.getTasks(bean);
			message.setMessageBody(pr);
		} else {
			message = new Message(null, RequestStatusConstant.STATUS_CODE_NOT_AUTHENTICATED);
		}

		return message;
	}

	// @RequiresAuthentication
	@RequestMapping(value = "getNotices", method = RequestMethod.POST)
	public @ResponseBody Message getNotices(HttpServletRequest request) throws Exception {
		Message message = new Message();
		Subject currentUser = SecurityUtils.getSubject();
		if (currentUser.isAuthenticated()) {
			message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
			NoticeSearchCriteria noticeSearchCriteria = (NoticeSearchCriteria) GocWebUtils
					.formatBeanFromRequest(request, NoticeSearchCriteria.class);
//			noticeSearchCriteria.setTableName("CMC_USER_NOTICE");
//			noticeSearchCriteria.setSentTo(request.getSession().getAttribute("userLoginId").toString());
			PaginationResult pr = indexService.getNotices(noticeSearchCriteria);
			message.setMessageBody(pr);
		} else {
			message = new Message(null, RequestStatusConstant.STATUS_CODE_NOT_AUTHENTICATED);
		}

		return message;
	}

	@RequestMapping(value = "getExecutingTasks", method = RequestMethod.GET)
	public @ResponseBody Message getExecutingTasks(HttpServletRequest request) throws Exception {
		Subject currentUser = SecurityUtils.getSubject();
		Message message = new Message(null, RequestStatusConstant.STATUS_CODE_NOT_AUTHENTICATED);
		if (currentUser.isAuthenticated()) {
			message = new Message();
			message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
			// TODO
			// message.setMessageBody(indexService.getExecutingTask());
		}

		return message;
	}

	@ResponseBody
	@RequestMapping(value = "getStatistics", method = RequestMethod.POST)
	public Message getStatistics(HttpServletRequest req) throws Exception {
		Message message = new Message();
		Subject currentUser = SecurityUtils.getSubject();
		if (currentUser.isAuthenticated()) {
			message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
			message.setMessageBody(indexService.getStatistics());
		}
		return message;
	}

	@ResponseBody
	@RequestMapping(value = "getMessages", method = RequestMethod.POST)
	public Message getMessages(HttpServletRequest req) throws Exception {
		Message message = new Message();
		Subject currentUser = SecurityUtils.getSubject();
		if (currentUser.isAuthenticated()) {
			PaginationResult pr = systemMessageService
					.getPaginationResult(GocWebUtils.formatBeanFromRequest(req, SystemMessageBean.class));
			message.setMessageBody(pr);
		}
		return message;
	}

	@ResponseBody
	@RequestMapping(value = "messageDetail/{id}", method = RequestMethod.POST)
	public Message messageDetail(HttpServletRequest req, @PathVariable("id") String id) throws Exception {
		Message message = new Message();
		Subject currentUser = SecurityUtils.getSubject();
		if (currentUser.isAuthenticated()) {
			message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, systemMessageService.get(id));
		}
		return message;
	}

	@ResponseBody
	@RequestMapping(value = "noticeDetail/{id}", method = RequestMethod.POST)
	public Message noticeDetail(HttpServletRequest req, @PathVariable("id") String id) throws Exception {
		Message message = new Message();
		Subject currentUser = SecurityUtils.getSubject();
		if (currentUser.isAuthenticated()) {
			Date d1 = new Date();
			message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, noticeService.get(id));
			Date d2 = new Date();
			System.out.println(d2.getTime() - d1.getTime());
		}
		return message;
	}

	// @ResponseBody
	// @RequestMapping(value = "getCouponReportFromFtp", method = RequestMethod.GET)
	// public void getCouponReportFromFtp(HttpServletRequest request,
	// HttpServletResponse response) throws IOException {
	// String path = request.getParameter("path");
	// FtpUtils ftp = new FtpUtils();
	// ftp.setConfig(ftpIp, ftpPort, ftpuser, ftpPassWord);
	// String[] url = path.split(",");
	// String zipFileName = System.currentTimeMillis() + ".zip";
	// // 设置Content-Disposition
	// response.setHeader("Content-Disposition", "attachment;filename=" +
	// zipFileName);
	// ZipOutputStream out = new ZipOutputStream(response.getOutputStream());
	// try {
	// // 此循环处理多文件下载
	// for (int i = 0; i < url.length; i++) {
	// ftp.setRemoteDir(getPath(url[i]));
	// ftp.setDownloadFileName(getRemoteFileName(url[i]));
	// List<File> files = ftp.download();
	// if (files.size() > 0) {
	// // 压缩为zip文件
	// ZipUtils.doCompress(files.get(0), out);
	// }
	// }
	// } catch (Exception e) {
	// logger.error(e.getMessage());
	// } finally {
	// out.close();
	// }
	// }

	private String getPath(String url) {
		return StringUtils.substringBeforeLast(url, "/") + "/";
	}

	private String getRemoteFileName(String url) {
		return StringUtils.substringAfterLast(url, "/");
	}

	/**
	 * 首页第一次加载页面数据方法 因为偶尔会出现少加载部分数据的问题 故添加此方法
	 * 
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "initData", method = RequestMethod.POST)
	public Message initData(SystemMessageBean sysMsg, TaskSearchCriteriaBean taskSearchCriteriaBean,
			NoticeSearchCriteria noticeSearchCriteria) throws Exception {
		Message message = new Message();
		Subject currentUser = SecurityUtils.getSubject();
		// TODO
//		 if (currentUser.isAuthenticated()) {
//		 Map<String, Object> returnMap = new HashMap<String, Object>();
//		 returnMap.put("statistic", indexService.getStatistics());
//		 returnMap.put("message", systemMessageService.getPaginationAll(sysMsg));
//		 noticeSearchCriteria.setTableName("CMC_USER_NOTICE");
//		 noticeSearchCriteria.setSentTo(UserUtils.getUserId());
//		  returnMap.put("notice", indexService.getNotices(noticeSearchCriteria));
//		 TaskSearchCriteriaBean bean = taskSearchCriteriaBean;
//		 bean.setTaskCreateBy(UserUtils.getUserId());
//		 returnMap.put("task", indexService.getTasks(bean));
//		 message.setMessageBody(returnMap);
//		 }
		if (currentUser.isAuthenticated()) {
			Map<String, Object> returnMap = new HashMap<String, Object>();
			returnMap.put("statistic", new PaginationResult());
			returnMap.put("message", new PaginationResult<SystemMessageBean>());
			returnMap.put("notice", indexService.getNotices(noticeSearchCriteria));
			returnMap.put("task", new PaginationResult<TaskBean>());
			message.setMessageBody(returnMap);
		}
		return message;
	}

}
