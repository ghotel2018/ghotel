package com.ghotel.oss.console.modules.admin.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.apache.commons.collections.IteratorUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import com.ghotel.oss.console.core.common.bean.PaginationBean;
import com.ghotel.oss.console.core.common.service.AbstractPaginationCommonServiceWrapper;
import com.ghotel.oss.console.core.logging.annotation.GocLogAnnotation;
import com.ghotel.oss.console.core.security.bean.GroupInfoBean;
import com.ghotel.oss.console.core.security.bean.UserInfoBean;
import com.ghotel.oss.console.core.security.dao.GroupInfoRepository;
import com.ghotel.oss.console.core.security.dao.UserInfoRepository;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.admin.bean.UserSearchCriteriaBean;
import com.ghotel.oss.console.modules.admin.service.UserMaintenanceService;
import com.ghotel.oss.console.modules.admin.util.AdminModuleConstant;

@GocLogAnnotation(moduleId = "User")
@Service
public class GocUserMaintenanceServiceImpl extends AbstractPaginationCommonServiceWrapper<UserInfoBean>
		implements UserMaintenanceService {

	@Autowired
	UserInfoRepository userInfoRepository;
	@Autowired
	GroupInfoRepository groupInfoRepository;

	@GocLogAnnotation(description = "新增")
	public UserInfoBean add(UserInfoBean bean) throws Exception {
//		if (bean.getUserType() != null && AdminModuleConstant.USER_TYPE_LOCAL.equals(bean.getUserType())) {
		bean.setResetPwdInd(AdminModuleConstant.RESET_PWD_IND_REQUIRED); // 要求重置密码
		bean.setInitPassword(UUID.randomUUID().toString().split("-")[0]);// 赋值初始化密码
//		}
		return super.add(bean);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<GroupInfoBean> getCurrenUserRelateGroup(UserInfoBean user) {
		List<GroupInfoBean> result = new ArrayList<>();
		if (user.getIsAdmin()) {
			result = groupInfoRepository.findAll();
		} else {
			List<GroupInfoBean> groupList = user.getGroups();
			if (!groupList.isEmpty()) {
				Collection<String> groupIds = new ArrayList<>();
				for (GroupInfoBean group : groupList) {
					groupIds.add(group.getId());
				}
				result = IteratorUtils.toList(groupInfoRepository.findAllById(groupIds).iterator());
			}
		}
		return result;
	}

	@Override
	public PaginationResult<UserInfoBean> getPaginationResult(PaginationBean paginationBean) throws Exception {
		UserSearchCriteriaBean bean = (UserSearchCriteriaBean) paginationBean;
		UserInfoBean user = parseSearchObjToEnity(bean, UserInfoBean.class);
		List<GroupInfoBean> groups = null;

		if (StringUtils.isNotBlank(bean.getGroupId())) {
			groups = groupInfoRepository.findById(bean.getGroupId()).map(group -> {
				List<GroupInfoBean> result = new ArrayList<>();
				result.add(group);
				return result;
			}).orElse(null);
		}
		user.setGroups(groups);
		return super.getPaginationResult(Example.of(user, getDefaultExampleMatcher()), bean);
	}

	// @CmcLogginAnnotation(description = "删除")
	// public int delete(UserInfoBean bean) throws Exception {
	// super.delete(object);
	// return 0;
	// }

	@Override
	protected MongoRepository<UserInfoBean, String> getRepository() {
		return userInfoRepository;
	}

	@Override
	public PaginationResult<UserInfoBean> getUserByPagination(UserSearchCriteriaBean value) throws Exception {
		UserInfoBean queryParams = parseSearchObjToEnity(value, UserInfoBean.class);
		ExampleMatcher matcher = ExampleMatcher.matching().withIgnoreCase().withStringMatcher(StringMatcher.CONTAINING)
				.withIgnoreNullValues();
		Example<UserInfoBean> example = Example.of(queryParams, matcher);
		return super.getPaginationResult(example, value);
	}

}
