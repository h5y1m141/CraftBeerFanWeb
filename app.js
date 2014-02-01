(function() {
  var app, conf, express, http, path, routes;

  express = require('express');

  routes = require('./routes');

  http = require('http');

  path = require('path');

  conf = require('config');

  app = express();

  app.set('port', process.env.PORT || 3000);

  app.set('views', path.join(__dirname, 'views'));

  app.set('view engine', 'jade');

  app.use(express["static"](path.join(__dirname, "public")));

  app.use(express.favicon(__dirname + "/public/images/favicon.ico"));

  app.use(express.logger('dev'));

  app.use(express.json());

  app.use(express.urlencoded());

  app.use(express.methodOverride());

  app.use(app.router);

  if (app.get('env') === 'development') {
    app.use(express.errorHandler());
  }

  app.get('/', routes.index);

  http.createServer(app).listen(app.get('port'), function() {
    return console.log("Express server listening on port " + (app.get('port')));
  });

}).call(this);
