package com.ghotel.oss.console.modules.dictionary.bean;

public class DictionaryDetailBean {
	
	private String detailId;
	private String typeId;
	private String detailName;
	private String detailValue;
	private String detailRemark;
	
	public String getDetailId() {
		return detailId;
	}
	public void setDetailId(String detailId) {
		this.detailId = detailId;
	}
	public String getTypeId() {
		return typeId;
	}
	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}
	public String getDetailName() {
		return detailName;
	}
	public void setDetailName(String detailName) {
		this.detailName = detailName;
	}
	public String getDetailValue() {
		return detailValue;
	}
	public void setDetailValue(String detailValue) {
		this.detailValue = detailValue;
	}
	public String getDetailRemark() {
		return detailRemark;
	}
	public void setDetailRemark(String detailRemark) {
		this.detailRemark = detailRemark;
	}
	@Override
	public String toString() {
		return "DictionaryDetailBean [detailId=" + detailId + ", typeId=" + typeId + ", detailName=" + detailName
				+ ", detailValue=" + detailValue + ", detailRemark=" + detailRemark + "]";
	}
}
