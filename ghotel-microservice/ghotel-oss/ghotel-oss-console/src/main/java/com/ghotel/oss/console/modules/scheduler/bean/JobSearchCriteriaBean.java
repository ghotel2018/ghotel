package com.ghotel.oss.console.modules.scheduler.bean;

import com.ghotel.oss.console.core.common.bean.PaginationBean;

public class JobSearchCriteriaBean  extends PaginationBean  {

	
	private String jobName;
	
	private String jobDesc;
	
	private String jobType;
	
	private String jobStatus;
	
	private String jobAutoStartId;
	
	private String jobEnableInd;
	
	private String handler;

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

	public String getJobType() {
		return jobType;
	}

	public void setJobType(String jobType) {
		this.jobType = jobType;
	}

	public String getJobStatus() {
		return jobStatus;
	}

	public void setJobStatus(String jobStatus) {
		this.jobStatus = jobStatus;
	}

	public String getJobAutoStartId() {
		return jobAutoStartId;
	}

	public void setJobAutoStartId(String jobAutoStartId) {
		this.jobAutoStartId = jobAutoStartId;
	}

	public String getJobEnableInd() {
		return jobEnableInd;
	}

	public void setJobEnableInd(String jobEnableInd) {
		this.jobEnableInd = jobEnableInd;
	}

	public String getHandler() {
		return handler;
	}

	public void setHandler(String handler) {
		this.handler = handler;
	}
	
}
