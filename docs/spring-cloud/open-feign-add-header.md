---
title: OpenFeign添加认证Token
date: '2021-1-7'
sidebar: 'auto'
categories:
- 后端
tags:
- spring-cloud
- openfegin
publish: true
---

### 实现方案
> 实现`RequestInterceptor`拦截每一个Feign请求,都加上 Token 

### `RequestInterceptor`Feign拦截
```java

/**
 * Feign 请求拦截
 *
 * @author Tan
 * @version 1.0 2021/1/7
 */
@Slf4j
@Component //注入Bean，也可使用配置属性进行配置
public class FeignRequestInterceptor implements RequestInterceptor {

    @Override
    public void apply(RequestTemplate template) {
        log.info("Feign 调用, url: {} ", template.request().url());

        HttpServletRequest request = Optional.ofNullable(RequestContextHolder.getRequestAttributes()).map(it -> ((ServletRequestAttributes) it).getRequest()).orElse(null);
        if (request == null) {
            return;
        }
        Iterator<String> headerIterator = CollectionUtils.toIterator(request.getHeaderNames());
        while (headerIterator.hasNext()) {
            String name = headerIterator.next();
            log.info("add header, url: {} , path: {}", name, request.getHeader(name));
            // 只写入 Authorization
            if (BaseConstants.HEADER_KEY_TOKEN.equals(name)) {
                template.header(name, request.getHeader(name));
            }
        }
    }
}
```

### 配置方式
* 1.使用`@Component`注入Bean, 见代码示例
* 2.使用配置属性进行配置
```yaml
feign:
  client:
    config:
      feignName:
        requestInterceptors:
          - com.example.FeignRequestInterceptor
```


### [官方文档](https://docs.spring.io/spring-cloud-openfeign/docs/2.2.5.RELEASE/reference/html/#spring-cloud-feign-overriding-defaults)
