package com.ghotel.oss.console.modules.scheduler.bean;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "jobDetailInfo")
public class JobDetailInfoBean   {
	//唯一标识
	@Id
	private String jobId;
	//调度任务名称
	private String jobName;
	//任务描述
	private String jobDesc;
	//cron表达式
	private String jobCronExp;
	//任务类型
	private String jobType;
	
	//0,'未启动',1,'执行中',-1,'出错',2,'挂起','未知'
	private Integer jobStatus=0;
	//状态中文描述
	private String jobStatusStr;
	//是否自动启动0,'不自动启动',1,'自动启动','未知'
	private int jobAutoStartId=0;
	//是否自动启动中文描述
	private String jobAutoStartIdStr;
	//是否启用
	private Integer jobEnableInd=0;
	//0,'未启用',1,'已启用','未知'
	private String jobEnableIndStr;
	//处理器
	private String handler;
	//？暂时不知这个默认状态是用来干什么的
	private String originalStatus;
	//处理器类型
	private Integer handlerType;
	
	private String isSingleton="0"; // 0不是, 1是 ， 不是单例的任务， 可以支持分布式部署  
	//job对应实例id，创建实例时写入
	private String jobInstanceId;
	
	public String getJobInstanceId() {
		return jobInstanceId;
	}

	public void setJobInstanceId(String jobInstanceId) {
		this.jobInstanceId = jobInstanceId;
	}

	public String getJobId() {
		return jobId;
	}

	public void setJobId(String jobId) {
		this.jobId = jobId;
	}

	public String getJobName() {
		return jobName;
	}

	public void setJobName(String jobName) {
		this.jobName = jobName;
	}

	public String getJobDesc() {
		return jobDesc;
	}

	public void setJobDesc(String jobDesc) {
		this.jobDesc = jobDesc;
	}

	public String getJobCronExp() {
		return jobCronExp;
	}

	public void setJobCronExp(String jobCronExp) {
		this.jobCronExp = jobCronExp;
	}

	public String getJobType() {
		return jobType;
	}

	public void setJobType(String jobType) {
		this.jobType = jobType;
	}

	public int getJobStatus() {
		return jobStatus;
	}

	public void setJobStatus(int jobStatus) {
		this.jobStatus = jobStatus;
	}

	public String getJobStatusStr() {
		return jobStatusStr;
	}

	public void setJobStatusStr(String jobStatusStr) {
		this.jobStatusStr = jobStatusStr;
	}

	public int getJobAutoStartId() {
		return jobAutoStartId;
	}

	public void setJobAutoStartId(int jobAutoStartId) {
		this.jobAutoStartId = jobAutoStartId;
	}

	public String getJobAutoStartIdStr() {
		return jobAutoStartIdStr;
	}

	public void setJobAutoStartIdStr(String jobAutoStartIdStr) {
		this.jobAutoStartIdStr = jobAutoStartIdStr;
	}

	public int getJobEnableInd() {
		return jobEnableInd;
	}

	public void setJobEnableInd(int jobEnableInd) {
		this.jobEnableInd = jobEnableInd;
	}

	public String getJobEnableIndStr() {
		return jobEnableIndStr;
	}

	public void setJobEnableIndStr(String jobEnableIndStr) {
		this.jobEnableIndStr = jobEnableIndStr;
	}

	public String getHandler() {
		return handler;
	}

	public void setHandler(String handler) {
		this.handler = handler;
	}

	public String getOriginalStatus() {
		return originalStatus;
	}

	public void setOriginalStatus(String originalStatus) {
		this.originalStatus = originalStatus;
	}

	public int getHandlerType() {
		return handlerType;
	}

	public void setHandlerType(int handlerType) {
		this.handlerType = handlerType;
	}

	public String getIsSingleton() {
		return isSingleton;
	}

	public void setIsSingleton(String isSingleton) {
		this.isSingleton = isSingleton;
	}
	
	
	
}
