package com.ghotel.oss.console.core.utils;
import java.util.Properties;  
  
import org.springframework.beans.BeansException;  
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;  
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;  
  

public class CommonPropertyConfigurer extends PropertyPlaceholderConfigurer {  
  
  private static Properties properties;  
  
  @Override  
  protected void processProperties(ConfigurableListableBeanFactory beanFactory, Properties props) throws BeansException {  
    super.processProperties(beanFactory, props);  
    properties = props;  
  }  
  
  public static String getValue(String key) {  
    return properties.getProperty(key);  
  }  
  
  public static int getIntValue(String key) {  
    return Integer.parseInt(properties.getProperty(key));  
  }  
    
  public static boolean getBooleanValue(String key){  
    return Boolean.parseBoolean(properties.getProperty(key));  
  }  
}  