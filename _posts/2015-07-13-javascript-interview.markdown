---
layout: post
title:  "Javascript 面试题"
date:   2015-07-13
categories: javaScript
---


1. window.onload和jquery中doument ready的区别：
window.onload是dom和css,js,images加载完后才执行。
ready则用的是HTML5中的DOMContentLoaded事件，不是所有浏览器都支持的。

2. 单例模式和闭包
{% highlight javascript %}
var Singleton = (function () {
    var instance;
    return {
        getInstance: function () {
            if (!instance) {
                instance = {};
            }
            return instance;
        }
    };
})();
 
function run() {
    var instance1 = Singleton.getInstance();
    var instance2 = Singleton.getInstance();
    alert("Same instance? " + (instance1 === instance2));  
}
{% endhighlight %}





