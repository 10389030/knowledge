## Linux 内核参数调优
### 系统参数查看
`sysctlvariable`, `cat /proc/net/inet/tcp/keepidle`
```
[junzexu@bogon:~]$ sysctl -a |  grep net.inet.tcp.keepidle
net.inet.tcp.keepidle: 7200000
```

### 参数修改
```
# echo 到变量文件
# 修改后立即生效，重启失效，因为`/proc`下内容都是运行时虚拟出来的
echo 7200 > /proc/net/inet/tcp/keepidle

# sysctl -w <variable-name> = value
# 修改后立即生效，重启失效
sysctl -w  net.inet.tcp.keepidle = 7200

# 修改 `/etc/sysctl.conf` 文件
# 永久，写入前请先用上诉两种方式确认修改有效且没有故障
# 需要重启或者`sysctl -p`使修改生效
net.inet.tcp.keepidle = 7200
```

### 案例
#### 网络相关
```
# 指定时间内如果连接一直保持空闲，则向对端发起探测
net.ipv4.tcp_keepalive_time = 7200 
# 向对端发起保活探测的时间间隔
net.ipv4.tcp_keepalive_itvl = 75
# 内核发送保活探测的最大次数，超过这个次数则关闭连接，释放资源
net.ipv4.tcp_keepalive_probes = 9
## 也就是一个连接空闲后需要经过 $7200 + 75 * (9 - 1) = 7200$ 秒之后才释放资源重新被系统利用
## 在`keepalive`打开的情况下，默认空闲回收时间参数偏大，一般修改成 `1800 15 5` 减少空连接，及时释放资源

net.ipv4.tcp_syncookies = 1
# 开启SYN cookie，当出现SYN等待队列溢出时启用cookie处理，防范少量SYN攻击, default 0

net.ipv4.tcp_tw_reuse = 1
# 开启客户端重用，允许TIME_WAIT socket重新用于新的TCP连接, default 0
# 只对客户端有效，开启后客户端在1s内被回收
net.ipv4.tcp_tw_recyle = 1
# 开启TCP连接中TIME_WAIT socket的快速回收，对客户端和服务器同时作用，能够回收TIME_WAIT数量，default 0

net.ipv4.tcp_fin_timeout = 60
# 对于本端断开的连接，TCP保持在FIN_WAIT_2状态的时间。default 60
# 可以将值该为30，但是如果机器是负载很重的的web服务器，那么可能处于大量内存被无效数据报填满地风险
# FIN_WAIT_2 socket的危险性低于FIN_WAIT_1, 因为它们只占用1.5K内存，但是它们存在的时间更长
# 系统TCP连接状态查看: 
# 	netstat -n | awk '/^tcp/{++S[$NF]} END {for (a in S) print a, S[a]}'
# TCP 状态说明:
#	http://blog.csdn.net/huangxy10/article/details/8012180

net.ipv4.tcp_max_syn_backlog = 1024
# 每个TCP端口的SYN队列长度，如果连接数大于该值，连接请求会被丢弃，一般服务器会提高此值
net.ipv4.tcp_local_port_range = 1024 65000
# 用于向外连接端口的范围，default 32768 61000, ?? 连接FD上限么

net.core.tcp_max_tw_buckets = 5000
# 系统保持的TIME_WAIT 连接数上限，超出会立刻被清除并打印警告信息，default 180000
# 控制TIME_WAIT上限数可以避免web服务器被TIME_WAIT拖死.
net.core.wmem_max = 8388608
net.core.rmem_max = 8388608
# 最大系统发送/接收缓存, 单位为Page

net.ipv4.tcp_wmen = 4096 87380 8388608  # <min> <default> <max>
net.ipv4.tcp_rmen = 4096 87380 8388608
net.ipv4.tcp_mem = 524288 699050 1048576 # 大于<max>时拒绝TCP连接 

net.ipv4.tcp_reties = 15
# TCP失败重传次数，可以减少到5，尽早检测失效连接,释放内存资源

```

#### Memory & IO相关
```
fs.file-max = 999999
# 限制当个进程能打开的最多FD数量

vm.swappiness = 60
# 实际上，并不是所有的物理内存使用完之后才去使用swap的，什么时候使用是由该参数控制的, default 60
# range [0, 100]: 数值越高表示越有可能发生swap，
# 	= 0: 表示只有单物理内纯使用完才使用swap
# 	= 100： 表示尽可能使用swap，可以一定程度让OS尽量使用物理内存

vm.drop_caches = [1,2,3]
# val = 1: 释放page_cache
# val = 2: 释放dentries、inode缓存
# val = 3: 释放page_cache、dentires、inode缓存
# ATTENTION: 修改前需要使用sync将缓存写入，避免数据丢失

vm.min_free_kbytes = 1000
# 强制Linux VM至少保留多少KB的空间, 建议调小充分利用资源，default: 90112

vm.dirty_ratio = 40 			# default: 40, 当文件系统脏页达到内存百分比多少之后以阻塞的方式强制处理脏数据
vm.dirty_background_ratio = 5 	# default: 5, 当文件系统脏页达到内存百分比多少之后触发pdflush等进程将一定量脏数据写入
vm.dirty_wirteback_centisecs = 50 	# pdflush 进程运行的时间间隔
vm.dirty_expire_centisecs = 30000   # 脏数据落地最长时间间隔控制，避免脏数据长时间未写回
# 这几个参数控制写缓冲区脏数据落地的时机,
# 调整的时候要充分考虑IO的特性，如何削弱峰值，保证数据平滑落地。

```
