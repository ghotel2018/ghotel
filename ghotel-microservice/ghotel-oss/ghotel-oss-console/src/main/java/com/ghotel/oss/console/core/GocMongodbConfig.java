package com.ghotel.oss.console.core;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.ghotel.core.config.BaseConfig;

@Configuration
@EnableMongoRepositories(basePackages = "com.ghotel.oss")
public class GocMongodbConfig extends BaseConfig {

}
