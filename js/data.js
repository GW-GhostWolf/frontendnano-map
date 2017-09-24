 "use strict";
var app = app || {};

// create Place class to store data on each location
app.Place = function (dataObject) {
    this.name = dataObject.name;
    this.latlng = { lat: dataObject.latitude, lng: dataObject.longitude };
    this.category = dataObject.category;
    this.dataLink = dataObject.touringPlansLink;
    this.selected = ko.observable(false);
    this.photos = ko.observableArray([]);
    this.currentPage = 1;
}

// function to retrieve additional photos from flikr
app.Place.prototype.getMorePhotos = function () {
    let self = this;
    // only make one request at a time
    if (!self.requestInProgress) {
        self.requestInProgress = true;
        $.getJSON("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c7be92e6651caf2578d90bdd0fc3d515&text=&accuracy=16&lat=" + self.latlng.lat + "&lon=" + self.latlng.lng + "&radius=.025&extras=url_s&per_page=10&page=" + self.currentPage + "&format=json&nojsoncallback=1")
            .done((data) => {
                if (data.stat === "ok") {
                    // add returned photos to cache
                    data.photos.photo.forEach((photo) => {
                        app.priorPlace().photos.push(photo);
                    });
                    self.currentPage++;
                }
                self.requestInProgress = false;
            })
            .fail((err) => {
                console.log("Error communicating with Flikr", err);
                app.flikrError(true);
            });
    }
}

// function to change values when selected
app.Place.prototype.setSelected = function (isSelected) {
    let self = this;
    let infoContents = "";
    // mark as not selected
    self.selected(isSelected);
    // set marker icon
    if (self.marker) { self.setIcon(); }
    if (isSelected) {
        if (self.marker && self.dataLink) {
            // get server data (details) regarding the place and assign to the map's infowindow
            $.getJSON("https://gw-ghostwolf.github.io/frontendnano-map/data/" + self.dataLink + ".json")
                .done((data) => {
                    infoContents = "<div class='line-padding'>" +
                        "<h3 class='remove-margin'>" + self.name + "</h4>" +
                        "<span class='large-text'>" + data.what_it_is + "</span><br />" +
                        (data.not_to_be_missed ? "This is a MUST DO!<br />" : "") +
                        (data.intense ? "" : "Not ") + "Intense, " + (data.frightening ? "" : "Not ") + "Frightening <br />" +
                        (data.height_restriction ? "Minimum Height: " + data.height_restriction + "\" <br />" : "") +
                        "<a href='javascript:app.toggleDetails();'>Show Pictures</a><br />" +
                        "<span class='small-text'>* Data courtesy of <a href='https://touringplans.com/magic-kingdom/attractions/" + self.dataLink + "' target='_blank'>Touring Plans</a></span>" +
                        "</div>";
                })
                .fail((err) => {
                    console.log("Error communicating with GitHub copy of Touring Plans data", err);
                    infoContents = "<div class='line-padding'>" +
                        "<h3 class='remove-margin'>" + self.name + "</h4>" +
                        "Error Retrieving additional data <br />" +
                        "<span class='small-text'>* Data courtesy of <a href='https://touringplans.com/magic-kingdom/attractions/" + self.dataLink + "' target='_blank'>Touring Plans</a></span>" +
                        "</div>";
                })
                .always(() => {
                    map.infoWindow.setContent(infoContents);
                    map.infoWindow.open(map.googleMap, self.marker);
                });
        }
        // if there are no photos cached, get photos
        if (self.photos().length === 0) {
            self.getMorePhotos();
        }
    }
}

// function to set icon based on category and selected
app.Place.prototype.setIcon = function () {
    if (this.selected()) {
        this.marker.setIcon("https://maps.google.com/mapfiles/ms/icons/red-pushpin.png");
    } else {
        switch (this.category) {
            case "ride":
                this.marker.setIcon("https://maps.google.com/mapfiles/kml/pal4/icon39.png");
                break;
            case "entertainment":
                this.marker.setIcon("https://maps.google.com/mapfiles/ms/icons/movies.png");
                break;
            case "character":
                this.marker.setIcon("https://maps.google.com/mapfiles/ms/icons/arts.png");
                break;
            default:
                this.marker.setIcon("https://maps.google.com/mapfiles/ms/icons/red-dot.png");
                break;
        }
    }
}
