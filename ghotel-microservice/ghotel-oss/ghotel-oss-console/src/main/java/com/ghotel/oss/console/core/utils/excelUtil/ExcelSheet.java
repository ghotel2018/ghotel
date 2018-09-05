package com.ghotel.oss.console.core.utils.excelUtil;

import java.util.Collection;

/**
 * 用于汇出多个sheet的Vo The <code>ExcelSheet</code>
 * 
 * @author sageeras.wang
 * @version 1.0, Created at 2013年10月25日
 */
public class ExcelSheet<T> {
	private String title;
	private String sheetName;
	private Collection<T> dataset;

	/**
	 * @return the sheetName
	 */
	public String getSheetName() {
		return sheetName;
	}

	/**
	 * Excel页签名称
	 * 
	 * @param sheetName
	 *            the sheetName to set
	 */
	public void setSheetName(String sheetName) {
		this.sheetName = sheetName;
	}

	/**
	 * Excel数据集合
	 * 
	 * @return the dataset
	 */
	public Collection<T> getDataset() {
		return dataset;
	}

	/**
	 * @param dataset
	 *            the dataset to set
	 */
	public void setDataset(Collection<T> dataset) {
		this.dataset = dataset;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

}
