package com.ghotel.model.po.user;

import java.io.Serializable;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.ghotel.model.annotation.CascadeSave;
import com.ghotel.model.constant.AccountStatus;
import com.ghotel.model.constant.DBConstant;
import com.ghotel.model.constant.Registertype;
import com.ghotel.model.po.BasePO;

/**
 * 用户账号表
 */
@Document(collection = DBConstant.COLLECTION_NAME_ACCOUNT)
//@CompoundIndexes({
//        @CompoundIndex(name = "idx_account_name", def = "{'name': 1}", unique = true),
//        @CompoundIndex(name = "idx_commonMeta_createTime", def = "{'commonMeta.createTime': 1}")
//})
public class Account extends BasePO implements Serializable {

	private static final long serialVersionUID = -5772682191556046789L;

	/**
	 * 登录用户名
	 */
	private String name;
	/**
	 * 登录密码
	 */
	private String password;

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

	/**
	 * 关联的用户表
	 */
	@DBRef
	@CascadeSave
	private User associateUser;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Registertype getRegistertype() {
		return registertype;
	}

	public void setRegistertype(Registertype registertype) {
		this.registertype = registertype;
	}

	public String getReferee() {
		return referee;
	}

	public void setReferee(String referee) {
		this.referee = referee;
	}

	public AccountStatus getStatus() {
		return status;
	}

	public void setStatus(AccountStatus status) {
		this.status = status;
	}

	public User getAssociateUser() {
		return associateUser;
	}

	public void setAssociateUser(User associateUser) {
		this.associateUser = associateUser;
	}

}
