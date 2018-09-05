package com.ghotel.oss.console.modules.admin.service.impl;

import com.ghotel.oss.console.core.common.service.AbstractPaginationCommonServiceWrapper;
import com.ghotel.oss.console.core.logging.annotation.GocLogAnnotation;
import com.ghotel.oss.console.core.security.bean.MenuConfigInfoBean;
import com.ghotel.oss.console.core.security.bean.ResourceInfoBean;
import com.ghotel.oss.console.core.security.dao.MenuConfigRepository;
import com.ghotel.oss.console.core.security.dao.ModuleInfoRepository;
import com.ghotel.oss.console.core.security.dao.PermissionInfoRepository;
import com.ghotel.oss.console.core.security.dao.ResourceInfoRepository;
import com.ghotel.oss.console.core.utils.RequestStatusConstant;
import com.ghotel.oss.console.modules.admin.bean.ModuleInfoBean;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.admin.bean.ResourceSearchCriteriaBean;
import com.ghotel.oss.console.modules.admin.service.ResourceMaintenanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@GocLogAnnotation(moduleId = "Resource")
@Service
public class GoResourceMaintenanceServiceImpl extends AbstractPaginationCommonServiceWrapper<ResourceInfoBean>
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
    public boolean addMenuConfig(MenuConfigInfoBean menu) {
        menuConfigRepository.save(menu);
        return true;
    }

    @Override
    @GocLogAnnotation(description = "更新菜单")
    public boolean updateMenuConfig(MenuConfigInfoBean menu) {
        menuConfigRepository.save(menu);
        return true;
    }

    @Override
    @GocLogAnnotation(description = "删除菜单")
    public boolean deleteMenuConfig(MenuConfigInfoBean menu) {
        menuConfigRepository.delete(menu);
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
