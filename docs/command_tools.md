#### Socket Statistic | `ss`

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
