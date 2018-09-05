package com.ghotel.oss.console.core.utils;



import java.io.IOException;
import java.text.SimpleDateFormat;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.module.jaxb.JaxbAnnotationModule;
import com.fasterxml.jackson.module.jaxb.JaxbAnnotationModule.Priority;

public class JsonUtil {
	
	private static ObjectMapper objectMapper = null;
	
	public static ObjectMapper getInstance() {
		if(objectMapper == null){
			synchronized(JsonUtil.class){
				if(objectMapper == null){
					objectMapper = new ObjectMapper();
					objectMapper.setSerializationInclusion(Include.NON_NULL);
					objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
					objectMapper.configure(DeserializationFeature.FAIL_ON_INVALID_SUBTYPE, false);
					objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
					objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm"));
				    JaxbAnnotationModule jaxbMod = new JaxbAnnotationModule();
				    jaxbMod.setPriority(Priority.SECONDARY);
				    objectMapper.registerModule(jaxbMod);   
				}
			}
		}
		return objectMapper;
	}
	
	/**
	 * javaBean,list,array convert to json string
	 */
	public static String tojson(Object obj) throws Exception {
		return getInstance().writeValueAsString(obj);
	}

	/**
	 * json string convert to javaBean
	 */
	public static <T> T fromJson(String jsonStr, Class<T> clazz)
			throws Exception {
		return getInstance().readValue(jsonStr, clazz);
	}
	
	/**
	 * json string convert to List<javaBean>
	 */
	public static <T> T fromJson(String jsonAsString, TypeReference<T> tr) throws Exception{
		return getInstance().readValue(jsonAsString, tr);
	}
}

