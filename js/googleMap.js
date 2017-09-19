"use strict";
var map = map || {};

map.initMap = function () {
    map.googleMap = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 29.4241219, lng: -98.4936282 },
        zoom: 12
    });
    app.PlaceList().forEach((place) => {
        
        place.marker = new google.maps.Marker({
            position: place.latlng,
            //icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
            map: map.googleMap
        });
    });
};
