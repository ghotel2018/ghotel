package com.ghotel.oss.console.core.common.bean;

import java.io.Serializable;

import com.alibaba.fastjson.JSONObject;

public class DTOObjectMessage<T>  implements Serializable{


		/**
	* @Fields serialVersionUID : TODO()
	*/
	private static final long serialVersionUID = -7189076524568132436L;

	private String messageCode;
	
	private int statusCode;
	
	private T messageBody;

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

	public T getMessageBody() {
		return messageBody;
	}

	public void setMessageBody(T messageBody) {
		this.messageBody = messageBody;
	}
	public String toString() {  
        return JSONObject.toJSONString(this);  
    }

	
	
	
}
