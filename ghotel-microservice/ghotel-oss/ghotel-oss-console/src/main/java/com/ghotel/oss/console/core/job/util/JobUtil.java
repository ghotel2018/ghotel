package com.ghotel.oss.console.core.job.util;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import com.ghotel.oss.console.core.job.bean.ReportAndColumnMappingBean;
import com.ghotel.oss.console.core.job.bean.TaskBean;
import com.ghotel.oss.console.core.job.dao.SchedulerJobMapper;
import com.ghotel.oss.console.core.utils.StringUtil;
import com.ghotel.oss.console.core.utils.SystemHelper;

public class JobUtil {

	private static final Logger logger = LoggerFactory.getLogger("job");

	private static final BeanFactory beanFactory = new ClassPathXmlApplicationContext(
			new String[] { "applicationContext-Job.xml" });;

	private static Properties properties;

	private static String localIp;

	public static BeanFactory getBeanFactry() {

		return beanFactory;
	}

	public static Properties getProperties() {

		synchronized (JobUtil.class) {
			if (properties == null) {
				initProperties();
			}
		}
		return properties;
	}

	private static void initBeanFactory() {
		System.out.println("启动了。。。。。。。。。。。。。。。。。。");

	}

	private static void initProperties() {
		Resource resource = new ClassPathResource("/application.properties");
		try {
			properties = PropertiesLoaderUtils.loadProperties(resource);
		} catch (IOException e) {
			properties = new Properties();
		}
	}

	public static String formatReportHeader(List<ReportAndColumnMappingBean> reportTableHead) {
		StringBuffer sb = new StringBuffer();
		for (ReportAndColumnMappingBean bean : reportTableHead) {
			sb.append(bean.getReportHeader()).append(",");
		}
		return sb.toString();
	}

	public static String formatReportRow(List<ReportAndColumnMappingBean> reportTableHead,
			Map<String, Object> dataMap) {
		StringBuffer sb = new StringBuffer();
		for (ReportAndColumnMappingBean bean : reportTableHead) {
			String value = null;
			Object data = dataMap.get(bean.getColumnName().toUpperCase());
			if (data != null && data.toString().length() > 0) {
				value = data.toString();
			} else {
				value = bean.getDefaultValue();
			}
			if (value == null) {
				sb.append(",");
			} else {
				sb.append(value).append(",");
			}
		}
		dataMap.clear();
		return sb.toString();
	}

	public static String formatMongoReportRow(List<ReportAndColumnMappingBean> reportTableHead,
			Map<String, Object> dataMap) {
		StringBuffer sb = new StringBuffer();
		for (ReportAndColumnMappingBean bean : reportTableHead) {
			String value = null;
			Object data = dataMap.get(bean.getColumnName());
			if (data != null && data.toString().length() > 0) {
				value = data.toString();
			} else {
				value = bean.getDefaultValue();
			}
			if (value == null) {
				sb.append(",");
			} else {
				sb.append(value).append(",");
			}
		}
		dataMap.clear();
		return sb.toString();
	}

	public static int updateStatus(TaskBean task, SchedulerJobMapper jobMapper, int oldStatus, int newStatus,
			Timestamp updateTime, Timestamp startTime) {
		Map<String, Object> statusUpdateParams = new HashMap<String, Object>();
		statusUpdateParams.put("jobInstanceId", task.getJobInstanceId());
		statusUpdateParams.put("oldStatus", oldStatus);
		statusUpdateParams.put("taskId", task.getTaskId());
		statusUpdateParams.put("newStatus", newStatus);
		if (updateTime != null) {
			statusUpdateParams.put("updateTime", updateTime);
		}
		if (startTime != null) {
			statusUpdateParams.put("startTime", startTime);
		}
		int result = jobMapper.updateTaskDetail(statusUpdateParams);
		return result;
	}

	/**
	 * 获取本机的IP
	 * 
	 * @return
	 */

	public static synchronized String getLoalServerIp() {
		if (StringUtil.isNotBlank(localIp)) {
			return localIp;
		} else {
			try {
				InetAddress inet = SystemHelper.getSystemLocalIp();
				if (inet != null) {
					localIp = inet.getHostAddress();
				}

			} catch (UnknownHostException e2) {
				logger.error("", e2);
			}
		}
		if (!StringUtil.isNotBlank(localIp)) {
			localIp = getProperties().getProperty("report_default_ip").toString();
		}
		return localIp;
	}

}
