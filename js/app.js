var app = app || {};

// watch for resize event in browser to hide places menu if the screen is too small
document.body.onresize = function () {
    app.showPlaces(document.body.clientWidth > 576);
};

// base view model
app.flikrError = ko.observable(false);
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
    // verfiy that the selection actually changed
    if (app.priorPlace() && app.priorPlace().name === selectedPlace.name) { return; }
    // deselect the prior selection
    if (app.priorPlace()) { app.priorPlace().setSelected(false); }
    // center the map
    map.googleMap.setCenter(selectedPlace.marker.getPosition());
    // select the new place
    selectedPlace.setSelected(true);
    // set current place to be the prior place for next selection
    app.priorPlace(selectedPlace);
};

// function to filter places in the list and hide markers if they are not in the list
app.filteredPlaces = ko.computed(function () {
    return ko.utils.arrayFilter(app.PlaceList(), function (place) {
        let showInList =
            // verify that the place name matches the text filter
            place.name.toLowerCase().indexOf(app.placeFilter().toLowerCase()) > -1 && 
            // verify that the category is selected or no category (all) is selected
            (app.categoryFilter().length === 0 || app.categoryFilter().join(",").indexOf(place.category) > -1);
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
};

// bootstrap application by checking the size of the window and applying the knockoutjs viewmodel
document.body.onresize();
ko.applyBindings(app);