package com.ghotel.oss.console.modules.ghotel.user.beam;

import com.ghotel.model.constant.AccountStatus;
import com.ghotel.model.constant.Registertype;
import com.ghotel.oss.console.core.common.bean.PaginationBean;

public class GHotelAccountSearchCriteriaBean extends PaginationBean {
	/**
	 * 登录用户名
	 */
	private String name;

	/**
	 * 注册类型
	 */
	private Registertype registertype;
	/**
	 * 账号状态
	 */
	private AccountStatus status;

	// 推荐人
	private String referee;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Registertype getRegistertype() {
		return registertype;
	}

	public void setRegistertype(Registertype registertype) {
		this.registertype = registertype;
	}

	public AccountStatus getStatus() {
		return status;
	}

	public void setStatus(AccountStatus status) {
		this.status = status;
	}

	public String getReferee() {
		return referee;
	}

	public void setReferee(String referee) {
		this.referee = referee;
	}

}
