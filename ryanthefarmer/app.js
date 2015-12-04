var am = require('../am')();
var path = require('path');

am.pub(path.join(__dirname, 'public'));
am.views(path.join(__dirname, 'views'));

am.use(require(path.join(__dirname, 'routes/api/v1/account.js')));

am.get('/',               function(req, res) { res.render('index.jade');          });
// partials
am.get('/partials/home',  function(req, res) { res.render('partials/home.jade');  });
am.get('/partials/login', function(req, res) { res.render('partials/login.jade'); });
am.get('/partials/404',   function(req, res) { res.end('404');                    });
// always get this
am.get(/\/.*/,            function(req, res) { res.render('partials/index.jade', { loggedIn : req.session.data.ryanthefarmer?req.session.data.ryanthefarmer.loggedIn:false }); });
module.exports = am;
