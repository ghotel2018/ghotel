package com.ghotel.oss.console.modules.notice.dao;

import java.util.List;
import java.util.Map;

import com.ghotel.oss.console.core.common.dao.IPaginationDao;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.notice.bean.GocNoticeSearchCriteriaBean;

public interface NoticeMapper extends IPaginationDao{

	public int addNotice(Map params);
	
	public PaginationResult getPaginationAll(Object object) throws Exception; 
	
	public List<GocNoticeSearchCriteriaBean> getNotice(Map map);
	
	public List<GocNoticeSearchCriteriaBean> getCouponNotice(Map map);
	
	public int countAllNotice(Map map);
	public int countCouponNotice(Map map);
	
	public List<?> getNoticeMntExportData(Object object);
	public List<?> getCouponNoticeMntExportData(Object object);
}
