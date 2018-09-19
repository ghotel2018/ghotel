package com.ghotel.oss.console.modules.scheduler.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.quartz.CronExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ghotel.oss.console.core.common.bean.Message;
import com.ghotel.oss.console.core.common.controller.AbstractModuleCommonController;
import com.ghotel.oss.console.core.constants.RequestStatusConstant;
import com.ghotel.oss.console.core.utils.GocJsonUtil;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.index.bean.TaskSearchCriteriaBean;
import com.ghotel.oss.console.modules.index.service.IndexService;
import com.ghotel.oss.console.modules.scheduler.bean.JobDetailInfoBean;
import com.ghotel.oss.console.modules.scheduler.bean.JobInstanceBean;
import com.ghotel.oss.console.modules.scheduler.bean.JobInstanceSearchBean;
import com.ghotel.oss.console.modules.scheduler.bean.JobSearchCriteriaBean;
import com.ghotel.oss.console.modules.scheduler.service.SchedulerService;

/**
 * Seq Date Who Remark 1 28/06/2017 iBuilder 任务调度管理调优
 * 
 */

@Controller
@RequestMapping("/authorized/scheduler")
@RequiresPermissions("Scheduler")
@RequiresAuthentication
public class SchedulerController extends AbstractModuleCommonController {

	// 定义常用任务调度请求模板（用户调用CommonJobController）
	private static final String STOP_INSTANCE_URL_TEMPLATE = "http://{ip}:{port}{path}/stopJob";
	private static final String START_INSTANCE_URL_TEMPLATE = "http://{ip}:{port}{path}/startJob";
	private static final String START_ALL_URL_TEMPLATE = "http://{ip}:{port}{path}/startAllJob";
	private static final String STOP_ALL_URL_TEMPLATE = "http://{ip}:{port}{path}/stopAllJob";
	private static final String HEALTHCHECK_URL_TEMPLATE = "http://{ip}:{port}{path}/schedulerCheck";
	private static final String RUNJOBONE_URL_TEMPLATE = "http://{ip}:{port}{path}/runJobOne";

	@Autowired
	SchedulerService schedulerService;
	@Autowired
	IndexService indexService;

	@RequiresPermissions("Scheduler:access")
	@RequestMapping("access")
	public @ResponseBody Message access() {
		String returnUrl = "/module/admin/schedulerMnt.html";
		Map<String, String> returnParams = new HashMap<String, String>();
		returnParams.put("url", returnUrl);
		this.message = new Message("", RequestStatusConstant.PAGE_NAVIGATION_ON, returnParams);
		return this.message;
	}

	/**
	 * 调度任务任务管理平台方法 获取所有的调度工作
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequiresPermissions("Scheduler:getAll")
	@RequestMapping(value = "getAll", method = RequestMethod.POST)
	public @ResponseBody Message getAll(JobSearchCriteriaBean jobSearchCriteriaBean) throws Exception {
		message = new Message();
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		PaginationResult<JobDetailInfoBean> pr = schedulerService.getPaginationResult(jobSearchCriteriaBean);
		message.setMessageBody(pr);
		return this.message;
	}

	/**
	 * 调度任务任务管理平台方法 新增调度工作
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("add")
	@RequiresPermissions("Scheduler:add")
	public @ResponseBody Message add(JobDetailInfoBean jobDetailInfoBean) throws Exception {
		jobDetailInfoBean.setJobId(UUID.randomUUID().toString().replaceAll("-", ""));
		schedulerService.add(jobDetailInfoBean);
		this.message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "新增成功！");
		return this.message;
	}

	/**
	 * 调度任务任务管理平台方法 更新调度工作， 需要停止所有任务实例
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("update")
	@RequiresPermissions("Scheduler:update")
	public @ResponseBody Message update(JobDetailInfoBean jobDetailInfoBean) throws Exception {
		schedulerService.update(jobDetailInfoBean);
		this.message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "更新成功！");
		return this.message;
	}

	/**
	 * 删除调度工作 需要停止所有执行中的实例
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("delete")
	@RequiresPermissions("Scheduler:delete")
	public @ResponseBody Message delete(JobDetailInfoBean jobDetailInfoBean) throws Exception {
		schedulerService.delete(jobDetailInfoBean);
		this.message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, "删除成功！");
		return this.message;
	}

	/**
	 * 获取调度工作的详情
	 * 
	 * @param jobId
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get/{jobId}")
	@RequiresPermissions("Scheduler:get")
	public @ResponseBody Message get(@PathVariable("jobId") String jobId) throws Exception {
		this.message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, schedulerService.get(jobId));
		return this.message;
	}

	/**
	 * 检查cron表达式
	 * 
	 * @param cronExp
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("checkCron")
	public @ResponseBody Message checkCron(@RequestParam("cronExp") String cronExp) throws Exception {
		List<String> resultList = new ArrayList<String>();
		CronExpression exp = new CronExpression(cronExp);
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd HH:mm:ss");
		Date d = new Date();
		int i = 0;
		// 循环得到接下来n此的触发时间点，供验证
		while (i < 5) {
			d = exp.getNextValidTimeAfter(d);
			resultList.add(df.format(d));
			++i;
		}
		this.message = new Message("", RequestStatusConstant.STATUS_CODE_SECCEED, resultList);
		return this.message;
	}

	// 下列为过时方法，先注释掉
//	@Deprecated
//	@RequestMapping("startJob")  
//	@RequiresPermissions("Scheduler:startJob")
//    public 	@ResponseBody Message startJob(  HttpServletRequest request,HttpServletResponse response) throws Exception{  
//		//JobDetailInfoBean bean = (JobDetailInfoBean)CmcWebUtils.formatBeanFromRequest(request, JobDetailInfoBean.class);
//		this.message = new Message("",RequestStatusConstant.STATUS_CODE_FAILED, "接口已过期！");
//		return this.message; 
//	}
//	@Deprecated
//	@RequestMapping("stopJob")  
//	@RequiresPermissions("Scheduler:stopJob")
//    public 	@ResponseBody Message stopJob(  HttpServletRequest request,HttpServletResponse response) throws Exception{  
//		JobDetailInfoBean bean = GocWebUtils.formatBeanFromRequest(request, JobDetailInfoBean.class);
//		this.message = new Message("",RequestStatusConstant.STATUS_CODE_FAILED, "接口已过期！");
//		return this.message; 
//	}
//	@Deprecated
//	@RequestMapping("startAllJob")  
//	@RequiresPermissions("Scheduler:startAllJob")
//    public 	@ResponseBody Message startAllJob(  HttpServletRequest request,HttpServletResponse response) throws Exception{  
//		this.message = new Message("",RequestStatusConstant.STATUS_CODE_FAILED, "接口已过期！");
//		return this.message; 
//	}
//	@Deprecated
//	@RequestMapping("stopAllJob")  
//	@RequiresPermissions("Scheduler:stopAllJob")
//    public 	@ResponseBody Message stopAllJob(  HttpServletRequest request,HttpServletResponse response) throws Exception{  
//		this.message = new Message("",RequestStatusConstant.STATUS_CODE_FAILED, "接口已过期！");
//		return this.message; 
//	}

	/**
	 * 获取调度工作执行的任务列表
	 * 
	 * @param jobType
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listTasks")
	@RequiresPermissions("Scheduler:listTasks")
	public @ResponseBody Message listTasks(@RequestParam("jobType") String jobType,
			TaskSearchCriteriaBean taskSearchCriteriaBean) throws Exception {
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		PaginationResult<TaskSearchCriteriaBean> pr = indexService.getTasksByJobType(taskSearchCriteriaBean);
		message.setMessageBody(pr);
		return this.message;
	}

	/**
	 * 终止某个正在执行的任务
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("finishTask")
	@RequiresPermissions("Scheduler:finishTask")
	public @ResponseBody Message finishTask(TaskSearchCriteriaBean taskSearchCriteriaBean) throws Exception {
		this.message = new Message("", RequestStatusConstant.STATUS_CODE_FAILED, "中断任务成功！");
		indexService.finishTask(taskSearchCriteriaBean);
		return this.message;
	}

	/**
	 * 根据调度工作获取所有工作实例
	 * 
	 * @param jobId
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJobInstanceByJobId")
	@RequiresPermissions("Scheduler:listJobInstanceByJobId")
	public @ResponseBody Message listJobInstanceByJobId(JobInstanceSearchBean jobInstanceSearchBean) throws Exception {
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		List<JobInstanceBean> result = schedulerService.selectJobInstanceByIpAndPort(jobInstanceSearchBean);
		PaginationResult<JobInstanceBean> pr = new PaginationResult<JobInstanceBean>();
		pr.setList(result);
		message.setMessageBody(pr);
		return this.message;
	}

	/**
	 * 调度任务任务管理平台方法 注册调度工作实例
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("registerTartgetHostJob")
	@RequiresPermissions("Scheduler:registerTartgetHostJob")
	public @ResponseBody Message addJobInstance(JobInstanceBean jobInstanceBean) throws Exception {
		jobInstanceBean.setJobInstanceId(UUID.randomUUID().toString());
		schedulerService.addJobInstance(jobInstanceBean);
		return this.message;
	}

	/**
	 * 删除调度工作实例
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("removeTartgetHostJob")
	@RequiresPermissions("Scheduler:registerTartgetHostJob")
	public @ResponseBody Message removeJobInstance(JobInstanceBean jobInstanceBean) throws Exception {
		schedulerService.deleteJobInstance(jobInstanceBean);
		return this.message;
	}

	/**
	 * 启动目标服务器实例的调度工作实例
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("startTartgetHostJob")
	@RequiresPermissions("Scheduler:startTartgetHostJob")
	public @ResponseBody Message startTartgetHostJob(JobInstanceBean jobInstanceBean) throws Exception {
		// seq 1
		// String url = START_INSTANCE_URL_TEMPLATE.replace("{ip}",
		// jobInstance.getIpAddr()).replace("{port}", jobInstance.getPort() + "");
		String url = START_INSTANCE_URL_TEMPLATE.replace("{ip}", jobInstanceBean.getIpAddr())
				.replace("{port}", jobInstanceBean.getPort() + "").replace("{path}", jobInstanceBean.getPath());
		// TODO
		String result = "";// HttpClientUtil.post(url,GocBeanUtil.transBean2Map(jobInstanceBean), false);
		this.message = GocJsonUtil.jsonToBean(result, Message.class);
		return this.message;
	}

	/**
	 * 删除目标服务器的工作实例
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("pauseTartgetHostJob")
	@RequiresPermissions("Scheduler:pauseTartgetHostJob")
	public @ResponseBody Message pauseTartgetHostJob(JobInstanceBean jobInstanceBean) throws Exception {
		// seq 1
		// String url = STOP_INSTANCE_URL_TEMPLATE.replace("{ip}",
		// jobInstance.getIpAddr()).replace("{port}", jobInstance.getPort() + "");
		String url = STOP_INSTANCE_URL_TEMPLATE.replace("{ip}", jobInstanceBean.getIpAddr())
				.replace("{port}", jobInstanceBean.getPort() + "").replace("{path}", jobInstanceBean.getPath());
		//TODO
		String result = "";//HttpClientUtil.post(url, GocBeanUtil.transBean2Map(jobInstanceBean), false);
		this.message = GocJsonUtil.jsonToBean(result, Message.class);
		return this.message;
	}

	/**
	 * 启动目标服务器实例的调度工作实例
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("startTartgetHostAllJob")
	@RequiresPermissions("Scheduler:startTartgetHostAllJob")
	public @ResponseBody Message startTartgetHostAllJob(JobInstanceBean jobInstanceBean) throws Exception {
		// seq 1
		// String url = START_ALL_URL_TEMPLATE.replace("{ip}",
		// jobInstance.getIpAddr()).replace("{port}", jobInstance.getPort() + "");
		String url = START_ALL_URL_TEMPLATE.replace("{ip}", jobInstanceBean.getIpAddr())
				.replace("{port}", jobInstanceBean.getPort() + "").replace("{path}", jobInstanceBean.getPath());
		//TODO
		String result = "";//HttpClientUtil.post(url, GocBeanUtil.transBean2Map(jobInstanceBean), false);
		this.message = GocJsonUtil.jsonToBean(result, Message.class);
		return this.message;
	}

	/**
	 * 删除目标服务器的工作实例
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("pauseTartgetHostAllJob")
	@RequiresPermissions("Scheduler:pauseTartgetHostAllJob")
	public @ResponseBody Message pauseTartgetHostAllJob(JobInstanceBean jobInstanceBean) throws Exception {
		// seq 1
		// String url = STOP_ALL_URL_TEMPLATE.replace("{ip}",
		// jobInstance.getIpAddr()).replace("{port}", jobInstance.getPort() + "");
		String url = STOP_ALL_URL_TEMPLATE.replace("{ip}", jobInstanceBean.getIpAddr())
				.replace("{port}", jobInstanceBean.getPort() + "").replace("{path}", jobInstanceBean.getPath());
		//TODO
		String result = "";//HttpClientUtil.post(url, GocBeanUtil.transBean2Map(jobInstanceBean), false);
		this.message = GocJsonUtil.jsonToBean(result, Message.class);
		return this.message;
	}

	/**
	 * 健康检查
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("schedulerCheck")
	@RequiresPermissions("Scheduler:schedulerCheck")
	public @ResponseBody Message schedulerCheck(JobInstanceBean jobInstanceBean) throws Exception {
		// seq 1
		// String url = HEALTHCHECK_URL_TEMPLATE.replace("{ip}",
		// jobInstance.getIpAddr()).replace("{port}", jobInstance.getPort() + "");
		String url = HEALTHCHECK_URL_TEMPLATE.replace("{ip}", jobInstanceBean.getIpAddr())
				.replace("{port}", jobInstanceBean.getPort() + "").replace("{path}", jobInstanceBean.getPath());
		try {
			// TODO
			String result = "";// HttpClientUtil.post(url, new HashMap<String,Object>(),false);
			// System.out.println(result);
			this.message = GocJsonUtil.jsonToBean(result, Message.class);
		} catch (Exception e) {
			// e.printStackTrace();
			this.message = new Message("", RequestStatusConstant.STATUS_CODE_FAILED, "无法连接指定的服务器!");
		}

		return this.message;
	}

	@RequestMapping("runJobOne")
	@RequiresPermissions("Scheduler:runJobOne")
	public @ResponseBody Message runJobOne(JobInstanceBean jobInstanceBean) throws Exception {
		String url = RUNJOBONE_URL_TEMPLATE.replace("{ip}", jobInstanceBean.getIpAddr())
				.replace("{port}", jobInstanceBean.getPort() + "").replace("{path}", jobInstanceBean.getPath());
		//TODO
		String result = "";//HttpClientUtil.post(url, GocBeanUtil.transBean2Map(jobInstanceBean), false);
		this.message = GocJsonUtil.jsonToBean(result, Message.class);
		return message;
	}

}
