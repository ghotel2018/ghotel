package com.ghotel.model.po;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.ghotel.model.annotation.CascadeSave;
import com.ghotel.model.constant.DBConstant;

@Document(collection = DBConstant.COLLECTION_NAME_SUPPLIER)
public class Supplier {

	@Id
	private String id;
	private String name;
	@DBRef
	@CascadeSave
	private User contact;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public User getContact() {
		return contact;
	}

	public void setContact(User contact) {
		this.contact = contact;
	}

}
