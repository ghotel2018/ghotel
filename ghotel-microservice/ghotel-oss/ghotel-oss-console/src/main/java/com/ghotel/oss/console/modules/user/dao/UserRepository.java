package com.ghotel.oss.console.modules.user.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ghotel.model.po.user.User;

public interface UserRepository extends MongoRepository<User, String> {
}
