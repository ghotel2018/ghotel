package com.ghotel.oss.console.modules.ghotel.order.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import com.ghotel.model.po.order.Payment;
import com.ghotel.oss.console.core.common.service.AbstractPaginationCommonServiceWrapper;
import com.ghotel.oss.console.modules.ghotel.order.dao.PaymentRepository;
import com.ghotel.oss.console.modules.ghotel.order.service.GHotelPaymentService;

@Service
public class GHotelPaymentServiceImpl extends AbstractPaginationCommonServiceWrapper<Payment>
		implements GHotelPaymentService {
	@Autowired
	PaymentRepository paymentRepository;

	@Override
	protected MongoRepository<Payment, String> getRepository() {
		return paymentRepository;
	}

}
