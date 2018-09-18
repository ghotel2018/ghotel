package com.ghotel.model.po.hotel;

import com.ghotel.model.constant.DBConstant;
import com.ghotel.model.po.CommonMeta;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Arrays;
import java.util.List;

/**
 * @author kekon
 * 酒店Bean
 */
@Document(collection = DBConstant.COLLECTION_NAME_HOTEL)
//@CompoundIndexes({
//        @CompoundIndex(name = "idx_hotel_name", def = "{'name': 1}"),
//        @CompoundIndex(name = "idx_hotel_cityAndArea", def = "{'city': 1,'area':1}"),
//        @CompoundIndex(name = "idx_hotel_longitude", def = "{'longitude': 1}"),
//        @CompoundIndex(name = "idx_hotel_latitude", def = "{'latitude': 1}"),
//        @CompoundIndex(name = "idx_hotel_tags", def = "{'tags': 1}"),
//        @CompoundIndex(name = "idx_commonMeta_createTime", def = "{'commonMeta.createTime': 1}")
//})
public class Hotel implements Serializable {

    private static final long serialVersionUID = 3093675456474044960L;

    /**
     * 主键
     */
    @Id
    private String id;

    /**
     * 酒店名称
     */
    private String name;

    /**
     * 酒店地址
     */
    private String address;

    /**
     * 所属城市
     */
    private String city;

    /**
     * 所属行政区域
     */
    private String area;

    /**
     * 总房间数量
     */
    private Integer totalRoom;

    /**
     * 总面积大小（单位：m2）
     */
    private Double totalSquare;

    /**
     * 总层数
     */
    private Integer totalFloor;

    /**
     * 楼层列表
     */
    private String[] floors;

    /**
     * 所属商圈
     */
    private String shoppingDistrict;

    /**
     * 酒店星级
     */
    private String star;

    /**
     * 经度
     */
    private Double longitude;

    /**
     * 纬度
     */
    private Double latitude;

    /**
     * 酒店标签
     */
    private String[] tags;

    /**
     *  房型以及库存
     */
    private List<HotelRoom> rooms;

    /**
     * 公用属性
     */
    private CommonMeta commonMeta;

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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public Integer getTotalRoom() {
        return totalRoom;
    }

    public void setTotalRoom(Integer totalRoom) {
        this.totalRoom = totalRoom;
    }

    public Double getTotalSquare() {
        return totalSquare;
    }

    public void setTotalSquare(Double totalSquare) {
        this.totalSquare = totalSquare;
    }

    public Integer getTotalFloor() {
        return totalFloor;
    }

    public void setTotalFloor(Integer totalFloor) {
        this.totalFloor = totalFloor;
    }

    public String[] getFloors() {
        return floors;
    }

    public void setFloors(String[] floors) {
        this.floors = floors;
    }

    public String getShoppingDistrict() {
        return shoppingDistrict;
    }

    public void setShoppingDistrict(String shoppingDistrict) {
        this.shoppingDistrict = shoppingDistrict;
    }

    public String getStar() {
        return star;
    }

    public void setStar(String star) {
        this.star = star;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public String[] getTags() {
        return tags;
    }

    public void setTags(String[] tags) {
        this.tags = tags;
    }

    public List<HotelRoom> getRooms() {
        return rooms;
    }

    public void setRooms(List<HotelRoom> rooms) {
        this.rooms = rooms;
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
        sb.append(",\"name\":\"")
                .append(name).append('\"');
        sb.append(",\"address\":\"")
                .append(address).append('\"');
        sb.append(",\"city\":\"")
                .append(city).append('\"');
        sb.append(",\"area\":\"")
                .append(area).append('\"');
        sb.append(",\"totalRoom\":")
                .append(totalRoom);
        sb.append(",\"totalSquare\":")
                .append(totalSquare);
        sb.append(",\"totalFloor\":")
                .append(totalFloor);
        sb.append(",\"floors\":")
                .append(Arrays.toString(floors));
        sb.append(",\"shoppingDistrict\":\"")
                .append(shoppingDistrict).append('\"');
        sb.append(",\"star\":\"")
                .append(star).append('\"');
        sb.append(",\"longitude\":")
                .append(longitude);
        sb.append(",\"latitude\":")
                .append(latitude);
        sb.append(",\"tags\":")
                .append(Arrays.toString(tags));
        sb.append(",\"rooms\":")
                .append(rooms);
        sb.append(",\"commonMeta\":")
                .append(commonMeta);
        sb.append('}');
        return sb.toString();
    }
}
