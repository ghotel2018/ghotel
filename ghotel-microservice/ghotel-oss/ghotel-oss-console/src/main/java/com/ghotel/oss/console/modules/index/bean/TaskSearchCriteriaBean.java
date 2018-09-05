package com.ghotel.oss.console.modules.index.bean;

import com.ghotel.oss.console.core.common.bean.PaginationBean;

public class TaskSearchCriteriaBean extends PaginationBean {

	private String taskName;
	private String taskId;
	private String taskDesc;
	private String jobType;
	private String taskParameter;
	private String taskCreateBy;
	private String taskCreateTime;
	private String taskCompleteTime;
	private String taskStartTime;
	private String taskStatus;
	private String taskCreateTimeStart;
	private String taskCreateTimeEnd;
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public String getTaskDesc() {
		return taskDesc;
	}
	public String getTaskCreateTimeStart() {
		return taskCreateTimeStart;
	}
	public void setTaskCreateTimeStart(String taskCreateTimeStart) {
		this.taskCreateTimeStart = taskCreateTimeStart;
	}
	public String getTaskCreateTimeEnd() {
		return taskCreateTimeEnd;
	}
	public void setTaskCreateTimeEnd(String taskCreateTimeEnd) {
		this.taskCreateTimeEnd = taskCreateTimeEnd;
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
	public String getTaskParameter() {
		return taskParameter;
	}
	public void setTaskParameter(String taskParameter) {
		this.taskParameter = taskParameter;
	}
	public String getTaskCreateBy() {
		return taskCreateBy;
	}
	public void setTaskCreateBy(String taskCreateBy) {
		this.taskCreateBy = taskCreateBy;
	}
	public String getTaskCreateTime() {
		return taskCreateTime;
	}
	public void setTaskCreateTime(String taskCreateTime) {
		this.taskCreateTime = taskCreateTime;
	}
	public String getTaskCompleteTime() {
		return taskCompleteTime;
	}
	public void setTaskCompleteTime(String taskCompleteTime) {
		this.taskCompleteTime = taskCompleteTime;
	}
	public String getTaskStartTime() {
		return taskStartTime;
	}
	public void setTaskStartTime(String taskStartTime) {
		this.taskStartTime = taskStartTime;
	}
	public String getTaskStatus() {
		return taskStatus;
	}
	public void setTaskStatus(String taskStatus) {
		this.taskStatus = taskStatus;
	}
	@Override
	public String toString() {
		return "TaskSearchCriteriaBean [taskName=" + taskName + ", taskDesc=" + taskDesc + ", jobType=" + jobType
				+ ", taskParameter=" + taskParameter + ", taskCreateBy=" + taskCreateBy + ", taskCreateTime="
				+ taskCreateTime + ", taskCompleteTime=" + taskCompleteTime + ", taskStartTime=" + taskStartTime
				+ ", taskStatus=" + taskStatus + ", taskCreateTimeStart=" + taskCreateTimeStart + ", taskCreateTimeEnd="
				+ taskCreateTimeEnd + "]";
	}
	public String getTaskId() {
		return taskId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	
	
}
