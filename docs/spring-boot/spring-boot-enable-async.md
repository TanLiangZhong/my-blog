---
title: SpringBoot启用异步及线程池配置
date: '2021-06-02'
sidebar: 'auto'
categories:
- 后端
tags:
- spring-boot
publish: true
---

```java
/**
 * 默认异步任务配置
 *
 * @author Tan
 * @version 1.0
 * @date 2021/6/2
 */
@EnableAsync(proxyTargetClass = true)
@Configuration
public class DefaultAsyncTaskConfiguration {

    @Bean
    public TaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        // 核心池大小是保持活动状态的最小工作线程数
        executor.setCorePoolSize(4);
        // 最大线程数
        executor.setMaxPoolSize(64);
        // 线程最大空闲时间/秒（根据使用情况指定）
        executor.setKeepAliveSeconds(60);
        // 任务队列大小（根据使用情况指定）
        executor.setQueueCapacity(128);
        // 线程名称前缀
        executor.setThreadNamePrefix("BaseExecutor-");
        /*
           rejectedExecutionHandler: 当pool线程数达到maxPoolSize时, 如何处理被拒线程任务
           ThreadPoolExecutor.CallerRunsPolicy: 不在新线程中执行任务，而是有调用者所在的线程来执行
         */
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        return executor;
    }
}
```
