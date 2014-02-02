(function() {
  var ACS, conf;

  ACS = require("acs-node");

  conf = require('config');

  ACS.init(conf.apiKey.production);

  exports.find = function(req, res) {
    var latitude, longitude;
    console.log(req.body);
    latitude = req.body.latitude;
    longitude = req.body.longitude;
    return ACS.Places.query({
      page: 1,
      per_page: 20,
      where: {
        lnglat: {
          $nearSphere: [Number(longitude), Number(latitude)],
          $maxDistance: 0.01
        }
      }
    }, function(e) {
      var place, _i, _len, _ref;
      console.log(e);
      if (e.success) {
        _ref = e.places;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          place = _ref[_i];
          console.log(place.name);
        }
        return res.send(e.places);
      }
    });
  };

}).call(this);
