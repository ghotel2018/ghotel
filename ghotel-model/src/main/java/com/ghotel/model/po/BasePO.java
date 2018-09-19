package com.ghotel.model.po;

import org.springframework.data.annotation.Id;

public class BasePO {
	/**
	 * 唯一主键
	 */
	@Id
	private String id;

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

	public CommonMeta getCommonMeta() {
		return commonMeta;
	}

	public void setCommonMeta(CommonMeta commonMeta) {
		this.commonMeta = commonMeta;
	}

}
