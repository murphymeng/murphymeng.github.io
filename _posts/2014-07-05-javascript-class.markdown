---
layout: post
title:  "Javascript class实现"
date:   2014-07-05
categories: javascript
---

Javascript在ES6之前都不支持类似java和其他一些面向对象语言中直接用class关键字来声明类的方式。js中通常遇到最多的是通过new关键字加构造器函数的方式来创建对象，因此可以将构造器的函数名看作类名。

###一、构造器函数###

{% highlight javascript %}
function Cat(name) {
    this.name = name;
    this.type = '猫科';
    this.say = function() {
        console.log("喵喵");
    }
}
var cat1 = new Cat('小花'),
    cat2 = new Cat('大花');
cat1.name;  //大花
cat1.type;  //猫科
cat2.type;  //猫科
cat1.type === cat2.type // false
cat1.say(); //喵喵
{% endhighlight %}

这里的Cat就是cat1的构造函数，构造函数和一般的函数没有区别，首字母大写算是一种约定，表明它应该用当作构造函数来使用。你一定会好奇new加上函数到底做了什么，查看MDN可以看到。

>当 new Cat(...) 被执行时，JS会执行以下几件事:

>1. 一个新的对象被创建，继承自Cat.prototype.
>2. 构造器函数通过参数调用并且绑定到新创建的对象上，new Cat等同于new Cat()。
>3. 这个被创建的对象会自动作为这个表达式的返回值，前提是如果构造器函数没有显示的return一个对象。(通常构造函数不会显示返回一个值，除非有特别的原因)。

但是这样的类有一个问题，就是每一个通过Cat创建的对象都会有一个自己的type和say属性，占用了不同的内存，显然是一种浪费，因此对于共用的属性和方法我们可以把它们定义在Cat的prototype中。

{% highlight javascript %}
// 重新定义Cat构造函数
function Cat(name) {
    this.name = name;
}
Cat.prototype.type = '猫科';
Cat.prototype.say = function() {
    console.log("喵喵");
}
var cat1 = new Cat('小花'),
    cat2 = new Cat('大花');

cat1.type === cat2.type // true
cat1.say  === cat2.say  // true
{% endhighlight %}

根据原型链的规则，访问cat1和cat2的type属性时，判断到他们自身没有，则去他们的原型对象Cat.prototype中查找。这样就做到了共用type和say属性。

###二、对象的继承###
说完了对象再来看下js中是如何实现继承的。假设我现在想实现一个新的类，叫就白猫吧，我想让它继承Cat的所有属性和方法。

{% highlight javascript %}
this
{% endhighlight %}


<div style="height: 30px"></div>

<div id="disqus_thread"></div>
<script type="text/javascript">
    /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
    var disqus_shortname = 'murphy58'; // required: replace example with your forum shortname

    /* * * DON'T EDIT BELOW THIS LINE * * */
    (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
</script>
<noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
<a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>

