var http = require('http');
var https = require('https');

var fs = require('fs');
var path = require('path');
var config = require('./config');
var debug = config.debug;

var domains = getDirectories(__dirname);

var domainApps = getApps(domains);

http.createServer(callApps).listen(3000);

function callApps(req, res) {
    for(var i = 0; i < domains.length; ++i) {
        if(req.headers.host.split('.')[0] == domains[i]) {
            if(debug) console.log(req.method + ' ' + req.url);
            domainApps[domains[i]].request(req, res);
        }
    }
}

function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter(function(file) {
        return file !== 'node_modules' && fs.statSync(path.join(srcpath, file)).isDirectory();
    });
}

function getApps(appNames) {
    var tmpObject = {};
    for(var i = 0; i < appNames.length; ++i) {
        tmpObject[appNames[i]] = require(path.join(__dirname, appNames[i], 'app.js'));
    }
    return tmpObject;
}
