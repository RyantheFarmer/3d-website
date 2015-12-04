var $h = (function() {
	'use strict';
	var backCall;
	var forwardCall;
	var newCall;
	var updateCall;
	var length = 0;
	var statePos = 0;
	var prevUrl = document.location.pathname;
	window.onpopstate = function stateListener(event) {
		var newUrl = document.location.pathname.split('#')[0];
		if(newUrl !== prevUrl) {
			if(updateCall) {
				updateCall(newUrl);
			}
			if(event.state) {
				statePos = event.state.page || 0;
			}
			else statePos = 0;
			if(statePos < length && prevUrl !== newUrl) {
				if(backCall) {
					backCall(newUrl);
				}
				length--;
			}
			else if(prevUrl !== newUrl) {
				if(forwardCall) {
					forwardCall(newUrl);
				}
				length++;
			}
			prevUrl = newUrl;
		}
	};
	return {
		back : function() {
			window.history.back();
		},
		forward : function() {
			window.history.forward();
		},
		onBack : function(callback) {
			backCall = callback;
			return $h;
		},
		onForward : function(callback) {
			forwardCall = callback;
			return $h;
		},
		onNew : function(callback) {
			newCall = callback;
			return $h;
		},
		onUpdate : function(callback) {
			updateCall = callback;
			return $h;
		},
		location : function(url, title) {
			window.history.pushState({page:length}, title?title : document.title, url);
			length++;
			if(updateCall) {
				updateCall(document.location.pathname);
			}
			if(newCall.length!==0) {
				newCall(document.location.pathname);
			}
			prevUrl = document.location.pathname;
		}
	};
})();
