package com.ghotel.oss.console.core.logging.dao;

import com.ghotel.core.annotation.OSSDataSource;
import com.ghotel.oss.console.core.logging.bean.GocNoticeBean;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * 通知类操作Bean
 * 
 * @author kekon
 */
@OSSDataSource
public interface GocNoticeRepository extends MongoRepository<GocNoticeBean, String> {
}
