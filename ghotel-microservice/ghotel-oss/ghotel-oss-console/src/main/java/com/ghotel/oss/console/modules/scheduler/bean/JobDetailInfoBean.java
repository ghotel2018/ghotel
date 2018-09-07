package com.ghotel.oss.console.modules.scheduler.bean;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "jobDetailInfo")
public class JobDetailInfoBean   {
	@Id
	@Indexed(unique = true)
	private String jobId;
	
	private String jobName;
	
	private String jobDesc;
	
	private String jobCronExp;
	
	private String jobType;
	
	private Integer jobStatus;
	
	private String jobStatusStr;
	
	private int jobAutoStartId;
	
	private String jobAutoStartIdStr;
	
	private Integer jobEnableInd;
	
	private String jobEnableIndStr;
	
	private String handler;

	private String originalStatus;
	
	private Integer handlerType;
	
	private Integer isSingleton; // 0不是, 1是 ， 不是单例的任务， 可以支持分布式部署  
	
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

	public int getIsSingleton() {
		return isSingleton;
	}

	public void setIsSingleton(int isSingleton) {
		this.isSingleton = isSingleton;
	}
	
	
	
}
