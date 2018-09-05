package com.ghotel.core.config;

import org.springframework.context.annotation.Bean;

import com.ghotel.core.listener.CascadingMongoEventListener;

public class BaseConfig {

	@Bean
	public CascadingMongoEventListener getCascadingMongoEventListener() {
		return new CascadingMongoEventListener();
	}
}
