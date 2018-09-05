package com.ghotel.oss.console.core.job.bean;

public class ReportAndColumnMappingBean {

	private String reportHeader;
	
	private String columnName;
	
	private String defaultValue;

	public ReportAndColumnMappingBean(String reportHeader, String columnName){
		this.reportHeader = reportHeader;
		this.columnName = columnName;
	}
	
	public ReportAndColumnMappingBean(String reportHeader, String columnName, String defaultValue){
		this.reportHeader = reportHeader;
		this.columnName = columnName;
		this.defaultValue = defaultValue;
	}
	
	public ReportAndColumnMappingBean(){}
	
	public String getReportHeader() {
		return reportHeader;
	}

	public void setReportHeader(String reportHeader) {
		this.reportHeader = reportHeader;
	}

	public String getColumnName() {
		return columnName;
	}

	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}

	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}
	
	
	
}
