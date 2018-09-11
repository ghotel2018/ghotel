package com.ghotel.model.po.order;

/**
 * @author kekon
 * 订单状态
 */
public enum OrderStatus {

    /**
     * 取消
     */
    D,

    /**
     * 未提交
     */
    N,
    /**
     * 已提交
     */
    S,
    /**
     * 审核不通过
     */
    Q,
    /**
     * 已确认
     */
    C,
    /**
     * 支付中
     */
    P,
    /**
     * 支付失败
     */
    X,
    /**
     * 支付成功
     */
    B,
    /**
     * 完成(最终状态)
     */
    E

}
