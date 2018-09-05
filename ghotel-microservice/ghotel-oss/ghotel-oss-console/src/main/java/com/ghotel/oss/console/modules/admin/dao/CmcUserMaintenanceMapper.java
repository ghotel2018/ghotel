package com.ghotel.oss.console.modules.admin.dao;

import java.util.List;
import java.util.Map;

import com.ghotel.oss.console.core.common.dao.IPaginationDao;

public interface CmcUserMaintenanceMapper extends IPaginationDao {

	public int deleteGroupBinding(int userId);

	public List<Map> getUserList(List userId);
	
}
