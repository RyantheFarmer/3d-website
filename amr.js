module.exports = (function() {
    var requests = [];

    function addRequest(type, callbackOrPath, callback) {
        requests.push(callback?[type, callbackOrPath, callback]:[type, callbackOrPath]);
    }

    return {
		get : function(path, callback) {
			addRequest('get', path, callback);
		},
		post : function(path, callback) {
			addRequest('post', path, callback);
		},
        use : function(callback) {
			addRequest('use', callback);
		},
        routes : requests
    };
});
