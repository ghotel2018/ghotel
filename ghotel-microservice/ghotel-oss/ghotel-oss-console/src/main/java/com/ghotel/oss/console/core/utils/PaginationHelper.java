package com.ghotel.oss.console.core.utils;

import java.util.ArrayList;
import java.util.List;

/**
 * 
 * @ClassName: PaginationHelper.java
 *
 * @Description: 分页功能的类
 *
 * @author iBuilder
 *
 * @date: 2018年3月13日
 *
 */
public class PaginationHelper {

	/**
	 * 保存从数据库中读取出的全部数据
	 */
	private List list;
	
	/**
	 * 保存每一页的信息
	 */
	private List pageList = new ArrayList();
	
	/**
	 * 保存当前页
	 */
	private List pageNow;
	
	/**
	 * 当前的页数
	 */
	private int pageNo = 1;
	
	/**
	 * 一共有多少页
	 */
	private int pageMax;
	
	/**
	 * 每一页显示多少条记录
	 */
	private int pageRowNum;

	public PaginationHelper(List list, int pageRowNum) {
		this.list = list;             // 获取到数据库的全部信息
		this.pageRowNum = pageRowNum; // 获取每一页要显示多少条记录
//		splitpage();                  // 计算分页算法
//		getNowList();                 // 取出每一页的数据
	}

	/**
	 * 
	 * @Description 分页算法，得出最大的页数以及每一页存放的数据
	 *
	 * @author iBuilder
	 *
	 */
	public void splitpage() {
		// 得出一共有多少条记录
		int size = list.size();
		pageMax = getPageMaxNo(size);
		pageList.clear();
		int index = 0;
		for (int i = 0; i < pageMax; i++) {
			ArrayList tlist = new ArrayList();
			for (int j = 0; j < pageRowNum; j++) {
				if (index < size) {
					tlist.add(list.get(index++));
				} else {
					break;
				}
			}
			// 将每一页的信息保存到List集合中
			pageList.add(tlist);
		}
	}

	/**
	 * 
	 * @Description 取出每一页的数据
	 *
	 * @author iBuilder
	 *
	 */
	public void getNowList() {
		int n = pageNo - 1;
		this.pageNow = (ArrayList) pageList.get(n);
	}

	/**
	 * 
	 * @Description 第一页
	 *
	 *
	 * @author iBuilder
	 *
	 */
	public void setFirstPage() {
		this.pageNo = 1;
		getNowList();
	}

	/**
	 * 
	 * @Description 前一页
	 *
	 * @author iBuilder
	 *
	 */
	public void setPrivousPage() {
		if (this.pageNo > 1) {
			this.pageNo--;
		}
		getNowList();
	}

	/**
	 * 
	 * @Description 下一页
	 *
	 * @author iBuilder
	 *
	 */
	public void setNextPage() {
		if (this.pageNo < this.pageMax) {
			this.pageNo++;
		}
		getNowList();
	}

	/**
	 * 
	 * @Description 最后一页
	 *
	 * @author iBuilder
	 *
	 */
	public void setLastPage() {
		this.pageNo = this.pageMax;
		getNowList();
	}
	
	/**
	 * 
	 * @Description 计算分页最大页号
	 *
	 * @param num
	 * @return int
	 *
	 * @author iBuilder
	 *
	 */
	public int getPageMaxNo(int num) {
		int pageNo;
		if (num % pageRowNum == 0) {
			pageNo = num / pageRowNum;
		} else {
			pageNo = num / pageRowNum + 1;
		}
		return pageNo;
	}

	public List getList() {
		return list;
	}

	public void setList(List list) {
		this.list = list;
	}

	public List getPageList() {
		return pageList;
	}

	public void setPageList(List pageList) {
		this.pageList = pageList;
	}

	public List getPageNow() {
		return pageNow;
	}

	public void setPageNow(List pageNow) {
		this.pageNow = pageNow;
	}

	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
		getNowList();
	}

	public int getPageMax() {
		return pageMax;
	}

	public void setPageMax(int pageMax) {
		this.pageMax = pageMax;
	}

	public int getPageRowNum() {
		return pageRowNum;
	}

	public void setPageRowNum(int pageRowNum) {
		this.pageRowNum = pageRowNum;
	}

}
