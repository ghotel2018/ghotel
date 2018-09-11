package com.ghotel.model.po.order;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.ghotel.model.po.CommonMeta;
import com.ghotel.model.po.Coupon;
import com.ghotel.model.po.OrderDetail;
import com.ghotel.model.po.product.Price;
import com.ghotel.model.po.product.Stock;
import com.ghotel.model.po.user.Contact;
import com.ghotel.model.po.user.User;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.ghotel.model.annotation.CascadeSave;
import com.ghotel.model.constant.DBConstant;

/**
 * @author kekon
 * 订单表
 */
@Document(collection = DBConstant.COLLECTION_NAME_ORDER)
@CompoundIndexes({
		@CompoundIndex(name = "idx_order_orderNo", def = "{'orderNo': 1}"),
		@CompoundIndex(name = "idx_commonMeta_createTime", def = "{'commonMeta.createTime': 1}")
})
public class Order implements Serializable {

	private static final long serialVersionUID = -5602583636664663538L;

	/**
	 * 主键
	 */
	@Id
	private String id;

	/**
	 * 订单号
	 */
	private String orderNo;

	/**
	 * 价格
	 */
	@DBRef
	@CascadeSave
	private Price price;

	/**
	 * 库存
	 */
	@DBRef
	@CascadeSave
	private Stock stock;

	/**
	 * 下单人
	 */
	@DBRef
	@CascadeSave
	private User bookUser;

	/**
	 * 联系人
	 */
	private Contact contact;

	/**
	 * 使用人
	 */
	@DBRef
	@CascadeSave
	private List<User> occupants;

	/**
	 * 总价
	 */
	private Double totalPrice;

	/**
	 * 实际支付价格
	 */
	private Double payPrice;

	/**
	 * 订单状态
	 */
	private OrderStatus status;

	/**
	 * 支付方式
	 */
	private PayWay payWay;

	/**
	 * 优惠券
	 */
	@DBRef
	@CascadeSave
	private Coupon coupon;

	/**
	 * 公共属性
	 */
	private CommonMeta commonMeta;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public Price getPrice() {
		return price;
	}

	public void setPrice(Price price) {
		this.price = price;
	}

	public Stock getStock() {
		return stock;
	}

	public void setStock(Stock stock) {
		this.stock = stock;
	}

	public User getBookUser() {
		return bookUser;
	}

	public void setBookUser(User bookUser) {
		this.bookUser = bookUser;
	}

	public Contact getContact() {
		return contact;
	}

	public void setContact(Contact contact) {
		this.contact = contact;
	}

	public List<User> getOccupants() {
		return occupants;
	}

	public void setOccupants(List<User> occupants) {
		this.occupants = occupants;
	}

	public Double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public Double getPayPrice() {
		return payPrice;
	}

	public void setPayPrice(Double payPrice) {
		this.payPrice = payPrice;
	}

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
	}

	public PayWay getPayWay() {
		return payWay;
	}

	public void setPayWay(PayWay payWay) {
		this.payWay = payWay;
	}

	public Coupon getCoupon() {
		return coupon;
	}

	public void setCoupon(Coupon coupon) {
		this.coupon = coupon;
	}

	public CommonMeta getCommonMeta() {
		return commonMeta;
	}

	public void setCommonMeta(CommonMeta commonMeta) {
		this.commonMeta = commonMeta;
	}

	@Override
	public String toString() {
		final StringBuilder sb = new StringBuilder("{");
		sb.append("\"id\":\"")
				.append(id).append('\"');
		sb.append(",\"orderNo\":\"")
				.append(orderNo).append('\"');
		sb.append(",\"price\":")
				.append(price);
		sb.append(",\"stock\":")
				.append(stock);
		sb.append(",\"bookUser\":")
				.append(bookUser);
		sb.append(",\"contact\":")
				.append(contact);
		sb.append(",\"occupants\":")
				.append(occupants);
		sb.append(",\"totalPrice\":")
				.append(totalPrice);
		sb.append(",\"payPrice\":")
				.append(payPrice);
		sb.append(",\"status\":")
				.append(status);
		sb.append(",\"payWay\":")
				.append(payWay);
		sb.append(",\"coupon\":")
				.append(coupon);
		sb.append(",\"commonMeta\":")
				.append(commonMeta);
		sb.append('}');
		return sb.toString();
	}
}
