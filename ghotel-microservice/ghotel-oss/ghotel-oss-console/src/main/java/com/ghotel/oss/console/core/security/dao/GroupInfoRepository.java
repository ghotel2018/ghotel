package com.ghotel.oss.console.core.security.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ghotel.oss.console.core.security.bean.GroupInfoBean;

public interface GroupInfoRepository extends MongoRepository<GroupInfoBean, String> {

	public List<GroupInfoBean> findByGroupTypeIn(List<String> groupTypes);

	public List<GroupInfoBean> findByGroupType(String groupType);

	public List<GroupInfoBean> findByGroupTypeInAndParentIdIsNull(List<String> asList);

}