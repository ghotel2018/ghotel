package com.ghotel.oss.console.core.utils;

import java.io.IOException;
import java.io.InterruptedIOException;
import java.io.UnsupportedEncodingException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.net.ssl.SSLException;
import javax.net.ssl.SSLHandshakeException;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpEntityEnclosingRequest;
import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.NameValuePair;
import org.apache.http.NoHttpResponseException;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.AuthCache;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.HttpRequestRetryHandler;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.ConnectTimeoutException;
import org.apache.http.conn.routing.HttpRoute;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.LayeredConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.auth.BasicScheme;
import org.apache.http.impl.client.BasicAuthCache;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HttpContext;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.ghotel.oss.console.core.common.bean.DTOObjectMessage;
import com.ghotel.oss.console.core.common.bean.DTOPaginMessage;

/**
 * HttpClient工具类
 * 
 * @return
 */
public class HttpClientUtil {

    static final int timeOut = 100 * 1000;
    private static final Logger log = LoggerFactory.getLogger(HttpClientUtil.class);
    
    private static CloseableHttpClient httpClient = null;
    private final static Object syncLock = new Object();
    private static Object targetProxObj=null;
	private static String proxUrl="10.101.1.6";
	private static int proxport=80;
	private static String proxUserName="_SSO_T_09659";
	private static String proxPassword="sso@09659";
	private static boolean userProx = false;
	private static String defualteUrl="http://10.68.130.46:80";
	
	
    private static void config(HttpRequestBase httpRequestBase) {
      
        // 配置请求的超时设置
        RequestConfig requestConfig = RequestConfig.custom()
                .setConnectionRequestTimeout(timeOut)
                .setConnectTimeout(timeOut).setSocketTimeout(timeOut).build();
        httpRequestBase.setConfig(requestConfig);
    }
     
    /**
     * 获取HttpClient对象
     * 
     * @return
     * @author SHANHY
     * @create 2015年12月18日
     */
    public static CloseableHttpClient getHttpClient(String url) {
        String hostname = url.split("/")[2];
        int port = 80;
        if (hostname.contains(":")) {
            String[] arr = hostname.split(":");
            hostname = arr[0];
            port = Integer.parseInt(arr[1]);
        }
        if (httpClient == null) {
            synchronized (syncLock) {
                if (httpClient == null) {
                    httpClient = createHttpClient(200, 40, 100, hostname, port);
                    defualteUrl=CommonPropertyConfigurer.getValue("Coupon.defualteUrl")  ;
                   /* String isProx=CommonPropertyConfigurer.getValue("Coupon.isProx") ;
                    if(StringUtils.isNotBlank(isProx)&&("Y".equalsIgnoreCase(isProx.trim())||"1".equals(isProx.trim()))){
                    	userProx=true;
                    }*/
                }
            }
        }
        return httpClient;

    }
    public static void initProxPost(){
    	if (targetProxObj == null) {
            synchronized (syncLock) {
                if (targetProxObj == null) {
                	/*proxUrl=CommonPropertyConfigurer.getValue("Coupon.proxUrl") ;
                	proxport=Integer.parseInt(CommonPropertyConfigurer.getValue("Coupon.proxPort")) ;
                	proxUserName=CommonPropertyConfigurer.getValue("Coupon.proxUserName")  ;
                	proxPassword=CommonPropertyConfigurer.getValue("Coupon.proxPassWord")  ;*/
                	defualteUrl=CommonPropertyConfigurer.getValue("Coupon.defualteUrl")  ;
                	targetProxObj=new Object();
                }
            }
        }
    	
    }
    /**
     * 创建HttpClient对象
     * 
     * @return
     */
    public static CloseableHttpClient createHttpClient(int maxTotal,
            int maxPerRoute, int maxRoute, String hostname, int port) {
        ConnectionSocketFactory plainsf = PlainConnectionSocketFactory
                .getSocketFactory();
        LayeredConnectionSocketFactory sslsf = SSLConnectionSocketFactory
                .getSocketFactory();
        Registry<ConnectionSocketFactory> registry = RegistryBuilder
                .<ConnectionSocketFactory> create().register("http", plainsf)
                .register("https", sslsf).build();
        PoolingHttpClientConnectionManager cm = new PoolingHttpClientConnectionManager(
                registry);
        // 将最大连接数增加
        cm.setMaxTotal(maxTotal);
        // 将每个路由基础的连接增加
        cm.setDefaultMaxPerRoute(maxPerRoute);
        HttpHost httpHost = new HttpHost(hostname, port);
        // 将目标主机的最大连接数增加
        cm.setMaxPerRoute(new HttpRoute(httpHost), maxRoute);

        // 请求重试处理
        HttpRequestRetryHandler httpRequestRetryHandler = new HttpRequestRetryHandler() {
            public boolean retryRequest(IOException exception,
                    int executionCount, HttpContext context) {
                if (executionCount >= 5) {// 如果已经重试了5次，就放弃
                    return false;
                }
                if (exception instanceof NoHttpResponseException) {// 如果服务器丢掉了连接，那么就重试
                    return true;
                }
                if (exception instanceof SSLHandshakeException) {// 不要重试SSL握手异常
                    return false;
                }
                if (exception instanceof InterruptedIOException) {// 超时
                    return false;
                }
                if (exception instanceof UnknownHostException) {// 目标服务器不可达
                    return false;
                }
                if (exception instanceof ConnectTimeoutException) {// 连接被拒绝
                    return false;
                }
                if (exception instanceof SSLException) {// SSL握手异常
                    return false;
                }

                HttpClientContext clientContext = HttpClientContext
                        .adapt(context);
                HttpRequest request = clientContext.getRequest();
                // 如果请求是幂等的，就再次尝试
                if (!(request instanceof HttpEntityEnclosingRequest)) {
                    return true;
                }
                return false;
            }
        };

        CloseableHttpClient httpClient = HttpClients.custom()
                .setConnectionManager(cm)
                .setRetryHandler(httpRequestRetryHandler).build();

        return httpClient;
    }

    private static void setPostParams(HttpPost httpost,
            Map<String, Object> params) {
        List<NameValuePair> nvps = new ArrayList<NameValuePair>();
        Set<String> keySet = params.keySet();
        for (String key : keySet) {
            nvps.add(new BasicNameValuePair(key, params.get(key).toString()));
        }
        try {
            httpost.setEntity(new UrlEncodedFormEntity(nvps, "UTF-8"));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }
    private static void setPostParams(HttpPost httpost,
            String json) throws UnsupportedEncodingException {
    	 if(json!=null){
    		    StringEntity entity = new StringEntity(json, "utf-8");
    	        entity.setContentEncoding("UTF-8");
    	        entity.setContentType("application/json");
		        httpost.setEntity(entity);	
	      }
    }
    public static String postJson(String url, String json) throws Exception {
    	 if(StringUtils.isNotBlank(url)){
    		 url=url.trim();
    		 if(!url.startsWith("http:")&&!url.startsWith("https:")){
    			 if(url.startsWith("/")){
    				 url=defualteUrl+url;
    			 }else{
    				 url=defualteUrl+"/"+url;
    			 }
    		 }
    	 }
    	 log.info("请求路径:{}",url);
		 log.debug("请求参数:{}",json); 
    	 HttpPost httppost = new HttpPost(url);
    	 setPostParams(httppost,json);
    	 config(httppost);
    	 return exceutPost( httppost, url,userProx) ;
    	
    }
    public static HttpClientContext getProxContext(HttpHost targetHost ){
		CredentialsProvider credsProvider = new BasicCredentialsProvider();
		credsProvider.setCredentials(new AuthScope(targetHost.getHostName(),
				targetHost.getPort()), new UsernamePasswordCredentials(
						proxUserName, proxPassword));
		AuthCache authCache = new BasicAuthCache();
		BasicScheme basicAuth = new BasicScheme();
		authCache.put(targetHost, basicAuth);
		HttpClientContext context = HttpClientContext.create();
		context.setCredentialsProvider(credsProvider);
		context.setAuthCache(authCache);
		return context;
    }
    public static String exceutPost(HttpPost httppost,String url,boolean userProx) throws Exception{
    	  CloseableHttpResponse response = null;
          try {
        	  long l=System.currentTimeMillis();
        	  CloseableHttpClient closeableHttpClient =getHttpClient(url);
        	  if(userProx){
        		 initProxPost();
        		 HttpHost targetHost = new HttpHost(proxUrl, proxport, "http");
        		 HttpClientContext context= getProxContext(targetHost);
        		 response =closeableHttpClient.execute(targetHost,httppost,context); 
        	  }else{
        	    response = closeableHttpClient.execute(httppost,HttpClientContext.create());  
        	  }
              HttpEntity entity = response.getEntity();
              String result = EntityUtils.toString(entity, "utf-8");
              EntityUtils.consume(entity);
              if(log.isDebugEnabled()){
  				 log.debug("请求路径:"+url+"耗时："+(System.currentTimeMillis()-l));
  		       }
              log.info(result+"请求路径:"+url+"耗时："+(System.currentTimeMillis()-l));
              return result;
          } catch (Exception e) {
        	  log.error("请求路径：{},原因{}",url,e);
              throw e;
          } finally {
              try {
                  if (response != null)
                      response.close();
              } catch (IOException e) {
            	  log.error("请求路径：{},原因{}",url,e);
              }
          }
    }
    public static String post(String url, Map<String, Object> params,boolean userProx) throws Exception {
        HttpPost httppost = new HttpPost(url);
        config(httppost);
        setPostParams(httppost, params);
        return exceutPost( httppost, url,userProx);
    }
    public static String exceutGet(HttpGet httpget,String url,boolean userProx) throws Exception{
  	  CloseableHttpResponse response = null;
        try {
      	     long l=System.currentTimeMillis();
      	     CloseableHttpClient closeableHttpClient =getHttpClient(url);
	      	 if(userProx){
	      		 initProxPost();
	      		 HttpHost targetHost = new HttpHost(proxUrl, proxport, "http");
	      		 HttpClientContext context= getProxContext(targetHost);
	      		 response =closeableHttpClient.execute(targetHost,httpget,context); 
	      	  }else{
	      	    response = closeableHttpClient.execute(httpget,HttpClientContext.create());  
	      	 }
            HttpEntity entity = response.getEntity();
            String result = EntityUtils.toString(entity, "utf-8");
            EntityUtils.consume(entity);
            log.info(result+"请求路径:"+url+"耗时："+(System.currentTimeMillis()-l));
            return result;
        } catch (Exception e) {
      	  log.error("请求路径："+url,e);
            throw e;
        } finally {
            try {
                if (response != null)
                    response.close();
            } catch (IOException e) {
          	  log.error("请求路径："+url,e);
            }
        }
  }
    public static String httpGet(String url,boolean userProx) throws Exception{
    	 log.info("请求路径:"+url);
		HttpGet httpget=new HttpGet(url);
		try { 
			return exceutGet(httpget, url,userProx);
		}catch (Exception e) {
			log.error("调SVC接口异常",e);
			throw new Exception("SVC接口异常");
		}
	}
    public static String get(String url) {
        HttpGet httpget = new HttpGet(url);
        config(httpget);
        CloseableHttpResponse response = null;
        try {
            response = getHttpClient(url).execute(httpget,
                    HttpClientContext.create());
            HttpEntity entity = response.getEntity();
            String result = EntityUtils.toString(entity, "utf-8");
            EntityUtils.consume(entity);
            return result;
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (response != null)
                    response.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

	public static DTOObjectMessage<?> isSecussObjectMessage(String result) {
		 DTOObjectMessage<?> groupCodeResult =JSON.parseObject(result, new TypeReference<DTOObjectMessage>() {});
     	 if (!isSecuss( groupCodeResult)){
     		  if(groupCodeResult!=null){
     			  throw new RuntimeException(groupCodeResult.getMessageBody()==null?result:groupCodeResult.getMessageBody().toString());
     		  }else{
     			 throw new RuntimeException(result);
     		  }
     	 }
     	 return groupCodeResult;
	}
	public static DTOPaginMessage<?> isSecussPaginMessage(String result) {
		DTOPaginMessage<?> groupCodeResult =JSON.parseObject(result, new TypeReference<DTOPaginMessage>() {});
    	 if (!isSecuss( groupCodeResult)){
    		  if(groupCodeResult!=null){
    			  throw new RuntimeException(groupCodeResult.getMessageBody()==null?result:groupCodeResult.getMessageBody().toString());
    		  }else{
    			 throw new RuntimeException(result);
    		  }
    	 }
    	 return groupCodeResult;
	}
	public static boolean isSecuss(String result) {
		 DTOObjectMessage<?> groupCodeResult =JSON.parseObject(result, new TypeReference<DTOObjectMessage>() {});
		 return isSecuss(groupCodeResult);
	}

	public static boolean isSecuss(DTOObjectMessage<?> groupCodeResult) {
		 return (groupCodeResult!=null&&0==groupCodeResult.getStatusCode());
	}
	public static boolean isSecuss(DTOPaginMessage<?> groupCodeResult) {
		 return (groupCodeResult!=null&&0==groupCodeResult.getStatusCode());
	}

 
}