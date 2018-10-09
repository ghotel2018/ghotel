package com.ghotel.oss.console.modules.ghotel.user.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import com.ghotel.model.po.user.Account;
import com.ghotel.oss.console.core.common.service.AbstractPaginationCommonServiceWrapper;
import com.ghotel.oss.console.modules.ghotel.user.dao.AccountRepository;
import com.ghotel.oss.console.modules.ghotel.user.service.GHotelAccountService;

@Service
public class GHotelAccountServiceImpl extends AbstractPaginationCommonServiceWrapper<Account>
		implements GHotelAccountService {
	@Autowired
	AccountRepository accountRepository;

	@Override
	protected MongoRepository<Account, String> getRepository() {
		return accountRepository;
	}

	@Override
	public List<Account> getUnbindUserAccount() {
		return accountRepository.findByAssociateUserIsNotNull();
	}

}
