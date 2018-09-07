package com.ghotel.oss.console.modules.admin.service;

import java.util.List;

import com.ghotel.oss.console.core.common.service.ICommonPaginationService;
import com.ghotel.oss.console.core.security.bean.MenuConfigInfoBean;
import com.ghotel.oss.console.core.security.bean.MenuConfigSearchCriteriaBean;
import com.ghotel.oss.console.core.security.bean.ResourceInfoBean;
import com.ghotel.oss.console.modules.admin.bean.ModuleInfoBean;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.admin.bean.ResourceSearchCriteriaBean;

public interface ResourceMaintenanceService extends ICommonPaginationService<ResourceInfoBean> {

	public List<ModuleInfoBean> getAllModule();

	public boolean addModule(ModuleInfoBean bean);

	public boolean addMenuConfig(MenuConfigSearchCriteriaBean bean) throws Exception;

	public boolean updateMenuConfig(MenuConfigSearchCriteriaBean bean) throws Exception;

	public boolean deleteMenuConfig(MenuConfigInfoBean menu);

	public List<MenuConfigInfoBean> getAllMenuConfig();

	public boolean updateMenuOrder(List<MenuConfigInfoBean> menuList);

	public PaginationResult<ResourceInfoBean> getResourceByPagination(
			ResourceSearchCriteriaBean resourceSearchCriteriaBean) throws Exception;

}
