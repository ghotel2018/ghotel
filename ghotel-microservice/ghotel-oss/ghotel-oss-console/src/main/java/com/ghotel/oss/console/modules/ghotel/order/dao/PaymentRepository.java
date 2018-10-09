package com.ghotel.oss.console.modules.ghotel.order.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ghotel.model.po.order.Payment;

public interface PaymentRepository extends MongoRepository<Payment, String> {

}
