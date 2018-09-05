package com.ghotel.oss.console.core.utils;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

/**
 * 生成主键工具类
 * @author 卢坤 2012-12-3
 */
public class KeyUtil {
	private static int randomNum = 100;
	private static int cn_randomNum = 10;
	private static int referenceYear = 2015;//参照年份
	private static Map<String,String> yearMap = new HashMap<String,String>();
	private static Map<String,String> monthMap = new HashMap<String,String>();
	
	static{
		yearMap.put("1", "A");
		yearMap.put("2", "B");
		yearMap.put("3", "C");
		yearMap.put("4", "D");
		yearMap.put("5", "E");
		yearMap.put("6", "F");
		yearMap.put("7", "G");
		yearMap.put("8", "H");
		yearMap.put("9", "I");
		yearMap.put("10", "J");
		yearMap.put("11", "K");
		yearMap.put("12", "L");
		yearMap.put("13", "M");
		yearMap.put("14", "N");
		yearMap.put("15", "O");
		yearMap.put("16", "P");
		yearMap.put("17", "Q");
		yearMap.put("18", "R");
		yearMap.put("19", "S");
		yearMap.put("20", "T");
		yearMap.put("21", "U");
		yearMap.put("22", "V");
		yearMap.put("23", "W");
		yearMap.put("24", "X");
		yearMap.put("25", "Y");
		yearMap.put("26", "Z");
		yearMap.put("27", "a");
		yearMap.put("28", "b");
		yearMap.put("29", "c");
		yearMap.put("30", "d");
		yearMap.put("31", "e");
		yearMap.put("32", "f");
		yearMap.put("33", "g");
		yearMap.put("34", "h");
		yearMap.put("35", "i");
		yearMap.put("36", "j");
		yearMap.put("37", "k");
		yearMap.put("38", "l");
		yearMap.put("39", "m");
		yearMap.put("40", "n");
		yearMap.put("41", "o");
		yearMap.put("42", "p");
		yearMap.put("43", "q");
		yearMap.put("44", "r");
		yearMap.put("45", "s");
		yearMap.put("46", "t");
		yearMap.put("47", "u");
		yearMap.put("48", "v");
		yearMap.put("49", "w");
		yearMap.put("50", "x");
		yearMap.put("51", "y");
		yearMap.put("52", "z");
		
		monthMap.put("1", "1");
		monthMap.put("2", "2");
		monthMap.put("3", "3");
		monthMap.put("4", "4");
		monthMap.put("5", "5");
		monthMap.put("6", "6");
		monthMap.put("7", "7");
		monthMap.put("8", "8");
		monthMap.put("9", "9");
		monthMap.put("10", "O");
		monthMap.put("11", "N");
		monthMap.put("12", "D");
	}
	
	/**
	 * 拿到主键
	 * @author 2012-12-3
	 * @param pojo
	 * @return
	 */
	public static String getKey(Object pojo){
		StringBuffer sb = new StringBuffer();
		
		//取类名前4位作为前缀
//		if(pojo != null) {
//			String calssName = pojo.getClass().getSimpleName();
//			int len = calssName.length();
//			String preKey = len<5?calssName:calssName.substring(0, 4);
//			sb.append(preKey);
//			if(len<4){
//				int n = 4 - len;
//				for(int i=0;i<n;i++){
//					sb.append("-");
//				}
//			}
//		} else {
//			String s = "keys";
//			sb.append(s);
//		}
		//取当前时间毫秒数+递增序列数作为值
		synchronized(KeyUtil.class){
			randomNum = randomNum==199?100:randomNum+1;
			sb.append(System.currentTimeMillis())
			  .append(Integer.toString(randomNum).substring(1));
		}
		
		return sb.toString();
	}
	
	/**
     * 生成随机数字和字母组合
     * @param length[生成随机数的长度]
     * @return
     */
    public static String getCharAndNumrKey(int length) throws Exception {
    	  StringBuffer val = new StringBuffer();
          Random random = new Random();
          if(length >3){
	          for(int i = 0; i < length-3; i++) {
	               //输出字母还是数字
	               String charOrNum = random.nextInt(2) % 2 == 0 ? "char" : "num" ;
	               //字符串
	               if("char".equalsIgnoreCase(charOrNum)) {
		               // 取得大写字母还是小写字母
		               int choice = random.nextInt(2) % 2 == 0 ? 65 : 97;
		               val.append((char)(choice + random.nextInt(26)));
	               }else if("num".equalsIgnoreCase(charOrNum)) { //数字
	            	   val.append(String.valueOf(random.nextInt(10)));
	               }
	          }
          }
          //取随机数字和字母组合+年+月+序号
          Calendar cal = Calendar.getInstance();
          int year = cal.get(Calendar.YEAR);      //年
          int month = cal.get(Calendar.MONTH) + 1;//月
          int yearNum = year - referenceYear ;
          int num = yearNum%52==0?52:yearNum%52;
          cn_randomNum = cn_randomNum==19?10:cn_randomNum+1;
          val.append(yearMap.get(String.valueOf(num)));
          val.append(monthMap.get(String.valueOf(month)));
          val.append(Integer.toString(cn_randomNum).substring(1));
          return val.toString();
    }
}
