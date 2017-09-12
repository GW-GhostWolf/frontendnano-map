"use strict";
var map = map || {};

map.initMap = function () {
    map.googleMap = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 29.4241219, lng: -98.4936282 },
        zoom: 12
    });
    //var geocoder = new google.maps.Geocoder();
    //function geocodeReturn(results, status) {
    //    if (status == google.maps.GeocoderStatus.OK) {
    //        this.latlng = results[0].geometry.location;
    //        this.marker = new google.maps.Marker({
    //            position: this.latlng,
    //            map: map.googleMap
    //        });
    //        console.log(this);
    //    } else {
    //        alert('Geocode was not successful for the following reason: ' + status);
    //    }
    //}
    app.PlaceList().forEach((place) => {
        //if (!place.latlng) {
        //    geocoder.geocode({ "address": place.street + ", " + place.city + ", " + place.state }, (results, status) => {
        //        geocodeReturn.call(place, results, status);
        //    });
        //} else {
            place.marker = new google.maps.Marker({
                position: place.latlng,
                map: map.googleMap
            });
        //}
    });
};
