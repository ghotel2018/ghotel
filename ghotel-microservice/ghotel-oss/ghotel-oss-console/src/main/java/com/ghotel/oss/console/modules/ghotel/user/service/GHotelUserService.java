package com.ghotel.oss.console.modules.ghotel.user.service;

import com.ghotel.model.po.user.User;
import com.ghotel.oss.console.core.common.service.ICommonPaginationService;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.ghotel.user.beam.GHotelUserSearchCriteriaBean;

public interface GHotelUserService extends ICommonPaginationService<User> {

	public PaginationResult<User> getPaginationResult(GHotelUserSearchCriteriaBean bean) throws Exception;

	public PaginationResult<User> getUnbindUser(GHotelUserSearchCriteriaBean bean) throws Exception;

}
