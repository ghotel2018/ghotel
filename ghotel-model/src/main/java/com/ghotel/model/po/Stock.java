package com.ghotel.model.po;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.ghotel.model.constant.DBConstant;

@Document(collection = DBConstant.COLLECTION_NAME_STOCK)
public class Stock {
	@Id
	private String id;
	private Date usedDate;
	private Long totalAmount;
	private Long leftAmount;

	@DBRef
	private Price price;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Price getPrice() {
		return price;
	}

	public void setPrice(Price price) {
		this.price = price;
	}

	public Date getUsedDate() {
		return usedDate;
	}

	public void setUsedDate(Date usedDate) {
		this.usedDate = usedDate;
	}

	public Long getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Long totalAmount) {
		this.totalAmount = totalAmount;
	}

	public Long getLeftAmount() {
		return leftAmount;
	}

	public void setLeftAmount(Long leftAmount) {
		this.leftAmount = leftAmount;
	}

}
