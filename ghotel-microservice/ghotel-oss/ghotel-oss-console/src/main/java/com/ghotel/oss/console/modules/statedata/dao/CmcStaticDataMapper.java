package com.ghotel.oss.console.modules.statedata.dao;

import com.ghotel.oss.console.core.common.dao.IPaginationDao;

import java.util.List;
import java.util.Map;


public interface CmcStaticDataMapper extends IPaginationDao {
    public int deleteObject(Object o);

	public List getStaticData(Map o);

    List getByTypeKey(Object object);
}