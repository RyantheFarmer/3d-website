var path = require('path');
var amr = require(path.join(require.main.filename, '../amr.js'))();

amr.get('/', function(req, res, next) {
  res.render('index.jade', { title: 'Express' });
});

module.exports = amr.routes;
