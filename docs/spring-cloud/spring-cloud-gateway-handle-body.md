---
title: SpringCloudGateway处理body
date: '2020-12-07'
sidebar: 'auto'
categories:
- 后端
tags:
- spring-cloud
- gateway
publish: true
---

### 版本信息
> SpringCloud-Hoxton.SR8 
###  方案一
> 使用 [ModifyRequestBodyGatewayFilterFactory](https://docs.spring.io/spring-cloud-gateway/docs/2.2.5.RELEASE/reference/html/#modify-a-request-body-gatewayfilter-factory), 可以对请求正文进行修改,但是只能使用Java DSL来配置此过滤器. （官网有介绍就不多BB...）

### 方案二
> 借鉴 `org.springframework.cloud.gateway.filter.factory.rewrite.ModifyRequestBodyGatewayFilterFactory`, 重新造个轮子. 
#### 1. 复制`ModifyRequestBodyGatewayFilterFactory#apply`代码
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f5b64585173400e957acb9a8d30c658~tplv-k3u1fbpfcp-watermark.image)
#### 2. 修修补补,自行领悟。代码如下:
```java
package com.jt.safety.gateway.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.filter.factory.rewrite.CachedBodyOutputMessage;
import org.springframework.cloud.gateway.support.BodyInserterContext;
import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpRequestDecorator;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.HandlerStrategies;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * 处理-body
 *
 * @author Tan
 * @version 1.0 2020/12/7
 */
@Slf4j
@Component
public class HandleBodyFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerRequest serverRequest = ServerRequest.create(exchange, HandlerStrategies.withDefaults().messageReaders());
        MediaType mediaType = exchange.getRequest().getHeaders().getContentType();

        // TODO: flux or mono
        Mono<Object> modifiedBody = serverRequest.bodyToMono(Object.class)
                .flatMap(body -> {
                    log.info("body: {},mediaType: {}", body, mediaType);
                    if (MediaType.APPLICATION_JSON.isCompatibleWith(mediaType)) {

                        //TODO  handle body

                        return Mono.just(body);
                    }
                    return Mono.empty();
                });

        HttpHeaders headers = new HttpHeaders();
        headers.putAll(exchange.getRequest().getHeaders());

        // the new content type will be computed by bodyInserter
        // and then set in the request decorator
        headers.remove(HttpHeaders.CONTENT_LENGTH);

        CachedBodyOutputMessage outputMessage = new CachedBodyOutputMessage(exchange, headers);

        return BodyInserters.fromPublisher(modifiedBody, Object.class).insert(outputMessage, new BodyInserterContext()).then(Mono.defer(() -> chain.filter(exchange.mutate().request(decorate(exchange, headers, outputMessage)).build())));

    }

    @Override
    public int getOrder() {
        return 7;
    }


    private ServerHttpRequestDecorator decorate(ServerWebExchange exchange, HttpHeaders headers,
                                                CachedBodyOutputMessage outputMessage) {
        return new ServerHttpRequestDecorator(exchange.getRequest()) {
            @Override
            public HttpHeaders getHeaders() {
                long contentLength = headers.getContentLength();
                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.putAll(headers);
                if (contentLength > 0) {
                    httpHeaders.setContentLength(contentLength);
                } else {
                    httpHeaders.set(HttpHeaders.TRANSFER_ENCODING, "chunked");
                }
                return httpHeaders;
            }

            @Override
            public Flux<DataBuffer> getBody() {
                return outputMessage.getBody();
            }
        };
    }

}

```
