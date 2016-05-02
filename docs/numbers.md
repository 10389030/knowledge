## 自然对数e的意义
原文链接：http://www.ruanyifeng.com/blog/2011/07/mathematical_constant_e.html
自然对数的数学表示
$$ e =\lim_{n \to \infty} (1 + \frac{1}{n})^ n $$

e自然对数代表的是自然增长的极限，例如银行的复利问题：假设年收益率为5%，那么一年后收益为，
``` python
>>> import math
>>> print math.e ** 0.05 - 1
0.051271096376
>>> 
```

---

## 模指数计算
密码学中得重要问题:
> 快速计算$b^n \bmod m$, 其中$b$, $n$, $m$都是大整数

算法思想: 将$n$做二进制展开，利用基本事实: 

$$b ^ {2 ^ {a-1}}  b ^ {2 ^ {a - 1}} = b ^ {2 ^ a}$$
$$x \cdot y \bmod z = (x \bmod z) \cdot (y \bmod z) \bmod z$$
$$ b ^ n = b ^ {({a_0a_1a_2{...}a_i})_2} = \prod b^{2^x} a_x, x \in [0, i] $$ 

将问题转化成：
``` python
def fast_mod(b, n, m):
	mask = 0x01
	rst = 1
	mod_part = b % m # 计算 b ^ (2 ^ 0) % m
	while mask <= n:
		if n & mask != 0: 
			rst = (mod_part * rst) % m # 计算 (\prod b ^ (2 ^ x)) \bmod m
		# 计算 b ^ (2 ^ x) % m	
		mod_part = (mod_part * mod_part) % m
		mask = mask << 1
	return rst
```

_其实看到这个问题的时候，我个人的第一个想法是找出一个最小的数$x$，使得$ b ^ (x - 1) < m \leq b ^ x $从而实现降低循环的次数，
而并没有更进一步地想构建 $n = (a_0a_1a_2{...}a_i)_x$, 还是没有**构建出可以降维的递推过程**_

习题：证明如果$a$, $b$为正整数, 则$(2 ^ a - 1) \bmod (2 ^ b - 1) = 2 (a \bmod b) - 1$  
证明：因为当 $a > b$ 时即 $(2 ^ a -1) > (2 ^ b - 1)$, 有
$$2 ^ a - 1 = (2 ^ b - 1) 2 ^ {a - b} + 2 ^ {a - b} - 1$$
所以：
$$(2 ^ a - 1) \bmod (2 ^ b - 1) = (2 ^ {a - b} - 1) \bmod (2 ^ b - 1) $$
根据归纳法，命题得证。

---
## 素数的概率测试  
###蒙特卡罗方法  
_[蒙特卡罗方法入门 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2015/07/monte-carlo-method.html)_  

+ 经验概率的探测方法
+ 基于随机过程的模拟方法
+ 重复过程的置信校验  
**`假设检验`**: 假设次品率为$p$, 重复$n$次检测均为正品, 那么次品率不超过$p$的可信度, ...
+ ....

### 米勒测试





