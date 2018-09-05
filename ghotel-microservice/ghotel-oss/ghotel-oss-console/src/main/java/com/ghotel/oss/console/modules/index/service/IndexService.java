package com.ghotel.oss.console.modules.index.service;

import java.util.List;
import java.util.Map;

import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.index.bean.NoticeSearchCriteria;
import com.ghotel.oss.console.modules.index.bean.TaskSearchCriteriaBean;

public interface IndexService  {

	public PaginationResult getTasks(TaskSearchCriteriaBean object) throws Exception; 
	
	public PaginationResult getNotices(NoticeSearchCriteria object) throws Exception; 
	
	public List getExecutingTask();
	
	public PaginationResult getTasksByJobType(TaskSearchCriteriaBean object)throws Exception;
	
	public int finishTask(TaskSearchCriteriaBean object);
	
	public List<Map<String,String>> getStatistics();
	
	public int updateTaskResult(Map map);

}
 