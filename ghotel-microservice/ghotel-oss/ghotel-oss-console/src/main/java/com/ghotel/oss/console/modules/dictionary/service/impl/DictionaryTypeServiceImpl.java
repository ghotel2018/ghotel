package com.ghotel.oss.console.modules.dictionary.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import com.ghotel.oss.console.core.common.bean.PaginationBean;
import com.ghotel.oss.console.core.common.service.AbstractPaginationCommonServiceWrapper;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.dictionary.bean.DictionaryTypeBean;
import com.ghotel.oss.console.modules.dictionary.dao.DictionaryTypeRepository;
import com.ghotel.oss.console.modules.dictionary.service.DictionaryTypeService;

@Service
public class DictionaryTypeServiceImpl extends AbstractPaginationCommonServiceWrapper<DictionaryTypeBean>
		implements DictionaryTypeService {

	@Autowired
	DictionaryTypeRepository dictionaryTypeRepository;

	@Override
	public PaginationResult<DictionaryTypeBean> getPaginationResult(PaginationBean object) throws Exception {
		DictionaryTypeBean type = parseSearchObjToEnity(object, DictionaryTypeBean.class);
		if (type.getDetails() == null || type.getDetails().isEmpty()) {
			type.setDetails(null);
		}
		return super.getPaginationResult(Example.of(type, getDefaultExampleMatcher()), object);

	}

	@Override
	protected MongoRepository<DictionaryTypeBean, String> getRepository() {
		return dictionaryTypeRepository;
	}

}
