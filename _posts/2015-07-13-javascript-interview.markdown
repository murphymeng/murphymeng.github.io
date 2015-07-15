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

3. stopPropagation和preventDefault的区别
前者停止事件冒泡，后者阻止浏览器默认动作，比如链接跳转。


4. localStorage, sessionStorage, cookie的区别
localStorage是本地持久化
sessionStorage是关联回话，浏览器关闭就没了
cookie是永远会在http请求中存在


5. 如何用原生JS给新添加的DOM绑定事件处理？
{% highlight javascript %}
document.querySelector('body').addEventListener('click', function(event) {
  if (event.target.tagName.toLowerCase() === 'li') {
    // do your action on your 'li' or whatever it is you're listening for
  }
});
{% endhighlight %}





