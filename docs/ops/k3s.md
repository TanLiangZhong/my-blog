## 什么是 K3s?
K3s 是一个轻量级的 Kubernetes 发行版，它针对边缘计算、物联网等场景进行了高度优化。K3s 有以下增强功能：

-   打包为单个二进制文件。

-   使用基于 sqlite3 的轻量级存储后端作为默认存储机制。同时支持使用 etcd3、MySQL 和 PostgreSQL 作为存储机制。

-   封装在简单的启动程序中，通过该启动程序处理很多复杂的 TLS 和选项。

-   默认情况下是安全的，对轻量级环境有合理的默认值。

-   添加了简单但功能强大的`batteries-included`功能，例如：本地存储提供程序，服务负载均衡器，Helm controller 和 Traefik Ingress controller。

-   所有 Kubernetes control-plane 组件的操作都封装在单个二进制文件和进程中，使 K3s 具有自动化和管理包括证书分发在内的复杂集群操作的能力。

-   最大程度减轻了外部依赖性，K3s 仅需要 kernel 和 cgroup 挂载。 K3s 软件包需要的依赖项包括：

    -   containerd
    -   Flannel
    -   CoreDNS
    -   CNI
    -   主机实用程序（iptables、socat 等）
    -   Ingress controller（Traefik）
    -   嵌入式服务负载均衡器（service load balancer）
    -   嵌入式网络策略控制器（network policy controller）

## 适用场景
K3s 适用于以下场景：

-   边缘计算-Edge
-   物联网-IoT
-   CI
-   Development
-   ARM
-   嵌入 K8s

由于运行 K3s 所需的资源相对较少，所以 K3s 也适用于开发和测试场景。在这些场景中，如果开发或测试人员需要对某些功能进行验证，或对某些问题进行重现，那么使用 K3s 不仅能够缩短启动集群的时间，

## 安装k3s
#### 1. Service节点
```shell
curl -sfL http://rancher-mirror.cnrancher.com/k3s/k3s-install.sh | INSTALL_K3S_MIRROR=cn sh -
```
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6cddeb0471440a1880bec66da1d7ee2~tplv-k3u1fbpfcp-watermark.image?)
-   K3s 服务将被配置为在节点重启后或进程崩溃或被杀死时自动重启。
-   将安装其他实用程序，包括`kubectl`、`crictl`、`ctr`、`k3s-killall.sh` 和 `k3s-uninstall.sh`。
-   将[kubeconfig](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/)文件写入到`/etc/rancher/k3s/k3s.yaml`，由 K3s 安装的 kubectl 将自动使用该文件

#### 2. Work节点
```shell
curl -sfL http://rancher-mirror.cnrancher.com/k3s/k3s-install.sh | INSTALL_K3S_MIRROR=cn K3S_URL=https://myserver:6443 K3S_TOKEN=mynodetoken sh -
```
设置`K3S_URL`参数会使 K3s 以 worker 模式运行。K3s agent 将在所提供的 URL 上向监听的 K3s 服务器注册。`K3S_TOKEN`使用的值存储在你的服务器节点上的`/var/lib/rancher/k3s/server/node-token`路径下。


## 检查安装状态
#### 查看k3s服务状态
```shell
systemctl status k3s
```
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc2100c3032e46ba9a2aa00f85a54fe3~tplv-k3u1fbpfcp-watermark.image?)
#### 查看Node节点
```shell
kubectl get nodes
```
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4504d85cf1764c389d46217e53715806~tplv-k3u1fbpfcp-watermark.image?)


## 卸载k3s
#### server 节点卸载 K3s
```shell
/usr/local/bin/k3s-uninstall.sh
```
#### agent 节点卸载 K3s
```shell
/usr/local/bin/k3s-agent-uninstall.sh
```

## 集成 `Kuboard`
#### 执行 Kuboard v3 在 K3S 中的安装
```shell
kubectl apply -f https://addons.kuboard.cn/kuboard/kuboard-v3.yaml
```
#### 等待 Kuboard v3 就绪
```shell
[root@node1 ~]# kubectl get pods -n kuboard
NAME                               READY   STATUS    RESTARTS   AGE
kuboard-agent-2-65bc84c86c-r7tc4   1/1     Running   2          28s
kuboard-agent-78d594567-cgfp4      1/1     Running   2          28s
kuboard-etcd-fh9rp                 1/1     Running   0          67s
kuboard-etcd-nrtkr                 1/1     Running   0          67s
kuboard-etcd-ader3                 1/1     Running   0          67s
kuboard-v3-645bdffbf6-sbdxb        1/1     Running   0          67s
```
#### 访问 Kuboard
-   在浏览器中打开链接 `http://your-node-ip-address:30080`
-   输入初始用户名和密码，并登录
    -   用户名： `admin`
    -   密码： `Kuboard123`

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/549910da64104eee9b084281016cd037~tplv-k3u1fbpfcp-watermark.image?)

#### 执行 Kuboard v3 的卸载
```
kubectl delete -f https://addons.kuboard.cn/kuboard/kuboard-v3.yaml
```
清理遗留数据
```
rm -rf /usr/share/kuboard
```
## 相关资料
https://kuboard.cn/
https://docs.rancher.cn/docs/k3s/_index
