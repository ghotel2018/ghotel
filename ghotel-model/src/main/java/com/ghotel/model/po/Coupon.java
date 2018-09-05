package com.ghotel.model.po;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.ghotel.model.constant.DBConstant;

@Document(collection = DBConstant.COLLECTION_NAME_COUPON)
public class Coupon {
	@Id
	private String id;
}
