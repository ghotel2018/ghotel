package com.ghotel.oss.console.core;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;

import com.ghotel.oss.console.core.security.bean.GroupInfoBean;
import com.ghotel.oss.console.core.security.bean.MenuConfigInfoBean;
import com.ghotel.oss.console.core.security.bean.PermissionInfoBean;
import com.ghotel.oss.console.core.security.bean.ResourceInfoBean;
import com.ghotel.oss.console.core.security.bean.RoleInfoBean;
import com.ghotel.oss.console.core.security.bean.UserInfoBean;
import com.ghotel.oss.console.core.security.dao.GroupInfoRepository;
import com.ghotel.oss.console.core.security.dao.MenuConfigRepository;
import com.ghotel.oss.console.core.security.dao.ModuleInfoRepository;
import com.ghotel.oss.console.core.security.dao.PermissionInfoRepository;
import com.ghotel.oss.console.core.security.dao.ResourceInfoRepository;
import com.ghotel.oss.console.core.security.dao.RoleInfoRepository;
import com.ghotel.oss.console.core.security.dao.UserInfoRepository;
import com.ghotel.oss.console.modules.admin.bean.ModuleInfoBean;

@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan(basePackages = "com.ghotel.oss")
public class InitDataApplication {
	public static void main(String[] args) {
		ApplicationContext ac = SpringApplication.run(InitDataApplication.class, args);
		UserInfoRepository userInfoRepository = ac.getBean(UserInfoRepository.class);
		GroupInfoRepository groupInfoRepository = ac.getBean(GroupInfoRepository.class);
		RoleInfoRepository roleInfoRepository = ac.getBean(RoleInfoRepository.class);
		PermissionInfoRepository permissionInfoRepository = ac.getBean(PermissionInfoRepository.class);
		ResourceInfoRepository resourceInfoRepository = ac.getBean(ResourceInfoRepository.class);
		ModuleInfoRepository moduleInfoRepository = ac.getBean(ModuleInfoRepository.class);
		MenuConfigRepository menuConfigRepository = ac.getBean(MenuConfigRepository.class);

		UserInfoBean user = new UserInfoBean();
		user.setUserLoginId("admin");
		user.setUserName("管理员");
		user.setPassword("1");
		user.setIsAdmin(true);
		userInfoRepository.save(user);

		groupInfoRepository.saveAll(initGroups());
		roleInfoRepository.saveAll(initRoles());
		permissionInfoRepository.saveAll(initPerms());
		resourceInfoRepository.saveAll(initResources());
		moduleInfoRepository.saveAll(initModule());
		menuConfigRepository.saveAll(initMenu(resourceInfoRepository));

		initGroupAndRole(ac);
		initPermAndRole(ac);
		initPermsAndRes(ac);
		initParentMenu(ac);

	}

	/**
	 * .*values \((\d+),(\d+)\); r = roleInfoRepository\.findById\("\1"\)\.get\(\);p
	 * = permissionInfoRepository\.findById\("\2"\)\.get\(\); rl = new
	 * ArrayList<PermissionInfoBean>\(\);rl\.add\(p\);r\.setPermissions\(rl\);roleInfoRepository\.save\(r\);\R
	 * 
	 * @param ac
	 */
	private static void initPermAndRole(ApplicationContext ac) {
		RoleInfoRepository roleInfoRepository = ac.getBean(RoleInfoRepository.class);
		PermissionInfoRepository permissionInfoRepository = ac.getBean(PermissionInfoRepository.class);

		RoleInfoBean r = roleInfoRepository.findById("1").get();
		PermissionInfoBean p = permissionInfoRepository.findById("13").get();
		List<PermissionInfoBean> rl = new ArrayList<PermissionInfoBean>();
		rl.add(p);
		r.setPermissions(rl);
		roleInfoRepository.save(r);

		r = roleInfoRepository.findById("2").get();
		p = permissionInfoRepository.findById("16").get();
		rl = new ArrayList<PermissionInfoBean>();
		rl.add(p);
		r.setPermissions(rl);
		roleInfoRepository.save(r);

		r = roleInfoRepository.findById("3").get();
		p = permissionInfoRepository.findById("17").get();
		rl = new ArrayList<PermissionInfoBean>();
		rl.add(p);
		r.setPermissions(rl);
		roleInfoRepository.save(r);

		r = roleInfoRepository.findById("4").get();
		p = permissionInfoRepository.findById("14").get();
		rl = new ArrayList<PermissionInfoBean>();
		rl.add(p);
		r.setPermissions(rl);
		roleInfoRepository.save(r);

		r = roleInfoRepository.findById("5").get();
		p = permissionInfoRepository.findById("15").get();
		rl = new ArrayList<PermissionInfoBean>();
		rl.add(p);
		r.setPermissions(rl);
		roleInfoRepository.save(r);

		r = roleInfoRepository.findById("6").get();
		p = permissionInfoRepository.findById("8").get();
		rl = new ArrayList<PermissionInfoBean>();
		rl.add(p);
		r.setPermissions(rl);
		roleInfoRepository.save(r);

		r = roleInfoRepository.findById("7").get();
		p = permissionInfoRepository.findById("7").get();
		rl = new ArrayList<PermissionInfoBean>();
		rl.add(p);
		r.setPermissions(rl);
		roleInfoRepository.save(r);

		r = roleInfoRepository.findById("8").get();
		p = permissionInfoRepository.findById("11").get();
		rl = new ArrayList<PermissionInfoBean>();
		rl.add(p);
		r.setPermissions(rl);
		roleInfoRepository.save(r);

		r = roleInfoRepository.findById("9").get();
		p = permissionInfoRepository.findById("10").get();
		rl = new ArrayList<PermissionInfoBean>();
		rl.add(p);
		r.setPermissions(rl);
		roleInfoRepository.save(r);

		r = roleInfoRepository.findById("10").get();
		p = permissionInfoRepository.findById("9").get();
		rl = new ArrayList<PermissionInfoBean>();
		rl.add(p);
		r.setPermissions(rl);
		roleInfoRepository.save(r);

		r = roleInfoRepository.findById("11").get();
		p = permissionInfoRepository.findById("12").get();
		rl = new ArrayList<PermissionInfoBean>();
		rl.add(p);
		r.setPermissions(rl);
		roleInfoRepository.save(r);

		r = roleInfoRepository.findById("12").get();
		p = permissionInfoRepository.findById("23").get();
		rl = new ArrayList<PermissionInfoBean>();
		rl.add(p);
		r.setPermissions(rl);
		roleInfoRepository.save(r);

	}

	/**
	 * .*values \((\d+),(\d+)\); r = roleInfoRepository\.findById\("\2"\)\.get\(\);g
	 * = groupInfoRepository\.findById\("\1"\)\.get\(\); rl = new
	 * ArrayList<RoleInfoBean>\(\);rl\.add\(r\);g\.setRoles\(rl\);groupInfoRepository\.save\(g\);\R
	 * 
	 * @param ac
	 */
	private static void initGroupAndRole(ApplicationContext ac) {
		GroupInfoRepository groupInfoRepository = ac.getBean(GroupInfoRepository.class);
		RoleInfoRepository roleInfoRepository = ac.getBean(RoleInfoRepository.class);

		RoleInfoBean r = roleInfoRepository.findById("2").get();
		GroupInfoBean g = groupInfoRepository.findById("3").get();
		List<RoleInfoBean> rl = new ArrayList<RoleInfoBean>();
		rl.add(r);
		g.setRoles(rl);
		groupInfoRepository.save(g);

		r = roleInfoRepository.findById("1").get();
		g = groupInfoRepository.findById("3").get();
		rl = new ArrayList<RoleInfoBean>();
		rl.add(r);
		g.setRoles(rl);
		groupInfoRepository.save(g);

		r = roleInfoRepository.findById("3").get();
		g = groupInfoRepository.findById("3").get();
		rl = new ArrayList<RoleInfoBean>();
		rl.add(r);
		g.setRoles(rl);
		groupInfoRepository.save(g);

		r = roleInfoRepository.findById("4").get();
		g = groupInfoRepository.findById("3").get();
		rl = new ArrayList<RoleInfoBean>();
		rl.add(r);
		g.setRoles(rl);
		groupInfoRepository.save(g);

		r = roleInfoRepository.findById("5").get();
		g = groupInfoRepository.findById("3").get();
		rl = new ArrayList<RoleInfoBean>();
		rl.add(r);
		g.setRoles(rl);
		groupInfoRepository.save(g);

		r = roleInfoRepository.findById("6").get();
		g = groupInfoRepository.findById("2").get();
		rl = new ArrayList<RoleInfoBean>();
		rl.add(r);
		g.setRoles(rl);
		groupInfoRepository.save(g);

		r = roleInfoRepository.findById("7").get();
		g = groupInfoRepository.findById("2").get();
		rl = new ArrayList<RoleInfoBean>();
		rl.add(r);
		g.setRoles(rl);
		groupInfoRepository.save(g);

		r = roleInfoRepository.findById("8").get();
		g = groupInfoRepository.findById("1").get();
		rl = new ArrayList<RoleInfoBean>();
		rl.add(r);
		g.setRoles(rl);
		groupInfoRepository.save(g);

		r = roleInfoRepository.findById("9").get();
		g = groupInfoRepository.findById("1").get();
		rl = new ArrayList<RoleInfoBean>();
		rl.add(r);
		g.setRoles(rl);
		groupInfoRepository.save(g);

		r = roleInfoRepository.findById("10").get();
		g = groupInfoRepository.findById("1").get();
		rl = new ArrayList<RoleInfoBean>();
		rl.add(r);
		g.setRoles(rl);
		groupInfoRepository.save(g);

		r = roleInfoRepository.findById("11").get();
		g = groupInfoRepository.findById("1").get();
		rl = new ArrayList<RoleInfoBean>();
		rl.add(r);
		g.setRoles(rl);
		groupInfoRepository.save(g);

		r = roleInfoRepository.findById("7").get();
		g = groupInfoRepository.findById("5").get();
		rl = new ArrayList<RoleInfoBean>();
		rl.add(r);
		g.setRoles(rl);
		groupInfoRepository.save(g);

		r = roleInfoRepository.findById("6").get();
		g = groupInfoRepository.findById("4").get();
		rl = new ArrayList<RoleInfoBean>();
		rl.add(r);
		g.setRoles(rl);
		groupInfoRepository.save(g);

		r = roleInfoRepository.findById("12").get();
		g = groupInfoRepository.findById("6").get();
		rl = new ArrayList<RoleInfoBean>();
		rl.add(r);
		g.setRoles(rl);
		groupInfoRepository.save(g);

	}

	/**
	 * .*values \((\d+),(\d+)\); p =
	 * permissionInfoRepository\.findById\("\1"\)\.get\(\); r =
	 * resourceInfoRepository\.findById\("\2"\)\.get\(\); rl = new
	 * ArrayList<ResourceInfoBean>\(\);rl\.add\(r\);p\.setRelateResource\(rl\);permissionInfoRepository\.save\(p\);\R
	 * 
	 * @param ac
	 */
	private static void initPermsAndRes(ApplicationContext ac) {
		PermissionInfoRepository permissionInfoRepository = ac.getBean(PermissionInfoRepository.class);
		ResourceInfoRepository resourceInfoRepository = ac.getBean(ResourceInfoRepository.class);

		PermissionInfoBean p = permissionInfoRepository.findById("1").get();
		ResourceInfoBean r = resourceInfoRepository.findById("29").get();
		List<ResourceInfoBean> rl = new ArrayList<ResourceInfoBean>();
		rl.add(r);
		p.setRelateResource(rl);
		permissionInfoRepository.save(p);

		p = permissionInfoRepository.findById("2").get();
		r = resourceInfoRepository.findById("25").get();
		rl = new ArrayList<ResourceInfoBean>();
		rl.add(r);
		p.setRelateResource(rl);
		permissionInfoRepository.save(p);

		p = permissionInfoRepository.findById("3").get();
		r = resourceInfoRepository.findById("34").get();
		rl = new ArrayList<ResourceInfoBean>();
		rl.add(r);
		p.setRelateResource(rl);
		permissionInfoRepository.save(p);

		p = permissionInfoRepository.findById("4").get();
		r = resourceInfoRepository.findById("33").get();
		rl = new ArrayList<ResourceInfoBean>();
		rl.add(r);
		p.setRelateResource(rl);
		permissionInfoRepository.save(p);

		p = permissionInfoRepository.findById("5").get();
		r = resourceInfoRepository.findById("30").get();
		rl = new ArrayList<ResourceInfoBean>();
		rl.add(r);
		p.setRelateResource(rl);
		permissionInfoRepository.save(p);

		p = permissionInfoRepository.findById("6").get();
		r = resourceInfoRepository.findById("37").get();
		rl = new ArrayList<ResourceInfoBean>();
		rl.add(r);
		p.setRelateResource(rl);
		permissionInfoRepository.save(p);

		p = permissionInfoRepository.findById("18").get();
		r = resourceInfoRepository.findById("3").get();
		rl = new ArrayList<ResourceInfoBean>();
		rl.add(r);
		p.setRelateResource(rl);
		permissionInfoRepository.save(p);

		p = permissionInfoRepository.findById("19").get();
		r = resourceInfoRepository.findById("5").get();
		rl = new ArrayList<ResourceInfoBean>();
		rl.add(r);
		p.setRelateResource(rl);
		permissionInfoRepository.save(p);

		p = permissionInfoRepository.findById("20").get();
		r = resourceInfoRepository.findById("13").get();
		rl = new ArrayList<ResourceInfoBean>();
		rl.add(r);
		p.setRelateResource(rl);
		permissionInfoRepository.save(p);

		p = permissionInfoRepository.findById("21").get();
		r = resourceInfoRepository.findById("16").get();
		rl = new ArrayList<ResourceInfoBean>();
		rl.add(r);
		p.setRelateResource(rl);
		permissionInfoRepository.save(p);

		p = permissionInfoRepository.findById("22").get();
		r = resourceInfoRepository.findById("20").get();
		rl = new ArrayList<ResourceInfoBean>();
		rl.add(r);
		p.setRelateResource(rl);
		permissionInfoRepository.save(p);

		p = permissionInfoRepository.findById("7").get();
		r = resourceInfoRepository.findById("28").get();
		rl = new ArrayList<ResourceInfoBean>();
		rl.add(r);
		p.setRelateResource(rl);
		permissionInfoRepository.save(p);

		p = permissionInfoRepository.findById("8").get();
		r = resourceInfoRepository.findById("24").get();
		rl = new ArrayList<ResourceInfoBean>();
		rl.add(r);
		p.setRelateResource(rl);
		permissionInfoRepository.save(p);

		p = permissionInfoRepository.findById("9").get();
		r = resourceInfoRepository.findById("35").get();
		rl = new ArrayList<ResourceInfoBean>();
		rl.add(r);
		p.setRelateResource(rl);
		permissionInfoRepository.save(p);

		p = permissionInfoRepository.findById("10").get();
		r = resourceInfoRepository.findById("32").get();
		rl = new ArrayList<ResourceInfoBean>();
		rl.add(r);
		p.setRelateResource(rl);
		permissionInfoRepository.save(p);

		p = permissionInfoRepository.findById("11").get();
		r = resourceInfoRepository.findById("31").get();
		rl = new ArrayList<ResourceInfoBean>();
		rl.add(r);
		p.setRelateResource(rl);
		permissionInfoRepository.save(p);

		p = permissionInfoRepository.findById("12").get();
		r = resourceInfoRepository.findById("36").get();
		rl = new ArrayList<ResourceInfoBean>();
		rl.add(r);
		p.setRelateResource(rl);
		permissionInfoRepository.save(p);

		p = permissionInfoRepository.findById("13").get();
		r = resourceInfoRepository.findById("1").get();
		rl = new ArrayList<ResourceInfoBean>();
		rl.add(r);
		p.setRelateResource(rl);
		permissionInfoRepository.save(p);

		p = permissionInfoRepository.findById("14").get();
		r = resourceInfoRepository.findById("4").get();
		rl = new ArrayList<ResourceInfoBean>();
		rl.add(r);
		p.setRelateResource(rl);
		permissionInfoRepository.save(p);

		p = permissionInfoRepository.findById("15").get();
		r = resourceInfoRepository.findById("12").get();
		rl = new ArrayList<ResourceInfoBean>();
		rl.add(r);
		p.setRelateResource(rl);
		permissionInfoRepository.save(p);

		p = permissionInfoRepository.findById("16").get();
		r = resourceInfoRepository.findById("17").get();
		rl = new ArrayList<ResourceInfoBean>();
		rl.add(r);
		p.setRelateResource(rl);
		permissionInfoRepository.save(p);

		p = permissionInfoRepository.findById("17").get();
		r = resourceInfoRepository.findById("21").get();
		rl = new ArrayList<ResourceInfoBean>();
		rl.add(r);
		p.setRelateResource(rl);
		permissionInfoRepository.save(p);

		p = permissionInfoRepository.findById("23").get();
		r = resourceInfoRepository.findById("25").get();
		rl = new ArrayList<ResourceInfoBean>();
		rl.add(r);
		p.setRelateResource(rl);
		permissionInfoRepository.save(p);

		p = permissionInfoRepository.findById("23").get();
		r = resourceInfoRepository.findById("26").get();
		rl = new ArrayList<ResourceInfoBean>();
		rl.add(r);
		p.setRelateResource(rl);
		permissionInfoRepository.save(p);

		p = permissionInfoRepository.findById("23").get();
		r = resourceInfoRepository.findById("27").get();
		rl = new ArrayList<ResourceInfoBean>();
		rl.add(r);
		p.setRelateResource(rl);
		permissionInfoRepository.save(p);

	}

	private static void initParentMenu(ApplicationContext ac) {
		MenuConfigRepository menuConfigRepository = ac.getBean(MenuConfigRepository.class);
		MenuConfigInfoBean pm;
		MenuConfigInfoBean m;

		// pm = menuConfigRepository.findById("0").get();
		// pm.getChildren().add(menuConfigRepository.findById("1").get());
		// pm.getChildren().add(menuConfigRepository.findById("2").get());
		// menuConfigRepository.save(pm);

		// m = menuConfigRepository.findById("1").get();
		// m.setParentId("0");
		// menuConfigRepository.save(m);
		// m = menuConfigRepository.findById("2").get();
		// m.setParentId("0");
		// menuConfigRepository.save(m);
		// TODO
		pm = menuConfigRepository.findById("2").get();
		pm.getChildren().add(menuConfigRepository.findById("250").get());
		menuConfigRepository.save(pm);

		m = menuConfigRepository.findById("250").get();
		m.setParentId("2");
		menuConfigRepository.save(m);

		pm = menuConfigRepository.findById("500").get();
		pm.getChildren().add(menuConfigRepository.findById("510").get());
		menuConfigRepository.save(pm);

		m = menuConfigRepository.findById("510").get();
		m.setParentId("500");
		menuConfigRepository.save(m);

		pm = menuConfigRepository.findById("1").get();
		pm.getChildren().add(menuConfigRepository.findById("500").get());
		pm.getChildren().add(menuConfigRepository.findById("520").get());
		pm.getChildren().add(menuConfigRepository.findById("400").get());
		menuConfigRepository.save(pm);

		m = menuConfigRepository.findById("500").get();
		m.setParentId("1");
		menuConfigRepository.save(m);
		m = menuConfigRepository.findById("520").get();
		m.setParentId("1");
		menuConfigRepository.save(m);
		m = menuConfigRepository.findById("400").get();
		m.setParentId("1");
		menuConfigRepository.save(m);

		pm = menuConfigRepository.findById("520").get();
		pm.getChildren().add(menuConfigRepository.findById("590").get());
		pm.getChildren().add(menuConfigRepository.findById("600").get());
		menuConfigRepository.save(pm);

		m = menuConfigRepository.findById("590").get();
		m.setParentId("520");
		menuConfigRepository.save(m);
		m = menuConfigRepository.findById("600").get();
		m.setParentId("520");
		menuConfigRepository.save(m);

		pm = menuConfigRepository.findById("250").get();
		pm.getChildren().add(menuConfigRepository.findById("310").get());
		pm.getChildren().add(menuConfigRepository.findById("320").get());
		pm.getChildren().add(menuConfigRepository.findById("330").get());
		pm.getChildren().add(menuConfigRepository.findById("340").get());
		pm.getChildren().add(menuConfigRepository.findById("350").get());
		menuConfigRepository.save(pm);

		m = menuConfigRepository.findById("310").get();
		m.setParentId("250");
		menuConfigRepository.save(m);
		m = menuConfigRepository.findById("320").get();
		m.setParentId("250");
		menuConfigRepository.save(m);
		m = menuConfigRepository.findById("330").get();
		m.setParentId("250");
		menuConfigRepository.save(m);
		m = menuConfigRepository.findById("340").get();
		m.setParentId("250");
		menuConfigRepository.save(m);
		m = menuConfigRepository.findById("350").get();
		m.setParentId("250");
		menuConfigRepository.save(m);

		pm = menuConfigRepository.findById("400").get();
		pm.getChildren().add(menuConfigRepository.findById("460").get());
		pm.getChildren().add(menuConfigRepository.findById("470").get());
		pm.getChildren().add(menuConfigRepository.findById("480").get());
		menuConfigRepository.save(pm);

		m = menuConfigRepository.findById("460").get();
		m.setParentId("400");
		menuConfigRepository.save(m);
		m = menuConfigRepository.findById("470").get();
		m.setParentId("400");
		menuConfigRepository.save(m);
		m = menuConfigRepository.findById("480").get();
		m.setParentId("400");
		menuConfigRepository.save(m);

	}

	/**
	 * 
	 */
	private static List<GroupInfoBean> initGroups() {
		List<GroupInfoBean> groupList = new ArrayList<>();
		GroupInfoBean group = new GroupInfoBean();
		group.setGroupDesc("用户组管理");
		group.setGroupName("用户组管理");
		group.setText("用户组管理");
		group.setGroupType("BA");
		group.setLevel(2);
		groupList.add(group);

		group = new GroupInfoBean();
		group.setGroupDesc("用户管理");
		group.setGroupName("用户管理");
		group.setText("用户管理");
		group.setGroupType("BA");
		group.setLevel(2);
		groupList.add(group);

		group = new GroupInfoBean();
		group.setGroupDesc("技术管理员组，管理用户组，权限，角色，资源等功能");
		group.setGroupName("技术管理员组");
		group.setText("技术管理员组");
		group.setGroupType("IT");
		group.setLevel(1);
		groupList.add(group);

		group = new GroupInfoBean();
		group.setGroupDesc("业务管理员组,管理");
		group.setGroupName("业务管理员组");
		group.setText("业务管理员组");
		group.setGroupType("BA");
		group.setLevel(1);
		groupList.add(group);

		group = new GroupInfoBean();
		group.setGroupDesc("管理所有非后台功能的业务功能");
		group.setGroupName("功能管理员组");
		group.setText("功能管理员组");
		group.setGroupType("OP");
		group.setLevel(1);
		groupList.add(group);

		group = new GroupInfoBean();
		group.setGroupDesc("用户组用户绑定");
		group.setGroupName("用户组用户绑定操作组");
		group.setText("用户组用户绑定操作组");
		group.setGroupType("BA");
		group.setLevel(3);
		groupList.add(group);

		int id = 1;
		for (GroupInfoBean r : groupList) {
			r.setId((id++) + "");
		}
		return groupList;
	}

	/**
	 * .*values \('([^']+)','([^']+)'\); module=new
	 * ModuleInfoBean\(\);module.setModuleId\("\1"\);module.setModuleName\("\2"\);moduleList.add\(module\);\n
	 */
	private static List<ModuleInfoBean> initModule() {
		List<ModuleInfoBean> moduleList = new ArrayList<>();
		ModuleInfoBean module = new ModuleInfoBean();
		module.setModuleId("User");
		module.setModuleName("用户管理模块");
		moduleList.add(module);

		module = new ModuleInfoBean();
		module.setModuleId("Role");
		module.setModuleName("角色管理模块");
		moduleList.add(module);

		module = new ModuleInfoBean();
		module.setModuleId("Permission");
		module.setModuleName("权限管理模块");
		moduleList.add(module);

		module = new ModuleInfoBean();
		module.setModuleId("Group");
		module.setModuleName("用户组管理模块");
		moduleList.add(module);

		module = new ModuleInfoBean();
		module.setModuleId("Resource");
		module.setModuleName("资源管理模块");
		moduleList.add(module);

		module = new ModuleInfoBean();
		module.setModuleId("CouponAccount");
		module.setModuleName("优惠券虚拟账号管理模块");
		moduleList.add(module);

		module = new ModuleInfoBean();
		module.setModuleId("CouponGroup");
		module.setModuleName("优惠券批次管理模块");
		moduleList.add(module);

		module = new ModuleInfoBean();
		module.setModuleId("Coupon");
		module.setModuleName("优惠券管理模块");
		moduleList.add(module);

		module = new ModuleInfoBean();
		module.setModuleId("CouponIssueChannel");
		module.setModuleName("优惠券发放渠道管理");
		moduleList.add(module);

		module = new ModuleInfoBean();
		module.setModuleId("RateCoupon");
		module.setModuleName("运价券与会员关系直减管理");
		moduleList.add(module);

		module = new ModuleInfoBean();
		module.setModuleId("Scheduler");
		module.setModuleName("任务调度管理模块");
		moduleList.add(module);

		return moduleList;
	}

	/**
	 * .*values \((\d+),'([^']+)','([^']+)'\); permission=new
	 * PermissionInfoBean\(\);permission.setPermissionDesc\("\2"\);permission.setPermissionExp\("\3"\);permissionList.add\(permission\);
	 * 
	 */
	private static List<PermissionInfoBean> initPerms() {
		List<PermissionInfoBean> permissionList = new ArrayList<>();
		PermissionInfoBean permission = new PermissionInfoBean();
		permission = new PermissionInfoBean();
		permission.setPermissionDesc("用户管理页面访问权限");
		permission.setPermissionExp("User:access");
		permissionList.add(permission);
		permission = new PermissionInfoBean();
		permission.setPermissionDesc("用户组管理页面访问权限");
		permission.setPermissionExp("Group:access");
		permissionList.add(permission);
		permission = new PermissionInfoBean();
		permission.setPermissionDesc("资源管理页面访问权限");
		permission.setPermissionExp("Resource:access");
		permissionList.add(permission);
		permission = new PermissionInfoBean();
		permission.setPermissionDesc("权限管理页面访问权限");
		permission.setPermissionExp("Permission:access");
		permissionList.add(permission);
		permission = new PermissionInfoBean();
		permission.setPermissionDesc("角色管理页面访问权限");
		permission.setPermissionExp("Role:access");
		permissionList.add(permission);
		permission = new PermissionInfoBean();
		permission.setPermissionDesc("调度任务页面访问权限");
		permission.setPermissionExp("Scheduler:access");
		permissionList.add(permission);
		permission = new PermissionInfoBean();
		permission.setPermissionDesc("用户管理页面访问权限");
		permission.setPermissionExp("User:*");
		permissionList.add(permission);
		permission = new PermissionInfoBean();
		permission.setPermissionDesc("用户组管理页面访问权限");
		permission.setPermissionExp("Group:*");
		permissionList.add(permission);
		permission = new PermissionInfoBean();
		permission.setPermissionDesc("资源管理页面访问权限");
		permission.setPermissionExp("Resource:*");
		permissionList.add(permission);
		permission = new PermissionInfoBean();
		permission.setPermissionDesc("权限管理页面访问权限");
		permission.setPermissionExp("Permission:*");
		permissionList.add(permission);
		permission = new PermissionInfoBean();
		permission.setPermissionDesc("角色管理页面访问权限");
		permission.setPermissionExp("Role:*");
		permissionList.add(permission);
		permission = new PermissionInfoBean();
		permission.setPermissionDesc("调度任务管理员权限");
		permission.setPermissionExp("Scheduler:*");
		permissionList.add(permission);
		permission = new PermissionInfoBean();
		permission.setPermissionDesc("优惠券虚拟账户");
		permission.setPermissionExp("CouponAccount:*");
		permissionList.add(permission);
		permission = new PermissionInfoBean();
		permission.setPermissionDesc("优惠券批次管理");
		permission.setPermissionExp("CouponGroup:*");
		permissionList.add(permission);
		permission = new PermissionInfoBean();
		permission.setPermissionDesc("优惠券管理");
		permission.setPermissionExp("Coupon:*");
		permissionList.add(permission);
		permission = new PermissionInfoBean();
		permission.setPermissionDesc("优惠券发放渠道");
		permission.setPermissionExp("CouponIssueChannel:*");
		permissionList.add(permission);
		permission = new PermissionInfoBean();
		permission.setPermissionDesc("运价券与会员直减管理");
		permission.setPermissionExp("RateCoupon:*");
		permissionList.add(permission);
		permission = new PermissionInfoBean();
		permission.setPermissionDesc("优惠券虚拟账户");
		permission.setPermissionExp("CouponAccount:access");
		permissionList.add(permission);
		permission = new PermissionInfoBean();
		permission.setPermissionDesc("优惠券批次管理");
		permission.setPermissionExp("CouponGroup:access");
		permissionList.add(permission);
		permission = new PermissionInfoBean();
		permission.setPermissionDesc("优惠券管理");
		permission.setPermissionExp("Coupon:access");
		permissionList.add(permission);
		permission = new PermissionInfoBean();
		permission.setPermissionDesc("优惠券发放渠道");
		permission.setPermissionExp("CouponIssueChannel:access");
		permissionList.add(permission);
		permission = new PermissionInfoBean();
		permission.setPermissionDesc("运价券与会员直减管理");
		permission.setPermissionExp("RateCoupon:access");
		permissionList.add(permission);
		permission = new PermissionInfoBean();
		permission.setPermissionDesc("用户组绑定用户管理");
		permission.setPermissionExp("Group:access,addBindingUser,removeBindingUser");
		permissionList.add(permission);

		int id = 1;
		for (PermissionInfoBean r : permissionList) {
			r.setId((id++) + "");
		}
		return permissionList;
	}

	/**
	 * .*values \((\d+),'([^']+)','([^']+)',(\d+),(\d+),'([^']+)'\); role=new
	 * RoleInfoBean\(\);role.setRoleDesc\("\3"\);role.setRoleName\("\2"\);role.setText\("\2"\);role.setLevel\(5\);role.setRoleType\("\6"\);roleList.add\(role\);\n
	 */
	private static List<RoleInfoBean> initRoles() {
		List<RoleInfoBean> roleList = new ArrayList<>();
		RoleInfoBean role = new RoleInfoBean();
		role = new RoleInfoBean();
		role.setRoleDesc("优惠券虚拟账户管理员角色");
		role.setRoleName("优惠券虚拟账户管理员");
		role.setText("优惠券虚拟账户管理员");
		role.setLevel(5);
		role.setRoleType("OP");
		roleList.add(role);

		role = new RoleInfoBean();
		role.setRoleDesc("优惠券发放渠道管理员角色");
		role.setRoleName("优惠券发放渠道管理员");
		role.setText("优惠券发放渠道管理员");
		role.setLevel(5);
		role.setRoleType("OP");
		roleList.add(role);

		role = new RoleInfoBean();
		role.setRoleDesc("用户组绑定用户管理");
		role.setRoleName("用户组绑定用户管理");
		role.setText("用户组绑定用户管理");
		role.setLevel(5);
		role.setRoleType("null");
		roleList.add(role);

		role = new RoleInfoBean();
		role.setRoleDesc("运价券与用户关系管理员角色");
		role.setRoleName("运价券与用户关系管理员");
		role.setText("运价券与用户关系管理员");
		role.setLevel(5);
		role.setRoleType("OP");
		roleList.add(role);

		role = new RoleInfoBean();
		role.setRoleDesc("优惠券批次管理员");
		role.setRoleName("优惠券批次管理员");
		role.setText("优惠券批次管理员");
		role.setLevel(5);
		role.setRoleType("OP");
		roleList.add(role);

		role = new RoleInfoBean();
		role.setRoleDesc("优惠券管理员");
		role.setRoleName("优惠券管理员");
		role.setText("优惠券管理员");
		role.setLevel(5);
		role.setRoleType("OP");
		roleList.add(role);

		role = new RoleInfoBean();
		role.setRoleDesc("用户组管理员");
		role.setRoleName("用户组管理员");
		role.setText("用户组管理员");
		role.setLevel(5);
		role.setRoleType("IT");
		roleList.add(role);

		role = new RoleInfoBean();
		role.setRoleDesc("用户管理模块管理员");
		role.setRoleName("用户管理员");
		role.setText("用户管理员");
		role.setLevel(5);
		role.setRoleType("BA");
		roleList.add(role);

		role = new RoleInfoBean();
		role.setRoleDesc("角色管理页面管理员");
		role.setRoleName("角色管理页面管理员");
		role.setText("角色管理页面管理员");
		role.setLevel(5);
		role.setRoleType("IT");
		roleList.add(role);

		role = new RoleInfoBean();
		role.setRoleDesc("权限管理员");
		role.setRoleName("权限管理员");
		role.setText("权限管理员");
		role.setLevel(5);
		role.setRoleType("IT");
		roleList.add(role);

		role = new RoleInfoBean();
		role.setRoleDesc("资源模块管理员");
		role.setRoleName("资源模块管理员");
		role.setText("资源模块管理员");
		role.setLevel(5);
		role.setRoleType("IT");
		roleList.add(role);

		role = new RoleInfoBean();
		role.setRoleDesc("管理调度任务界面");
		role.setRoleName("调度任务管理员");
		role.setText("调度任务管理员");
		role.setLevel(5);
		role.setRoleType("IT");
		roleList.add(role);

		int id = 1;
		for (RoleInfoBean r : roleList) {
			r.setId((id++) + "");
		}
		return roleList;
	}

	/**
	 * .*values \((\d+),(\d+),'([^']+)',(\d+),'([^']+)',(\d+),(\d+)\); //rsid=\2
	 * pid=\4 \nmenu=new
	 * MenuConfigInfoBean\(\);menu.setId\("\1"\);menu.setText\("\5"\);menu.setMenuOrder\(\6\);menu.setResource\(resourceInfoRepository.findById\("\2"\).get\(\)\);menu.setResourceUrl\("\3"\);menu.setLevel\(\7\);menuList.add\(menu\);\n
	 */
	private static List<MenuConfigInfoBean> initMenu(ResourceInfoRepository resourceInfoRepository) {
		List<MenuConfigInfoBean> menuList = new ArrayList<>();
		MenuConfigInfoBean menu;

		// rsid=0 pid=0
		menu = new MenuConfigInfoBean();
		menu.setId("1");
		menu.setText("后台管理模块");
		menu.setMenuOrder(1);
		// menu.setResource(resourceInfoRepository.findById("0").get());
		menu.setResourceUrl("#");
		menu.setLevel(1);
		menuList.add(menu);

		// rsid=0 pid=0
		menu = new MenuConfigInfoBean();
		menu.setId("2");
		menu.setText("功能管理模块");
		menu.setMenuOrder(2);
		// menu.setResource(resourceInfoRepository.findById("0").get());
		menu.setResourceUrl("#");
		menu.setLevel(1);
		menuList.add(menu);

		// rsid=0 pid=2
		menu = new MenuConfigInfoBean();
		menu.setId("250");
		menu.setText("优惠券模块管理");
		menu.setMenuOrder(1);
		// menu.setResource(resourceInfoRepository.findById("0").get());
		menu.setResourceUrl("#");
		menu.setLevel(2);
		menuList.add(menu);

		// rsid=37 pid=500
		menu = new MenuConfigInfoBean();
		menu.setId("510");
		menu.setText("调度任务管理");
		menu.setMenuOrder(1);
		menu.setResource(resourceInfoRepository.findById("37").get());
		menu.setResourceUrl("/authorized/scheduler/access");
		menu.setLevel(3);
		menuList.add(menu);

		// rsid=0 pid=1
		menu = new MenuConfigInfoBean();
		menu.setId("500");
		menu.setText("调度任务模块管理");
		menu.setMenuOrder(2);
		// menu.setResource(resourceInfoRepository.findById("0").get());
		menu.setResourceUrl("#");
		menu.setLevel(2);
		menuList.add(menu);

		// rsid=0 pid=1
		menu = new MenuConfigInfoBean();
		menu.setId("520");
		menu.setText("用户权限管理");
		menu.setMenuOrder(3);
		// menu.setResource(resourceInfoRepository.findById("0").get());
		menu.setResourceUrl("#");
		menu.setLevel(2);
		menuList.add(menu);

		// rsid=29 pid=520
		menu = new MenuConfigInfoBean();
		menu.setId("590");
		menu.setText("用户管理");
		menu.setMenuOrder(2);
		menu.setResource(resourceInfoRepository.findById("29").get());
		menu.setResourceUrl("/authorized/user/access");
		menu.setLevel(3);
		menuList.add(menu);

		// rsid=3 pid=250
		menu = new MenuConfigInfoBean();
		menu.setId("310");
		menu.setText("优惠券虚拟账户管理");
		menu.setMenuOrder(1);
		menu.setResource(resourceInfoRepository.findById("3").get());
		menu.setResourceUrl("/authorized/couponAccount/access");
		menu.setLevel(3);
		menuList.add(menu);

		// rsid=5 pid=250
		menu = new MenuConfigInfoBean();
		menu.setId("320");
		menu.setText("优惠券批次管理");
		menu.setMenuOrder(2);
		menu.setResource(resourceInfoRepository.findById("5").get());
		menu.setResourceUrl("/authorized/couponGroup/access");
		menu.setLevel(3);
		menuList.add(menu);

		// rsid=13 pid=250
		menu = new MenuConfigInfoBean();
		menu.setId("330");
		menu.setText("优惠券管理");
		menu.setMenuOrder(3);
		menu.setResource(resourceInfoRepository.findById("13").get());
		menu.setResourceUrl("/authorized/coupon/access");
		menu.setLevel(3);
		menuList.add(menu);

		// rsid=16 pid=250
		menu = new MenuConfigInfoBean();
		menu.setId("340");
		menu.setText("发放渠道管理");
		menu.setMenuOrder(4);
		menu.setResource(resourceInfoRepository.findById("16").get());
		menu.setResourceUrl("/authorized/couponIssuingChannel/access");
		menu.setLevel(3);
		menuList.add(menu);

		// rsid=20 pid=250
		menu = new MenuConfigInfoBean();
		menu.setId("350");
		menu.setText("运价券与会员直减关系管理");
		menu.setMenuOrder(5);
		menu.setResource(resourceInfoRepository.findById("20").get());
		menu.setResourceUrl("/authorized/rateCoupon/access");
		menu.setLevel(3);
		menuList.add(menu);

		// rsid=0 pid=1
		menu = new MenuConfigInfoBean();
		menu.setId("400");
		menu.setText("身份认证模块管理");
		menu.setMenuOrder(1);
		// menu.setResource(resourceInfoRepository.findById("0").get());
		menu.setResourceUrl("#");
		menu.setLevel(2);
		menuList.add(menu);

		// rsid=25 pid=520
		menu = new MenuConfigInfoBean();
		menu.setId("600");
		menu.setText("用户组管理");
		menu.setMenuOrder(1);
		menu.setResource(resourceInfoRepository.findById("25").get());
		menu.setResourceUrl("/authorized/group/access");
		menu.setLevel(3);
		menuList.add(menu);

		// rsid=30 pid=400
		menu = new MenuConfigInfoBean();
		menu.setId("460");
		menu.setText("角色管理");
		menu.setMenuOrder(2);
		menu.setResource(resourceInfoRepository.findById("30").get());
		menu.setResourceUrl("/authorized/role/access");
		menu.setLevel(3);
		menuList.add(menu);

		// rsid=33 pid=400
		menu = new MenuConfigInfoBean();
		menu.setId("470");
		menu.setText("权限管理");
		menu.setMenuOrder(3);
		menu.setResource(resourceInfoRepository.findById("33").get());
		menu.setResourceUrl("/authorized/permission/access");
		menu.setLevel(3);
		menuList.add(menu);

		// rsid=34 pid=400
		menu = new MenuConfigInfoBean();
		menu.setId("480");
		menu.setText("资源管理");
		menu.setMenuOrder(4);
		menu.setResource(resourceInfoRepository.findById("34").get());
		menu.setResourceUrl("/authorized/resource/access");
		menu.setLevel(3);
		menuList.add(menu);

		return menuList;
	}

	/**
	 * .*values
	 * \((\d+),'([^']+)','([^']+)','([^']+)','([^']+)','([^']+)',(\d+),'([^']+)','([^']+)',(\d+)\);
	 * // \1 in \7\r\nresource = new
	 * ResourceInfoBean\(\);resource.setActionCode\("\6"\);resource.setCategory\("\8"\);resource.setModule\("\5"\);resource.setResourceDesc\("\4"\);resource.setResourceName\("\2"\);resource.setResourceType\("\9"\);resource.setResourceUrl\("\3"\);resourceList.add\(resource\);
	 */
	private static List<ResourceInfoBean> initResources() {
		List<ResourceInfoBean> resourceList = new ArrayList<>();
		ResourceInfoBean resource;
		// 优惠券虚拟账户
		// 1 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("*");
		resource.setCategory("all");
		resource.setModule("CouponAccount");
		resource.setResourceDesc("优惠券虚拟账户管理");
		resource.setResourceName("优惠券虚拟账户管理");
		resource.setText("优惠券虚拟账户管理");
		resource.setResourceType("OP");
		resource.setResourceUrl("/authorized/couponAccount/access");
		resourceList.add(resource);

		// 2 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("update");
		resource.setCategory("uri");
		resource.setModule("CouponAccount");
		resource.setResourceDesc("优惠券虚拟账户管理充值");
		resource.setResourceName("优惠券虚拟账户管理充值");
		resource.setText("优惠券虚拟账户管理充值");
		resource.setResourceType("OP");
		resource.setResourceUrl("/authorized/couponAccount/update");
		resourceList.add(resource);

		// 3 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("access");
		resource.setCategory("menu");
		resource.setModule("CouponAccount");
		resource.setResourceDesc("优惠券虚拟账户管理菜单");
		resource.setResourceName("优惠券虚拟账户管理");
		resource.setText("优惠券虚拟账户管理");
		resource.setResourceType("OP");
		resource.setResourceUrl("/authorized/couponAccount/access");
		resourceList.add(resource);

		// 优惠券批次
		// 4 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("*");
		resource.setCategory("all");
		resource.setModule("CouponGroup");
		resource.setResourceDesc("优惠券批次管理");
		resource.setResourceName("优惠券批次管理");
		resource.setText("优惠券批次管理");
		resource.setResourceType("OP");
		resource.setResourceUrl("/authorized/couponGroup/access");
		resourceList.add(resource);

		// 5 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("access");
		resource.setCategory("menu");
		resource.setModule("CouponGroup");
		resource.setResourceDesc("优惠券批次管理菜单");
		resource.setResourceName("优惠券批次管理");
		resource.setText("优惠券批次管理");
		resource.setResourceType("OP");
		resource.setResourceUrl("/authorized/couponGroup/access");
		resourceList.add(resource);

		// 6 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("addDomestic");
		resource.setCategory("uri");
		resource.setModule("CouponGroup");
		resource.setResourceDesc("新增国内优惠券");
		resource.setResourceName("新增国内优惠券");
		resource.setText("新增国内优惠券");
		resource.setResourceType("OP");
		resource.setResourceUrl("/authorized/couponGroup/addDomestic");
		resourceList.add(resource);

		// 7 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("addI18n");
		resource.setCategory("uri");
		resource.setModule("CouponGroup");
		resource.setResourceDesc("新增国际优惠券");
		resource.setResourceName("新增国际优惠券");
		resource.setText("新增国际优惠券");
		resource.setResourceType("OP");
		resource.setResourceUrl("/authorized/couponGroup/addI18n");
		resourceList.add(resource);

		// 8 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("updateDomestic");
		resource.setCategory("uri");
		resource.setModule("CouponGroup");
		resource.setResourceDesc("修改国内优惠券");
		resource.setResourceName("修改国内优惠券");
		resource.setText("修改国内优惠券");
		resource.setResourceType("OP");
		resource.setResourceUrl("authorized/couponGroup/updateDomestic");
		resourceList.add(resource);

		// 9 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("updateI18n");
		resource.setCategory("uri");
		resource.setModule("CouponGroup");
		resource.setResourceDesc("修改国际优惠券");
		resource.setResourceName("修改国际优惠券");
		resource.setText("修改国际优惠券");
		resource.setResourceType("OP");
		resource.setResourceUrl("authorized/couponGroup/updateI18n");
		resourceList.add(resource);

		// 10 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("exportPrivateKey");
		resource.setCategory("uri");
		resource.setModule("CouponGroup");
		resource.setResourceDesc("导出优惠券密钥");
		resource.setResourceName("导出优惠券密钥");
		resource.setText("导出优惠券密钥");
		resource.setResourceType("OP");
		resource.setResourceUrl("/authorized/couponGroup/exportPrivateKey");
		resourceList.add(resource);

		// 11 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("issue");
		resource.setCategory("uri");
		resource.setModule("CouponGroup");
		resource.setResourceDesc("优惠券发放");
		resource.setResourceName("优惠券发放");
		resource.setText("优惠券发放");
		resource.setResourceType("OP");
		resource.setResourceUrl("/authorized/couponGroup/issue");
		resourceList.add(resource);

		// 优惠券管理
		// 12 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("*");
		resource.setCategory("all");
		resource.setModule("Coupon");
		resource.setResourceDesc("优惠券管理");
		resource.setResourceName("优惠券管理");
		resource.setText("优惠券管理");
		resource.setResourceType("OP");
		resource.setResourceUrl("/authorized/coupon/access");
		resourceList.add(resource);

		// 13 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("access");
		resource.setCategory("menu");
		resource.setModule("Coupon");
		resource.setResourceDesc("优惠券管理菜单");
		resource.setResourceName("优惠券管理");
		resource.setText("优惠券管理");
		resource.setResourceType("OP");
		resource.setResourceUrl("/authorized/coupon/access");
		resourceList.add(resource);

		// 14 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("export");
		resource.setCategory("uri");
		resource.setModule("Coupon");
		resource.setResourceDesc("优惠券报表导出");
		resource.setResourceName("优惠券报表导出");
		resource.setText("优惠券报表导出");
		resource.setResourceType("OP");
		resource.setResourceUrl("authorized/coupon/export");
		resourceList.add(resource);

		// 15 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("batchUpdate");
		resource.setCategory("uri");
		resource.setModule("Coupon");
		resource.setResourceDesc("优惠券管理批量更新");
		resource.setResourceName("优惠券管理批量更新");
		resource.setText("优惠券管理批量更新");
		resource.setResourceType("OP");
		resource.setResourceUrl("authorized/coupon/batchUpdate");
		resourceList.add(resource);

		// 放渠道管理
		// 16 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("access");
		resource.setCategory("menu");
		resource.setModule("CouponIssueChannel");
		resource.setResourceDesc("发放渠道管理菜单");
		resource.setResourceName("发放渠道管理");
		resource.setText("发放渠道管理");
		resource.setResourceType("OP");
		resource.setResourceUrl("/authorized/couponIssuingChannel/access");
		resourceList.add(resource);

		// 17 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("*");
		resource.setCategory("all");
		resource.setModule("CouponIssueChannel");
		resource.setResourceDesc("发放渠道管理");
		resource.setResourceName("发放渠道管理");
		resource.setText("发放渠道管理");
		resource.setResourceType("OP");
		resource.setResourceUrl("/authorized/couponIssuingChannel/access");
		resourceList.add(resource);

		// 18 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("add");
		resource.setCategory("uri");
		resource.setModule("CouponIssueChannel");
		resource.setResourceDesc("发放渠道管理新建");
		resource.setResourceName("发放渠道管理新建");
		resource.setText("发放渠道管理新建");
		resource.setResourceType("OP");
		resource.setResourceUrl("authorized/couponIssuingChannel/add");
		resourceList.add(resource);

		// 19 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("delete");
		resource.setCategory("uri");
		resource.setModule("CouponIssueChannel");
		resource.setResourceDesc("发放渠道管理删除");
		resource.setResourceName("发放渠道管理删除");
		resource.setText("发放渠道管理删除");
		resource.setResourceType("OP");
		resource.setResourceUrl("authorized/couponIssuingChannel/delete");
		resourceList.add(resource);

		// 运价券与会员直减关系管理
		// 20 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("access");
		resource.setCategory("menu");
		resource.setModule("RateCoupon");
		resource.setResourceDesc("运价券与会员直减关系管理菜单");
		resource.setResourceName("运价券与会员直减关系管理");
		resource.setText("运价券与会员直减关系管理");
		resource.setResourceType("OP");
		resource.setResourceUrl("/authorized/rateCoupon/access");
		resourceList.add(resource);

		// 21 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("*");
		resource.setCategory("all");
		resource.setModule("RateCoupon");
		resource.setResourceDesc("运价券与会员直减关系管理");
		resource.setResourceName("运价券与会员直减关系管理");
		resource.setText("运价券与会员直减关系管理");
		resource.setResourceType("OP");
		resource.setResourceUrl("/authorized/rateCoupon/access");
		resourceList.add(resource);

		// 22 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("add");
		resource.setCategory("uri");
		resource.setModule("RateCoupon");
		resource.setResourceDesc("运价券与会员直减关系管理新建");
		resource.setResourceName("运价券与会员直减关系管理新建");
		resource.setText("运价券与会员直减关系管理新建");
		resource.setResourceType("OP");
		resource.setResourceUrl("authorized/rateCoupon/add");
		resourceList.add(resource);

		// 23 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("delete");
		resource.setCategory("uri");
		resource.setModule("RateCoupon");
		resource.setResourceDesc("运价券与会员直减关系管理删除");
		resource.setResourceName("运价券与会员直减关系管理删除");
		resource.setText("运价券与会员直减关系管理删除");
		resource.setResourceType("OP");
		resource.setResourceUrl("authorized/rateCoupon/delete");
		resourceList.add(resource);

		// 24 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("*");
		resource.setCategory("all");
		resource.setModule("Group");
		resource.setResourceDesc("用户组管理");
		resource.setResourceName("用户组管理");
		resource.setText("用户组管理");
		resource.setResourceType("IT");
		resource.setResourceUrl("/authorized/group/access");
		resourceList.add(resource);

		// 25 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("access");
		resource.setCategory("menu");
		resource.setModule("Group");
		resource.setResourceDesc("用户组管理菜单");
		resource.setResourceName("用户组管理");
		resource.setText("用户组管理");
		resource.setResourceType("IT");
		resource.setResourceUrl("/authorized/group/access");
		resourceList.add(resource);

		// 26 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("addBindingUser");
		resource.setCategory("uri");
		resource.setModule("Group");
		resource.setResourceDesc("用户组添加绑定用户");
		resource.setResourceName("用户组添加绑定用户");
		resource.setText("用户组添加绑定用户");
		resource.setResourceType("OP");
		resource.setResourceUrl("authorized/group/addBindingUser");
		resourceList.add(resource);

		// 27 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("removeBindingUser");
		resource.setCategory("uri");
		resource.setModule("Group");
		resource.setResourceDesc("用户组删除绑定用户");
		resource.setResourceName("用户组删除绑定用户");
		resource.setText("用户组删除绑定用户");
		resource.setResourceType("OP");
		resource.setResourceUrl("authorized/group/removeBindingUser");
		resourceList.add(resource);

		// 28 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("*");
		resource.setCategory("all");
		resource.setModule("User");
		resource.setResourceDesc("用户管理");
		resource.setResourceName("用户管理");
		resource.setText("用户管理");
		resource.setResourceType("BA");
		resource.setResourceUrl("/authorized/user/access");
		resourceList.add(resource);

		// 29 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("access");
		resource.setCategory("menu");
		resource.setModule("User");
		resource.setResourceDesc("用户管理菜单");
		resource.setResourceName("用户管理");
		resource.setText("用户管理");
		resource.setResourceType("BA");
		resource.setResourceUrl("/authorized/user/access");
		resourceList.add(resource);

		// 30 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("access");
		resource.setCategory("menu");
		resource.setModule("Role");
		resource.setResourceDesc("角色管理菜单");
		resource.setResourceName("角色管理");
		resource.setText("角色管理");
		resource.setResourceType("IT");
		resource.setResourceUrl("/authorized/role/access");
		resourceList.add(resource);

		// 31 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("*");
		resource.setCategory("all");
		resource.setModule("Role");
		resource.setResourceDesc("角色管理");
		resource.setResourceName("角色管理");
		resource.setText("角色管理");
		resource.setResourceType("IT");
		resource.setResourceUrl("/authorized/role/access");
		resourceList.add(resource);

		// 32 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("*");
		resource.setCategory("all");
		resource.setModule("Permission");
		resource.setResourceDesc("权限管理");
		resource.setResourceName("权限管理");
		resource.setText("权限管理");
		resource.setResourceType("IT");
		resource.setResourceUrl("/authorized/permission/access");
		resourceList.add(resource);

		// 33 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("access");
		resource.setCategory("menu");
		resource.setModule("Permission");
		resource.setResourceDesc("权限管理菜单");
		resource.setResourceName("权限管理");
		resource.setText("权限管理");
		resource.setResourceType("IT");
		resource.setResourceUrl("/authorized/permission/access");
		resourceList.add(resource);

		// 34 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("access");
		resource.setCategory("menu");
		resource.setModule("Resource");
		resource.setResourceDesc("资源管理菜单");
		resource.setResourceName("资源管理");
		resource.setText("资源管理");
		resource.setResourceType("IT");
		resource.setResourceUrl("/authorized/resource/access");
		resourceList.add(resource);

		// 35 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("*");
		resource.setCategory("all");
		resource.setModule("Resource");
		resource.setResourceDesc("资源管理");
		resource.setResourceName("资源管理");
		resource.setText("资源管理");
		resource.setResourceType("IT");
		resource.setResourceUrl("/authorized/resource/access");
		resourceList.add(resource);

		// 36 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("*");
		resource.setCategory("all");
		resource.setModule("Scheduler");
		resource.setResourceDesc("调度任务管理");
		resource.setResourceName("调度任务管理");
		resource.setText("调度任务管理");
		resource.setResourceType("IT");
		resource.setResourceUrl("/authorized/scheduler/access");
		resourceList.add(resource);

		// 37 in 0
		resource = new ResourceInfoBean();
		resource.setActionCode("access");
		resource.setCategory("menu");
		resource.setModule("Scheduler");
		resource.setResourceDesc("调度任务管理菜单");
		resource.setResourceName("调度任务管理");
		resource.setText("调度任务管理");
		resource.setResourceType("IT");
		resource.setResourceUrl("/authorized/scheduler/access");
		resourceList.add(resource);

		int id = 1;
		for (ResourceInfoBean r : resourceList) {
			r.setId((id++) + "");
		}
		return resourceList;
	}
}
