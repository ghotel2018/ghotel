package com.ghotel.oss.console.core.security.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ghotel.core.annotation.OSSDataSource;
import com.ghotel.oss.console.modules.admin.bean.SystemMessageBean;
@OSSDataSource
public interface SystemMessageRepository extends MongoRepository<SystemMessageBean, String> {

}