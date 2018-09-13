package com.ghotel.oss.console.core;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.context.annotation.FilterType;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

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
import com.ghotel.oss.console.modules.dictionary.bean.DictionaryDetailBean;
import com.ghotel.oss.console.modules.dictionary.bean.DictionaryTypeBean;
import com.ghotel.oss.console.modules.dictionary.dao.DictionaryDetailRepository;
import com.ghotel.oss.console.modules.dictionary.dao.DictionaryTypeRepository;
import com.ghotel.oss.console.modules.scheduler.bean.JobDetailInfoBean;
import com.ghotel.oss.console.modules.scheduler.dao.JobDetailInfoRepository;

@ComponentScan(basePackages = "com.ghotel.oss", excludeFilters = {
		@Filter(type = FilterType.ANNOTATION, value = Controller.class),
		@Filter(type = FilterType.ANNOTATION, value = Service.class) })
public class InitDataApplication {
	public static void main(String[] args) {
		ApplicationContext ac = SpringApplication.run(InitDataApplication.class, args);
		try {
			UserInfoRepository userInfoRepository = ac.getBean(UserInfoRepository.class);
			GroupInfoRepository groupInfoRepository = ac.getBean(GroupInfoRepository.class);
			RoleInfoRepository roleInfoRepository = ac.getBean(RoleInfoRepository.class);
			PermissionInfoRepository permissionInfoRepository = ac.getBean(PermissionInfoRepository.class);
			ResourceInfoRepository resourceInfoRepository = ac.getBean(ResourceInfoRepository.class);
			ModuleInfoRepository moduleInfoRepository = ac.getBean(ModuleInfoRepository.class);
			MenuConfigRepository menuConfigRepository = ac.getBean(MenuConfigRepository.class);
			DictionaryTypeRepository dictionaryTypeRepository = ac.getBean(DictionaryTypeRepository.class);
			DictionaryDetailRepository dictionaryDetailRepository = ac.getBean(DictionaryDetailRepository.class);
			JobDetailInfoRepository jobDetailInfoRepository = ac.getBean(JobDetailInfoRepository.class);
			
			
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
			dictionaryTypeRepository.saveAll(initDictionaryType());
			jobDetailInfoRepository.save(initJobInfo());

			initGroupAndRole(ac);
			initPermAndRole(ac);
			initPermsAndRes(ac);
			initParentMenu(ac);
			initDictionaryDetail(dictionaryTypeRepository, dictionaryDetailRepository);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			((ConfigurableApplicationContext) ac).close();
		}

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

	private static void initDictionaryTypeAndDetail(DictionaryTypeRepository dictionaryTypeRepository,
			DictionaryDetailBean d, String typeId) {
		dictionaryTypeRepository.findById(typeId).ifPresent(type -> {
			List<DictionaryDetailBean> l = type.getDetails();
			l.add(d);
			type.setDetails(l);
			dictionaryTypeRepository.save(type);
		});
	}

	/**
	 * .*values \('([^']+)','([^']+)','([^']+)','([^']+)'.*
	 * 
	 * detail = new
	 * DictionaryDetailBean\(\);detail\.setDetailId\("\1"\);detail\.setDetailName\("\3"\);detail\.setDetailRemark\(null\);detail\.setDetailValue\("\4"\);
	 * detail = dictionaryDetailRepository\.save\(detail\);
	 * initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "\2");
	 * 
	 * @param ac
	 */
	private static void initDictionaryDetail(DictionaryTypeRepository dictionaryTypeRepository,
			DictionaryDetailRepository dictionaryDetailRepository) {
		DictionaryDetailBean detail = new DictionaryDetailBean();

		detail = new DictionaryDetailBean();
		detail.setDetailId("a04387e953fc49968e8b6ac4f4a58ca1");
		detail.setDetailName("是");
		detail.setDetailRemark(null);
		detail.setDetailValue("1");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "56997c8b4ddd459da10536ee5660975b");

		detail = new DictionaryDetailBean();
		detail.setDetailId("230ce72ca093490f999e348eb967be85");
		detail.setDetailName("否");
		detail.setDetailRemark(null);
		detail.setDetailValue("0");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "56997c8b4ddd459da10536ee5660975b");

		detail = new DictionaryDetailBean();
		detail.setDetailId("b3a963d3cb684b258247c9c72a438a1d");
		detail.setDetailName("已过期");
		detail.setDetailRemark(null);
		detail.setDetailValue("10");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "b28d4a2232234871807699fc713045f4");

		detail = new DictionaryDetailBean();
		detail.setDetailId("52a63b282af24127a81f636f06bbce46");
		detail.setDetailName("生成异常");
		detail.setDetailRemark(null);
		detail.setDetailValue("3");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "98314074444249e8ab097a9ced32559f");

		detail = new DictionaryDetailBean();
		detail.setDetailId("d56eeca4ebe246199ecc25c747970336");
		detail.setDetailName("生成中");
		detail.setDetailRemark(null);
		detail.setDetailValue("1");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "98314074444249e8ab097a9ced32559f");

		detail = new DictionaryDetailBean();
		detail.setDetailId("68a611a6726d46cca424f14cc1ed7f55");
		detail.setDetailName("已生成");
		detail.setDetailRemark(null);
		detail.setDetailValue("2");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "98314074444249e8ab097a9ced32559f");

		detail = new DictionaryDetailBean();
		detail.setDetailId("e9f83390da5a41a2b8caf2731a613a42");
		detail.setDetailName("出错");
		detail.setDetailRemark(null);
		detail.setDetailValue("4");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "98314074444249e8ab097a9ced32559f");

		detail = new DictionaryDetailBean();
		detail.setDetailId("7554bcf5127d43aebdaacfe8f1a92bb6");
		detail.setDetailName("审批中");
		detail.setDetailRemark(null);
		detail.setDetailValue("5");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "98314074444249e8ab097a9ced32559f");

		detail = new DictionaryDetailBean();
		detail.setDetailId("a758f32a58544f8788314794cd08fd77");
		detail.setDetailName("审批通过");
		detail.setDetailRemark(null);
		detail.setDetailValue("6");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "98314074444249e8ab097a9ced32559f");

		detail = new DictionaryDetailBean();
		detail.setDetailId("54372154b0fb4db3b7a6910a7f0f4e62");
		detail.setDetailName("已绑定活动");
		detail.setDetailRemark(null);
		detail.setDetailValue("7");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "98314074444249e8ab097a9ced32559f");

		detail = new DictionaryDetailBean();
		detail.setDetailId("a75d43d5864d49308fd5f820710a0df4");
		detail.setDetailName("挂起");
		detail.setDetailRemark(null);
		detail.setDetailValue("8");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "98314074444249e8ab097a9ced32559f");

		detail = new DictionaryDetailBean();
		detail.setDetailId("dea213ff9d0147f78345e4ac144c26c4");
		detail.setDetailName("废除");
		detail.setDetailRemark(null);
		detail.setDetailValue("9");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "98314074444249e8ab097a9ced32559f");

		detail = new DictionaryDetailBean();
		detail.setDetailId("8d36aa4c1d27449b87e048c311a416ba");
		detail.setDetailName("国内合作活动优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("0");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "28ba7354fa254eb19fb3edbc79938a9e");

		detail = new DictionaryDetailBean();
		detail.setDetailId("674acb19ae2a472da0f59af1350f6d89");
		detail.setDetailName("航线促销优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("1");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "28ba7354fa254eb19fb3edbc79938a9e");

		detail = new DictionaryDetailBean();
		detail.setDetailId("9d1bb9f7eafa4e09bc342dbae49d6202");
		detail.setDetailName("国内营销活动优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("2");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "28ba7354fa254eb19fb3edbc79938a9e");

		detail = new DictionaryDetailBean();
		detail.setDetailId("9ee49c168ab54ad5a77e1e8812879ef9");
		detail.setDetailName("国内里程优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("5");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "28ba7354fa254eb19fb3edbc79938a9e");

		detail = new DictionaryDetailBean();
		detail.setDetailId("73a8d04490614750af8f52e070480ea8");
		detail.setDetailName("国内旅客服务优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("6");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "28ba7354fa254eb19fb3edbc79938a9e");

		detail = new DictionaryDetailBean();
		detail.setDetailId("dfe5e57936fe4b5eaaf476b0dbc66605");
		detail.setDetailName("已过期");
		detail.setDetailRemark(null);
		detail.setDetailValue("10");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "3130ca5fbdbe476abce0fbc9724d8007");

		detail = new DictionaryDetailBean();
		detail.setDetailId("303ded7a39f84a48a045c5e27ef83ca4");
		detail.setDetailName("未审核");
		detail.setDetailRemark(null);
		detail.setDetailValue("1");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "2594e5e7ba7b4fd28c73cba9418860be");

		detail = new DictionaryDetailBean();
		detail.setDetailId("d72d298b4b3f4e0eafa0d6bdc67cbc34");
		detail.setDetailName("已通过");
		detail.setDetailRemark(null);
		detail.setDetailValue("2");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "2594e5e7ba7b4fd28c73cba9418860be");

		detail = new DictionaryDetailBean();
		detail.setDetailId("bccb2b58fe6b4ac3813aa0f02e7554be");
		detail.setDetailName("未通过");
		detail.setDetailRemark(null);
		detail.setDetailValue("3");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "2594e5e7ba7b4fd28c73cba9418860be");

		detail = new DictionaryDetailBean();
		detail.setDetailId("9532235a1c8047d7905b58ce6b09332f");
		detail.setDetailName("生成中");
		detail.setDetailRemark(null);
		detail.setDetailValue("1");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "f41a7de4ab0a4c73aa1b4d070f328978");

		detail = new DictionaryDetailBean();
		detail.setDetailId("567814a97b214d2699a32c6f5fa665e0");
		detail.setDetailName("已生成");
		detail.setDetailRemark(null);
		detail.setDetailValue("2");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "f41a7de4ab0a4c73aa1b4d070f328978");

		detail = new DictionaryDetailBean();
		detail.setDetailId("7106b6defa6d4840992e215104698d13");
		detail.setDetailName("生成异常");
		detail.setDetailRemark(null);
		detail.setDetailValue("3");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "f41a7de4ab0a4c73aa1b4d070f328978");

		detail = new DictionaryDetailBean();
		detail.setDetailId("ed00081cc1604624b699f88928a09fb8");
		detail.setDetailName("出错");
		detail.setDetailRemark(null);
		detail.setDetailValue("4");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "f41a7de4ab0a4c73aa1b4d070f328978");

		detail = new DictionaryDetailBean();
		detail.setDetailId("e281ca7ff96e46df876b4200366b1488");
		detail.setDetailName("审批中");
		detail.setDetailRemark(null);
		detail.setDetailValue("5");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "f41a7de4ab0a4c73aa1b4d070f328978");

		detail = new DictionaryDetailBean();
		detail.setDetailId("c7069702c9b04cef8ee179d99bbf0d37");
		detail.setDetailName("审批通过");
		detail.setDetailRemark(null);
		detail.setDetailValue("6");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "f41a7de4ab0a4c73aa1b4d070f328978");

		detail = new DictionaryDetailBean();
		detail.setDetailId("43dd0359d6914c35a9a7ce535e1a6bed");
		detail.setDetailName("已绑定活动");
		detail.setDetailRemark(null);
		detail.setDetailValue("7");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "f41a7de4ab0a4c73aa1b4d070f328978");

		detail = new DictionaryDetailBean();
		detail.setDetailId("f923982204324bc791bffffa37fcd416");
		detail.setDetailName("挂起");
		detail.setDetailRemark(null);
		detail.setDetailValue("8");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "f41a7de4ab0a4c73aa1b4d070f328978");

		detail = new DictionaryDetailBean();
		detail.setDetailId("4b75ff1f0c5b4e06b99c3788e0bb8737");
		detail.setDetailName("废除");
		detail.setDetailRemark(null);
		detail.setDetailValue("9");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "f41a7de4ab0a4c73aa1b4d070f328978");

		detail = new DictionaryDetailBean();
		detail.setDetailId("d6ecc4d7db3d4ecab68d33f177933671");
		detail.setDetailName("国际营销活动优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("3");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "021d3175a7b245acaa66307efd57efae");

		detail = new DictionaryDetailBean();
		detail.setDetailId("1901dd0b28c7446e817272cc59203207");
		detail.setDetailName("国际合作活动优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("4");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "021d3175a7b245acaa66307efd57efae");

		detail = new DictionaryDetailBean();
		detail.setDetailId("6b2277d2dee544cc84406a7d05b12b62");
		detail.setDetailName("国际旅程优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("7");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "021d3175a7b245acaa66307efd57efae");

		detail = new DictionaryDetailBean();
		detail.setDetailId("c566a8be670b475f914f3bb7857b7ddd");
		detail.setDetailName("国际旅客服务优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("8");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "021d3175a7b245acaa66307efd57efae");

		detail = new DictionaryDetailBean();
		detail.setDetailId("073b3f3d33454060826043e9f3338cae");
		detail.setDetailName("是");
		detail.setDetailRemark(null);
		detail.setDetailValue("1");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "d0a53f379bec40fbbc55dc0281d60ab2");

		detail = new DictionaryDetailBean();
		detail.setDetailId("b716e459e1b74a818f9fcfe9713b20b1");
		detail.setDetailName("否");
		detail.setDetailRemark(null);
		detail.setDetailValue("0");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "d0a53f379bec40fbbc55dc0281d60ab2");

		detail = new DictionaryDetailBean();
		detail.setDetailId("6091fed8fe6b487eb8ff1a30c682a042");
		detail.setDetailName("未审核");
		detail.setDetailRemark(null);
		detail.setDetailValue("1");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "3d5b972c731a479482156bc984b30b9c");

		detail = new DictionaryDetailBean();
		detail.setDetailId("bf549e48b6bd47ba89967d2d6ac18a3f");
		detail.setDetailName("已通过");
		detail.setDetailRemark(null);
		detail.setDetailValue("2");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "3d5b972c731a479482156bc984b30b9c");

		detail = new DictionaryDetailBean();
		detail.setDetailId("2a55ff7ff7734ec59ac2f701dd246347");
		detail.setDetailName("未通过");
		detail.setDetailRemark(null);
		detail.setDetailValue("3");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "3d5b972c731a479482156bc984b30b9c");

		detail = new DictionaryDetailBean();
		detail.setDetailId("412154ee4187417e96142649586df19e");
		detail.setDetailName("生成中");
		detail.setDetailRemark(null);
		detail.setDetailValue("1");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "3130ca5fbdbe476abce0fbc9724d8007");

		detail = new DictionaryDetailBean();
		detail.setDetailId("7382bdeb0a1a48b2b89b941aa02203a4");
		detail.setDetailName("已生成");
		detail.setDetailRemark(null);
		detail.setDetailValue("2");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "3130ca5fbdbe476abce0fbc9724d8007");

		detail = new DictionaryDetailBean();
		detail.setDetailId("33c9dd9b7ee2478a8b9626b1019ef0b1");
		detail.setDetailName("生成异常");
		detail.setDetailRemark(null);
		detail.setDetailValue("3");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "3130ca5fbdbe476abce0fbc9724d8007");

		detail = new DictionaryDetailBean();
		detail.setDetailId("90b3bf1726aa477baf98617bdce1ea4b");
		detail.setDetailName("出错");
		detail.setDetailRemark(null);
		detail.setDetailValue("4");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "3130ca5fbdbe476abce0fbc9724d8007");

		detail = new DictionaryDetailBean();
		detail.setDetailId("50d962c76c0a467b8bf6bee0037468a8");
		detail.setDetailName("审批中");
		detail.setDetailRemark(null);
		detail.setDetailValue("5");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "3130ca5fbdbe476abce0fbc9724d8007");

		detail = new DictionaryDetailBean();
		detail.setDetailId("6c28547ffe844ec0848c5571ec1ee072");
		detail.setDetailName("审批通过");
		detail.setDetailRemark(null);
		detail.setDetailValue("6");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "3130ca5fbdbe476abce0fbc9724d8007");

		detail = new DictionaryDetailBean();
		detail.setDetailId("beead5f07c11465c88393d3e307c8268");
		detail.setDetailName("已绑定活动");
		detail.setDetailRemark(null);
		detail.setDetailValue("7");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "3130ca5fbdbe476abce0fbc9724d8007");

		detail = new DictionaryDetailBean();
		detail.setDetailId("7e875055dec3488687f3068e65a5b390");
		detail.setDetailName("挂起");
		detail.setDetailRemark(null);
		detail.setDetailValue("8");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "3130ca5fbdbe476abce0fbc9724d8007");

		detail = new DictionaryDetailBean();
		detail.setDetailId("4f0e29636e564925a0c4cc1a0294557c");
		detail.setDetailName("废除");
		detail.setDetailRemark(null);
		detail.setDetailValue("9");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "3130ca5fbdbe476abce0fbc9724d8007");

		detail = new DictionaryDetailBean();
		detail.setDetailId("eb99dd233e954ac5ab5501af992b8bcd");
		detail.setDetailName("澳洲自有资金优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("11");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "c047917c97f5429d895b64a82186f31b");

		detail = new DictionaryDetailBean();
		detail.setDetailId("518122b891ef465fb896aa19e8c08fba");
		detail.setDetailName("澳洲虚拟资金优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("12");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "c047917c97f5429d895b64a82186f31b");

		detail = new DictionaryDetailBean();
		detail.setDetailId("0970d1b0b5a54d3ba3b22a895682b797");
		detail.setDetailName("未审核");
		detail.setDetailRemark(null);
		detail.setDetailValue("1");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "b2b2cfbfc71b4985a4b015a56f9666f2");

		detail = new DictionaryDetailBean();
		detail.setDetailId("4698b3302ac54713a19120c141d21222");
		detail.setDetailName("已通过");
		detail.setDetailRemark(null);
		detail.setDetailValue("2");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "b2b2cfbfc71b4985a4b015a56f9666f2");

		detail = new DictionaryDetailBean();
		detail.setDetailId("6e909d5916bd49f881778ea722aa32df");
		detail.setDetailName("未通过");
		detail.setDetailRemark(null);
		detail.setDetailValue("3");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "b2b2cfbfc71b4985a4b015a56f9666f2");

		detail = new DictionaryDetailBean();
		detail.setDetailId("a015a18b2b0f42f1b97a9154335aa593");
		detail.setDetailName("是");
		detail.setDetailRemark(null);
		detail.setDetailValue("1");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "a88740842b4e4adf82aeffe01a54f911");

		detail = new DictionaryDetailBean();
		detail.setDetailId("8d3d1ad33a6243b0bb6645c0711fef60");
		detail.setDetailName("否");
		detail.setDetailRemark(null);
		detail.setDetailValue("0");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "a88740842b4e4adf82aeffe01a54f911");

		detail = new DictionaryDetailBean();
		detail.setDetailId("7dc3d6828adb4dfb9affedf4a0fd95bd");
		detail.setDetailName("韩国自有资金优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("9");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "f23129934bd14df3a7d2619400e8333d");

		detail = new DictionaryDetailBean();
		detail.setDetailId("9d9127c85e6c4b33ba172a07a44bb145");
		detail.setDetailName("韩国虚拟资金优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("10");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "f23129934bd14df3a7d2619400e8333d");

		detail = new DictionaryDetailBean();
		detail.setDetailId("cee7f36204e543d59699e2947b28f598");
		detail.setDetailName("是");
		detail.setDetailRemark(null);
		detail.setDetailValue("1");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "42868a9935a345feaaa980f83c9b3f4a");

		detail = new DictionaryDetailBean();
		detail.setDetailId("f066627b313249c29c426474267bb0c4");
		detail.setDetailName("否");
		detail.setDetailRemark(null);
		detail.setDetailValue("0");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "42868a9935a345feaaa980f83c9b3f4a");

		detail = new DictionaryDetailBean();
		detail.setDetailId("86bc250b493b4242be389505ffcc5807");
		detail.setDetailName("生成中");
		detail.setDetailRemark(null);
		detail.setDetailValue("1");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "32e768e9b8d040b9bbd718ed13fe1fa5");

		detail = new DictionaryDetailBean();
		detail.setDetailId("8bc714ab97f745c48369c05df1db5d75");
		detail.setDetailName("已生成");
		detail.setDetailRemark(null);
		detail.setDetailValue("2");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "32e768e9b8d040b9bbd718ed13fe1fa5");

		detail = new DictionaryDetailBean();
		detail.setDetailId("730ca7e28cd044d6992dcc23a1941690");
		detail.setDetailName("生成异常");
		detail.setDetailRemark(null);
		detail.setDetailValue("3");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "32e768e9b8d040b9bbd718ed13fe1fa5");

		detail = new DictionaryDetailBean();
		detail.setDetailId("cc2a05b7e0624cf7a7254578684ef0ea");
		detail.setDetailName("出错");
		detail.setDetailRemark(null);
		detail.setDetailValue("4");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "32e768e9b8d040b9bbd718ed13fe1fa5");

		detail = new DictionaryDetailBean();
		detail.setDetailId("34717aa82f604f7b91bfa7f026a1c11c");
		detail.setDetailName("审批中");
		detail.setDetailRemark(null);
		detail.setDetailValue("5");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "32e768e9b8d040b9bbd718ed13fe1fa5");

		detail = new DictionaryDetailBean();
		detail.setDetailId("b3bd8246a2364365b1970c68825a013a");
		detail.setDetailName("审批通过");
		detail.setDetailRemark(null);
		detail.setDetailValue("6");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "32e768e9b8d040b9bbd718ed13fe1fa5");

		detail = new DictionaryDetailBean();
		detail.setDetailId("2ea7101014d7435393c0aecf16bb5751");
		detail.setDetailName("已绑定活动");
		detail.setDetailRemark(null);
		detail.setDetailValue("7");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "32e768e9b8d040b9bbd718ed13fe1fa5");

		detail = new DictionaryDetailBean();
		detail.setDetailId("77403789d158401e8b0c75b910e3d235");
		detail.setDetailName("挂起");
		detail.setDetailRemark(null);
		detail.setDetailValue("8");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "32e768e9b8d040b9bbd718ed13fe1fa5");

		detail = new DictionaryDetailBean();
		detail.setDetailId("787b8120c2374f70a26eb184d35fc4e6");
		detail.setDetailName("废除");
		detail.setDetailRemark(null);
		detail.setDetailValue("9");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "32e768e9b8d040b9bbd718ed13fe1fa5");

		detail = new DictionaryDetailBean();
		detail.setDetailId("c667b31905b24b7598845a43ce0f09e3");
		detail.setDetailName("未审核");
		detail.setDetailRemark(null);
		detail.setDetailValue("1");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "ef98091907ef48a19ab10c9f24e41aad");

		detail = new DictionaryDetailBean();
		detail.setDetailId("1a99610ec65745d3b7f8bc4afb5fb96f");
		detail.setDetailName("已通过");
		detail.setDetailRemark(null);
		detail.setDetailValue("2");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "ef98091907ef48a19ab10c9f24e41aad");

		detail = new DictionaryDetailBean();
		detail.setDetailId("036aa96b46674332b1aad26da4164c41");
		detail.setDetailName("未通过");
		detail.setDetailRemark(null);
		detail.setDetailValue("3");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "ef98091907ef48a19ab10c9f24e41aad");

		detail = new DictionaryDetailBean();
		detail.setDetailId("58d80c40f99948119c19e09230dfc862");
		detail.setDetailName("新西兰自有资金优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("13");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "b9ef45cc0a664e889fd157630fdc521a");

		detail = new DictionaryDetailBean();
		detail.setDetailId("b83f2be26180423790c82de6cbdf57ea");
		detail.setDetailName("新西兰虚拟资金优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("14");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "b9ef45cc0a664e889fd157630fdc521a");

		detail = new DictionaryDetailBean();
		detail.setDetailId("9a0595a57981408186161dae8ab9ff6e");
		detail.setDetailName("未生成");
		detail.setDetailRemark(null);
		detail.setDetailValue("0");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "b28d4a2232234871807699fc713045f4");

		detail = new DictionaryDetailBean();
		detail.setDetailId("c976804edaea4cc7890fc8ae8fc54562");
		detail.setDetailName("生成中");
		detail.setDetailRemark(null);
		detail.setDetailValue("1");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "b28d4a2232234871807699fc713045f4");

		detail = new DictionaryDetailBean();
		detail.setDetailId("68b5709377224299a0109bddb075c512");
		detail.setDetailName("已生成");
		detail.setDetailRemark(null);
		detail.setDetailValue("2");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "b28d4a2232234871807699fc713045f4");

		detail = new DictionaryDetailBean();
		detail.setDetailId("778e450c44af4efc983b54b31c3392bb");
		detail.setDetailName("生成异常,等待补偿");
		detail.setDetailRemark(null);
		detail.setDetailValue("3");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "b28d4a2232234871807699fc713045f4");

		detail = new DictionaryDetailBean();
		detail.setDetailId("deba8fd87c0b48b2989480402c7a9363");
		detail.setDetailName("出错");
		detail.setDetailRemark(null);
		detail.setDetailValue("4");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "b28d4a2232234871807699fc713045f4");

		detail = new DictionaryDetailBean();
		detail.setDetailId("b303a5b31449435499fea873fdb72fc7");
		detail.setDetailName("审批中");
		detail.setDetailRemark(null);
		detail.setDetailValue("5");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "b28d4a2232234871807699fc713045f4");

		detail = new DictionaryDetailBean();
		detail.setDetailId("c1016ee25c7a4874b86ceac9a4c10bbf");
		detail.setDetailName("审批通过");
		detail.setDetailRemark(null);
		detail.setDetailValue("6");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "b28d4a2232234871807699fc713045f4");

		detail = new DictionaryDetailBean();
		detail.setDetailId("c7b4638347544c838e216cc7f4c01097");
		detail.setDetailName("已绑定活动");
		detail.setDetailRemark(null);
		detail.setDetailValue("7");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "b28d4a2232234871807699fc713045f4");

		detail = new DictionaryDetailBean();
		detail.setDetailId("6d5879d4da1e467e8006434ce72db3c2");
		detail.setDetailName("挂起");
		detail.setDetailRemark(null);
		detail.setDetailValue("8");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "b28d4a2232234871807699fc713045f4");

		detail = new DictionaryDetailBean();
		detail.setDetailId("c0891dabf4d64179bef88f0fbda92584");
		detail.setDetailName("废除");
		detail.setDetailRemark(null);
		detail.setDetailValue("9");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "b28d4a2232234871807699fc713045f4");

		detail = new DictionaryDetailBean();
		detail.setDetailId("e5087df09d0745538b68ee8574a8be69");
		detail.setDetailName("是");
		detail.setDetailRemark(null);
		detail.setDetailValue("1");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "5f0a413db99c4c79a50f1762a7565030");

		detail = new DictionaryDetailBean();
		detail.setDetailId("a27bf85b904149e3948a7e16c472ae3c");
		detail.setDetailName("否");
		detail.setDetailRemark(null);
		detail.setDetailValue("0");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "5f0a413db99c4c79a50f1762a7565030");

		detail = new DictionaryDetailBean();
		detail.setDetailId("91aed2f6458444a3b991919b1e79c3d9");
		detail.setDetailName("正常");
		detail.setDetailRemark(null);
		detail.setDetailValue("0");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "239e81805bcf4dfa92039786b3a9d5bf");

		detail = new DictionaryDetailBean();
		detail.setDetailId("ff7e979527494aa3a236f40bd328aadb");
		detail.setDetailName("删除");
		detail.setDetailRemark(null);
		detail.setDetailValue("1");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "239e81805bcf4dfa92039786b3a9d5bf");

		detail = new DictionaryDetailBean();
		detail.setDetailId("a7c349d45d774830901178d7ca52b66d");
		detail.setDetailName("正常");
		detail.setDetailRemark(null);
		detail.setDetailValue("1");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "dd169b753b33421cac398ee5d864f15c");

		detail = new DictionaryDetailBean();
		detail.setDetailId("c358ac75d1884f49bba92bbe99a94f93");
		detail.setDetailName("删除");
		detail.setDetailRemark(null);
		detail.setDetailValue("0");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "dd169b753b33421cac398ee5d864f15c");

		detail = new DictionaryDetailBean();
		detail.setDetailId("212212fc765542568c0d2e808af0816c");
		detail.setDetailName("未审核");
		detail.setDetailRemark(null);
		detail.setDetailValue("1");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "182a926f82ad45439a34c50cda877a32");

		detail = new DictionaryDetailBean();
		detail.setDetailId("be19602502c842cca376071a68178672");
		detail.setDetailName("已通过");
		detail.setDetailRemark(null);
		detail.setDetailValue("2");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "182a926f82ad45439a34c50cda877a32");

		detail = new DictionaryDetailBean();
		detail.setDetailId("140cd1f3f98e49c39e7c8cba362782a1");
		detail.setDetailName("未通过");
		detail.setDetailRemark(null);
		detail.setDetailValue("3");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "182a926f82ad45439a34c50cda877a32");

		detail = new DictionaryDetailBean();
		detail.setDetailId("7d32751a288f4ead99e72c0254bbdc92");
		detail.setDetailName("国内");
		detail.setDetailRemark(null);
		detail.setDetailValue("1");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "9d841f3c7aa84ddabd29c2308adf45e8");

		detail = new DictionaryDetailBean();
		detail.setDetailId("17087de6cdbd4c31b2801f901e147301");
		detail.setDetailName("国际");
		detail.setDetailRemark(null);
		detail.setDetailValue("2");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "9d841f3c7aa84ddabd29c2308adf45e8");

		detail = new DictionaryDetailBean();
		detail.setDetailId("7cc3513c135c4165b2db0b2f4ebc1838");
		detail.setDetailName("韩国");
		detail.setDetailRemark(null);
		detail.setDetailValue("3");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "9d841f3c7aa84ddabd29c2308adf45e8");

		detail = new DictionaryDetailBean();
		detail.setDetailId("87f1d3a35b9e4f228f3140b48ca00177");
		detail.setDetailName("澳洲");
		detail.setDetailRemark(null);
		detail.setDetailValue("4");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "9d841f3c7aa84ddabd29c2308adf45e8");

		detail = new DictionaryDetailBean();
		detail.setDetailId("01f6b3ee84a8443ab2090e3e7127333d");
		detail.setDetailName("新西兰");
		detail.setDetailRemark(null);
		detail.setDetailValue("5");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "9d841f3c7aa84ddabd29c2308adf45e8");

		detail = new DictionaryDetailBean();
		detail.setDetailId("6866771b5c1c4c3c8f9a80676a89132e");
		detail.setDetailName("国内优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("1");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "dcb4196c1948463ca70df5570e94d4de");

		detail = new DictionaryDetailBean();
		detail.setDetailId("379927807b0646e8afb7be7343943a23");
		detail.setDetailName("国际优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("2");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "dcb4196c1948463ca70df5570e94d4de");

		detail = new DictionaryDetailBean();
		detail.setDetailId("ea03f26f09e647069a33c6499e97b672");
		detail.setDetailName("韩国优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("3");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "dcb4196c1948463ca70df5570e94d4de");

		detail = new DictionaryDetailBean();
		detail.setDetailId("d13daac2fd5d4ea7a1dbe921bbfc917e");
		detail.setDetailName("澳洲优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("4");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "dcb4196c1948463ca70df5570e94d4de");

		detail = new DictionaryDetailBean();
		detail.setDetailId("efc3c1e64cf048ae8250863b096f8735");
		detail.setDetailName("新西兰优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("5");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "dcb4196c1948463ca70df5570e94d4de");

		detail = new DictionaryDetailBean();
		detail.setDetailId("c4b2703972d240ea97ea768f19705f25");
		detail.setDetailName("国内合作活动优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("0");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "26329ac5bd1a43d085bd5bf33cccaab0");

		detail = new DictionaryDetailBean();
		detail.setDetailId("cd21efd49ae94702b592e48da4027154");
		detail.setDetailName("航线促销优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("1");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "26329ac5bd1a43d085bd5bf33cccaab0");

		detail = new DictionaryDetailBean();
		detail.setDetailId("cd0f6d0eafae4e7faf25112e40e912ee");
		detail.setDetailName("国内营销活动优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("2");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "26329ac5bd1a43d085bd5bf33cccaab0");

		detail = new DictionaryDetailBean();
		detail.setDetailId("2f1fa96b26bc4cb9b3942185ae4dc9d4");
		detail.setDetailName("国际营销活动优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("3");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "26329ac5bd1a43d085bd5bf33cccaab0");

		detail = new DictionaryDetailBean();
		detail.setDetailId("9e5e8dbd1c2848128ddf4d305a786b2a");
		detail.setDetailName("国际合作活动优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("4");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "26329ac5bd1a43d085bd5bf33cccaab0");

		detail = new DictionaryDetailBean();
		detail.setDetailId("a4d77882723a4664beef96b876a467d9");
		detail.setDetailName("国内里程优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("5");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "26329ac5bd1a43d085bd5bf33cccaab0");

		detail = new DictionaryDetailBean();
		detail.setDetailId("acadb7432c684c8180405e2fa1d651b3");
		detail.setDetailName("国内旅客服务优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("6");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "26329ac5bd1a43d085bd5bf33cccaab0");

		detail = new DictionaryDetailBean();
		detail.setDetailId("4d89da35c6ac4f0fa17929c9a145cb10");
		detail.setDetailName("国际里程优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("7");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "26329ac5bd1a43d085bd5bf33cccaab0");

		detail = new DictionaryDetailBean();
		detail.setDetailId("b4a66e4007704c04ac618c40decab0cb");
		detail.setDetailName("国际旅客服务优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("8");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "26329ac5bd1a43d085bd5bf33cccaab0");

		detail = new DictionaryDetailBean();
		detail.setDetailId("e081dd59ad3e452dbc0e9682fcdb7ebd");
		detail.setDetailName("韩国自有资金优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("9");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "26329ac5bd1a43d085bd5bf33cccaab0");

		detail = new DictionaryDetailBean();
		detail.setDetailId("ab39cdf1e0f24cb7805acdd95077aad1");
		detail.setDetailName("韩国虚拟资金优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("10");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "26329ac5bd1a43d085bd5bf33cccaab0");

		detail = new DictionaryDetailBean();
		detail.setDetailId("d6164606c95d47c4b03fb3632ca39013");
		detail.setDetailName("澳洲自有资金优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("11");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "26329ac5bd1a43d085bd5bf33cccaab0");

		detail = new DictionaryDetailBean();
		detail.setDetailId("b064af338a0842ef8ce4621c27a34ded");
		detail.setDetailName("澳洲虚拟资金优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("12");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "26329ac5bd1a43d085bd5bf33cccaab0");

		detail = new DictionaryDetailBean();
		detail.setDetailId("809fb8a8cf7c40b3a55b562975f6c0ce");
		detail.setDetailName("新西兰自有资金优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("13");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "26329ac5bd1a43d085bd5bf33cccaab0");

		detail = new DictionaryDetailBean();
		detail.setDetailId("2a8eb4b4e7aa476fa41caa8114a1533a");
		detail.setDetailName("新西兰虚拟资金优惠券");
		detail.setDetailRemark(null);
		detail.setDetailValue("14");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "26329ac5bd1a43d085bd5bf33cccaab0");

		detail = new DictionaryDetailBean();
		detail.setDetailId("e8324aa05cb2419c95c6ed0f87b7e76d");
		detail.setDetailName("生成中");
		detail.setDetailRemark(null);
		detail.setDetailValue("1");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "3137cda37b1d4cb695464b0bd4dbb5e9");

		detail = new DictionaryDetailBean();
		detail.setDetailId("3a254eea3dcc42f9970e242c9f104124");
		detail.setDetailName("已生成");
		detail.setDetailRemark(null);
		detail.setDetailValue("2");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "3137cda37b1d4cb695464b0bd4dbb5e9");

		detail = new DictionaryDetailBean();
		detail.setDetailId("49164c028bb34289aa703039a8af3489");
		detail.setDetailName("异常待处理");
		detail.setDetailRemark(null);
		detail.setDetailValue("3");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "3137cda37b1d4cb695464b0bd4dbb5e9");

		detail = new DictionaryDetailBean();
		detail.setDetailId("0fdbcb1cb5c3429f808f9f78efcb246b");
		detail.setDetailName("出错");
		detail.setDetailRemark(null);
		detail.setDetailValue("4");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "3137cda37b1d4cb695464b0bd4dbb5e9");

		detail = new DictionaryDetailBean();
		detail.setDetailId("ea8c094faea84576a01db1ff69ea4595");
		detail.setDetailName("审批中");
		detail.setDetailRemark(null);
		detail.setDetailValue("5");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "3137cda37b1d4cb695464b0bd4dbb5e9");

		detail = new DictionaryDetailBean();
		detail.setDetailId("7bf9b490fced4d52a2ff17f7ac116e85");
		detail.setDetailName("审批通过");
		detail.setDetailRemark(null);
		detail.setDetailValue("6");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "3137cda37b1d4cb695464b0bd4dbb5e9");

		detail = new DictionaryDetailBean();
		detail.setDetailId("f1e65cfca8fe4809882b3d4dbcf42867");
		detail.setDetailName("已绑定活动");
		detail.setDetailRemark(null);
		detail.setDetailValue("7");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "3137cda37b1d4cb695464b0bd4dbb5e9");

		detail = new DictionaryDetailBean();
		detail.setDetailId("ed2f2735937a4dbb8ea3759688689627");
		detail.setDetailName("已挂起");
		detail.setDetailRemark(null);
		detail.setDetailValue("8");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "3137cda37b1d4cb695464b0bd4dbb5e9");

		detail = new DictionaryDetailBean();
		detail.setDetailId("06c5fdbe0aa149f798be0a3082b38df8");
		detail.setDetailName("废除");
		detail.setDetailRemark(null);
		detail.setDetailValue("9");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "3137cda37b1d4cb695464b0bd4dbb5e9");

		detail = new DictionaryDetailBean();
		detail.setDetailId("87f49e631a67465ebfe072a4552b90d6");
		detail.setDetailName("已过期");
		detail.setDetailRemark(null);
		detail.setDetailValue("10");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "3137cda37b1d4cb695464b0bd4dbb5e9");

		detail = new DictionaryDetailBean();
		detail.setDetailId("cf58841be8af44b4807b3aa34ece94c2");
		detail.setDetailName("已过期");
		detail.setDetailRemark(null);
		detail.setDetailValue("10");
		detail = dictionaryDetailRepository.save(detail);
		initDictionaryTypeAndDetail(dictionaryTypeRepository, detail, "f41a7de4ab0a4c73aa1b4d070f328978");

	}

	/**
	 * .*values \('([^']+)','([^']+)','([^']+)'.* type=new
	 * DictionaryTypeBean();type.setTypeName\("\2"\);type.setTypeId\("\1"\);type.setTypeKey\("\3"\);type.setCreateTime\(new
	 * Date\(\)\);list.add\(type\);\n
	 * 
	 * @param ac
	 */
	private static List<DictionaryTypeBean> initDictionaryType() {
		DictionaryTypeBean type = new DictionaryTypeBean();
		List<DictionaryTypeBean> list = new ArrayList<>();

		type.setTypeName("国内优惠券批次:_状态");
		type.setTypeId("98314074444249e8ab097a9ced32559f");
		type.setTypeKey("CouponGroup::_status");
		type.setCreateTime(new Date());
		list.add(type);

		type.setTypeName("国内优惠券批次_线上批次");
		type.setTypeId("56997c8b4ddd459da10536ee5660975b");
		type.setTypeKey("CouponGroup:_isOnline");
		type.setCreateTime(new Date());
		list.add(type);

		type.setTypeName("国内优惠券批次_优惠券类型");
		type.setTypeId("28ba7354fa254eb19fb3edbc79938a9e");
		type.setTypeKey("CouponGroup:_discountType");
		type.setCreateTime(new Date());
		list.add(type);

		type.setTypeName("国际优惠券充值_状态");
		type.setTypeId("2594e5e7ba7b4fd28c73cba9418860be");
		type.setTypeKey("CmcCoupAccounPaymentI18n:_status");
		type.setCreateTime(new Date());
		list.add(type);

		type.setTypeName("国际优惠券批次_状态");
		type.setTypeId("f41a7de4ab0a4c73aa1b4d070f328978");
		type.setTypeKey("CouponGroupI18n:_status");
		type.setCreateTime(new Date());
		list.add(type);

		type.setTypeName("国际优惠券批次_优惠券类型");
		type.setTypeId("021d3175a7b245acaa66307efd57efae");
		type.setTypeKey("CouponGroupI18n:_discountType");
		type.setCreateTime(new Date());
		list.add(type);

		type.setTypeName("国际优惠券批次_线上批次");
		type.setTypeId("d0a53f379bec40fbbc55dc0281d60ab2");
		type.setTypeKey("CouponGroupI18n:_isOnline");
		type.setCreateTime(new Date());
		list.add(type);

		type.setTypeName("澳洲优惠券充值_状态");
		type.setTypeId("3d5b972c731a479482156bc984b30b9c");
		type.setTypeKey("CmcCoupAccountPaymentAUS:_status");
		type.setCreateTime(new Date());
		list.add(type);

		type.setTypeName("澳洲优惠券批次_状态");
		type.setTypeId("3130ca5fbdbe476abce0fbc9724d8007");
		type.setTypeKey("CouponGroupAUS:_status");
		type.setCreateTime(new Date());
		list.add(type);

		type.setTypeName("澳洲优惠券批次_优惠券类型");
		type.setTypeId("c047917c97f5429d895b64a82186f31b");
		type.setTypeKey("CouponGroupAUS:_discountType");
		type.setCreateTime(new Date());
		list.add(type);

		type.setTypeName("国内优惠券账户充值_状态");
		type.setTypeId("b2b2cfbfc71b4985a4b015a56f9666f2");
		type.setTypeKey("CoupAccounPaymentDome:_status");
		type.setCreateTime(new Date());
		list.add(type);

		type.setTypeName("澳洲优惠券批次_线上批次");
		type.setTypeId("a88740842b4e4adf82aeffe01a54f911");
		type.setTypeKey("CouponGroupAUS:_isOnline");
		type.setCreateTime(new Date());
		list.add(type);

		type.setTypeName("韩国优惠券充值_状态");
		type.setTypeId("700b935a1e6e4deeb7d92d835421f44e");
		type.setTypeKey("CmcCoupAccountPaymentKorea:_status");
		type.setCreateTime(new Date());
		list.add(type);

		type.setTypeName("韩国优惠券批次_优惠券类型");
		type.setTypeId("f23129934bd14df3a7d2619400e8333d");
		type.setTypeKey("CouponGroupKorea:_discountType");
		type.setCreateTime(new Date());
		list.add(type);

		type.setTypeName("新西兰优惠券充值_状态");
		type.setTypeId("ef98091907ef48a19ab10c9f24e41aad");
		type.setTypeKey("CmcCoupAccountPaymentNZL:_status");
		type.setCreateTime(new Date());
		list.add(type);

		type.setTypeName("韩国优惠券批次_线上批次");
		type.setTypeId("42868a9935a345feaaa980f83c9b3f4a");
		type.setTypeKey("CouponGroupKorea:_isOnline");
		type.setCreateTime(new Date());
		list.add(type);

		type.setTypeName("韩国优惠券批次_状态");
		type.setTypeId("32e768e9b8d040b9bbd718ed13fe1fa5");
		type.setTypeKey("CouponGroupKorea:_status");
		type.setCreateTime(new Date());
		list.add(type);

		type.setTypeName("新西兰优惠券批次_优惠券类型");
		type.setTypeId("b9ef45cc0a664e889fd157630fdc521a");
		type.setTypeKey("CouponGroupNZL:_discountType");
		type.setCreateTime(new Date());
		list.add(type);

		type.setTypeName("新西兰优惠券批次_状态");
		type.setTypeId("b28d4a2232234871807699fc713045f4");
		type.setTypeKey("CouponGroupNZL:_status");
		type.setCreateTime(new Date());
		list.add(type);

		type.setTypeName("新西兰优惠券批次_线上批次");
		type.setTypeId("5f0a413db99c4c79a50f1762a7565030");
		type.setTypeKey("CouponGroupNZL:_isOnline");
		type.setCreateTime(new Date());
		list.add(type);

		type.setTypeName("发放渠道_状态");
		type.setTypeId("239e81805bcf4dfa92039786b3a9d5bf");
		type.setTypeKey("CouponIssueChannel:_status");
		type.setCreateTime(new Date());
		list.add(type);

		type.setTypeName("运价券与会员直减_状态");
		type.setTypeId("dd169b753b33421cac398ee5d864f15c");
		type.setTypeKey("RateCoupon:_status");
		type.setCreateTime(new Date());
		list.add(type);

		type.setTypeName("优惠券充值查询报表_充值状态");
		type.setTypeId("182a926f82ad45439a34c50cda877a32");
		type.setTypeKey("CmcCoupAccounPayment:_status");
		type.setCreateTime(new Date());
		list.add(type);

		type.setTypeName("优惠券充值查询报表_优惠券类型");
		type.setTypeId("9d841f3c7aa84ddabd29c2308adf45e8");
		type.setTypeKey("CmcCoupAccounPayment:_typeKey");
		type.setCreateTime(new Date());
		list.add(type);

		type.setTypeName("优惠券发放_优惠券类型");
		type.setTypeId("dcb4196c1948463ca70df5570e94d4de");
		type.setTypeKey("CouponIssuRec:_keyType");
		type.setCreateTime(new Date());
		list.add(type);

		type.setTypeName("优惠券报表_优惠券类型");
		type.setTypeId("26329ac5bd1a43d085bd5bf33cccaab0");
		type.setTypeKey("CouponReport:_couponDiscountType");
		type.setCreateTime(new Date());
		list.add(type);

		type.setTypeName("优惠券报表_状态");
		type.setTypeId("3137cda37b1d4cb695464b0bd4dbb5e9");
		type.setTypeKey("CouponReport:_couponReportStatus");
		type.setCreateTime(new Date());
		list.add(type);

		return list;
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

		role = new RoleInfoBean();
		role.setRoleDesc("用户组绑定用户管理");
		role.setRoleName("用户组绑定用户管理");
		role.setText("用户组绑定用户管理");
		role.setLevel(5);
		role.setRoleType("null");
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
//		menu.setResourceUrl("#");
		menu.setLevel(1);
		menuList.add(menu);

		// rsid=0 pid=0
		menu = new MenuConfigInfoBean();
		menu.setId("2");
		menu.setText("功能管理模块");
		menu.setMenuOrder(2);
		// menu.setResource(resourceInfoRepository.findById("0").get());
//		menu.setResourceUrl("#");
		menu.setLevel(1);
		menuList.add(menu);

		// rsid=0 pid=2
		menu = new MenuConfigInfoBean();
		menu.setId("250");
		menu.setText("优惠券模块管理");
		menu.setMenuOrder(1);
		// menu.setResource(resourceInfoRepository.findById("0").get());
//		menu.setResourceUrl("#");
		menu.setLevel(2);
		menuList.add(menu);

		// rsid=37 pid=500
		menu = new MenuConfigInfoBean();
		menu.setId("510");
		menu.setText("调度任务管理");
		menu.setMenuOrder(1);
		menu.setResource(resourceInfoRepository.findById("37").get());
//		menu.setResourceUrl("/authorized/scheduler/access");
		menu.setLevel(3);
		menuList.add(menu);

		// rsid=0 pid=1
		menu = new MenuConfigInfoBean();
		menu.setId("500");
		menu.setText("调度任务模块管理");
		menu.setMenuOrder(2);
		// menu.setResource(resourceInfoRepository.findById("0").get());
//		menu.setResourceUrl("#");
		menu.setLevel(2);
		menuList.add(menu);

		// rsid=0 pid=1
		menu = new MenuConfigInfoBean();
		menu.setId("520");
		menu.setText("用户权限管理");
		menu.setMenuOrder(3);
		// menu.setResource(resourceInfoRepository.findById("0").get());
//		menu.setResourceUrl("#");
		menu.setLevel(2);
		menuList.add(menu);

		// rsid=29 pid=520
		menu = new MenuConfigInfoBean();
		menu.setId("590");
		menu.setText("用户管理");
		menu.setMenuOrder(2);
		menu.setResource(resourceInfoRepository.findById("29").get());
//		menu.setResourceUrl("/authorized/user/access");
		menu.setLevel(3);
		menuList.add(menu);

		// rsid=3 pid=250
		menu = new MenuConfigInfoBean();
		menu.setId("310");
		menu.setText("优惠券虚拟账户管理");
		menu.setMenuOrder(1);
		menu.setResource(resourceInfoRepository.findById("3").get());
//		menu.setResourceUrl("/authorized/couponAccount/access");
		menu.setLevel(3);
		menuList.add(menu);

		// rsid=5 pid=250
		menu = new MenuConfigInfoBean();
		menu.setId("320");
		menu.setText("优惠券批次管理");
		menu.setMenuOrder(2);
		menu.setResource(resourceInfoRepository.findById("5").get());
//		menu.setResourceUrl("/authorized/couponGroup/access");
		menu.setLevel(3);
		menuList.add(menu);

		// rsid=13 pid=250
		menu = new MenuConfigInfoBean();
		menu.setId("330");
		menu.setText("优惠券管理");
		menu.setMenuOrder(3);
		menu.setResource(resourceInfoRepository.findById("13").get());
		// menu.setResourceUrl("/authorized/coupon/access");
		menu.setLevel(3);
		menuList.add(menu);

		// rsid=16 pid=250
		menu = new MenuConfigInfoBean();
		menu.setId("340");
		menu.setText("发放渠道管理");
		menu.setMenuOrder(4);
		menu.setResource(resourceInfoRepository.findById("16").get());
		// menu.setResourceUrl("/authorized/couponIssuingChannel/access");
		menu.setLevel(3);
		menuList.add(menu);

		// rsid=20 pid=250
		menu = new MenuConfigInfoBean();
		menu.setId("350");
		menu.setText("运价券与会员直减关系管理");
		menu.setMenuOrder(5);
		menu.setResource(resourceInfoRepository.findById("20").get());
		// menu.setResourceUrl("/authorized/rateCoupon/access");
		menu.setLevel(3);
		menuList.add(menu);

		// rsid=0 pid=1
		menu = new MenuConfigInfoBean();
		menu.setId("400");
		menu.setText("身份认证模块管理");
		menu.setMenuOrder(1);
		// menu.setResource(resourceInfoRepository.findById("0").get());
		// menu.setResourceUrl("#");
		menu.setLevel(2);
		menuList.add(menu);

		// rsid=25 pid=520
		menu = new MenuConfigInfoBean();
		menu.setId("600");
		menu.setText("用户组管理");
		menu.setMenuOrder(1);
		menu.setResource(resourceInfoRepository.findById("25").get());
		// menu.setResourceUrl("/authorized/group/access");
		menu.setLevel(3);
		menuList.add(menu);

		// rsid=30 pid=400
		menu = new MenuConfigInfoBean();
		menu.setId("460");
		menu.setText("角色管理");
		menu.setMenuOrder(2);
		menu.setResource(resourceInfoRepository.findById("30").get());
		// menu.setResourceUrl("/authorized/role/access");
		menu.setLevel(3);
		menuList.add(menu);

		// rsid=33 pid=400
		menu = new MenuConfigInfoBean();
		menu.setId("470");
		menu.setText("权限管理");
		menu.setMenuOrder(3);
		menu.setResource(resourceInfoRepository.findById("33").get());
		// menu.setResourceUrl("/authorized/permission/access");
		menu.setLevel(3);
		menuList.add(menu);

		// rsid=34 pid=400
		menu = new MenuConfigInfoBean();
		menu.setId("480");
		menu.setText("资源管理");
		menu.setMenuOrder(4);
		menu.setResource(resourceInfoRepository.findById("34").get());
		// menu.setResourceUrl("/authorized/resource/access");
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
	
	private static JobDetailInfoBean initJobInfo() {
		JobDetailInfoBean bean = new JobDetailInfoBean ();
		bean.setJobId("0b7c9f1761f44bb1ae101f9998072ea21");
		bean.setJobName("初始化测试job");
		bean.setJobDesc("初始化job数据");
		bean.setJobCronExp("0 0/10 * * * ?");
		bean.setJobType("sendMsg");
		bean.setJobStatus(0);
		bean.setJobStatusStr("未启动");
		bean.setJobAutoStartId(0);
		bean.setJobAutoStartIdStr("不自动启动");
		bean.setJobEnableInd(1);
		bean.setJobEnableIndStr("已启用");
		bean.setHandler("com.csair.b2c.cmc.core.job.handler.CouponBindSendEmailHandler");
		bean.setHandlerType(0);
		bean.setIsSingleton("1");
		return bean;
	}
}
