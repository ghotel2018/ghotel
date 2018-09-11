package com.ghotel.oss.console.core.logging.dao;

import com.ghotel.oss.console.core.logging.bean.GocNoticeBean;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * 通知类操作Bean
 * @author kekon
 */
public interface GocNoticeRepository extends MongoRepository<GocNoticeBean, String> {
}
