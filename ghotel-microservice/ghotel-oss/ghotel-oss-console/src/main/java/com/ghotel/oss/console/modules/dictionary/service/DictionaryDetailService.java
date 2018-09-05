package com.ghotel.oss.console.modules.dictionary.service;

import java.util.List;

import com.ghotel.oss.console.core.common.service.ICommonPaginationService;
import com.ghotel.oss.console.modules.dictionary.bean.DictionaryDetailBean;

public interface DictionaryDetailService extends ICommonPaginationService<DictionaryDetailBean> {

	List<DictionaryDetailBean> getDetailByTypeId(String id);

}
