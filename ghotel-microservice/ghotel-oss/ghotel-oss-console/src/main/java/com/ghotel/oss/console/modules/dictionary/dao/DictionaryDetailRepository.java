package com.ghotel.oss.console.modules.dictionary.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ghotel.oss.console.modules.dictionary.bean.DictionaryDetailBean;

public interface DictionaryDetailRepository extends MongoRepository<DictionaryDetailBean, String> {
}