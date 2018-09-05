package com.ghotel.oss.console.modules.admin.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import com.ghotel.oss.console.core.common.service.AbstractPaginationCommonServiceWrapper;
import com.ghotel.oss.console.core.logging.annotation.GocLogAnnotation;
import com.ghotel.oss.console.core.security.dao.SystemMessageRepository;
import com.ghotel.oss.console.modules.admin.bean.SystemMessageBean;
import com.ghotel.oss.console.modules.admin.service.SystemMessageService;

@GocLogAnnotation(moduleId = "systemMessage")
@Service
public class GocSystemMessageServiceImpl extends AbstractPaginationCommonServiceWrapper<SystemMessageBean>
		implements SystemMessageService {

	@Autowired
	SystemMessageRepository systemMessageRepository;

	@Override
	protected MongoRepository<SystemMessageBean, String> getRepository() {
		return systemMessageRepository;
	}

}
