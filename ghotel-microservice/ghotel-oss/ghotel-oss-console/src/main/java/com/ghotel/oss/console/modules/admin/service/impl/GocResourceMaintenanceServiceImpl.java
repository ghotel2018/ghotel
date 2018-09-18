package com.ghotel.oss.console.modules.admin.service.impl;

import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import com.ghotel.oss.console.core.common.service.AbstractPaginationCommonServiceWrapper;
import com.ghotel.oss.console.core.logging.annotation.GocLogAnnotation;
import com.ghotel.oss.console.core.security.bean.MenuConfigInfoBean;
import com.ghotel.oss.console.core.security.bean.MenuConfigSearchCriteriaBean;
import com.ghotel.oss.console.core.security.bean.ResourceInfoBean;
import com.ghotel.oss.console.core.security.dao.MenuConfigRepository;
import com.ghotel.oss.console.core.security.dao.ModuleInfoRepository;
import com.ghotel.oss.console.core.security.dao.PermissionInfoRepository;
import com.ghotel.oss.console.core.security.dao.ResourceInfoRepository;
import com.ghotel.oss.console.core.constants.RequestStatusConstant;
import com.ghotel.oss.console.modules.admin.bean.ModuleInfoBean;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.admin.bean.ResourceSearchCriteriaBean;
import com.ghotel.oss.console.modules.admin.service.ResourceMaintenanceService;

@GocLogAnnotation(moduleId = "Resource")
@Service
public class GocResourceMaintenanceServiceImpl extends AbstractPaginationCommonServiceWrapper<ResourceInfoBean>
		implements ResourceMaintenanceService {
	@Autowired
	ResourceInfoRepository resourceInfoRepository;
	@Autowired
	ModuleInfoRepository moduleInfoRepository;
	@Autowired
	PermissionInfoRepository permissionInfoRepository;
	@Autowired
	MenuConfigRepository menuConfigRepository;

	@Override
	public List<ModuleInfoBean> getAllModule() {
		return moduleInfoRepository.findAll();
	}

	@GocLogAnnotation(description = "删除")
	public int delete(ResourceInfoBean resource) throws Exception {

		int count = permissionInfoRepository.findByRelateResource(resource).size();
		if (count == 0) {
			return super.delete(resource);
		}
		return RequestStatusConstant.STATUS_CODE_CONSTRAINT_EXISTS;
	}

	// TODO how about the resourceList is null?
	@Override
	@GocLogAnnotation(description = "添加模块")
	public boolean addModule(ModuleInfoBean bean) {
		moduleInfoRepository.save(bean);
		return true;
	}

	@Override
	@GocLogAnnotation(description = "添加菜单")
	public boolean addMenuConfig(MenuConfigSearchCriteriaBean bean) throws Exception {
		MenuConfigInfoBean menu = new MenuConfigInfoBean();
		BeanUtils.populate(menu, BeanUtils.describe(bean));
		if (StringUtils.isNotBlank(bean.getResourceId())) {
			resourceInfoRepository.findById(bean.getResourceId()).ifPresent(resource -> {
				menu.setResource(resource);
			});
		}
		MenuConfigInfoBean savedMenu = menuConfigRepository.save(menu);
		if (StringUtils.isNotBlank(menu.getParentId())) {
			menuConfigRepository.findById(menu.getParentId()).ifPresent(pm -> {
				pm.getChildren().add(savedMenu);
				menuConfigRepository.save(pm);
			});
		}
		return true;
	}

	@Override
	@GocLogAnnotation(description = "更新菜单")
	public boolean updateMenuConfig(MenuConfigSearchCriteriaBean bean) throws Exception {
		MenuConfigInfoBean menu = new MenuConfigInfoBean();
		BeanUtils.populate(menu, BeanUtils.describe(bean));
		if (StringUtils.isNotBlank(bean.getResourceId())) {
			resourceInfoRepository.findById(bean.getResourceId()).ifPresent(resource -> {
				menu.setResource(resource);
			});
		}
		MenuConfigInfoBean savedMenu = menuConfigRepository.save(menu);
		if (StringUtils.isNotBlank(menu.getParentId())) {
			menuConfigRepository.findById(menu.getParentId()).ifPresent(pm -> {
				List<MenuConfigInfoBean> list = pm.getChildren();
				boolean isExist = false;
				for (MenuConfigInfoBean m : list) {
					if (m.getId().equals(savedMenu.getId())) {
						isExist = true;
						break;
					}
				}
				if (!isExist) {
					pm.getChildren().add(savedMenu);
					menuConfigRepository.save(pm);
				}
			});
		}
		return true;
	}

	@Override
	@GocLogAnnotation(description = "删除菜单")
	public boolean deleteMenuConfig(MenuConfigInfoBean menu) {
		menuConfigRepository.findById(menu.getId()).ifPresent(m -> {
			if (m.getParentId() != null) {
				menuConfigRepository.findById(m.getParentId()).ifPresent(pm -> {
					List<MenuConfigInfoBean> list = pm.getChildren();
					boolean isExist = false;
					int i = 0;
					for (MenuConfigInfoBean cm : list) {
						if (cm.getId().equals(menu.getId())) {
							isExist = true;
							break;
						}
						i++;
					}
					if (isExist) {
						pm.getChildren().remove(i);
						menuConfigRepository.save(pm);
					}
				});
			}
			menuConfigRepository.delete(menu);
		});
		return true;
	}

	@Override
	public List<MenuConfigInfoBean> getAllMenuConfig() {
		return menuConfigRepository.findByParentIdIsNull();
	}

	@Override
	// @CmcLogginAnnotation(description="更新菜单排序")
	public boolean updateMenuOrder(List<MenuConfigInfoBean> menuList) {
		for (MenuConfigInfoBean menu : menuList) {
			menuConfigRepository.save(menu);
		}
		return true;
	}

	@Override
	protected MongoRepository<ResourceInfoBean, String> getRepository() {
		return resourceInfoRepository;
	}

	@Override
	public PaginationResult<ResourceInfoBean> getResourceByPagination(
			ResourceSearchCriteriaBean resourceSearchCriteriaBean) throws Exception {

		return super.getPaginationResult(ResourceInfoBean.class, resourceSearchCriteriaBean);
	}

}
