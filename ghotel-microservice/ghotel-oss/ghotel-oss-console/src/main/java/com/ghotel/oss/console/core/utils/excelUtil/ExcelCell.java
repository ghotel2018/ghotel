package com.ghotel.oss.console.core.utils.excelUtil;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.apache.commons.lang.StringUtils;

/**
 * The <code>ExcelCell</code><br>
 * 数值型的栏位只能使用Double
 * 
 * @see {@link com.ghotel.oss.console.core.utils.excelUtil.zoo.ExcelUtil.ExcelUtil#exportExcel}
 * @author sageeras.wang
 * @version 1.0, Created at 2013年9月14日
 * @version 1.1, Updated at 2013年10月20日 ,添加了专用于验证的子注解:Valid
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface ExcelCell {
	/**
	 * 顺序 default 100
	 * 
	 * @return
	 */
	public int index();

	/**
	 * 格式 StringUtils.EMPTY 目前只有时间格式
	 * 
	 * @return
	 */
	public String pattern() default StringUtils.EMPTY;

	/**
	 * 当值为null时要显示的值 default StringUtils.EMPTY
	 * 
	 * @return
	 */
	public String defaultValue() default StringUtils.EMPTY;

	public String exportName();

	/**
	 * 用于验证
	 * 
	 * @return
	 */
	public Valid valid() default @Valid();

	@Retention(RetentionPolicy.RUNTIME)
	@Target(ElementType.FIELD)
	public @interface Valid {
		/**
		 * 必须与in中String相符,目前仅支持String类型
		 * 
		 * @return e.g. {"abc","123"}
		 */
		public String[] in() default {};

		/**
		 * 是否允许为空,用于验证数据 default true
		 * 
		 * @return
		 */
		public boolean allowNull() default true;

		/**
		 * Apply a "greater than" constraint to the named property , equivalent
		 * ">"
		 * 
		 * @return
		 */
		public double gt() default Double.NaN;

/**Apply a "less than" constraint to the named property , equivalent "<"
         * @return
         */
		public double lt() default Double.NaN;

		/**
		 * Apply a "greater than or equal" constraint to the named property ,
		 * equivalent ">="
		 * 
		 * @return
		 */
		public double ge() default Double.NaN;

		/**
		 * Apply a "less than or equal" constraint to the named property ,
		 * equivalent "<="
		 * 
		 * @return
		 */
		public double le() default Double.NaN;

		public int length() default 0;
	}
}
