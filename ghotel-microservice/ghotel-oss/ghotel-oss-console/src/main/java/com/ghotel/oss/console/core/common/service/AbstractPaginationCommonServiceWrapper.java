package com.ghotel.oss.console.core.common.service;

import java.lang.reflect.ParameterizedType;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.DateConverter;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;

import com.ghotel.oss.console.core.common.bean.PaginationBean;
import com.ghotel.oss.console.core.security.bean.PermissionInfoBean;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;

public abstract class AbstractPaginationCommonServiceWrapper<T> extends AbstractCommonServiceWrapper<T> {

	protected T parseSearchObjToEnity(Object source, Class<T> targetClass) throws Exception {
		T t = targetClass.newInstance();
		Map<String, String> map = BeanUtils.describe(source);
		// 将空值置为null，在查询时忽略
		for (String key : map.keySet()) {
			if (StringUtils.isBlank(map.get(key))) {
				map.put(key, null);
			}
		}
		ConvertUtils.register(new DateConverter(null), java.util.Date.class);
		BeanUtils.populate(t, map);
		return t;
	}

	@SuppressWarnings("unchecked")
	public PaginationResult<T> getPaginationAll(PaginationBean object) throws Exception {
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

		if (t instanceof PermissionInfoBean) {
			((PermissionInfoBean) t).setRelateResource(null);
		}
		return getPaginationResult(Example.of(t, getDefaultExampleMatcher()), paginationBean.getStart(),
				paginationBean.getEnd());
	}

	protected PaginationResult<T> getPaginationResult(Example<T> example, PaginationBean bean) {
		return getPaginationResult(example, bean.getStart(), bean.getEnd());
	}

	protected PaginationResult<T> getPaginationResult(Example<T> example, int start, int end) {

		List<T> result = getRepository().findAll(example);

		int total = (int) getRepository().count(example);
		if (result.size() < end) {
			end = result.size();
		}

		PaginationResult<T> bean = new PaginationResult<T>();
		bean.setTotal(total);
		if (!(total < end) && total > 0) {
			result = result.subList(start - 1, end);
		}
		bean.setList(result);
		bean.setNum(end);
		bean.setStart(start);
		return bean;
	}
}
