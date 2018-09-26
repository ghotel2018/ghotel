package com.ghotel.oss.console.modules.ghotel.user.service.impl;

import org.apache.commons.httpclient.util.DateUtil;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
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
		// example渲染时忽略contacts与certificates，对上述两种需手动生成相关查询条件
		ExampleMatcher exampleMatcher = getDefaultExampleMatcher().withIgnorePaths("contacts")
				.withIgnorePaths("certificates");
		Query query = new Query(
				new Criteria().alike(Example.of(parseSearchObjToEnity(bean, User.class), exampleMatcher)));

		if (StringUtils.isNotBlank(bean.getContactInfo())) {
			query.addCriteria(Criteria.where("contacts.value").regex(".*" + bean.getContactInfo() + ".*")
					.orOperator(Criteria.where("contacts.value").regex(".*" + bean.getContactInfo() + ".*")));
		}
		if (StringUtils.isNotBlank(bean.getCertificateNumber())) {
			query.addCriteria(Criteria.where("certificates.number").regex(".*" + bean.getCertificateNumber() + ".*")
					.orOperator(Criteria.where("contacts.value").regex(".*" + bean.getCertificateNumber() + ".*")));
		}
		if (bean.getJoinDate() != null) {
			query.addCriteria(Criteria.where("joinDate").gte(bean.getJoinDate())
					.andOperator(Criteria.where("joinDate").lt(DateUtils.addDays(bean.getJoinDate(), 1))));
		}
		return super.getPaginationResult(User.class, query, bean);
	}

}
