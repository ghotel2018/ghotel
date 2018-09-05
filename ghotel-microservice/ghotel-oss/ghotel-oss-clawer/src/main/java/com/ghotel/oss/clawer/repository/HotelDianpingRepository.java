package com.ghotel.oss.clawer.repository;

import com.ghotel.oss.clawer.po.HotelPO;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Created by Administrator on 2018/8/13.
 */
public interface HotelDianpingRepository extends MongoRepository<HotelPO, String> {

    HotelPO findByHotelId(String hotelId);

    List<HotelPO> findByCanBook(Boolean canBook);
}
