package com.ghotel.oss.console.core.utils.excelUtil;

import java.lang.reflect.Field;

/**
 * The <code>FieldForSortting</code>
 * 
 * @author sageeras.wang
 * @version 1.0, Created at 2013年9月17日
 */
public class FieldForSortting {
	private Field field;
	private int index;
	private String pattern;

	/**
	 * @param field
	 */
	public FieldForSortting(Field field) {
		super();
		this.field = field;
	}

	/**
	 * @param field
	 * @param index
	 */
	public FieldForSortting(Field field, int index) {
		super();
		this.field = field;
		this.index = index;
	}

	/**
	 * @param field
	 * @param index
	 */
	public FieldForSortting(Field field, int index, String pattern) {
		super();
		this.field = field;
		this.index = index;
		this.pattern = pattern;
	}

	/**
	 * @return the field
	 */
	public Field getField() {
		return field;
	}

	/**
	 * @param field
	 *            the field to set
	 */
	public void setField(Field field) {
		this.field = field;
	}

	/**
	 * @return the index
	 */
	public int getIndex() {
		return index;
	}

	/**
	 * @param index
	 *            the index to set
	 */
	public void setIndex(int index) {
		this.index = index;
	}

	public String getPattern() {
		return pattern;
	}

	public void setPattern(String pattern) {
		this.pattern = pattern;
	}

}
