package com.ghotel.oss.console.modules.ghotel.order.bean;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.ghotel.model.po.order.PayStatus;
import com.ghotel.oss.console.core.common.bean.PaginationBean;

public class GHotelPaymentSearchCriteriaBean extends PaginationBean {
	/**
	 * 支付单号
	 */
	private String payNo;

	/**
	 * 订单号
	 */
	private String orderNo;

	/**
	 * 支付网关
	 */
	private String payGateway;

	/**
	 * 支付状态
	 */
	private PayStatus status;

	/**
	 * 回调结果
	 */
	private String callBackResult;

	/**
	 * 回调时间
	 */
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date callBackTime;

	public String getPayNo() {
		return payNo;
	}

	public void setPayNo(String payNo) {
		this.payNo = payNo;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getPayGateway() {
		return payGateway;
	}

	public void setPayGateway(String payGateway) {
		this.payGateway = payGateway;
	}

	public PayStatus getStatus() {
		return status;
	}

	public void setStatus(PayStatus status) {
		this.status = status;
	}

	public String getCallBackResult() {
		return callBackResult;
	}

	public void setCallBackResult(String callBackResult) {
		this.callBackResult = callBackResult;
	}

	public Date getCallBackTime() {
		return callBackTime;
	}

	public void setCallBackTime(Date callBackTime) {
		this.callBackTime = callBackTime;
	}

}
