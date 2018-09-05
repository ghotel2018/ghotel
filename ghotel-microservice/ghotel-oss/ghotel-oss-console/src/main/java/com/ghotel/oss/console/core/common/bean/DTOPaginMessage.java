package com.ghotel.oss.console.core.common.bean;



import java.io.Serializable;
import java.util.List;

import com.alibaba.fastjson.JSONObject;

public class DTOPaginMessage<T> implements Serializable{
	/**
	* @Fields serialVersionUID : TODO()
	*/
	private static final long serialVersionUID = 6009332206845248626L;
	private String messageCode;
	private int statusCode;
	private MessageBody<T> messageBody ;
	
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
	public MessageBody<T> getMessageBody() {
		return messageBody;
	}
	public void setMessageBody(MessageBody<T> messageBody) {
		this.messageBody = messageBody;
	}
	public class MessageBody<T> {
		private long start;
		private long num;
		private long total;

		public long getStart() {
			return start;
		}
		public void setStart(long start) {
			this.start = start;
		}
		public long getNum() {
			return num;
		}
		public void setNum(long num) {
			this.num = num;
		}
		public long getTotal() {
			return total;
		}
		public void setTotal(long total) {
			this.total = total;
		}
	    private List<T> list;

	    public List<T> getList() {
	        return list;
	    }
	    public void setList(List<T> list) {
	        this.list = list;
	    }
	    public String toString() {  
	        return JSONObject.toJSONString(this);  
	    }
	}
	public String toString() {  
        return JSONObject.toJSONString(this);  
    }
}
