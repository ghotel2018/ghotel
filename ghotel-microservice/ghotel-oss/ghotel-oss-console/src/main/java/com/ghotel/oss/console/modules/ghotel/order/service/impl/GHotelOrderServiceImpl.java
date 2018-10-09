package com.ghotel.oss.console.modules.ghotel.order.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import com.ghotel.model.po.order.Order;
import com.ghotel.oss.console.core.common.service.AbstractPaginationCommonServiceWrapper;
import com.ghotel.oss.console.modules.ghotel.order.dao.OrderRepository;
import com.ghotel.oss.console.modules.ghotel.order.service.GHotelOrderService;

@Service
public class GHotelOrderServiceImpl extends AbstractPaginationCommonServiceWrapper<Order>
		implements GHotelOrderService {
	@Autowired
	OrderRepository orderRepository;

	@Override
	protected MongoRepository<Order, String> getRepository() {
		return orderRepository;
	}

}
