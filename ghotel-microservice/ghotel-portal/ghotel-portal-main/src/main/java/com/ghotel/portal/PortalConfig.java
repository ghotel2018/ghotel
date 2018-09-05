package com.ghotel.portal;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.mgt.DefaultSecurityManager;
import org.apache.shiro.realm.Realm;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.ghotel.core.config.BaseConfig;
import com.ghotel.portal.security.realm.MongoDBRealm;

@Configuration
public class PortalConfig extends BaseConfig {

	@Bean
	public Realm getMongoDBRealm() {
		return new MongoDBRealm();
	}

	@Bean
	public DefaultSecurityManager getSecurityManager() {
		DefaultSecurityManager defaultSecurityManager = new DefaultSecurityManager();
		defaultSecurityManager.setRealm(getMongoDBRealm());

		SecurityUtils.setSecurityManager(defaultSecurityManager);
		return defaultSecurityManager;
	}
}
