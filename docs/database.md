## MySQL水平拓展方案
参考：http://www.gpfeng.com/?p=657
分库分表数据解决方案：Proxy / Client-side
解决方案：MySQL Fabric、TDDL、CoBar、Atlas、Heisenberg、Vitess、…..

**问题：跨库事务支持??**

## MySQL同步方案
参考：http://www.gpfeng.com/?p=603
原生的异步方式、semi-sync半同步方式、多阶段[2PC]提交（同步方式）
性能压测：_TPCC_
**问题：binlog处理**
**问题：MySQL状态参数**
**问题：MySQL事务回滚**

## MySQL锁机制
