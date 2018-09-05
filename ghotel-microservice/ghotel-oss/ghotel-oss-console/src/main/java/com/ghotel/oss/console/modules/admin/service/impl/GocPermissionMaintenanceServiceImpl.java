package com.ghotel.oss.console.modules.admin.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import com.ghotel.oss.console.core.common.service.AbstractPaginationCommonServiceWrapper;
import com.ghotel.oss.console.core.logging.annotation.GocLogAnnotation;
import com.ghotel.oss.console.core.security.bean.PermissionInfoBean;
import com.ghotel.oss.console.core.security.bean.ResourceInfoBean;
import com.ghotel.oss.console.core.security.bean.RoleInfoBean;
import com.ghotel.oss.console.core.security.dao.PermissionInfoRepository;
import com.ghotel.oss.console.core.security.dao.ResourceInfoRepository;
import com.ghotel.oss.console.core.security.dao.RoleInfoRepository;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.admin.bean.PermissionSearchCriteriaBean;
import com.ghotel.oss.console.modules.admin.bean.PermissionWithResourceDetailBean;
import com.ghotel.oss.console.modules.admin.service.PermissionMaintenanceService;
import com.ghotel.oss.console.modules.admin.util.AdminModuleConstant;

@GocLogAnnotation(moduleId = "Permission")
@Service
public class GocPermissionMaintenanceServiceImpl extends AbstractPaginationCommonServiceWrapper<PermissionInfoBean>
		implements PermissionMaintenanceService {

	@Autowired
	PermissionInfoRepository permissionInfoRepository;
	@Autowired
	RoleInfoRepository roleInfoRepository;
	@Autowired
	ResourceInfoRepository resourceInfoRepository;

	@Override
	public List<RoleInfoBean> getRoles() {
		return roleInfoRepository.findAll();
	}

	@Override
	@GocLogAnnotation(description = "新增")
	public String add(PermissionWithResourceDetailBean object) throws Exception {
		return resourceInfoRepository.findById(object.getResourceId()).map(resource -> {
			PermissionInfoBean bean = new PermissionInfoBean();
			bean.setPermissionDesc(object.getPermissionDesc());
			bean.setPermissionExp(object.getPermissionExp());
			List<ResourceInfoBean> resourceList = new ArrayList<ResourceInfoBean>();
			resourceList.add(resource);
			return permissionInfoRepository.save(bean).getId();
		}).orElse(null);
	}

	@Override
	public List<ResourceInfoBean> getBindingResources(String permissionId) {
		// decode(RESOURCE_ACCESS_CATEGORY ,'menu','菜单','all','所有权限','uri','功能',null) as
		// RESOURCE_ACCESS_CATEGORY,
		// decode(RESOURCE_TYPE,'IT','技术支持后台','BA','业务管理后台','OP','功能管理','') as
		// RESOURCE_TYPE,

		return permissionInfoRepository.findById(permissionId).map(permission -> {
			List<ResourceInfoBean> resources = permission.getRelateResource();
			for (ResourceInfoBean resource : resources) {
				if ("menu".equals(resource.getCategory())) {
					resource.setCategory("菜单");
				} else if ("all".equals(resource.getCategory())) {
					resource.setCategory("所有权限");
				} else if ("uri".equals(resource.getCategory())) {
					resource.setCategory("功能");
				}

				if (AdminModuleConstant.USER_GROUP_CATEGORY_IT.equals(resource.getResourceType())) {
					resource.setResourceType("技术支持后台");
				} else if (AdminModuleConstant.USER_GROUP_CATEGORY_BA.equals(resource.getResourceType())) {
					resource.setResourceType("业务管理后台");
				} else if (AdminModuleConstant.USER_GROUP_CATEGORY_OP.equals(resource.getResourceType())) {
					resource.setResourceType("功能管理");
				}
			}
			return resources;
		}).orElse(new ArrayList<ResourceInfoBean>());
	}

	@Override
	@GocLogAnnotation(description = "删除绑定的资源")
	public boolean removeBindingResource(PermissionWithResourceDetailBean bean) throws Exception {
		return permissionInfoRepository.findById(bean.getId()).map(permission -> {
			List<ResourceInfoBean> newResourceList = new ArrayList<ResourceInfoBean>();
			for (ResourceInfoBean resource : permission.getRelateResource()) {
				if (!bean.getResourceId().equals(resource.getId())) {
					newResourceList.add(resource);
				}
				permission.setRelateResource(newResourceList);

				permissionInfoRepository.save(permission);
			}
			return true;
		}).orElse(false);
	}

	@Override
	@GocLogAnnotation(description = "绑定资源")
	public boolean addBindingResource(PermissionWithResourceDetailBean bean) throws Exception {
		return permissionInfoRepository.findById(bean.getId()).map(permission -> {
			return resourceInfoRepository.findById(bean.getResourceId()).map(resource -> {
				permission.getRelateResource().add(resource);
				permissionInfoRepository.save(permission);
				return true;
			}).orElse(false);
		}).orElse(false);
	}

	// @CmcLogginAnnotation(description = "删除")
	// public int delete(PermissionInfoBean object) throws Exception {
	// int super.delete(object);
	// }

	@Override
	protected MongoRepository<PermissionInfoBean, String> getRepository() {
		return permissionInfoRepository;
	}

	@Override
	public PaginationResult<PermissionInfoBean> getPermissionByPagination(PermissionSearchCriteriaBean bean)
			throws Exception {
		PermissionInfoBean p = parseSearchObjToEnity(bean, PermissionInfoBean.class);
		p.setRelateResource(null);
		ExampleMatcher matcher = ExampleMatcher.matching().withIgnoreCase().withStringMatcher(StringMatcher.CONTAINING)
				.withIgnoreNullValues();
		return super.getPaginationResult(Example.of(p, matcher), bean);
	}
}
