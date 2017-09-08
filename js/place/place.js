ko.components.register("place", {
    viewModel: function (params) {
        this.place = params.place;
    },
    template: `
        <div class="place">
            <span data-bind="text: place.name"></span>
            <address data-bind="text: place.address"></address>
        </div>`
});
