let vm = {
    showPlaces: ko.observable(true),
    showDetails: ko.observable(false),

    toggleSidebar: function () {
        this.showPlaces(!this.showPlaces());
    },

    toggleDetails: function () {
        this.showDetails(!this.showDetails());
    }
}

ko.applyBindings(vm);