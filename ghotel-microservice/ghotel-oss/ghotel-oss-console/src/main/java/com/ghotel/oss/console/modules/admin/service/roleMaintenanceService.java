package com.ghotel.oss.console.modules.admin.service;

import java.util.List;

import com.ghotel.oss.console.core.common.service.ICommonService;
import com.ghotel.oss.console.core.security.bean.PermissionInfoBean;
import com.ghotel.oss.console.core.security.bean.RoleInfoBean;
import com.ghotel.oss.console.modules.admin.bean.RoleNPermissionBean;

public interface roleMaintenanceService extends ICommonService<RoleInfoBean> {

	public boolean addBindingPermission(RoleNPermissionBean bean);

	public boolean removeBindingPermission(RoleNPermissionBean bean);

	public List<PermissionInfoBean> getBindingPermission(String roleId);

	public void updateResource(RoleInfoBean bean);

}
