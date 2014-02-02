ACS = require("acs-node")
conf = require('config')
ACS.init(conf.apiKey.production)
exports.find = (req, res) ->
  console.log req.body
  latitude = req.body.latitude
  longitude = req.body.longitude
  # console.log "place query start latitude is #{latitude} and #{longitude}"
  ACS.Places.query
    page: 1
    per_page: 20
    where:
      lnglat:
        $nearSphere:[Number(longitude),Number(latitude)] 
        $maxDistance: 0.01
  , (e) ->
    console.log e
    if e.success
      for place in e.places
        console.log place.name
        
      res.send e.places

