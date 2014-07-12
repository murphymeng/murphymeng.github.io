---
layout: post
title:  "JavaScript prototype详解"
date:   2014-06-27 18:13:23
categories: javascript
---


众所周知，javascript是一门基于原型的语言。所有js的对象都具有prototype属性，一个对象的prototype可以通过内部的[[prototype]]属性来获得，在chrome, firefox上可以通过\_\_proto__属性来获取这个引用。首先我们看一下js对象字面量的原型，

{% highlight javascript %}
var obj = {a:1};
obj.__proto__ // Object {}
obj.__proto__ === Object.prototype // true
{% endhighlight %}

这里的obj是一个普通的通过对象字面量创建的对象，它的原型属性可以看到就是Object的prototype。注意这里的prototype和\_\_proto__不是一个概念, 那为什么Object会有这个属性呢？

在ECMA-262中中写道：
>A prototype property is automatically created for every function, to provide for the possibility that the function will be used as a constructor.

因为Object实际就是对象的构造函数，所以自然也会有prototype属性。那这个prototype属性的值是啥？

{% highlight javascript %}
Object.prototype // Object{}
{% endhighlight %}
查看MDN关于它的描述是：
>The Object.prototype property represents the Object prototype object.
Object的原型属性就是Object的原型对象(感觉说了等于没说)。

再来看下Function的prototype:
{% highlight javascript %}
Function.prototype // function Empty() {}
{% endhighlight %}
Function的prototype是一个函数对象，由于我是在chrome的下输出的，Empty只是V8环境中特有命名，ECMA-262并没有明确规范函数对象的原型命名，如果你运行这个函数得到的返回值会是undefined。

同样地，一些其他的js内置构造函数的prototype也都是自身的对象，譬如Array.prototype是Array对象，Number.prototype是Number对象。

当我们使用new关键字加函数型的形式创建一个对象的时候，被创建出的对象的原型就是这个函数的prototype属性。

{% highlight javascript %}

var arr = new Array();
arr.__proto__ === Array.prototype // true

var f = new Function() {}; // 相当于function f() {};
f.__proto__ === Function.prototype // true

function Person() {};
var p1 = new Person(),
    p2 = new Person();
p1.__proto__ === Person.prototype // true
p1.__proto__ === p2.__proto__ // true
{% endhighlight %}

通过Person函数创建出的对象可以继承和公用Person.prototype的属性和方法, js实现类和继承也是基于这个，关于这个话题这里就不展开了。



<div style="height: 30px"></div>

<!-- 多说评论框 start -->
    <div class="ds-thread" data-thread-key="javascript-prototype" data-title="JavaScript prototype详解" data-url="http://murphy58.com/javascript/2014/06/27/javascript-prototype.html"></div>
<!-- 多说评论框 end -->
<!-- 多说公共JS代码 start (一个网页只需插入一次) -->
<script type="text/javascript">
var duoshuoQuery = {short_name:"murphy58"};
    (function() {
        var ds = document.createElement('script');
        ds.type = 'text/javascript';ds.async = true;
        ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
        ds.charset = 'UTF-8';
        (document.getElementsByTagName('head')[0] 
         || document.getElementsByTagName('body')[0]).appendChild(ds);
    })();
    </script>
<!-- 多说公共JS代码 end -->
