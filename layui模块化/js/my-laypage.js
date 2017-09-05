/*
 *@action laypage 二次封装函数
 *@author wpx
 *@time   2017/3/29
 */
//声明一个命名空间
var myLayPage = window.myLayPage || {};

/* 配置参数
 laypage({
 cont: "page1"
 ,pages: 100 //总页数
 ,curr:2//当前页码
 ,skin:"#ddd"//当前页的颜色
 ,groups: 5 //连续显示分页数
 ,first:'首页' //控制首页是否显示 false不显示
 ,last:"尾页"  //控制尾页是否显示 false不显示
 ,prev:"上一页"//控制上一页是否显示 false不显示
 ,next:"下一页"//控制下一页是否显示 false不显示
 ,skip:true   //是否显示跳转
 ,hash:"page"
 ,jump: function(obj, first){
 //得到了当前页，用于向服务端请求对应数据
 //console.log(obj);
 //console.log(first);
 //var curr = obj.curr;
 }
 */
myLayPage= new function() {
    /*
     *@action 根据外部传递的参数初始化翻页
     *@param  json  _setting  不传则按默认值
     *@param  function _jump 自定义回调处理函数
     */
    this.show = function(_setting,_jump) {
        layui.use('laypage', function(){
            var laypage = layui.laypage;
            if(_setting) {//外部传递了数据
                laypage({
                    cont:     (_setting.cont)
                    , pages:  (_setting.pages) //总页数
                    , groups: (_setting.groups) //连续显示分页数
                    , skin:   (_setting.skin)  //当前页的颜色
                    , jump: function(obj, first){
                       if(_jump){
                           _jump(obj,first);
                       }
                    }
                });
            }else{//外部没有传递数据
                laypage({
                    cont: "page"
                    ,pages: 100     //总页数
                    ,curr:1         //当前页码
                    ,skin:"#ddd"    //当前页的颜色
                    ,groups: 5      //连续显示分页数
                    ,first:'首页'   //控制首页是否显示 false不显示
                    ,last:"尾页"    //控制尾页是否显示 false不显示
                    ,prev:"上一页"  //控制上一页是否显示 false不显示
                    ,next:"下一页"  //控制下一页是否显示 false不显示
                    ,skip:true     //是否显示跳转
                    ,hash:"page"
                    , jump: function(obj, first){//得到了当前页，用于向服务端请求对应数据
                        //console.log(obj);
                       // alert(obj.curr);
                    }
                });
            }
        });
    };

    /*
    *@action 根据指定标签的属性值初始化翻页
    *@param  string  _id  标签的ID
     */
    this.showByAttr = function(_id,_jump) {
        var $id=$("#"+_id)
        var id_pages=$id.attr('pages');
        var id_groups=$id.attr('groups');
        var id_curr=$id.attr('curr');
        layui.use('laypage', function(){
            var laypage = layui.laypage;
            laypage({
                cont: _id
                , pages: id_pages   //总页数
                , groups: id_groups //连续显示分页数
                , curr:id_curr      //当前页码
                , jump: function(obj, first){//得到了当前页，用于向服务端请求对应数据
                    //console.log(obj);
                   // alert(obj.curr);
                    if(_jump){
                        _jump(obj,first);
                    }
                }
            });

        });
    };
    /*
     *@action <>全代替上一页下一页(简单样式)
     *@param  string  _id  标签的ID
     */
    this.showByPreAndNext = function(_id) {
        var $id=$("#"+_id)
        var id_pages=$id.attr('pages');
        var id_groups=$id.attr('groups');
        var id_curr=$id.attr('curr');
        layui.use('laypage', function(){
            var laypage = layui.laypage;
            laypage({
                cont: _id
                , pages: id_pages   //总页数
                , groups: id_groups //连续显示分页数
                , curr:id_curr      //当前页码
                , first: 1
                , last: id_pages
                , prev: '<em><</em>'
                , next: '<em>></em>'
                , jump: function(obj, first){//得到了当前页，用于向服务端请求对应数据
                    //console.log(obj);
                    //alert(obj.curr);
                }
            });

        });
    };

    /*
     *@action 自定义hash值
     *@param  string  _id  标签的ID
     */
    this.showLocationHash = function(_id) {
        var $id=$("#"+_id)
        var id_pages=$id.attr('pages');
        var id_groups=$id.attr('groups');
        var id_curr=$id.attr('curr');
        layui.use('laypage', function(){
            var laypage = layui.laypage;
            laypage({
                cont: _id
                , pages: id_pages   //总页数
                , groups: id_groups //连续显示分页数
                , curr: location.hash.replace('#!', '') //获取hash值为fenye的当前页
                , hash: 'page' //自定义hash值
                , jump: function(obj, first){//得到了当前页，用于向服务端请求对应数据
                    //console.log(obj);
                    //alert(obj.curr);
                }
            });

        });
    };

};










