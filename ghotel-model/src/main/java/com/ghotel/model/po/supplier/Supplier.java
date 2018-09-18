package com.ghotel.model.po.supplier;

import com.ghotel.model.annotation.CascadeSave;
import com.ghotel.model.constant.DBConstant;
import com.ghotel.model.po.CommonMeta;
import com.ghotel.model.po.user.User;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

/**
 * @author kekon
 * 供应商表
 */
@Document(collection = DBConstant.COLLECTION_NAME_SUPPLIER)
//@CompoundIndexes({
//        @CompoundIndex(name = "idx_supplier_name", def = "{'name': 1}"),
//        @CompoundIndex(name = "idx_commonMeta_createTime", def = "{'commonMeta.createTime': 1}")
//})
public class Supplier implements Serializable {

    private static final long serialVersionUID = 7148758851695835224L;

    /**
     * 主键
     */
    @Id
    private String id;

    /**
     * 供应商名称
     */
    private String name;

    /**
     * 联系人信息
     */
    @DBRef
    @CascadeSave
    private User contact;

    /**
     * 城市
     */
    private String city;

    /**
     * 行政区域
     */
    private String area;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getContact() {
        return contact;
    }

    public void setContact(User contact) {
        this.contact = contact;
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
        sb.append(",\"contact\":")
                .append(contact);
        sb.append(",\"city\":\"")
                .append(city).append('\"');
        sb.append(",\"area\":\"")
                .append(area).append('\"');
        sb.append(",\"commonMeta\":")
                .append(commonMeta);
        sb.append('}');
        return sb.toString();
    }
}
