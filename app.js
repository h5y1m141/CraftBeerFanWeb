(function() {
  var app, conf, csrf, express, http, path, routes, shop;

  express = require('express');

  routes = require('./routes');

  shop = require('./routes/shop');

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

  app.use(express.bodyParser());

  app.use(express.cookieParser());

  app.use(express.session({
    key: "node.acs",
    secret: "craftbeerfan"
  }));

  app.use(app.router);

  app.use(function(req, res) {
    app.locals.latitude = req.session.latitude;
    return app.locals.longitude = req.session.longitude;
  });

  csrf = function(req, res, next) {
    res.locals._csrf = req.session._csrf;
    return next();
  };

  if (app.get('env') === 'development') {
    app.use(express.errorHandler());
  }

  app.get('/', routes.index);

  app.post('/shop/find', shop.find);

  http.createServer(app).listen(app.get('port'), function() {
    return console.log("Express server listening on port " + (app.get('port')));
  });

}).call(this);
