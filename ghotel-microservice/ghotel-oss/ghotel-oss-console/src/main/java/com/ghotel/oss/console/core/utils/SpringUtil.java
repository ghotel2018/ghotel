package com.ghotel.oss.console.core.utils;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

/**
 * Spring IOC上下文工具类
 * 
 * @author Gary
 * 
 */
@Component
@Scope(value = "singleton")
public class SpringUtil implements ApplicationContextAware {

	/**
	 * 当前IOC
	 */
	private static ApplicationContext applicationContext;

	/**
	 * 设置当前上下文环境，此方法由spring自动装配
	 */
	public void setApplicationContext(ApplicationContext arg0)
			throws BeansException {
		applicationContext = arg0;
	}

	/**
	 * 从当前IOC获取bean
	 * 
	 * @param id
	 *            bean的id
	 * @return
	 */
	public static Object getBean(String id) {
		return applicationContext.getBean(id);
	}

	public static Object getBean(Class<?> clazz) {
		return applicationContext.getBean(clazz);
	}
}