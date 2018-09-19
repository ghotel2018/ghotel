package com.ghotel.model.po;

import java.io.Serializable;
import java.util.Date;

/**
 * @author kekon 公用属性
 */
public class CommonMeta implements Serializable {

	private static final long serialVersionUID = 4992716485825287498L;

	private Boolean delFlag = false;

	private Date createTime;

	private Date lastUpdateTime;

	public Boolean getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(Boolean delFlag) {
		this.delFlag = delFlag;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getLastUpdateTime() {
		return lastUpdateTime;
	}

	public void setLastUpdateTime(Date lastUpdateTime) {
		this.lastUpdateTime = lastUpdateTime;
	}

	@Override
	public String toString() {
		final StringBuilder sb = new StringBuilder("{");
		sb.append("\"delFlag\":").append(delFlag);
		sb.append(",\"createTime\":\"").append(createTime).append('\"');
		sb.append(",\"lastUpdateTime\":\"").append(lastUpdateTime).append('\"');
		sb.append('}');
		return sb.toString();
	}
}
