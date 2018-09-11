package com.ghotel.model.po.hotel;

import java.io.Serializable;

/**
 * @author kekon
 * 酒店房型
 */
public class HotelRoom implements Serializable {

    private static final long serialVersionUID = -7313337614577833266L;

    /**
     * 房型
     */
    private Room room;

    /**
     * 库存
     */
    private Integer stock;

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("{");
        sb.append("\"room\":")
                .append(room);
        sb.append(",\"stock\":")
                .append(stock);
        sb.append('}');
        return sb.toString();
    }
}
