package com.ghotel.oss.console.core.job.proceedor;

import java.io.File;
import java.io.PrintStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ghotel.oss.console.core.job.bean.ReportGenerationInfoBean;
import com.ghotel.oss.console.core.job.util.JobUtil;

public abstract class AbstractTaskProceedor implements IReportTaskProceedor {

	private static final Logger logger = LoggerFactory.getLogger("job");

	private PrintStream fio;

	private String fileName;

	@Override
	public String proceed(ReportGenerationInfoBean bean, String fileDir) throws Exception {
		fileName = formatFileName();
		try {
			fio = new PrintStream(new File(fileDir + File.separator + fileName), "gb2312");
			proceed(bean, fio);
		} finally {
			try {
				if (fio != null) {
					fio.flush();
					fio.close();
				}
			} catch (Exception e) {
				logger.error("", e);
			}

		}
		return fileName;
	}

	public abstract void proceed(ReportGenerationInfoBean bean, PrintStream fio) throws Exception;

	@Override
	public String formatFileName() {
		// TODO Auto-generated method stub
		return System.currentTimeMillis() + "_" + JobUtil.getLoalServerIp() + ".csv";
	}

}
