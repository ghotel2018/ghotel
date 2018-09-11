package com.ghotel.model.po.order;

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
 * 支付单表
 */
@Document(collection = DBConstant.COLLECTION_NAME_PAYMENT)
@CompoundIndexes({
        @CompoundIndex(name = "idx_payment_orderNo", def = "{'orderNo': 1}"),
        @CompoundIndex(name = "idx_payment_payNo", def = "{'payNo': 1}"),
        @CompoundIndex(name = "idx_commonMeta_createTime", def = "{'commonMeta.createTime': 1}")
})
public class Payment implements Serializable {

    private static final long serialVersionUID = -1725202125084709667L;

    /**
     * 主键
     */
    @Id
    private String id;

    /**
     * 支付单号
     */
    private String payNo;

    /**
     * 订单号
     */
    private String orderNo;

    /**
     * 支付网关
     */
    private String payGateway;

    /**
     * 支付状态
     */
    private PayStatus status;

    /**
     * 回调结果
     */
    private String callBackResult;

    /**
     * 回调时间
     */
    private Date callBackTime;

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

    public String getPayNo() {
        return payNo;
    }

    public void setPayNo(String payNo) {
        this.payNo = payNo;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public String getPayGateway() {
        return payGateway;
    }

    public void setPayGateway(String payGateway) {
        this.payGateway = payGateway;
    }

    public PayStatus getStatus() {
        return status;
    }

    public void setStatus(PayStatus status) {
        this.status = status;
    }

    public String getCallBackResult() {
        return callBackResult;
    }

    public void setCallBackResult(String callBackResult) {
        this.callBackResult = callBackResult;
    }

    public Date getCallBackTime() {
        return callBackTime;
    }

    public void setCallBackTime(Date callBackTime) {
        this.callBackTime = callBackTime;
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
        sb.append(",\"payNo\":\"")
                .append(payNo).append('\"');
        sb.append(",\"orderNo\":\"")
                .append(orderNo).append('\"');
        sb.append(",\"payGateway\":\"")
                .append(payGateway).append('\"');
        sb.append(",\"status\":")
                .append(status);
        sb.append(",\"callBackResult\":\"")
                .append(callBackResult).append('\"');
        sb.append(",\"callBackTime\":\"")
                .append(callBackTime).append('\"');
        sb.append(",\"commonMeta\":")
                .append(commonMeta);
        sb.append('}');
        return sb.toString();
    }
}
