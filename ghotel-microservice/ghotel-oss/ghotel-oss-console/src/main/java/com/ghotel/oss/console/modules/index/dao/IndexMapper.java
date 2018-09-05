package com.ghotel.oss.console.modules.index.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.ghotel.oss.console.core.common.dao.IPaginationDao;
import com.ghotel.oss.console.modules.index.bean.TaskSearchCriteriaBean;

public interface IndexMapper extends IPaginationDao  {

	public List getAllTasks(Map map);
	
	public int countAllTasks(Map map);
	
	public List getAllNotice(Map map);
	
	public int countAllNotice(Map map);
	
	public List getExecutingTasks();
	
	public List getTasksByJobType(TaskSearchCriteriaBean object);
	
	public int finishTask(TaskSearchCriteriaBean object);
	
	public int countAllTasksByType(Map map);
	
	public int updateTaskResult(Map map);
	/**
	 * 统计7天内系统操作
	 */
	public List<Map<String,String>> statisticNotice();
	
	/**
	 * 统计七天内任务
	 */
	public List<Map<String,String>> statisticTask();
	
	/**
	 * 统计7天内系统操作数量第一的用户和数量
	 * 传入null查询7天内 其他查询全部
	 */
	public Map<String,String> statisticTopUserNotice(@Param("type")String type);
	
	/**
	 * 统计七天内任务数量第一的用户和数量
	 * 传入null查询7天内 其他查询全部
	 */
	public Map<String,String> statisticTopUserTask(@Param("type")String type);
	
}
