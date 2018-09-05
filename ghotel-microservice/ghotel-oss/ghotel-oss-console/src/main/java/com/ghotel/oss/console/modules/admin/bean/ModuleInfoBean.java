package com.ghotel.oss.console.modules.admin.bean;

import java.io.Serializable;
import java.util.List;

import com.ghotel.oss.console.core.security.bean.ResourceInfoBean;

public class ModuleInfoBean implements Serializable {

	private String moduleId;

	private String moduleName;

	private List<ResourceInfoBean> resources;

	public String getModuleId() {
		return moduleId;
	}

	public void setModuleId(String moduleId) {
		this.moduleId = moduleId;
	}

	public String getModuleName() {
		return moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}

	public List<ResourceInfoBean> getResources() {
		return resources;
	}

	public void setResources(List<ResourceInfoBean> resources) {
		this.resources = resources;
	}

}
