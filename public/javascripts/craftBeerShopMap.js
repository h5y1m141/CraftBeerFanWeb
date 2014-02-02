$(document).ready(function(){
	var mapOptions = {
		zoom: 14,
		center: new google.maps.LatLng(35.677321,139.737483),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

	google.maps.event.addListener(map, "dragend", function(e) {
		var pos = map.getCenter();
		var lat = pos.lat();
		var lng = pos.lng();
		// alert("latitude:"+lat.toFixed(6)+"longitude"+lng.toFixed(6));
		var data = {
			latitude:lat.toFixed(6),
			longitude:lng.toFixed(6)
		};
		$.ajax({
			url: "/shop/find",
			type: "POST",
			data: data,
			success:function(items){
				for(var i = 0; i < items.length; i++) {
					var _latlng = new google.maps.LatLng(items[i].latitude,items[i].longitude);
					var _marker = new google.maps.Marker({
						position:_latlng,
						title:items[i].name
					});
					_marker.setMap(map);

				}
			}
		});
	});

});
