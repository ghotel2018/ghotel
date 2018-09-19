package com.ghotel.oss.console.core;

import java.util.Collections;

import org.springframework.beans.BeanUtils;
import org.springframework.boot.autoconfigure.domain.EntityScanner;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.annotation.Persistent;
import org.springframework.data.mapping.model.FieldNamingStrategy;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
import org.springframework.data.mongodb.core.convert.DbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultDbRefResolver;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.ghotel.core.annotation.OSSDataSource;
import com.ghotel.core.listener.CascadingMongoEventListener;
import com.mongodb.MongoClient;
import com.mongodb.ServerAddress;

@Configuration
@EnableConfigurationProperties(GhotelMongoProperties.class)
@EnableMongoRepositories(basePackages = "com.ghotel.oss", excludeFilters = {
		@Filter(type = FilterType.ANNOTATION, value = OSSDataSource.class) }, mongoTemplateRef = "ghotelMongoTemplate")
public class GhotelMongodbConfig {

	private final ApplicationContext applicationContext;

	private final GhotelMongoProperties properties;

	public GhotelMongodbConfig(ApplicationContext applicationContext, GhotelMongoProperties properties) {
		this.applicationContext = applicationContext;
		this.properties = properties;
	}

	@Bean
	public MongoClient ghotelMongoClient() {
		return new MongoClient(new ServerAddress(this.properties.getHost(), this.properties.getPort()));
	}

	@Bean
	public SimpleMongoDbFactory ghotelMongoDbFactory() {
		String database = this.properties.getMongoClientDatabase();
		return new SimpleMongoDbFactory(ghotelMongoClient(), database);
	}

	@Bean
	public MongoTemplate ghotelMongoTemplate() {
		MongoTemplate bean = new MongoTemplate(ghotelMongoDbFactory());
		new CascadingMongoEventListener(bean);
		return bean;
	}

	@Bean
	public CascadingMongoEventListener ghotelCascadingMongoEventListener() {
		return new CascadingMongoEventListener(ghotelMongoTemplate());
	}

	@Bean
	public MongoCustomConversions ghotelMongoCustomConversions() {
		return new MongoCustomConversions(Collections.emptyList());
	}

	@Bean
	public MappingMongoConverter ghotelMappingMongoConverter() throws Exception {
		DbRefResolver dbRefResolver = new DefaultDbRefResolver(ghotelMongoDbFactory());
		MappingMongoConverter mappingConverter = new MappingMongoConverter(dbRefResolver, ghotelMongoMappingContext());
		mappingConverter.setCustomConversions(ghotelMongoCustomConversions());
		return mappingConverter;
	}

	@Bean
	public MongoMappingContext ghotelMongoMappingContext() throws ClassNotFoundException {
		MongoMappingContext context = new MongoMappingContext();
		context.setInitialEntitySet(new EntityScanner(this.applicationContext).scan(Document.class, Persistent.class));
		Class<?> strategyClass = this.properties.getFieldNamingStrategy();
		if (strategyClass != null) {
			context.setFieldNamingStrategy((FieldNamingStrategy) BeanUtils.instantiateClass(strategyClass));
		}
		context.setSimpleTypeHolder(ghotelMongoCustomConversions().getSimpleTypeHolder());
		return context;
	}

	@Bean
	public GridFsTemplate gridFsTemplate() {
		return null;
	}
}
