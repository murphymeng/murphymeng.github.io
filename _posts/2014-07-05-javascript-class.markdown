---
layout: post
title:  "Javascript class实现"
date:   2014-07-05
categories: javascript
---

Javascript在ES6之前都不支持类似java和其他一些面向对象语言中直接用class关键字来声明类的方式。js中通常遇到最多的是通过new关键字加构造器函数的方式来创建对象，因此可以将构造器的函数名看作类名。

{% highlight javascript %}
function Cat() {
    this.type = '猫科';
    this.say = function() {
        console.log("喵喵");
    }
}
var cat1 = new Cat();
cat1.type;  //猫科
cat1.say(); //喵喵
{% endhighlight %}

这里的Cat就是cat1的构造函数，构造函数和一般的函数没有区别，首字母大写算是一种约定，表明它应该用当作构造函数来使用。你一定会好奇new加上函数到底做了什么，查看MDN可以看到。

>When the code new foo(...) is executed, the following things happen:

A new object is created, inheriting from foo.prototype.
The constructor function foo is called with the specified arguments and this bound to the newly created object. new foo is equivalent to new foo(), i.e. if no argument list is specified, foo is called without arguments.
The object returned by the constructor function becomes the result of the whole new expression. If the constructor function doesn't explicitly return an object, the object created in step 1 is used instead. (Normally constructors don't return a value, but they can choose to do so if they want to override the normal object creation process.)




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

