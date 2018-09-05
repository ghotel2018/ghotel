package com.ghotel.oss.console.core.security;

import java.util.ArrayList;
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
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.ghotel.oss.console.core.security.bean.GroupInfoBean;
import com.ghotel.oss.console.core.security.bean.PermissionInfoBean;
import com.ghotel.oss.console.core.security.bean.RoleInfoBean;
import com.ghotel.oss.console.core.security.dao.PermissionInfoRepository;
import com.ghotel.oss.console.core.security.dao.UserInfoRepository;
import com.ghotel.oss.console.core.security.service.SecurityService;

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
			} else {
				permissionList = securityService.getPermissionByUserId(user.getUserId());
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
		// return authorizationInfo;
		// authorizationInfo.setRoles(userService.findRoles(username));
		// authorizationInfo.setStringPermissions(userService.findPermissions(username));
		// return authorizationInfo;
		//
		// String currentUsername = (String) super.getAvailablePrincipal(principals);
		// // //为当前用户设置角色和权限
		// SimpleAuthorizationInfo simpleAuthorInfo = null;
		// UserInfoBean user = userInfoRepository.findFirstByUserName(currentUsername);
		//
		// boolean flag = false;
		//
		// if ("root".equals(currentUsername)) {// admin user
		// flag = true;
		// }
		//
		// // 实际中可能会像上面注释的那样从数据库取得
		// if (null != currentUsername && flag) {
		// // 添加一个角色,不是配置意义上的添加,而是证明该用户拥有admin角色
		// simpleAuthorInfo = new SimpleAuthorizationInfo();
		// // RESOURCE_TYPE = 'IT' or RESOURCE_TYPE = 'BA'
		// List<PermissionInfoBean> list =
		// ListUtils.union(securityService.getItAdminPermission(),
		// securityService.getBaAdminPermission());
		// for (PermissionInfoBean p : list) {
		// simpleAuthorInfo.addStringPermission(p.getPermissionExp());
		// }
		// return simpleAuthorInfo;
		// }
		// if (null != currentUsername) {
		// simpleAuthorInfo = new SimpleAuthorizationInfo();
		// List<GroupInfoBean> groupList = user.getGroups();
		// List<PermissionInfoBean> permissionList = new
		// ArrayList<PermissionInfoBean>();
		//
		// for (GroupInfoBean group : groupList) {
		// for (RoleInfoBean role : group.getRoles()) {
		// simpleAuthorInfo.addRole(role.getRoleName());
		// permissionList = ListUtils.union(permissionList, role.getPermissions());
		// }
		// }
		// for (PermissionInfoBean p : permissionList) {
		// simpleAuthorInfo.addStringPermission(p.getPermissionExp());
		// }
		// return simpleAuthorInfo;
		// }
		// //
		// 若该方法什么都不做直接返回null的话,就会导致任何用户访问/admin/listUser.jsp时都会自动跳转到unauthorizedUrl指定的地址
		// // 详见applicationContext.xml中的<bean id="shiroFilter">的配置
		// return null;
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
			if (user.getPassword().equals(new String(token.getPassword()))) {
				return new SimpleAuthenticationInfo(token.getUsername(), new String(token.getPassword()),
						this.getName());
			} else {
				throw new IncorrectCredentialsException("你输入的密码不正确！");
			}
		}).orElseThrow(() -> new UnknownAccountException("您输入的的账号不存在"));
		// AuthenticationInfo authcInfo = new
		// SimpleAuthenticationInfo(token.getUsername(),
		// new String(token.getPassword()), this.getName());
		//
		// String strAdministrator_id = "";
		// boolean blnSameUserName = false;
		//
		// strAdministrator_id = "admin";
		//
		// if (strAdministrator_id.equals(token.getUsername())) {
		// blnSameUserName = true;
		// }
		// try {
		// if (user == null) {
		// Check IF BA supper admin login
		// if (null != strAdministrator_id && blnSameUserName) {
		// if ("password".equals(new String(token.getPassword()))) {
		// }
		// return authcInfo;
		// }
		// throw new UnknownAccountException("您输入的的账号不存在");
		// } else {
		// if ((user.getPassword() != null
		// && !user.getPassword().equals(MD5.getMd5(new String(token.getPassword()))))
		// || (user.getPassword() == null
		// && !user.getInitPassword().equals(new String(token.getPassword())))) {
		// throw new IncorrectCredentialsException("你输入的密码不正确！");
		// } else {
		// return authcInfo;
		// }
		// }
		// } catch (AuthenticationException e) {
		// throw new AuthenticationException(e.getMessage());
		// }

		// 没有返回登录用户名对应的SimpleAuthenticationInfo对象时,就会在LoginController中抛出UnknownAccountException异常
	}

	/**
	 * 将一些数据放到ShiroSession中,以便于其它地方使用
	 * 
	 * @see 比如Controller,使用时直接用HttpSession.getAttribute(key)就可以取到
	 */
	private void setSession(Object key, Object value) {
		Subject currentUser = SecurityUtils.getSubject();
		if (null != currentUser) {
			Session session = currentUser.getSession();
			if (null != session) {
				session.setAttribute(key, value);
			}
		}
	}

	public void clearCached() {
		PrincipalCollection principals = SecurityUtils.getSubject().getPrincipals();
		super.clearCache(principals);
	}
}