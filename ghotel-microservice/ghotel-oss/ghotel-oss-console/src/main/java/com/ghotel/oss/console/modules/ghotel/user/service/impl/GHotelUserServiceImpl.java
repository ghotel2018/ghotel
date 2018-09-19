package com.ghotel.oss.console.modules.ghotel.user.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import com.ghotel.model.po.user.User;
import com.ghotel.oss.console.core.common.service.AbstractPaginationCommonServiceWrapper;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.ghotel.user.beam.GHotelUserSearchCriteriaBean;
import com.ghotel.oss.console.modules.ghotel.user.dao.UserRepository;
import com.ghotel.oss.console.modules.ghotel.user.service.GHotelUserService;

@Service
public class GHotelUserServiceImpl extends AbstractPaginationCommonServiceWrapper<User> implements GHotelUserService {
	@Autowired
	UserRepository userRepository;

	@Override
	protected MongoRepository<User, String> getRepository() {
		return userRepository;
	}

	@Override
	public PaginationResult<User> getPaginationResult(GHotelUserSearchCriteriaBean bean) throws Exception {
		// TODO Auto-generated method stub
		return super.getPaginationResult(bean);
	}

}
