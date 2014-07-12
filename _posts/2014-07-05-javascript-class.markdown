---
layout: post
title:  "Javascript class实现"
date:   2014-07-05
categories: javaScript
---

Javascript在ES6之前都不支持类似java和其他一些面向对象语言中直接用class关键字来声明类的方式。js中通常遇到最多的是通过new关键字加构造器函数的方式来创建对象，因此可以将构造器的函数名看作类名。

###一、构造器函数###

{% highlight javascript %}
function Person(name) {
    this.name = name;
    this.livePlace = '陆地';
    this.say = function() {
        console.log("我叫" + this.name);
    }
}
var p1 = new Person('张三'),
    p2 = new Person('李四');
p1.name;  //张三
p2.name;  //李四
p1.livePlace === p2.livePlace // false
p1.name;  //张三
p1.say(); //我叫张三

p1.__proto__ // Person.prototype
p1.constructor // Person函数
{% endhighlight %}

这里的Person就是p1的构造函数，构造函数和一般的函数没有区别，首字母大写算是一种约定，表明它应该用当作构造函数来使用。你一定会好奇new加上函数到底做了什么，查看MDN可以看到。

>当 new Person(...) 被执行时，JS会执行以下几件事:

>1. 一个新的对象被创建，继承自Person.prototype.
>2. 构造器函数通过参数调用并且绑定到新创建的对象上。
>3. 这个被创建的对象会自动作为这个表达式的返回值，前提是如果构造器函数没有显示的return一个对象。(通常构造函数不会显示返回一个值，除非有特别的原因)。

另外Function构造器产生的函数对象会运行类似这样的一些代码：
this.prototype = {constructor:this};
新的对象会被赋予一个prototype属性(chrome中可以用p1.__proto__访问)，它的值是一个包含constuctor属性且属性值为该函数的对象。这个prototype对象是用来存放继承特征的地方。constructor属性其实没什么用(下面会提到)，重要的是prototype对象。

但是这样的类有一个问题，就是每一个通过Person创建的对象都会有一个自己的livePlace和say属性，占用了不同的内存，显然是一种浪费，因此对于共用的属性和方法我们可以把它们定义在Person的prototype中。

{% highlight javascript %}
// 重新定义Cat构造函数
function Person(name) {
    this.name = name;
}
Person.prototype.livePlace = '陆地';
Person.prototype.say = function() {
    console.log("我叫" + this.name);
}
var p1 = new Person('小花'),
    p2 = new Person('大花');

p1.livePlace === p2.livePlace // true
p1.say  === p2.say  // true
{% endhighlight %}

根据原型链的规则，访问p1和p2的livePlace属性时，判断到他们自身没有，则去他们的原型对象Person.prototype中查找。这样就做到了共用livePlace和say属性。

###二、对象的继承###
说完了对象再来看下js中是如何实现继承的。假设我现在想实现一个新的学生类，我想让它继承Person的所有属性和方法。

{% highlight javascript %}
function Student() {
    this.action = '学习';
}
Student.prototype.say = function() {
    console.log("我是个学生，我叫" + this.name);
}

Student.prototype = Person.prototype;
var s1 = new Student("小明");
s1.say() // 我是个学生，我叫小明
s1.constructor // function Person(name) {this.name = name;}， 注意这里其实访问的是student.__proto__.constructor
{% endhighlight %}

这里让Student的protetype等于Person的prototype属性,就能让“Student类”继承Person的属性和方法。但这样一来s1的构造函数也成了Person，因此我们还需要把Student的构造器指向自己。

{% highlight javascript %}
Student.prototype = Person.prototype;
Student.prototype.constructor = Student;
{% endhighlight %}

等等!这样一来Person.prototype.constructor是不是也被改变了？的确，显然这样继承方式还需要改进，
因此可以写成这样：

{% highlight javascript %}
//额外创建一个Person对象来作为Student的原型，这样修改Student.prototype.constructor也不会影响到Person的constrcutor了。
Student.prototype = new Person(); 
Student.prototype.constructor = Student;
{% endhighlight %}

其实上面的两行代码就是js中最常见的实现继承的做法，另外还有一些方法比如把父类的所有属性和方法一起拷贝给子类，有兴趣的读者可以去研究下。
另外也学你会好奇为什么要确保Student.constructor是正确的？原因是如果不那么做，当我们用Student创建出s1后，有可能需要使用 s1 instanceof Student 来判断s1的类型，我们需要确保这是正确的，尽管constructor属性在创建对象的过程中无关紧要。




<div style="height: 30px"></div>

<!-- 多说评论框 start -->
<div class="ds-thread" data-thread-key="2014-07-05-javascript-class" data-title="JavaScript class实现" data-url="http://murphy58.com/javascript/2014/07/05/javascript-class.html"></div>
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

