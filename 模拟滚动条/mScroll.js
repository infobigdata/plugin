//自定义滚动条
$(function() {
	$.mCustomScrollbar.defaults.scrollButtons.enable = true;
	$.mCustomScrollbar.defaults.theme = "inset-2-dark";
	$.fn.extend({
		"scrollHtml": function(scrollhtml) {
			$(this).find('.mCSB_container').html(scrollhtml);
			return this;
		},
		"scrollAppend": function(scrollhtml) {
			$(this).find('.mCSB_container').append(scrollhtml);
			return this;
		}
	});
	$(".MScroll").mCustomScrollbar();
	$(".MScrollyx").mCustomScrollbar({ axis: "yx" });
	$(".MScrollFixed").mCustomScrollbar({
		axis: "yx",
		callbacks: {
			whileScrolling: function() {
				$(this).find('.fixedTop').css('top', -this.mcs.top);
				$(this).find('.fixedLeft').css('top', -this.mcs.left);
			}
		}
	});
})