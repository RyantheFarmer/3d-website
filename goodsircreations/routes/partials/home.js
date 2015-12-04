var path = require('path');
var amr = require(path.join(require.main.filename, '../amr.js'))();

amr.get('/', function(req, res, next) {
  res.render('partials/home.jade');
});

module.exports = amr.routes;
