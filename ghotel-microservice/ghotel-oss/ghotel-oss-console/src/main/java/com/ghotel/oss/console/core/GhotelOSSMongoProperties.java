package com.ghotel.oss.console.core;

import org.springframework.boot.autoconfigure.mongo.MongoProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "spring.data.mongodb.oss")
public class GhotelOSSMongoProperties extends MongoProperties {

}
