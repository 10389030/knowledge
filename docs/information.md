## 凹函数与Jensen不等式
如果一个函数 $f$ 在实数轴上的某个区间$I$是凹函数，如果 $\forall x_1,x_2 \in I$, 有
$$ f(\lambda x_1 + (1 - \lambda) x_2) \geq \lambda f(x_1) + (1 - \lambda) f(x_2), \forall \lambda \in [0, 1]  $$

$$ \lambda x_1 + (1 - \lambda) x_2 = x_2 - \lambda (x_2 - x_2)$$

设函数$f$为区间$I$上的凹函数$p_i\in{[0, 1]}, i = 1, {...}, n$,且$\displaystyle \sum_{i=1}^{n}p_i=1$

$$ f(\sum_{i=1}^{n}p_i x_i) \geq \sum_{i=1}^{n} p_i f(x_i) $$

---
## 切比雪夫不等式
设$X$为样本空间$S$上概率函数为$p$的的随机变量，如果$r$是一个正实数，那么
$$ p(|X(s) - E(X)| \geq r) \leq \frac{V(X)}{r ^ 2}  $$

*描述一个随机变量取值与期望之间的差距*

证明：
\begin{align}
	V(X) &= \int\limits_{-\infty}^{+\infty}(X - E(X)) ^ 2 d P(X) \\\
		 &\geq \int_{|E(X) - X| \geq r}(X - E(X)) ^ 2 d P(X) \\\
		 &\geq \int_{|E(X) - X| \geq r}r ^ 2 d P(X) \\\
	\frac{V(X)}{r ^ 2} &\geq \int_{|E(X) - X| \geq r} d P(X) = p(|E(X) - X| \geq r) \\\
\end{align}

**证明的关键步骤：展开**

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
