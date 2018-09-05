package com.ghotel.oss.console.core.common.service;

import com.ghotel.oss.console.core.common.dao.ICommonDao;

public class CommonPagintionServiceAdapter extends CommonServiceAdapter {
	

	public CommonPagintionServiceAdapter(ICommonDao mapper){
		super(mapper);
	}

	//
	// public PaginationResult getPaginationAll(Object object){
	// PaginationResult pr = new PaginationResult();
	// pr.setTotal(((IPaginationDao)mapper).countAll(object));
	// pr.setNum(((PaginationBean)object).getEnd());
	// if(((PaginationBean)object).getEnd()==0){
	// ((PaginationBean)object).setEnd(pr.getTotal());
	// }
	// pr.setStart(((PaginationBean)object).getStart());
	// pr.setList(super.getAll(object));
	// return pr;
	// }
	// public int countAll(Object object){
	// return ((IPaginationDao)mapper).countAll(object);
	// }
}
