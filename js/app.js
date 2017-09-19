"use strict";
var app = app || {};

document.body.onresize = function () {
    app.showPlaces(document.body.clientWidth > 576);
}

app.showPlaces = ko.observable(false);
document.body.onresize();
app.showDetails = ko.observable(false);
app.placeFilter = ko.observable("");

app.toggleSidebar = function () {
    this.showPlaces(!this.showPlaces());
};

app.toggleDetails = function () {
    this.showDetails(!this.showDetails());
};

app.filteredPlaces = ko.computed(function () {
    return ko.utils.arrayFilter(app.PlaceList(), function (place) {
        if (place.name.toLowerCase().indexOf(app.placeFilter().toLowerCase()) > -1) {
            // it is in the list
            if (place.marker && !place.marker.map) { place.marker.setMap(map.googleMap); }
        } else {
            // it is not in the list
            if (place.marker && place.marker.map) { place.marker.setMap(undefined); }
        }
        return place.name.toLowerCase().indexOf(app.placeFilter().toLowerCase()) > -1;
    });
});

ko.applyBindings(app);