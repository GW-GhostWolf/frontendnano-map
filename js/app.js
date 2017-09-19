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
    app.showPlaces(!app.showPlaces());
};

app.toggleDetails = function () {
    app.showDetails(!app.showDetails());
};

app.selectPlace = function (selectedPlace) {
    if (app.priorPlace) {
        app.priorPlace.marker.setIcon("http://maps.google.com/mapfiles/ms/icons/red-dot.png");
        app.priorPlace.selected(false);
    }
    app.priorPlace = selectedPlace;
    selectedPlace.marker.setIcon("http://maps.google.com/mapfiles/ms/icons/green-dot.png");
    selectedPlace.selected(true);
};

app.filteredPlaces = ko.computed(function () {
    return ko.utils.arrayFilter(app.PlaceList(), function (place) {
        let showInList = place.name.toLowerCase().indexOf(app.placeFilter().toLowerCase()) > -1;
        if (showInList) {
            if (place.marker && !place.marker.map) { place.marker.setMap(map.googleMap); }
        } else {
            if (place.marker && place.marker.map) { place.marker.setMap(undefined); }
        }
        return showInList;
    });
});

ko.applyBindings(app);