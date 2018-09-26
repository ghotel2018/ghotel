package com.ghotel.oss.console.core.common.service;

import java.lang.reflect.ParameterizedType;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.BeanUtilsBean;
import org.apache.commons.beanutils.ConvertUtilsBean;
import org.apache.commons.beanutils.converters.DateConverter;
import org.apache.commons.beanutils.converters.IntegerConverter;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.mapping.MongoPersistentEntity;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.UntypedExampleMatcher;

import com.ghotel.oss.console.core.common.bean.PaginationBean;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;

public abstract class AbstractPaginationCommonServiceWrapper<T> extends AbstractCommonServiceWrapper<T> {
	@Autowired
	private ApplicationContext applicationContext;

	protected MongoOperations getMongoOperations(Class<?> entityClass) {
		Iterator<MongoOperations> mongoOperationsIterator = applicationContext.getBeansOfType(MongoOperations.class)
				.values().iterator();
		while (mongoOperationsIterator.hasNext()) {
			MongoOperations mongoOperations = mongoOperationsIterator.next();

			String collectionName = mongoOperations.getConverter().getMappingContext()
					.getRequiredPersistentEntity(entityClass).getCollection();
			Iterator<? extends MongoPersistentEntity<?>> persistentEntitiesIterator = mongoOperations.getConverter()
					.getMappingContext().getPersistentEntities().iterator();

			while (persistentEntitiesIterator.hasNext()) {
				MongoPersistentEntity<?> entity = persistentEntitiesIterator.next();
				if (entity.getCollection().equals(collectionName)) {
					return mongoOperations;
				}
			}
		}
		return null;
	}

	@SuppressWarnings({ "unchecked", "rawtypes", "hiding" })
	protected T parseSearchObjToEnity(Object source, Class<T> targetClass) throws Exception {
		T t = targetClass.newInstance();
		Map<String, String> map = BeanUtils.describe(source);
		// 将空值置为null，在查询时忽略
		for (String key : map.keySet()) {
			if (StringUtils.isBlank(String.valueOf(map.get(key)))) {
				map.put(key, null);
			}
		}
		ConvertUtilsBean convertUtilsBean = new ConvertUtilsBean() {
			@Override
			public Object convert(String value, Class clazz) {
				if (clazz.isEnum()) {
					return Enum.valueOf(clazz, value);
				} else {
					return super.convert(value, clazz);
				}
			}
		};

		convertUtilsBean.register(new DateConverter(null), java.util.Date.class);
		convertUtilsBean.register(new IntegerConverter(null), Integer.class);
		BeanUtilsBean beanUtilsBean = new BeanUtilsBean(convertUtilsBean);
//		ConvertUtils.register(new DateConverter(null), java.util.Date.class);
//		ConvertUtils.register(new IntegerConverter(null), Integer.class);
//		ConvertUtils.register(new Converter() {
//			@Override
//			public <T> T convert(Class<T> type, Object value) {
//				return (T) Enum.valueOf((Class<Enum>) type, String.valueOf(value));
//			}
//		}, Enum.class);
		beanUtilsBean.populate(t, map);
		return t;
	}

	@SuppressWarnings("unchecked")
	public PaginationResult<T> getPaginationResult(PaginationBean object) throws Exception {
		Class<T> tClass = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass())
				.getActualTypeArguments()[0];
		return getPaginationResult(tClass, object);

	}

	protected ExampleMatcher getDefaultExampleMatcher() {
		return UntypedExampleMatcher.matching().withIgnoreCase().withStringMatcher(StringMatcher.CONTAINING)
				.withIgnoreNullValues();

	}

	protected PaginationResult<T> getPaginationResult(Class<T> clazz, PaginationBean paginationBean) throws Exception {
		T t = parseSearchObjToEnity(paginationBean, clazz);

		return getPaginationResult(Example.of(t, getDefaultExampleMatcher()), paginationBean.getStart(),
				paginationBean.getEnd());
	}

	protected PaginationResult<T> getPaginationResult(Class<T> entityClass, Query query, PaginationBean bean) {
		return getPaginationResult(getMongoOperations(entityClass).find(query, entityClass), bean.getStart(),
				bean.getEnd());
	}

	protected PaginationResult<T> getPaginationResult(Example<T> example, PaginationBean bean) {
		return getPaginationResult(example, bean.getStart(), bean.getEnd());
	}

	protected PaginationResult<T> getPaginationResult(Example<T> example, int start, int end) {

		List<T> result = getRepository().findAll(example);

		int total = (int) getRepository().count(example);
		return getPaginationResult(result, total, start, end);
	}

	protected PaginationResult<T> getPaginationResult(List<T> result, int start, int end) {

		return getPaginationResult(result, result.size(), start, end);
	}

	protected PaginationResult<T> getPaginationResult(List<T> result, int total, int start, int end) {

		if (result.size() < end) {
			end = result.size();
		}

		PaginationResult<T> bean = new PaginationResult<T>();
		bean.setTotal(total);
		if (!(total < end) && total > 0) {
			if (start > total) {
				start = 1;
			}
			result = result.subList(start - 1, end);
		}
		bean.setList(result);
		bean.setNum(end);
		bean.setStart(start);
		return bean;
	}
}
