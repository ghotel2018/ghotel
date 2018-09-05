package com.ghotel.oss.console.core.job.bean;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ReportGenerationInfoBean {

	private String reportFormat;
	
	private List<ReportAndColumnMappingBean> reportTableHead = new ArrayList<ReportAndColumnMappingBean>();

	private Map<String,Object> reportParams = new HashMap<String,Object>();
	
	private String selectClause;
	
	private String whereClause;
	
	private String fromClause;
	
	private String genReportMethod;
	
	private String genReportCountMethod;
	
	private String proceedor ;

	public String getGenReportMethod() {
		return genReportMethod;
	}

	public void setGenReportMethod(String genReportMethod) {
		this.genReportMethod = genReportMethod;
	}

	public String getReportFormat() {
		return reportFormat;
	}

	public void setReportFormat(String reportFormat) {
		this.reportFormat = reportFormat;
	}

	public List<ReportAndColumnMappingBean> getReportTableHead() {
		return reportTableHead;
	}

	public void setReportTableHead(List<ReportAndColumnMappingBean> reportTableHead) {
		this.reportTableHead = reportTableHead;
	}

	public String getSelectClause() {
		return selectClause;
	}

	public void setSelectClause(String selectClause) {
		this.selectClause = selectClause;
	}

	public String getWhereClause() {
		return whereClause;
	}

	public void setWhereClause(String whereClause) {
		this.whereClause = whereClause;
	}

	public String getFromClause() {
		return fromClause;
	}

	public void setFromClause(String fromClause) {
		this.fromClause = fromClause;
	}

	public Map<String, Object> getReportParams() {
		return reportParams;
	}

	public void setReportParams(Map<String, Object> reportParams) {
		this.reportParams = reportParams;
	}

	public String getGenReportCountMethod() {
		return genReportCountMethod;
	}

	public void setGenReportCountMethod(String genReportCountMethod) {
		this.genReportCountMethod = genReportCountMethod;
	}

	public String getProceedor() {
		return proceedor;
	}

	public void setProceedor(String proceedor) {
		this.proceedor = proceedor;
	}
	
}
