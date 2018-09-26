package com.ghotel.model.po.user;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import com.ghotel.model.constant.DBConstant;
import com.ghotel.model.constant.JoinMethod;
import com.ghotel.model.constant.UserType;
import com.ghotel.model.po.BasePO;

/**
 * @author kekon 用户表
 */
@Document(collection = DBConstant.COLLECTION_NAME_USER)
//@CompoundIndexes({
//        @CompoundIndex(name = "idx_user_name", def = "{'name': 1}", unique = true),
//        @CompoundIndex(name = "idx_commonMeta_createTime", def = "{'commonMeta.createTime': 1}")
//})
public class User extends BasePO implements Serializable {

	private static final long serialVersionUID = 8390243233988184211L;

	/**
	 * 姓名
	 */
	private String name;
	/**
	 * 主要证件号码
	 */
	private Certificate mainCertificate;
	/**
	 * 主要联系方式
	 */
	private ContactInfo mainContact;
	/**
	 * 会员等级
	 */
	private Integer level;
	/**
	 * 用户类型
	 */
	private UserType userType;
	/**
	 * 加入会员时间
	 */
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date joinDate;
	/**
	 * 加入会员方式
	 */
	private JoinMethod joinMethod;

	/**
	 * 微信openid
	 */
	private String weChatOpenId;

	/**
	 * 用户证件号码
	 */
	private List<Certificate> certificates;
	/**
	 * 用户联系方式
	 */
	private List<ContactInfo> contacts;

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

	public ContactInfo getMainContact() {
		return mainContact;
	}

	public void setMainContact(ContactInfo mainContact) {
		this.mainContact = mainContact;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public UserType getUserType() {
		return userType;
	}

	public void setUserType(UserType userType) {
		this.userType = userType;
	}

	public Date getJoinDate() {
		return joinDate;
	}

	public void setJoinDate(Date joinDate) {
		this.joinDate = joinDate;
	}

	public JoinMethod getJoinMethod() {
		return joinMethod;
	}

	public void setJoinMethod(JoinMethod joinMethod) {
		this.joinMethod = joinMethod;
	}

	public String getWeChatOpenId() {
		return weChatOpenId;
	}

	public void setWeChatOpenId(String weChatOpenId) {
		this.weChatOpenId = weChatOpenId;
	}

	public List<Certificate> getCertificates() {
		return certificates;
	}

	public void setCertificates(List<Certificate> certificates) {
		this.certificates = certificates;
	}

	public List<ContactInfo> getContacts() {
		return contacts;
	}

	public void setContacts(List<ContactInfo> contacts) {
		this.contacts = contacts;
	}

}
