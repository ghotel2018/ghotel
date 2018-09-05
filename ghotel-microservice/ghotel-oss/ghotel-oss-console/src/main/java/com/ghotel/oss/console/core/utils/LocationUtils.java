package com.ghotel.oss.console.core.utils;

import java.io.Serializable;

/**
 * 地理位置距离计算公共类
 * @author hongjun
 *
 */
public class LocationUtils implements Serializable{
	
	private static final long serialVersionUID = 8565516327975989684L;
	
    private static final double EARTH_RADIUS = 6378.137;    //地球半径
    private static final double RAD = Math.PI / 180.0;   //   π/180
    
    /**
	 * 通过经纬度获取距离(单位：km)
	 * @param lng1 经度1
	 * @param lat1 纬度1
	 * @param lng2 经度2
	 * @param lat2 纬度2
	 * @return
	 */
	public static int getDistance(double lng1, double lat1, double lng2, double lat2) {
		double radLat1 = lat1 * RAD;
		double radLat2 = lat2 * RAD;
		double a = radLat1 - radLat2;
		double b = (lng1 - lng2) * RAD;
		double s = 2 * Math.asin(Math.sqrt(
				Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
		s = s * EARTH_RADIUS;
		s = Math.round(s * 1d) / 1d;
		int j = (int) s;
		//如果距离少于1KM，默认为1KM
		if (j == 0) {
			j = 1;
		}
		return j;
	}
}
