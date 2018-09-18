package com.ghotel.model.po.hotel;

import com.ghotel.model.annotation.CascadeSave;
import com.ghotel.model.constant.DBConstant;
import com.ghotel.model.po.CommonMeta;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Date;

/**
 * 销售房型
 *
 * @author kekon
 */
@Document(collection = DBConstant.COLLECTION_NAME_SALE_ROOM)
//@CompoundIndexes({
//        @CompoundIndex(name = "idx_sale_room_name", def = "{'name': 1}"),
//        @CompoundIndex(name = "idx_commonMeta_createTime", def = "{'commonMeta.createTime': 1}")
//})
public class SaleRoom implements Serializable {

    private static final long serialVersionUID = 2255777985859064437L;

    /**
     * 主键
     */
    @Id
    private String id;

    /**
     * 物理房型
     */
    @DBRef
    @CascadeSave
    private Room room;

    /**
     * 销售房型名称
     */
    private String name;

    /**
     * 房间号列表
     */
    private String[] roomNumbers;

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

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String[] getRoomNumbers() {
        return roomNumbers;
    }

    public void setRoomNumbers(String[] roomNumbers) {
        this.roomNumbers = roomNumbers;
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
        sb.append(",\"room\":")
                .append(room);
        sb.append(",\"name\":\"")
                .append(name).append('\"');
        sb.append(",\"roomNumbers\":")
                .append(Arrays.toString(roomNumbers));
        sb.append(",\"commonMeta\":")
                .append(commonMeta);
        sb.append('}');
        return sb.toString();
    }
}
