package com.ghotel.oss.console.modules.admin.bean;

import com.ghotel.oss.console.core.common.bean.PaginationBean;

public class SystemMessageBean extends PaginationBean {

	// private int start = 0;
	// private int num = 10;

	private String messageId;
	private String messageContent;
	private String createDate;
	private String createBy;
	private String isHot;
	private String messageSubject;

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public String getMessageId() {
		return messageId;
	}

	public void setMessageId(String messageId) {
		this.messageId = messageId;
	}

	public String getMessageContent() {
		return messageContent;
	}

	public void setMessageContent(String messageContent) {
		this.messageContent = messageContent;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getCreateBy() {
		return createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy == null ? null : createBy.trim();
	}

	public String getIsHot() {
		return isHot;
	}

	public void setIsHot(String isHot) {
		this.isHot = isHot;
	}

	public String getMessageSubject() {
		return messageSubject;
	}

	public void setMessageSubject(String messageSubject) {
		this.messageSubject = messageSubject;
	}

	@Override
	public String toString() {
		return "SystemMessageBean [messageId=" + messageId + ", messageContent=" + messageContent + ", createDate="
				+ createDate + ", createBy=" + createBy + ", isHot=" + isHot + ", messageSubject=" + messageSubject
				+ "]";
	}
}
