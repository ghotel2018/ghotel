package com.ghotel.oss.console.modules.ghotel.order.bean;

import com.ghotel.model.po.order.OrderStatus;
import com.ghotel.oss.console.core.common.bean.PaginationBean;

public class GHotelOrderSearchCriteriaBean extends PaginationBean {
	private String orderNo;

	private String productName;

	private String bookUserName;

	private String bookUserContact;
	private String bookUserCert;

	private String occupantName;
	private String occupantContact;
	private String occupantCert;

	private OrderStatus status;

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getBookUserName() {
		return bookUserName;
	}

	public void setBookUserName(String bookUserName) {
		this.bookUserName = bookUserName;
	}

	public String getBookUserContact() {
		return bookUserContact;
	}

	public void setBookUserContact(String bookUserContact) {
		this.bookUserContact = bookUserContact;
	}

	public String getBookUserCert() {
		return bookUserCert;
	}

	public void setBookUserCert(String bookUserCert) {
		this.bookUserCert = bookUserCert;
	}

	public String getOccupantName() {
		return occupantName;
	}

	public void setOccupantName(String occupantName) {
		this.occupantName = occupantName;
	}

	public String getOccupantContact() {
		return occupantContact;
	}

	public void setOccupantContact(String occupantContact) {
		this.occupantContact = occupantContact;
	}

	public String getOccupantCert() {
		return occupantCert;
	}

	public void setOccupantCert(String occupantCert) {
		this.occupantCert = occupantCert;
	}

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
	}

}
