package com.ghotel.oss.console.core.security;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.ghotel.oss.console.core.security.bean.GroupInfoBean;
import com.ghotel.oss.console.core.security.bean.PermissionInfoBean;
import com.ghotel.oss.console.core.security.bean.RoleInfoBean;
import com.ghotel.oss.console.core.security.dao.PermissionInfoRepository;
import com.ghotel.oss.console.core.security.dao.UserInfoRepository;
import com.ghotel.oss.console.core.security.service.SecurityService;
import com.ghotel.oss.console.modules.admin.util.AdminModuleConstant;

public class GocAuthorizingRealm extends AuthorizingRealm {

	@Autowired
	UserInfoRepository userInfoRepository;
	@Autowired
	PermissionInfoRepository permissionInfoRepository;
	@Autowired
	SecurityService securityService;

	private static final Logger log = LoggerFactory.getLogger(GocAuthorizingRealm.class);

	/**
	 * 获取用户权限的方法
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		String username = (String) principals.getPrimaryPrincipal();
		SimpleAuthorizationInfo simpleAuthorInfo = new SimpleAuthorizationInfo();
		userInfoRepository.findFirstByUserLoginId(username).ifPresent(user -> {
			List<GroupInfoBean> groupList = user.getGroups();
			List<PermissionInfoBean> permissionList = new ArrayList<PermissionInfoBean>();

			if (user.getIsAdmin()) {
				permissionList = securityService.getItAndBaAdminPermission();
				user.setGroupType(String.join(",", AdminModuleConstant.USER_GROUP_CATEGORY_IT,
						AdminModuleConstant.USER_GROUP_CATEGORY_BA, AdminModuleConstant.USER_GROUP_CATEGORY_OP));
			} else {
				permissionList = securityService.getPermissionByUserId(user.getUserId());
				List<String> groupTypes = new ArrayList<>();
				for (GroupInfoBean group : groupList) {
					groupTypes.add(group.getGroupType());
				}
				user.setGroupType(String.join(",", groupTypes));
			}

			for (GroupInfoBean group : groupList) {
				for (RoleInfoBean role : group.getRoles()) {
					simpleAuthorInfo.addRole(role.getRoleName());
				}
			}
			Map<String, String> map = new HashMap<>();
			for (PermissionInfoBean p : permissionList) {
				String[] expArr = p.getPermissionExp().split(":");
				if (map.containsKey(expArr[0])) {// 对重复的权限进行合并，默认为覆盖
					String exp = map.get(expArr[0]);
					map.put(expArr[0], exp + "," + expArr[1]);
				} else {
					map.put(expArr[0], expArr[1]);
				}

				simpleAuthorInfo.addStringPermission(expArr[0] + ":" + map.get(expArr[0]));
			}
		});
		return simpleAuthorInfo;
	}

	/**
	 * 验证当前登录的Subject,校验用户登录信息
	 * 
	 * @see 经测试:本例中该方法的调用时机为LoginController.login()方法中执行Subject.login()时
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken)
			throws AuthenticationException {
		UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
		return userInfoRepository.findFirstByUserLoginId(token.getUsername()).map(user -> {
			String password = user.getPassword();
			boolean firstLogin = false;
			if (password == null) {
				password = user.getInitPassword();
				firstLogin = true;
			}
			if (password.equals(new String(token.getPassword()))) {
				if (firstLogin) {
					user.setPassword(password);
					user.setStatus(AdminModuleConstant.USER_STATUS_NORMAL);
				}
				user.setLastLoginTime(new Date());
				userInfoRepository.save(user);
				return new SimpleAuthenticationInfo(token.getUsername(), new String(token.getPassword()),
						this.getName());
			} else {
				log.info("{} login failed with wrong password!", token);
				throw new IncorrectCredentialsException("你输入的密码不正确！");
			}
		}).orElseThrow(() -> new UnknownAccountException("您输入的的账号不存在"));
	}

	public void clearCached() {
		PrincipalCollection principals = SecurityUtils.getSubject().getPrincipals();
		super.clearCache(principals);
	}
}