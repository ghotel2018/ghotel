package com.ghotel.model.po.order;

/**
 * @author kekon
 * 支付状态
 */
public enum PayStatus {

    /**
     * 取消
     */
    D,

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
     * 回调失败
     */
    Z,
    /**
     * 回调成功
     */
    Y,
    /**
     * 已完成
     */
    E
}
