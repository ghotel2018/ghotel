package com.ghotel.oss.console.core.job.handler;

import static com.ghotel.oss.console.core.job.util.JobUtil.getProperties;

import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.quartz.Job;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ghotel.oss.console.modules.scheduler.bean.JobInstanceBean;

public class TempReportFileHandler extends AbstractHandler implements Job {

	private static final Logger logger = LoggerFactory.getLogger("job");

	@Override
	public void execute(JobInstanceBean instance) throws JobExecutionException {

		String fileDir = getProperties().getProperty("report_storing_tem_dir").toString();
		int retentionDays = Integer.parseInt(getProperties().getProperty("report_retention_days").toString().trim());
		File tempDir = new File(fileDir);
		if (!tempDir.exists()) {
			return;
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date now = new Date();
		long nowTime = now.getTime();
		File[] subDirs = tempDir.listFiles();
		for (File file : subDirs) {
			if (file.exists() && file.isDirectory()) {
				String dirName = file.getName();
				File[] files = file.listFiles();
				try {
					long reportCreateDateTime = sdf.parse(dirName).getTime();
					if ((nowTime - reportCreateDateTime) > retentionDays * 24 * 60 * 60 * 1000) {
						logger.info("临时目录" + dirName + "】下的所有临时文件已经被删除,");
						if (files.length > 0) {
							logger.info("包括以下文件:");
							for (File reportFile : files) {
								logger.info(reportFile.getAbsolutePath());
								reportFile.delete();
							}
						}
						file.delete();
					}
				} catch (ParseException e) {
					logger.error("", e);
				}

			}
		}
	}

}
