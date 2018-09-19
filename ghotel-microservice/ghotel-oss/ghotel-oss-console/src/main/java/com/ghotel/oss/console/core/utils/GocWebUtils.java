package com.ghotel.oss.console.core.utils;

import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.util.WebUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ghotel.oss.console.core.exception.GocBeanFormatException;
import com.ghotel.oss.console.core.security.GocSecurityConstant;
import com.ghotel.oss.console.core.security.bean.TreeBean;
import com.ghotel.oss.console.core.security.bean.UserInfoBean;

public class GocWebUtils {

	private static final String METHOD_PREFIX = "set";

	private static final Map<String, Object> methodsCache = new HashMap<String, Object>();

	private static final Logger log = LoggerFactory.getLogger(GocWebUtils.class);

	@Deprecated
	// 此方法用于从request中获取数据并填充到指定的Bean
	public static <T> T formatBeanFromRequest(HttpServletRequest request, Class<T> beanClazz)
			throws GocBeanFormatException {
		T bean = null;

		SimpleDateFormat sdfDateTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd");
		// String strDate = "2012-3-1";
		// Date date=sdf.parse(strDate);

		try {
			bean = beanClazz.newInstance();
			Method[] methods = (Method[]) getCacheObject(beanClazz);
			Enumeration<String> enu = request.getParameterNames();
			while (enu.hasMoreElements()) {
				String attrName = enu.nextElement();
				Object value = request.getParameter(attrName);
				for (Method m : methods) {
					if (null != value && value.toString().length() > 0
							&& m.getName().toLowerCase().equals((METHOD_PREFIX + attrName).toLowerCase())) {
						Class<?>[] clazzs = m.getParameterTypes();
						if (clazzs.length == 1) {
							if (clazzs[0] == int.class || clazzs[0] == Integer.class) {
								m.invoke(bean, Integer.parseInt(value.toString()));
								break;
							} else if (clazzs[0] == float.class || clazzs[0] == Float.class) {
								m.invoke(bean, Float.parseFloat(value.toString()));
								break;
							} else if (clazzs[0] == double.class || clazzs[0] == Double.class) {
								m.invoke(bean, Double.parseDouble(value.toString()));
								break;
								// } else if (clazzs[0] == byte.class) {
								// m.invoke(bean, Byte.parseByte(s, radix));
								// break;
								// } else if (clazzs[0] == char.class) {
								// m.invoke(bean, ((Character) value).charValue());
								// break;
							} else if (clazzs[0] == boolean.class || clazzs[0] == Boolean.class) {
								m.invoke(bean, Boolean.parseBoolean(value.toString()));
								break;
							} else if (clazzs[0] == String.class) {
								m.invoke(bean, value.toString().trim());
								break;
							} else if (clazzs[0] == short.class || clazzs[0] == Short.class) {
								m.invoke(bean, Short.parseShort(value.toString()));
								break;
							} else if (clazzs[0] == long.class || clazzs[0] == Long.class) {
								m.invoke(bean, Long.parseLong(value.toString()));
								break;
							} else if (clazzs[0] == Date.class) {
								if (value.toString().length() > 10) {
									m.invoke(bean, sdfDateTime.parse(value.toString()));
								} else {
									m.invoke(bean, sdfDate.parse(value.toString()));
								}
								break;
							} else {
								// other handling
							}
						} else {
							// other handling

						}
					}
				}
			}

		} catch (InstantiationException e) {
			log.error("face error:", e);
			throw new GocBeanFormatException("无法创建对象： " + beanClazz.getName() + " " + e.getMessage());
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			throw new GocBeanFormatException("无法访问构造方法：" + beanClazz.getName() + " " + e.getMessage());
		} catch (Exception e) {
			throw new GocBeanFormatException("无法处理对象的属性赋值：" + e.getMessage());
		}
		// if(log.isDebugEnabled()){
		try {
			log.info(GocJsonUtil.beanToJson(bean));
		} catch (Exception e) {
		}
		// }
		return bean;
	}

	private static Object getCacheObject(Class<?> beanClazz) {
		Object obj = null;
		obj = methodsCache.get(beanClazz.getName());
		if (null == obj) {
			obj = beanClazz.getMethods();
		} else {
			methodsCache.put(beanClazz.getName(), beanClazz.getMethods());
		}
		return obj;

	}

	public static Optional<UserInfoBean> getSessionUser() {
		Subject currentUser = SecurityUtils.getSubject();
		Object obj = currentUser.getSession().getAttribute(GocSecurityConstant.SESSION_KEY_USERINFO);
		System.out.println(SecurityUtils.getSubject().getSession().getId());

		return Optional.ofNullable((obj == null ? null : (UserInfoBean) obj));
	}

	public static void updateUserSession(UserInfoBean user) {
		System.out.println(SecurityUtils.getSubject().getSession().getId());
		SecurityUtils.getSubject().getSession().setAttribute(GocSecurityConstant.SESSION_KEY_USERINFO, user);
	}

	// 菜单树形结构
	@Deprecated
	public static List<? extends TreeBean> treeMenuList(List<? extends TreeBean> list, String parentId)
			throws Exception {
		// List<TreeBean> returnList = new ArrayList<TreeBean>();
		// for (TreeBean bean : list) {
		// bean.formatAttribute();
		// String menuId = bean.getId();
		// String pid = bean.getParentId();
		// if (parentId == pid) {
		// List<? extends TreeBean> subList = treeMenuList(list, menuId);
		// bean.setChildren(subList);
		// returnList.add(bean);
		// }
		// }
		return list;
	}

	/**
	 * 
	 * @Description 根据HttpServletRequest获取用户真实IP地址
	 *
	 * @param request
	 * @return
	 *
	 * @author iBuilder
	 *
	 */
	public static String getIPAddress(HttpServletRequest request) {
		String ip = null;

		// X-Forwarded-For：Squid 服务代理
		String ipAddresses = request.getHeader("X-Forwarded-For");

		if (ipAddresses == null || ipAddresses.length() == 0 || "unknown".equalsIgnoreCase(ipAddresses)) {
			// Proxy-Client-IP：apache 服务代理
			ipAddresses = request.getHeader("Proxy-Client-IP");
		}

		if (ipAddresses == null || ipAddresses.length() == 0 || "unknown".equalsIgnoreCase(ipAddresses)) {
			// WL-Proxy-Client-IP：weblogic 服务代理
			ipAddresses = request.getHeader("WL-Proxy-Client-IP");
		}

		if (ipAddresses == null || ipAddresses.length() == 0 || "unknown".equalsIgnoreCase(ipAddresses)) {
			// HTTP_CLIENT_IP：有些代理服务器
			ipAddresses = request.getHeader("HTTP_CLIENT_IP");
		}

		if (ipAddresses == null || ipAddresses.length() == 0 || "unknown".equalsIgnoreCase(ipAddresses)) {
			// X-Real-IP：nginx服务代理
			ipAddresses = request.getHeader("X-Real-IP");
		}

		// 有些网络通过多层代理，那么获取到的ip就会有多个，一般都是通过逗号（,）分割开来，并且第一个ip为客户端的真实IP
		if (ipAddresses != null && ipAddresses.length() != 0) {
			ip = ipAddresses.split(",")[0];
		}

		// 还是不能获取到，最后再通过request.getRemoteAddr();获取
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ipAddresses)) {
			ip = request.getRemoteAddr();
		}
		return ip;
	}
}
