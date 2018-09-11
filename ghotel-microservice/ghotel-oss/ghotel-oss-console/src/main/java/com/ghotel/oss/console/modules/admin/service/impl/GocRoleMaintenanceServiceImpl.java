package com.ghotel.oss.console.modules.admin.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import com.ghotel.oss.console.core.common.service.AbstractCommonServiceWrapper;
import com.ghotel.oss.console.core.logging.annotation.GocLogAnnotation;
import com.ghotel.oss.console.core.security.bean.PermissionInfoBean;
import com.ghotel.oss.console.core.security.bean.RoleInfoBean;
import com.ghotel.oss.console.core.security.dao.PermissionInfoRepository;
import com.ghotel.oss.console.core.security.dao.RoleInfoRepository;
import com.ghotel.oss.console.modules.admin.bean.RoleNPermissionBean;
import com.ghotel.oss.console.modules.admin.service.roleMaintenanceService;

@GocLogAnnotation(moduleId = "Role")
@Service
public class GocRoleMaintenanceServiceImpl extends AbstractCommonServiceWrapper<RoleInfoBean>
		implements roleMaintenanceService {

	@Autowired
	RoleInfoRepository roleinfoRepository;
	@Autowired
	PermissionInfoRepository permissionInfoRepository;

	@Override
	public boolean addBindingPermission(RoleNPermissionBean bean) {
		return permissionInfoRepository.findById(bean.getPermissionId()).map(permission -> {
			return roleinfoRepository.findById(bean.getRoleId()).map(role -> {
				role.getPermissions().add(permission);
				roleinfoRepository.save(role);
				return true;
			}).orElse(false);
		}).orElse(false);
	}

	@Override
	public boolean removeBindingPermission(RoleNPermissionBean bean) {
		return roleinfoRepository.findById(bean.getRoleId()).map(role -> {
			List<PermissionInfoBean> newPermissionList = new ArrayList<PermissionInfoBean>();
			for (PermissionInfoBean permission : role.getPermissions()) {
				if (!bean.getPermissionId().equals(permission.getId())) {
					newPermissionList.add(permission);
				}

				role.setPermissions(newPermissionList);
				roleinfoRepository.save(role);
			}
			return true;
		}).orElse(false);
	}

	@Override
	public List<PermissionInfoBean> getBindingPermission(String roleId) {
		return roleinfoRepository.findById(roleId).map(role -> {
			return role.getPermissions();
		}).orElse(new ArrayList<PermissionInfoBean>());
	}

	// @CmcLogginAnnotation(description = "删除")
	// public int delete(Object object) throws Exception {
	// RoleInfoBean role = (RoleInfoBean) object;
	// mapper.deleteGroupBinding(role.getId());
	// super.delete(object);
	// return 0;
	// }

	@Override
	protected MongoRepository<RoleInfoBean, String> getRepository() {
		return roleinfoRepository;
	}

	@Override
	public void updateResource(RoleInfoBean bean) {
		roleinfoRepository.findById(bean.getId()).ifPresent(role -> {
			bean.setPermissions(role.getPermissions());
			roleinfoRepository.save(bean);
		});
	}

}
