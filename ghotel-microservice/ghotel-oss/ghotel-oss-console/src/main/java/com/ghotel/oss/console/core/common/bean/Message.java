package com.ghotel.oss.console.core.common.bean;

import java.io.Serializable;

import com.ghotel.oss.console.core.utils.GocJsonUtil;

/**
 * 
 * @author goc
 * 
 * @description 统一信息对象 2016-6-14
 */
public class Message implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2825834618850919041L;

	private String messageCode;

	private int statusCode;

	private Object messageBody;

	public Message(String messageCode, int statusCode) {
		this.statusCode = statusCode;
		this.messageCode = messageCode;

	}

	public Message(String messageCode, int statusCode, Object messageBody) {
		this.statusCode = statusCode;
		this.messageCode = messageCode;
		this.messageBody = messageBody;
	}

	public Message() {
	}

	public String getMessageCode() {
		return messageCode;
	}

	public void setMessageCode(String messageCode) {
		this.messageCode = messageCode;
	}

	public int getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public Object getMessageBody() {
		return messageBody;
	}

	public void setMessageBody(Object messageBody) {
		this.messageBody = messageBody;
	}

	public String toString() {
		try {
			return GocJsonUtil.beanToJson(this);
		} catch (Exception e) {
			return "{ statusCode :" + 1 + ", messageCode: " + "'" + messageCode + "'}";
		}

	}

}
