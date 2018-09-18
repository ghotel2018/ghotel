package com.ghotel.model.po.service;

import com.ghotel.model.annotation.CascadeSave;
import com.ghotel.model.constant.DBConstant;
import com.ghotel.model.po.CommonMeta;
import com.ghotel.model.po.supplier.Supplier;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Arrays;

/**
 * @author kekon
 * 增值服务
 */
@Document(collection = DBConstant.COLLECTION_NAME_VALUE_ADDED_SERVICE)
//@CompoundIndexes({
//        @CompoundIndex(name = "idx_value_added_service_name", def = "{'name': 1}"),
//        @CompoundIndex(name = "idx_commonMeta_createTime", def = "{'commonMeta.createTime': 1}")
//})
public class ExtraService implements Serializable {

    private static final long serialVersionUID = -2685902137185104904L;

    /**
     * 主键
     */
    @Id
    private String id;

    /**
     * 服务名称
     */
    private String name;

    /**
     * 价格
     */
    private Double price;

    /**
     * 标签
     */
    private String[] tags;

    /**
     * 供应商
     */
    @DBRef
    @CascadeSave
    private Supplier supplier;

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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String[] getTags() {
        return tags;
    }

    public void setTags(String[] tags) {
        this.tags = tags;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
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
        sb.append(",\"price\":")
                .append(price);
        sb.append(",\"tags\":")
                .append(Arrays.toString(tags));
        sb.append(",\"supplier\":")
                .append(supplier);
        sb.append(",\"commonMeta\":")
                .append(commonMeta);
        sb.append('}');
        return sb.toString();
    }
}
