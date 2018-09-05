package com.ghotel.oss.console.modules.index.bean;

import com.ghotel.oss.console.core.common.bean.PaginationBean;

public class NoticeSearchCriteria  extends PaginationBean  {

	private String tableName;
	
	private String noticeSubject;
	
	private String sentTo;

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getNoticeSubject() {
		return noticeSubject;
	}

	public void setNoticeSubject(String noticeSubject) {
		this.noticeSubject = noticeSubject;
	}

	public String getSentTo() {
		return sentTo;
	}

	public void setSentTo(String sentTo) {
		this.sentTo = sentTo;
	}
	
	
	
}
