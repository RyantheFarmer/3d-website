var am = require('../am')();
var path = require('path');

am.pub(path.join(__dirname, 'public'));
am.views(path.join(__dirname, 'views'));

am.get('/', function(req, res, next) {
    res.render('index.html');
});

am.use(function(req, res) {
    console.log('404');
    res.end('404');
});

module.exports = am;
