package com.ghotel.oss.console.core.security.bean;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class PageConfigBean {

	private UserInfoBean user;

	private List<PermissionInfoBean> pageElementPerms = new ArrayList<PermissionInfoBean>();

	private List<ResourceInfoBean> menuResoucre = new ArrayList<ResourceInfoBean>();

	private List<MenuConfigInfoBean> menuConfig = new ArrayList<MenuConfigInfoBean>();

	private List<Map<String, Object>> dictionaryList = new ArrayList<Map<String, Object>>();

	public UserInfoBean getUser() {
		return user;
	}

	public void setUser(UserInfoBean user) {
		this.user = user;
	}

	public List<ResourceInfoBean> getMenuResoucre() {
		return menuResoucre;
	}

	public void setMenuResoucre(List<ResourceInfoBean> menuResoucre) {
		this.menuResoucre = menuResoucre;
	}

	public List<PermissionInfoBean> getPageElementPerms() {
		return pageElementPerms;
	}

	public void setPageElementPerms(List<PermissionInfoBean> pageElementPerms) {
		this.pageElementPerms = pageElementPerms;
	}

	public List<MenuConfigInfoBean> getMenuConfig() {
		return menuConfig;
	}

	public void setMenuConfig(List<MenuConfigInfoBean> menuConfig) {
		this.menuConfig = menuConfig;
	}

	public List<Map<String, Object>> getDictionaryList() {
		return dictionaryList;
	}

	public void setDictionaryList(List<Map<String, Object>> dictionaryList) {
		this.dictionaryList = dictionaryList;
	}

}
