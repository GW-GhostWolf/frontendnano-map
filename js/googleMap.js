"use strict";
var map = map || {};

// initialize map - called back from loading google maps api
map.initMap = function () {
    // find the map container on the page and load initial values
    map.googleMap = new google.maps.Map(document.getElementById('mapDiv'), {
        center: { lat: 28.418882, lng: -81.581210 },
        zoom: 16
    });
    // create bounding object to calculate bounds
    map.bounds = new google.maps.LatLngBounds();
    // add single infowindow that will update each time the selected place changes
    map.infoWindow = new google.maps.InfoWindow();
    // review 1 (tip) - add event listener to reset map bounds on window resize
    google.maps.event.addDomListener(window, 'resize', function () {
        map.googleMap.fitBounds(map.bounds); // `bounds` is a `LatLngBounds` object
    });
    map.addPlaces(app.PlaceList());
};

map.mapError = function () {
    app.mapError(true);
};

map.addPlaces = function (places) {
    if (map.googleMap) {
        // add marker for each place in the list
        places.forEach((place) => {
            // adjust bounds to include place
            map.bounds.extend(place.latlng);
            // add marker to map and cache in the place object
            place.marker = new google.maps.Marker({
                position: place.latlng,
                map: map.googleMap
            });
            // add marker event listner
            place.marker.addListener("click", () => { app.selectPlace(place); });
            place.setIcon();
        });
        // adjust map based on places in list
        map.googleMap.fitBounds(map.bounds);
    }
}