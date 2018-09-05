package com.ghotel.oss.console.core.job.bean;

import java.util.List;

/**
 * 同步ECS库PAXINSURANCE表 保险类型 更新实体信息 集合
 * @author wenzhenhao
 *
 */
public class PaxInsuranceUpdateTypeList {
	
	
	/**
	 * 更新信息集合
	 */
	private List<PaxInsuranceUpdateTypeBean> plans;

	public List<PaxInsuranceUpdateTypeBean> getPlans() {
		return plans;
	}

	public void setPlans(List<PaxInsuranceUpdateTypeBean> plans) {
		this.plans = plans;
	}

}
