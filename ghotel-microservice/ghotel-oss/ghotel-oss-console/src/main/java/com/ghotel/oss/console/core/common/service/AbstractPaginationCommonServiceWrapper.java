package com.ghotel.oss.console.core.common.service;

import java.lang.reflect.ParameterizedType;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.BeanUtilsBean;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.ConvertUtilsBean;
import org.apache.commons.beanutils.Converter;
import org.apache.commons.beanutils.converters.DateConverter;
import org.apache.commons.beanutils.converters.IntegerConverter;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;

import com.ghotel.oss.console.core.common.bean.PaginationBean;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;

public abstract class AbstractPaginationCommonServiceWrapper<T> extends AbstractCommonServiceWrapper<T> {

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
		return ExampleMatcher.matching().withIgnoreCase().withStringMatcher(StringMatcher.CONTAINING)
				.withIgnoreNullValues();

	}

	protected PaginationResult<T> getPaginationResult(Class<T> clazz, PaginationBean paginationBean) throws Exception {
		T t = parseSearchObjToEnity(paginationBean, clazz);

		return getPaginationResult(Example.of(t, getDefaultExampleMatcher()), paginationBean.getStart(),
				paginationBean.getEnd());
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
			if (start > total || start == total) {
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
