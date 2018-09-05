package com.ghotel.oss.clawer.po;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "hotel")
public class HotelPO {
    @Id
    private String id;

    private String ota;

    private String hotelId;

    private String hotelName;

    private String hotelLat;

    private String hotelLon;

    private String hotelImg;

    private String hotelAddress;

    private String hotelPoint;

    private String hotelJudgement;

    private String hotelPrice;

    private String hotelZone;

    private String hotelDistrict;
    private Integer roomCount;
    private Boolean canBook;

    private Long minPrice;
    private Long star;
    private Long reviewCount;
    private String distanceText;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOta() {
        return ota;
    }

    public void setOta(String ota) {
        this.ota = ota;
    }

    public String getHotelId() {
        return hotelId;
    }

    public void setHotelId(String hotelId) {
        this.hotelId = hotelId;
    }

    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public String getHotelLat() {
        return hotelLat;
    }

    public void setHotelLat(String hotelLat) {
        this.hotelLat = hotelLat;
    }

    public String getHotelLon() {
        return hotelLon;
    }

    public void setHotelLon(String hotelLon) {
        this.hotelLon = hotelLon;
    }

    public String getHotelImg() {
        return hotelImg;
    }

    public void setHotelImg(String hotelImg) {
        this.hotelImg = hotelImg;
    }

    public String getHotelAddress() {
        return hotelAddress;
    }

    public void setHotelAddress(String hotelAddress) {
        this.hotelAddress = hotelAddress;
    }

    public String getHotelPoint() {
        return hotelPoint;
    }

    public void setHotelPoint(String hotelPoint) {
        this.hotelPoint = hotelPoint;
    }

    public String getHotelJudgement() {
        return hotelJudgement;
    }

    public void setHotelJudgement(String hotelJudgement) {
        this.hotelJudgement = hotelJudgement;
    }

    public String getHotelPrice() {
        return hotelPrice;
    }

    public void setHotelPrice(String hotelPrice) {
        this.hotelPrice = hotelPrice;
    }

    public String getHotelZone() {
        return hotelZone;
    }

    public void setHotelZone(String hotelZone) {
        this.hotelZone = hotelZone;
    }

    public String getHotelDistrict() {
        return hotelDistrict;
    }

    public void setHotelDistrict(String hotelDistrict) {
        this.hotelDistrict = hotelDistrict;
    }

    public Integer getRoomCount() {
        return roomCount;
    }

    public void setRoomCount(Integer roomCount) {
        this.roomCount = roomCount;
    }

    public Boolean getCanBook() {
        return canBook;
    }

    public void setCanBook(Boolean canBook) {
        this.canBook = canBook;
    }

    public Long getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(Long minPrice) {
        this.minPrice = minPrice;
    }

    public Long getStar() {
        return star;
    }

    public void setStar(Long star) {
        this.star = star;
    }

    public Long getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(Long reviewCount) {
        this.reviewCount = reviewCount;
    }

    public String getDistanceText() {
        return distanceText;
    }

    public void setDistanceText(String distanceText) {
        this.distanceText = distanceText;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this)
                .append("id", id)
                .append("ota", ota)
                .append("hotelId", hotelId)
                .append("hotelName", hotelName)
                .append("hotelLat", hotelLat)
                .append("hotelLon", hotelLon)
                .append("hotelImg", hotelImg)
                .append("hotelAddress", hotelAddress)
                .append("hotelPoint", hotelPoint)
                .append("hotelJudgement", hotelJudgement)
                .append("hotelPrice", hotelPrice)
                .append("hotelZone", hotelZone)
                .append("hotelDistrict", hotelDistrict)
                .append("roomCount", roomCount)
                .append("canBook", canBook)
                .append("minPrice", minPrice)
                .append("star", star)
                .append("reviewCount", reviewCount)
                .append("distanceText", distanceText)
                .toString();
    }
}
