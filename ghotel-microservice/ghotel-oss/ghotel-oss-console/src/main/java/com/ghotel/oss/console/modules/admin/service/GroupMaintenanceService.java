package com.ghotel.oss.console.modules.admin.service;

import java.util.List;

import com.ghotel.oss.console.core.common.service.ICommonService;
import com.ghotel.oss.console.core.security.bean.GroupInfoBean;
import com.ghotel.oss.console.core.security.bean.RoleInfoBean;
import com.ghotel.oss.console.modules.admin.bean.GroupBindingBean;
import com.ghotel.oss.console.modules.admin.bean.GroupNRoleBindingBean;
import com.ghotel.oss.console.modules.admin.bean.GroupNUserBindingBean;

public interface GroupMaintenanceService extends ICommonService<GroupInfoBean> {

	public int removeBindingRole(GroupNRoleBindingBean value);

	public int removeBindingUser(GroupNUserBindingBean value);

	public int addBindingRole(GroupNRoleBindingBean value);

	public int addBindingUser(GroupNUserBindingBean value);

	public GroupBindingBean getBindings(String id);

	public GroupBindingBean getBindingUser(String id);

	public List<RoleInfoBean> getRoles();

	public List<GroupInfoBean> getParentGroupsInfo(String id);

	// public List<GroupInfoBean> getGroupsByGroupType(List<String> groupTypes)
	// throws Exception;

}
