(function() {
  exports.index = function(req, res) {
    return res.render('index', {
      title: "クラフトビール"
    });
  };

}).call(this);
