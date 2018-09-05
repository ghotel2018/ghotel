package com.ghotel.oss.console.core.security.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ghotel.oss.console.modules.admin.bean.ModuleInfoBean;

public interface ModuleInfoRepository extends MongoRepository<ModuleInfoBean, String> {

}