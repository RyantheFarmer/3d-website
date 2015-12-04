function ViewManager (appContainer) {
	'use strict';
	var $scope = this;
	var currentController = '';
	var controllers = {};
	var displayURLs = {};
	var fallbackURL = {};
	var preventSameLocation = false;
	var updateCallback;
	var route = (function (){
		return {
			when : function (displayURL, options) {
				displayURLs[displayURL] = options;
				return route;
			},
			otherwise : function (options) {
				fallbackURL = options;
			}
		};
	})();
	this.setUpdateCallback = function (callback) {
		updateCallback = callback;
	};
	this.removeUpdateCallback = function () {
		updateCallback = undefined;
	};
	this.controller = function (controllerName, callback) {
		if (typeof controllerName === 'function') {
			controllerName($scope);
		}
		else {
			controllers[controllerName] = callback;
		}
	};
	this.config = function (callback) {
		callback(route);
		getFiles(document.location.pathname).success(function (newHTML) {
			newHTML = $(newHTML);
			var dataObj = {};
			if (newHTML.attr('data') !== undefined && newHTML.attr('data') != 'undefined') {  // js sucks sometimes
				dataObj = JSON.parse(newHTML.attr('data'));
			}
			setPageOptions(dataObj, function () {
				$(appContainer).append(newHTML);
				currentController.init($scope);
				setTimeout(function () {
					newHTML.removeClass('viewManagerEnter');
					setTimeout(function () {
						$('#loadBG').addClass('hidden');
						setTimeout(function () {
							$('#loadBG').remove();
						}, 360);
					}, 350);
				}, 50);
			});
		});
	};
	this.setPreventSamelocation = function (val) {
		preventSameLocation = val;
	};
	this.location = function (url, title) {
		if (preventSameLocation && url == document.location) {
			return;
		}
		$h.location (url, title);
	};
	function getFiles (url) {
		var path = document.location.pathname.split('?')[0].split('/'); // add query support
		path.shift();
		var urlattr = {};
		var accurateURL = true;
		var finalURL = '';
		Object.keys(displayURLs).forEach(function (url) {
			accurateURL = true;
			var splitURL = url.split('/');
			splitURL.shift();
			path.forEach(function (e,i) {
				if (accurateURL && splitURL[i] !== undefined && splitURL <= path) {
					if (splitURL[i].startsWith(':')) {
						urlattr[splitURL[i].substr(1,splitURL[i].length-1)] = e;
						if (i === path.length-1) {
							finalURL = clone(displayURLs[url]);
						}
					}
					else {
						if (e === splitURL[i] && i === path.length-1) {
							finalURL = clone(displayURLs[url]);
						}
						else if (e !== splitURL[i]) {
							accurateURL = false;
						}
					}
				}
				else {
					accurateURL = false;
				}
			});
		});
		if (finalURL) {
			if (typeof finalURL.actualURL === 'function') {
				finalURL.actualURL = finalURL.actualURL(urlattr);
			}
		}
		else {
			finalURL = fallbackURL;
		}
		document.title = finalURL.title;
		if (currentController) {
			currentController.exit($scope);
		}
		currentController = new controllers[finalURL.controller]();
		return $.ajax({
			url : finalURL.actualURL,
			async : true,
			error : function (a,b,c){
				if (c == '/login') location.href = c;
			}
		});
	}
	$h.onBack(function (url) {
		getFiles(url).success(function (newHTML) {
			updateHTML(newHTML, 'exit', 'enter');
		});
	}).onForward(function (url) {
		getFiles(url).success(function (newHTML){
			updateHTML(newHTML, 'enter', 'exit');
		});
	}).onNew(function (url) {
		getFiles(url).success(function (newHTML) {
			updateHTML(newHTML, 'enter', 'exit');
		}).error(function (){
			updateHTML(newHTML, 'enter', 'exit');
		});
	}).onUpdate(function (url) {
		if (updateCallback) {
			updateCallback(url);
		}
	});
	function updateHTML (newHTML, first, then) {
		var oldHTML = $(appContainer).children();
		newHTML = $(newHTML);
		var dataObj = {};
		if (newHTML.attr('data') !== undefined && newHTML.attr('data') !== 'undefined') {
			dataObj = JSON.parse(newHTML.attr('data'));
		}

		setPageOptions(dataObj, function (){
			newHTML.addClass('viewManager'+first.charAt(0).toUpperCase() + first.slice(1));
			$(appContainer).append(newHTML);
			initTransitionEvent(oldHTML);
			setTimeout(function () {
				currentController.init($scope);
				oldHTML.addClass('viewManager' + then.charAt(0).toUpperCase() + then.slice(1));
				newHTML.removeClass('viewManagerEnter viewManagerExit');
			},50);
		});
	}
	function setPageOptions (options, callback) {
		callback();
	}
}
