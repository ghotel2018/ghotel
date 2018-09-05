package com.ghotel.portal.main;

import java.util.Optional;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.ghotel.model.po.Account;
import com.ghotel.model.po.User;
import com.ghotel.portal.security.repository.AccountRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ShiroTest {
	@Autowired
	AccountRepository accountRepository;

	@Test
	public void testHelloworld() {
		// // 1、获取 SecurityManager 工厂，此处使用 Ini 配置文件初始化 SecurityManager
		// Factory<org.apache.shiro.mgt.SecurityManager> factory = new
		// IniSecurityManagerFactory("classpath:shiro.ini");
		// // 2、得到 SecurityManager 实例 并绑定给 SecurityUtils
		// org.apache.shiro.mgt.SecurityManager securityManager = factory.getInstance();
		// SecurityUtils.setSecurityManager(securityManager);
		// 3、得到 Subject 及创建用户名/密码身份验证 Token(即用户身份/凭证)
		Subject subject = SecurityUtils.getSubject();

		Optional.ofNullable(accountRepository.findFirstByName("zhang")).map(a -> a).orElseGet(() -> {
			Account account = new Account();
			account.setName("zhang");
			account.setPassword("123");

			User user = new User();
			user.setName("name1");
			account.setAssociateUser(user);
			accountRepository.save(account);

			return account;
		});

		UsernamePasswordToken token = new UsernamePasswordToken("zhang", "123");
		try { // 4、登录，即身份验证
			subject.login(token);
		} catch (AuthenticationException e) { // 5、身份验证失败
			e.printStackTrace();
		}
		Assert.assertEquals(true, subject.isAuthenticated()); // 断言用户已经登录
		// 6、退出
		subject.logout();
	}
}
