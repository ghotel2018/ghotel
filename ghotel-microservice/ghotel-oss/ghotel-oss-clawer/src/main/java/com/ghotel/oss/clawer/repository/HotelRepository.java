package com.ghotel.oss.clawer.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ghotel.oss.clawer.po.HotelPO;

public interface HotelRepository extends MongoRepository<HotelPO, String> {
	public HotelPO findByHotelId(String hotelId);

	public List<HotelPO> findByCanBook(Boolean canBook);
}
