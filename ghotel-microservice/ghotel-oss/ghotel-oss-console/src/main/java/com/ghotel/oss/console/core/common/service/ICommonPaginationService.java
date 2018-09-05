package com.ghotel.oss.console.core.common.service;

import com.ghotel.oss.console.core.common.bean.PaginationBean;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;

public interface ICommonPaginationService<T> extends ICommonService<T> {

	public PaginationResult<T> getPaginationAll(PaginationBean paginationBean) throws Exception;

}
