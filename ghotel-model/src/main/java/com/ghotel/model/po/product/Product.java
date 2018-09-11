package com.ghotel.model.po.product;

import com.ghotel.model.constant.DBConstant;
import com.ghotel.model.po.CommonMeta;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * @author kekon
 * 产品表
 */
@Document(collection = DBConstant.COLLECTION_NAME_PRODUCT)
@CompoundIndexes({
        @CompoundIndex(name = "idx_product_name", def = "{'name': 1}"),
        @CompoundIndex(name = "idx_commonMeta_createTime", def = "{'commonMeta.createTime': 1}")
})
public class Product<T> implements Serializable {

    private static final long serialVersionUID = 2614969406410812366L;

    /**
     * 主键
     */
    @Id
    private String id;
    /**
     * 产品类型
     */
    private ProductType type;

    /**
     * 产品名称
     */
    private String name;

    /**
     * 产品描述
     */
    private String description;

    /**
     * 关联对象
     * 此处关联：
     * 销售房型、附加服务、增值服务
     */
    private List<T> targets;

    /**
     * 生效时间
     */
    private Date effectiveTime;

    /**
     * 失效时间
     */
    private Date expiryTime;
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

    public ProductType getType() {
        return type;
    }

    public void setType(ProductType type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<T> getTargets() {
        return targets;
    }

    public void setTargets(List<T> targets) {
        this.targets = targets;
    }

    public Date getEffectiveTime() {
        return effectiveTime;
    }

    public void setEffectiveTime(Date effectiveTime) {
        this.effectiveTime = effectiveTime;
    }

    public Date getExpiryTime() {
        return expiryTime;
    }

    public void setExpiryTime(Date expiryTime) {
        this.expiryTime = expiryTime;
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
        sb.append(",\"type\":")
                .append(type);
        sb.append(",\"name\":\"")
                .append(name).append('\"');
        sb.append(",\"description\":\"")
                .append(description).append('\"');
        sb.append(",\"targets\":")
                .append(targets);
        sb.append(",\"effectiveTime\":\"")
                .append(effectiveTime).append('\"');
        sb.append(",\"expiryTime\":\"")
                .append(expiryTime).append('\"');
        sb.append(",\"commonMeta\":")
                .append(commonMeta);
        sb.append('}');
        return sb.toString();
    }
}
