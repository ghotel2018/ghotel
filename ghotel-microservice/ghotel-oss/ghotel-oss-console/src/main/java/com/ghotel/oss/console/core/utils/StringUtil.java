package com.ghotel.oss.console.core.utils;

import java.util.Calendar;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StringUtil {

	/**
	 * 去掉字符串中的控制字符
	 * 
	 * @param sourceString
	 *            源字符串
	 * @return 去掉控制字符后的字符串
	 */
	public static String removeCtrlChar(String sourceString) {
		String result = null;

		if (sourceString != null) {
			// The pattern matches control characters
			Pattern p = Pattern.compile("[\\t\\n\\x0B\\f\\r]");
			// Pattern p = Pattern.compile("\\s");
			Matcher m = p.matcher("");

			m.reset(sourceString);
			// Replaces control characters with an empty string.
			result = m.replaceAll("");
		}

		return result;
	}

	public static boolean isNull(String str) {
		if (str == null || str.trim().equals("")) {
			return true;
		}
		return false;
	}

	/**
	 * 将字符串 s 用字符 c 从其左边填充至长度为 len
	 * 
	 * @param s
	 * @param len
	 * @param c
	 * @return
	 */
	public static String leftPad(String s, int len, char c) {
		if (s == null)
			s = "";
		if (len <= 0 || s.length() >= len)
			return s;

		int j = len - s.length();
		String pads = "";
		for (int k = 0; k < j; k++) {
			pads = pads + c;
		}
		pads = pads + s;

		return pads;
	}

	private static String getHexSeed(boolean isLowerCase) {
		String seed = null;
		if (isLowerCase) {
			seed = "0123456789abcdef";
		} else {
			seed = "0123456789ABCDEF";
		}

		return seed;
	}

	public static String byte2Hex(byte b, boolean isLowerCase) {
		String seed = getHexSeed(isLowerCase);
		return "" + seed.charAt(0xf & b >> 4) + seed.charAt(0xf & b);
	}

	public static byte hex2Byte(String str, boolean isLowerCase) {
		String seed = getHexSeed(isLowerCase);
		return (byte) (seed.indexOf(str.substring(0, 1)) * 16 + seed
				.indexOf(str.substring(1, 2)));
	}

	public static String bytes2HexString(byte[] bytes, boolean isLowerCase) {
		String result = "";
		for (int i = 0; i < bytes.length; i++) {
			result += byte2Hex(bytes[i], isLowerCase);
		}
		return result;
	}

	public static byte[] hexString2Bytes(String str, boolean isLowerCase) {
		byte[] b = new byte[str.length() / 2];
		for (int i = 0; i < b.length; i++) {
			String s = str.substring(i * 2, i * 2 + 2);
			b[i] = hex2Byte(s, isLowerCase);
		}
		return b;
	}
	public static String getDateString() {
		Calendar cal = Calendar.getInstance();
		int year = cal.get(Calendar.YEAR);// 获取年份
		int month = cal.get(Calendar.MONTH)+1;// 获取月份
		int day = cal.get(Calendar.DATE);// 获取日
		int hour = cal.get(Calendar.HOUR_OF_DAY);// 小时
		int minute = cal.get(Calendar.MINUTE);// 分
		int second = cal.get(Calendar.SECOND);// 秒
		//int WeekOfYear = cal.get(Calendar.DAY_OF_WEEK);// 一周的第几天
		return year + "-" + month + "-" + day + "-" + hour + "-" + minute + "-"
				+ second;
	}
	
	/**
	    * 字符串是否为空	
	    * @param value
	    * @return
	    * @author xieyunmei 2015-07-23
	    */
	   public static boolean isBlank(String value) {
		   return (null==value || value.trim().length() ==0);
	   }

	   /**
	    * 字符串是否为null或者为空
	    * @param value
	    * @return
	    * @author xieyunmei 2015-07-23
	    */
	   public static boolean isNullOrBlank(String value) {
	      return isNull(value) || isBlank(value);
	   }

	   /**
	    * 字符串是否不为空
	    * @param str
	    * @return
	    * @author xieyunmei 2015-07-23
	    */
	   public static boolean isNotBlank(String str){
		   int strLen;
	       if(str == null || (strLen = str.length()) == 0)
	           return false;
	       if(str.trim().equals(""))
	       	  return false;
	       for(int i = 0; i < strLen; i++){
	           if(!Character.isWhitespace(str.charAt(i)))
	               return true;
	       }
	       return false;
		}
	   
}
