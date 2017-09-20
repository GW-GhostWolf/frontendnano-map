"use strict";
var map = map || {};

map.initMap = function () {
    map.googleMap = new google.maps.Map(document.getElementById('mapDiv'), {
        center: { lat: 29.4241219, lng: -98.4936282 },
        zoom: 12
    });
    map.bounds = new google.maps.LatLngBounds();
    app.PlaceList().forEach((place) => {
        map.bounds.extend(place.latlng);
        place.marker = new google.maps.Marker({
            position: place.latlng,
            icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
            map: map.googleMap
        });
        place.marker.addListener("click", () => { app.selectPlace(place); });
    });
    map.googleMap.fitBounds(map.bounds);
};
