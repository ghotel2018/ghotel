package com.ghotel.oss.console.modules.admin.bean;

import java.util.ArrayList;
import java.util.List;

public class PaginationResult<T> {

	private int start;

	private int num;

	private int total;

	private List<T> list = new ArrayList<T>();

	public PaginationResult() {
	}

	public PaginationResult(int start, int num, int total) {
		this.start = start;
		this.num = num;
		this.total = total;
	}

	public PaginationResult(int start, int num, int total, List<T> list) {
		this.start = start;
		this.num = num;
		this.total = total;
		this.list = list;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public List<?> getList() {
		return list;
	}

	public void setList(List<T> list) {
		this.list = list;
	}

}
