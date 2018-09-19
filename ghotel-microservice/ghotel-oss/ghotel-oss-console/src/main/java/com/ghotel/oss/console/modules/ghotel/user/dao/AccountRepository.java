package com.ghotel.oss.console.modules.ghotel.user.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ghotel.model.po.user.Account;

public interface AccountRepository extends MongoRepository<Account, String> {
}
