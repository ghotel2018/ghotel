package com.ghotel.oss.console.core.utils;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.Enumeration;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ghotel.oss.console.core.job.util.JobUtil;

/**
 * 
 * 本机系统信息
 * 
 * @author longgangbai
 * 
 */
public final class SystemHelper {
	private static final Logger logger = LoggerFactory.getLogger(SystemHelper.class);

	// 获得系统属性集
	public static Properties props = System.getProperties();
	// 操作系统名称
	public static String OS_NAME = getPropertery("os.name");
	// 行分页符
	public static String OS_LINE_SEPARATOR = getPropertery("line.separator");
	// 文件分隔符号
	public static String OS_FILE_SEPARATOR = getPropertery("file.separator");

	public static final int DEFAULT_PORT = 8080;

	public static final String SYSTEM_PORT_PROPER_KEY = "server.port";

	public static final String SYSTEM_IP_PROPER_KEY = "server.ip";

	private static String ipAddr;

	private static int serverPort = 0;

	/**
	 * 
	 * 根据系统的类型获取本服务器的ip地址
	 * 
	 * InetAddress inet = InetAddress.getLocalHost(); 但是上述代码在Linux下返回127.0.0.1。
	 * 主要是在linux下返回的是/etc/hosts中配置的localhost的ip地址，
	 * 而不是网卡的绑定地址。后来改用网卡的绑定地址，可以取到本机的ip地址：）：
	 * 
	 * @throws UnknownHostException
	 */
	public static InetAddress getSystemLocalIp() throws UnknownHostException {
		InetAddress inet = null;
		String osname = getSystemOSName();
		try {
			// 针对window系统
			if (osname.toUpperCase().contains("WINDOWS")) {
				inet = getWinLocalIp();
				// 针对linux系统
			} else if (osname.toUpperCase().contains("LINUX")) {
				inet = getUnixLocalIp();
			}
			if (null == inet) {
				throw new UnknownHostException("主机的ip地址未知");
			}
		} catch (Exception e) {
			logger.error("获取本机ip错误" + e.getMessage());
			throw new UnknownHostException("获取本机ip错误" + e.getMessage());
		}
		return inet;
	}

	/**
	 * 获取FTP的配置操作系统
	 * 
	 * @return
	 */
	public static String getSystemOSName() {
		// 获得系统属性集
		Properties props = System.getProperties();
		// 操作系统名称
		String osname = props.getProperty("os.name");
		if (logger.isDebugEnabled()) {
			logger.info("the ftp client system os Name " + osname);
		}
		return osname;
	}

	/**
	 * 获取属性的值
	 * 
	 * @param propertyName
	 * @return
	 */
	public static String getPropertery(String propertyName) {
		return props.getProperty(propertyName);
	}

	/**
	 * 获取window 本地ip地址
	 * 
	 * @return
	 * @throws UnknownHostException
	 */
	private static InetAddress getWinLocalIp() throws UnknownHostException {
		InetAddress inet = InetAddress.getLocalHost();
		// System.out.println("本机的ip=" + inet.getHostAddress());
		return inet;
	}

	/**
	 * 
	 * 可能多多个ip地址只获取一个ip地址 获取Linux 本地IP地址
	 * 
	 * @return
	 * @throws SocketException
	 */
	private static InetAddress getUnixLocalIp() throws SocketException {
		// Enumeration<NetworkInterface> netInterfaces =
		// NetworkInterface.getNetworkInterfaces();
		InetAddress ip = null;
		boolean bFindIP = false;
		Enumeration<NetworkInterface> netInterfaces = (Enumeration<NetworkInterface>) NetworkInterface
				.getNetworkInterfaces();
		while (netInterfaces.hasMoreElements()) {
			if (bFindIP) {
				break;
			}
			NetworkInterface ni = (NetworkInterface) netInterfaces.nextElement();
			// ----------特定情况，可以考虑用ni.getName判断
			// 遍历所有ip
			Enumeration<InetAddress> ips = ni.getInetAddresses();
			while (ips.hasMoreElements()) {
				ip = (InetAddress) ips.nextElement();
				if (ip.isSiteLocalAddress() && !ip.isLoopbackAddress() // 127.开头的都是lookback地址
						&& ip.getHostAddress().indexOf(":") == -1) {
					bFindIP = true;
					break;
				}
			}

		}
		return ip;
	}

	/**
	 * 
	 * 获取当前运行程序的内存信息
	 * 
	 * @return
	 */
	public static final String getRAMinfo() {
		Runtime rt = Runtime.getRuntime();
		return "RAM: " + rt.totalMemory() + " bytes total, " + rt.freeMemory() + " bytes free.";
	}

	/**
	 * 测试类
	 */

	public static void main(String[] args) {
		try {
			// getSystemOSName();
			System.out.println(JobUtil.getLoalServerIp());
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public static synchronized String getIp() {
		if (ipAddr != null) {
			return ipAddr;
		}
		InetAddress ip;
		try {
			ip = SystemHelper.getSystemLocalIp();
			if (ip != null) {
				ipAddr = ip.getHostAddress();
			}
		} catch (UnknownHostException e) {
			logger.error("", e);
		}
		if (ipAddr == null) {
			ipAddr = System.getProperty(SYSTEM_IP_PROPER_KEY);
		}
		logger.info("当前服务IP为:【" + ipAddr + "】");
		return ipAddr;

	}

	public static synchronized int getPort() {
		if (serverPort != 0) {
			return serverPort;
		}
		if (System.getProperty(SYSTEM_PORT_PROPER_KEY) != null) {
			serverPort = Integer.parseInt(System.getProperty(SYSTEM_PORT_PROPER_KEY));
		} else {
			serverPort = DEFAULT_PORT;
		}
		logger.info("当前服务端口为:【" + serverPort + "】");
		return serverPort;
	}
}