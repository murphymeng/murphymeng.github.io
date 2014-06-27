---
layout: post
title:  "Javascript prototype详解"
date:   2014-06-27 18:13:23
categories: test
---




众所周知，javascript是一门基于原型的语言。所有js的对象都具有prototype属性，一个对象的prototype可以通过内部的[[prototype]]属性来获得，在chrome, firefox上可以通过__proto__属性来获取这个引用。

{% highlight javascript %}
var obj = {a:1};
obj.__proto__ // Object {}
obj.__proto__ === Object.prototype) // true
Object.prototype.__proto__ 
{% endhighlight %}

这里的obj是一个普通的通过对象字面量创建的对象，它的原型属性可以看到就是Object这个对象构造函数的prototype属性。注意这里的prototype属性并不是获取自己原型的一个属性, 那为什么Object会有这个属性呢？事实上，所有的函数都会具有一个prototype属性，当这个函数作为一个构造函数通过new关键词创建时使用。

{% highlight javascript %}
function Person() {};
var jack = new Person();
jack.__proto__ === Person.prototype // true
{% endhighlight %}

这样一来所有通过Person创建出的对象可以继承和公用Person.prototype的属性和方法, js实现“类”继承也是基于这个。

{% highlight javascript %}
Person.prototype.say  = function() {console.log('我是人')};
var mike = new Person();
mike.say === jack.say // true
{% endhighlight %}

我们再来看下下面的结果
{% highlight javascript %}
Function.prototype //
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

