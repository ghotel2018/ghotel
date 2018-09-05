package com.ghotel.oss.console.core.utils;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class TimeUtil {
	public static int dateDiff(String fromDate, String toDate,String dayFormat)
			throws Exception {
		SimpleDateFormat df = new SimpleDateFormat(dayFormat);
		Date from = df.parse(fromDate);
		Date to = df.parse(toDate);
		long days = (to.getTime() - from.getTime())
				/ (24 * 60 * 60 * 1000L) ;
		return (int)days;
	}
	public static int dateDiff(Date from, Date to){
		long days = (to.getTime() - from.getTime())
				/ (24 * 60 * 60 * 1000L) ;
		return (int)days;
	}
	public static long dateDiffSec(Date from, Date to) {
		long Sec = (to.getTime() - from.getTime()) / (1000L);
		return Sec;
	}
	public static Date dateAdd(Date from, int day) {
		Calendar ca = Calendar.getInstance();
		ca.setTime(from);
		ca.add(Calendar.DATE, day);// num为增加的天数，可以改变的;
		return ca.getTime();
	}
	public static Date dayEnd(Date from) {
		Calendar calendar = Calendar.getInstance();
        calendar.setTime(from);
        //小时设为0
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        //分 设为0
        calendar.set(Calendar.MINUTE, 59);
        //秒设为0
        calendar.set(Calendar.SECOND, 59);
        //毫秒设为0
        calendar.set(Calendar.MILLISECOND, 59);
		return calendar.getTime();
	}
	public static Date dayBegin(Date from) {
		 Calendar calendar = Calendar.getInstance();
         calendar.setTime(from);
         //小时设为0
         calendar.set(Calendar.HOUR_OF_DAY, 0);
         //分 设为0
         calendar.set(Calendar.MINUTE, 0);
         //秒设为0
         calendar.set(Calendar.SECOND, 0);
         //毫秒设为0
         calendar.set(Calendar.MILLISECOND, 0);
		return calendar.getTime();
	}
	public static void main(String args[]) throws Exception{
		//2017-03-15---2017-04-30
		System.out.print(dateDiff("20170315","20170431","yyyyMMdd"));
	}
	 
}
