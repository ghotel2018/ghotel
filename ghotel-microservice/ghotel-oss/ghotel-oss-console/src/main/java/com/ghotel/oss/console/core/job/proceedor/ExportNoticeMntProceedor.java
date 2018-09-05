package com.ghotel.oss.console.core.job.proceedor;

import java.io.PrintStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ghotel.oss.console.core.job.bean.ReportGenerationInfoBean;
import com.ghotel.oss.console.core.job.util.JobUtil;
import com.ghotel.oss.console.core.utils.BeanUtil;
import com.ghotel.oss.console.modules.notice.bean.GocNoticeSearchCriteriaBean;
import com.ghotel.oss.console.modules.notice.dao.NoticeMapper;

public class ExportNoticeMntProceedor extends AbstractTaskProceedor {
	private static final Logger logger = LoggerFactory.getLogger("job");

	private NoticeMapper noticeMapper;

	@SuppressWarnings("unchecked")
	@Override
	public void proceed(ReportGenerationInfoBean bean, PrintStream fio) {
		GocNoticeSearchCriteriaBean searchBean = new GocNoticeSearchCriteriaBean();
		BeanUtil.transMap2Bean(bean.getReportParams(), searchBean);
		try {
			fio.println(JobUtil.formatReportHeader(bean.getReportTableHead()));
			long total = noticeMapper.countAll(searchBean);
			int pageSize = 10000;
			List<Map<String, Object>> noticeMntList = new ArrayList<Map<String, Object>>();
			for (int j = 0; j < total; j += pageSize) {
				searchBean.setStart(j + 1);
				searchBean.setEnd(pageSize + j);
				noticeMntList = (List<Map<String, Object>>) noticeMapper.getNoticeMntExportData(searchBean);
				logger.info("日志管理导出,获取了 " + noticeMntList.size() + "条报表记录！");
				if (noticeMntList.isEmpty())
					continue;
				for (int i = 0; i < noticeMntList.size(); i++) {
					String asr = '"' + noticeMntList.get(i).get("NOTUCE_CONTENT").toString().replaceAll("\"", "\'")
							+ '"';
					noticeMntList.get(i).put("NOTUCE_CONTENT", asr);
				}
				for (Map<String, Object> map : noticeMntList) {
					fio.println(JobUtil.formatReportRow(bean.getReportTableHead(), map));
				}
			}
			noticeMntList.clear();
			noticeMntList = null;
		} catch (Exception e) {
			logger.error("", e);
		}
	}

	public void setNoticeMapper(NoticeMapper noticeMapper) {
		this.noticeMapper = noticeMapper;
	}

}
