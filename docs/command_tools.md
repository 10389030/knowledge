## 网络
### iproute2 vs. net-tools
iproute2是一个系列的网络配置工具，它旨在取代net-tools的功能。  
在实现上，net-tools通过procfs和ioctl系统调用来实现的，而iproute2是通过netlink socket方式与内核通信实现的。  
部分linux发行版本已经deprecate net-tool了，改用iproute2。
iprout2当前处于积极发展阶段。

#### 安装
mac 下安装brew install iproute2mac 只有ip命令, 相当功能被阉割了, 就算是下载源码也是编译不通过的， so sad ...  

+ [项目地址](http://www.linuxfoundation.org/collaborate/workgroups/networking/iproute2 ) 
http://www.linuxfoundation.org/collaborate/workgroups/networking/iproute2  
+ [源码地址](git://git.kernel.org/pub/scm/linux/kernel/git/shemminger/iproute2.git )
git://git.kernel.org/pub/scm/linux/kernel/git/shemminger/iproute2.git  



---

#### Linux 内核维护socket的成本
https://git.kernel.org/cgit/linux/kernel/git/torvalds/linux.git/commit/?id=5640f7685831e088fe6c2e1f863a6805962f8e8


#### TCP/IP协议
```
Headers（40) + MSS ≤ MTU
DF (DON'T Fragment) / PMTU / ICMP / IPSEC
http://km.oa.com/group/16200/articles/show/135398?kmref=related_post
```

#### TCP `SO_REUSEPORT` Optional
+ 正确的使用`SO_REUSEPORT`选项：先fork再listen/bind，这点和listen/bind之后再fork有着本质区别（是否对应同一个内核fd对象）
+ accept不均匀现象：size limit | lock | **hash(linux kernel patch)**

---
## tcpdump
### 基础用法
``` bash
sudo tcpdump -iany -Xnlps0 port 10000
sudo tcpdump -iany -X -s0 host 10.210.134.177
```
