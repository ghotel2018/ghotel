package com.ghotel.oss.console.core.security.bean;

public class Attribute {
    /**名字**/
	private String  name;
	
	
	private String value;

	public String getName() {
		return name;
	}

	
	public Attribute(String name, String value){
		this.name = name;
		this.value = value;
	}
	
	public void setName(String name) {
		this.name = name;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
	
	
}
