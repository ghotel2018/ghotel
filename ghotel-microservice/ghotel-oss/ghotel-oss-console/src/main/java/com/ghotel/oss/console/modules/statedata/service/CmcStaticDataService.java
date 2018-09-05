package com.ghotel.oss.console.modules.statedata.service;

import java.util.List;

import com.ghotel.oss.console.core.common.service.ICommonPaginationService;
import com.ghotel.oss.console.modules.statedata.bean.CmcStaticData;

public interface CmcStaticDataService extends ICommonPaginationService{
	public void deleteObject(Object o);

	public List staticDataCachData(String typeCode,String typeKey);


	public void updateObject(CmcStaticData bean);
	
	public void expireCodeKey(String typeCode,String typeKey) ;
	
	public void expireAll() ;
	
}

