package com.ghotel.oss.console.core.utils;

import org.apache.commons.lang3.StringUtils;

/**
 * 加密工具类
 * @author Administrator
 *
 */
public class EncryptUtil {

	
	/**
	 * 对参数进行屏蔽
	 */
	public static String hideImportantInfo(String info) {
		if (StringUtils.isBlank(info)) {
			return "";
		}
		String result = info;
		if (info.indexOf("@") > -1) {
			String pre = info.substring(0, info.lastIndexOf("@"));
			String suf = info.substring(info.lastIndexOf("@"), info.length());
			result = hideMiddleNumber(pre) + suf;
		} else {
			result = hideMiddleNumber(info);
		}
		return result;
	}

	/**
	 * 对数字中间的4位数字进行屏蔽, <5位屏蔽2位
	 */
	public static String hideMiddleNumber(String number) {
		if (StringUtils.isBlank(number)) {
			return "";
		}
		String result = number;
		int len = number.length();
		int midLen = len / 2;
		if (len > 4) {
			String pre = number.substring(0, midLen - 2);
			String suf = number.substring(midLen + 2, len);
			return pre + "****" + suf;
		} else if (len > 2) {
			String pre = number.substring(0, midLen - 1);
			String suf = number.substring(midLen + 1, len);
			return pre + "****" + suf;
		}
		return result;
	}
}
