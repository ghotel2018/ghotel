package com.ghotel.oss.console.modules.dictionary.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ghotel.core.annotation.OSSDataSource;
import com.ghotel.oss.console.modules.dictionary.bean.DictionaryTypeBean;
@OSSDataSource
public interface DictionaryTypeRepository extends MongoRepository<DictionaryTypeBean, String> {

}