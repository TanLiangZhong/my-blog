---
title: 跨源资源共享（CORS）
date: '2021-1-21'
sidebar: 'auto'
categories:
- 前端
tags:
- cors
- javascript
publish: true
---
>跨源资源共享 (CORS) （或通俗地译为跨域资源共享）是一种基于HTTP 头的机制，该机制通过允许服务器标示除了它自己以外的其它origin（域，协议和端口），这样浏览器可以访问加载这些资源。跨源资源共享还通过一种机制来检查服务器是否会允许要发送的真实请求，该机制通过浏览器发起一个到服务器托管的跨源资源的"预检"请求。在预检中，浏览器发送的头中标示有HTTP方法和真实请求中会用到的头。

>同源安全策略 默认阻止“跨域”获取资源。但是 CORS 给了web服务器这样的权限，即服务器可以选择，允许跨域请求访问到它们的资源。

### CORS 头
* Access-Control-Allow-Origin
> 指示请求的资源能共享给哪些域。
* Access-Control-Allow-Credentials
> 指示当请求的凭证标记为 true 时，是否响应该请求。
* Access-Control-Allow-Headers
> 用在对预请求的响应中，指示实际的请求中可以使用哪些 HTTP 头。
* Access-Control-Allow-Methods
> 指定对预请求的响应中，哪些 HTTP 方法允许访问请求的资源。
* Access-Control-Expose-Headers
> 指示哪些 HTTP 头的名称能在响应中列出。
* Access-Control-Max-Age
> 指示预请求的结果能被缓存多久。
* Access-Control-Request-Headers
> 用于发起一个预请求，告知服务器正式请求会使用那些 HTTP 头。
* Access-Control-Request-Method
> 用于发起一个预请求，告知服务器正式请求会使用哪一种 HTTP 请求方法。
* Origin
> 指示获取资源的请求是从什么域发起的。

### 解决ajax请求跨域问题
#### 1. 服务端添加 Response 配置.
```
Access-Control-Allow-Origin: * // 表示接受任意域名的请求
Access-Control-Allow-Methods: * // 接受任意方法的请求
Access-Control-Allow-Credentials: true // 当请求的凭证标记为 true 时, 响应该请求。响应携带Cookie的请求
```
#### 2. web客户端配置 `withCredentials`属性
> CORS请求默认不发送Cookie和HTTP认证信息。如果要把Cookie发到服务器，一方面要服务器同意，指定`Access-Control-Allow-Credentials`字段，并且在AJAX请求中`withCredentials`属性配置为`true`。
```
// js 原生请求配置
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

// jquery ajax 配置
$.ajax({
	type:"POST",
	xhrFields: {
		withCredentials: true // 发送Ajax时，Request header中会带上 Cookie 信息。
	},
	url: "",
	data:{"id": "5fae478d92beb55653221b20"},
	success:function(res){
    	console.log(res)
	}
})
```

### 相关文档
* https://developer.mozilla.org/zh-CN/docs/Glossary/CORS
* https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS