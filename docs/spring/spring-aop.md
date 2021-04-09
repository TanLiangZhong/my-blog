---
title: spring aop
date: '2019-07-29'
sidebar: 'auto'
categories:
- 后端
tags:
- spring
publish: true
---

AOP是Spring框架面向切面的编程思想，AOP采用一种称为“横切”的技术，将涉及多业务流程的通用功能抽取并单独封装，形成独立的切面，在合适的时机将这些切面横向切入到业务流程指定的位置中. 如：日志、安全、缓存和事务管理

#### Spring AOP 五大通知类型

```text
@Before                  前置通知，在方法执行之前执行
@After                      后置通知，在方法执行之后执行（无论是否发生异常）还不能访问目标方法执行的结果
@AfterRunning     返回通知，在方法正常结束后 返回结果之后执行 可以访问方法的返回值
@AfterThrowing   异常通知，在方法抛出异常之后
@Around                 环绕通知，围绕着方法执行
```

#### 示例:

```java
package com.ml.jkeep.internal.aop;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.Map;

/**
 * 日志切面
 */
@Slf4j
@Aspect
@Component
public class LogAspect {

    @Pointcut("execution(* com.ml.jkeep.internal.system..*.*(..))")
    public void controllerAspect() {
        // AOP 拦截 Controller
    }

    /**
     * 前置通知,方法执行前通知
     *
     * @param joinPoint
     */
    @Before("controllerAspect()")
    public void doBefore(JoinPoint joinPoint) {
        log.info("Before, 方法执行前通知，{}", joinPoint);
    }

    /**
     * 返回通知，在方法正常结束后, 返回结果之后执行, 方法执行异常则不会执行
     *
     * @param joinPoint
     */
    @AfterReturning("controllerAspect()")
    public void doAfterReturning(JoinPoint joinPoint) {
        log.info("AfterReturning, 方法成功执行后通知，{}", joinPoint);
    }

    /**
     * 后置通知，在方法执行之后执行（无论是否发生异常）还不能访问目标方法执行的结果
     *
     * @param joinPoint
     */
    @After("controllerAspect()")
    public void doAfter(JoinPoint joinPoint) {
        log.info("After, 方法执行前通知，{}", joinPoint);
    }


    /**
     * 环绕通知，围绕着方法执行
     *
     * @param pjp
     * @return
     * @throws Throwable
     */
    @Around("controllerAspect()")
    public Object doAfter(final ProceedingJoinPoint pjp) throws Throwable {
        log.info("Around, 环绕通知，{}", pjp);
        long begin = System.currentTimeMillis();
        Object result = pjp.proceed();
        Long timeConsuming = System.currentTimeMillis() - begin;
        log.info("Around, 环绕通知, 结果: {}, 耗时: {}", JSON.toJSONString(result), timeConsuming);
        return result;
    }

    /**
     * 异常通知，在方法抛出异常之后
     *
     * @param joinPoint
     * @param e
     */
    @AfterThrowing(pointcut = "controllerAspect()", throwing = "e")
    public void doAfterThrowing(JoinPoint joinPoint, Throwable e) {
        log.info("AfterThrowing, 方法抛出异常后执行通知，{} , Error: {}", joinPoint, e);
    }
}

```

正常结果输出:

```text
Around, 环绕通知，execution(RestVo com.ml.jkeep.internal.system.RoleController.findById(String))
Before, 方法执行前通知，execution(RestVo com.ml.jkeep.internal.system.RoleController.findById(String))
Around, 环绕通知, 结果: {"code":"S0000","message":"Hello liangzhong","success":true}, 耗时: 1000
After, 方法执行前通知，execution(RestVo com.ml.jkeep.internal.system.RoleController.findById(String))
AfterReturning, 方法成功执行后通知，execution(RestVo com.ml.jkeep.internal.system.RoleController.findById(String))
```

异常结果输出:

```text
Around, 环绕通知，execution(void com.ml.jkeep.internal.system.RoleController.error())
Before, 方法执行前通知，execution(void com.ml.jkeep.internal.system.RoleController.error())
After, 方法执行前通知，execution(void com.ml.jkeep.internal.system.RoleController.error())
AfterThrowing, 方法抛出异常后执行通知，execution(void com.ml.jkeep.internal.system.RoleController.error()) , Error: {}
```

