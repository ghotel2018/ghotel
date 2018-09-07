package com.ghotel.oss.console.core.security.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.shiro.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.ghotel.oss.console.core.logging.annotation.GocLogAnnotation;
import com.ghotel.oss.console.core.security.bean.GroupInfoBean;
import com.ghotel.oss.console.core.security.bean.MenuConfigInfoBean;
import com.ghotel.oss.console.core.security.bean.PageConfigBean;
import com.ghotel.oss.console.core.security.bean.PermissionInfoBean;
import com.ghotel.oss.console.core.security.bean.ResourceInfoBean;
import com.ghotel.oss.console.core.security.bean.RoleInfoBean;
import com.ghotel.oss.console.core.security.bean.UserInfoBean;
import com.ghotel.oss.console.core.security.dao.MenuConfigRepository;
import com.ghotel.oss.console.core.security.dao.PermissionInfoRepository;
import com.ghotel.oss.console.core.security.dao.ResourceInfoRepository;
import com.ghotel.oss.console.core.security.dao.UserInfoRepository;
import com.ghotel.oss.console.core.security.service.SecurityService;
import com.ghotel.oss.console.core.utils.GocUserUtils;
import com.ghotel.oss.console.core.utils.StringUtil;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.admin.util.AdminModuleConstant;
import com.ghotel.oss.console.modules.dictionary.bean.DictionaryDetailBean;
import com.ghotel.oss.console.modules.dictionary.bean.DictionaryTypeBean;
import com.ghotel.oss.console.modules.dictionary.bean.DictionaryTypeSearchCriteriaBean;
import com.ghotel.oss.console.modules.dictionary.service.DictionaryTypeService;
import com.ghotel.oss.console.modules.statedata.service.CmcStaticDataService;

/**
 * Seq Date Who Remark 1 07/06/2017 iBuilder SSO1.0切换SSO2.0验证接口 2 08/05/2018
 * iBuilder 添加用户登录信息
 * 
 */
// TODO need to tune
@Service
@GocLogAnnotation(description = "用户授权与认证管理")
public class SecurityServiceImpl implements SecurityService {

	@Autowired
	UserInfoRepository userInfoRepository;
	@Autowired
	PermissionInfoRepository permissionInfoRepository;
	@Autowired
	ResourceInfoRepository resourceInfoRepository;
	@Autowired
	MenuConfigRepository menuConfigRepository;

	@Autowired
	private DictionaryTypeService dictionaryTypeService;
	// @Autowired
	// private DictionaryDetailService dictionaryDetailService;

	private static final Logger log = LoggerFactory.getLogger(SecurityServiceImpl.class);

	@Autowired
	@Qualifier(value = "cmcStaticDataService")
	private CmcStaticDataService cmcStaticDataService;
	// @Autowired
	// @Qualifier("NoticeService")
	// NoticeService noticeService;

	@Override
	public List<RoleInfoBean> getRoleByUserId(String userId) {
		List<RoleInfoBean> result = new ArrayList<RoleInfoBean>();

		userInfoRepository.findById(userId).ifPresent(user -> {
			List<GroupInfoBean> groupList = user.getGroups();
			// if (groupList != null) {
			for (GroupInfoBean group : groupList) {
				result.addAll(group.getRoles());
			}
			// }
		});
		return result;
	}

	@Override
	public List<PermissionInfoBean> getPermissionByUserId(String userId, String module) {
		List<PermissionInfoBean> result = new ArrayList<PermissionInfoBean>();
		for (PermissionInfoBean permission : getPermissionByUserId(userId)) {
			if (permission.getPermissionExp().contains(module)) {
				result.add(permission);
			}
		}
		return result;
	}

	@Override
	public List<PermissionInfoBean> getPermissionByUserId(String userId) {
		List<PermissionInfoBean> result = new ArrayList<PermissionInfoBean>();
		List<RoleInfoBean> roleList = getRoleByUserId(userId);
		for (RoleInfoBean role : roleList) {
			result.addAll(role.getPermissions());
		}
		return result;
	}

	public List<PermissionInfoBean> getPermissionByResourceTypes(String[] resTypes) {
		List<ResourceInfoBean> rl = resourceInfoRepository.findByResourceTypeIn(resTypes);
		List<String> resIds = new ArrayList<>();
		for (ResourceInfoBean bean : rl) {
			resIds.add(bean.getId());
		}

		return permissionInfoRepository.findByRelateResource_IdIn(resIds.toArray(new String[resIds.size()]));
	}

	@Override
	public List<PermissionInfoBean> getItAdminPermission() {
		return getPermissionByResourceTypes(new String[] { AdminModuleConstant.USER_GROUP_CATEGORY_IT });
	}

	@Override
	public List<PermissionInfoBean> getBaAdminPermission() {
		return getPermissionByResourceTypes(new String[] { AdminModuleConstant.USER_GROUP_CATEGORY_BA });
	}

	@Override
	public List<PermissionInfoBean> getItAndBaAdminPermission() {

		return getPermissionByResourceTypes(new String[] { AdminModuleConstant.USER_GROUP_CATEGORY_IT,
				AdminModuleConstant.USER_GROUP_CATEGORY_BA });
	}

	@Override
	public UserInfoBean getUserByUserId(String userId) {
		if (StringUtil.isNullOrBlank(userId)) {
			return null;
		}
		return userInfoRepository.findById(userId).map(u -> {
			return u;
		}).orElse(null);
	}

	@Override
	public PageConfigBean getMenuConfig(UserInfoBean user, String module) throws Exception {
		PageConfigBean config = new PageConfigBean();
		//  可访问资源列表
		List<ResourceInfoBean> menuResourceList = new ArrayList<>();
		// TODO
		// if (user.getUserId().equals("0")) {

		// CmcStaticData rtnObj =
		// StaticDataUtil.getObjByCodeKey(CmcConstants.SSOStaticData.SSO_VERSION_TYPE_CODE,
		// CmcConstants.SSOStaticData.SSO_VERSION_TYPE_KEY, cmcStaticDataService);
		// String strValue = "";
		// String strStatus = "";
		// if (rtnObj != null) {
		// strValue = rtnObj.getValue();
		// strStatus = rtnObj.getStatus();
		// }
		if (GocUserUtils.isAdminUser(user)) {
			user.setUserName("超级管理员");
			// 管理员获取所有权限
			config.setPageElementPerms(getItAndBaAdminPermission());

			menuResourceList = resourceInfoRepository.findByCategoryInAndResourceTypeIn(new String[] { "menu", "all" },
					new String[] { AdminModuleConstant.USER_GROUP_CATEGORY_IT,
							AdminModuleConstant.USER_GROUP_CATEGORY_BA });

		} else {
			List<PermissionInfoBean> perms = getPermissionByUserId(user.getUserId(), module);
			config.setPageElementPerms(perms);
			// 将用户名下权限相关的资源添加入列表中
			for (PermissionInfoBean perm : perms) {
				menuResourceList.addAll(perm.getRelateResource());
			}

		}

		config.setMenuResoucre(menuResourceList);
		List<MenuConfigInfoBean> allMenuConfigs = menuConfigRepository.findByParentIdIsNull();
		List<MenuConfigInfoBean> authorizedMenuConfig = removeUnauthorizedMenu(allMenuConfigs, menuResourceList);
		config.setMenuConfig(authorizedMenuConfig);

		config.setUser(user);
		config.setDictionaryList(getDictionaryList(module));
		return config;
	}

	private List<Map<String, Object>> getDictionaryList(String module) throws Exception {
		DictionaryTypeSearchCriteriaBean bean = new DictionaryTypeSearchCriteriaBean();
		bean.setNum(100);
		bean.setTypeKey(module + ":_");// 冒号有用 不要删掉 如果只使用下划线 则like内下划线表示任意单一字符 需要转义 冒号配合escape 具体百度escape
		PaginationResult<DictionaryTypeBean> pr = dictionaryTypeService.getPaginationAll(bean);
		List<Map<String, Object>> dictionaryList = new ArrayList<Map<String, Object>>();
		Map<String, Object> innerMap = null;
		for (Object t : pr.getList()) {
			DictionaryTypeBean tp = (DictionaryTypeBean) t;
			innerMap = new HashMap<String, Object>();
			innerMap.put("type", t);
			List<DictionaryDetailBean> details = new ArrayList<DictionaryDetailBean>();
			DictionaryDetailBean d = new DictionaryDetailBean();
			d.setDetailName("");
			d.setDetailValue("");
			details.add(d);
			details.addAll(tp.getDetails());
			innerMap.put("detail", details);
			dictionaryList.add(innerMap);
		}
		return dictionaryList;
	}

	private List<MenuConfigInfoBean> removeUnauthorizedMenu(List<MenuConfigInfoBean> allMenuConfigs,
			List<ResourceInfoBean> oldMenuResourceList) {
		List<MenuConfigInfoBean> result = new ArrayList<>();
		for (MenuConfigInfoBean menuConfig : allMenuConfigs) {
			if (menuConfig.getResource() != null) {
				String permissionExp = menuConfig.getResource().getModule() + ":"
						+ menuConfig.getResource().getActionCode();
				if (SecurityUtils.getSubject().isPermitted(permissionExp)) {
					result.add(menuConfig);
					log.info("add {} to user's menu", menuConfig);
				}
			} else {
				if (!menuConfig.getChildren().isEmpty()) {
					List<MenuConfigInfoBean> children = removeUnauthorizedMenu(menuConfig.getChildren(),
							oldMenuResourceList);
					if (!children.isEmpty()) {// 子菜单可用时把该菜单加进结果集中
						menuConfig.setChildren(children);
						result.add(menuConfig);
					}
				}
			}
		}
		return result;
	}

	@Override
	@GocLogAnnotation(description = "更新用户信息")
	public boolean updateUserInfo(UserInfoBean bean) {
		userInfoRepository.save(bean);
		return true;
	}

	// @Override
	// // @CmcLogginAnnotation(description="重置密码")
	// public boolean resetPwd(Map map) {
	// cmcAuthAndAuthDao.resetPwd(map);
	// return true;
	// }
	// TODO
	@Override
	public boolean insertLoginInfo(String username, String ipAddr, boolean blnLoginSuccess, String loginFailMsg) {
		// Map<String, Object> noticeMap = new HashMap<String, Object>();
		//
		// noticeMap.put("noticeId", UUID.randomUUID().toString().replaceAll("-", ""));
		// if (blnLoginSuccess) {
		// noticeMap.put("noticeSubject", "用户【" + username + "】从" + ipAddr +
		// "成功登录了系统。");
		// noticeMap.put("noticeContent", "用户【" + username + "】从" + ipAddr +
		// "成功登录了系统。");
		// } else {
		// noticeMap.put("noticeSubject", "用户【" + username + "】从" + ipAddr + "登录失败：" +
		// loginFailMsg);
		// noticeMap.put("noticeContent", "用户【" + username + "】从" + ipAddr + "登录失败：" +
		// loginFailMsg);
		// }
		//
		// noticeMap.put("noticeType", "op");
		// noticeMap.put("noticeHotInd", "Y");
		// noticeMap.put("noticeReceiver", username);
		// noticeMap.put("moduleId", "Authentication");
		// return noticeService.addNotice(noticeMap);
		return true;
	}

	@Override
	public boolean resetPassword(UserInfoBean cacheUser, String oldPw) {
		return userInfoRepository.findById(cacheUser.getUserId()).map(user -> {
			if (user.getPassword().equals(oldPw)) {
				updateUserInfo(cacheUser);
				return true;
			} else {
				return false;
			}
		}).orElse(false);
	}

}
