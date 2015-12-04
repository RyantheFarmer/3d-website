var am = require('../am')();
var path = require('path');

am.pub(path.join(__dirname, 'public'));
am.views(path.join(__dirname, 'views'));



var pages = [
    '/partials/home',
    '/partials/projects',
    '/partials/contact'
];

pages.forEach(function(e){
    am.get(e,require('./routes'+e));
});

am.get('/404', function(req, res) {
    res.end('404');
});

am.use(require('./routes/index'));


module.exports = am;
