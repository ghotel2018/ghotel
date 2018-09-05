package com.ghotel.oss.console.core.job.bean;

public class JobBean {

	private String jobId;
	
	private String JobName;
	
	private String jobDesc;
	
	private String jobCronExp;
	
	private int jobType;
	
	private int jobStatus;
	
	private int jobAutoStart;
	
	private int jobEnabled;
	
	private String handler;

	public String getJobId() {
		return jobId;
	}

	public void setJobId(String jobId) {
		this.jobId = jobId;
	}

	public String getJobName() {
		return JobName;
	}

	public void setJobName(String jobName) {
		JobName = jobName;
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

	public int getJobType() {
		return jobType;
	}

	public void setJobType(int jobType) {
		this.jobType = jobType;
	}

	public int getJobStatus() {
		return jobStatus;
	}

	public void setJobStatus(int jobStatus) {
		this.jobStatus = jobStatus;
	}

	public int getJobAutoStart() {
		return jobAutoStart;
	}

	public void setJobAutoStart(int jobAutoStart) {
		this.jobAutoStart = jobAutoStart;
	}

	public int getJobEnabled() {
		return jobEnabled;
	}

	public void setJobEnabled(int jobEnabled) {
		this.jobEnabled = jobEnabled;
	}

	public String getHandler() {
		return handler;
	}

	public void setHandler(String handler) {
		this.handler = handler;
	}
	
	
	
}
