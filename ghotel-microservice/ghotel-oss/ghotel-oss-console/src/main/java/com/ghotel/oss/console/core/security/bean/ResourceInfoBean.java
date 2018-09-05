package com.ghotel.oss.console.core.security.bean;

import org.springframework.data.mongodb.core.mapping.Document;

/**
 * 
 * 
 * @description 用户信息 2016-6-14
 */
@Document(collection = "resourceInfo")
public class ResourceInfoBean extends TreeBean<ResourceInfoBean> {

	private String resourceUrl;

	private String resourceDesc;

	private String resourceName;

	private String category; // menu : 菜单， url: 后台操作url ,element: 页面元素，

	private String module; // Module Name (用户管理， )

	private String actionCode;

	private String resourceType;

	public String getResourceType() {
		return resourceType;
	}

	public void setResourceType(String resourceType) {
		this.resourceType = resourceType;
	}

	public String getResourceUrl() {
		return resourceUrl;
	}

	public void setResourceUrl(String resourceUrl) {
		this.resourceUrl = resourceUrl;
	}

	public String getResourceDesc() {
		return resourceDesc;
	}

	public void setResourceDesc(String resourceDesc) {
		this.resourceDesc = resourceDesc;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getModule() {
		return module;
	}

	public void setModule(String module) {
		this.module = module;
	}

	public String getActionCode() {
		return actionCode;
	}

	public void setActionCode(String actionCode) {
		this.actionCode = actionCode;
	}

	public String getResourceName() {
		return resourceName;
	}

	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}

	@Override
	public void formatAttribute() {
		this.text = this.resourceDesc;
		this.attributes.add(new Attribute("resourceUrl", this.resourceUrl));
		this.attributes.add(new Attribute("category", this.category));
		this.attributes.add(new Attribute("module", this.module));
		this.attributes.add(new Attribute("actionCode", this.actionCode));
	}

}
