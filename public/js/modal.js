var $pm = (function() {
	var open_window = false;
	var background = true;
	var priz_bg = document.createElement('div');
	var priz_bg_style = {
		position : 'absolute',
		backgroundColor : 'rgba(0,0,0,0.00001)',
		width : '100%',
		height : '100%',
		display : 'block',
		transition : 'background-color 350ms',
		zIndex : 999999
	};
	var priz_container_style = {
		width : '450px',
		backgroundColor : '#303f46',
		opacity : 0.0001,
		transition : 'transform 350ms, opacity 300ms',
		marginLeft : '-200px',
		top : '50%',
		left : '50%',
		transform : 'translate3d(0%,calc(-50% + 80px),0) rotate3d(1,0,0,-35deg)',
		position : 'absolute',
		display : 'block',
		perspective : '500px'
	};
	var priz_header_style = {
		position : 'relative',
		display : 'block',
		height : '60px',
		width : '100%',
		backgroundColor : '#263137',
		textAlign : 'center',
		fontSize : '32px',
		lineHeight : '60px'
	};
	var priz_content_style = {
		position : 'relative',
		display : 'block',
		width : 'calc(100% - 20px)',
		textAlign : 'justify',
		fontSize : '16px',
		padding : '10px',
		paddingBottom : '60px'
	};
	function setCSS(element, css) {
		Object.keys(css).forEach(function(e,i) {
			element.style[e] = css[e];
		});
	}
	function clone(obj) {
		if (null === obj || "object" !== typeof obj) return obj;
			var copy = obj.constructor();
			for (var attr in obj)
				if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
		return copy;
	}
	return {
		bool_window : function(title, content, callback, bg) {
			var priz_container = document.createElement('div');
			var priz_header = document.createElement('div');
			var priz_content = document.createElement('div');
			var priz_button1 = document.createElement('input');
			var priz_button2 = document.createElement('input');
			var priz_button1_style = {
				position : 'absolute',
				width : 'calc(50% - 20px)',
				height : '30px',
				bottom : '10px',
				fontSize : '18px',
				left : '10px'
			};
			var priz_button2_style = clone(priz_button1_style);
			priz_button2_style.left = '';
			priz_button2_style.right = '10px';
			setCSS(priz_bg, priz_bg_style);
			setCSS(priz_container, priz_container_style);
			setCSS(priz_header, priz_header_style);
			setCSS(priz_content, priz_content_style);
			setCSS(priz_button1, priz_button1_style);
			setCSS(priz_button2, priz_button2_style);
			priz_header.innerHTML = title;
			priz_header.className = 'light_font';
			$(priz_container).append(priz_header);
			priz_content.innerHTML = content;
			priz_content.className = 'light_font';
			$(priz_container).append(priz_content);
			priz_button1.className = 'priz_input_dark';
			priz_button1.type = 'button';
			priz_button1.value = 'Yes';
			$(priz_container).append(priz_button1);
			priz_button2.className = 'priz_input_dark';
			priz_button2.type = 'button';
			priz_button2.value = 'No';
			$(priz_container).append(priz_button2);
			$(priz_bg).append(priz_container);
			$('body').append(priz_bg);
			display_modal();
			$(priz_button1).one('click', function(event) {
				$(priz_bg).off('click');
				$(priz_button2).off('click');
				callback(true);
				remove_modal();
			});
			$(priz_button2).one('click', function(event) {
				$(priz_bg).off('click');
				$(priz_button1).off('click');
				callback(false);
				remove_modal();
			});
			$(priz_bg).one('click', function(event) {
				$(priz_button1).off('click');
				$(priz_button2).off('click');
				callback(false);
				remove_modal();
			});
			$(priz_button1).focus();
			function display_modal() {
				setTimeout(function() {
					priz_bg.style.backgroundColor = 'rgba(0,0,0,0.4)';
				}, 50);
				setTimeout(function() {
					priz_container.style.transform = 'translate3d(0%,calc(-50% + 0px),0) rotate3d(1,0,0,0deg)';
					priz_container.style.opacity = '1';
				}, 150);
			}
			function remove_modal() {
				setTimeout(function() {
					priz_bg.style.backgroundColor = 'rgba(0,0,0,0)';
					priz_container.style.opacity = 0.0001;
				}, 150);
				setTimeout(function() {
					priz_container.style.transform = 'translate3d(0%,calc(-50% + 80px),0) rotate3d(1,0,0,-35deg)';
					setTimeout(function() {
						$(priz_bg).children().remove();
						$(priz_bg).remove();
					}, 400);
				}, 50);
			}
		},
		confirm_window : function(title, content, callback, bg) {
			var priz_container = document.createElement('div');
			var priz_header = document.createElement('div');
			var priz_content = document.createElement('div');
			var priz_button1 = document.createElement('input');
			var priz_button2 = document.createElement('input');
			var priz_button1_style = {
				position : 'absolute',
				width : 'calc(100% - 20px)',
				height : '30px',
				bottom : '10px',
				fontSize : '18px',
				left : '10px'
			};
			setCSS(priz_bg, priz_bg_style);
			setCSS(priz_container, priz_container_style);
			setCSS(priz_header, priz_header_style);
			setCSS(priz_content, priz_content_style);
			setCSS(priz_button1, priz_button1_style);
			priz_header.innerHTML = title;
			priz_header.className = 'light_font';
			$(priz_container).append(priz_header);
			priz_content.innerHTML = content;
			priz_content.className = 'light_font';
			$(priz_container).append(priz_content);
			priz_button1.className = 'priz_input_dark';
			priz_button1.type = 'button';
			priz_button1.value = 'Confirm';
			$(priz_container).append(priz_button1);
			$(priz_bg).append(priz_container);
			$('body').append(priz_bg);
			display_modal();
			$(priz_button1).one('click', function(event) {
				$(priz_bg).off('click');
				callback(true);
				remove_modal();
			});
			$(priz_bg).one('click', function(event) {
				$(priz_button1).off('click');
				callback(true);
				remove_modal();
			});
			$(priz_button1).focus();
			function display_modal() {
				setTimeout(function() {
					priz_bg.style.backgroundColor = 'rgba(0,0,0,0.4)';
				}, 50);
				setTimeout(function() {
					priz_container.style.transform = 'translate3d(0%,calc(-50% + 0px),0) rotate3d(1,0,0,0deg)';
					priz_container.style.opacity = '1';
				}, 150);
			}
			function remove_modal() {
				setTimeout(function() {
					priz_bg.style.backgroundColor = 'rgba(0,0,0,0)';
					priz_container.style.opacity = 0.0001;
				}, 150);
				setTimeout(function() {
					priz_container.style.transform = 'translate3d(0%,calc(-50% + 80px),0) rotate3d(1,0,0,-35deg)';
					setTimeout(function() {
						$(priz_bg).children().remove();
						$(priz_bg).remove();
					}, 400);
				}, 50);
			}
		},
		warning_window : function(title, content, bg) {
			var priz_container = document.createElement('div');
			var priz_header = document.createElement('div');
			var priz_content = document.createElement('div');
			var priz_button1 = document.createElement('input');
			var priz_button1_style = {
				position : 'absolute',
				width : 'calc(100% - 20px)',
				height : '30px',
				bottom : '10px',
				fontSize : '18px',
				left : '10px'
			};
			setCSS(priz_bg, priz_bg_style);
			setCSS(priz_container, priz_container_style);
			setCSS(priz_header, priz_header_style);
			setCSS(priz_content, priz_content_style);
			setCSS(priz_button1, priz_button1_style);
			priz_header.style.backgroundImage="url('/images/warning_dark.png')";
  			priz_header.style.backgroundSize="70px 60px";
			priz_header.style.animation="modal_header_roll 5s infinite";
			priz_header.style.animationTimingFunction='linear';
			priz_header.innerHTML = title;
			priz_header.className = 'light_font';
			$(priz_container).append(priz_header);
			priz_content.innerHTML = content;
			priz_content.className = 'light_font';
			$(priz_container).append(priz_content);
			priz_button1.className = 'priz_input_dark';
			priz_button1.type = 'button';
			priz_button1.value = 'Confirm';
			$(priz_container).append(priz_button1);
			$(priz_bg).append(priz_container);
			$('body').append(priz_bg);
			display_modal();
			$(priz_button1).one('click', function(event) {
				$(priz_bg).off('click');
				remove_modal();
			});
			$(priz_bg).one('click', function(event) {
				$(priz_button1).off('click');
				remove_modal();
			});
			$(priz_button1).focus();
			function display_modal() {
				setTimeout(function() {
					priz_bg.style.backgroundColor = 'rgba(0,0,0,0.4)';
				}, 50);
				setTimeout(function() {
					priz_container.style.transform = 'translate3d(0%,calc(-50% + 0px),0) rotate3d(1,0,0,0deg)';
					priz_container.style.opacity = '1';
				}, 150);
			}
			function remove_modal() {
				setTimeout(function() {
					priz_bg.style.backgroundColor = 'rgba(0,0,0,0)';
					priz_container.style.opacity = 0.0001;
				}, 150);
				setTimeout(function() {
					priz_container.style.transform = 'translate3d(0%,calc(-50% + 80px),0) rotate3d(1,0,0,-35deg)';
					setTimeout(function() {
						$(priz_bg).children().remove();
						$(priz_bg).remove();
					}, 400);
				}, 50);
			}
		},
		progress_window : function(title, content, get_progress, callback, bg) {
			// gotta figure this one out
		},
		loading_window : function(title, content, bg) {
			// says loading, possible spinny doodad, until clear_windows is called
		},
		custom_window : function(title, content, vals, callback, bg) {
			var priz_container = document.createElement('div');
			var priz_header = document.createElement('div');
			var priz_content = document.createElement('div');
			var priz_button1 = document.createElement('input');
			var priz_button2 = document.createElement('input');
			var priz_button1_style = {
				position : 'absolute',
				width : 'calc(50% - 20px)',
				height : '30px',
				bottom : '10px',
				fontSize : '18px',
				left : '10px'
			};
			var priz_button2_style = clone(priz_button1_style);
			priz_button2_style.left = '';
			priz_button2_style.right = '10px';
			setCSS(priz_bg, priz_bg_style);
			setCSS(priz_container, priz_container_style);
			setCSS(priz_header, priz_header_style);
			setCSS(priz_content, priz_content_style);
			setCSS(priz_button1, priz_button1_style);
			setCSS(priz_button2, priz_button2_style);
			priz_header.innerHTML = title;
			priz_header.className = 'light_font';
			$(priz_container).append(priz_header);
			priz_content.innerHTML = content;
			priz_content.className = 'light_font';
			$(priz_container).append(priz_content);
			priz_button1.className = 'priz_input_dark';
			priz_button1.type = 'button';
			priz_button1.value = 'Apply';
			$(priz_container).append(priz_button1);
			priz_button2.className = 'priz_input_dark';
			priz_button2.type = 'button';
			priz_button2.value = 'Cancel';
			$(priz_container).append(priz_button2);
			$(priz_bg).append(priz_container);
			$('body').append(priz_bg);
			display_modal();
			$(priz_button1).one('click', function(event) {
				$(priz_bg).off('click');
				$(priz_button2).off('click');
				var result_array = [];
				$(vals).each(function(i,e) {
					console.log($(e).val());
					result_array.push($(e).val());
				});
				callback(true, result_array);
				remove_modal();
			});
			$(priz_button2).one('click', function(event) {
				$(priz_bg).off('click');
				$(priz_button1).off('click');
				callback(false);
				remove_modal();
			});
			$(priz_bg).on('click', function(event) {
				if(event.target === priz_bg) {
					$(this).off();
					$(priz_button1).off('click');
					$(priz_button2).off('click');
					callback(false);
					remove_modal();
				}
			});
			$(priz_button1).focus();
			function display_modal() {
				setTimeout(function() {
					priz_bg.style.backgroundColor = 'rgba(0,0,0,0.4)';
				}, 50);
				setTimeout(function() {
					priz_container.style.transform = 'translate3d(0%,calc(-50% + 0px),0) rotate3d(1,0,0,0deg)';
					priz_container.style.opacity = '1';
				}, 150);
			}
			function remove_modal() {
				setTimeout(function() {
					priz_bg.style.backgroundColor = 'rgba(0,0,0,0)';
					priz_container.style.opacity = 0.0001;
				}, 150);
				setTimeout(function() {
					priz_container.style.transform = 'translate3d(0%,calc(-50% + 80px),0) rotate3d(1,0,0,-35deg)';
					setTimeout(function() {
						$(priz_bg).children().remove();
						$(priz_bg).remove();
					}, 400);
				}, 50);
			}
		},
		clear_windows : function() {
			setTimeout(function() {
				priz_bg.style.backgroundColor = 'rgba(0,0,0,0)';
				priz_container.style.opacity = 0.0001;
			}, 150);
			setTimeout(function() {
				priz_container.style.transform = 'translate3d(0%,calc(-50% + 80px),0) rotate3d(1,0,0,-35deg)';
				setTimeout(function() {
					$(priz_bg).children().remove();
					$(priz_bg).remove();
				}, 400);
			}, 50);
		}
	};
}());
