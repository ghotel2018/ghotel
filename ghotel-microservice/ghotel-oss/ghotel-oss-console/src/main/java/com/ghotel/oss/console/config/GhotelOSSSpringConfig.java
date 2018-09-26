package com.ghotel.oss.console.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.ghotel.core.listener.CascadingMongoEventListener;

@Configuration
public class GhotelOSSSpringConfig {

	@Bean
	public CascadingMongoEventListener ghotelCascadingMongoEventListener(
			@Qualifier("ghotelOSSMongoTemplate") MongoTemplate ghotelOSSMongoTemplate) {
		return new CascadingMongoEventListener();
	}

}
