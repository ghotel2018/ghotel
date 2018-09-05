package com.ghotel.oss.console.core.common.service;

import java.util.List;

public interface ICommonService<T> {

	public T add(T t) throws Exception;

	public T update(T t) throws Exception;

	public int delete(T t) throws Exception;

	public T get(String id) throws Exception;

	public List<T> getAll();

}
