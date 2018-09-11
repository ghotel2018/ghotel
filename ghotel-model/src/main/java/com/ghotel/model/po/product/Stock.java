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
 * 库存表
 */
@Document(collection = DBConstant.COLLECTION_NAME_STOCK)
@CompoundIndexes({
        @CompoundIndex(name = "idx_stack_saleDate", def = "{'saleDate': 1}"),
        @CompoundIndex(name = "idx_commonMeta_createTime", def = "{'commonMeta.createTime': 1}")
})
public class Stock implements Serializable {

    private static final long serialVersionUID = -838631497172367373L;

    /**
     * 主键
     */
    @Id
    private String id;

    /**
     * 销售日期（yyyy-MM-dd）
     */
    private String saleDate;
    /**
     * 库存
     */
    private Integer stock;
    /**
     * 产品
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

    public String getSaleDate() {
        return saleDate;
    }

    public void setSaleDate(String saleDate) {
        this.saleDate = saleDate;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
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
        sb.append(",\"saleDate\":\"")
                .append(saleDate).append('\"');
        sb.append(",\"stock\":")
                .append(stock);
        sb.append(",\"product\":")
                .append(product);
        sb.append(",\"commonMeta\":")
                .append(commonMeta);
        sb.append('}');
        return sb.toString();
    }
}
