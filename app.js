/**
 *
 */
var express = require('express');
var path = require('path');

var conf = require('./configuration/application.js');

var index = require('./routes/index');
var region = require('./routes/region');
var area = require('./routes/area');
var city = require('./routes/city');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/region', region);
app.use('/area', area);
app.use('/city', city);

// error handlers
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

if (module.parent === null) {
  app.listen(conf.get('port'));
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
}
