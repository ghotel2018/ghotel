package com.ghotel.oss.console.core.utils;


import javax.xml.namespace.QName;

import org.apache.axis.client.Call;
import org.apache.axis.client.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
public class EmailUtils {
	private static Logger logger = LoggerFactory.getLogger(EmailUtils.class);
	/**
	 * 
	* @Title: sendClient
	* @Description: 
	* @author zhangyp 
	* @param @param eaccAddress 
	* @param @param eaccMethod
	* @param @param requestDoc
	* @param @return
	* @param @throws Exception  
	* @return Object    返回类型
	* @throws
	 */
	public static Object sendClient(String eaccAddress, String eaccMethod,
			String requestDoc) throws Exception {
		try {
			logger.info(eaccAddress + "\nEACC发送短信的XML:" + requestDoc);
			Service serv = new Service();
			Call call = (Call) serv.createCall();
			call.setTargetEndpointAddress(eaccAddress);
			call.setOperationName(new QName("", eaccMethod));
			Object result = call.invoke(new Object[] { requestDoc });
			logger.info("EACC发送短信的Result：" + result);
			return result;
		} catch (Exception e) {
			logger.error("EACC发送短信异常信息：" + e);
			throw new Exception("CmcConstants.ERROR_MSG.SMS_CENTER_ERROR");
		}
	}

}
