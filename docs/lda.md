Gamma函数
: $$\Gamma(x) = \int_{0}^{\infty}t^{x-1}e^{-t} d t$$

其中**$\quad \Gamma(\frac{1}{2}) = \sqrt{\pi}$**

1. 分部积分法证明: $\Gamma(x+1) = x\Gamma(x)$
\begin{align}
\Gamma(x+1) &= \int_{0}^{\infty}t^xe^{-t}dt \\\
			&= -\int_{0}^{\infty}t^xde^{-t} \\\
			&= -(t^xe^{-t} - \int_0^{\infty}e^{-t}dt^x) \\\
			&= -(t^xe^{-t} - x\int_0^{\infty}e^{-t}t^{x-1}dt) \\\
			&= -(t^xe^{-t}\big{|}_0^\infty - x\Gamma(x)) \\\
			&= x\Gamma(x) - \frac{t^x}{e^t}\big{|}_0^\infty 
\end{align}
根据**洛必达法则**可知 $\frac{t^x}{e^t}\big{|}_0^\infty = \frac{\infty ^ x }{e ^ \infty} - \frac{0^x}{e^0} = 0$ 

$\Gamma$函数是欧拉在求解序列$a_n = n!$时发现的，自然具备
$$\Gamma(n+1) = n!$$
2. 重要推广  
$$\Gamma(n + \frac{1}{2}) = \frac{(2n)!\sqrt{\pi}}{n!4^n}$$
此式可用来协助计算t分布机率密度函数、卡方分布机率密度函数、$F$分布(_**统计学的三大分布**_)机率密度函数等的累计机率。  
3. 相关  

+ Beta函数  
\begin{align}
B(m, n) &= \int_0^1x^{m-1}(1-x)^{n-1}dx \\\
		&= \frac{\Gamma(m)\Gamma{n}}{\Gamma(m + n)} \\\
\end{align}
+ 欧拉常数$\gamma$    
$$\gamma=-\frac{d\Gamma(x)}{dx}\big{|}_{x=1} =\lim_{n\to\infty}(\sum_{x=1}^n \frac{1}{x} - log(n))$$
+ Digamma 函数  
$$\Psi(x) = \frac{dlog\Gamma(x)}{dx}$$
这是一个重要的函数，在涉及求Dirichlet分布相关参数的极大似然参数估计时经常会用到。  
性质：
$$\Psi(x+1) = \Psi(x) + \frac{1}{x}$$
和欧拉常数及黎曼函数都有密切联系.  

---
#### 从二项分布到Gamma分布  
二项分布 $\to$ Possion 分布 $\to$ Gamme 分布

