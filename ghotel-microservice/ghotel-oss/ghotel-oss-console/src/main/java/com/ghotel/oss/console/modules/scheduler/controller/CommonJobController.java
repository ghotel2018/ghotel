package com.ghotel.oss.console.modules.scheduler.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ghotel.oss.console.core.common.bean.Message;
import com.ghotel.oss.console.core.common.controller.AbstractModuleCommonController;
import com.ghotel.oss.console.core.job.QuartzJobManager;
import com.ghotel.oss.console.core.utils.GocWebUtils;
import com.ghotel.oss.console.core.constants.RequestStatusConstant;
import com.ghotel.oss.console.modules.scheduler.bean.JobDetailInfoBean;
import com.ghotel.oss.console.modules.scheduler.bean.JobInstanceBean;
import com.ghotel.oss.console.modules.scheduler.service.SchedulerService;

/*
 * 
 * 用于job中调度任务控制，其中job调度与表中jobid一一对应
 */
@Controller
@RequestMapping("/security/commonJob")
public class CommonJobController  extends AbstractModuleCommonController  {

	@Autowired
	SchedulerService schedulerService;
	//启动调度任务
	@RequestMapping("startJob")  
    public 	@ResponseBody Message startJob(JobInstanceBean jobInstanceBean) throws Exception{  
		schedulerService.updateToStartJob(jobInstanceBean);
		this.message = new Message("",RequestStatusConstant.STATUS_CODE_SECCEED, "启动任务成功！");
		return this.message; 
	}
	//停止调度任务
	@RequestMapping("stopJob")  
    public 	@ResponseBody Message stopJob(JobInstanceBean jobInstanceBean) throws Exception{  
		schedulerService.updateToStopJob(jobInstanceBean);
		this.message = new Message("",RequestStatusConstant.STATUS_CODE_SECCEED, "停止任务成功！");
		return this.message; 
	}
	//启动所有调度任务
	@RequestMapping("startAllJob")  
    public 	@ResponseBody Message startAllJob() throws Exception{  
		schedulerService.updateToStartAllJobs();
		this.message = new Message("",RequestStatusConstant.STATUS_CODE_SECCEED, "成功启动所有空闲或停止的任务！");
		return this.message; 
	}
	//停止所有调度任务
	@RequestMapping("stopAllJob")  
    public 	@ResponseBody Message stopAllJob() throws Exception{  
		schedulerService.updateToPauseAllJobs();
		this.message = new Message("",RequestStatusConstant.STATUS_CODE_SECCEED, "成功停止所有正在运行的任务！");

		return this.message; 
	}
	//调度管理器检查
	@RequestMapping("schedulerCheck")  
    public 	@ResponseBody Message schedulerCheck() throws Exception{  
		boolean isHealthy =  QuartzJobManager.healthCheck();
		this.message = new Message("",RequestStatusConstant.STATUS_CODE_SECCEED);
		if(!isHealthy){
			this.message = new Message("",RequestStatusConstant.STATUS_CODE_FAILED,"调度管理器已经关闭！");
		}
		
		return this.message; 
	}

	@RequestMapping("runJobOne")
	public @ResponseBody
	Message runJobOne(JobInstanceBean jobInstanceBean) throws Exception {
		schedulerService.runJobOne(jobInstanceBean);
		this.message = new Message("",RequestStatusConstant.STATUS_CODE_SECCEED, "成功运行一次任务！");
		return this.message;
	}
}
