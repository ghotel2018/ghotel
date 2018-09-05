package com.ghotel.oss.console.modules.scheduler.bean;

public class JobInstanceBean {
	
	private String jobInstanceId;

	private String jobId;
	
	private String ipAddr;
	
	private int port;
	
	private int status;
	
	private String errMsg;
	
	private String path;
	
	private String lastTimeStamp;
	
	private String timeStamp;
	
	private int healthStatus;
	
	private int errNum;

	public String getJobId() {
		return jobId;
	}

	public void setJobId(String jobId) {
		this.jobId = jobId;
	}

	public String getIpAddr() {
		return ipAddr;
	}

	public void setIpAddr(String ipAddr) {
		this.ipAddr = ipAddr;
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getErrMsg() {
		return errMsg;
	}

	public void setErrMsg(String errMsg) {
		this.errMsg = errMsg;
	}

	public String getJobInstanceId() {
		return jobInstanceId;
	}

	public void setJobInstanceId(String jobInstanceId) {
		this.jobInstanceId = jobInstanceId;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getLastTimeStamp() {
		return lastTimeStamp;
	}

	public void setLastTimeStamp(String lastTimeStamp) {
		this.lastTimeStamp = lastTimeStamp;
	}

	public String getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(String timeStamp) {
		this.timeStamp = timeStamp;
	}

	public int getHealthStatus() {
		return healthStatus;
	}

	public void setHealthStatus(int healthStatus) {
		this.healthStatus = healthStatus;
	}

	public int getErrNum() {
		return errNum;
	}

	public void setErrNum(int errNum) {
		this.errNum = errNum;
	}
	
	
	
}
