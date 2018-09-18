package com.ghotel.core.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoOperations;

import com.ghotel.core.listener.CascadingMongoEventListener;

public class BaseConfig {

	@ConditionalOnMissingBean
	@Bean
	public CascadingMongoEventListener getCascadingMongoEventListener(@Autowired MongoOperations MongoOperations) {
		return new CascadingMongoEventListener(MongoOperations);
	}
}
