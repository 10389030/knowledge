#### MathJax
[https://en.wikibooks.org/wiki/LaTeX/Mathematics#Symbols](https://en.wikibooks.org/wiki/LaTeX/Mathematics#Symbols)
``` mathjax
$$ e = \lim_{n \to \infty} (1 + \frac{1}{n}) ^ n $$
```

$$ e = \lim_{n \to \infty} (1 + \frac{1}{n}) ^ n $$_

#### Graphviz
[http://www.gravizo.com/#howto](http://www.gravizo.com/#howto)

``` html
<img src='http://g.gravizo.com/g?
@startuml;

(*) --> if "Some Test" then;
	-->[true] "activity 1";

	if "" then;
	-> "activity 3" as a3;
	else;
	if "Other test" then;
	-left-> "activity 5";
	else;
	--> "activity 6";
	endif;
	endif;

	else;

	->[false] "activity 2";

	endif;

	a3 --> if "last test" then;
	--> "activity 7";
	else;
	-> "activity 8";
	endif;
@enduml 
'/>
```

<img src='http://g.gravizo.com/g?
@startuml;
(*) --> if "Some Test" then;
	-->[true] "activity 1";
	if "" then;
	-> "activity 3" as a3;
	else;
	if "Other test" then;
	-left-> "activity 5";
	else;
	--> "activity 6";
	endif;
	endif;
	else;
	->[false] "activity 2";
	endif;
	a3 --> if "last test" then;
	--> "activity 7";
	else;
	-> "activity 8";
	endif;
@enduml 
'/>


