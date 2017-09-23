// create knockoutjs component for place list item
ko.components.register("place", {
    viewModel: function (params) {
        this.place = params.place;
    },
    template: `
        <div class ="place" data-bind="{ css: { selected: place.selected() } }">
            <span data-bind="text: place.name"></span>
            <address class="small-text" data-bind="text: place.category"></address>
        </div>`
});
