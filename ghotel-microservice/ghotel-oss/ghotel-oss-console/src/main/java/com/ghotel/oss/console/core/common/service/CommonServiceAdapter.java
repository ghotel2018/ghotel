package com.ghotel.oss.console.core.common.service;

import java.util.List;

import com.ghotel.oss.console.core.common.dao.ICommonDao;

public class CommonServiceAdapter  {

	protected ICommonDao mapper;
	
	public int add(Object object) {
		return mapper.add(object);
	}

	public int update(Object object) {
		return mapper.update(object);
	}

	public int delete(Object object) {
		return mapper.delete(object);
	}

	public Object get(Object id) {
		return mapper.get(id);
	}

	public List<?> getAll(Object object) {
		return mapper.getAll(object);
	}
	

	public CommonServiceAdapter(ICommonDao mapper){
		this.mapper = mapper;
	}
	 
	
}
