package com.ghotel.oss.console.core.interfaze;

public abstract class MessageHandler implements MessageInterface {

	public Object proceed(){
		Object result = handlerResponse(send());
		return result;
	}
	
}
