"use strict";
var app = app || {};

app.PlaceList = ko.observableArray([
    { name: "Petsmart - Bitters", address: "12960 Park Central, San Antonio, TX 78216", visible: ko.observable(true) },
    { name: "Unleashed by Petco - O'Connor", address: "13909 Nacogdoches Rd #107, San Antonio, TX 78217", visible: ko.observable(true) },
]);