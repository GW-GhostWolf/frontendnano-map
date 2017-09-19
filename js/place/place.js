ko.components.register("place", {
    viewModel: function (params) {
        this.place = params.place;
    },
    template: `
        <div class ="place" data-bind="{ css: { selected: place.selected() } }">
            <span data-bind="text: place.name"></span>
            <address data-bind="text: place.street"></address>
        </div>`
});
