package com.ghotel.oss.console.modules.admin.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import com.ghotel.oss.console.core.common.service.AbstractCommonServiceWrapper;
import com.ghotel.oss.console.core.logging.annotation.GocLogAnnotation;
import com.ghotel.oss.console.core.security.bean.GroupInfoBean;
import com.ghotel.oss.console.core.security.bean.RoleInfoBean;
import com.ghotel.oss.console.core.security.bean.UserInfoBean;
import com.ghotel.oss.console.core.security.dao.GroupInfoRepository;
import com.ghotel.oss.console.core.security.dao.RoleInfoRepository;
import com.ghotel.oss.console.core.security.dao.UserInfoRepository;
import com.ghotel.oss.console.modules.admin.bean.GroupBindingBean;
import com.ghotel.oss.console.modules.admin.bean.GroupNRoleBindingBean;
import com.ghotel.oss.console.modules.admin.bean.GroupNUserBindingBean;
import com.ghotel.oss.console.modules.admin.service.GroupMaintenanceService;
import com.ghotel.oss.console.modules.admin.util.AdminModuleConstant;

@GocLogAnnotation(moduleId = "Group")
@Service
public class GocGroupMaintenanceServiceImpl extends AbstractCommonServiceWrapper<GroupInfoBean>
		implements GroupMaintenanceService {

	@Autowired
	UserInfoRepository userInfoRepository;

	@Autowired
	GroupInfoRepository groupInfoRepository;

	@Autowired
	RoleInfoRepository roleInfoRepository;

	/**
	 * ids 格式 1,2,3
	 */
	@Override
	@GocLogAnnotation(description = "删除用户组与角色绑定")
	public int removeBindingRole(GroupNRoleBindingBean value) {
		return groupInfoRepository.findById(value.getGroupId()).map(group -> {
			List<RoleInfoBean> newRoleList = new ArrayList<RoleInfoBean>();
			for (RoleInfoBean role : group.getRoles()) {
				if (!role.getId().equals(value.getRoleId())) {
					newRoleList.add(role);
				}
			}
			group.setRoles(newRoleList);
			groupInfoRepository.save(group);
			return 1;
		}).orElse(0);
	}

	/**
	 * ids 格式 1,2,3
	 */
	@Override
	@GocLogAnnotation(description = "删除用户组与用户绑定")
	public int removeBindingUser(GroupNUserBindingBean value) {
		return userInfoRepository.findById(value.getUserId()).map(user -> {
			List<GroupInfoBean> newGroupList = new ArrayList<GroupInfoBean>();
			for (GroupInfoBean group : user.getGroups()) {
				if (!group.getId().equals(value.getGroupId())) {
					newGroupList.add(group);
				}
			}
			user.setGroups(newGroupList);
			userInfoRepository.save(user);
			return 1;
		}).orElse(0);
	}

	@Override
	public GroupBindingBean getBindings(String groupId) {
		return groupInfoRepository.findById(groupId).map(group -> {
			GroupBindingBean result = new GroupBindingBean();
			result.setGroupId(group.getId());
			result.setBindingRoles(group.getRoles());
			result.setBindingUsers(getBindingUser(group));
			return result;
		}).orElse(new GroupBindingBean());
	}

	private List<UserInfoBean> getBindingUser(GroupInfoBean group) {
		return Optional.ofNullable(userInfoRepository.findByGroups(group)).map(userList -> {
			for (UserInfoBean user : userList) {
				// decode(status,'A','未启用','B','正常','C','关闭',null) as STATUS

				if (AdminModuleConstant.USER_STATUS_NEW.equals(user.getStatus())) {
					user.setStatus("未启用");
				} else if (AdminModuleConstant.USER_STATUS_NORMAL.equals(user.getStatus())) {
					user.setStatus("正常");
				} else {
					user.setStatus("未关闭");
				}
			}
			return userList;
		}).orElse(new ArrayList<UserInfoBean>());
	}

	@Override
	public GroupBindingBean getBindingUser(String groupId) {

		return groupInfoRepository.findById(groupId).map(group -> {
			GroupBindingBean result = new GroupBindingBean();
			result.setGroupId(group.getId());
			result.setBindingUsers(getBindingUser(group));
			return result;
		}).orElse(new GroupBindingBean());
	}

	@Override
	@GocLogAnnotation(description = "绑定用户组与角色")
	public int addBindingRole(final GroupNRoleBindingBean value) {
		return groupInfoRepository.findById(value.getGroupId()).map(group -> {
			boolean needAdd = true;
			String roleId = value.getRoleId();
			for (RoleInfoBean role : group.getRoles()) {
				if (role.getId().equals(roleId)) {
					needAdd = false;
					break;
				}
			}
			if (needAdd) {
				roleInfoRepository.findById(roleId).ifPresent(role -> {
					group.getRoles().add(role);
					groupInfoRepository.save(group);
				});
				return 1;
			}
			return 0;
		}).orElse(0);

	}

	@Override
	@GocLogAnnotation(description = "绑定用户组与用户")
	public int addBindingUser(GroupNUserBindingBean value) {
		return userInfoRepository.findById(value.getUserId()).map(user -> {
			boolean needAdd = true;
			String groupId = value.getGroupId();
			for (GroupInfoBean group : user.getGroups()) {
				if (group.getId().equals(groupId)) {
					needAdd = false;
					break;
				}
			}
			if (needAdd) {
				groupInfoRepository.findById(groupId).ifPresent(group -> {
					user.getGroups().add(group);
					userInfoRepository.save(user);
				});
				return 1;
			}
			return 0;
		}).orElse(0);
	}

	@Override
	public List<RoleInfoBean> getRoles() {
		return roleInfoRepository.findByParentIdIsNullOrParentId("0");
	}

	// @Override
	// public List<GroupInfoBean> getGroupsByGroupType(List<String> groupTypes)
	// throws Exception {
	// return Optional.ofNullable(groupTypes).filter(gt -> {
	// return gt != null && !gt.isEmpty();
	// }).map(gts -> groupInfoRepository.findByGroupTypeIn(gts)).orElse(new
	// ArrayList<GroupInfoBean>());
	// }

	@Override
	public List<GroupInfoBean> getParentGroupsInfo(String id) {
		return userInfoRepository.findById(id).map(user -> {
			List<GroupInfoBean> result = new ArrayList<GroupInfoBean>();
			List<GroupInfoBean> groups = user.getGroups();
			for (GroupInfoBean group : groups) {
				if (AdminModuleConstant.USER_GROUP_CATEGORY_OP.equals(group.getGroupType())) {
					result.add(group);
				}
			}
			return result;
		}).orElse(new ArrayList<GroupInfoBean>());

	}

	@Override
	protected MongoRepository<GroupInfoBean, String> getRepository() {
		return groupInfoRepository;
	}

	@Override
	public void updateGroupInfo(GroupInfoBean groupInfoBean) {
		groupInfoRepository.findById(groupInfoBean.getId()).ifPresent(group -> {
			groupInfoBean.setRoles(group.getRoles());
			groupInfoRepository.save(groupInfoBean);
		});
	}

}
