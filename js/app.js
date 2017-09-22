"use strict";
var app = app || {};

document.body.onresize = function () {
    app.showPlaces(document.body.clientWidth > 576);
}

app.showPlaces = ko.observable(false);
document.body.onresize();
app.showDetails = ko.observable(false);
app.placeFilter = ko.observable("");
app.priorPlace = ko.observable();

app.PlaceList = ko.observableArray([]);
app.rawData.forEach((rawPlace) => {
    app.PlaceList().push(new app.Place(rawPlace));
});

app.toggleSidebar = function () {
    app.showPlaces(!app.showPlaces());
};

app.toggleDetails = function () {
    app.showDetails(!app.showDetails());
};

app.selectPlace = function (selectedPlace) {
    if (app.priorPlace()) {
        app.priorPlace().marker.setIcon("https://maps.google.com/mapfiles/ms/icons/red-dot.png");
        app.priorPlace().selected(false);
    }
    app.priorPlace(selectedPlace);
    selectedPlace.marker.setIcon("https://maps.google.com/mapfiles/ms/icons/green-dot.png");
    selectedPlace.selected(true);
    $.getJSON("https://gw-ghostwolf.github.io/frontendnano-map/data/" + selectedPlace.dataLink + ".json", (data) => {
        map.infoWindow.setContent("<h3 class='remove-margin'>" + selectedPlace.name + "</h4>" +
            data.what_it_is + "<br />" +
            (data.not_to_be_missed ? "This is a MUST DO!<br />" : "") +
            (data.intense ? "" : "Not ") + "Intense, " + (data.frightening ? "" : "Not ") + "Frightening <br />" +
            (data.height_restriction ? "Minimum Height: " + data.height_restriction + "\" <br />" : "") +
            "<a href='javascript:app.toggleDetails();'>Show Pictures</a><br />" +
            "<span class='small-text'>* Data courtesy of <a href='https://touringplans.com/magic-kingdom/attractions/" + selectedPlace.dataLink + "' target='_blank'>Touring Plans</a></span>");
        map.infoWindow.open(map.googleMap, selectedPlace.marker);
    });
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