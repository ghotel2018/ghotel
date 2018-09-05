package com.ghotel.oss.console.modules.admin.dao;

import java.util.List;

import com.ghotel.oss.console.core.common.dao.IPaginationDao;

public interface CmcPermissionMaintenanceMapper extends IPaginationDao {

	public int removeBindingResource(Object obj);
	
	public int addBindingResource(Object obj);
	
	public List<?> getBindingResources(int permissionId);
	
	public List<?> getResourceByPagination(Object object);
	
	public int countAllResource(Object object);
	
	public List getAllModule();
	
	public int selectNextId();
	
	public int deleteRoleBinding(int permissionId);
}
