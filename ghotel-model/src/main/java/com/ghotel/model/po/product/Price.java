package com.ghotel.model.po.product;

import com.ghotel.model.annotation.CascadeSave;
import com.ghotel.model.constant.DBConstant;
import com.ghotel.model.po.CommonMeta;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

/**
 * @author kekon
 * 价格表
 */
@Document(collection = DBConstant.COLLECTION_NAME_PRICE)
//@CompoundIndexes({
//        @CompoundIndex(name = "idx_price_saleDate", def = "{'saleDate': 1}"),
//        @CompoundIndex(name = "idx_commonMeta_createTime", def = "{'commonMeta.createTime': 1}")
//})
public class Price implements Serializable {

    private static final long serialVersionUID = -1983285308953961552L;

    /**
     * 主键
     */
    @Id
    private String id;
    /**
     * 价格
     */
    private Double price;
    /**
     * 描述
     */
    private String description;
    /**
     * 销售日期（yyyy-MM-dd）
     */
    private String saleDate;

    /**
     * 关联的产品
     */
    @DBRef
    @CascadeSave
    private Product product;

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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSaleDate() {
        return saleDate;
    }

    public void setSaleDate(String saleDate) {
        this.saleDate = saleDate;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
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
        sb.append(",\"price\":")
                .append(price);
        sb.append(",\"description\":\"")
                .append(description).append('\"');
        sb.append(",\"saleDate\":\"")
                .append(saleDate).append('\"');
        sb.append(",\"product\":")
                .append(product);
        sb.append(",\"commonMeta\":")
                .append(commonMeta);
        sb.append('}');
        return sb.toString();
    }
}
