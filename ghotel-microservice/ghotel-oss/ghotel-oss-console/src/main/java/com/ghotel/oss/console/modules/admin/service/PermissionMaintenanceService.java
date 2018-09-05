package com.ghotel.oss.console.modules.admin.service;

import java.util.List;

import com.ghotel.oss.console.core.common.service.ICommonPaginationService;
import com.ghotel.oss.console.core.security.bean.PermissionInfoBean;
import com.ghotel.oss.console.core.security.bean.ResourceInfoBean;
import com.ghotel.oss.console.core.security.bean.RoleInfoBean;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.admin.bean.PermissionSearchCriteriaBean;
import com.ghotel.oss.console.modules.admin.bean.PermissionWithResourceDetailBean;

public interface PermissionMaintenanceService extends ICommonPaginationService<PermissionInfoBean> {

	public List<RoleInfoBean> getRoles();

	public List<ResourceInfoBean> getBindingResources(String permissionId) throws Exception;

	public boolean removeBindingResource(PermissionWithResourceDetailBean bean) throws Exception;

	public boolean addBindingResource(PermissionWithResourceDetailBean bean) throws Exception;

	public String add(PermissionWithResourceDetailBean object) throws Exception;

	public PaginationResult<PermissionInfoBean> getPermissionByPagination(PermissionSearchCriteriaBean bean)
			throws Exception;

}
