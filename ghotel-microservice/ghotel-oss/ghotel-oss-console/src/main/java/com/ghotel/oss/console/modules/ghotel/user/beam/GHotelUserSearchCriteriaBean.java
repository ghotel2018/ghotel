package com.ghotel.oss.console.modules.ghotel.user.beam;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.ghotel.model.constant.JoinMethod;
import com.ghotel.model.constant.UserType;
import com.ghotel.oss.console.core.common.bean.PaginationBean;

public class GHotelUserSearchCriteriaBean extends PaginationBean {

	/**
	 * 姓名
	 */
	private String name;
	/**
	 * 证件号码
	 */
	private String certificateNumber;
	/**
	 * 联系方式
	 */
	private String contactInfo;
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
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date joinDate;
	/**
	 * 加入会员方式
	 */
	private JoinMethod joinMethod;

	/**
	 * 微信openid
	 */
	private String weChatOpenId;

	private Integer deleteFlag;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCertificateNumber() {
		return certificateNumber;
	}

	public void setCertificateNumber(String certificateNumber) {
		this.certificateNumber = certificateNumber;
	}

	public String getContactInfo() {
		return contactInfo;
	}

	public void setContactInfo(String contactInfo) {
		this.contactInfo = contactInfo;
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

	public Integer getDeleteFlag() {
		return deleteFlag;
	}

	public void setDeleteFlag(Integer deleteFlag) {
		this.deleteFlag = deleteFlag;
	}

}
