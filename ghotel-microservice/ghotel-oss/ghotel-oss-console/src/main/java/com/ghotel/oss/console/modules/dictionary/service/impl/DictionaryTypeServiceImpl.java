package com.ghotel.oss.console.modules.dictionary.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import com.ghotel.oss.console.core.common.service.AbstractPaginationCommonServiceWrapper;
import com.ghotel.oss.console.modules.dictionary.bean.DictionaryTypeBean;
import com.ghotel.oss.console.modules.dictionary.dao.DictionaryTypeRepository;
import com.ghotel.oss.console.modules.dictionary.service.DictionaryTypeService;

@Service
public class DictionaryTypeServiceImpl extends AbstractPaginationCommonServiceWrapper<DictionaryTypeBean>
		implements DictionaryTypeService {

	@Override
	protected MongoRepository<DictionaryTypeBean, String> getRepository() {
		// TODO Auto-generated method stub
		return null;
	}
	// @Autowired
	// DictionaryTypeRepository dictionaryTypeRepository;
	//
	// @Override
	// protected MongoRepository<DictionaryTypeBean, String> getRepository() {
	// return dictionaryTypeRepository;
	// }

}
