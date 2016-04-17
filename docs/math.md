## 自然对数e的意义
原文链接：http://www.ruanyifeng.com/blog/2011/07/mathematical_constant_e.html
自然对数的数学表示
$$ e =\lim_{n \to \infty} (1 + \frac{1}{n})^ n $$

e自然对数代表的是自然增长的极限，例如银行的复利问题：假设年收益率为5%，那么一年后收益为，
``` python
import math
print math.e ** 0.05 - 1
```


---
## 凹函数与Jensen不等式
如果一个函数 $f$ 在实数轴上的某个区间$I$是凹函数，如果 $\forall x_1, x_2 \in I$, 有
$$ f(\lambda x_1 + (1 - \lambda) x_2) \geq \lambda f(x_1) + (1 - \lambda) f(x_2), \forall \lambda \in [0, 1]  $$

$$ \lambda x_1 + (1 - \lambda) x_2 = x_2 - \lambda (x_2 - x_2)$$

设函数$f$为区间$I$上得凹函数, $p_i \in {[0, 1]}, i = 1, _{...}, n$, 且$\displaystyle \sum_{i=1}^{n} p_i = 1$, 则有:

$$ f(\sum_{i=1}^{n}p_i x_i) \geq \sum_{i=1}^{n} p_i f(x_i) $$


---
##  熵
一个离散随机变量$X$的熵$H(X)$定义为:
$$ H(X) = \sum_{X}P(X)log\frac{1}{P(X)} = -\sum_{X}P(X)logP(X) $$

### 条件熵
\begin{align}
H(X|Y = y) & = \sum_{X}P(X | Y = y) log \frac{1}{P(X | Y = y)} \\\  
H(X|Y) & = \sum_{y \in \Omega_{Y}}P(Y = y) \sum_{X} H(X|Y=y)\\\
	   & = \sum_{Y}\sum_{X}P(Y)P(X|Y)log\frac{1}{P(X|Y)} \\\
	   & = \sum_{X, Y}P(X, Y)log\frac{1}{P(X|Y)}
\end{align}

$H(X|Y=y)$ 是已知Y的值之后X的不确定性，而$H(X|Y)$ 是X在未知Y的情况下X混乱程度的期望值, 有可能$H(X|Y=y) > H(X|Y)$

### 互信息
$H(X)$是在观测$Y$之前X的不确定性，$(X|Y)$ 是在观测$Y$只有，期望得到的$X$的不确定性，记
\begin{align}
I(X;Y) & = H(X) - H(X|Y) \\\
	   & = \sum_{X}P(X)log\frac{1}{P(X)} - \sum_{X,Y}P(X,Y)log\frac{1}{P(X|Y)} \\\
	   & = \sum_{X,Y}P(X,Y)log\frac{1}{P(X)} - \sum_{X,Y}P(X,Y)log\frac{1}{P(X|Y)} \\\
	   & = \sum_{X,Y}P(X,Y)log\frac{P(X|Y)}{P(X)} \\\ 
	   & = \sum_{X,Y}P(X,Y)log\frac{P(X, Y)}{P(X)P(Y)} \\\
\end{align}
为<span style='color: red'>互信息，即Y包含的多少X信息的一个度量</span>。

### 相对熵
衡量变量在相同状态空间下不同<span style='color: red'>概率分布$P(X)$，$Q(X)$的差异</span>：
$$KL(P,Q) = \sum_{X}P(X)log\frac{P(X)}{Q(X)}$$
*相关的有`信息不等式`、`Kullback-Leibler距离`*

---
## 贝叶斯网
+ 条件独立与联合概率分解
+ 贝叶斯网的构建: 因果关系网
+ 朴素贝叶斯模型 & TAN模型(优化朴素贝叶斯局部独立假设问题)
+ 时序贝叶斯模型: HMM(隐马尔可夫模型) & 卡尔曼滤波器
+ 贝叶斯推理计算：消元法(启发式算法改进：最大势, 最小缺边[经验最优])
