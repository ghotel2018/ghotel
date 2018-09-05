package com.ghotel.oss.console.core.security.bean;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

public abstract class TreeBean<T> {

	@Id
	protected String id;

	protected String parentId = null;

	protected Integer level;

	protected String text;

	protected List<Attribute> attributes = new ArrayList<Attribute>();

	@DBRef
	protected List<T> children = new ArrayList<T>();

	// protected Integer _parentId;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public List<Attribute> getAttributes() {
		return attributes;
	}

	public void setAttributes(List<Attribute> attributes) {
		this.attributes = attributes;
	}

	public List<T> getChildren() {
		return children;
	}

	public void setChildren(List<T> children) {
		this.children = children;
	}

	// public Integer get_parentId() {
	// return _parentId;
	// }
	//
	// public void set_parentId(Integer _parentId) {
	// this._parentId = _parentId;
	// }

	public abstract void formatAttribute();

}
