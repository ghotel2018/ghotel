package com.ghotel.oss.console.core.job.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;

import com.ghotel.oss.console.core.job.bean.PaxInsuranceUpdateTypeBean;
import com.ghotel.oss.console.core.job.bean.PaxInsuranceUpdateTypeList;
import com.ghotel.oss.console.core.utils.GocJsonUtil;

/**
 * 更新保险表字段的内容工具类
 * 
 * @author wenzhenhao
 *
 */
public class PaxInsuranceUpdateTypeUtil {

	private static final Logger logger = LoggerFactory.getLogger("paxInsuranceUpdateTypeLog");

	private static String pattern = "\\d{4}";

	/**
	 * 处理数据
	 * 
	 * @param jdbcTemplate
	 * @param dealSet
	 * @param sql
	 * @return
	 * @throws Exception
	 */
	public static String dealUpdateData(JdbcTemplate jdbcTemplate, String dealSet, String sql) throws Exception {
		StringBuffer errorSb = new StringBuffer();
		StringBuffer successSb = new StringBuffer();
		String result = StringUtils.EMPTY;
		PaxInsuranceUpdateTypeList paxInsuranceUpdateTypes = GocJsonUtil.jsonToBean(dealSet,
				PaxInsuranceUpdateTypeList.class);
		if (paxInsuranceUpdateTypes != null) {
			List<PaxInsuranceUpdateTypeBean> beans = paxInsuranceUpdateTypes.getPlans();
			if (beans != null && !beans.isEmpty()) {
				for (PaxInsuranceUpdateTypeBean paxInsuranceUpdateTypeBean : beans) {
					if (checkDay(paxInsuranceUpdateTypeBean.getDay())) {
						UpdateData(jdbcTemplate, paxInsuranceUpdateTypeBean.getUpdateValue(), sql, errorSb, successSb);
					}
				}
			}

		}
		result = "执行成功:" + successSb + ",执行失败的月份：" + errorSb + "。";
		return result;
	}

	/**
	 * 更新数据
	 * 
	 * @param jdbcTemplate
	 * @param dealSet
	 * @param sql
	 * @param errorSb
	 * @param successSb
	 * @return
	 * @throws Exception
	 */
	public static void UpdateData(JdbcTemplate jdbcTemplate, String dealSet, String sql, StringBuffer errorSb,
			StringBuffer successSb) throws Exception {
		String[] dealMonths = dealSet.split(",");
		if (dealMonths != null && dealMonths.length > 0) {
			for (String dealMonth : dealMonths) {
				if (!checkMonth(dealMonth)) {
					errorSb.append(dealMonth + "/");
					continue;
				}
				String month = dealMonth.substring(2, 4);
				long startMili = System.currentTimeMillis();
				long count = 0;
				for (int day = 0; day <= 3; day++) {
					// 2月份没有30号 31号
					if ("02".equals(month) && day == 3) {
						continue;
					}
					// 赋值订单类型 C
					String conditionCSql = sql.replace("#{CMC:ORDERTYPE}", "C");
					// 赋值月份
					conditionCSql = conditionCSql.replace("#{CMC:PAXINSURANCEUPDATETYPELASTMONTH}", dealMonth + day);
					logger.info("根据条件:" + dealMonth + ",组装SQL：" + conditionCSql);
					Integer resultCUpdate = jdbcTemplate.update(conditionCSql);
					count = count + resultCUpdate;
					logger.info("根据条件:" + dealMonth + ",组装SQL：" + conditionCSql + ",执行成功的条目数：" + resultCUpdate);

					// 赋值订单类型 B
					String conditionBSql = sql.replace("#{CMC:ORDERTYPE}", "B");
					// 赋值月份
					conditionBSql = conditionBSql.replace("#{CMC:PAXINSURANCEUPDATETYPELASTMONTH}", dealMonth + day);
					logger.info("根据条件:" + dealMonth + ",组装SQL：" + conditionBSql);
					Integer resultBUpdate = jdbcTemplate.update(conditionBSql);
					count = count + resultBUpdate;
					logger.info("根据条件:" + dealMonth + ",组装SQL：" + conditionBSql + ",执行成功的条目数：" + resultBUpdate);
					successSb.append(dealMonth + day + "/");
				}
				long endMili = System.currentTimeMillis();
				successSb
						.append("属于月份：" + dealMonth + ",执行成功条目数：" + count + ",执行总耗时为：" + (endMili - startMili) + "毫秒.");
			}
		}
	}

	/**
	 * 是否执行计划当天
	 * 
	 * @param day
	 * @return
	 */
	public static boolean checkDay(String day) {
		try {
			return DateUtils.isSameDay(new Date(), DateUtils.parseDate(day, "yyyyMMdd"));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * 校验月份是否为4位数字
	 * 
	 * @param month
	 * @return
	 */
	private static boolean checkMonth(String month) {
		return Pattern.matches(pattern, month);
	}

}
