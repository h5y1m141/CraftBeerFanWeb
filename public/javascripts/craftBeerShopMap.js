$(document).ready(function(){
	var mapOptions = {
		zoom: 14,
		center: new google.maps.LatLng(35.677321,139.737483),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

});
