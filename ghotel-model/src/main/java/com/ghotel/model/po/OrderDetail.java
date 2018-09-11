package com.ghotel.model.po;

import java.util.Date;
import java.util.List;

import com.ghotel.model.po.user.User;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.ghotel.model.annotation.CascadeSave;
import com.ghotel.model.constant.DBConstant;

@Document(collection = DBConstant.COLLECTION_NAME_ORDERDETAIL)
public class OrderDetail {
	@Id
	private String id;
	private Float amount;
	private Date useDate;
	private Float actualPrice;
	private String description;

	@DBRef
	@CascadeSave
	private List<User> contacts;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Float getAmount() {
		return amount;
	}

	public void setAmount(Float amount) {
		this.amount = amount;
	}

	public Date getUseDate() {
		return useDate;
	}

	public void setUseDate(Date useDate) {
		this.useDate = useDate;
	}

	public Float getActualPrice() {
		return actualPrice;
	}

	public void setActualPrice(Float actualPrice) {
		this.actualPrice = actualPrice;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<User> getContacts() {
		return contacts;
	}

	public void setContacts(List<User> contacts) {
		this.contacts = contacts;
	}

}
