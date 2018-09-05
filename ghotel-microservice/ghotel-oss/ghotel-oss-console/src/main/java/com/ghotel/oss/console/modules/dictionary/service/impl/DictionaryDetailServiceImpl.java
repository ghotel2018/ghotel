package com.ghotel.oss.console.modules.dictionary.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import com.ghotel.oss.console.core.common.service.AbstractPaginationCommonServiceWrapper;
import com.ghotel.oss.console.modules.dictionary.bean.DictionaryDetailBean;
import com.ghotel.oss.console.modules.dictionary.dao.DictionaryDetailRepository;
import com.ghotel.oss.console.modules.dictionary.service.DictionaryDetailService;

@Service
public class DictionaryDetailServiceImpl extends AbstractPaginationCommonServiceWrapper<DictionaryDetailBean>
		implements DictionaryDetailService {

	@Override
	public List<DictionaryDetailBean> getDetailByTypeId(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected MongoRepository<DictionaryDetailBean, String> getRepository() {
		// TODO Auto-generated method stub
		return null;
	}
//	@Autowired
//	DictionaryDetailRepository dictionaryDetailRepository;
//
//	@Override
//	public List<DictionaryDetailBean> getDetailByTypeId(String id) {
//		return dictionaryDetailRepository.findByTypeId(id);
//	}
//
//	@Override
//	protected MongoRepository<DictionaryDetailBean, String> getRepository() {
//		return dictionaryDetailRepository;
//	}

}
