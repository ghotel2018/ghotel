package com.ghotel.oss.console.modules.dictionary.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ghotel.core.annotation.OSSDataSource;
import com.ghotel.oss.console.modules.dictionary.bean.DictionaryDetailBean;
@OSSDataSource
public interface DictionaryDetailRepository extends MongoRepository<DictionaryDetailBean, String> {
}
