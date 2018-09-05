package com.ghotel.oss.console.core.job.bean;

import java.sql.Timestamp;

public class TaskBean {

	private String taskId;
	
	private String taskName;
	
	private String taskDesc;
	
	private String jobType;
	
	private String taskParams;
	
	private String taskCreateBy;
	
	private Timestamp taskCreateTime;
	
	private Timestamp TaskCompleteTime;
	
	private int taskStatus;
	
	private String jobInstanceId;

	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public String getTaskDesc() {
		return taskDesc;
	}

	public void setTaskDesc(String taskDesc) {
		this.taskDesc = taskDesc;
	}

	public String getJobType() {
		return jobType;
	}

	public void setJobType(String jobType) {
		this.jobType = jobType;
	}

	public String getTaskCreateBy() {
		return taskCreateBy;
	}

	public void setTaskCreateBy(String taskCreateBy) {
		this.taskCreateBy = taskCreateBy;
	}

	public Timestamp getTaskCreateTime() {
		return taskCreateTime;
	}

	public void setTaskCreateTime(Timestamp taskCreateTime) {
		this.taskCreateTime = taskCreateTime;
	}

	public Timestamp getTaskCompleteTime() {
		return TaskCompleteTime;
	}

	public void setTaskCompleteTime(Timestamp taskCompleteTime) {
		TaskCompleteTime = taskCompleteTime;
	}

	public int getTaskStatus() {
		return taskStatus;
	}

	public void setTaskStatus(int taskStatus) {
		this.taskStatus = taskStatus;
	}

	public String getTaskParams() {
		return taskParams;
	}

	public void setTaskParams(String taskParams) {
		this.taskParams = taskParams;
	}

	public String getJobInstanceId() {
		return jobInstanceId;
	}

	public void setJobInstanceId(String jobInstanceId) {
		this.jobInstanceId = jobInstanceId;
	}

	
	
	
}
