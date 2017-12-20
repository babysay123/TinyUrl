(function($) {

	var settings = {
		// Full screen header?
		fullScreenHeader: true,
		// Parallax background effect?
		parallax: true,
		// Parallax factor (lower = more intense, higher = less intense).
		parallaxFactor: 10
	};
  var utils = {
    reqFlag:false,
    request:function(url, data, fn) {
      var _ts = this;
      if (!_ts.reqFlag) {
        _ts.reqFlag = true;
				var _inx = layer.load(2);
        $.ajax({
      		type : "POST",
      		url : url,
      		// contentType : "application/json; charset=utf-8",
      		data : data,//JSON.stringify(data),
      		dataType : "json",
      		success : function(res) {
            _ts.reqFlag = false;
            if (typeof fn !== "function") { return ; }
            fn(res);
      		},
      		error : function(message) {
      			console.log(message);
      		}
      	}).always(function(){
					layer.close(_inx);
				});
      }else{
        _ts.tips("wait a second please.")
      }
    },
    isURL:function(url) {
        var regExp = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
        if (url.match(regExp)) {
            return true;
        } else {
            return false;
        }
    },
    trim: function( string ) {
        return string.replace(/(^\s*)|(\s*$)/g,'');
    },
    isEmail:function(str){
        if(!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(str))){
            return false;
        }
        return true;
    },
    tips:function(msg, time, skin){
      var _ts = this;
      if (_ts.trim(msg).length == 0) { return false; }
      var t = time? time : 2000, s = skin? skin : "msg";
      // layer.open({ content:msg, skin:s, time:t});
			layer.msg(msg, {offset:"auto"});
    }
  }

  var shorten = {
    form:"#shortenForm",
		config:{
			"L2S": {
				url: "http://ec2-54-89-255-231.compute-1.amazonaws.com/tinyurl/short-url",
				key: ["long_url"]
			},
			"S2L": {
				url: "http://ec2-54-89-255-231.compute-1.amazonaws.com/tinyurl/long-url",
				key: ["short_url"]
			},
		},
    verify:function(name){
      var _ts = this;
      var _original = $(_ts.form).find("textarea[name=original]"),
          _short = $(_ts.form).find("input[name=shorten]");
      if (_original.length > 0 && _short.length > 0) {
				var _do = function(selector){
					console.log(selector);
					if (utils.trim(selector.val()).length == 0) {
	          selector.siblings(".st-error").text("Write down the URL please.");
	          return false;
	        } else if (!utils.isURL(selector.val())) {
	          selector.siblings(".st-error").text("Please enter URL correctly.");
	          return false;
	        } else {
	          selector.siblings(".st-error").text("");
	        }
					return selector.val();
				}
				if (name == "L2S") {
					_short.val("");
					_short.siblings(".st-error").text("");
					return _do(_original);
				} else if (name == "S2L") {
					_original.val("");
					_original.siblings(".st-error").text("");
					return _do(_short);
				} else {
					return false;
				}
      } else {
        console.log("error");
      }
    },
    control:function(){
      var _ts = this;
      var _original = $(_ts.form).find("textarea[name=original]"),
					_short = $(_ts.form).find("input[name=shorten]");
      $(_ts.form).on("click", "input[type=submit]", function(e){
				var _t = $(this), _name = _t.attr("name"), _dict = _ts.config[_name];
				var _val = _ts.verify(_name);
				if (_val && _dict) {
					var data = {};
					data[_dict.key[0]] = _val;
					utils.request(_dict.url, data, function(res){
						console.log(res);
						res = JSON.parse(res);
						var resData = res.url? res.url : undefined;
						if (resData) {
							for (var each in resData) {
								if (resData.hasOwnProperty(each)) {
									if (each.indexOf("short") > -1) {
										_short.val(resData[each]);
									} else if(each.indexOf("long") > -1) {
										_original.val(resData[each]);
									} else {

									}
								}
							}
						}
					});
				}
      });
    },
    init:function(){
      this.control();
    }
  }

  var contact = {
    form:"#contactForm",
    verify:function(inputs){
      if (inputs.name.length > 0 && inputs.email.length > 0 && inputs.subject.length > 0 && inputs.message.length > 0) {
        if (utils.trim(inputs.name.val()).length == 0) {
          inputs.name.siblings(".st-error").text("Enter your name please.")
          return false;
        }else{
          inputs.name.siblings(".st-error").text("");
        }
        if (!utils.isEmail(inputs.email.val())) {
          inputs.email.siblings(".st-error").text("Please enter Email correctly.");
          return false;
        }else{
          inputs.email.siblings(".st-error").text("");
        }
        if (utils.trim(inputs.subject.val()).length == 0) {
          inputs.subject.siblings(".st-error").text("Enter your subject please.");
          return false;
        }else{
          inputs.subject.siblings(".st-error").text("");
        }
        if (utils.trim(inputs.message.val()).length == 0) {
          inputs.message.siblings(".st-error").text("Thanks in advance with your suggestion.");
          return false;
        }else{
          inputs.message.siblings(".st-error").text("");
        }
        return true;
      }else{
        utils.tips("inputs error");
        return false;
      }
    },
    control:function(){
      var _ts = this;
      $(_ts.form).on("click", "input[type=submit]", function(e){
        var inputs = {
          name:$(_ts.form).find('input[name=name]'),
          email:$(_ts.form).find('input[name=email]'),
          subject:$(_ts.form).find('input[name=subject]'),
          message:$(_ts.form).find('input[name=message]'),
        }
        if (_ts.verify(inputs)) {
          var url = "#"; //TODO Enter url
          var data = {
            name:inputs.name.val(),
            email:inputs.email.val(),
            subject:inputs.subject.val(),
            message:inputs.message.val(),
          };
          utils.request(url, data, function(res){
            console.log(res);
          });
        }
      });
    },
    init:function(){
      this.control();
    }
  }

  var share = {
		id:"#footer",
		control:function(){
			var _ts = this;
			$(_ts.id).on("click", "li a", function(e){
				layer.msg("Thanks for your share");
			});
		},
		init:function(){
			this.control();
		}
  }

	// console.log(skel);
	skel.breakpoints({
		wide: '(max-width: 1680px)',
		normal: '(max-width: 1080px)',
		narrow: '(max-width: 840px)',
		mobile: '(max-width: 736px)'
	});

	$(function() {
		var	$window = $(window),
				$body = $('body');
		if (skel.vars.mobile) {
			settings.parallax = false;
			$body.addClass('is-scroll');
		}

		// Disable animations/transitions until the page has loaded.
		$body.addClass('is-loading');
		$window.on('load', function() {
			$body.removeClass('is-loading');
		});

		// CSS polyfills (IE<9).
		if (skel.vars.IEVersion < 9)
			$(':last-child').addClass('last-child');

		// Fix: Placeholder polyfill.
		$('form').placeholder();

		// Prioritize "important" elements on mobile.
		skel.on('+mobile -mobile', function() {
			$.prioritize(
				'.important\\28 mobile\\29',
				skel.breakpoint('mobile').active
			);
		});

		// Scrolly links.
		$('.scrolly-middle').scrolly({
			speed: 1000,
			anchor: 'middle'
		});
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() { return (skel.breakpoint('mobile').active ? 70 : 190); }
		});

		// Full screen header.
		if (settings.fullScreenHeader) {
			var $header = $('#header');
			if ($header.length > 0) {
				var $header_header = $header.find('header');
				$window
					.on('resize.overflow_fsh', function() {
						if (skel.breakpoint('mobile').active)
							$header.css('padding', '');
						else {
							var p = Math.max(192, ($window.height() - $header_header.outerHeight()) / 2);
							$header.css('padding', p + 'px 0 ' + p + 'px 0');
						}
					})
					.trigger('resize.overflow_fsh');
				$window.load(function() {
					$window.trigger('resize.overflow_fsh');
				});
			}
		}

		// Parallax background.
		// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
		if (skel.vars.browser == 'ie' ||	skel.vars.mobile)
			settings.parallax = false;

		if (settings.parallax) {
			var $dummy = $(), $bg;
			$window
				.on('scroll.overflow_parallax', function() {
					// Adjust background position.
					$bg.css('background-position', 'center ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
				})
				.on('resize.overflow_parallax', function() {
					// If we're in a situation where we need to temporarily disable parallax, do so.
					if (!skel.breakpoint('wide').active ||	skel.breakpoint('narrow').active) {
						$body.css('background-position', '');
						$bg = $dummy;
					}
					// Otherwise, continue as normal.
					else
						$bg = $body;

					// Trigger scroll handler.
					$window.triggerHandler('scroll.overflow_parallax');
				})
				.trigger('resize.overflow_parallax');
		}

		layer.ready(function(){
			// start short
			shorten.init();
			// contact us
			contact.init();
		  //
			share.init();
		});
	});

})(jQuery);
