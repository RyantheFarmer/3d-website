var fs = require('fs');
var path = require('path');
var mime = require('mime');
var jade = require('jade');
var mustache = require('mustache');
var handlebars = require('handlebars');
var ejs = require('ejs');
var session = require('sesh').session;
var config = require('./config');
var renderCalled = false;
module.exports = (function(){
	var publicFolders = [];
	var requests = [];
	var views = [];
	var acceptableFormDataUrls = [];

	function addView(dir) {
		views.push(dir);
	}

	function renderHTML(req, res, file, level) {
		if(level === undefined) level = 0;
		if(views.length !== level) {
			fs.readFile(path.join(views[level], file), 'utf8', function (err, data) {
				if (err) renderHTML(req, res, file, ++level);
				else res.end(data);
			});
		}
	}

	function renderEjs(req, res, file, options, moreOptions, level) {
		if(level === undefined) level = 0;
		if(views.length !== level) {
			fs.readFile(path.join(views[level], file), 'utf8', function (err, data) {
				if (err) renderEjs(req, res, file, options, moreOptions, ++level);
				else res.end(ejs.render(data, options, moreOptions));
			});
		}
	}

	function renderHandlebars(req, res, file, options, level) {
		if(level === undefined) level = 0;
		if(views.length !== level) {
			fs.readFile(path.join(views[level], file), 'utf8', function (err, data) {
				if (err) renderHandlebars(req, res, file, options, ++level);
				else res.end(handlebars.compile(data)(options));
			});
		}
	}

	function renderMustache(req, res, file, options, level) {
		if(level === undefined) level = 0;
		if(views.length !== level) {
			fs.readFile(path.join(views[level], file), 'utf8', function (err, data) {
				if (err) renderMustache(req, res, file, options, ++level);
				else res.end(mustache.render(data, options));
			});
		}
	}

	function renderJade(req, res, file, options, level) {
		if(level === undefined) level = 0;
		if(views.length !== level) {
			fs.readFile(path.join(views[level], file), 'utf8', function (err, data) {
				if (err) renderJade(req, res, file, options, ++level);
				else res.end(jade.compile(data)(options));
			});
		}
	}

	function addRequest(type, callbackOrPath, callback) {
		if(callback === undefined && callbackOrPath.constructor.name === 'Array') {
			callbackOrPath.forEach(function(e) {
				requests.push(e);
			});
		}
		else requests.push(callback?[type, callbackOrPath, callback]:[type, callbackOrPath]);
	}

	function sendPublicFile(req, res, callback) {
		recursePublicFolders(req, res, 0, callback);
	}

	function recursePublicFolders(req, res, level, onFail) {
		if(level === publicFolders.length) {
			onFail(req, res, 0);
			return;
		}
		var filePath = path.join(publicFolders[level], req.url);
		fs.readFile(filePath, function(err, data) {
			if(err) recursePublicFolders(req, res, ++level, onFail);
			else {
				res.writeHeader(200, { 'Content-Type' : mime.lookup(filePath)});
				res.end(data, 'binary');
				return;
			}
		});
	}

	function recurseRequests(req, res, level) {
		if(level === undefined) level = 0;
		if(level !== requests.length) {
			var tmpRequest = requests[level];
			if(tmpRequest[0] === 'use') {
				tmpRequest[1](req, res, function() {
					recurseRequests(req, res, ++level);
				});
			}
			else if(tmpRequest[0].toLowerCase() === req.method.toLowerCase() && ((tmpRequest[1] instanceof RegExp)?(tmpRequest[1].test(req.url.toLowerCase())):(tmpRequest[1].toLowerCase() === req.url.toLowerCase()))) {
				tmpRequest[2](req, res, function() {
					recurseRequests(req, res, ++level);
				});
			}
			else recurseRequests(req, res, ++level);
		}
	}

	function isFormDataURL() {
		return false;
	}

	return {
		end : function() {
			if(resBuffer) res.end(resBuffer);
		},

		formDataUrls : function(url) {
			if(typeof url === 'string') acceptableFormDataUrls.push(url);
			else url.forEach(function(e) {
				acceptableFormDataUrls.push(e);
			});
		},

		get : function(path, callback) {
			addRequest('get', path, callback);
		},

		post : function(path, callback) {
			addRequest('post', path, callback);
		},

		pub : function(path) {
			publicFolders.push(path);
		},

		use : function(callback) {
			addRequest('use', callback);
		},

		views : function(dir) {
			addView(dir);
		},

		request : function(req, res) {
			res.send = function(data) {
				if(typeof data === 'object') data = JSON.stringify(data);
				res.end(data.toString());
			};
			res.render = function(file, options, moreOptions) {
				if(!renderCalled) {
					var fileExt = file.slice(-4);
					if(fileExt === 'jade') renderJade(req, res, file, options);
					else if(fileExt === '.hbs') renderHandlebars(req, res, file, options);
					else if(fileExt === '.ejs') renderEjs(req, res, file, options, moreOptions);
					else if(fileExt === 'ache') renderMustache(req, res, file, options);
					else if(fileExt === 'html') renderHTML(req, res, file);
					else console.log('Invalid File Type: ', fileExt);
				}
				else console.log('Renderer already called');
			};
			session(req,res,function(req,res){});
			var body = '';
			req.body = {};
			if(isFormDataURL(req.url.toString())) {
				req.on('data', function(data) {
					body += data;
				});
				req.on('end', function() {
					console.log(body);
					sendPublicFile(req, res, recurseRequests);
				});
			}
			else {
				req.on('data', function(data) {
					body += data;
					if (body.length > 1e6) req.connection.destroy();
				});
				req.on('end', function() {
					body = body.split('&');
					body.forEach(function(e) {
						var tmp = e.split('=');
						req.body[tmp[0]] = tmp[1];
					});
					sendPublicFile(req, res, recurseRequests);
				});
			}
		}
	};
});
