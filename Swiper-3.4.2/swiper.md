# "模拟滚动条" 封装说明文档

## 使用说明
* 引入css
```html
<link rel="stylesheet" href="../dist/css/swiper.min.css">
```

* 引入js
```html
<script src="../dist/js/swiper.min.js"></script>
```

* 添加布局css -- 如:
```html
<style>
html, body {
    position: relative;
    height: 100%;
}
body {
    background: #eee;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color:#000;
    margin: 0;
    padding: 0;
}
.swiper-container {
    width: 100%;
    height: 100%;
}
.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
}
</style>
```

## 方法

调用方法

```bash
var swiper = new Swiper('.swiper-container', {//详见各个demo代码
    pagination: '.swiper-pagination',
    paginationClickable: true,
    direction: 'vertical'
});
```
[官网配置选项](http://www.swiper.com.cn/api/index.html)
