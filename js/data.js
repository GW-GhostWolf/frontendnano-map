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
    self.setIcon();
    if (isSelected) {
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
                app.tpError(true);
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

// raw data, list from TouringPlaces.com, GPS locations from Google Maps
app.rawData = [
 {
     "name": "Ariel",
     "touringPlansLink": "ariels-grotto",
     "category": "character",
     "latitude": 28.420936,
     "longitude": -81.579677
 },
 {
     "name": "Astro Orbiter",
     "touringPlansLink": "astro-orbiter",
     "category": "ride",
     "latitude": 28.418493,
     "longitude": -81.579015
 },
 {
     "name": "Barnstormer",
     "touringPlansLink": "barnstormer",
     "category": "ride",
     "latitude": 28.420628,
     "longitude": -81.578438
 },
 {
     "name": "Big Thunder Mountain",
     "touringPlansLink": "big-thunder-mountain-railroad",
     "category": "ride",
     "latitude": 28.420006,
     "longitude": -81.58462
 },
 {
     "name": "Buzz Lightyear",
     "touringPlansLink": "buzz-lightyears-space-ranger-spin",
     "category": "ride",
     "latitude": 28.418215,
     "longitude": -81.57947
 },
 {
     "name": "Carousel Of Progress",
     "touringPlansLink": "walt-disneys-carousel-of-progress",
     "category": "entertainment",
     "latitude": 28.417753,
     "longitude": -81.578843
 },
 {
     "name": "Casey Jr Splash Zone",
     "touringPlansLink": "casey-jr-splash-n-soak-station",
     "category": "entertainment",
     "latitude": 28.420902,
     "longitude": -81.57868
 },
 {
     "name": "Cinderella and Elena",
     "touringPlansLink": "princess-fairytale-hall-elena-cinderella",
     "category": "character",
     "latitude": 28.420007,
     "longitude": -81.581007
 },
 {
     "name": "Country Bears Jamboree",
     "touringPlansLink": "country-bear-jamboree",
     "category": "entertainment",
     "latitude": 28.418799,
     "longitude": -81.583772
 },
 {
     "name": "Dumbo the Flying Elephant",
     "touringPlansLink": "dumbo-the-flying-elephant",
     "category": "ride",
     "latitude": 28.420276,
     "longitude": -81.578846
 },
 {
     "name": "Enchanted Tales with Belle",
     "touringPlansLink": "enchanted-tales-with-belle",
     "category": "entertainment",
     "latitude": 28.420981,
     "longitude": -81.581014
 },
 {
     "name": "Enchanted Tiki Room",
     "touringPlansLink": "enchanted-tiki-room",
     "category": "entertainment",
     "latitude": 28.41826,
     "longitude": -81.583706
 },
 {
     "name": "Fantasyland Railroad",
     "touringPlansLink": "walt-disney-world-railroad-fantasyland-station",
     "category": "ride",
     "latitude": 28.421113,
     "longitude": -81.578374
 },
 {
     "name": "Festival of Fantasy Parade",
     "touringPlansLink": "festival-fantasy-parade",
     "category": "entertainment",
     "latitude": 28.418448,
     "longitude": -81.581286
 },
 {
     "name": "Flag Retreat",
     "touringPlansLink": "flag-retreat",
     "category": "entertainment",
     "latitude": 28.416752,
     "longitude": -81.581197
 },
 {
     "name": "Frontierland Railroad",
     "touringPlansLink": "walt-disney-world-railroad-frontierland-station",
     "category": "ride",
     "latitude": 28.419675,
     "longitude": -81.585069
 },
 {
     "name": "Frontierland Shootin'",
     "touringPlansLink": "frontierland-shootin-arcade",
     "category": "entertainment",
     "latitude": 28.418791,
     "longitude": -81.583216
 },
 {
     "name": "Goofy and Donald",
     "touringPlansLink": "petes-silly-sideshow-goofy-donald",
     "category": "character",
     "latitude": 28.421385,
     "longitude": -81.57905
 },
 {
     "name": "Hall Of Presidents",
     "touringPlansLink": "hall-of-presidents",
     "category": "entertainment",
     "latitude": 28.419413,
     "longitude": -81.582335
 },
 {
     "name": "Happily Ever After Fireworks",
     "touringPlansLink": "happily-ever-after",
     "category": "entertainment",
     "latitude": 28.418882,
     "longitude": -81.581210
 },
 {
     "name": "Haunted Mansion",
     "touringPlansLink": "haunted-mansion",
     "category": "ride",
     "latitude": 28.420169,
     "longitude": -81.582892
 },
 {
     "name": "It's A Small World",
     "touringPlansLink": "its-a-small-world",
     "category": "ride",
     "latitude": 28.420492,
     "longitude": -81.582043
 },
 {
     "name": "Jungle Cruise",
     "touringPlansLink": "jungle-cruise",
     "category": "ride",
     "latitude": 28.417928,
     "longitude": -81.583493
 },
 {
     "name": "Let The Magic Begin",
     "touringPlansLink": "magic-kingdom-welcome-show",
     "category": "entertainment",
     "latitude": 28.416481,
     "longitude": -81.581203
 },
 {
     "name": "Liberty Square Riverboat",
     "touringPlansLink": "liberty-square-riverboat",
     "category": "ride",
     "latitude": 28.41958,
     "longitude": -81.582804
 },
 {
     "name": "Mad Tea Party",
     "touringPlansLink": "mad-tea-party",
     "category": "ride",
     "latitude": 28.419978,
     "longitude": -81.579761
 },
 {
     "name": "Magic Carpets",
     "touringPlansLink": "magic-carpets-of-aladdin",
     "category": "ride",
     "latitude": 28.418437,
     "longitude": -81.583462
 },
 {
     "name": "Main Street Railroad",
     "touringPlansLink": "walt-disney-world-railroad-main-street-usa-station",
     "category": "ride",
     "latitude": 28.416587,
     "longitude": -81.581195
 },
 {
     "name": "Many Adventures of Winnie the Pooh",
     "touringPlansLink": "many-adventures-of-winnie-the-pooh",
     "category": "ride",
     "latitude": 28.420102,
     "longitude": -81.580262
 },
 {
     "name": "Mickey Mouse",
     "touringPlansLink": "town-square-theater-mickey-mouse",
     "category": "character",
     "latitude": 28.41675,
     "longitude": -81.580819
 },
 {
     "name": "Minnie and Daisy",
     "touringPlansLink": "petes-silly-sideshow-minnie-daisy",
     "category": "character",
     "latitude": 28.421385,
     "longitude": -81.57905
 },
 {
     "name": "Monster Inc. Laugh Floor",
     "touringPlansLink": "monsters-inc-laugh-floor",
     "category": "entertainment",
     "latitude": 28.418351,
     "longitude": -81.579573
 },
 {
     "name": "Muppets American History",
     "touringPlansLink": "muppets-present-great-moments-in-american-history",
     "category": "entertainment",
     "latitude": 28.419365,
     "longitude": -81.582175
 },
 {
     "name": "Peter Pan's Flight",
     "touringPlansLink": "peter-pans-flight",
     "category": "ride",
     "latitude": 28.420316,
     "longitude": -81.581889
 },
 {
     "name": "Pirate's Adventure",
     "touringPlansLink": "a-pirates-adventure-treasures-of-seven-seas",
     "category": "entertainment",
     "latitude": 28.418386,
     "longitude": -81.584665
 },
 {
     "name": "Pirates Of Caribbean",
     "touringPlansLink": "pirates-of-the-caribbean",
     "category": "ride",
     "latitude": 28.41808,
     "longitude": -81.584232
 },
 {
     "name": "Prince Charming's Carrousel",
     "touringPlansLink": "prince-charming-regal-carrousel",
     "category": "ride",
     "latitude": 28.420158,
     "longitude": -81.581192
 },
 {
     "name": "Rapunzel and Tiana",
     "touringPlansLink": "princess-fairytale-hall-rapunzel-tiana",
     "category": "character",
     "latitude": 28.420007,
     "longitude": -81.581007
 },
 {
     "name": "Seven Dwarfs Mine Train",
     "touringPlansLink": "seven-dwarfs-mine-train",
     "category": "ride",
     "latitude": 28.420363,
     "longitude": -81.580492
 },
 {
     "name": "Sorcerers of the Magic Kingdom",
     "touringPlansLink": "sorcerers-of-the-magic-kingdom",
     "category": "entertainment",
     "latitude": 28.416963,
     "longitude": -81.581627
 },
 {
     "name": "Space Mountain",
     "touringPlansLink": "space-mountain",
     "category": "ride",
     "latitude": 28.418913,
     "longitude": -81.577992
 },
 {
     "name": "Splash Mountain",
     "touringPlansLink": "splash-mountain",
     "category": "ride",
     "latitude": 28.419358,
     "longitude": -81.5849
 },
 {
     "name": "Stitch's Great Escape",
     "touringPlansLink": "stitchs-great-escape",
     "category": "ride",
     "latitude": 28.418594,
     "longitude": -81.579659
 },
 {
     "name": "Swiss Family Treehouse",
     "touringPlansLink": "swiss-family-treehouse",
     "category": "entertainment",
     "latitude": 28.418234,
     "longitude": -81.583034
 },
 {
     "name": "Tinkerbell",
     "touringPlansLink": "town-square-theater-tinker-bell",
     "category": "character",
     "latitude": 28.41675,
     "longitude": -81.580819
 },
 {
     "name": "Tom Sawyer Island",
     "touringPlansLink": "tom-sawyer-island",
     "category": "entertainment",
     "latitude": 28.419694,
     "longitude": -81.583283
 },
 {
     "name": "Tomorrowland Speedway",
     "touringPlansLink": "tomorrowland-speedway",
     "category": "ride",
     "latitude": 28.419403,
     "longitude": -81.579375
 },
 {
     "name": "Tomorrowland Transit Authority",
     "touringPlansLink": "tomorrowland-transit-authority-peoplemover",
     "category": "ride",
     "latitude": 28.418399,
     "longitude": -81.579136
 },
 {
     "name": "Under The Sea",
     "touringPlansLink": "under-the-sea",
     "category": "ride",
     "latitude": 28.421062,
     "longitude": -81.579963
 }
];