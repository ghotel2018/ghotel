package com.ghotel.oss.console.core.security.bean;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.ghotel.oss.console.core.security.bean.ResourceInfoBean;
import com.ghotel.oss.console.core.security.bean.TreeBean;

@Document(collection = "menuConfig")
public class MenuConfigInfoBean extends TreeBean<MenuConfigInfoBean> {

	@DBRef
	private ResourceInfoBean resource;

	private String resourceUrl;

	private Integer menuOrder;

	private String state;

	private String resourceModule;

	public ResourceInfoBean getResource() {
		return resource;
	}

	public void setResource(ResourceInfoBean resource) {
		this.resource = resource;
	}

	public String getResourceUrl() {
		return resourceUrl;
	}

	public void setResourceUrl(String resourceUrl) {
		this.resourceUrl = resourceUrl;
	}

	public Integer getMenuOrder() {
		return menuOrder;
	}

	public void setMenuOrder(Integer menuOrder) {
		this.menuOrder = menuOrder;
	}

	@Override
	public void formatAttribute() {
		// TODO Auto-generated method stub
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getResourceModule() {
		return resourceModule;
	}

	public void setResourceModule(String resourceModule) {
		this.resourceModule = resourceModule;
	}

}
