/* 
 * ValidDrag 1.0
 * create by ttflowerboys@gmail.com
 * date 2017-06-26
 * 拖动滑块验证
 */
(function($){
    $.fn.ValidDrag = function(options){
        var x, ValidDrag = this, isMove = false, defaults = {
        };
        var options = $.extend(defaults, options);
        //添加背景，文字，滑块
        var html = '<div class="drag_bg"></div>'+
                    '<div class="drag_text slidetounlock" onselectstart="return false;" unselectable="on">请按住滑块，拖动到最右边</div>'+
                    '<div class="handler handler_bg"></div>';
        this.append(html);
        
        var handler = ValidDrag.find('.handler');
        var drag_bg = ValidDrag.find('.drag_bg');
        var text = ValidDrag.find('.drag_text');
        var maxWidth = ValidDrag.width() - handler.width();  //能滑动的最大间距
        
        //鼠标按下时候的x轴的位置
        handler.mousedown(function(e){
            isMove = true;
            x = e.pageX - parseInt(handler.css('left'), 10);
        });
        
        //鼠标指针在上下文移动时，移动距离大于0小于最大间距，滑块x轴位置等于鼠标移动距离
        $(document).mousemove(function(e){
            var _x = e.pageX - x;
            if(isMove){
                if(_x > 0 && _x <= maxWidth){
                    handler.css({'left': _x});
                    drag_bg.css({'width': _x});
                }else if(_x > maxWidth){  //鼠标指针移动距离达到最大时清空事件
                    dragOk();
                }
            }
        }).mouseup(function(e){
            isMove = false;
            var _x = e.pageX - x;
            if(_x < maxWidth){ //鼠标松开时，如果没有达到最大距离位置，滑块就返回初始位置
                handler.css({'left': 0});
                drag_bg.css({'width': 0});
            }
        });
        
        // 禁用提交按钮
        options.submit.attr({'disabled':'disabled'});

        //清空事件
        function dragOk(){
            handler.removeClass('handler_bg').addClass('handler_ok_bg');
            text.removeClass('slidetounlock')
            text.text('验证通过');
            ValidDrag.css({'color': '#fff'});
            handler.off('mousedown');
            $(document).off('mousemove');
            $(document).off('mouseup');
            options.submit.removeAttr('disabled');// 提交按钮可用
        }
    };
})(jQuery);


