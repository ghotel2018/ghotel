package com.ghotel.oss.console.modules.notice.service;

import com.ghotel.oss.console.core.common.service.ICommonPaginationService;
import com.ghotel.oss.console.core.logging.bean.GocNoticeBean;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.notice.bean.GocNoticeSearchCriteriaBean;

import java.util.List;

/**
 * @author KunfengWang
 */
public interface GocNoticeService extends ICommonPaginationService {

    /**
     * 增加通知
     * @param noticeBean
     * @return
     */
    boolean addNotice(GocNoticeBean noticeBean);

    PaginationResult getNotice(GocNoticeSearchCriteriaBean object) throws Exception;

    PaginationResult getCouponNotice(GocNoticeSearchCriteriaBean object) throws Exception;

    List noticeMntReportExport(GocNoticeSearchCriteriaBean bean, String userId) throws Exception;

    List CouponNoticeMntReportExport(GocNoticeSearchCriteriaBean bean, String userId) throws Exception;
}
