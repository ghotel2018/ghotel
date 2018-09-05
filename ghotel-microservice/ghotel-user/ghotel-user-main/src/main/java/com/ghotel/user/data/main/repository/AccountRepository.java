package com.ghotel.user.data.main.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ghotel.model.po.Account;

public interface AccountRepository extends MongoRepository<Account, String> {
}
