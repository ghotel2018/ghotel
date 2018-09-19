package com.ghotel.oss.console.core.security.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ghotel.core.annotation.OSSDataSource;
import com.ghotel.oss.console.modules.admin.bean.ModuleInfoBean;
@OSSDataSource
public interface ModuleInfoRepository extends MongoRepository<ModuleInfoBean, String> {

}