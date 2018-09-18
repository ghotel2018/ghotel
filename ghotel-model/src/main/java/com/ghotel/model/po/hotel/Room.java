package com.ghotel.model.po.hotel;

import com.ghotel.model.constant.DBConstant;
import com.ghotel.model.po.CommonMeta;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Date;

/**
 * @author kekon
 * 房型表
 */
@Document(collection = DBConstant.COLLECTION_NAME_ROOM)
//@CompoundIndexes({
//        @CompoundIndex(name = "idx_room_code", def = "{'code': 1}", unique = true),
//        @CompoundIndex(name = "idx_room_name", def = "{'name': 1}"),
//        @CompoundIndex(name = "idx_commonMeta_createTime", def = "{'commonMeta.createTime': 1}")
//})
public class Room implements Serializable {

    private static final long serialVersionUID = 8970847849037684470L;

    /**
     * 主键
     */
    @Id
    private String id;

    /**
     * 房型唯一编码
     */
    private String code;

    /**
     * 房型名称
     */
    private String name;

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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
        sb.append(",\"code\":\"")
                .append(code).append('\"');
        sb.append(",\"name\":\"")
                .append(name).append('\"');
        sb.append(",\"commonMeta\":")
                .append(commonMeta);
        sb.append('}');
        return sb.toString();
    }
}
