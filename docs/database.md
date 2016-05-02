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


---
## SQL Injection
[https://www.netsparker.com/blog/web-security/sql-injection-cheat-sheet/](https://www.netsparker.com/blog/web-security/sql-injection-cheat-sheet/)
#### Line Comment
``` sql
-- 正常
SELECT * FROM members WHERE username = ? AND password = ?

-- username: admin'--
SELECT * FROM members WHERE username = 'admin'--' AND password = 'password'
```

> /*! MYSQL Special SQL */ (M)   
> This is a special comment syntax for MySQL. It’s perfect for detecting MySQL version. If you put a code into this comments it’s going to execute in MySQL only. Also you can use this to execute some code only if the server is higher than supplied version. 

``` sql
SELECT /*!32302 1/0, */ 1 FROM tablename 
-- Will throw a division by 0 error if MySQL version is higher than3.23.02
```

#### Stacking Queries
Executing more than one query in one transaction.  
注入SQL解析过程中逻辑行的划分delimiter  
``` sql
-- MySQL delimiter: `;`

-- username: '; drop members --
SELECT * FROM members WHERE username = ''; drop members --' AND password = 'password'
```

#### IF statement
``` sql
-- MYSQL syntax
IF(condition,true-part,false-part)

SELECT IF(1=1,'true','false')
```

---
## SQL查询过程
### MySQL查询计划
[http://www.orczhou.com/index.php/2013/04/how-mysql-choose-index-in-a-join/](http://www.orczhou.com/index.php/2013/04/how-mysql-choose-index-in-a-join/)  
**MySQL以简单粗暴的方式处理这个问题。哪张表的预测结果集比较小就以哪张表作为驱动表**, 驱动表几乎直接决定了查询时是否出现`filesort`[^filesort]  
### 表连接顺序&访问方式 / Left Deep Tree作为选择的优化空间  

1. 根据range analysis可能得到的记录数对表进行排序（有利于找到搜索剪枝条件）
2. 当表数 < 64时枚举所有left-deep搜索空间  
根据成本估算（磁盘IO次数）选择最优执行计划
*因为只是估算，在数据分布不均匀的时候容易出现误判*

[^filesort]: 如果排序字段不在选择的驱动表上，那么很可能会出现filesort & temporary, 通过[STRAIGHT_JOIN](http://huoding.com/2013/06/04/261)可以强制连接顺序(不建议使用)

---
## 索引&存储结构
### Innodb 主键优化
> 只要可以，尽量使用自增字段作为Innodb存储引擎的主键

Innodb数据表本身就是一个以Primary Key构建的聚簇B+树，如果建表的时候没有指定主键，那么数据引擎会自动穿件一个6字节的列作为索引。聚簇索引本身就包含所有的数据，区别于辅助索引的非聚簇结构，辅助索引只包含目标记录的地址或者主键（Innodb使用主键作为辅助索引中目标记录的地址，因此尽量不要使用过长的字段作为主键，这样会导致索引的维护成本变大）。

另外，Innodb的B+树实现上也和传统理解上得B+树实现有写差异。在insert导致block分裂的时候，Innodb根据最近N次（BTR_PAGE_SQL_INSERT_LIMIT=5）的insert情况决定新增加的数据block位置是在当前block逻辑位置之前还是之后，分裂的方式是否从中间对分数据还是直接只将新的数据写入新的block（注：如果判定是随机插入那么会进行数据对分，产生copy行为）。这个策略充分利用了磁盘的特性，提高了数据页的填充因子，降低了B+树的高度。

基于上面的事实，使用自增字段作为Innodb存储引擎的主键可以减少磁盘的IO次数，提高数据索引的效率。
和MyISAM以堆组织数据相对比：

1. MyISAM所有索引（只有辅助索引）访问记录的开销和Innodb辅助索引开销一致；Innodb主键索引直接触达数据
2. 记录改变时需要MyISAM需要更新索引，Innodb仅当主键发生变化时才需要更新
3. B树高度辅助（非聚簇）索引一般比主键（聚簇）索引高
4. Innodb以聚簇有序的方式组织数据，使得主键上的范围查询可以高效支持。

### 数据delete / 移动 造成的空间碎片
数据delete / 移动逻辑位置的时候并不会实际删除数据，而只是将空出来的空间用free-list串联起来，等待新插入数据的时候直接从free-list中分配空间。但是如果数据一直未能插入对应的block那就会使得填充因子保持在比较低得水平，这时可以通过optimize table来重建表并填充页面。


