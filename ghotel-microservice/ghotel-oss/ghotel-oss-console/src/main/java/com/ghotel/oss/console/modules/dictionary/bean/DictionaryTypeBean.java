package com.ghotel.oss.console.modules.dictionary.bean;

import java.util.Date;

import com.ghotel.oss.console.core.common.bean.PaginationBean;

public class DictionaryTypeBean extends PaginationBean {

	// private int start = 0;
	private int num = 10;

	private String typeId;
	private String typeName;
	private String typeKey;
	private Date createTime;
	private String createBy;
	private Integer renderType;// 0:select 1:html

	public String getTypeId() {
		return typeId;
	}

	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public String getTypeKey() {
		return typeKey;
	}

	public void setTypeKey(String typeKey) {
		this.typeKey = typeKey;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public String getCreateBy() {
		return createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	public Integer getRenderType() {
		return renderType;
	}

	public void setRenderType(Integer renderType) {
		this.renderType = renderType;
	}

}
