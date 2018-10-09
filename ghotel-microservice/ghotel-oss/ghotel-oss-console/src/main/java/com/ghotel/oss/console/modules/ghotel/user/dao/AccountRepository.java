package com.ghotel.oss.console.modules.ghotel.user.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ghotel.model.po.user.Account;

public interface AccountRepository extends MongoRepository<Account, String> {

	public List<Account> findByAssociateUserIsNotNull();
}
