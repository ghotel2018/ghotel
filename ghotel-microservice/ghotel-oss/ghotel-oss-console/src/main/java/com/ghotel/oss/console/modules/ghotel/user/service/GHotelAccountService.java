package com.ghotel.oss.console.modules.ghotel.user.service;

import java.util.List;

import com.ghotel.model.po.user.Account;
import com.ghotel.oss.console.core.common.service.ICommonPaginationService;

public interface GHotelAccountService extends ICommonPaginationService<Account> {

	public List<Account> getUnbindUserAccount();

}
