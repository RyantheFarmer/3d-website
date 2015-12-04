var path = require('path');
var amr = require(path.join(require.main.filename, '../amr.js'))();
var pg = require('pg');
var db = 'ryanthefarmer';
var dbConfig = require(path.join(require.main.filename, '../config')).db[db];
var pgConfig = 'pg://' +
                dbConfig.user + ':' +
                dbConfig.pass + '@' +
                dbConfig.host + ':' +
                dbConfig.port + '/' +
                db;
var bcrypt = require('bcrypt-nodejs');
// Register
amr.post('/api/v1/account/register', function(req, res) {
    var auth = authenticateData(req, {
        fname : {
            type : 'String',
            min : 1,
            max : 32
        },
        lname : {
            type : 'String',
            min : 1,
            max : 32
        },
        username : {
            type : 'String',
            min : 4,
            max : 16
        },
        email : {
            type : 'String',
            min : 8,
            max : 32//,
            //regex : /time|dance/
        },
        password : {
            type : 'String',
            min : 8,
            max : 16//,
            //regex : /time|dance/
        }
    });
    if(!auth.err) {
        bcrypt.hash(req.body.password, null, null, function(err, hash) {
            req.body.password = '';
            pg.connect(pgConfig, function(err, client, done) {
                var body = req.body;
                var queryInputs = [ body.username, hash, body.email, body.fname, body.lname, 9 ];
                client.query('INSERT INTO users (username, password, email, fname, lname, permission) VALUES ($1, $2, $3, $4, $5, $6)', queryInputs, function(err, data) {
                    if(err) res.send({ err : 'Failed to create user ' + body.username, success : false });
                    else res.send({ err : null, success : true });
                    done();
                });
            });
        });
    }
    else res.send({ err : auth.err, success : false});
});

// Login
amr.post('/api/v1/account/login', function(req, res) {
    if(checkLogin(req)) res.send({ err : 'User ' + req.session.data.ryanthefarmer.username + ' is logged in already.', success : false });
    else {
        var auth = authenticateData(req, {
            username : {
                type : 'String',
                min : 4,
                max : 16
            },
            password : {
                type : 'String',
                min : 8,
                max : 32//,
                //regex : /time|dance/
            }
        });
        if(!auth.err) {
            pg.connect(pgConfig, function(err, client, done) {
                var queryInputs = [req.body.username];
                client.query('SELECT * FROM users WHERE username = $1', queryInputs, function(err, data) {
                    if(data.rows.length === 1) {
                        bcrypt.compare(req.body.password, data.rows[0].password, function(err, pass) {
                            delete data.rows[0].password;
                            delete data.rows[0].id;
                            if(err) res.send({ err : 'Problem logging in, contact ryanthefarmer@gmail.com for stuff', success : false});
                            else if(pass) {
                                req.session.data.ryanthefarmer = data.rows[0];
                                req.session.data.ryanthefarmer.loggedIn = true;
                                res.send({ err : null, success : true});
                            }
                            else if(!pass) res.send({ err : 'Invalid Password', success : false});
                        });
                    }
                    else {
                        res.send({ err : 'User Length Error: ' + data.rows.length, success : false });
                    }
                });
            });
        }
        else res.send({ err : auth.err, success : false});
    }
});

amr.post('/api/v1/account/logout', function(req, res) {
    req.session.data.ryanthefarmer = {};
    if(checkLogin(req)) res.send({ err : null, success : true});
    else res.send({ err : 'No user is logged in.', success : false});
});

function authenticateData(req, authObj) {
    var tmpObj = req.body;
    var tmpObjKeys = Object.keys(tmpObj).sort();
    var authObjKeys = Object.keys(authObj).sort();
    var err = '';
    if(authObjKeys.length === tmpObjKeys.length) {
        for(var i = 0; i < authObjKeys.length; ++i)
            if(authObjKeys[i] !== tmpObjKeys[i]) err = 'invalid parameter, or two';
        if(err.length === 0) return { err : null };
    }
    else if(authObjKeys.length > tmpObjKeys.length) err = 'Not enough arguments';
    else if(authObjKeys.length < tmpObjKeys.length) err = 'Too many arguments';
    return { err : err };
}

function checkLogin(req) {
    return drill(req,'session.data.ryanthefarmer.loggedIn', false);
}

function drill(p,a,d){a=a.split(".");for(var i=0;i<a.length;i++){if(p[a[i]]===undefined){return d;}p=p[a[i]];}return p;}

module.exports = amr.routes;
