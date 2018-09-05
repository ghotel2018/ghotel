package com.ghotel.oss.clawer.po;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "roomPrice")
public class RoomPricePO {
	@Id
	String id;
	String roomId;
	String roomName;
	String hotelId;

	Date priceDate;
	String priceDateStr;

	Date clawDate;
	String clawDateStr;

	List<PricePO> priceList;

	public String getClawDateStr() {
		return clawDateStr;
	}

	public void setClawDateStr(String clawDateStr) {
		this.clawDateStr = clawDateStr;
	}

	public String getHotelId() {
		return hotelId;
	}

	public String getPriceDateStr() {
		return priceDateStr;
	}

	public void setPriceDateStr(String priceDateStr) {
		this.priceDateStr = priceDateStr;
	}

	public void setHotelId(String hotelId) {
		this.hotelId = hotelId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getRoomId() {
		return roomId;
	}

	public void setRoomId(String roomId) {
		this.roomId = roomId;
	}

	public String getRoomName() {
		return roomName;
	}

	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}

	public List<PricePO> getPriceList() {
		return priceList;
	}

	public void setPriceList(List<PricePO> priceList) {
		this.priceList = priceList;
	}

	public Date getPriceDate() {
		return priceDate;
	}

	public void setPriceDate(Date priceDate) {
		this.priceDate = priceDate;
	}

	public Date getClawDate() {
		return clawDate;
	}

	public void setClawDate(Date clawDate) {
		this.clawDate = clawDate;
	}
}
