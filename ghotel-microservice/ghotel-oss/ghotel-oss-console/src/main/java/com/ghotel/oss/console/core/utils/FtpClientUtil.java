package com.ghotel.oss.console.core.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class FtpClientUtil {

	private static final Logger logger = LoggerFactory.getLogger(FtpClientUtil.class);
	private static String encoding = "UTF-8";

	FTPClient client;

	/** ftp服务器地址 */
	private String host;
	/** ftp 端口号 默认0 */
	private int port;
	/** ftp服务器用户名 */
	private String username;
	/** ftp服务器密码 */
	private String password;
	/** ftp远程目录 */
	private String remoteDir;
	/** 文件路径通配符 默认列出所有 */
	private String regEx = "*";
	private static String LOCAL_CHARSET = "GBK";

	public FtpClientUtil() {
		client = new FTPClient();
	}

	public static FtpClientUtil getBeanFactory() {
		return new FtpClientUtil();
	}

	/**
	 * 连接到Ftp服务器
	 * 
	 * @param host
	 *            主机
	 * @param port
	 *            端口
	 * @param username
	 *            用户名
	 * @param password
	 *            密码
	 * @return
	 */
	public void connect(String host, int port, String username, String password) {
		this.host = host;
		this.port = port;
		this.username = username;
		this.password = password;
		if (client != null) {
			// 设置超时时间
			client.setConnectTimeout(10000);
			try {
				// 连接服务器
				if (!client.isConnected()) {
					// 如果采用默认端口，可以使用client.connect(host)的方式直接连接FTP服务器
					if (port == 0) {
						client.connect(host);
					} else {
						client.connect(host, port);
					}
					// 登录
					client.login(username, password);
					// 获取ftp登录应答码
					int reply = client.getReplyCode();
					// 验证是否登陆成功
					if (!FTPReply.isPositiveCompletion(reply)) {
						if (FTPReply.isPositiveCompletion(client.sendCommand("OPTS UTF8", "ON"))) {// 开启服务器对UTF-8的支持，如果服务器支持就用UTF-8编码，否则就使用本地编码（GBK）.
							LOCAL_CHARSET = "UTF-8";
						}
						logger.info("未连接到FTP，用户名或密码错误。");
						client.disconnect();
						throw new RuntimeException("未连接到FTP，用户名或密码错误。");
					} else {
						logger.info("FTP连接成功。IP:" + host + " PORT:" + port);
					}
					// 设置连接属性
					client.setControlEncoding(encoding);
					// 设置以二进制方式传输
					client.setFileType(FTPClient.BINARY_FILE_TYPE);
					client.enterLocalPassiveMode();
				}
			} catch (Exception e) {
				try {
					client.disconnect();
				} catch (IOException e1) {
				}
				logger.error("连接FTP服务器失败" + e.getMessage());
				throw new RuntimeException("连接FTP服务器失败" + e.getMessage());
			}
		}
	}
	
	/**
	 * 下载文件
	 */
	public List<File> download(String remotePath, String fileName) {
		List<File> files = null;

		InputStream is = null;
		File downloadFile = null;
		try {
			// 设置远程FTP目录
			client.changeWorkingDirectory(remotePath);
			logger.info("切换至工作目录【" + remotePath + "】");
			// 读取远程文件
			FTPFile[] ftpFiles = client.listFiles(regEx);
			if (ftpFiles.length == 0) {
				logger.warn("文件数为0，没有可下载的文件！");
				return null;
			}
			// logger.info("准备下载" + ftpFiles.length + "个文件");
			// 保存文件到本地
			for (FTPFile file : ftpFiles) {
				// 如果有指定下载的文件
				if (StringUtil.isNotBlank(fileName) && !file.getName().equals(fileName)) {
					continue;
				}
				if (files == null)
					files = new ArrayList<File>();
				is = client.retrieveFileStream(file.getName());
				if (is == null)
					throw new RuntimeException("下载失败，检查文件是否存在");
				downloadFile = new File(file.getName());
				FileOutputStream fos = FileUtils.openOutputStream(downloadFile);
				IOUtils.copy(is, fos);
				client.completePendingCommand();
				IOUtils.closeQuietly(is);
				IOUtils.closeQuietly(fos);
				/*
				 * //另外一种方式，供参考 OutputStream is = new
				 * FileOutputStream(localFile);
				 * ftpClient.retrieveFile(ff.getName(), is); is.close();
				 */
				files.add(downloadFile);
			}
			// logger.info("文件下载成功,下载文件路径：" + localDir);
			return files;
		} catch (IOException e) {
			logger.error("下载文件失败" + e.getMessage());
			throw new RuntimeException("下载文件失败" + e.getMessage());
		}
	}

	/**
	 * 上传文件
	 * 
	 * @param files
	 */
	public void upload(List<File> files, String remotePath) {
		OutputStream os = null;
		try {
			// 取本地文件
			if (files == null || files.size() == 0) {
				logger.warn("文件数为0，没有找到可上传的文件");
				return;
			}
			logger.info("准备上传" + files.size() + "个文件");
			// 设置远程FTP目录
			boolean flag = client.changeWorkingDirectory(remotePath);
			if (!flag) {
				if (createMultiDirectory(remotePath)) {
					client.changeWorkingDirectory(remotePath);
				}
			}
			logger.info("切换至工作目录【" + remotePath + "】");
			// 上传到FTP服务器
			for (File file : files) {
				os = client.storeFileStream(file.getName());
				if (os == null)
					throw new RuntimeException("上传失败，请检查是否有上传权限");
				IOUtils.copy(new FileInputStream(file), os);
				IOUtils.closeQuietly(os);
			}
			logger.info("文件上传成功,上传文件路径：" + remotePath);
		} catch (IOException e) {
			logger.error("上传文件失败" + e.getMessage());
			throw new RuntimeException("上传文件失败" + e.getMessage());
		}
	}

	public OutputStream getOutputStream(String fileName) {
		OutputStream os = null;
		// 设置远程FTP目录
		try {
			client.changeWorkingDirectory(remoteDir);
			logger.info("切换至工作目录【" + remoteDir + "】");
			os = client.storeFileStream(fileName);
			if (os == null)
				throw new RuntimeException("服务器上创建文件对象失败");
			return os;
		} catch (IOException e) {
			logger.error("服务器上创建文件对象失败" + e.getMessage());
			throw new RuntimeException("服务器上创建文件对象失败" + e.getMessage());
		}
	}

	/**
	 * 判断文件在FTP上是否存在
	 * 
	 * @param fileName
	 * @return
	 */
	public boolean isFileExist(String fileName) {
		boolean result = false;
		try {
			// 设置远程FTP目录
			client.changeWorkingDirectory(remoteDir);
			logger.info("切换至工作目录【" + remoteDir + "】");
			// 读取远程文件
			FTPFile[] ftpFiles = client.listFiles(regEx);
			if (ftpFiles.length == 0) {
				logger.warn("文件数为0，没有可下载的文件！");
				return result;
			}
			// 检查文件是否存在
			for (FTPFile file : ftpFiles) {
				if (file.getName().equals(fileName)) {
					result = true;
					break;
				}
			}
		} catch (Exception e) {
			logger.error("检查文件是否存在失败" + e.getMessage());
			throw new RuntimeException("检查文件是否存在失败" + e.getMessage());
		}

		return result;
	}
	
	/*
	 * 远程FTP服务器创建多级目录，创建目录失败或发生异常则返回false
	 */
	@SuppressWarnings("finally")
	private boolean createMultiDirectory(String multiDirectory) {
		boolean bool = false;
		try {
			String[] dirs = multiDirectory.split("/");
			client.changeWorkingDirectory("/");

			// 按顺序检查目录是否存在，不存在则创建目录
			for (int i = 1; dirs != null && i < dirs.length; i++) {
				if (!client.changeWorkingDirectory(dirs[i])) {
					if (client.makeDirectory(dirs[i])) {
						if (!client.changeWorkingDirectory(dirs[i])) {
							return false;
						}
					} else {
						return false;
					}
				}
			}

			bool = true;
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			return bool;
		}
	}

//	public static void main(String[] args) {
//		FtpUtil ftp = FtpUtil.getBeanFactory();
//		ftp.connect("10.79.1.78", 21, "ftpuser", "123456");
//		List<File> files = new ArrayList<File>();
//		File file = new File("E:/download/2017-08-21/1503306960343_10.108.67.151.csv");
//		files.add(file);
//		String remotePath = "/opt/report/";
//		ftp.upload(files, remotePath);
//		ftp.disconnect();
//	}
	
	/**
	 * 关闭连接
	 */
	public void disconnect() {
		try {
			client.disconnect();
			logger.info(" 关闭FTP连接!!! ");
		} catch (IOException e) {
			logger.warn(" 关闭FTP连接失败!!! ", e);
		}
	}

	@Override
	public String toString() {
		return "FtpUtils [host=" + host + ", port=" + port + ", username=" + username + ", password=" + password + "]";
	}
}