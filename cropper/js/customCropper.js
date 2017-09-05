/*;(function() {*/

	'use strict';

	var console = window.console || {
		log: function() {}
	};

	function CropAvatar($element,$options) {
		this.$container = $element;
		this.$options = $options;

		this.$avatarView = this.$container.find('.avatar-view');
		this.$avatar = this.$avatarView.find('img');
		this.$avatarModal = $("body").find('#avatar-modal');
		this.$loading = $("#page-wrapper").find('.loading');

		this.$avatarForm = this.$avatarModal.find('.avatar-form');
		this.$avatarUpload = this.$avatarForm.find('.avatar-upload');
		this.$avatarSrc = this.$avatarForm.find('.avatar-src');
		this.$avatarData = this.$avatarForm.find('.avatar-data');
		this.$avatarInput = this.$avatarForm.find('.avatar-input');
		this.$avatarSave = this.$avatarForm.find('.avatar-save');
		this.$avatarBtns = this.$avatarForm.find('.avatar-btns');

		this.$avatarWrapper = this.$avatarModal.find('.avatar-wrapper');
		this.$avatarPreview = this.$avatarModal.find('.avatar-preview');

		this.init();
	}

	CropAvatar.prototype = {
		constructor: CropAvatar,
		support: {
			fileList: !!$('<input type="file">').prop('files'),
			blobURLs: !!window.URL && URL.createObjectURL,
			formData: !!window.FormData
		},

		init: function() {
			this.support.datauri = this.support.fileList && this.support.blobURLs;

			if(!this.support.formData) {
				this.initIframe();
			}

			/*this.initTooltip();*/
			this.initModal();
			this.addListener();
		},

		addListener: function() {
			this.$avatarView.on('click', $.proxy(this.click, this));
			this.$avatarInput.on('change', $.proxy(this.change, this));
			this.$avatarForm.on('submit', $.proxy(this.submit, this));
			this.$avatarBtns.on('click', $.proxy(this.rotate, this));
		},

		/*initTooltip: function() {
			this.$avatarView.tooltip({
				placement: 'bottom'
			});
		},*/

		initModal: function() {
			this.$avatarModal.modal({
				show: false
			});
		},

		initPreview: function() {
			var url = this.$avatar.attr('src');

//			this.$avatarPreview.empty().html('<img src="' + url + '">');
		},

		initIframe: function() {
			var target = 'upload-iframe-' + (new Date()).getTime(),
				$iframe = $('<iframe>').attr({
					name: target,
					src: ''
				}),
				_this = this;

			// Ready ifrmae
			$iframe.one('load', function() {

				// respond response
				$iframe.on('load', function() {
					var data;

					try {
						data = $(this).contents().find('body').text();
					} catch(e) {
						console.log(e.message);
					}

					if(data) {
						try {
							data = $.parseJSON(data);
						} catch(e) {
							console.log(e.message);
						}

						_this.submitDone(data);
					} else {
						_this.submitFail('Image upload failed!');
					}

					_this.submitEnd();

				});
			});

			this.$iframe = $iframe;
			this.$avatarForm.attr('target', target).after($iframe.hide());
		},

		click: function() {
			this.$avatarModal.modal('show');
			this.initPreview();
		},

		change: function() {
			var files,
				file;

			if(this.support.datauri) {
				files = this.$avatarInput.prop('files');

				if(files.length > 0) {
					file = files[0];

					if(this.isImageFile(file)) {
						if(this.url) {
							URL.revokeObjectURL(this.url); // Revoke the old one
						}

						this.url = URL.createObjectURL(file);
						this.startCropper();
					}
				}
			} else {
				file = this.$avatarInput.val();

				if(this.isImageFile(file)) {
					this.syncUpload();
				}
			}
		},

		submit: function() {
			if(!this.$avatarSrc.val() && !this.$avatarInput.val()) {
				return false;
			}

			if(this.support.formData) {
				this.ajaxUpload();
				return false;
			}
		},

		rotate: function(e) {
			var data;

			if(this.active) {
				data = $(e.target).data();

				if(data.method) {
					this.$img.cropper(data.method, data.option);
				}
			}
		},

		isImageFile: function(file) {
			if(file.type) {
				return /^image\/\w+$/.test(file.type);
			} else {
				return /\.(jpg|jpeg|png|gif)$/.test(file);
			}
		},

		startCropper: function(options) {
			var _this = this;

			if(this.active) {
				this.$img.cropper('replace', this.url);
			} else {
				this.$img = $('<img src="' + this.url + '">');
				this.$avatarWrapper.empty().html(this.$img);
				this.$img.cropper({
					aspectRatio: this.$options.aspectRatio? this.$options.aspectRatio: 1,  // 1:1
					viewMode: 1,
					cropBoxResizable: false,
					preview: this.$avatarPreview.selector,
					strict: false,
			        crop: function (e) {
			            $('.dataHeight').val(Math.round(e.height));
						$('.dataWidth').val(Math.round(e.width));
			        }
				});

				this.active = true;
			}
		},

		stopCropper: function() {
			if(this.active) {
				this.$img.cropper('destroy');
				this.$img.remove();
				this.active = false;
			}
		},

//		ajaxUpload: function() {
//			var url = this.$avatarForm.attr('action'),
//				data = new FormData(this.$avatarForm[0]),
//				_this = this;
//
//			$.ajax(url, {
//				headers: {
//					'X-XSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//				},
//				type: 'post',
//				data: data,
//				dataType: 'json',
//				processData: false,
//				contentType: false,
//
//				beforeSend: function() {
//					_this.submitStart();
//				},
//
//				success: function(data) {
//					_this.submitDone(data);
//				},
//
//				error: function(XMLHttpRequest, textStatus, errorThrown) {
//					if (this.uploaded) {
//					    this.uploaded = false;
//					    this.cropDone(); 
//					    // this.uploaded = true;this.support.datauri ||           
//					    // this.$avatarSrc.val(this.url);            
//					    // this.startCropper();         
//					 } else {           
//					     this.uploaded = true;            
//					     this.$avatarSrc.val(this.url);           
//					     this.startCropper();            
//					     this.cropDone();          
//					}
//				},
//
//				complete: function() {
//					_this.submitEnd();
//				}
//			});
//		},

		syncUpload: function() {
			this.$avatarSave.click();
		},

		submitStart: function() {
			this.$loading.fadeIn();
		},

		submitDone: function(data) {
			if($.isPlainObject(data)) {
				if(data.result) {
					this.url = data.result;
					if(this.support.datauri || this.uploaded) {
						this.uploaded = false;
						this.cropDone();
					} else {
						this.uploaded = true;
						this.$avatarSrc.val(this.url);
						this.startCropper();
					}
					this.$avatarInput.val('');
				} else if(data.message) {
					this.alert(data.message);
				}
			} else {
				this.alert('Failed to response');
			}
		},

		submitFail: function(msg) {
			this.alert(msg);
		},

		submitEnd: function() {
			this.$loading.fadeOut();
		},

		cropDone: function() {
			this.$avatarForm.get(0).reset();
			this.$avatar.attr('src', this.url);
			this.stopCropper();
			this.$avatarModal.modal('hide');
		},

		alert: function(msg) {
			var $alert = [
				'<div class="alert alert-danger avater-alert">',
				'<button type="button" class="close" data-dismiss="alert">&times;</button>',
				msg,
				'</div>'
			].join('');

			this.$avatarUpload.after($alert);
		}
	};

	

/*})();*/


var fn = {
	beforeSend: function(){
		$('.avatar-save').attr('disabled','disabled').text('正在保存...')
	},
	complete: function(){
		$('.avatar-save').removeAttr('disabled').text('保存修改')
		$('.avatar-form .close').trigger('click')
	},
	imagesAjax: function(options,callback,dataUrl){
		var defaults = {
			data: { 'uploadImg': dataUrl }
		};

		var settings = $.extend(true, defaults, options);
		$.ajax({
			url: settings.url,  // 配置您后台的上传地址
			data: settings.data,
			type: "POST",
			dataType: 'json',
			beforeSend: fn.beforeSend,
			complete: fn.complete,
			success: function(re) {
				// 上传成功后，执行的回调函数
				if (typeof callback === 'function' && callback()) {
					callback()
				}
			},
			error: function(res){
				alert('error code:'+res.status);
			}
		});
	},
	upload: function(options,callback) {
		var img_lg = document.getElementById('imageHead');
		html2canvas(img_lg, {
			allowTaint: true,
			taintTest: false,
			onrendered: function(canvas) {
				canvas.id = "mycanvas";
				var dataUrl = canvas.toDataURL("image/jpeg");
				var newImg = document.createElement("img");
				newImg.src = dataUrl;
				fn.imagesAjax(options,callback,dataUrl)
			}
		});
	}
}

$(function(){
	//做个下简易的验证  大小 格式 
	$('#avatarInput').on('change', function(e) {
		var filemaxsize = 1024 * 5;//5M
		var target = $(e.target);
		var Size = target[0].files[0].size / 1024;
		if(Size > filemaxsize) {
			alert('图片过大，请重新选择!');
			$(".avatar-wrapper").childre().remove;
			return false;
		}
		if(!this.files[0].type.match(/image.*/)) {
			alert('请选择正确的图片!')
		} else {
			var filename = document.querySelector("#avatar-name");
			var texts = document.querySelector("#avatarInput").value;
			var teststr = texts;
			var testend = teststr.match(/[^\\]+\.[^\(]+/i);
			filename.innerHTML = testend;
		}	
	});
})




