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
        $.ajax({
      		type : "POST",
      		url : url,
      		// contentType : "application/json; charset=utf-8",
      		data : data,//JSON.stringify(data),
      		dataType : "json",
      		// beforeSend : function(xhr) {
      		// 	xhr.setRequestHeader('sessionid', sessionStorage.getItem('sessionid'));
      		// },
      		success : function(res) {
            _ts.reqFlag = false;
            if (typeof fn !== "function") { return ; }
            fn(res);
      		},
      		error : function(message) {
      			console.log(message);
      		}
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
      var t = time? time : 2, s = skin? skin : "msg";
      layer.open({ content:msg, skin:s, time:t});
    }
  }

  var shorten = {
    form:"#shortenForm",
    verify:function(){
      var _ts = this;
      var _original = $(_ts.form).find("textarea[name=original]"),
          _short = $(_ts.form).find("input[name=shorten]");
      if (_original.length > 0 && _short.length > 0) {
        if (utils.trim(_original.val()).length == 0) {
          _original.siblings(".st-error").text("Write down the original URL please.");
          return false;
        } else if (!utils.isURL(_original.val())) {
          _original.siblings(".st-error").text("Please enter URL correctly.");
          return false;
        } else {
          _original.siblings(".st-error").text("");
        }
        return true;
      } else {
        console.log("error");
      }
    },
    control:function(){
      var _ts = this;
      var _original = $(_ts.form).find("textarea[name=original]");
      $(_ts.form).on("click", "input[type=submit]", function(e){
        console.log(e);
        if (_ts.verify()) {
          var url = "#";
          var data = {
            original:_original.val()
          }
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
          var url = "#";
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

    // start short
    shorten.init();

    // contact us
    contact.init();
    
    // utils.tips("hello world!");
		// Poptrox.
			// $('.gallery').poptrox({
			// 	useBodyOverflow: false,
			// 	usePopupEasyClose: false,
			// 	overlayColor: '#0a1919',
			// 	overlayOpacity: (skel.vars.IEVersion < 9 ? 0 : 0.75),
			// 	usePopupDefaultStyling: false,
			// 	usePopupCaption: true,
			// 	popupLoaderText: '',
			// 	windowMargin: 10,
			// 	usePopupNav: true
			// });

	});

})(jQuery);
