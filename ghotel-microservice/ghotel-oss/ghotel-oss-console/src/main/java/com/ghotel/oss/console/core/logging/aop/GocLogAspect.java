package com.ghotel.oss.console.core.logging.aop;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ghotel.oss.console.core.interfaze.ILogContentConverter;
import com.ghotel.oss.console.core.logging.annotation.GocLogAnnotation;
import com.ghotel.oss.console.core.logging.bean.GocNoticeBean;
import com.ghotel.oss.console.modules.admin.bean.ModuleInfoBean;
import com.ghotel.oss.console.modules.admin.service.ResourceMaintenanceService;
import com.ghotel.oss.console.modules.notice.service.GocNoticeService;
import org.apache.commons.lang.time.DateFormatUtils;
import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.ghotel.oss.console.core.utils.GocUserUtils;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * 操作日志切点类
 */
//@Aspect
//@Component
public class GocLogAspect {

    @Autowired
    private GocNoticeService noticeService;

    @Autowired
    private ResourceMaintenanceService goResourceMaintenanceService;

    private List<ModuleInfoBean> modules = new ArrayList<ModuleInfoBean>();

    private final Logger logger = LoggerFactory.getLogger(GocLogAspect.class);

    @Pointcut("@annotation(com.ghotel.oss.console.core.logging.annotation.GocLogAnnotation)")
    public void logAspect() {

    }

    /**
     * 后置通知 用于拦截Controller层记录用户的操作
     *
     * @param joinPoint 切点
     */
    @After("logAspect()")
    public void doAfter(JoinPoint joinPoint) {
        try {
            if (modules.size() == 0) {
                modules = goResourceMaintenanceService.getAllModule();
            }
            StringBuffer params = new StringBuffer();
            ObjectMapper mapper = new ObjectMapper();
            if (joinPoint.getArgs() != null && joinPoint.getArgs().length > 0) {
                for (int i = 0; i < joinPoint.getArgs().length; i++) {
                    params.append(mapper.writeValueAsString(joinPoint.getArgs()[i]));
                    params.append(":");
                }
            }
            String userName = GocUserUtils.getLoginUserLoginId();
            String content = "参数:" + params;
            String moduleId = getModuleId(joinPoint);
            String subjectName = String.format("用户【%s】成功执行了模块【%s】的动作【%s】。", userName, getModuleDescription(moduleId, modules),
                    getMthodDescription(joinPoint));
            String converterStr = getContentConverter(joinPoint);
            if (StringUtils.isNoneBlank(converterStr)) {
                ILogContentConverter converter = (ILogContentConverter) Class.forName(converterStr).newInstance();
                if (converter != null) {
                    content = converter.convertTo(joinPoint.getSignature().getName(), joinPoint.getArgs());
                }
            }
            GocNoticeBean gocNoticeBean = new GocNoticeBean();
            String currentTimeString = DateFormatUtils.format(System.currentTimeMillis(), "yyyy-MM-dd HH:mm:ss.sss");
            gocNoticeBean.setCreateTime(currentTimeString);
            gocNoticeBean.setModule(moduleId);
            gocNoticeBean.setNoticeContent(content);
            gocNoticeBean.setNoticeReceiver(userName);
            gocNoticeBean.setNoticeSubject(subjectName);
            gocNoticeBean.setNoticeType("op");
            gocNoticeBean.setNoticeId(UUID.randomUUID().toString());
            noticeService.addNotice(gocNoticeBean);
        } catch (Exception e) {
            logger.error("日志切面【后置通知】异常：异常信息为：{},堆栈为：{}", e.getMessage(), e);
        }

    }

    /**
     * 异常通知 用于拦截service层记录异常日志
     *
     * @param joinPoint
     * @param e
     */
    @AfterThrowing(pointcut = "logAspect()", throwing = "e")
    public void doAfterThrowing(JoinPoint joinPoint, Throwable e) {
        try {
            // 获取用户请求方法的参数并序列化为JSON格式字符串
            String params = "";
            ObjectMapper mapper = new ObjectMapper();
            if (joinPoint.getArgs() != null && joinPoint.getArgs().length > 0) {
                for (int i = 0; i < joinPoint.getArgs().length; i++) {
                    params += mapper.writeValueAsString(joinPoint.getArgs()[i]) + ";";
                }
            }

            /* ========控制台输出========= */
            logger.info("=====异常通知开始=====");
            logger.info("异常代码:" + e.getClass().getName());
            logger.info("异常信息:" + e.getMessage());
            logger.info("异常方法:"
                    + (joinPoint.getTarget().getClass().getName() + "." + joinPoint.getSignature().getName() + "()"));
            try {
                logger.info("方法描述:" + getMthodDescription(joinPoint));
            } catch (Exception e1) {
                // TODO Auto-generated catch block
                // e1.printStackTrace();
            }
            logger.info("请求参数:" + params);
            logger.info("请求人:" + GocUserUtils.getLoginUserLoginId());
            /* ==========数据库日志========= */
            logger.info("=====异常通知结束=====");
        } catch (Exception ex) {
            logger.error("日志切面【异常通知】异常：异常信息为：{},堆栈为：{}", ex.getMessage(), ex);
        }


    }

    /**
     * 获取注解中对方法的描述信息 用于service层注解
     *
     * @param joinPoint 切点
     * @return 方法描述
     * @throws Exception
     */
    private String getMthodDescription(JoinPoint joinPoint) throws Exception {
        String targetName = joinPoint.getTarget().getClass().getName();
        String methodName = joinPoint.getSignature().getName();
        Object[] arguments = joinPoint.getArgs();
        Class<?> targetClass = Class.forName(targetName);
        Class<?> parentClass = targetClass.getSuperclass();
        Method[] methods = targetClass.getMethods();
        String description = "";
        for (Method method : methods) {
            if (method.getName().equals(methodName)) {
                Class<?>[] clazzs = method.getParameterTypes();
                if (clazzs.length == arguments.length) {

                    description = method.getAnnotation(GocLogAnnotation.class).description();
                    // 如果当前方法没有注释，则获取父类的方法的注释
                    if (description == null || description.length() == 0) {
                        description = parentClass.getMethod(methodName, clazzs).getAnnotation(GocLogAnnotation.class)
                                .description();
                    }
                    break;
                }
            }
        }
        return description;
    }

    /**
     * 获取注解中对方法或者类的描述信息
     *
     * @param joinPoint 切点
     * @return 方法描述
     * @throws Exception
     */
    private String getModuleId(JoinPoint joinPoint) throws Exception {
        String targetName = joinPoint.getTarget().getClass().getName();
        Class<?> targetClass = Class.forName(targetName);
        String moduleId = ((GocLogAnnotation) targetClass.getAnnotation(GocLogAnnotation.class)).moduleId();
        return moduleId;
    }

    /**
     * 获取注解中对方法的描述信息 用于Controller层注解
     *
     * @param joinPoint 切点
     * @return 方法描述
     * @throws Exception
     */
    private String getContentConverter(JoinPoint joinPoint) throws Exception {
        String targetName = joinPoint.getTarget().getClass().getName();
        String methodName = joinPoint.getSignature().getName();
        Object[] arguments = joinPoint.getArgs();
        Class<?> targetClass = Class.forName(targetName);
        // Class<?> parentClass = targetClass.getSuperclass();
        Method[] methods = targetClass.getMethods();
        String description = "";
        for (Method method : methods) {
            if (method.getName().equals(methodName)) {
                Class<?>[] clazzs = method.getParameterTypes();
                if (clazzs.length == arguments.length) {
                    description = method.getAnnotation(GocLogAnnotation.class).contentConverter();
                    break;
                }
            }
        }
        return description;
    }

    private String getModuleDescription(String code, List<ModuleInfoBean> modules) {

        String desc = code;
        for (ModuleInfoBean module : modules) {
            if (code != null && code.equals(module.getModuleId())) {
                desc = module.getModuleName().toString();
            }
        }
        return desc;

    }

}