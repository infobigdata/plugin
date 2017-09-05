# "弹窗" 封装说明文档

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
<script src="./js/my-layer.js" charset="utf-8"></script>
```

## 9种类型的弹窗


1. 最简单的弹窗msg（提示框）
```bash
/*弹窗hello*/
myLayer.showMsg('hello');
```
```javascript
/*指定弹窗的宽高，自动关闭的时间*/
myLayer.showMsg('hello'
                    ,{
                        area: ['100px', '50px'] //宽高设置
                        ,time: 1000//1秒关闭（如果不配置，默认是3秒）
                    }
            );
```
```javascript
/*指定icon(1-6)*/
myLayer.showMsg('hello',{time:0,icon: 1});
```
```javascript
/*自定义皮肤*/
 myLayer.showMsg('hello',{time:0,skin:'my-layer-class'});/*my-layer-msg : my-layui.css中定义的class*/
```

2. 带有关闭按钮头部的信息框
```javascript
myLayer.showAlert('hello');
```
```javascript
//配置icon信息 icon 值范围【1-6】
myLayer.showAlert('hello',{icon:1});
```
```javascript
//自定义皮肤  isOutAnim :关闭层时会有一个过渡动画
myLayer.showAlert('hello',{icon:6,skin:'my-layer-class',isOutAnim:true});//my-layer-class:my-layui.css中定义的class
```
```javascript
//指定宽度，高度自适应
myLayer.showAlert('hello',{icon:6,area: '100px'});
```

3.  询问框(confirm)
```javascript
/*默认样式*/
myLayer.showConfirm('hello');
```
```javascript
//配置icon信息 icon 值范围【1-6】
myLayer.showConfirm('hello',{icon:1});
```
```javascript
//自定义皮肤  isOutAnim :关闭层时会有一个过渡动画
myLayer.showConfirm('hello',{skin:'my-layer-class'});
```
```javascript
//指定宽度，高度自适应
myLayer.showConfirm('hello',{icon:6,area: '100px'});
```
```javascript
//自定义回调函数
var fnName=function(index){
    alert('我是回调函数');
}
myLayer.showConfirm('hello',{icon:6,area: '100px'},fnName);//高度自适应
```

4.  加载层(loading)
```javascript
/*默认样式*/
myLayer.showLoad();
```
```javascript
//风格1
myLayer.showLoad(1);
//风格2
myLayer.showLoad(2);
```
```javascript
//自定义风格
myLayer.showLoad(0,{skin:'my-layer-loading',time:1000});//time指定自动关闭时间
```

    ```javascript
    //模拟异步请求后关闭loading
    var fnAjax=function(index){
        setTimeout(function(){
            layer.close(index);
        },3000);
    }
    myLayer.showLoad(0,'',fnAjax);

    ```

5. 吸附层(tips)
```javascript
/*默认从指定的ID=layer8的右边出来*/
myLayer.showTips('这是个tips','#layer8');
```
```javascript
//支持上右下左四个方向，通过1-4进行方向设定
myLayer.showTips('从上面出来','#layer8-2',{time:0,tips:1});
myLayer.showTips('从左边出来','#layer8-3',{time:0,tips:4});
myLayer.showTips('从下边出来','#layer8-4',{time:0,tips:3});
myLayer.showTips('自定义颜色','#layer8-5',{time:0,tips:[2,'#B1D2EC']});
```

6. 捕获层（从页面中捕获内容放入弹窗）
```javascript
myLayer.showDom($('.my-layer-content'),'我是捕获层');
```

7. ifream（获取整个页面文件的内容放入弹窗）
```javascript
myLayer.showIfream('ifream-layer.html','我是ifream');
myLayer.showIfreamWin('ifream-layer.html','我是ifream窗口');
```

8. tab 层
```javascript
 var tabs=[{
                title: 'TAB1',
                content: $('.my-layer-content').html() //获取当前页面上的内容
            }, {
                title: 'TAB2',
                content: '内容2'
            }, {
                title: 'TAB3',
                content: '内容3'
            }];
            myLayer.showTabs(tabs);
```

9. 相册 弹层
```javascript
 var data={
                "title": "", //相册标题
                "id": 123, //相册id
                "start": 0, //初始显示的图片序号，默认0
                "data": [   //相册包含的图片，数组格式
                    {
                        "alt": "高圆圆",
                        "pid": 666, //图片id
                        "src": "image/1.jpg", //原图地址
                        "thumb": "image/1.jpg" //缩略图地址
                    }
                    ,{
                        "alt": "李诗诗",
                        "pid": 666, //图片id
                        "src": "image/2.jpg", //原图地址
                        "thumb": "image/2.jpg" //缩略图地址
                    }
                    ,{
                        "alt": "高圆圆",
                        "pid": 666, //图片id
                        "src": "image/3.jpg", //原图地址
                        "thumb": "image/3.jpg" //缩略图地址
                    }
                ]
            }
            myLayer.showPhotos(data);
```

***
## 技术支持
* author： `wpx`
* QQ：`155389816`
* Email：`wangpengxia@infobigdata.com`
* deom：`弹窗-demo.html`

