package com.ghotel.oss.console.core.job.bean;


/**
 * 同步ECS库PAXINSURANCE表 保险类型 更新实体信息
 * @author wenzhenhao
 *
 */
public class PaxInsuranceUpdateTypeBean {
	
	
	/**
	 * 执行日期
	 */
	private String day;
	
	/**
	 * 要执行的月份
	 */
	private String updateValue;

	public String getDay() {
		return day;
	}

	public void setDay(String day) {
		this.day = day;
	}

	public String getUpdateValue() {
		return updateValue;
	}

	public void setUpdateValue(String updateValue) {
		this.updateValue = updateValue;
	}

	
}
