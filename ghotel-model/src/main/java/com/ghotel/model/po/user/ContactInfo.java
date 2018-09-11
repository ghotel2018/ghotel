package com.ghotel.model.po.user;

import java.io.Serializable;

/**
 * @author kekon
 *
 * 联系方式
 */
public class ContactInfo implements Serializable {

	private static final long serialVersionUID = -846462433077139743L;

	/**
	 * 联系方式类型
	 */
	private ContactInfoType type;

	/**
	 * 联系方式具体值
	 */
	private String value;

	public ContactInfoType getType() {
		return type;
	}

	public void setType(ContactInfoType type) {
		this.type = type;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	@Override
	public String toString() {
		final StringBuilder sb = new StringBuilder("{");
		sb.append("\"type\":")
				.append(type);
		sb.append(",\"value\":\"")
				.append(value).append('\"');
		sb.append('}');
		return sb.toString();
	}
}
