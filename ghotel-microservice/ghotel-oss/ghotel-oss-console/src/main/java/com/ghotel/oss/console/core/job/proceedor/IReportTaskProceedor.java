package com.ghotel.oss.console.core.job.proceedor;

import com.ghotel.oss.console.core.job.bean.ReportGenerationInfoBean;

public interface  IReportTaskProceedor {

	public String proceed(ReportGenerationInfoBean bean, String fileDir)  throws Exception;
	
	public String formatFileName();
	
}
