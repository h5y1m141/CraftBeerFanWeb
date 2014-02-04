var startLatitude = 35.681382;
var startLongitude = 139.766084;

$(document).ready(function(){
	var mapOptions = {
		zoom: 15,
		center: new google.maps.LatLng(startLatitude,startLongitude),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

	var startData = {
		latitude:startLatitude,
		longitude:startLongitude
	};
	callACS(startData,map);

	google.maps.event.addListener(map, "dragend", function(e) {
		var pos = map.getCenter();
		var lat = pos.lat();
		var lng = pos.lng();

		var data = {
			latitude:lat.toFixed(6),
			longitude:lng.toFixed(6)
		};
		callACS(data,map);

	});
});


function attachMessage(marker) {

	google.maps.event.addListener(marker, 'click', function() {
		new google.maps.Geocoder().geocode({
			latLng: marker.getPosition()
		}, function(result, status) {
			console.log(result);
			if (status == google.maps.GeocoderStatus.OK) {
				new google.maps.InfoWindow({
					content: "<h3>" + marker.title + "</h3><p>" + marker.shopInfo + "</p>"
				}).open(marker.getMap(), marker);
			}
		});
	});
}


function callACS(data,map){

	$.ajax({
		url: "/shop/find",
		type: "POST",
		data: data,
		success:function(items){
			for(var i = 0; i < items.length; i++) {
				var _latlng = new google.maps.LatLng(items[i].latitude,items[i].longitude),shopInfo;
				if(typeof items[i].custom_fields.shopInfo ==='undefined'){
					shopInfo = 'なし';
				}else{
					shopInfo = items[i].custom_fields.shopInfo;
				}
				var _marker = new google.maps.Marker({
					position:_latlng,
					title:items[i].name,
					shopInfo:shopInfo,
					shopFlg:items[i].custom_fields.shopFlg
				});
				attachMessage(_marker);
				_marker.setMap(map);

			}
		}
	});	
}
