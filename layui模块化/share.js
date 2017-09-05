window._bd_share_config = {
	//此处添加分享具体设置
	common: {
		bdText: '分享的内容', //qq
		bdDesc: '分享的摘要', //sina
		bdUrl: 'www.baidu.com', //分享的Url地址
		bdPic: 'http://127.0.0.1:8020/MyAPI/img/img_the_scream.jpg', //分享的图片
		onBeforeClick: function(cmd, config) { /*在用户点击分享按钮时执行代码，更改配置。cmd为分享目标id， config为当前设置， 返回值为更新后的设置。*/
			var share_textarea = document.getElementById('share_textarea');
			var _bdText, _bdDesc;
			if((share_textarea.value != '') && (share_textarea.value != undefined)) {
				_bdText = _bdDesc = share_textarea.value;
			};
			if('条件') {
				return {
					bdText: _bdText ? _bdText : document.getElementById('share-describe').innerHTML,
					bdDesc: _bdDesc ? _bdDesc : document.getElementById('share-describe').innerHTML,
					bdUrl: 'http://www.qq.com/',
					bdPic: 'http://mat1.gtimg.com/www/images/qq2012/qqlogo_1x.png',
				}
			}
		}
	},
	share: {
		bdCustomStyle: false
	}
};
//以下为js加载部分
with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)];

//解决链接复制只能复制当前页面链接问题
var myCopyShare = function(mcopy) {
	/*
	 * 
	 */
	(function() {
		var cmd = mcopy.id,
			config = window._bd_share_config.common,
			onBeforeClick = window._bd_share_config.common.onBeforeClick,
			_config, _bdUrl;
		if(onBeforeClick) {
			_config = onBeforeClick(cmd, config), _bdUrl = _config.bdUrl ? _config.bdUrl : config.bdUrl
		} else {
			_bdUrl = config.bdUrl ? config.bdUrl : window.location.href
		};
		var Url2 = document.createElement("textarea");
		Url2.value = _bdUrl, Url2.style.opacity = '0', Url2.style.position = 'absolute', Url2.style.left = '0', Url2.style.top = '0', Url2.style.zIndex = '-100', document.getElementsByTagName('body')[0].appendChild(Url2);
		Url2.select();
		document.execCommand("Copy");
		document.getElementsByTagName('body')[0].removeChild(Url2);
	})();
	/*
	 * 
	 */
	//alert("链接复制好啦，可以贴粘粘贴啦");
	layui.use('layer', function() {
		var layer = layui.layer;
		layer.msg('链接复制好啦，可以贴粘粘贴啦');
	});
};

shareLayer=function() {
	layui.use('layer', function() {
		var layer = layui.layer;
		layer.open({
			title: '分享',
			type: 1,
			shift: 2,
			area: '480px',
			shadeClose: true, //开启遮罩关闭
			content: '<div class="sharebox"> <textarea id="share_textarea" placeholder="给分享添加文字描述，让你的分享仪图文并茂，更具可读性吧！"></textarea> <div class="bdsharebuttonbox" data-tag="share_1"> <a class="bds_copy" id="my_copy" title="复制链接" onclick="myCopyShare(this)"></a> <a class="bds_weixin" data-cmd="weixin"></a> <a class="bds_sqq" data-cmd="sqq"></a> <a class="bds_tsina" data-cmd="tsina"></a> <a class="bds_qzone" data-cmd="qzone"></a> </div> <div class="seeshare"> <a>查看分享</a> </div> </div>',
		});
	});
	setTimeout(function() {
		window._bd_share_main.init();
	}, 300);
}