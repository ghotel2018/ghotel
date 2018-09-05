package com.ghotel.oss.console.modules.notice.service.impl;

import com.ghotel.oss.console.core.common.service.AbstractPaginationCommonServiceWrapper;
import com.ghotel.oss.console.core.logging.annotation.GocLogAnnotation;
import com.ghotel.oss.console.core.logging.bean.GocNoticeBean;
import com.ghotel.oss.console.core.logging.dao.GocNoticeRepository;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.notice.bean.GocNoticeSearchCriteriaBean;
import com.ghotel.oss.console.modules.notice.service.GocNoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@GocLogAnnotation(moduleId = "Notice")
@Component("gocNoticeService")
public class GocNoticeServiceImpl extends AbstractPaginationCommonServiceWrapper implements GocNoticeService {

    @Autowired
    private GocNoticeRepository gocNoticeRepository;

    @Override
    public boolean addNotice(GocNoticeBean noticeBean) {
        if (noticeBean != null) {
            gocNoticeRepository.save(noticeBean);
            if (null != noticeBean.getNoticeId()) {
                return true;
            }
        }
        return false;
    }

    @Override
    public PaginationResult getNotice(GocNoticeSearchCriteriaBean object) throws Exception {
        return null;
    }

    @Override
    public PaginationResult getCouponNotice(GocNoticeSearchCriteriaBean object) throws Exception {
        return null;
    }

    @Override
    public List noticeMntReportExport(GocNoticeSearchCriteriaBean bean, String userId) throws Exception {
        return null;
    }

    @Override
    public List CouponNoticeMntReportExport(GocNoticeSearchCriteriaBean bean, String userId) throws Exception {
        return null;
    }

    @Override
    protected MongoRepository getRepository() {
        return null;
    }
}
