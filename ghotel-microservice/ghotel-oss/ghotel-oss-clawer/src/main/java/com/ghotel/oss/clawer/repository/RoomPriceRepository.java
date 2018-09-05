package com.ghotel.oss.clawer.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.ghotel.oss.clawer.po.RoomPricePO;

public interface RoomPriceRepository extends MongoRepository<RoomPricePO, String> {
	public List<RoomPricePO> findByHotelIdAndClawDateStr(String hotelId, String clawDateStr, Sort sort);
}
