package com.ghotel.oss.console.core.security.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ghotel.core.annotation.OSSDataSource;
import com.ghotel.oss.console.core.security.bean.GroupInfoBean;
import com.ghotel.oss.console.core.security.bean.UserInfoBean;

@OSSDataSource
public interface UserInfoRepository extends MongoRepository<UserInfoBean, String> {

	public Optional<UserInfoBean> findFirstByUserLoginId(String userLoginId);

	public List<UserInfoBean> findByGroups(GroupInfoBean group);

}