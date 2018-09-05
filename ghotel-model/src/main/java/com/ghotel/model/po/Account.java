package com.ghotel.model.po;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.ghotel.model.annotation.CascadeSave;
import com.ghotel.model.constant.DBConstant;

@Document(collection = DBConstant.COLLECTION_NAME_ACCOUNT)
@CompoundIndexes({ @CompoundIndex(name = "idx_account_name", def = "{'name': 1}", unique = true) })
public class Account {

	@Id
	private String id;
	private String name;
	private String password;
	private Date createDate;
	private Integer registertype;
	private Integer state;
	private Date lastUpdateDate;

	@DBRef
	@CascadeSave
	private User associateUser;

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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public User getAssociateUser() {
		return associateUser;
	}

	public void setAssociateUser(User associateUser) {
		this.associateUser = associateUser;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Integer getRegistertype() {
		return registertype;
	}

	public void setRegistertype(Integer registertype) {
		this.registertype = registertype;
	}

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}

	public Date getLastUpdateDate() {
		return lastUpdateDate;
	}

	public void setLastUpdateDate(Date lastUpdateDate) {
		this.lastUpdateDate = lastUpdateDate;
	}

}
