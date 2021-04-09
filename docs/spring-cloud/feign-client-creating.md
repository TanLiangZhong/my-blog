---
title: 手动创建FeignClient
date: '2020-12-23'
sidebar: 'auto'
categories:
- 后端
tags:
- spring-cloud
- openfegin
publish: true
---
> 当使用 `@FeignClient` 满足不了需求时, 可以使用`Feign Builder API`创建客户端
#### 代码示例(自行领悟)：
```java
import feign.Contract;
import feign.Feign;
import feign.codec.Decoder;
import feign.codec.Encoder;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.openfeign.FeignClientsConfiguration;
import org.springframework.context.annotation.Import;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Feign - service
 *
 * @author Tan
 * @version 1.0 2020/12/23
 */
@Service
@RequiredArgsConstructor
@Import(FeignClientsConfiguration.class)
public class FeignClientsService {

    private final Decoder decoder;
    private final Encoder encoder;
    private final Contract contract;

    /**
     * 创造 Feign Client
     *
     * @param apiType Feign interface
     * @param url     base url
     * @param <T>     Feign Client
     * @return Feign Client
     */
    public <T> T creating(Class<T> apiType, String url) {
        return Feign.builder()
                .encoder(encoder)
                .decoder(decoder)
                .contract(contract)
                .target(apiType, url);
    }

    public interface FooApi {
        @GetMapping
        String baidu();
    }

}
```
#### Run
```
    @Autowired(required = false)
    private FeignClientsService feignClientsService;

    @Test
    void contextLoads() {
        FeignClientsService.FooApi authApi = feignClientsService.creating(FeignClientsService.FooApi.class, "https://www.baidu.com/");
        log.info("authApi: {}", authApi);

        String result = authApi.baidu();

        log.info("Result: {}", result);

    }
```
#### 执行结果
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35e3c860318e42649dbb58fec365bfe7~tplv-k3u1fbpfcp-watermark.image)

#### [官方文档](https://docs.spring.io/spring-cloud-openfeign/docs/2.2.5.RELEASE/reference/html/#creating-feign-clients-manually)