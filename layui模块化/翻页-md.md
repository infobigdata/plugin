# “翻页”插件说明文档

## 使用说明
* 引入css
```html
<!-- 自定义弹窗样式表-->
    <link rel="stylesheet" type="text/css" href="./css/my-layui.css"  media="all">
<!-- layui插件样式表-->
    <link rel="stylesheet" type="text/css" href="./layui/css/layui.css"  media="all">
```

* 引入js
```html
<script src="./layui/layui.js" charset="utf-8"></script>
<script src="./js/jquery-1.11.0.min.js" charset="utf-8"></script>
<script src="./js/my-laypage.js" charset="utf-8"></script>
```

## 5种类型的翻页


1. 默认的翻页样式(全)
```html
/*html my-laypage 样式调整*/
<div id="page" class="my-laypage"></div>
```
```bash
/*js 代码 默认元素id='page'*/
myLayPage.show();
```

2. 自定义页码翻页样式
```html
/*html*/
<div id="page1"></div>
```
```bash
/*js 代码 默认可以不传回调*/
//自定义回调函数
var cb=function(obj,first){
    alert("我是回调函数");
    //alert(obj.curr);
}
myLayPage.show({
                cont: 'page1'//标签ID
                ,pages: 100 //总页数
                ,groups: 5 //连续显示分页数
                ,curr:1 //当前页码
                ,skin:'#ddd'//自定义当前页面背景颜色
            },cb);
```

3.  根据标签的属性值传递数据
```html
<!--html   pages:总页数，groups:显示的页数，curr:当前页码-->
<div id="page3"  pages="20" groups="6" curr="3"></div>
```
```bash
/*js 代码 */
myLayPage.showByAttr('page2');
```

4.  <>（上一页下一页）
```html
<!--html   pages:总页数，groups:显示的页数，curr:当前页码-->
<div id="page3"  pages="20" groups="6" curr="3"></div>
```
```bash
/*js 代码 */
myLayPage.showByPreAndNext('page3');
```

5. 自定义hash值，完成链接的拼接
```html
<!--html   pages:总页数，groups:显示的页数，curr:当前页码-->
<div id="page4"  pages="20" groups="6" curr="3"></div>
```
```bash
/*js 代码 */
myLayPage.showLocationHash('page4');
```



***
## 技术支持
* author： `wpx`
* QQ：`155389816`
* Email：`wangpengxia@infobigdata.com`
* deom：`翻页-demo.html`

