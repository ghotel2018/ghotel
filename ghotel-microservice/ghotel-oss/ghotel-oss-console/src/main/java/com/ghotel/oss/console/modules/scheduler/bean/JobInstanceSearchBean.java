package com.ghotel.oss.console.modules.scheduler.bean;

import com.ghotel.oss.console.core.common.bean.PaginationBean;

public class JobInstanceSearchBean   extends PaginationBean {

	private String jobId;
	
	private String ipAddr;
	
	private int port;

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
	
	
	
}
