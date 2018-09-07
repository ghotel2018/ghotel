package com.ghotel.oss.console.modules.dictionary.bean;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.DBRef;

import com.ghotel.oss.console.core.common.bean.PaginationBean;

public class DictionaryTypeSearchCriteriaBean extends PaginationBean {

	// private int start = 0;
	private int num = 10;

	private String typeId;
	private String typeName;
	private String typeKey;
	private Date createTime;
	private String createBy;
	private Integer renderType;// 0:select 1:html
	@DBRef
	private List<DictionaryDetailBean> details = new ArrayList<>();

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

	public List<DictionaryDetailBean> getDetails() {
		return details;
	}

	public void setDetails(List<DictionaryDetailBean> details) {
		this.details = details;
	}

}
