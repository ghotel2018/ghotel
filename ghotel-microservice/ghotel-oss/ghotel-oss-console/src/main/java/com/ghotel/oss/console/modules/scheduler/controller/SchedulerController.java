package com.ghotel.oss.console.modules.scheduler.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import com.ghotel.oss.console.core.utils.BeanUtil;
import com.ghotel.oss.console.core.utils.GocWebUtils;
import com.ghotel.oss.console.core.utils.HttpClientUtil;
import com.ghotel.oss.console.core.utils.JacksonJsonUtil;
import com.ghotel.oss.console.core.utils.RequestStatusConstant;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.index.bean.TaskSearchCriteriaBean;
import com.ghotel.oss.console.modules.index.service.IndexService;
import com.ghotel.oss.console.modules.scheduler.bean.JobDetailInfoBean;
import com.ghotel.oss.console.modules.scheduler.bean.JobInstanceBean;
import com.ghotel.oss.console.modules.scheduler.bean.JobInstanceSearchBean;
import com.ghotel.oss.console.modules.scheduler.bean.JobSearchCriteriaBean;
import com.ghotel.oss.console.modules.scheduler.service.SchedulerService;

/**
 * Seq   Date           Who         Remark
 * 1     28/06/2017     iBuilder    任务调度管理调优
 * 
 */

@Controller
@RequestMapping("/authorized/scheduler")
@RequiresPermissions("Scheduler")
@RequiresAuthentication
public class SchedulerController extends AbstractModuleCommonController  {
	
	
	// seq 1
	/*
	private static final String STOP_INSTANCE_URL_TEMPLATE ="http://{ip}:{port}/cmc/security/commonJob/stopJob"; 
	private static final String START_INSTANCE_URL_TEMPLATE ="http://{ip}:{port}/cmc/security/commonJob/startJob"; 
	private static final String START_ALL_URL_TEMPLATE ="http://{ip}:{port}/cmc/security/commonJob/startAllJob"; 
	private static final String STOP_ALL_URL_TEMPLATE ="http://{ip}:{port}/cmc/security/commonJob/stopAllJob"; 
	private static final String HEALTHCHECK_URL_TEMPLATE ="http://{ip}:{port}/cmc/security/commonJob/schedulerCheck";
	*/
	private static final String STOP_INSTANCE_URL_TEMPLATE ="http://{ip}:{port}{path}/stopJob"; 
	private static final String START_INSTANCE_URL_TEMPLATE ="http://{ip}:{port}{path}/startJob"; 
	private static final String START_ALL_URL_TEMPLATE ="http://{ip}:{port}{path}/startAllJob"; 
	private static final String STOP_ALL_URL_TEMPLATE ="http://{ip}:{port}{path}/stopAllJob"; 
	private static final String HEALTHCHECK_URL_TEMPLATE ="http://{ip}:{port}{path}/schedulerCheck";
	private static final String RUNJOBONE_URL_TEMPLATE ="http://{ip}:{port}{path}/runJobOne";

	@Autowired
	SchedulerService schedulerService;
	@Autowired
	IndexService indexService;
	
	@RequiresPermissions("Scheduler:access")
	@RequestMapping("access")  
    public 	@ResponseBody Message access( HttpServletRequest request,HttpServletResponse response){  
		String returnUrl = "/module/admin/schedulerMnt.html";
    	Map returnParams = new HashMap();
    	returnParams.put("url", returnUrl);
		this.message = new Message("",RequestStatusConstant.PAGE_NAVIGATION_ON, returnParams);
		return this.message; 
	}
	
	/**
	 * 调度任务任务管理平台方法
	 * 获取所有的调度工作 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequiresPermissions("Scheduler:getAll")
	@RequestMapping(value="getAll", method=RequestMethod.POST)  
    public 	@ResponseBody Message getAll(  HttpServletRequest request,HttpServletResponse response) throws Exception{  
		message = new Message();
		JobSearchCriteriaBean bean  = (JobSearchCriteriaBean)GocWebUtils.formatBeanFromRequest(request, JobSearchCriteriaBean.class);
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		PaginationResult pr  = schedulerService.getPaginationAll(bean);
		message.setMessageBody(pr);
		return this.message;
	}
	
	/**
	 * 调度任务任务管理平台方法
	 * 新增调度工作
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("add")  
	@RequiresPermissions("Scheduler:add")
    public 	@ResponseBody Message add( HttpServletRequest request,HttpServletResponse response) throws Exception{  
		JobDetailInfoBean bean = (JobDetailInfoBean)GocWebUtils.formatBeanFromRequest(request, JobDetailInfoBean.class);
		bean.setJobId(UUID.randomUUID().toString().replaceAll("-", ""));
		schedulerService.add(bean);
		this.message = new Message("",RequestStatusConstant.STATUS_CODE_SECCEED, "新增成功！");
		return this.message; 
	}
	
	/**
	 * 调度任务任务管理平台方法
	 * 更新调度工作， 需要停止所有任务实例
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("update")  
	@RequiresPermissions("Scheduler:update")
    public 	@ResponseBody Message update( HttpServletRequest request,HttpServletResponse response) throws Exception{  
		JobDetailInfoBean bean = (JobDetailInfoBean)GocWebUtils.formatBeanFromRequest(request, JobDetailInfoBean.class);
		schedulerService.update(bean);
		this.message = new Message("",RequestStatusConstant.STATUS_CODE_SECCEED, "更新成功！");
		return this.message; 
	}
	
	/**
	 * 删除调度工作
	 * 需要停止所有执行中的实例
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("delete")  
	@RequiresPermissions("Scheduler:delete")
    public 	@ResponseBody Message delete(  HttpServletRequest request,HttpServletResponse response) throws Exception{  
		JobDetailInfoBean bean = (JobDetailInfoBean)GocWebUtils.formatBeanFromRequest(request, JobDetailInfoBean.class);
		schedulerService.delete(bean);
		this.message = new Message("",RequestStatusConstant.STATUS_CODE_SECCEED, "删除成功！");
		return this.message; 
	}
	
	/**
	 * 获取调度工作的详情
	 * @param jobId
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get/{jobId}")  
	@RequiresPermissions("Scheduler:get")
    public 	@ResponseBody Message get(@PathVariable("jobId") String  jobId,  HttpServletRequest request,HttpServletResponse response) throws Exception{  
		this.message = new Message("",RequestStatusConstant.STATUS_CODE_SECCEED,schedulerService.get(jobId));
		return this.message; 
	}
	
	/**
	 * 检查cron表达式
	 * @param cronExp
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("checkCron")  
    public 	@ResponseBody Message checkCron(@RequestParam("cronExp") String cronExp ,HttpServletRequest request,HttpServletResponse response) throws Exception{  
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
		this.message = new Message("",RequestStatusConstant.STATUS_CODE_SECCEED,resultList);
		return this.message; 
	}
	
	
	@Deprecated
	@RequestMapping("startJob")  
	@RequiresPermissions("Scheduler:startJob")
    public 	@ResponseBody Message startJob(  HttpServletRequest request,HttpServletResponse response) throws Exception{  
		//JobDetailInfoBean bean = (JobDetailInfoBean)CmcWebUtils.formatBeanFromRequest(request, JobDetailInfoBean.class);
		this.message = new Message("",RequestStatusConstant.STATUS_CODE_FAILED, "接口已过期！");
		return this.message; 
	}
	@Deprecated
	@RequestMapping("stopJob")  
	@RequiresPermissions("Scheduler:stopJob")
    public 	@ResponseBody Message stopJob(  HttpServletRequest request,HttpServletResponse response) throws Exception{  
		JobDetailInfoBean bean = (JobDetailInfoBean)GocWebUtils.formatBeanFromRequest(request, JobDetailInfoBean.class);
		this.message = new Message("",RequestStatusConstant.STATUS_CODE_FAILED, "接口已过期！");
		return this.message; 
	}
	@Deprecated
	@RequestMapping("startAllJob")  
	@RequiresPermissions("Scheduler:startAllJob")
    public 	@ResponseBody Message startAllJob(  HttpServletRequest request,HttpServletResponse response) throws Exception{  
		this.message = new Message("",RequestStatusConstant.STATUS_CODE_FAILED, "接口已过期！");
		return this.message; 
	}
	@Deprecated
	@RequestMapping("stopAllJob")  
	@RequiresPermissions("Scheduler:stopAllJob")
    public 	@ResponseBody Message stopAllJob(  HttpServletRequest request,HttpServletResponse response) throws Exception{  
		this.message = new Message("",RequestStatusConstant.STATUS_CODE_FAILED, "接口已过期！");
		return this.message; 
	}
	
	/**
	 * 获取调度工作执行的任务列表
	 * @param jobType
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listTasks")  
	@RequiresPermissions("Scheduler:listTasks")
    public 	@ResponseBody Message listTasks(@RequestParam("jobType") String jobType,  HttpServletRequest request,HttpServletResponse response) throws Exception{  
		TaskSearchCriteriaBean bean = (TaskSearchCriteriaBean)GocWebUtils.formatBeanFromRequest(request, TaskSearchCriteriaBean.class);
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED);
		PaginationResult pr  = indexService.getTasksByJobType(bean);
		message.setMessageBody(pr);
		return this.message;
	}
	
	/**
	 * 终止某个正在执行的任务
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("finishTask")  
	@RequiresPermissions("Scheduler:finishTask")
    public 	@ResponseBody Message finishTask(  HttpServletRequest request,HttpServletResponse response) throws Exception{  
		TaskSearchCriteriaBean bean = (TaskSearchCriteriaBean)GocWebUtils.formatBeanFromRequest(request, TaskSearchCriteriaBean.class);
		this.message = new Message("",RequestStatusConstant.STATUS_CODE_FAILED, "中断任务成功！");
		indexService.finishTask(bean);
		return this.message;
	}
	
	/**
	 * 根据调度工作获取所有工作实例
	 * @param jobId
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJobInstanceByJobId")  
	@RequiresPermissions("Scheduler:listJobInstanceByJobId")
    public 	@ResponseBody Message listJobInstanceByJobId( HttpServletRequest request,HttpServletResponse response) throws Exception{  
		message.setStatusCode(RequestStatusConstant.STATUS_CODE_SECCEED); 
		JobInstanceSearchBean searchBean = GocWebUtils.formatBeanFromRequest(request, JobInstanceSearchBean.class);
		List<JobInstanceBean> result  = schedulerService.selectJobInstanceByIpAndPort(searchBean);
		PaginationResult pr = new PaginationResult();
		pr.setList(result);
		message.setMessageBody(pr);
		return this.message;
	}
	
	/**
	 * 调度任务任务管理平台方法
	 * 注册调度工作实例
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("registerTartgetHostJob")  
	@RequiresPermissions("Scheduler:registerTartgetHostJob")
    public 	@ResponseBody Message addJobInstance(  HttpServletRequest request,HttpServletResponse response) throws Exception{  
		JobInstanceBean jobInstance =  (JobInstanceBean)GocWebUtils.formatBeanFromRequest(request, JobInstanceBean.class);
		jobInstance.setJobInstanceId(UUID.randomUUID().toString());
		schedulerService.addJobInstance(jobInstance);
		return this.message; 
	}
	
	/**
	 * 删除调度工作实例
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("removeTartgetHostJob")  
	@RequiresPermissions("Scheduler:registerTartgetHostJob")
    public 	@ResponseBody Message removeJobInstance(  HttpServletRequest request,HttpServletResponse response) throws Exception{  
		JobInstanceBean jobInstance =  (JobInstanceBean)GocWebUtils.formatBeanFromRequest(request, JobInstanceBean.class);
		schedulerService.deleteJobInstance(jobInstance);
		return this.message; 
	}
	
	/**
	 * 启动目标服务器实例的调度工作实例
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("startTartgetHostJob")  
	@RequiresPermissions("Scheduler:startTartgetHostJob")
    public 	@ResponseBody Message startTartgetHostJob(  HttpServletRequest request,HttpServletResponse response) throws Exception{  
		JobInstanceBean jobInstance =  (JobInstanceBean)GocWebUtils.formatBeanFromRequest(request, JobInstanceBean.class);
		// seq 1
		//String url = START_INSTANCE_URL_TEMPLATE.replace("{ip}", jobInstance.getIpAddr()).replace("{port}", jobInstance.getPort() + "");
		String url = START_INSTANCE_URL_TEMPLATE.replace("{ip}", jobInstance.getIpAddr()).replace("{port}", jobInstance.getPort() + "").replace("{path}", jobInstance.getPath());
		String result = HttpClientUtil.post(url,BeanUtil.transBean2Map(jobInstance), false);
		this.message = JacksonJsonUtil.jsonToBean(result, Message.class);
		return this.message; 
	}
	
	/**
	 * 删除目标服务器的工作实例
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("pauseTartgetHostJob")  
	@RequiresPermissions("Scheduler:pauseTartgetHostJob")
    public 	@ResponseBody Message pauseTartgetHostJob(  HttpServletRequest request,HttpServletResponse response) throws Exception{  
		JobInstanceBean jobInstance =  (JobInstanceBean)GocWebUtils.formatBeanFromRequest(request, JobInstanceBean.class);
		// seq 1
		//String url = STOP_INSTANCE_URL_TEMPLATE.replace("{ip}", jobInstance.getIpAddr()).replace("{port}", jobInstance.getPort() + "");
		String url = STOP_INSTANCE_URL_TEMPLATE.replace("{ip}", jobInstance.getIpAddr()).replace("{port}", jobInstance.getPort() + "").replace("{path}", jobInstance.getPath());
		String result = HttpClientUtil.post(url,BeanUtil.transBean2Map(jobInstance), false);
		this.message = JacksonJsonUtil.jsonToBean(result, Message.class);
		return this.message; 
	}
	
	/**
	 * 启动目标服务器实例的调度工作实例
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("startTartgetHostAllJob")  
	@RequiresPermissions("Scheduler:startTartgetHostAllJob")
    public 	@ResponseBody Message startTartgetHostAllJob(  HttpServletRequest request,HttpServletResponse response) throws Exception{  
		JobInstanceBean jobInstance =  (JobInstanceBean)GocWebUtils.formatBeanFromRequest(request, JobInstanceBean.class);
		// seq 1
		//String url = START_ALL_URL_TEMPLATE.replace("{ip}", jobInstance.getIpAddr()).replace("{port}", jobInstance.getPort() + "");
		String url = START_ALL_URL_TEMPLATE.replace("{ip}", jobInstance.getIpAddr()).replace("{port}", jobInstance.getPort() + "").replace("{path}", jobInstance.getPath());
		String result = HttpClientUtil.post(url,BeanUtil.transBean2Map(jobInstance), false);
		this.message = JacksonJsonUtil.jsonToBean(result, Message.class);
		return this.message; 
	}
	
	/**
	 * 删除目标服务器的工作实例
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("pauseTartgetHostAllJob")  
	@RequiresPermissions("Scheduler:pauseTartgetHostAllJob")
    public 	@ResponseBody Message pauseTartgetHostAllJob(  HttpServletRequest request,HttpServletResponse response) throws Exception{  
		JobInstanceBean jobInstance =  (JobInstanceBean)GocWebUtils.formatBeanFromRequest(request, JobInstanceBean.class);
		// seq 1
		//String url = STOP_ALL_URL_TEMPLATE.replace("{ip}", jobInstance.getIpAddr()).replace("{port}", jobInstance.getPort() + "");
		String url = STOP_ALL_URL_TEMPLATE.replace("{ip}", jobInstance.getIpAddr()).replace("{port}", jobInstance.getPort() + "").replace("{path}", jobInstance.getPath());
		String result = HttpClientUtil.post(url,BeanUtil.transBean2Map(jobInstance), false);
		this.message = JacksonJsonUtil.jsonToBean(result, Message.class);
		return this.message; 
	}
	
	/**
	 * 健康检查
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("schedulerCheck")  
	@RequiresPermissions("Scheduler:schedulerCheck")
    public 	@ResponseBody Message schedulerCheck(  HttpServletRequest request,HttpServletResponse response) throws Exception{  
		JobInstanceBean jobInstance =  (JobInstanceBean)GocWebUtils.formatBeanFromRequest(request, JobInstanceBean.class);
		// seq 1
		//String url = HEALTHCHECK_URL_TEMPLATE.replace("{ip}", jobInstance.getIpAddr()).replace("{port}", jobInstance.getPort() + "");
		String url = HEALTHCHECK_URL_TEMPLATE.replace("{ip}", jobInstance.getIpAddr()).replace("{port}", jobInstance.getPort() + "").replace("{path}", jobInstance.getPath());
		try{
			String result = HttpClientUtil.post(url, new HashMap<String,Object>(),false);
			//System.out.println(result);
			this.message = JacksonJsonUtil.jsonToBean(result, Message.class);
		}catch(Exception e){
			//e.printStackTrace();
			this.message = new Message("",RequestStatusConstant.STATUS_CODE_FAILED, "无法连接指定的服务器!");
		}
		
		return this.message; 
	}
	
	@RequestMapping("runJobOne")
	@RequiresPermissions("Scheduler:runJobOne")
	public @ResponseBody Message runJobOne( HttpServletRequest request) throws Exception {
		JobInstanceBean jobInstance =  (JobInstanceBean)GocWebUtils.formatBeanFromRequest(request, JobInstanceBean.class);
		String url = RUNJOBONE_URL_TEMPLATE.replace("{ip}", jobInstance.getIpAddr()).replace("{port}", jobInstance.getPort() + "").replace("{path}", jobInstance.getPath());
		String result = HttpClientUtil.post(url, BeanUtil.transBean2Map(jobInstance),false);
		this.message = JacksonJsonUtil.jsonToBean(result, Message.class);
		return message;
	}

	
}
