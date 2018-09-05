package com.ghotel.model.po;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.ghotel.model.annotation.CascadeSave;
import com.ghotel.model.constant.DBConstant;

@Document(collection = DBConstant.COLLECTION_NAME_ORDER)
public class Order {
	@Id
	private String id;
	private Float totalPrice;
	private Integer payway;
	private String description;
	private Integer channel;
	private Integer type;
	private Date createDate;
	private Date lastUpdateDate;

	@DBRef
	@CascadeSave
	private User bookUser;

	@DBRef
	private List<Coupon> couponId;
	@DBRef
	private List<OrderDetail> details;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public User getBookUser() {
		return bookUser;
	}

	public void setBookUser(User bookUser) {
		this.bookUser = bookUser;
	}

	public Float getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Float totalPrice) {
		this.totalPrice = totalPrice;
	}

	public Integer getPayway() {
		return payway;
	}

	public void setPayway(Integer payway) {
		this.payway = payway;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getChannel() {
		return channel;
	}

	public void setChannel(Integer channel) {
		this.channel = channel;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
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

	public List<Coupon> getCouponId() {
		return couponId;
	}

	public void setCouponId(List<Coupon> couponId) {
		this.couponId = couponId;
	}

	public List<OrderDetail> getDetails() {
		return details;
	}

	public void setDetails(List<OrderDetail> details) {
		this.details = details;
	}

}
