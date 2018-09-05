package com.ghotel.oss.console.core.utils;

import java.util.List;

import org.apache.commons.lang3.StringUtils;

import com.ghotel.oss.console.modules.statedata.bean.CmcStaticData;
import com.ghotel.oss.console.modules.statedata.service.CmcStaticDataService;

public class StaticDataUtil {
	public static boolean  isExist(String typeKey,String typeCode,String val,CmcStaticDataService service){
		if(StringUtils.isNotBlank(typeCode)&&StringUtils.isNotBlank(typeKey)&&StringUtils.isNotBlank(val)){
			 List<CmcStaticData> listData=service.staticDataCachData(typeCode, typeKey);
			 if(listData!=null&&listData.size()>0){
				 StringBuffer sb=new StringBuffer();
				 for(CmcStaticData o:listData){
					 sb.append(","+o.getValue()+",");
				 }
				 if(sb.indexOf(val)>=0){
					 return true;
				 }
			 }
		 }
		return false;
	}
	
	/**
	 * 
	 * 读数据库获取开关值
	 * @param typeCode
	 * @param typeKey
	 * @param service
	 * 
	 * @author iBuilder
	 * @return
	 */
	public static CmcStaticData getObjByCodeKey(String typeCode, String typeKey, CmcStaticDataService service) {
		CmcStaticData rtnObj = null;
		if (StringUtils.isNotBlank(typeCode) && StringUtils.isNotBlank(typeKey)) {
			List<CmcStaticData> listData = service.staticDataCachData(typeCode, typeKey);
			if (listData != null && listData.size() > 0) {
				return listData.get(0);
			}
		}

		return rtnObj;
	}

}
