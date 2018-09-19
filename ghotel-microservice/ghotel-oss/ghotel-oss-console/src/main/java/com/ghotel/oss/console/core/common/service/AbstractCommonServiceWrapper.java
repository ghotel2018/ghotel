package com.ghotel.oss.console.core.common.service;

import java.util.List;

import org.springframework.data.domain.Example;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.ghotel.oss.console.core.logging.annotation.GocLogAnnotation;

public abstract class AbstractCommonServiceWrapper<T> implements ICommonService<T> {

	protected abstract MongoRepository<T, String> getRepository();

	@GocLogAnnotation(description = "新增")
	public T add(T t) throws Exception {
		return getRepository().save(t);
	}

	@GocLogAnnotation(description = "更新")
	public T update(T t) throws Exception {
		return getRepository().save(t);
	}

	@GocLogAnnotation(description = "删除")
	public int delete(T t) throws Exception {
		int count = (int) getRepository().count(Example.of(t));
		getRepository().delete(t);
		return count;
	}

	public T get(String id) throws Exception {
		return getRepository().findById(id).get();
	}

	public List<T> getAll() {

		return getRepository().findAll();
	}

}
