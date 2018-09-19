package com.ghotel.oss.console.config;

import java.util.Collections;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.domain.EntityScanner;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.annotation.Persistent;
import org.springframework.data.mapping.model.FieldNamingStrategy;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
import org.springframework.data.mongodb.core.convert.DbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultDbRefResolver;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.ghotel.core.annotation.OSSDataSource;
import com.ghotel.core.listener.CascadingMongoEventListener;
import com.mongodb.MongoClient;
import com.mongodb.ServerAddress;

@Configuration
@EnableConfigurationProperties(GhotelOSSMongoProperties.class)
@EnableMongoRepositories(basePackages = "com.ghotel.oss", includeFilters = {
		@Filter(type = FilterType.ANNOTATION, value = OSSDataSource.class) }, mongoTemplateRef = "ghotelOSSMongoTemplate")
public class GhotelOSSMongodbConfig {

	private final ApplicationContext applicationContext;

	private final GhotelOSSMongoProperties properties;

	public GhotelOSSMongodbConfig(ApplicationContext applicationContext, GhotelOSSMongoProperties properties) {
		this.applicationContext = applicationContext;
		this.properties = properties;
	}

	@Bean("ghotelOSSMongoClient")
	public MongoClient ghotelOSSMongoClient() {
		return new MongoClient(new ServerAddress(this.properties.getHost(), this.properties.getPort()));
	}

	@Bean("ghotelOSSMongoDbFactory")
	public SimpleMongoDbFactory ghotelOSSMongoDbFactory(
			@Qualifier("ghotelOSSMongoClient") MongoClient ghotelOSSMongoClient) {
		String database = this.properties.getMongoClientDatabase();
		return new SimpleMongoDbFactory(ghotelOSSMongoClient, database);
	}

	@Bean("ghotelOSSMongoTemplate")
	public MongoTemplate ghotelOSSMongoTemplate(
			@Qualifier("ghotelOSSMongoDbFactory") MongoDbFactory ghotelOSSMongoDbFactory) {
		MongoTemplate bean = new MongoTemplate(ghotelOSSMongoDbFactory);
		new CascadingMongoEventListener(bean);
		return bean;
	}

	@Bean
	public CascadingMongoEventListener ghotelCascadingMongoEventListener(
			@Qualifier("ghotelOSSMongoTemplate") MongoTemplate ghotelOSSMongoTemplate) {
		return new CascadingMongoEventListener(ghotelOSSMongoTemplate);
	}

	@Bean("ghotelOSSMongoCustomConversions")
	public MongoCustomConversions ghotelOSSMongoCustomConversions() {
		return new MongoCustomConversions(Collections.emptyList());
	}

	@Bean
	public MappingMongoConverter ghotelOSSMappingMongoConverter(
			@Qualifier("ghotelOSSMongoDbFactory") MongoDbFactory ghotelOSSMongoDbFactory,
			@Qualifier("ghotelOSSMongoMappingContext") MongoMappingContext ghotelOSSMongoMappingContext,
			@Qualifier("ghotelOSSMongoCustomConversions") MongoCustomConversions ghotelOSSMongoCustomConversions)
			throws Exception {
		DbRefResolver dbRefResolver = new DefaultDbRefResolver(ghotelOSSMongoDbFactory);
		MappingMongoConverter mappingConverter = new MappingMongoConverter(dbRefResolver, ghotelOSSMongoMappingContext);
		mappingConverter.setCustomConversions(ghotelOSSMongoCustomConversions);
		return mappingConverter;
	}

	@Bean("ghotelOSSMongoMappingContext")
	public MongoMappingContext ghotelOSSMongoMappingContext(
			@Qualifier("ghotelOSSMongoCustomConversions") MongoCustomConversions ghotelOSSMongoCustomConversions)
			throws ClassNotFoundException {
		MongoMappingContext context = new MongoMappingContext();
		context.setInitialEntitySet(new EntityScanner(this.applicationContext).scan(Document.class, Persistent.class));
		Class<?> strategyClass = this.properties.getFieldNamingStrategy();
		if (strategyClass != null) {
			context.setFieldNamingStrategy((FieldNamingStrategy) BeanUtils.instantiateClass(strategyClass));
		}
		context.setSimpleTypeHolder(ghotelOSSMongoCustomConversions.getSimpleTypeHolder());
		return context;
	}

}
