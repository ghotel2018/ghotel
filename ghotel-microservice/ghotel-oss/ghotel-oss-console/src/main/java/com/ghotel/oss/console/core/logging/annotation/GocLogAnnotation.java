package com.ghotel.oss.console.core.logging.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 操作日志注解类
 */
@Retention(RetentionPolicy.RUNTIME)   
@Target({ElementType.METHOD,ElementType.TYPE})
public @interface GocLogAnnotation {

    /**
     * 模块ID
     * @return
     */
	String moduleId() default "";

    /**
     * 描述
     * @return
     */
	String description() default "";
	
	String contentConverter() default "";
	
}  