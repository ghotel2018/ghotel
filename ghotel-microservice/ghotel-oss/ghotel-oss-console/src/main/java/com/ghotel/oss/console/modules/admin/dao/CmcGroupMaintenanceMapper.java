package com.ghotel.oss.console.modules.admin.dao;

import java.util.List;

import com.ghotel.oss.console.core.common.dao.ICommonDao;

public interface CmcGroupMaintenanceMapper extends ICommonDao {

	public int removeBindingRole(Object obj);
	
	public int removeBindingUser(Object obj);
	
	public List getBindingUsers(int id);

	public List getBindingRoles(int id);
	
	public int addBindingRole(Object obj);
	
	public int addBindingUser(Object obj);
	
	public List<?> getUserByPagination(Object obj);
	
	public int countUser(Object obj);
	
	public List<?> getRoles();
	/**
	 * 
	* @Title: getGroupByUserId
	* @Description: 查询用户对应的Group
	* @author zhangyp 
	* @param @return  
	* @return List<?>    返回类型
	* @throws
	 */
	public List<?> getGroupByUserId(Object obj);
	
	//根据用户ID获取功能直接上上一级的父类信息
	public List getParentGroupInfo(Object obj);
	
	//根据用户ID获取功能直接上上一级的父类信息
	public List getUserParentGroupId(Object id); 
	
		
}
