// JavaScript Document
document.createElement("header"); //iyt
document.createElement("footer"); //ijj
document.createElement("nav"); //idh
document.createElement("section"); //ik
document.createElement("wrap"); //ibg
document.createElement("content"); //inr
$(function() {
	//节点加载完事件
	$.fn.myinit = function(Fn) {
		Fn.apply(this);
		return this;
	};
	//判断IE,判断火狐
	ie = !-[1, ]; //IE8-
	FF = !!navigator.userAgent.match(/firefox/i);
	PC = !navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
	Mobile = !!navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
	//var ev=ev||event;ev.preventDefault();window.event.returnValue=false; return false;
	//input的val改变事件$('.text').input(function() {this})可以on绑定;
	$.fn.input = function(Fn) {
		if(ie) {
			$(this).on('propertychange', function() {
				Fn.apply(this);
			})
		} else {
			$(this).on('input', function() {
				Fn.apply(this);
			})
		}
	};
	//滚轮滚动事件$(document).mousewheel(function() {this.Down})可以on绑定;
	$.fn.mousewheel = function(Fn) {
		if(FF) {
			$(this).on('DOMMouseScroll', function(ev) {
				var oEvent = ev || event;
				this.Down = (oEvent.originalEvent.detail > 0);
				Fn.apply(this);
			})
		} else {
			$(this).on('mousewheel', function(ev) {
				var oEvent = ev || event;
				this.Down = (oEvent.originalEvent.wheelDelta < 0);
				Fn.apply(this);
			})
		}
	};
	//拖拽事件$('.move').move(function() { $(this).css({ 'left': '+=' + this.pageXc, 'top': '+=' + this.pageYc }); });
	$.fn.move = function(Fn) {
		$(this).on('mousedown', function(ev) {
			this.pageXc = this.pageYc = 0;
			var _this = this,
				pvrPageX = ev.pageX,
				pvrPageY = ev.pageY;
			$(document).on('mousemove.thisMove', function(ev) {
				ev.preventDefault();
				_this.pageXc = ev.pageX - pvrPageX;
				_this.pageYc = ev.pageY - pvrPageY;
				Fn.apply(_this);
				pvrPageX = ev.pageX;
				pvrPageY = ev.pageY;
			});
			$(document).on('mouseup.thisMove', function(ev) {
				$(this).off('mousemove.thisMove mouseup.thisMove');
			});
			//$(this).on('dragend', function(ev) {
			//	setTimeout(function() {
			//		$(document).mouseup();
			//	}, 10);
			//});
		});
	};
	//模拟input滑块事件$('#range .mea').move(rangeFn);
	rangeFn = function() {
		var _thisParent = $(this).parent();
		var _thisParentLeftMin = 0;
		var _thisParentLeftMax = _thisParent.width();
		var _thisStep = (_thisParentLeftMax - _thisParentLeftMin) * _thisParent.attr('step') / (_thisParent.attr('max') - _thisParent.attr('min'));
		var _thisLeft = parseFloat($(this).css('left')) + this.pageXc;
		if(_thisLeft >= _thisParentLeftMin && _thisLeft <= _thisParentLeftMax) {
			$(this).css({
				'left': _thisLeft,
			});

			$(this).attr('value', Math.round(_thisLeft / _thisStep) * _thisParent.attr('step'));
		};
	};
	//鼠标框选事件$('.drag-area').dragaarea(function(ev) {this.areachecked/*框选中的元素class:in-area;*/});
	//默认可框选元素class='in-area';
	$.fn.dragaarea = function(Fn) {
		$(this).mousedown(function(ev) {
			var downthis = this,
				oArea = $(this),
				aDom = oArea.find('.in-area'),
				aDragArea = [],
				aDragAreachecked = [],
				mDown = {
					'pageX': ev.pageX,
					'pageY': ev.pageY
				},
				mMove = {};
			aDom.removeClass('area-checked');
			aDom.each(function(i) {
				var _this = $(this),
					thisOffLeft = _this.offset().left,
					thisOffTop = _this.offset().top,
					oDragArea = {
						'index': i,
						'checked': false,
						'offsetLeft': thisOffLeft,
						'offsetTop': $(this).offset().top,
						'offsetRight': thisOffLeft + this.offsetWidth,
						'offsetBottom': thisOffTop + this.offsetHeight
					};
				aDragArea.push(oDragArea);
			});

			$(document).on('mousemove.thisDragArea', function(ev) {
				ev.preventDefault();
				mMove = {
					'pageX': ev.pageX,
					'pageY': ev.pageY
				};
				aDragAreachecked = [];
				$.each(aDragArea, function(i, n) {
					if((n['offsetLeft'] >= mDown['pageX']) && (n['offsetTop'] >= mDown['pageY']) && (n['offsetRight'] <= mMove['pageX']) && (n['offsetBottom'] <= mMove['pageY'])) {
						if(!n['checked']) {
							n['checked'] = true;
						};
					} else {
						if(n['checked']) {
							n['checked'] = false;
						};
					};
					if(n['checked']) {
						aDragAreachecked.push(aDom.get(n['index']));
					};
				});
				downthis.areachecked = aDragAreachecked;
				Fn.apply(downthis);
			});
			$(document).on('mouseup.thisDragArea', function(ev) {
				$(this).off('mousemove.thisDragArea mouseup.thisDragArea');
			});
		});
	};
	//空格验证 $('.kgyz').on('focus',focusNull);
	focusNull = function() {
		$(this).next().css('display', 'none');
		$(this).blur(function() {
			var x = this.value;
			var patt = /\S/;
			var result = !patt.test(x);
			if(result) {
				this.value = '';
				$(this).next().css('display', '');
			};
		});
	};
	//初始状态,空格验证 textLoad('.kgyz');
	textLoad = function(obj) {
		$(obj).each(function() {
			var x = this.value;
			var patt = /\S/;
			var result = !patt.test(x);
			if(result) {
				this.value = '';
				$(this).next().css('display', '');
			} else {
				$(this).next().css('display', 'none');
			};
		});
	};
	//模拟滚动条调用

	if(PC && $('.mScroll').size() > 0) {
		(function() {
			$(".mScroll").not('.mScrollyx').mCustomScrollbar({
				scrollButtons: {
					enable: false,
					scrollType: "continuous",
					scrollSpeed: 20,
					scrollAmount: 40
				},
				horizontalScroll: false
			});
			$(".mScrollyx").mCustomScrollbar({
				axis: "yx",
				scrollButtons: {
					enable: false,
					scrollType: "continuous",
					scrollSpeed: 20,
					scrollAmount: 40
				},
				theme: "light-thick",
				callbacks: {
					whileScrolling: function() {
						if($(this).find('.fixedTop').size() > 0) {
							var containerLT = $(this).find('.mCSBContainer');
							var top = parseFloat(containerLT.css('top')) * -1;
							$(this).find('.fixedTop').css('top', top);
						}
						if($(this).find('.fixedLeft').size() > 0) {
							var containerLT = $(this).find('.mCSBContainer');
							var left = parseFloat(containerLT.css('left')) * -1;
							$(this).find('.fixedLeft').css('left', left);
						}
					}
				}
			});
		})();
	};
	//模拟下拉框
	(function() {
		$(document).on('click', '.mchecked', function() {
			$(this).toggleClass('mcheckedOn');
			$(this).siblings().slideToggle();
		});
		$(document).on('click', '.moption', function() {
			$(this).parents('.moptio-box').slideUp().siblings('p').html($(this).html()).removeClass('mcheckedOn');
			$(this).parents('.moptio-box').slideUp().siblings('input').val($(this).attr('value')).trigger("change");
		});
		$(document).on('mouseleave', '.mselect', function() {
			$(this).children('.moptio-box').slideUp().siblings().removeClass('mcheckedOn');
		});
	})();
	//分页PageFn('mpage1','hrefPage');
	PageFn = function(opage, hrefPage) {
		if(!document.getElementById('laypageJS')) {
			$('body').append("<script id='laypageJS' type='text/javascript' src='js/laypage.js'></script>");
		};
		var MPage = $(opage);
		var thisPages = MPage.attr('data-pages');
		//分页主体插件调用
		laypage({
			cont: MPage,
			pages: thisPages, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
			skip: true, //是否开启跳页
			last: thisPages, //用于控制尾页
			prev: false, //隐藏上一页按钮
			next: false, //隐藏下一页按钮
			groups: 5, //连续显示分页数
			curr: function() {
				//通过url获取当前页，也可以同上（pages）方式获取
				var str = "/" + hrefPage + "=(\\d+)/";
				var reg = eval(str);
				var page = location.search.match(reg);
				return page ? page[1] : 1;
			}(),
			jump: function(e, first) { //触发分页后的回调
				if(!first) { //一定要加此判断，否则初始时会无限刷新
					var search = location.search;
					var str = "/" + hrefPage + "=(\\d+)/";
					var reg = eval(str);
					var page = location.search.match(reg);
					if(page) {
						search = search.replace(reg, hrefPage + '=' + e.curr);
					} else if(!search) {
						search = search + '?' + hrefPage + '=' + e.curr;
					} else {
						search = search + '&' + hrefPage + '=' + e.curr;
					}
					location.href = search;
				}
			}
		});
		MPage.find('.laypageSkip').attr({
			'max': thisPages,
			'type': 'text'
		});
		//分页页码不存在时弹层
		MPage.find('.laypageSkip').on('keyup', function() {
			if(parseFloat(this.value) > parseFloat(this.max) || parseFloat(this.value) < parseFloat(this.min)) {
				alert('页码不存在!');
				this.value = this.min;
			}
		});
	};
	PageFnAjax = function(opage, ObjFn) {
		if(!document.getElementById('laypageJS')) {
			$('body').append("<script id='laypageJS' type='text/javascript' src='js/laypage.js'></script>");
		};
		var MPage = $(opage);
		var thisPages = MPage.attr('data-pages');
		//分页主体插件调用
		laypage({
			cont: MPage,
			pages: thisPages, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
			skip: true, //是否开启跳页
			last: thisPages, //用于控制尾页
			prev: false, //隐藏上一页按钮
			next: false, //隐藏下一页按钮
			groups: 5, //连续显示分页数
			curr: function() {
				return MPage.attr('data-curr') ? MPage.attr('data-curr') : 1;
			}(),
			jump: function(e, first) { //触发分页后的回调
				if(!first) { //一定要加此判断，否则初始时会无限刷新
					MPage.attr('data-curr', e.curr);
					ObjFn();
					MPage.find('.laypageSkip').attr({
						'max': thisPages,
						'type': 'text'
					});
				}
			}
		});
		MPage.find('.laypageSkip').attr({
			'max': thisPages,
			'type': 'text'
		});
		//分页页码不存在时弹层
		MPage.find('.laypageSkip').on('keyup', function() {
			if(parseFloat(this.value) > parseFloat(this.max) || parseFloat(this.value) < parseFloat(this.min)) {
				alert('页码不存在!');
				this.value = this.min;
			}
		});
	};
});
//模板引擎
! function() {
	"use strict";
	var f, b = { open: "{{", close: "}}" },
		c = { exp: function(a) { return new RegExp(a, "g") }, query: function(a, c, e) { var f = ["#([\\s\\S])+?", "([^{#}])*?"][a || 0]; return d((c || "") + b.open + f + b.close + (e || "")) }, escape: function(a) { return String(a || "").replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") }, error: function(a, b) { var c = "Laytpl Error："; return "object" == typeof console && console.error(c + a + "\n" + (b || "")), c + a } },
		d = c.exp,
		e = function(a) { this.tpl = a };
	e.pt = e.prototype, e.pt.parse = function(a, e) {
		var f = this,
			g = a,
			h = d("^" + b.open + "#", ""),
			i = d(b.close + "$", "");
		a = a.replace(/[\r\t\n]/g, " ").replace(d(b.open + "#"), b.open + "# ").replace(d(b.close + "}"), "} " + b.close).replace(/\\/g, "\\\\").replace(/(?="|')/g, "\\").replace(c.query(), function(a) { return a = a.replace(h, "").replace(i, ""), '";' + a.replace(/\\/g, "") + '; view+="' }).replace(c.query(1), function(a) { var c = '"+('; return a.replace(/\s/g, "") === b.open + b.close ? "" : (a = a.replace(d(b.open + "|" + b.close), ""), /^=/.test(a) && (a = a.replace(/^=/, ""), c = '"+_escape_('), c + a.replace(/\\/g, "") + ')+"') }), a = '"use strict";var view = "' + a + '";return view;';
		try { return f.cache = a = new Function("d, _escape_", a), a(e, c.escape) } catch(j) { return delete f.cache, c.error(j, g) }
	}, e.pt.render = function(a, b) { var e, d = this; return a ? (e = d.cache ? d.cache(a, c.escape) : d.parse(d.tpl, a), b ? (b(e), void 0) : e) : c.error("no data") }, f = function(a) { return "string" != typeof a ? c.error("Template not found") : new e(a) }, f.config = function(a) { a = a || {}; for(var c in a) b[c] = a[c] }, f.v = "1.1", "function" == typeof define ? define(function() { return f }) : "undefined" != typeof exports ? module.exports = f : window.laytpl = f
}();
render = function(template, data, view) {
	laytpl(template).render(data, function(html) {
		view.innerHTML = html;
	});
};