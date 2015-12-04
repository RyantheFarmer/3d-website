$pn = (function() {
	'use strict';
	var priz_notifications;
	var priz_notification_time = 4000;

	var priz_toast_timeout;
	var priz_toast_hide_timeout;
	var priz_toast;
	var priz_toast_body;
	var priz_toast_time = 1500;

	var priz_max_notifications = 10;

	function init_alert() {
		priz_notifications = [];
	}
	function Priz_notification(title, message, time, parent_element) {
		var priz_notification_timer;
		var priz_notification_container;
		var priz_notification_header;
		var priz_notification_contents;
		var priz_notification_close;
		var element_position = 0;
		var init = function() {
			element_position = priz_notifications.length;
			if(element_position > priz_max_notifications) priz_notifications[0].remove();
			priz_notification_container = document.createElement('div');
			priz_notification_header = document.createElement('div');
			priz_notification_contents = document.createElement('div');
			priz_notification_close = document.createElement('div');
			init_priz_notification_container();
			init_priz_notification_header(title);
			init_priz_notification_contents(message);
			init_priz_notification_close();
			$(priz_notification_header).append(priz_notification_close);
			$(priz_notification_container).append(priz_notification_header);
			$(priz_notification_container).append(priz_notification_contents);
			$(parent_element).append(priz_notification_container);
			priz_notification_timer = new Timer(function() {
				$(priz_notification_close).click();
			}, priz_notification_time);
			display_notification();
		};
		function init_priz_notification_container() {
			var priz_style = {
				top : '0px',
				right : '0px',
				width : '240px',
				zIndex : 999999,
				opacity : 0.00001,
				display : 'block',
				position : 'absolute',
				marginTop : '15px',
				boxShadow : '0px 0px 5px rgba(0,0,0,0.6)',
				marginRight : '15px',
				transform : 'translateY(' + ((element_position * 75) + 15) + 'px) rotate3d(1,0,0,-35deg)',
				transition : 'transform 350ms, opacity 350ms',
				perspective : '50px'
			};
			setCSS(priz_notification_container, priz_style);
		}
		function init_priz_notification_header(title) {
			var priz_style = {
				top : '0px',
				right : '0px',
				width : '100%',
				height : '35px',
				display : 'block',
				fontSize : '24px',
				position : 'relative',
				lineHeight : '35px',
				paddingLeft : '4px',
				verticalAlign : 'middle',
				backgroundColor : '#263137'
			};
			setCSS(priz_notification_header, priz_style);
			priz_notification_header.className = 'light_font';
			priz_notification_header.innerHTML = title;
		}
		function init_priz_notification_contents(message) {
			var priz_style = {
				top : '0px',
				right : '0px',
				width : '100%',
				height : '25px',
				display : 'block',
				fontSize : '16px',
				position : 'relative',
				lineHeight : '25px',
				paddingLeft : '4px',
				verticalAlign : 'middle',
				backgroundColor : '#303f46'
			};
			setCSS(priz_notification_contents, priz_style);
			priz_notification_contents.className = 'light_font';
			priz_notification_contents.innerHTML = message;
		}
		function init_priz_notification_close() {
			var priz_style = {
				top : '5px',
				right : '5px',
				width : '25px',
				height : '25px',
				display : 'block',
				fontSize : '18px',
				position : 'absolute',
				lineHeight : '25px',
				verticalAlign : 'middle',
				textAlign: 'center',
				backgroundColor : '#455a64',
				cursor : 'pointer'
			};
			setCSS(priz_notification_close, priz_style);
			priz_notification_close.className = 'light_font';
			priz_notification_close.innerHTML = 'X';
			$(priz_notification_close).one('click', remove_notification);
		}
		function display_notification() {
			var priz_style = {
				opacity : 1,
				transform : 'translateY(' + (element_position * 75) + 'px) rotate3d(1,0,0,0deg)'
			};
			setTimeout(function(){
				setCSS(priz_notification_container, priz_style);
				update_notifications();
			}, 50);
		}
		function remove_notification(event) {
			priz_notification_timer.pause();
			priz_notification_timer = null;
			priz_notifications[element_position] = null;
			update_notifications();
			var priz_style = {
				opacity : 0.00001,
				transform : 'translateY(' + ((element_position * 75) - 15) + 'px) rotate3d(1,0,0,-35deg)'
			};
			setCSS(priz_notification_container, priz_style);
			setTimeout(function() {
				$(priz_notification_container).remove();
			}, 400);
		}
		init();
		return {
			remove : function() {
				$(priz_notification_close).click();
			},
			set_position : function(position) {
				element_position = position;
				priz_notification_container.style.transform = 'translateY('+(element_position * 75) + 'px)';
			}
		};
	}
	function update_notifications() {
		priz_notifications = cleanArray(priz_notifications);
		priz_notifications.forEach(function(e,i){
			e.set_position(i);
		});
	}
	function init_toast() {
		priz_toast = document.createElement('div');
		var priz_toast_style = {
			left : '50%',
			bottom : '0px',
			height : '0px',
			zIndex : 999999,
			position : 'absolute'
		};
		setCSS(priz_toast, priz_toast_style);
		priz_toast_body = document.createElement('div');
		priz_toast_body.className = 'light_font';
		var priz_toast_body_style = {
			left : '-50%',
			height : '20px',
			padding: '4px',
			opacity : '0.00001',
			position : 'relative',
			boxShadow : '0px 0px 5px rgba(0,0,0,0.6)',
			paddingLeft: '10px',
			paddingRight: '10px',
			backgroundColor : '#263137',
			transform: 'translate3d(0%,0px,0) scale3d(1,1,1) rotate3d(1,0,0,-90deg)',
			transition: 'transform 400ms, opacity 400ms',
			perspective: '1px'
		};
		setCSS(priz_toast_body, priz_toast_body_style);
		$(priz_toast).append(priz_toast_body);
		setTimeout(function() {
			$('body').append(priz_toast);
		}, 100);
	}
	function display_toast(message) {
		priz_toast_body.style.display = 'block';
		setTimeout(function() {
			clearTimeout(priz_toast_timeout);
			clearTimeout(priz_toast_hide_timeout);
			priz_toast_body.innerHTML = message;
			var enter_css = {
				opacity: '1',
				transform: 'translate3d(0%,-35px,0) scale3d(1,1,1) rotate3d(1,0,0,0deg)',
				perspective: '100000px'
			};
			setCSS(priz_toast_body, enter_css);
			$(priz_toast_body).html(message);
			priz_toast_timeout = setTimeout(hide_toast, priz_toast_time);
		});
	}
	function hide_toast() {
		var remove_css = {
			opacity: '0.00001',
			transform: 'translate3d(0%,0px,0) scale3d(1,1,1) rotate3d(1,0,0,-90deg)',
			perspective: '500px'
		};
		setCSS(priz_toast_body, remove_css);
		priz_toast_hide_timeout = setTimeout(function() {
			priz_toast_body.style.display = 'none';
		}, 500);
	}
	function setCSS(element, css) {
		Object.keys(css).forEach(function(e,i) {
			element.style[e] = css[e];
		});
	}
	function Timer(callback, delay) {
		var timerId, start, remaining = delay;
		this.pause = function() {
			window.clearTimeout(timerId);
			remaining -= new Date() - start;
		};
		this.resume = function() {
			start = new Date();
			window.clearTimeout(timerId);
			timerId = window.setTimeout(callback, remaining);
		};
		this.resume();
	}
	function cleanArray(actual){
		var newArray = [];
		for(var i = 0; i<actual.length; i++)
			if (actual[i])
				newArray.push(actual[i]);
		return newArray;
	}
	init_alert();
	init_toast();
	return {
		toast : function(message) {
			if(message) display_toast(message);
		},
		alert : function(title, message, time, parent) {
			if(typeof time === 'string' && typeof parent === 'number') {
				var tmptime = time;
				time = parent;
				parent = tmptime;
			}
			else if(typeof time === 'string') {
				parent = time;
				time = priz_notification_time;
			}
			if(title && message) priz_notifications.push(new Priz_notification(title,message,time,parent));
		},
		set_toast_time : function(delay) {
			priz_toast_time = delay | 0;
		},
		set_alert_time : function(delay) {
			priz_toast_time = delay | 0;
		}
	};
}());
