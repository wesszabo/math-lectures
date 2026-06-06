mermaid.initialize({ startOnLoad: false });

// KaTeX automatikus renderelés beállítása
document.addEventListener("DOMContentLoaded", function() {
    renderMathInElement(document.body, {
        delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "$", right: "$", display: false},
            {left: "\\(", right: "\\)", display: false},
            {left: "\\[", right: "\\]", display: true}
        ],
        throwOnError: false
    });
});


const navigationStack = [];

const theoremsData = {
        "T1": {
        title: "Theorem 1",
        content: `Let $I:=(a,b)$ be finite interval, $f$ be absolutely monotone in $I$. Then 
                  $f$ can be extended analytically into the complex plane ($z=x+iy$), and the 
                  extended function $f(z)$ will be analytic in the circle $|z-a| \\lt b-a$, 
                  and will be absolutely monotone in $[a,b)$. 
                  <br>
                  If $I=(-\\infty,b)$ and $b$ is finite, then $f(z)$ will be analytic in the 
                  half-plane $\\mathrm{Re}\\,z \\lt b$. If $a$ is finite and $I=(a,\\infty)$, then $f(z)$ 
                  will be analytic in the whole plane. 
                  <br>
                  If $I=(-\\infty,\\infty)$ 
                  then $f(z)$ will be analytic in the whole plane.
<br>
<span class="kiemelt">Remark.</span> While <a href=\"javascript:void(0)\" onclick=\"highlightBib('b12')\">[12]</a> assumes absolute monotonicity on $a\\leq x\\lt b$, 
we demonstrate that the weaker condition
 $a\\lt x\\lt b$ is sufficient.`,
        proof: `We follow <a href=\"javascript:void(0)\" onclick=\"highlightBib('b12')\">[12]</a>  with a little modification. 
Let $u:=a+\\varepsilon$, where $0\\lt\\varepsilon\\lt(b-a)/3$. Then $f$ is absolutely monotone in $u\\leq x\\lt b$. 
By Taylor's formula for every $u\\leq x\\lt b$ we have
$$
	f(x)=\\sum_{k=0}^{n} \\frac{f^{(k)}(u)}{k!} (x-u)^k+R_n(x), 
$$
where
$$ \\begin{aligned}
R_n(x) &:= \\int_{u}^x \\frac{f^{(n+1)}(t)}{n!}(x-t)^{n}\\,dt \\\\
      & = \\frac{(x-u)^{n+1}}{n!} \\int_0^1 f^{(n+1)}(u+[x-u]t)(1-t)^n\\,dt.
\\end{aligned} $$
Since $f^{(n+2)}\\geq 0$ therefore $f^{(n+1)}(u+[x-u]t)$ is a monotone 
increasing function of $x$ when $t$ is fixed, so that if $u\\leq x\\leq c\\lt b$
we have
$$ \\begin{aligned}
	0 &\\leq R_n(x)\\leq\\frac{(x-u)^{n+1}}{n!}\\int_0^1 (1-t)^n  
	f^{(n+1)}(u+[c-u]t)\\,dt\\\\
	&=\\frac{(x-u)^{n+1}}{(c-u)^{n+1}}
	\\left[
	f(c)-f(u)-f'(u)(c-u)-\\ldots -f^{(n)}(u)\\frac{(c-u)^n}{n!}
	\\right] \\\\
	&\\leq f(c)\\left(\\frac{x-u}{c-u}\\right)^{n+1}.
\\end{aligned} $$
Hence 
$$
	\\lim_{n\\to\\infty}R_n(x)=0\\quad(u\\leq x\\lt c\\lt b).
$$
Since $c$ is arbitrary we obtain
$$
	f(x)=\\sum_{n=0}^{\\infty}\\frac{f^{(n)}(u)}{n!}(x-u)^n \\quad(u\\leq x\\lt b).
$$
The analytical extension is 
$$
	\\widetilde{f}(z):=\\sum_{n=0}^{\\infty}\\frac{f^{(n)}(u)}{n!}(z-u)^n,
$$
and $\\widetilde{f}$ will be analytic in the circle $|z-u|\\lt b-u$. 
Since $\\varepsilon>0$ was arbitrary the statement follows. $\\blacksquare$`
    },

    "C2": { title: "Corollary 2", 
            content: `Let $I:=(a,b)$ be finite interval, $g$ be completely monotone on $I$. 
Then it can be extended analytically into the complex $z$-plane 
($z=x+iy$), and the extended function $g(z)$ will be analytic in the circle 
$|z-b| \\lt b-a$, and will be completely monotone in $(a,b]$.`, 
            proof: `Define the function $f(x):=g(-x)$. Then $f$ is absolutely monotone 
in $(-b,-a)$ so we can apply <a href="javascript:void(0)" onclick="openTheoremWindow('T1')">Theorem 1</a>. $\\blacksquare$` },

    "T3": { title: "Theorem 3", 
            content: `Let $I\\subseteq\\mathbf{R}$ be interval, $f,g:I\\to\\mathbf{R}$ be arbitrary 
completely monotone functions. Then $fg$ is completely monotone.
<br>
<span class="kiemelt">Remark.</span>
The proof provided here  differs from the folklore approach; in fact, it is a one-line proof.`, 
            proof: `We prove by induction. 
For $n=0,1$ it is easy. Our induction hypothesis is that if $u,v$ are any 
completely monotone functions then $(-1)^k(uv)^{(k)}\\geq 0$ for $k\\leq n$. 
Now 
$$ \\begin{aligned}
	(-1)^{n+1}(fg)^{(n+1)} &=(-1)^n((-f')g+f(-g'))^{(n)} \\\\
	&=	(-1)^n((-f')g)^{(n)}+(-1)^n(f(-g'))^{(n)}.
\\end{aligned} $$
Since $-f', -g'$ are completely monotone the induction hypothesis gives the 
non-negativity. $\\blacksquare$` },


    "C4": { title: "Corollary 4", 
            content: `Let $I\\subseteq\\mathbf{R}$ be an interval, $f:I\\to\\mathbf{R}$,  
$\log\\circ f$ be a
 completely monotone function, $g:I\\to\\mathbf{R}$ be a
completely monotone function. 
Then $f^g$ is logarithmically completely monotone.`, 
            proof: `We know
$$
	\\log\\left(f^g\\right)=g\\cdot \\log\\circ f.
$$
Since $\\log\\circ f$ is completely monotone,  
 <a href="javascript:void(0)" onclick="openTheoremWindow('T3')">Theorem 3</a> yields the statement. $\\blacksquare$` },


    "T5": { title: "Theorem 5", 
            content: `Let $I\\subseteq\\mathbf{R}$ be an interval, $g:I\\to\\mathbf{R}$, $g\\geq 0$, $g'$ be 
completely monotone, $f$ be completely monotone in the set
$\\mathrm{Range}\\,g$. Then $f\\circ g$ is completely monotone.
<br>
<span class="kiemelt">Remark.</span> The standard proof, which employs a formula for the $n$-th derivative of a composite function, can be found in
<a href=\"javascript:void(0)\" onclick=\"highlightBib('b9')\">[9]</a> Theorem 2]. 
A much simpler proof using Leibniz’s formula for the derivative of a product was mentioned in 
<a href=\"javascript:void(0)\" onclick=\"highlightBib('b5')\">[5]</a> without proof; 
here, we demonstrate that the statement follows directly from Leibniz’s formula.`, 
            proof: `We prove by induction. If $n=0$ then 

$(-1)^n(f\\circ g)^{(n)}(x)=f(g(x))\\geq 0$. 
If $n=1$ then 
$$
	(-1)(f\\circ g)'=(-f')\\circ g\\cdot g'\\geq 0.
$$
Using Leibniz's formula 
we have
$$ \\begin{aligned}
	(-1)^{n+1}(f\\circ g)^{(n+1)} &=(-1)^{(n+1)}[f'\\circ g \\cdot g']^{(n)} \\\\
	&=(-1)^n \\sum_{k=0}^n \\binom{n}{k}((-f')\\circ g)^{(k)}\\cdot (g')^{(n-k)} \\\\
	&=\\sum_{k=0}^n \\binom{n}{k}(-1)^k((-f')\\circ g)^{(k)}\\cdot 
	(-1)^{(n-k)}(g')^{(n-k)}.
\\end{aligned} $$
Here $-f'$ is completely monotone. 
Assuming the validity of induction hypothesis for $n$, for any completely 
monotone function, and for any non-negative function whose first derivative is 
completely monotone, we obtain the statement. $\\blacksquare$` },

    "C6": { title: "Corollary 6", 
            content: `If $0\\lt \\alpha\\leq 1$,  
$f$ is completely monotone in $(0,b)$, $b$ is finite or infinite,
then $f(x^{\\alpha})$ 
is completely monotone in $(0,b^{1/\\alpha})$.`, 
            proof: `If $\\alpha=1$ the statement is obvious, so we assume that $0\\lt \\alpha \\lt 1$. 
Denote $g(x):=x^{\\alpha}$. Then $g\\geq 0$ and $g'$ is completely monotone, 
thus <a href="javascript:void(0)" onclick="openTheoremWindow('T5')">Theorem 5</a> yields the statement. $\\blacksquare$` },

    "C7": { title: "Corollary 7", 
            content: `Let $f:(a,b)\\to\\mathbf{R}$, $f\\gt 0$. If $f$ is logarithmically completely 
monotone in $(a,b)$ then $f$ is completely monotone in $(a,b)$.
<br>
<span class="kiemelt">Remark.</span> A direct proof can be found in <a href=\"javascript:void(0)\" onclick=\"highlightBib('b8')\">[8]</a> 
and in <a href=\"javascript:void(0)\" onclick=\"highlightBib('b10')\">[10]</a>.`, 
            proof: `We choose $\\delta_1,\\delta_2$ such that $a\\lt \\delta_1\\lt \\delta_2\\lt b$.  
Denote $M:=\\max\,\\{f(x)\\,|\\,\\delta_1\\leq x\\leq\\delta_2\\}$. 
Denote $g(x):=-(\\log\\circ (f/(2M)))(x)$, $\\delta_1\\leq x\\leq \\delta_2$. 
Then $g\\geq 0$, and 
$g'(x)=(-\\log\\circ f)'$ is completely monotone in $(\\delta_1,\\delta_2)$. 
Take $h(x):=e^{-x}$. Then $h$ is completely monotone in $(0,\\infty)$. 
By <a href="javascript:void(0)" onclick="openTheoremWindow('T5')">Theorem 5</a>  
$(h\\circ g)(x)=f(x)/(2M)$ 
is completely monotone in $(\\delta_1,\\delta_2)$. Since 
$(\\delta_1,\\delta_2)$ 
is arbitrary subinterval of $(a,b)$, and $f(x)=(2M)(f(x)/(2M))$, the 
corollary follows. $\\blacksquare$` },

    "T8": { title: "Theorem 8", 
            content: `Let $I\\subseteq\\mathbf{R}$ be interval, $g:I\\to\\mathbf{R}$, $-g'$    
be completely monotone, $f$ be absolutely monotone in the set 
$\\mathrm{Range}\\,g$. Then $f\\circ g$ is completely monotone.
<br>
<span class="kiemelt">Remark.</span> It can be proved using the formula for the $n$-th derivative of a composite function, 
but the use of Leibniz’s formula for the derivative is enough.`, 
            proof: `We prove by induction.  If $n=0$ then 

$(-1)^n(f\\circ g)^{(n)}(x)=f(g(x))\\geq 0$. 
If $n=1$ then 
$$
	(-1)(f\\circ g)'=f'\\circ g\\cdot (-g')\\geq 0.
$$
Using Leibniz's formula we have 
$$ \\begin{aligned}
	(-1)^{n+1}(f\\circ g)^{(n+1)} &=(-1)^{n}[f'\\circ g \\cdot
	(-g')]^{(n)} \\\\
	&=(-1)^n \\sum_{k=0}^n \\binom{n}{k}(f'\\circ g)^{(k)}\\cdot 
	(-g')^{(n-k)} \\\\
	&=\\sum_{k=0}^n \\binom{n}{k}(-1)^k(f'\\circ g)^{(k)}\\cdot 
	(-1)^{(n-k)}(-g')^{(n-k)}.
\\end{aligned}  $$
Here $-g'$ is completely monotone, $f'$ is absolutely monotone. 
Assuming the validity of induction hypothesis for $n$, for any 
absolutely monotone function, and for any function $g$ such that $-g'$ is 
completely monotone,
we obtain the statement. $\\blacksquare$` },


    "C9": { title: "Corollary 9", 
            content: `Let $h:(a,b)\\to\\mathbf{R}$, $h\\gt 0$. If $h$ is logarithmically 
completely monotone 
in $(a,b)$ then $h$ is completely monotone in $(a,b)$. 
<br>
<span class="kiemelt">Remark.</span> A direct proof can be found in <a href=\"javascript:void(0)\" onclick=\"highlightBib('b8')\">[8]</a> 
and in <a href=\"javascript:void(0)\" onclick=\"highlightBib('b10')\">[10]</a>.`, 
            proof: `Take $f:=\\exp$, and $g:=\\log\\circ h$. $\\blacksquare$` },

    "L10": { title: "Lemma 10", 
             content: `Let the function $\\varphi$ have derivatives of all orders on $[a,b)$, 
$a\\leq 0\\lt b$, and 
$\\varphi(0)=0$. Define the function $f$ by
$$
	f(x) = \\left\\{
    \\begin{array}{ll}
        \\frac{\\varphi(x)}{x}, & x \\in [a,b) \\setminus \\{0\\} \\\\
        \\varphi'(0), & x = 0
    \\end{array}
    \\right.
$$
Then
$$
	f^{(n)}(x)=\\left\\{
	\\begin{array}{ll}
		\\frac{1}{x^{n+1}}\\sum_{k=0}^n \\binom{n}{k}(-1)^k k!x^{n-k}\\varphi^{(n-k)}(x),
		& x\\neq 0,\\\\
		\\frac{1}{n+1}\\varphi^{(n+1)}(0), & x=0,
	\\end{array}
        \\right.
$$
and $f^{(n)}(x)$ is continuous on $[a,b)$. 
Moreover 
$$
	\\frac{\\mathrm{d}}{\\mathrm{d}x}\\sum_{k=0}^n \\binom{n}{k}(-1)^k k!x^{n-k}
	\\varphi^{(n-k)}(x)=x^n\\varphi^{(n+1)}(x).
$$ 
<br>
<span class="kiemelt">Remark.</span> Lemma was stated in <a href=\"javascript:void(0)\" onclick=\"highlightBib('b2')\">[2]</a> 
as Lemma 1, but the proof of formula for $f^{(n)}$  (<a href=\"javascript:void(0)\" onclick=\"highlightBib('b2')\">[2]</a>, (5)) 
is wrong.`, 
             proof: `We prove only $f^{(n)}(0)=
\\frac{1}{n+1}\\varphi^{(n+1)}(0)$ and the continuity of $f^{(n)}$, because 
everything else is proved correctly in 
<a href=\"javascript:void(0)\" onclick=\"highlightBib('b2')\">[2]</a> Lemma 1. 
For $n=0$ this and the continuity follow from 
the definition of $f$, 
so we may assume that $n\\geq 1$. We prove by induction. 
$$ \\begin{aligned}
    f^{(n)}(0) &=\\lim_{x\\to 0} \\frac{f^{(n-1)}(x)-f^{(n-1)}(0)}{x-0}\\\\
    &=\\lim_{x\\to 0} f^{(n)}(x),
\\end{aligned} $$
assuming that the assumptions of L'Hospital's rule are satisfied. 
Since $f^{(n-1)}$ is continuous the fraction has the type "$0/0$" 
at $x=0$. 
We know from <a href=\"javascript:void(0)\" onclick=\"highlightBib('b2')\">[2]</a> Lemma 1 that 
$$
    f^{(n)}(x)=\\frac{1}{x^{n+1}}\\sum_{k=0}^n\\binom{n}{k}(-1)^k k! x^{n-k}\\varphi^{(n-k)}(x),\\quad x\\neq 0.
$$
The sum is $0$ at $x=0$ because of $\\varphi(0)=0$, so we use 
L'Hospital's rule 
to determine $\\lim_{x\to 0}f^{(n)}(x)$.
$$ \\begin{aligned}
    \\lim_{x\\to 0} f^{(n)}(x) &=\\lim_{x\\to 0}
    \\frac{\\sum_{k=0}^n\\binom{n}{k}(-1)^k k! x^{n-k}\\varphi^{(n-k)}(x)}
    {x^{n+1}} \\\\
    &=\\lim_{x\to 0}
    \\frac{\\frac{\\mathrm{d}}{\\mathrm{d}x}\\sum_{k=0}^n \\binom{n}{k}(-1)^k k!x^{n-k}
	\\varphi^{(n-k)}(x)} {(n+1)x^n}.
\\end{aligned} $$
In the last fraction the numerator is $x^n\\varphi^{(n+1)}(x)$ that was proved for 
any $n$ and $x\\in [a,b)$. Since $\\varphi^{(n+1)}(x)$ is continuous on $[a,b)$ we have 
$f^{(n)}(0)=\\frac{1}{n+1}\\varphi^{(n+1)}(0)$. $\\blacksquare$` },

    "T11": { title: "Theorem 11", 
             content: `Let  $f:[0,b)\\to\\mathbf{R}$,  assume  
$\\log\\circ f$ is a Bernstein function on $[0,b)$, 
$g$ is completely monotone on $(0,b)$, then $f(x)^{g(x)/x}$ 
is logarithmically completely monotone on $(0,b)$.`, 
             proof: `By  <a href="javascript:void(0)" onclick="openTheoremWindow('C4')">Corollary 4</a> it is enough to 
prove the case $g=1$. We follow the idea of 
<a href=\"javascript:void(0)\" onclick=\"highlightBib('b2')\">[2]</a> Proof of Theorem 3. 
Define the function
$$
	\\varphi(x):=(\\log\\circ f)(x). 
$$
Since $\\varphi$ is a Bernstein function thus   $\\varphi(0)\\geq 0$. 
By <a href="javascript:void(0)" onclick="openTheoremWindow('L10')">Lemma 10</a> we obtain on the 
interval $(0,b)$ for $n\\geq 1$ 
$$ \\begin{aligned}
	&x^{n+1}\\left(\\frac{1}{x}\\varphi(x)\\right)^{(n)}=
	\\sum_{k=0}^n \\binom{n}{k}(-1)^k k!x^{n-k}\\varphi^{(n-k)}(x)=:\\Phi(x) \\\\
	&\\Phi '(x)=x^n \\varphi^{(n+1)}(x).
\\end{aligned}  $$
Since the function $\\varphi$ has derivatives of all orders on $[0,b)$  
and $\\varphi(0)\\geq 0$, it easily follows that $(-1)^n\\Phi(0)\\geq 0$. 

If $n$ is even, then we have for $x\\gt 0$ that 
$(\\varphi')^{(n)}(x)\\geq 0$ which implies $\\Phi'(x)\\geq 0$, so 
$\\Phi(x)\\geq 0$, and consequently $(\\varphi(x)/x)^{(n)}=
(-1)^n (\\varphi(x)/x)^{(n)} \\geq 0$. 

Similarly, if $n$ is odd, then we have for $x\\gt 0$ that 
$(\\varphi')^{(n)}(x)\\leq 0$ which implies $\\Phi'(x)\\leq 0$, so 
$\\Phi(x)\\leq 0$, and consequently $(\\varphi(x)/x)^{(n)}\\leq 0$, and 
it gives $(-1)^n (\\varphi(x)/x)^{(n)} \\geq 0$. 

Hence 
$$
	(-1)^n (\\varphi(x)/x)^{(n)} \\geq 0\\quad(x\\gt 0).
$$
The theorem is proved.  $\\blacksquare$` },

    "L12": { title: "Lemma 12", 
             content: `The function 
$$
f(x):=\\left(a+\\frac{b}{x}\\right)^{\\mu}\\quad(a,b,\\mu\\geq 0)
$$
is completely monotone in $(0,\\infty)$. 
<br>
<span class="kiemelt">Remark.</span> The special case $0\\lt \\mu \\lt 1$ was proved in <a href=\"javascript:void(0)\" onclick=\"highlightBib('b9')\">[9]</a> 
Lemma 1 using the 
integral representation for $0\\lt \\mu\\lt 1$
$$
\\left(1+\\frac{1}{x}\\right)^{\\mu}=1+
\\frac{\\mu}{x^{\\mu}}\\int_1^{\\infty}\\frac{1}{t^{\\mu+1}(xt+1)^{1-\\mu}}\\,dt.
$$
We give a more general and simpler proof for $\\mu\\gt 0$ not using the integral 
representation.
`, 
             proof: `The cases $b=0$, or $\\mu=0$ are obvious. If $a=0$  then 
$$
	(-1)^n\\left(\\frac{1}{x^{\\mu}}\\right)^{(n)}=\\mu(\\mu+1)\\cdot 
	(\\mu+n-1) x^{-(\\mu+n)}\\gt 0.
$$
So assume that $a,b,\\mu\\gt 0$. Then
$$
	f(x):=\\left(a+\\frac{b}{x}\\right)^{\\mu}=
	a^{\\mu}\\left(1+\\frac{b/a}{x}\\right)^{\\mu}=
	a^{\\mu}\\left(1+\\frac{1}{ax/b}\\right)^{\\mu}. 
$$
It gives
$$
	(-\\log(f(x)))'=\\mu\\left(\\frac{1}{x}-\\frac{1}{x+1/\\alpha}\\right),
$$
where $\\alpha=a/b$. Since 
$$
	(-1)^n\\left(\\frac{1}{x+c}\\right)^{(n)}=n!(x+c)^{-(n+1)}
$$
we obtain 
$$
	(-1)^n\\mu\\left(\\frac{1}{x}-\\frac{1}{x+1/\\alpha}\\right)^{(n)}=
	\\mu n!\\left(\\frac{1}{x^{n+1}} -\\frac{1}{(x+1/\\alpha)^{n+1}} \\right)\\gt 0.
$$
Applying <a href="javascript:void(0)" onclick="openTheoremWindow('C7')">Corollary 7</a> we get that $f(x)$ is 
completely monotone in $(0,\\infty)$. $\\blacksquare$` },

    "T13": { title: "Theorem 13", 
             content: `Let $I:=(\\alpha,\\infty)$ be interval, 
$a,c\\geq 0$, 
$a^2+b^2, c^2+d^2\\neq 0$. Then 
$$
	f(x):=\\log\\left(\\frac{ax+b}{cx+d}\\right)
$$
is completely monotone in $I$ if and only if one of the following conditions holds 
<ol class="custom-numbered">
    <li>$a=0$, $c=0$, $0 \\lt d \\leq b$ vagy $0 \\gt d \\geq b$, $\\alpha$ is arbitrary;</li>
    <li>$a \\gt 0$, $c=a$, $d=b$, $\\alpha \\geq -d/c$;</li>
    <li>$a \\gt 0$, $c=a$, $b \\gt d$, $\\alpha \\geq -d/c$;</li>
    <li>$a \\gt 0$, $a \\gt c \\gt 0$, $ad-bc \\leq 0$, $\\alpha \\geq -d/c$.</li>
</ol>
<br>
<span class="kiemelt">Remark.</span> 
If $s+A,s+B>0$ then
                         $$ \\log\\left(\\frac{s+A}{s+B}\\right)=\\int_0^{\\infty}e^{-st}\\,\\frac{e^{-Bt}-e^{-At}}{t}\\,dt. $$
               `, 
             proof: `First we consider the "only if" part, then the "if" part is an easy verification.
<ol class="custom-numbered">
<li>$a=0$, $b\\gt 0$. The $c\\gt 0$ case is impossible because $f\\geq 0$, so 
	$c=0$. Then $0\\lt d\\leq b$, and $f$ is a constant function. </li>
<li>$a\\gt 0$. Then $c\\gt 0$. Since $\\lim_{x\\to\\infty}f(x)=\\log(a/c)$ and 
	$f\\geq 0$ we have $a\\geq c$. 
	If $a=c$, and $d=b$, then $f$ is a constant function. </li>
<li>If $d\\neq b$, then since $f\\geq 0$ we get $b\\gt d$. Now we can write
	$$ \\begin{aligned}
		f(x) &=\\log\\left(\\frac{ax+b}{ax+d}\\right) \\\\[1.1em]
		&=\\log(x+b/a)-\\log(x+d/a).
	\\end{aligned} $$
	From this it follows
	$$
		f'(x)=\\frac{1}{x+b/a}-\\frac{1}{x+d/a}\\lt 0.
	$$
	If $n\\geq 2$ then
	$$
		(-1)^nf^{(n)}(x)=-(n-1)!\\left(\\frac{1}{(x+b/a)^n}-
		\\frac{1}{(x+d/a)^n}\\right)\\gt 0.
	$$ </li>
<li>$a\\gt c$. Then $c\\gt 0$. The condition $f\\geq 0$ implies $ax+b\\geq cx+d$ 
	from which we obtain
	<div class="math-equation">
    <div class="math-content">$$ x \\geq \\frac{d-b}{a-c} $$</div>
    <div class="math-number" data-label="eq:alpha_value">(?)</div>
</div>
	We can write
	$$
		f(x)=\\log(a/c)+\\log(x+b/a)-\\log(x+d/c).
	$$
	This yields
	$$
		f'(x)=\\frac{1}{x+b/a}-\\frac{1}{x+d/c}=\\frac{d/c-b/a}{(x+b/a)(x+d/c)}.
	$$
	The condition $f'\\leq 0$ gives $ad-bc\\leq 0$. This inequality shows that 
	in <span id="T13-ref-1" class="ref-link" data-target="eq:alpha_value">(?)</span> $\\frac{d-b}{a-c}\\leq -d/c$, hence $\\alpha\\geq -d/c$. 
	If $n\\geq 2$ then
	$$
		(-1)^nf^{(n)}(x)=-(n-1)!\\left(\\frac{1}{(x+b/a)^n}-\\frac{1}{(x+d/c)^n}\\right)
		\\geq 0.
	$$
	By <a href="javascript:void(0)" onclick="openTheoremWindow('C9')">Corollary 9</a> the proposition 
	follows. $\\blacksquare$ </li>
</ol>` }
,

    "T15": { title: "Theorem 15", 
             content: `Let $g$ be completely monotone function in $(x_0,\\infty)$, and 
$\\alpha:=\\max(x_0,-d/c)$. If

(1) $a\\gt 0$, $c=a$, $b\\geq d$;

or

(2) $a\\gt 0$, $a\\gt c\\gt 0$, $ad-bc\\leq 0$,

then 
$$
	f(x):=\\left(\\frac{ax+b}{cx+d}\\right)^{g(x)}
$$
is logarithmically completely monotone, and completely monotone 
in $(\\alpha,\\infty)$.`, 
             proof: `Obviously
$$
	\\log(f(x))=g(x)\\log\\left(\\frac{ax+b}{cx+d}\\right).
$$
By <a href="javascript:void(0)" onclick="openTheoremWindow('T13')">Theorem 13</a>, 
<a href="javascript:void(0)" onclick="openTheoremWindow('T3')">Theorem 3</a>, and 
<a href="javascript:void(0)" onclick="openTheoremWindow('C9')">Corollary 9</a>
the statement follows. $\\blacksquare$` },

    "T16": { title: "Theorem 16", 
             content: `Let $a,c\\gt 0$, and 
$$
	f(x):=\\log\\left(\\frac{\\Gamma(ax+b)}{\\Gamma(cx+d)}\\right),
$$
where $x\\in (\\alpha,\\infty)=:I$, $\\alpha:=\\max\\{-b/a,-d/c\\}$. Then $f$ is 
completely monotone in $I$ if and only if $a=c$, $b=d$.`, 
             proof: `We know that <a href=\"javascript:void(0)\" onclick=\"highlightBib('b1')\">[1]</a> 1.18 (1)
$$
	\\log\\,\\Gamma(z)=(z-1/2)\\log\\,z-z+1/2\\,\\log(2\\pi)+O(1/z),\\quad 
	|\\arg \\,z|\\lt \\pi-\\varepsilon,\\,\\varepsilon\\gt 0.
$$
Since $f\\geq 0$ we need to have $\\log\\,\\Gamma(ax+b)\\geq\\log\\Gamma(cx+d)$ for 
large $x\\\gt 0$ also. So we get the condition
$$
	ax\\log\\,(ax+b)+O(x)\\geq cx\\log\\,(cx+d)+O(x),
$$
from which 
$$
	a/c\\geq \\log\\,(cx+d)/\\log\\,(ax+b)+O(1/\\log\\,x).
$$
Since the limit of the right-hand-side is $1$ we obtain $a\\geq c$. 

The function $f$ is monotone decreasing thus for $x\\geq x_0\\gt \\alpha$ it is bounded 
above with, say $c_0\\gt 0$.
Using again the asymptotics we have $a\\leq c$. Hence $a=c$. Since we want 
$f\\geq 0$ in the interval, and $\\Gamma$ is strictly monotone increasing 
on $[1,\\infty)$ we need to assume that $b\\geq d$. 

We know that <a href=\"javascript:void(0)\" onclick=\"highlightBib('b1')\">[1]</a> 1.18 (4)
$$
	\\frac{\\Gamma(z+\\alpha)}{\\Gamma(z+\\beta)}=z^{\\alpha-\\beta}(1+O(1/z)) \\quad
	|\\arg\\,z|\\lt \\pi-\\varepsilon,\\,\\varepsilon\\gt 0.
$$ 
Applying this we have
$$
	f(x)=\\log\\,a^{b-d}+(b-d)\\log\\,x+O(1/x).
$$
The function $f$ is monotone decreasing thus for $x\\geq x_0\\gt \\alpha$ it is bounded 
above with, say $c_0\\ 0$. It implies $b\\leq d$.  Hence $b=d$. 
 $\\blacksquare$` },

    "T17": { title: "Theorem 17", 
             content: `Let $a,b\\geq 0$, $\\alpha,\\beta$ be given real numbers and define the function 
<br>
$f_{\\alpha,\\beta}(x)=(x+a)^{\\alpha} [\\psi(x+b)-\\psi(x+a)-\\frac{\\beta}{x+a}]$ 
for $x\\gt \\max (-a,-b)$. 
<br>
$(i)$ If $b=a$ then $f_{\\alpha,\\beta}(x)$ is completely monotone on 
$(-a,\\infty)$ if and only if one of the following conditions holds
<br>
$(i_1)$ $\\beta=0$, $\\alpha$ is arbitrary;
<br>
$(i_2)$ $\\beta\\lt 0$, $\\alpha\\leq 1$.
<br>
$(ii)$ If $b=a+1$ then $f_{\\alpha,\\beta}(x)$ is completely monotone on 
$(-a,\\infty)$ if and only if one of the following conditions holds 
<br>
$(ii_1)$ $\\beta=1$, $\\alpha$ is arbitrary;
<br>
$(ii_2)$ $\\beta\\lt 1$, $\\alpha\\leq 1$.
<br>
$(iii)$ Let $b\\neq a, a+1$. 
 Assume that $0\\lt 1-b+a\\lt 1$, and 
$\\beta\\leq b-a$. 
<br>
$(iii_1)$ Let $\\alpha\\leq 1$. 
Then the function $f_{\\alpha,\\beta}(x)$ is completely 
monotone on $(-a,\\infty)$.  
The lower and upper bounds for $b$, $a\\lt b$ and $b\\lt a+1$, are sharp, and the 
upper bound for $\\beta$ is sharp.
<br>
$(iii_2)$ Let the function $f_{\\alpha,\\beta}(x)$ be completely 
monotone on $(-a,\\infty)$. If $\\beta\\lt b-a$ then $\\alpha\\leq 1$, if $\\beta=b-a$ 
then $\\alpha\\leq 2$. 
<br>
<span class="kiemelt">Remark.</span> 
Here $(iii_1)$ and $(iii_2)$ is a generalization 
of <a href=\"javascript:void(0)\" onclick=\"highlightBib('b2')\">[2]</a> Theorem 1 wherein we can prove an 
"if and only if $\\alpha\\leq 1$" statement when $\\beta\\lt b-a$.
`, 
             proof: `$(i)$ In this case $f_{\\alpha,\\beta}(x)=-\\beta (x+a)^{\\alpha-1}$. If $\\beta=0$ 
then $f_{\\alpha,\\beta}(x)$ is a non-negative constant function, so completely 
monotone. If $\\beta\\neq 0$ then it is necessary that $\\beta\\lt 0=b-a$. In this case 
$\\alpha\\leq 1$ is the necessary and sufficient condition for $f_{\\alpha,\\beta}(x)$ 
to be completely monotone. 
<br>
$(ii)$ Since 
$$
    \\psi(z+1)=\\psi(z)+\\frac{1}{z},
$$
we obtain
$$
    f_{\\alpha,\\beta}(x)=(1-\\beta)(x+a)^{\\alpha-1}.
$$
If $\\beta=1$ then $f_{\\alpha,\\beta}(x)$ is a non-negative constant function, so 
completely monotone. If $\\beta\\neq 1$ then it is necessary that $\\beta\\lt 1=b-a$. 
In this case 
$\\alpha\\leq 1$ is the necessary and sufficient condition for $f_{\\alpha,\\beta}(x)$ 
to be completely monotone. 
<br>
$(iii_1)$
To prove that $f_{\\alpha,\\beta}$ is completely monotone, we need to modify 
the function $\\varphi$ in <a href=\"javascript:void(0)\" onclick=\"highlightBib('b2')\">[2]</a> Proof of Theorem 1, 
$$
	\\varphi(t):=1-\\beta-\\frac{e^{(1-b+a)t}-1}{e^t-1},
$$
and the proof works. 

We show that the 
lower and upper bounds for $b$, $a\\lt b$ and $b\\lt a+1$, are sharp. 
Assume that $f_{1}:=f_{1,b-a}$ is completely monotone. 

We know that <a href=\"javascript:void(0)\" onclick=\"highlightBib('b1')\">[1]</a> 1.7 (3)
$$
	\\psi(z)=-\\gamma-\\frac{1}{z}+\\sum_{k=1}^{\\infty}\\frac{z}{k(z+k)},
$$
uniformly on compact sets not containing the poles of $\\psi$ 
($z=0,-1,-2,\\ldots$), where $\\gamma$ is the Euler–Mascheroni constant. 
This equation can be written into
$$
	\\psi(z)=-\\gamma-\\frac{1}{z}+\\sum_{k=1}^{\\infty}\\left[\\frac{1}{k}-
	\\frac{1}{z+k}\\right].
$$
From this we obtain
<div class="math-equation">
<div class="math-content">
$$ \\begin{aligned}
	f_{1}(x) &=(x+a)[\\psi(x+b)-\\psi(x+a)]-(b-a) \\\\
	&=(x+a)\\left(\\frac{1}{x+a}-\\frac{1}{x+b}+\\sum_{k=1}^{\\infty}
	\\left[\\frac{1}{x+a+k}-\\frac{1}{x+b+k}\\right]
	\\right) -(b-a) \\\\
	&=\\frac{b-a}{x+b}+(x+a)\\sum_{k=1}^{\\infty}\\frac{b-a}{(x+a+k)(x+b+k)}-(b-a)
	\\\\ 
	&=(b-a)(F(a,b,x)-1), 
\\end{aligned} $$
</div>
<div class="math-number" data-label="eq:f1">(?)</div>
</div>
where
$$
	F(a,b,x)=\\frac{1}{x+b}+(x+a)\\sum_{k=1}^{\\infty}\\frac{1}{(x+a+k)(x+b+k)}.
$$
The function $F$ is strictly monotone decreasing in $b$ (if $a,x$ is fixed),  
and  
$$ \\begin{aligned}
	F(a,a+1,x) &=\\frac{1}{x+a+1}+(x+a)\\sum_{k=1}^{\\infty}\\left[
	\\frac{1}{x+a+k}-\\frac{1}{x+a+1+k}\\right] \\\\
	&=\\frac{1}{x+a+1}+(x+a)\\frac{1}{x+a+1}=1.
\\end{aligned} $$
If $b\\gt a$ then <span id="T17-ref-1" class="ref-link" data-target="eq:f1">(?)</span> implies $b\\lt a+1$. If $b\\lt a$ then we should have  
$b\\geq a+1$, but this is impossible. 
Now we prove that the assumption $\\beta\\leq b-a$ is sharp. 
We know <a href=\"javascript:void(0)\" onclick=\"highlightBib('b7')\">[7]</a> 2.11 (9)  that
$$
	\\psi(z+a)=\\log\,z+ \\frac{a-1/2}{z}
	+O\\left(\\frac{1}{z^2}\\right),
	\\quad (z\\to\\infty\,\\mathrm{in}\\, |\\arg\\,z|\\lt \\pi-\\varepsilon,\\,\\varepsilon\\gt 0),
$$
where $a$ is an arbitrary complex number. 
From this
$$
	\\psi(x+b)=\\log\\,x+\\frac{b-1/2}{x}+
	O\\left(\\frac{1}{x^2}\\right).
$$
Thus we get

<div class="math-equation">
<div class="math-content">
$$
\\psi(x+b)-\\psi(x+a) =\\frac{b-a}{x}
	+O\\left(\\frac{1}{x^2}\\right).
$$
</div>
<div class="math-number" data-label="eq:psi_different">(?)</div>
</div>

Hence we obtain
$$ \\begin{aligned}
	f_{1,\\beta}(x) &=(x+a)\\left(\\frac{b-a-\\beta}{x}+
	O\\left(\\frac{1}{x^2}\\right) \\right)\\\\
	&=b-a-\\beta+O\\left(\\frac{1}{x}\\right).
\\end{aligned} $$
Since $f_{1,\\beta}(x)\\geq 0$ for all $x\\gt -a$, we should assume that 
$\\beta\\leq b-a$. 
<br>
$(iii_2)$
We follow the idea from <a href=\"javascript:void(0)\" onclick=\"highlightBib('b2')\">[2]</a> Theorem 1. 
Assume that $f_{\\alpha,\\beta}$ is completely monotone on $(-a,\\infty)$. 
Then we have for all $x\\gt -a$
$$ \\begin{aligned}
	f_{\\alpha,\\beta}'(x)&=
    (x+a)^{\\alpha-2}\\times \\\\
    &\\left\\{
	\\alpha(x+a)[\\psi(x+b)-\\psi(x+a)] +(x+a)^2
	[\\psi'(x+b)-\\psi'(x+a)]\\right. \\\\
    &\\left. -(\\alpha-1)\\beta\\right\\} \\lt  0,
\\end{aligned} $$
which implies

<div class="math-equation">
<div class="math-content">
$$ \\begin{aligned}
&\\alpha\\{ (x+a)[\\psi(x+b)-\\psi(x+a)]-\\beta\\} \\\\
    &\\lt -(x+a)^2[\\psi'(x+b)-\\psi'(x+a)]-\\beta.
\\end{aligned} $$
</div>
<div class="math-number" data-label="eq:upper_for_alpha_beta">(?)</div>
</div>

We know <a href=\"javascript:void(0)\" onclick=\"highlightBib('b7')\">[7]</a> 2.11 (9)  that
$$ \\begin{aligned}
	\\psi(z+a) & =\\log\\,z- \\sum_{k=0}^1
\\frac{(-1)^{k+1}B_{k+1}(a)}{k+1}z^{-k-1}+O\\left(\\frac{1}{z^3}\\right), \\\\
	& (z\\to\\infty\,\\mathrm{in}\\, |\\arg\\,z|\\lt \\pi-\\varepsilon,\\,\\varepsilon\\gt  0),
\\end{aligned}  $$
where $a$ is an arbitrary complex number, and $B_{k+1}(a)$ are Bernoulli polynomials, 
$B_1(a)=a-1/2$, $B_2(a)=a^2-a+1/6$, that is, 
$$
    \\psi(x+a)=\\log x+\\frac{a-1/2}{x}-\\frac{a^2-a+1/6}{2}\\frac{1}{x^2}+
    O\\left(\\frac{1}{x^3}\\right). 
$$
Thus we get 
<div class="math-equation">
<div class="math-content">
$$ \\begin{aligned}
    & (x+a)[\\psi(x+b)-\\psi(x+a)]-(b-a)  \\\\
    & =(x+a) \\left[
    \\frac{b-a}{x}+\\frac{(a-b)(a+b-1)}{2}\\frac{1}{x^2}+
    O\\left(\\frac{1}{x^3}\\right) \\right]-(b-a)  \\\\
    & =\\frac{(b-a)(a-b+1)}{2}\\frac{1}{x} +O\\left(\\frac{1}{x^2}\\right).
\\end{aligned} $$
</div>
<div class="math-number" data-label="eq:psi_difference_asymp_finer">(?)</div>
</div>

Since $\\psi$ is analytical as $z\\to\\infty$ $(|\\arg\\,z|\\lt \\pi-\\varepsilon,\\,
\\varepsilon\\gt 0)$,  
we obtain
$$ \\begin{aligned}
	\\psi'(z+a) & =\\frac{1}{z}+ \\sum_{k=0}^1
(-1)^{k+1}B_{k+1}(a)z^{-k-2}+O\\left(\\frac{1}{z^4}\\right), \\\\
	& (z\\to\\infty\\,\\mathrm{in}\\, |\\arg\\,z|\\lt \\pi-\\varepsilon,\\,\\varepsilon\\gt 0),
\\end{aligned} $$
that is, 
$$
    \\psi'(x+a)=\\frac{1}{x}-\\frac{a-1/2}{x^2}+\\frac{a^2-a+1/6}{x^3}+
    O\\left(\\frac{1}{x^4}\\right). 
$$
Thus we get

<div class="math-equation">
<div class="math-content">
$$ \\begin{aligned}
    &-(x+a)^2[\\psi'(x+b)-\\psi'(x+a)]+(a-b)  \\\\ 
    &=-(x+a)^2\\left[
    \\frac{a-b}{x^2}+\\frac{(b-a)(a+b-1)}{x^3}+O\\left(\\frac{1}{x^4}\\right)
    \\right]+(a-b)  \\\\
    & =\\frac{(a-b+1)(b-a)}{x}+O\\left(\\frac{1}{x^2}\\right).
\\end{aligned} $$
</div>
<div class="math-number" data-label="eq:psi_diff_asymp_finer">(?)</div>
</div>

Using <span id="T17-ref-2" class="ref-link" data-target="eq:psi_difference_asymp_finer">(?)</span>  
and <span id="T17-ref-3" class="ref-link" data-target="eq:psi_diff_asymp_finer">(?)</span>   
we obtain from <span id="T17-ref-4" class="ref-link" data-target="eq:upper_for_alpha_beta">(?)</span>   
$$ \\begin{aligned}
    &\\alpha(b-a-\\beta)+\\frac{\\alpha(b-a)(a-b+1)}{2x}+O\\left(\\frac{1}{x^2}\\right)\\\\
    &\\leq b-a-\\beta+\\frac{(a-b+1)(b-a)}{x}+O\\left(\\frac{1}{x^2}\\right).
\\end{aligned} $$
Letting $x\\to\\infty$ we conclude that $\\alpha\\leq 1$ when $\\beta\\lt b-a$, and 
$\\alpha\\leq 2$ when $\\beta=b-a$.
 $\\blacksquare$ `},

    "R18": { title: "Remark 18", 
             content: `If $\\beta=b-a$ and $-1-2a+2b\\gt 0$ in Theorem 
<a href="javascript:void(0)" onclick="openTheoremWindow('T17')">Theorem 17</a> $(iii_2)$ 
then $\\alpha\\lt 2$. `, 
             proof: `We know <a href=\"javascript:void(0)\" onclick=\"highlightBib('b7')\">[7]</a> 2.11 (9)  that
$$ \\begin{aligned}
	\\psi(z+a) & =\\log\\,z- \\sum_{k=0}^2
\\frac{(-1)^{k+1}B_{k+1}(a)}{k+1}z^{-k-1}+O\\left(\\frac{1}{z^4}\\right), \\\\
	& (z\\to\\infty\\,\\mathrm{in}\\, |\\arg\\,z|\\lt \\pi-\\varepsilon,\\,\\varepsilon\\gt 0),
\\end{aligned} $$
where $a$ is an arbitrary complex number, and $B_{k+1}(a)$ are Bernoulli polynomials, 
$B_1(a)=a-1/2$, $B_2(a)=a^2-a+1/6$, $B_3(a)=a^3-3a^2/2+a/2$  that is, 
$$
    \\psi(x+a)=\\log x+\\frac{a-1/2}{x}-\\frac{a^2-a+1/6}{2}\\frac{1}{x^2}+
    \\frac{a^3-3a^2/2+a/2}{3}\\frac{1}{x^3}
    +O\\left(\\frac{1}{x^4}\\right). 
$$
Thus we get
<div class="math-equation">
<div class="math-content">
$$ \\begin{aligned}
    & (x+a)[\\psi(x+b)-\\psi(x+a)] \\\\
    & =(x+a)\\left[ 
    \\frac{b-a}{x}+\\frac{(a-b)(a+b-1)}{2}\\frac{1}{x^2} \\right.\\\\
    &\\left.+\\frac{(b-a)(1-3a+2a^2-3b+2ab+2b^2)}{6}\\frac{1}{x^3}
    +O\\left(\\frac{1}{x^4}\\right)\\right] \\\\
    &=b-a+\\frac{(b-a)(a-b+1)}{2}\\frac{1}{x}+\\frac{(a-b)(1+a-b)(-1+a+2b)}{6}\\frac{1}{x^2}
    \\\\
    &+O\\left(\\frac{1}{x^3}\\right).
\\end{aligned} $$
</div>
<div class="math-number" data-label="eq:psi_difference_asymp_finest">(?)</div>
</div>
Since $\\psi$ is analytical as $z\\to\\infty$ $(|\\arg\\,z|\\lt \\pi-\\varepsilon,\\,
\\varepsilon\\gt 0)$, we obtain
$$ \\begin{aligned}
	\\psi'(z+a) & =\\frac{1}{z}+ \\sum_{k=0}^2
(-1)^{k+1}B_{k+1}(a)z^{-k-2}+O\\left(\\frac{1}{z^5}\\right), \\\\
	& (z\\to\\infty\\,\\mathrm{in}\\, |\\arg\\,z|\\lt \\pi-\\varepsilon,\\,\\varepsilon\\gt 0),
\\end{aligned} $$
that is, 
$$
    \\psi'(x+a)=\\frac{1}{x}-\\frac{a-1/2}{x^2}+\\frac{a^2-a+1/6}{x^3}
    -\\frac{a^3-3a^2/2+a/2}{x^4}
    +O\\left(\\frac{1}{x^5}\\right). 
$$
Thus we get
<div class="math-equation">
<div class="math-content">
$$ \\begin{aligned}
    & (x+a)^2[\\psi'(x+b)-\\psi'(x+a)] \\\\
    & =(x+a)^2\\left[ 
    \\frac{a-b}{x^2}+\\frac{(b-a)(a+b-1)}{x^3} \\right.\\\\
    &\\left. +\\frac{(a-b)(1-3a+2a^2-3b+2ab+2b^2)}{2x^4}
    +O\\left(\\frac{1}{x^5}\\right)\\right] \\\\
    & =a-b+\\frac{(a-b)(1+a-b)}{x}+\\frac{(b-a)(1+a-b)(-1+2b)}{2x^2}+O\\left(\\frac{1}
    {x^3}\\right). 
\\end{aligned} $$
</div>
<div class="math-number" data-label="eq:psi_first_diff_finest">(?)</div>
</div>
Using <span id="R18-ref-1" class="ref-link" data-target="eq:psi_difference_asymp_finest">(?)</span> and 
<span id="R18-ref-2" class="ref-link" data-target="eq:psi_first_diff_finest">(?)</span>
we obtain from 
<span id="R18-ref-3" class="ref-link" data-target="eq:upper_for_alpha_beta">(?)</span>

$$ \\begin{aligned}
    &\\alpha\\{ (x+a)[\\psi[x+b]-\\psi(x+a)]-(b-a)\\} \\\\
    &=\\frac{\\alpha(b-a)(a-b+1)}{2x}+\\frac{\\alpha(a-b)(1+a-b)(a-1+2b)}{6x^2}
    +O\\left(\\frac{1}{x^3}\\right) \\\\
    &\\leq -(x+a)^2[\\psi'(x+b)-\\psi'(x+a)]+(a-b) \\\\
    &=\\frac{(b-a)(1+a-b)}{x}+\\frac{(b-a)(1+a-b)(1-2b)}{2x^2}+O\\left(\\frac{1}{x^3}\\right).
\\end{aligned} $$
Putting $2$ into $\\alpha$ we obtain
$$
    (b-a)(1+a-b)(-1-2a+2b)\\leq O\\left(\\frac{1}{x}\\right),
$$
which is impossible when $-1-2a+2b\\gt 0$, hence in this case $\\alpha\\neq 2$, 
that is $\\alpha\\lt 2$. $\\blacksquare$ ` },

    "T19": { title: "Theorem 19", 
             content: `Let $a\\geq 0$, $b\\gt 0$ be given real numbers with $0\\lt 1-b+a\\lt 1$. 
 Then the function 
$g_{\\beta}(x)=\\frac{(x+a)^{\\beta}\\Gamma(x+a)}{\\Gamma(x+b)}$ is  
logarithmically completely monotone on $(-a,\\infty)$  
 if and only if $\\beta\\leq b-a$. 
<br>
<span class="kiemelt">Remark.</span>
In <a href=\"javascript:void(0)\" onclick=\"highlightBib('b2')\">[2]</a> Theorem 2 it was proved that the function $g_{\\beta}$ 
 is strictly logarithmically completely 
monotone on 
$(-a,\\infty)$, reducing the problem to $g_{b-a}(x)$ by the identity 
$g_{\\beta}(x)=(x+a)^{\\beta-(b-a)}g_{b-a}(x)$.  We  
show that it can be proved directly without this identity.
`, 
             proof: `The function 
$$
	f_{0,\\beta}:=(-\\log\\circ g_{\\beta})'
$$
is completely monotone by 
 <a href="javascript:void(0)" onclick="openTheoremWindow('T17')">Theorem 17</a> when $\\beta\\leq b-a$.  

Now we prove the only if part. 
Assume that $g_{\\beta}$ is logarithmically completely monotone. 
<a href="javascript:void(0)" onclick="openTheoremWindow('C7')">Corollary 7</a> implies that $g_{\\beta}$ is completely 
monotone.
Then for $x\\gt -a$
$$ \\begin{aligned}
	g_{\\beta}'(x) &=g_{\\beta}(x)(\\log\\circ g_{\\beta})'(x)\\\\
	&=\\frac{g_{\\beta}(x)}{x+a}\\left\\{
	\\beta+(x+a)\\left[\\psi(x+a)-\\psi(x+b)\\right]\\right\\}\\leq 0,
\\end{aligned} $$
that is,
$$
	\\beta\\leq (x+a)\\left[\\psi(x+b)-\\psi(x+a)\\right].
$$
Using that $\\psi(x+b)-\\psi(x+a)\\geq 0$, the asymptotic formula 
<span id="T19-ref-1" class="ref-link" data-target="eq:psi_different">(?)</span> and applying $x\\to\\infty$ 
we obtain $\\beta\\leq b-a$.
 $\\blacksquare$` },

    "T20": { title: "Theorem 20", 
             content: `Let $a,b\\gt 0$, $\\beta$ be given real numbers with 
$0\\lt 1-b+a\\leq 1$, $\\beta\\leq b-a$, $c_0\\geq 
a^{\\beta}\\Gamma(a)/\\Gamma(b)$, $g(x)$ be completely monotone on 
$(0,\\infty)$. Then the function 
$\\left[\\frac{c_0\\Gamma(x+b)}{(x+a)^{\\beta}\\Gamma(x+a)}\\right]^{g(x)/x}$ 
is logarithmically completely monotone 
on $(0,\\infty)$. 
<br>
<span class="kiemelt">Remark.</span>
The special case $b=1$, $a=1/2$, $\\beta=0$, $c_0=\\sqrt{\\pi}$, 
$g(x)=1$ of Theorem 
was proved in <a href=\"javascript:void(0)\" onclick=\"highlightBib('b2')\">[2]</a> Theorem 3.
`, 
             proof: `Define the function $\\varphi$ by
$$
	\\varphi(x):=\\log\\,\\Gamma(x+b)-\\log\\,\\Gamma(x+a)-\\beta\\log(x+a)
	+\\log\\,c_0.
$$
Then 
$$
	\\varphi'(x)=\\psi(x+b)-\\psi(x+a)-\\frac{\\beta}{x+a}=f_{0,\\beta}(x).
$$
<a href="javascript:void(0)" onclick="openTheoremWindow('T17')">Theorem 17</a> yields 
$\\varphi'(x)$ is completely monotone on $[0,\\infty)$.  Thus  
$\\varphi'(x)\\geq 0$ so $\\varphi(x)$ is monotone increasing. 
Since $\\varphi(0)\\geq 0$ we obtain $\\varphi(x)$ is a Bernstein function 
on $[0,\\infty)$. Lastly, <a href="javascript:void(0)" onclick="openTheoremWindow('T11')">Theorem 11</a> 
implies that our function is 
logarithmically completely monotone. $\\blacksquare$` },

    "L21": { title: "Lemma 21", 
             content: `The function $1+\\frac{1}{x}\\log\\,\\Gamma(x+1)-\\log(x+1)$ 
is completely monotone on $(-1,\\infty)$. 
<br>
<span class="kiemelt">Remark.</span>
Lemma 
was proved in <a href=\"javascript:void(0)\" onclick=\"highlightBib('b11')\">[11]</a> Theorem 1.
`, 
             proof: `` },

    "T22": { title: "Theorem 22", 
             content: `Let $0\\leq\\beta \\leq 1$. Then the function $1+\\frac{1}{x}\\log\\,\\Gamma(x+1)-\\log(x+\\beta)$ 
is completely monotone on $(0,\\infty)$. 
<br>
<span class="kiemelt">Remark.</span>
The special case $\\beta=0$ was proved in <a href=\"javascript:void(0)\" onclick=\"highlightBib('b10')\">[10]</a> Theorem 2.
`, 
             proof: `By <a href="javascript:void(0)" onclick="openTheoremWindow('L21')">Lemma 21</a> 
$$
	1+\\frac{1}{x}\\log\\,\\Gamma(x+1)-\\log(x+1)
$$
is completely monotone on $(-1,\\infty)$.
By <a href="javascript:void(0)" onclick="openTheoremWindow('T13')">Theorem 13</a>
$$
	\\log\\left(\\frac{x+1}{x+\\beta}\\right)
$$
is completely monotone on $(0,\\infty)$. Thus their sum
$$
	1+\\frac{1}{x}\\log\\,\\Gamma(x+1)-\\log(x+\\beta)
$$
is also completely monotone on $(0,\\infty)$. $\\blacksquare$` }
};


// 1. Globális regiszter az ID-k és sorszámok tárolására
const globalEquationRegistry = {};

// 2. Az összes tétel bejárása és a regiszter feltöltése
function initializeEquationRegistry() {
    let globalCounter = 0;

    for (const theoremId in theoremsData) {
        const theorem = theoremsData[theoremId];
        
        // Összegyűjtjük a tartalmat (content + proof)
        const fullContent = (theorem.content || "") + (theorem.proof || "");

        // Keresünk minden math-number elemet, ami data-label-lel rendelkezik
        // Ehhez egy ideiglenes DOM objektumot használunk a kereséshez
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = fullContent;
        
        const equationElements = tempDiv.querySelectorAll('.math-number[data-label]');

        equationElements.forEach(el => {
            globalCounter++;
            const label = el.getAttribute('data-label');
            
            // Regisztráljuk az ID-t
            globalEquationRegistry[label] = {
                number: globalCounter,
                formatted: `(${globalCounter})`,
                theoremId: theoremId
            };
        });
    }
}

// Inicializáljuk a betöltéskor
initializeEquationRegistry();


function goBack() {
    if (navigationStack.length > 0) {
        const sourceId = navigationStack.pop();
        const sourceElement = document.getElementById(sourceId);

        if (sourceElement) {
            // 1. Ablak előtérbe hozása, ha szükséges
            const win = sourceElement.closest('.math-window');
            if (win) bringToFront(win);

            // 2. Görgetés a forráshoz (oda, ahonnan kattintottál)
            sourceElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Opcionális: villantás, hogy lásd, hova érkeztél
            sourceElement.style.transition = "background-color 0.5s";
            sourceElement.style.backgroundColor = "#ffeb3b";
            setTimeout(() => { sourceElement.style.backgroundColor = "transparent"; }, 2000);
        } else {
            console.warn("A forráselem (ID) már nem található a DOM-ban.");
        }
    }
}

function scrollToEquation(targetId) {
    const el = document.querySelector(`.math-number[data-label="${targetId}"]`);
    
    if (el) {
        // 1. Megkeressük az ablakot, amiben a cél van
        const win = el.closest('.math-window');
        if (win) {
            bringToFront(win); // Előtérbe hozzuk
        }

        // 2. Kibontjuk a bizonyítást
        const proofContainer = el.closest('.proof-container');
        if (proofContainer && proofContainer.style.display === 'none') {
            const proofId = proofContainer.id.replace('proof-', '');
            toggleProof(proofId);
        }

        setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Gomb hozzáadása
            if (!el.querySelector('.back-btn')) {
                const backBtn = document.createElement('button');
                backBtn.innerText = 'Back';
                backBtn.className = 'back-btn';
                backBtn.onclick = function(e) {
                    e.stopPropagation();
                    backBtn.remove();
                    goBack();
                };
                el.appendChild(backBtn);
            }
        }, 200);
    }
}

// --- IDE ILLESZD BE AZ ESEMÉNYFIGYELŐT ---
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('ref-link')) {
        // 1. Elmentjük a forrás ID-ját (a visszaúthoz)
        const sourceId = e.target.id;
        if (sourceId) {
            navigationStack.push(sourceId);
        }

        // 2. Megkapjuk a cél-képlet ID-ját
        const targetId = e.target.getAttribute('data-target');
        
        // 3. MEGOLDÁS: Megkeressük, melyik ablakhoz tartozik a cél-képlet
        // (A globalEquationRegistry-ben biztosan el van tárolva a theoremId)
        const entry = globalEquationRegistry[targetId];
        if (entry) {
            const theoremId = entry.theoremId;
            const win = document.getElementById(`win-${theoremId}`);

            // Ha nincs nyitva az ablak, nyissuk meg!
            if (!win) {
                openTheoremWindow(theoremId);
                // Kicsit várni kell, amíg az ablak létrejön a DOM-ban
                setTimeout(() => scrollToEquation(targetId), 400);
            } else {
                // Ha nyitva van, csak ugorjunk oda
                scrollToEquation(targetId);
            }
        }
    }
});


let currentPanX = 0, currentPanY = 0, currentZoom = 1;
let isPanning = false, startX, startY;

window.addEventListener('DOMContentLoaded', () => {
    const element = document.querySelector('.mermaid');
    if (!element) return;
    
    mermaid.render('mermaid-svg', element.textContent).then(({ svg }) => {
        document.getElementById('canvas-container').innerHTML = svg;
        setupClickListeners();
        initNativePanZoom();
    }).catch(err => console.error("Mermaid hiba:", err));
});

function initNativePanZoom() {
    const container = document.getElementById("canvas-container");
    const svg = container.querySelector("svg");
    if (!svg) return;
    svg.style.width = "100%"; svg.style.height = "100%";
    svg.style.transformOrigin = "center center";
    
    container.addEventListener("wheel", (e) => {
        e.preventDefault();
        const zoomIntensity = 0.05;
        currentZoom += (e.deltaY < 0) ? zoomIntensity : -zoomIntensity;
        currentZoom = Math.max(0.2, Math.min(3, currentZoom));
        applyTransform(svg);
    }, { passive: false });

    container.addEventListener("mousedown", (e) => {
        if (e.target.closest('#fixed-bibliography')) return;
        if (e.target === container || e.target.tagName === "svg" || e.target.id === "mermaid-svg" || e.target.tagName === "rect") {
            isPanning = true;
            startX = e.clientX - currentPanX;
            startY = e.clientY - currentPanY;
            svg.style.cursor = "grabbing";
        }
    });

    window.addEventListener("mousemove", (e) => {
        if (!isPanning) return;
        currentPanX = e.clientX - startX;
        currentPanY = e.clientY - startY;
        applyTransform(svg);
    });

    window.addEventListener("mouseup", () => {
        if (isPanning) { isPanning = false; svg.style.cursor = "grab"; }
    });
}

function applyTransform(svgElement) {
    svgElement.style.transform = `translate(${currentPanX}px, ${currentPanY}px) scale(${currentZoom})`;
}

function setupClickListeners() {
    const nodes = document.querySelectorAll('#canvas-container .node');
    nodes.forEach(node => {
        node.style.cursor = 'pointer';
        node.addEventListener('click', (e) => {
            e.stopPropagation();
            let nodeId = node.id;
            if (!nodeId && node.parentElement) nodeId = node.parentElement.id;
            const match = nodeId.match(/flowchart-([TCLRB]\d+)-/) || nodeId.match(/([TCLRB]\d+)/);
            if (match && match[1]) openFocusAndScroll(match[1]);
        });
    });
}

function openFocusAndScroll(id) {
    let win = document.getElementById(`win-${id}`);
    if (!win) { openTheoremWindow(id); win = document.getElementById(`win-${id}`); }
    if (!win) return;
    bringToFront(win);
    triggerFlashEffect(win);
}

function bringToFront(windowEl) {
    document.querySelectorAll('.math-window').forEach(w => w.style.zIndex = 100);
    windowEl.style.zIndex = 120;
}

function triggerFlashEffect(windowEl) {
    windowEl.style.outline = "4px solid #ff9f43";
    windowEl.style.boxShadow = "0 0 25px #ff9f43";
    setTimeout(() => { windowEl.style.outline = "none"; windowEl.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)"; }, 1000);
}



function setupReferences(containerElement) {
    // 1. Létrehozunk egy objektumot, amiben tároljuk az ID -> Sorszám kapcsolatot
    const idToNumber = {};

    // 2. Képletek számozása és a térkép feltöltése
    const numbers = containerElement.querySelectorAll('.math-number');
    numbers.forEach((el, index) => {
        const num = index + 1;
        el.textContent = `(${num})`;
        if (el.dataset.label) {
            el.id = el.dataset.label;
            idToNumber[el.dataset.label] = `(${num})`; // Eltároljuk: "eq:alpha_value" -> "(1)"
        }
    });

    // 3. Hivatkozások frissítése és eseménykezelő beállítása
    containerElement.querySelectorAll('.ref-link').forEach(link => {
        const targetId = link.getAttribute('data-target');
        
        // Ha találunk a térképben ilyen ID-t, beírjuk a sorszámot a "?" helyére
        if (idToNumber[targetId]) {
            link.textContent = idToNumber[targetId];
        }

        // Kattintás eseménykezelő (ugrás)
        link.onclick = (e) => {
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        };
    });
}


function applyGlobalNumbering(containerElement) {
    // Megkeressük az összes számozandó elemet az adott ablakban
    const mathNumbers = containerElement.querySelectorAll('.math-number[data-label]');
    
    mathNumbers.forEach(el => {
        const label = el.getAttribute('data-label');
        // Megnézzük, szerepel-e a globális regiszterben
        if (globalEquationRegistry[label]) {
            el.textContent = globalEquationRegistry[label].formatted;
        }
    });

    // Ugyanezt megcsináljuk a hivatkozásoknál (ref-linkeknél) is
    const refLinks = containerElement.querySelectorAll('.ref-link[data-target]');
    refLinks.forEach(link => {
        const targetId = link.getAttribute('data-target');
        if (globalEquationRegistry[targetId]) {
            link.textContent = globalEquationRegistry[targetId].formatted;
        }
    });
}

function openTheoremWindow(id) {
    const data = theoremsData[id];
    if (!data) return;

    // 1. ELLENŐRZÉS: Nyitva van-e már?
    const existingWin = document.getElementById(`win-${id}`);
    if (existingWin) {
        // Ha nyitva van, hozd előre
        bringToFront(existingWin);
        
        // Vizuális jelzés (sárga keret villantás)
        existingWin.style.transition = "border 0.5s ease";
        existingWin.style.border = "2px solid #ffeb3b";
        setTimeout(() => { 
            existingWin.style.border = "1px solid rgba(0,0,0,0.1)"; 
        }, 1000);
        return; // Nem nyitunk újat
    }

    // 2. LÉTREHOZÁS (ha nem volt nyitva):
    const container = document.getElementById('window-container');
    const win = document.createElement('div');
    win.id = `win-${id}`;
    win.className = 'math-window';
    win.style.top = `${120 + Math.random() * 60}px`;
    win.style.left = `${300 + Math.random() * 100}px`;

    win.innerHTML = `
        <div class="window-header" id="handle-${id}">
            <span>${data.title}</span>
            <button class="close-btn" onclick="closeWindow('${id}')">Close</button>
        </div>
        <div class="window-content" id="content-${id}">
            <div class="statement">${data.content}</div>
            ${data.proof ? `
                <hr class="window-divider">
                <button class="proof-toggle-btn" onclick="toggleProof('${id}')" id="btn-proof-${id}">Show Proof ↓</button>
                <div class="proof-container" id="proof-${id}" style="display: none;">
                    <strong>Proof:</strong><br>${data.proof}
                </div>
            ` : ''}
        </div>
    `;

    container.appendChild(win);
    makeResizable(win);
    
    makeDraggable(win, document.getElementById(`handle-${id}`));
    win.addEventListener('mousedown', () => bringToFront(win));
    
    // AZ ELŐREHOZÁS ÉS A VILLANTÁS ELSŐNEK
    bringToFront(win);
    
    // Villantás (azonnal, de CSS animációval)
    win.style.transition = "border 0.5s ease";
    win.style.border = "2px solid #ffeb3b";
    setTimeout(() => { win.style.border = "1px solid rgba(0,0,0,0.1)"; }, 1000);


    // --- IDE ÍRD A MÓDOSÍTÁST ---
    const contentDiv = document.getElementById(`content-${id}`);
    
    // 1. Globális sorszámok alkalmazása
    applyGlobalNumbering(contentDiv);


    // 2. KÉPLETEK RENDERELÉSE UTOLSÓNAK
    // Ezzel biztosítjuk, hogy a KaTeX látja a végleges DOM elemeket
    if (typeof renderMathInElement === "function") {
        renderMathInElement(document.getElementById(`content-${id}`), {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "$", right: "$", display: false}
            ],
            throwOnError: false
        });
    }
}


// Képletek sorszám hivatkozása esetén a hivatkozott képletre görget
function scrollToElement(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}


function closeWindow(id) { const win = document.getElementById(`win-${id}`); if (win) win.remove(); }

function toggleProof(id) {
    const proofDiv = document.getElementById(`proof-${id}`);
    const btn = document.getElementById(`btn-proof-${id}`);
    if (proofDiv.style.display === "none") {
        proofDiv.style.display = "block"; btn.innerText = "Hide Proof ↑";
    } else {
        proofDiv.style.display = "none"; btn.innerText = "Show Proof ↓";
    }
}

function highlightBib(bibId) {
    const target = document.getElementById(bibId);
    if (target) {
        // A modern böngészők így biztosan a megfelelő helyre görgetnek
        target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Sárga kiemelés
        target.style.transition = "background-color 0.5s ease";
        target.style.backgroundColor = "#ffeb3b";
        setTimeout(() => { target.style.backgroundColor = "transparent"; }, 2000);
    } else {
        console.error("A hivatkozott tétel nem található: " + bibId);
    }
}

function makeDraggable(windowEl, handleEl) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0; 
    handleEl.onmousedown = (e) => {
        if (e.target.className === 'close-btn') return;
        e.preventDefault(); pos3 = e.clientX; pos4 = e.clientY;
        document.onmouseup = () => { document.onmouseup = null; document.onmousemove = null; };
        document.onmousemove = (e) => {
            e.preventDefault();
            pos1 = pos3 - e.clientX; pos2 = pos4 - e.clientY;
            pos3 = e.clientX; pos4 = e.clientY;
            windowEl.style.top = (windowEl.offsetTop - pos2) + "px";
            windowEl.style.left = (windowEl.offsetLeft - pos1) + "px";
        };
        bringToFront(windowEl);
    };
}

function makeResizable(windowEl) {
    const resizer = document.createElement('div');
    resizer.className = 'resizer';
    windowEl.appendChild(resizer);
    
    resizer.addEventListener('mousedown', function(e) {
        e.preventDefault();
        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', stopResize);
    });

    function resize(e) {
        const newWidth = e.clientX - windowEl.offsetLeft;
        const newHeight = e.clientY - windowEl.offsetTop;
        
        // Minimális méret ellenőrzése
        if (newWidth > 300) windowEl.style.width = newWidth + 'px';
        if (newHeight > 200) windowEl.style.height = newHeight + 'px';
    }

    function stopResize() {
        window.removeEventListener('mousemove', resize);
        window.removeEventListener('mouseup', stopResize);
    }
}


function showSection(sectionId) {
    // 1. Minden szekciót elrejtünk
    const sections = document.querySelectorAll('.main-content section');
    sections.forEach(s => s.style.display = 'none');
    
    // 2. A kiválasztottat megjelenítjük
    const target = document.getElementById(sectionId);
    if (target) {
        target.style.display = 'block';
    }

    // 3. Ha a kapcsolati hálóra váltottunk, frissítjük
    if (sectionId === 'halozat') {
        mermaid.contentLoaded(); 
        
        // Késleltetés, hogy a Mermaid biztosan kirajzolja a node-okat
        setTimeout(() => {
            document.querySelectorAll('.mermaid .node').forEach(node => {
                // Eltávolítjuk a régi figyelőket, hogy ne duplázódjanak
                node.onclick = null; 
                // Újrakötjük a kattintást
                node.addEventListener('click', function() {
                    openTheoremWindow(this.id);
                });
            });
        }, 200); // 200ms biztosabb
    }
}

