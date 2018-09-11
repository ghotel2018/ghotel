package com.ghotel.oss.console.core;

import java.util.LinkedHashMap;

import javax.servlet.Filter;

import org.apache.shiro.cache.CacheManager;
import org.apache.shiro.cache.MemoryConstrainedCacheManager;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.session.mgt.SessionManager;
import org.apache.shiro.spring.LifecycleBeanPostProcessor;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.filter.authc.AuthenticatingFilter;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.web.servlet.SimpleCookie;
import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.config.MethodInvokingFactoryBean;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.ghotel.core.config.BaseConfig;
import com.ghotel.oss.console.core.security.GocAuthorizingRealm;
import com.ghotel.oss.console.core.security.filter.ExtendFormAuthenticationFilter;
import com.ghotel.oss.console.core.security.filter.GocPermissionAnnotationMethodInterceptor;

@Configuration
public class GocShiroConfig extends BaseConfig {

	@Bean
	public GocAuthorizingRealm getGoAuthorizingRealm() {
		return new GocAuthorizingRealm();
	}

	@Bean
	public FilterRegistrationBean<ExtendFormAuthenticationFilter> gocAuthenticationFilterRegistration(
			@Qualifier("gocAuthenticationFilter") ExtendFormAuthenticationFilter filter) {
		FilterRegistrationBean<ExtendFormAuthenticationFilter> registration = new FilterRegistrationBean<ExtendFormAuthenticationFilter>(
				filter);
		registration.setEnabled(false);
		return registration;
	}

	// @Bean
	// public FilterRegistrationBean shiroRolesFilterRegistration(
	// @Qualifier("gocAuthenticationFilter") AuthenticatingFilter filter) {
	// FilterRegistrationBean registration = new FilterRegistrationBean(filter);
	// registration.setEnabled(false);
	// return registration;
	// }
	//
	// @Bean
	// public FilterRegistrationBean shiroPermsFilterRegistration(
	// @Qualifier("gocAuthorizationFilter") AuthenticatingFilter filter) {
	// FilterRegistrationBean registration = new FilterRegistrationBean(filter);
	// registration.setEnabled(false);
	// return registration;
	// }

	@Bean("gocAuthenticationFilter")
	public AuthenticatingFilter gocAuthenticationFilter() {
		ExtendFormAuthenticationFilter result = new ExtendFormAuthenticationFilter();

		result.setLoginUrls(new String[] { "/security/login", "/security/ajaxLogin" });
		return result;
	}

	// @Bean("gocAuthenticationFilter")
	// public AuthenticatingFilter gocAuthenticationFilter() {
	// return new GocAuthenticationFilter();
	// }
	//
	// @Bean("gocAuthorizationFilter")
	// public AuthenticatingFilter gocAuthorizationFilter() {
	// return new GocAuthenticationFilter();
	// }

	/**
	 * 开启Shiro的注解(如@RequiresRoles，@RequiresPermissions)，需借助SpringAOP扫描使用Shiro注解的类，并在必要时进行安全逻辑验证
	 * 
	 * @return
	 */
	@Bean
	public LifecycleBeanPostProcessor lifecycleBeanPostProcessor() {
		return new LifecycleBeanPostProcessor();
	}

	/**
	 * 缓存管理
	 * 
	 * @return
	 */
	@Bean
	public CacheManager shiroCacheManager() {
		return new MemoryConstrainedCacheManager();
	}

	// @Bean
	// public SessionDAO sessionDAO() {
	// return new SecurityShiroSessionDao();
	// }

	/**
	 * 指定本系统SESSIONID, 默认为: JSESSIONID 问题: 与SERVLET容器名冲突, 如JETTY, TOMCAT
	 * 等默认JSESSIONID, 当跳出SHIRO SERVLET时如ERROR-PAGE容器会为JSESSIONID重新分配值导致登录会话丢失!
	 * 
	 * @return
	 */
	@Bean
	public SimpleCookie sessionIdCookie() {
		return new SimpleCookie("jeesite.session.id");
	}

	@Bean
	public SessionManager sessionManager(
			/* @Autowired SessionDAO sessionDAO, */ @Autowired SimpleCookie sessionIdCookie) {
		DefaultWebSessionManager bean = new DefaultWebSessionManager();
		// bean.setSessionDAO(sessionDAO);
		bean.setSessionIdCookie(sessionIdCookie);
		bean.setSessionValidationInterval(1800000l);
		bean.setSessionValidationSchedulerEnabled(true);
		bean.setSessionIdCookieEnabled(true);
		return bean;
	}

	@Bean
	public SecurityManager getSecurityManager(@Autowired Realm realm, @Autowired CacheManager cacheManager,
			@Autowired SessionManager sessionManager) {

		DefaultWebSecurityManager defaultSecurityManager = new DefaultWebSecurityManager();
		defaultSecurityManager.setRealm(realm);
		defaultSecurityManager.setSessionManager(sessionManager);
		defaultSecurityManager.setCacheManager(cacheManager);

		// SecurityUtils.setSecurityManager(defaultSecurityManager);
		return defaultSecurityManager;
	}

	@Bean
	public ShiroFilterFactoryBean shiroFilterFactoryBean(@Autowired SecurityManager manager,
			@Qualifier("gocAuthenticationFilter") AuthenticatingFilter gocAuthenticationFilter) {
		ShiroFilterFactoryBean bean = new ShiroFilterFactoryBean();
		bean.setSecurityManager(manager);
		// 配置访问权限
		LinkedHashMap<String, Filter> filters = new LinkedHashMap<>();
		filters.put("authc", gocAuthenticationFilter);
		// filters.put("authc", gocAuthenticationFilter);
		// filters.put("perms", gocAuthorizationFilter);
		bean.setFilters(filters);

		LinkedHashMap<String, String> filterChainDefinitions = new LinkedHashMap<>();
		filterChainDefinitions.put("/*", "anon");
		filterChainDefinitions.put("/cmc/*", "anon");
		filterChainDefinitions.put("/security/*", "authc");
		// filterChainDefinitions.put("/security/ajaxLogin", "authc");
		filterChainDefinitions.put("/authenticated/*", "authc");
		// filterChainDefinitions.put("/authorized/*", "perms");
		bean.setFilterChainDefinitionMap(filterChainDefinitions);
		return bean;
	}

	@Bean
	public MethodInvokingFactoryBean methodInvokingFactoryBean(@Autowired SecurityManager securityManager) {
		MethodInvokingFactoryBean bean = new MethodInvokingFactoryBean();
		bean.setStaticMethod("org.apache.shiro.SecurityUtils.setSecurityManager");
		bean.setArguments(securityManager);
		return bean;
	}

	// 加入注解的使用，不加入这个注解不生效
	@Bean
	public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(
			@Autowired SecurityManager securityManager) {
		AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor = new AuthorizationAttributeSourceAdvisor();
		authorizationAttributeSourceAdvisor.setAdvice(new GocPermissionAnnotationMethodInterceptor());
		authorizationAttributeSourceAdvisor.setSecurityManager(securityManager);
		return authorizationAttributeSourceAdvisor;
	}

}
