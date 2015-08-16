function PrizmiqViewManager(app_container) {
	'use strict';
	var $scope = this;
	var current_controller = '';
	var priz_controllers = {};
	var display_urls = {};
	var fallback_url = {};
	var prevent_same_location = false;
	var updateCallback;
	var route = (function(){
		return {
			when : function(display_url, options) {
				display_urls[display_url] = options;
				return route;
			},
			otherwise : function(options) {
				fallback_url = options;
			}
		}
	})();
	this.setUpdateCallback = function(callback) {
		updateCallback = callback;
	};
	this.removeUpdateCallback = function() {
		updateCallback = undefined;
	};
	this.controller = function(controller_name, callback) {
		if(typeof controller_name === 'function') {
			controller_name($scope);
		}
		else {
			priz_controllers[controller_name] = callback;
		}
	};
	this.config = function(callback) {
		callback(route);
		getFiles(document.location.pathname).success(function(new_html) {
			new_html = $(new_html);
			new_html.addClass('priz_enter_animation');
			$(app_container).append(new_html);
			setTimeout(function() {
				current_controller.init($scope);
				new_html.removeClass('priz_enter_animation');
				setTimeout(function() {
					$('#gradient_cover').addClass('remove');
					setTimeout(function() {
						$('#gradient_cover').remove();
					}, 360);
				}, 350);
			}, 50);
		});
	};
	this.setPreventSamelocation = function(val) {
		prevent_same_location = val;
	};
	this.location = function(url, title) {
		if(prevent_same_location && url == document.location) {
			return;
		}
		$ph.location(url, title);
	};
	function getFiles(url) {
		var path = document.location.pathname.split('?')[0].split('/'); // add query support
		path.shift();
		var urlattr = {};
		var accurate_url = true;
		var final_url = '';
		Object.keys(display_urls).forEach(function(url) {
			accurate_url = true;
			var split_url = url.split('/');
			split_url.shift();
			path.forEach(function(e,i) {
				if(accurate_url) {
					if(split_url[i].startsWith(':')) {
						urlattr[split_url[i].substr(1,split_url[i].length-1)] = e;
						if(i == path.length-1) {
							final_url = clone(display_urls[url]);
						}
					}
					else {
						if(e == split_url[i] && i == path.length-1) {
							final_url = clone(display_urls[url]);
						}
						else if(e!==split_url[i]) {
							accurate_url = false;
						}
					}
				}
			});
		});
		if(final_url) {
			if(typeof final_url.actual_url === 'function') {
				final_url.actual_url = final_url.actual_url(urlattr);
			}
		}
		else {
			final_url = fallback_url;
		}
		document.title = final_url.title;
		if(current_controller) {
			current_controller.exit($scope);
		}
		current_controller = new priz_controllers[final_url.controller];
		return $.ajax({
			url : final_url.actual_url,
			async : true,
			error : function(a,b,c){console.log(c);}
		});
	};
	$ph.onBack(function(url) {
		getFiles(url).success(function(new_html) {
			update_html(new_html, 'exit', 'enter');
		});
	}).onForward(function(url) {
		getFiles(url).success(function(new_html){
			update_html(new_html, 'enter', 'exit');
		});
	}).onNew(function(url) {
		getFiles(url).success(function(new_html) {
			update_html(new_html, 'enter', 'exit');
		}).error(function(){
			update_html(new_html, 'enter', 'exit', false);
		});
	}).onUpdate(function(url) {
		if(updateCallback) {
			updateCallback(url);
		}
	});
	function update_html(new_html, first, then) {
		var old_html = $(app_container).children();
		new_html = $(new_html);
		new_html.addClass('priz_'+first+'_animation');
		$(app_container).append(new_html);
		setTimeout(function() {
			current_controller.init($scope);
			old_html.addClass('priz_'+then+'_animation');
			new_html.removeClass('priz_enter_animation priz_exit_animation');
			initTransitionEvent(new_html);
			initTransitionEvent(old_html);
		},50);
	}
}