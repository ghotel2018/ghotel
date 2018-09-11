package com.ghotel.model.po.user;

import java.io.Serializable;

/**
 * @author kekon
 * 证件类型bean
 */
public class Certificate implements Serializable {

	private static final long serialVersionUID = -7559896130333947079L;

	/**
	 * 证件类型
	 */
	private CertificateType type;

	/**
	 * 证件号码
	 */
	private String number;

	public CertificateType getType() {
		return type;
	}

	public void setType(CertificateType type) {
		this.type = type;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	@Override
	public String toString() {
		final StringBuilder sb = new StringBuilder("{");
		sb.append("\"type\":")
				.append(type);
		sb.append(",\"number\":\"")
				.append(number).append('\"');
		sb.append('}');
		return sb.toString();
	}
}
