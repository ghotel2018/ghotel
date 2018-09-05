package com.ghotel.oss.console.modules.admin.service;

import java.util.List;

import com.ghotel.oss.console.core.common.service.ICommonPaginationService;
import com.ghotel.oss.console.core.security.bean.GroupInfoBean;
import com.ghotel.oss.console.core.security.bean.UserInfoBean;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.admin.bean.UserSearchCriteriaBean;

public interface UserMaintenanceService extends ICommonPaginationService<UserInfoBean> {

	public List<GroupInfoBean> getCurrenUserRelateGroup(UserInfoBean user);

	public PaginationResult<UserInfoBean> getUserByPagination(UserSearchCriteriaBean value) throws Exception;

}
