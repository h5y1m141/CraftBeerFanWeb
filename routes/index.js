(function() {
  exports.index = function(req, res) {
    return res.render('index', {
      title: 'CraftBeerFan'
    });
  };

}).call(this);
