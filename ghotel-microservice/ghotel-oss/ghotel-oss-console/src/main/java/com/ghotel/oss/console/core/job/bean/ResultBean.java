package com.ghotel.oss.console.core.job.bean;

public class ResultBean {

	private String resultId;
	
	private String taskId;
	
	private int status;
	
	private String failedReaon;
	
	private String taskExecutionResultDownloadUrl;

	public String getResultId() {
		return resultId;
	}

	public void setResultId(String resultId) {
		this.resultId = resultId;
	}

	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getTaskExecutionResultDownloadUrl() {
		return taskExecutionResultDownloadUrl;
	}

	public void setTaskExecutionResultDownloadUrl(
			String taskExecutionResultDownloadUrl) {
		this.taskExecutionResultDownloadUrl = taskExecutionResultDownloadUrl;
	}

	public String getFailedReaon() {
		return failedReaon;
	}

	public void setFailedReaon(String failedReaon) {
		this.failedReaon = failedReaon;
	}
	
}
