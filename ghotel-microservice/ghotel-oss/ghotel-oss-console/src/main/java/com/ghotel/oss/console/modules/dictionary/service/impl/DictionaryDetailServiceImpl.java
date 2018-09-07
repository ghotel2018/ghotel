package com.ghotel.oss.console.modules.dictionary.service.impl;

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

//	@Override
//	public List<DictionaryDetailBean> getDetailByTypeId(String id) {
//		// TODO Auto-generated method stub
//		return null;
//	}


	@Autowired
	DictionaryDetailRepository dictionaryDetailRepository;

	@Override
	protected MongoRepository<DictionaryDetailBean, String> getRepository() {
		return dictionaryDetailRepository;
	}

}
