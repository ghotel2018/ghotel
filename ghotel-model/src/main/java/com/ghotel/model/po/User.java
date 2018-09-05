package com.ghotel.model.po;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

import com.ghotel.model.constant.DBConstant;

@Document(collection = DBConstant.COLLECTION_NAME_USER)
@CompoundIndexes({ @CompoundIndex(name = "idx_user_name", def = "{'name': 1}", unique = true) })
public class User {

	@Id
	private String id;
	private String name;
	private Certificate mainCertificate;
	private Contact mainContact;
	private Integer level;
	private Integer userType;
	private Date joinDate;
	private Integer joinMethod;
	private Date createDate;
	private Date lastUpdateDate;

	private List<Certificate> certificates;
	private List<Contact> contacts;

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

	public Certificate getMainCertificate() {
		return mainCertificate;
	}

	public void setMainCertificate(Certificate mainCertificate) {
		this.mainCertificate = mainCertificate;
	}

	public Contact getMainContact() {
		return mainContact;
	}

	public void setMainContact(Contact mainContact) {
		this.mainContact = mainContact;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public Integer getUserType() {
		return userType;
	}

	public void setUserType(Integer userType) {
		this.userType = userType;
	}

	public Date getJoinDate() {
		return joinDate;
	}

	public void setJoinDate(Date joinDate) {
		this.joinDate = joinDate;
	}

	public Integer getJoinMethod() {
		return joinMethod;
	}

	public void setJoinMethod(Integer joinMethod) {
		this.joinMethod = joinMethod;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getLastUpdateDate() {
		return lastUpdateDate;
	}

	public void setLastUpdateDate(Date lastUpdateDate) {
		this.lastUpdateDate = lastUpdateDate;
	}

	public List<Certificate> getCertificates() {
		return certificates;
	}

	public void setCertificates(List<Certificate> certificates) {
		this.certificates = certificates;
	}

	public List<Contact> getContacts() {
		return contacts;
	}

	public void setContacts(List<Contact> contacts) {
		this.contacts = contacts;
	}

}
