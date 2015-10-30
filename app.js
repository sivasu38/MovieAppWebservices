var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();
var server = require('http').Server(app);

var r = require('rethinkdbdash')({servers : [{host:'localhost', port:28015}]});


app.use('/', routes);
app.use('/users', users);

app.get('/getAllMoviesDetails',function(req,res)
{
  r.db('MovieApp').table('MovieDetails').run().then(function(results,err)
  {
    if(!err)
      res.send(results);
    else
    {
      res.send(err);
    }
  });
});

module.exports = app;
app.listen(4000);