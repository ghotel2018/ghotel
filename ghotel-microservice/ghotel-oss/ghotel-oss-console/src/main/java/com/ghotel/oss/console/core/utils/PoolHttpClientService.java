package com.ghotel.oss.console.core.utils;

import java.io.IOException;

import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustSelfSignedStrategy;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.message.BasicHeader;
import org.apache.http.protocol.HTTP;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PoolHttpClientService {
    // 日志  
	private static Logger logger = LoggerFactory.getLogger(EmailUtils.class);
  
    private static final String CHAR_SET = "UTF-8";  
  
  
   /* // 代理IP  
    @Value("${InetAddressStr}")  
    private String InetAddressStr;  
  
  
    // 代理端口  
    @Value("${InetPort}")  
    private int InetPort;  */
  
  
    /** 
     * 最大连接数400 
     */  
    private static int MAX_CONNECTION_NUM = 50;  
  
  
    /** 
     * 单路由最大连接数80 
     */  
    private static int MAX_PER_ROUTE = 10;  
  
    private static PoolHttpClientService singleton=null;
  
    /** 
     * 向服务端请求超时时间设置(单位:毫秒) 
     */  
    private static int SERVER_REQUEST_TIME_OUT = 2000;  
  
  
    /** 
     * 服务端响应超时时间设置(单位:毫秒) 
     */  
    private static int SERVER_RESPONSE_TIME_OUT = 20;  
  
  
    /** 
     * 构造函数 
     */  
    private PoolHttpClientService() {  
    }  
    
    public static PoolHttpClientService getInstance() {  
        if (singleton == null) {    
            synchronized (PoolHttpClientService.class) {    
               if (singleton == null) {    
                  singleton = new PoolHttpClientService();   
               }    
            }    
        }    
        return singleton;   
    }  
  
    private static Object LOCAL_LOCK = new Object();  
      
    /** 
     * 连接池管理对象 
     */  
    PoolingHttpClientConnectionManager cm = null;  
  
  
    /** 
     *  
     * 功能描述: <br> 
     * 初始化连接池管理对象 
     * 
     * @see [相关类/方法](可选) 
     * @since [产品/模块版本](可选) 
     */  
    private PoolingHttpClientConnectionManager getPoolManager() {  
        final String methodName = "getPoolManager";  
        if (null == cm) {  
            synchronized (LOCAL_LOCK) {  
                if (null == cm) {  
                    SSLContextBuilder sslContextBuilder = new SSLContextBuilder();  
                    try {  
                        sslContextBuilder.loadTrustMaterial(null, new TrustSelfSignedStrategy());  
                        SSLConnectionSocketFactory socketFactory = new SSLConnectionSocketFactory(  
                                sslContextBuilder.build());  
                        Registry<ConnectionSocketFactory> socketFactoryRegistry = RegistryBuilder.<ConnectionSocketFactory> create()  
                                .register("https", socketFactory)  
                                .register("http", new PlainConnectionSocketFactory())  
                                .build();  
                        cm = new PoolingHttpClientConnectionManager(socketFactoryRegistry);  
                        cm.setMaxTotal(MAX_CONNECTION_NUM);  
                        cm.setDefaultMaxPerRoute(MAX_PER_ROUTE);  
                    } catch (Exception e) {  
                        logger.error(methodName, "init PoolingHttpClientConnectionManager Error" + e);  
                    }  
  
  
                }  
            }  
        }  
        logger.info(methodName, "initPoolManager");  
        return cm;  
    }  
  
  
    /** 
     * 创建线程安全的HttpClient 
     *  
     * @param config 客户端超时设置 
     *  
     * @return 
     */  
    public CloseableHttpClient getHttpsClient(RequestConfig config) {  
        final String methodName = "getHttpsClient";  
        logger.info(methodName, "initHttpsClient");  
        CloseableHttpClient httpClient = HttpClients.custom().setDefaultRequestConfig(config)  
                .setConnectionManager(this.getPoolManager())  
                .build();  
        logger.info(methodName, "initHttpsClient");  
        return httpClient;  
    }  
  
  
    /** 
     * Https post请求 
     *  
     * @param url 请求地址 
     * @param xmlStr 请求参数(如果为null,则表示不请求参数) return 返回结果 
     */  
    public  String poolHttpsPost(String url, String xmlStr) {  
        final String methodName = "poolHttpsPost";  
        logger.info(methodName, xmlStr);  
        CloseableHttpResponse response = null;  


            HttpPost post = null;  
        try {  
            // 设置代理  
            //HttpHost proxy = new HttpHost(InetAddressStr, InetPort);  
            // connectTimeout设置服务器请求超时时间  
            // socketTimeout设置服务器响应超时时间  
            RequestConfig requestConfig = RequestConfig.custom() 
                    .setSocketTimeout(SERVER_REQUEST_TIME_OUT).setConnectTimeout(SERVER_RESPONSE_TIME_OUT).build();  
            post = new HttpPost(url);  
            post.setConfig(requestConfig);  
            post.setHeader("Content-Type",  
                    "application/xml;charset=UTF-8");  
  
            if (xmlStr != null) {  
                StringEntity se = new StringEntity(xmlStr.toString(), CHAR_SET);  
                se.setContentEncoding(new BasicHeader(HTTP.CONTENT_TYPE, "application/xml;"));  
                post.setEntity(se);  
            }  
  
  
            response = getHttpsClient(requestConfig).execute(post);  
            int status = response.getStatusLine().getStatusCode();  
  
  
            String result = null;  
            if (status == 200) {  
                result = EntityUtils.toString(response.getEntity(), CHAR_SET);  
            }  
            EntityUtils.consume(response.getEntity());  
            response.close();  
            return result;  
        } catch (Exception e) {  
            logger.error(e.getMessage());  
        } finally {  
                  post.releaseConnection();  
            if (response != null) {  
                try {  
                    EntityUtils.consume(response.getEntity());  
                    response.close();  
                } catch (IOException e) {  
                    logger.error(methodName, e.getMessage());  
                }  
            }  
        }  
        logger.info(methodName);  
        // 超时或者网络不通时返回值  
        return null; 
    }
}
