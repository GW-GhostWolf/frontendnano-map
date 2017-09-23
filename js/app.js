"use strict";
var app = app || {};

// watch for resize event in browser to hide places menu if the screen is too small
document.body.onresize = function () {
    app.showPlaces(document.body.clientWidth > 576);
}

// base view model
app.showPlaces = ko.observable(false);
app.showDetails = ko.observable(false);
app.placeFilter = ko.observable("");
app.categoryFilter = ko.observableArray();
app.priorPlace = ko.observable();
// add list of places from raw data
app.PlaceList = ko.observableArray([]);
app.rawData.forEach((rawPlace) => {
    app.PlaceList().push(new app.Place(rawPlace));
});

// show / hide the places on the left side - only used on small screens
app.toggleSidebar = function () {
    app.showPlaces(!app.showPlaces());
};

// show / hide the pictures window on the bottom of the map
app.toggleDetails = function () {
    app.showDetails(!app.showDetails());
};

// change selected place
app.selectPlace = function (selectedPlace) {
    // verfiy that the selection actuall changed
    if (app.priorPlace() && app.priorPlace().name === selectedPlace.name) { return; }
    // reset marker and selected place status for prior selected place
    if (app.priorPlace()) {
        app.priorPlace().marker.setIcon("https://maps.google.com/mapfiles/ms/icons/red-dot.png");
        app.priorPlace().selected(false);
    }
    // change marker and selected status for selected place
    selectedPlace.marker.setIcon("https://maps.google.com/mapfiles/ms/icons/green-dot.png");
    selectedPlace.selected(true);
    // get server data (details) regarding the place and assign to the map's infowindow
    $.getJSON("https://gw-ghostwolf.github.io/frontendnano-map/data/" + selectedPlace.dataLink + ".json", (data) => {
        map.infoWindow.setContent("<div class='line-padding'>" + 
            "<h3 class='remove-margin'>" + selectedPlace.name + "</h4>" +
            "<span class='large-text'>" + data.what_it_is + "</span><br />" +
            (data.not_to_be_missed ? "This is a MUST DO!<br />" : "") +
            (data.intense ? "" : "Not ") + "Intense, " + (data.frightening ? "" : "Not ") + "Frightening <br />" +
            (data.height_restriction ? "Minimum Height: " + data.height_restriction + "\" <br />" : "") +
            "<a href='javascript:app.toggleDetails();'>Show Pictures</a><br />" +
            "<span class='small-text'>* Data courtesy of <a href='https://touringplans.com/magic-kingdom/attractions/" + selectedPlace.dataLink + "' target='_blank'>Touring Plans</a></span>" + 
            "</div>");
        map.infoWindow.open(map.googleMap, selectedPlace.marker);
    });
    // if there are no photos cached, get photos
    if (selectedPlace.photos().length === 0) {
        selectedPlace.getMorePhotos();
    }
    // set current place to be the prior place for next selection
    app.priorPlace(selectedPlace);
};

// function to filter places in the list and hide markers if they are not in the list
app.filteredPlaces = ko.computed(function () {
    return ko.utils.arrayFilter(app.PlaceList(), function (place) {
        let showInList =
            // verify that the place name matches the text filter
            place.name.toLowerCase().indexOf(app.placeFilter().toLowerCase()) > -1
            // verify that the category is selected or no category (all) is selected
            && (app.categoryFilter().length === 0 || app.categoryFilter().join(",").indexOf(place.category) > -1);
        if (showInList) {
            if (place.marker && !place.marker.map) { place.marker.setMap(map.googleMap); }
        } else {
            if (place.marker && place.marker.map) { place.marker.setMap(undefined); }
        }
        return showInList;
    });
});

// scroll event on pictures to see if they are near the end and need to load more pictures
app.scrolled = function (data, event) {
    let elem = event.target;
    if (elem.scrollLeft + elem.offsetWidth + 200 > elem.scrollWidth) {
        app.priorPlace().getMorePhotos();
    }
}

// bootstrap application by checking the size of the window and applying the knockoutjs viewmodel
document.body.onresize();
ko.applyBindings(app);