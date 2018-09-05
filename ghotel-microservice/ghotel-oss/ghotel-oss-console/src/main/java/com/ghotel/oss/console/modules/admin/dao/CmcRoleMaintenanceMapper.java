package com.ghotel.oss.console.modules.admin.dao;

import java.util.List;

import com.ghotel.oss.console.core.common.dao.ICommonDao;
import com.ghotel.oss.console.modules.admin.bean.PermissionSearchCriteriaBean;
import com.ghotel.oss.console.modules.admin.bean.RoleNPermissionBean;

public interface CmcRoleMaintenanceMapper extends ICommonDao {

	public int addBindingPermission(RoleNPermissionBean bean );

	public int removeBindingPermission(RoleNPermissionBean bean);
	
	public List getBindingPermission(int roleId);
	
	public List getPermissionByPagination(PermissionSearchCriteriaBean bean );
	
	public int countPermission(PermissionSearchCriteriaBean bean );
	
	public int deleteGroupBinding(int roleId);
}
