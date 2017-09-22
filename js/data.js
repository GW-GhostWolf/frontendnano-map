"use strict";
var app = app || {};

app.Place = function (dataObject) {
    this.name = dataObject.name;
    this.latlng = { lat: dataObject.latitude, lng: dataObject.longitude };
    this.street = dataObject.category;
    this.selected = ko.observable(false);
}

//app.PlaceList = ko.observableArray([
//{ selected: ko.observable(false), atlasId: 4200000360, name: 'The Alamo', latlng: { lat: 29.425745, lng: -98.4861562 }, street: '300 Alamo Plaza', city: 'San Antonio', state: 'TX', zip: 78205, website: 'http://thealamo.org' },
//{ selected: ko.observable(false), atlasId: 4200000362, name: 'Fort Sam Houston Museum', latlng: { lat: 29.4430611, lng: -98.46114449999999 }, street: '1947 N New Braunfels Ave', city: 'Ft. Sam Houston', state: 'TX', zip: 78234, website: 'http://www.arnorth.army.mil/units/fsh-museum' },
//{ selected: ko.observable(false), atlasId: 4200000365, name: 'Institute of Texan Cultures', latlng: { lat: 29.41704, lng: -98.48221799999999 }, street: '801 S Bowie St', city: 'San Antonio', state: 'TX', zip: 78205, website: 'http://www.texancultures.com/' },
//{ selected: ko.observable(false), atlasId: 4200000368, name: 'San Antonio Missions NHP Visitor Center', latlng: { lat: 29.3818958, lng: -98.4822532 }, street: '2202 Roosevelt Ave', city: 'San Antonio', state: 'TX', zip: 78210, website: 'https://www.nps.gov/SAAN/index.htm' },
//{ selected: ko.observable(false), atlasId: 4200000370, name: 'Spanish Governor\'s Palace', latlng: { lat: 29.4248246, lng: -98.4946205 }, street: '105 Military Plaza', city: 'San Antonio', state: 'TX', zip: 78283, website: 'http://www.spanishgovernorspalace.org/' },
//{ selected: ko.observable(false), atlasId: 4200000371, name: 'Edward Steves Homestead', latlng: { lat: 29.4126867, lng: -98.49535309999999 }, street: '509 King William Street', city: 'San Antonio', state: 'TX', zip: 78204, website: 'http://saconservation.org' },
//{ selected: ko.observable(false), atlasId: 4200000373, name: 'Texas Transportation Museum', latlng: { lat: 29.5481359, lng: -98.4352188 }, street: '11731 Wetmore Road', city: 'San Antonio', state: 'TX', zip: 78247, website: 'http://txtransportationmuseum.org' },
//{ selected: ko.observable(false), atlasId: 4200000374, name: 'US Army Medical Department Museum', latlng: { lat: 29.4515635, lng: -98.4515224 }, street: '2310 Stanley Road  Bldg 1046', city: 'Ft Sam Houston', state: 'TX', zip: 78234, website: 'http://www.ameddmuseumfoundation.org' },
//{ selected: ko.observable(false), atlasId: 4200000375, name: 'Witte Museum', latlng: { lat: 29.4617383, lng: -98.46731029999999 }, street: '3801 Broadway', city: 'San Antonio', state: 'TX', zip: 78209, website: 'http://wittemuseum.org' },
//{ selected: ko.observable(false), atlasId: 4200000582, name: 'USAF Security Forces Museum', latlng: { lat: 29.3907639, lng: -98.6325877 }, street: '1300 Femoyer Street, Lackland Air Force Base', city: 'San Antonio', state: 'TX', zip: 78227, website: 'http://www.securityforcesmuseum.org/' },
//{ selected: ko.observable(false), atlasId: 4200000584, name: 'Casa Navarro State Historic Site', latlng: { lat: 29.4232009, lng: -98.4973483 }, street: '228 S Laredo St', city: 'San Antonio', state: 'TX', zip: 78207, website: 'http://www.thc.state.tx.us/historic-sites' },
//{ selected: ko.observable(false), atlasId: 4200000589, name: 'Magic Lantern Castle Museum', latlng: { lat: 29.4922535, lng: -98.4387387 }, street: '1419 Austin Hwy', city: 'San Antonio', state: 'TX', zip: 78209, website: 'http://magiclanterns.org' },
//{ selected: ko.observable(false), atlasId: 4200000815, name: 'Texas Air Museum at Stinson Field', latlng: { lat: 29.3398035, lng: -98.47596519999999 }, street: '1234 99th Street', city: 'San Antonio', state: 'TX', zip: 78214, website: 'http://www.texasairmuseum.org/' },
//{ selected: ko.observable(false), atlasId: 4200000988, name: 'Northside Independent School District School Museum', latlng: { lat: 29.4937213, lng: -98.6177536 }, street: '6632 Bandera Road, Bldg. A', city: 'San Antonio', state: 'TX', zip: 78238, website: 'https://nisd.net/community/museum' },
//{ selected: ko.observable(false), atlasId: 4200001070, name: 'Villa Finale', latlng: { lat: 29.4139217, lng: -98.49430839999999 }, street: '401 King William Street', city: 'San Antonio', state: 'TX', zip: 78204, website: 'http://www.villafinale.org/' },
//{ selected: ko.observable(false), atlasId: 4200001138, name: 'South Texas Heritage Center', latlng: { lat: 29.4617383, lng: -98.46731029999999 }, street: '3801 Broadway', city: 'San Antonio', state: 'TX', zip: 78209, website: 'http://sthc.wittemuseum.org/' },
//{ selected: ko.observable(false), atlasId: 4200001140, name: 'Buckhorn Museum and Texas Ranger Museum', latlng: { lat: 29.426205, lng: -98.488951 }, street: '318 E. Houston Street', city: 'San Antonio', state: 'TX', zip: 78205, website: 'http://www.buckhornmuseum.com/' },
//{ selected: ko.observable(false), atlasId: 4200001141, name: 'Texas A&M University-San Antonio Educational and Cultural Arts Center', latlng: { lat: 29.4252942, lng: -98.49857430000002 }, street: '101 S. Santa Rosa Avenue', city: 'San Antonio', state: 'TX', zip: 78207, website: 'http://www2.tamusa.tamus.edu/tamusacampuses' },
//{ selected: ko.observable(false), atlasId: 4200001142, name: 'Guenther House', latlng: { lat: 29.41146, lng: -98.49581889999999 }, street: '205 E. Guenther St', city: 'San Antonio', state: 'TX', zip: 78204, website: 'https://www.guentherhouse.com/' },
//{ selected: ko.observable(false), atlasId: 4200001143, name: 'Holocaust Memorial Museum of San Antonio', latlng: { lat: 29.5571903, lng: -98.5331932 }, street: '12500 NW Military Hwy', city: 'San Antonio', state: 'TX', zip: 78213, website: 'http://hmmsa.org/' },
//{ selected: ko.observable(false), atlasId: 4200001144, name: 'O. Henry House Museum', latlng: { lat: 29.4244069, lng: -98.49672969999999 }, street: '601 Dolorosa Street', city: 'San Antonio', state: 'TX', zip: 78207, website: 'http://ohenryhouse.org/' },
//{ selected: ko.observable(false), atlasId: 4200001145, name: 'Wooden Nickel Historical Museum', latlng: { lat: 29.4565167, lng: -98.4563414 }, street: '345 Old Austin Road', city: 'San Antonio', state: 'TX', zip: 78209, website: 'http://www.wooden-nickel.com/museum' },
//{ selected: ko.observable(false), atlasId: 4200001146, name: 'Yturri Edmunds Historic Site', latlng: { lat: 29.3989523, lng: -98.48779789999999 }, street: '128 Mission Road', city: 'San Antonio', state: 'TX', zip: 78204, website: 'https://www.saconservation.org/' }
//]);

app.rawData = [
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
     "name": "Big Thunder Mtn",
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
     "name": "Casey Jr Splash",
     "touringPlansLink": "casey-jr-splash-n-soak-station",
     "category": "entertainment",
     "latitude": 28.420902,
     "longitude": -81.57868
 },
 {
     "name": "Country Bears",
     "touringPlansLink": "country-bear-jamboree",
     "category": "entertainment",
     "latitude": 28.418799,
     "longitude": -81.583772
 },
 {
     "name": "Festival Parade",
     "touringPlansLink": "festival-fantasy-parade",
     "category": "entertainment",
     "latitude": 28.416481,
     "longitude": -81.581203
 },
 {
     "name": "Dumbo",
     "touringPlansLink": "dumbo-the-flying-elephant",
     "category": "ride",
     "latitude": 28.420276,
     "longitude": -81.578846
 },
 {
     "name": "Ench Tales W/ Belle",
     "touringPlansLink": "enchanted-tales-with-belle",
     "category": "entertainment",
     "latitude": 28.420981,
     "longitude": -81.581014
 },
 {
     "name": "Flag Retreat",
     "touringPlansLink": "flag-retreat",
     "category": "entertainment",
     "latitude": 28.416481,
     "longitude": -81.581203
 },
 {
     "name": "Frontierland Shootin'",
     "touringPlansLink": "frontierland-shootin-arcade",
     "category": "entertainment",
     "latitude": 28.418791,
     "longitude": -81.583216
 },
 {
     "name": "Hall Of Presidents",
     "touringPlansLink": "hall-of-presidents",
     "category": "entertainment",
     "latitude": 28.419413,
     "longitude": -81.582335
 },
 {
     "name": "Happily Fireworks",
     "touringPlansLink": "happily-ever-after",
     "category": "entertainment",
     "latitude": 28.416481,
     "longitude": -81.581203
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
     "name": "Liberty Sq Riverboat",
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
     "name": "Winnie The Pooh",
     "touringPlansLink": "many-adventures-of-winnie-the-pooh",
     "category": "ride",
     "latitude": 28.420102,
     "longitude": -81.580262
 },
 {
     "name": "Ariel's Grotto",
     "touringPlansLink": "ariels-grotto",
     "category": "character",
     "latitude": 28.420936,
     "longitude": -81.579677
 },
 {
     "name": "Princess Hall: Cinderella/elena",
     "touringPlansLink": "princess-fairytale-hall-elena-cinderella",
     "category": "character",
     "latitude": 28.420007,
     "longitude": -81.581007
 },
 {
     "name": "Pete's: Goofy/donald",
     "touringPlansLink": "petes-silly-sideshow-goofy-donald",
     "category": "character",
     "latitude": 28.421385,
     "longitude": -81.57905
 },
 {
     "name": "Pete's: Minnie/daisy",
     "touringPlansLink": "petes-silly-sideshow-minnie-daisy",
     "category": "character",
     "latitude": 28.421385,
     "longitude": -81.57905
 },
 {
     "name": "Town Sq Mickey",
     "touringPlansLink": "town-square-theater-mickey-mouse",
     "category": "character",
     "latitude": 28.41675,
     "longitude": -81.580819
 },
 {
     "name": "Princess Hall: Rapunzel/tiana",
     "touringPlansLink": "princess-fairytale-hall-rapunzel-tiana",
     "category": "character",
     "latitude": 28.420007,
     "longitude": -81.581007
 },
 {
     "name": "Town Sq Tink",
     "touringPlansLink": "town-square-theater-tinker-bell",
     "category": "character",
     "latitude": 28.41675,
     "longitude": -81.580819
 },
 {
     "name": "Laugh Floor",
     "touringPlansLink": "monsters-inc-laugh-floor",
     "category": "entertainment",
     "latitude": 28.418351,
     "longitude": -81.579573
 },
 {
     "name": "Muppets History",
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
     "name": "Regal Carrousel",
     "touringPlansLink": "prince-charming-regal-carrousel",
     "category": "ride",
     "latitude": 28.420158,
     "longitude": -81.581192
 },
 {
     "name": "7 Dwarfs Train",
     "touringPlansLink": "seven-dwarfs-mine-train",
     "category": "ride",
     "latitude": 28.420363,
     "longitude": -81.580492
 },
 {
     "name": "Sorcerers Of The Mk",
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
     "name": "Stitch's Escape",
     "touringPlansLink": "stitchs-great-escape",
     "category": "ride",
     "latitude": 28.418594,
     "longitude": -81.579659
 },
 {
     "name": "Swiss Family Tree",
     "touringPlansLink": "swiss-family-treehouse",
     "category": "entertainment",
     "latitude": 28.418234,
     "longitude": -81.583034
 },
 {
     "name": "Tom Sawyer Island",
     "touringPlansLink": "tom-sawyer-island",
     "category": "entertainment",
     "latitude": 28.419694,
     "longitude": -81.583283
 },
 {
     "name": "Tom'land Speedway",
     "touringPlansLink": "tomorrowland-speedway",
     "category": "ride",
     "latitude": 28.419403,
     "longitude": -81.579375
 },
 {
     "name": "Peoplemover",
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
 },
 {
     "name": "Railroad Fantasyland",
     "touringPlansLink": "walt-disney-world-railroad-fantasyland-station",
     "category": "ride",
     "latitude": 28.421113,
     "longitude": -81.578374
 },
 {
     "name": "Railroad Frontierland",
     "touringPlansLink": "walt-disney-world-railroad-frontierland-station",
     "category": "ride",
     "latitude": 28.419675,
     "longitude": -81.585069
 },
 {
     "name": "Railroad Main St",
     "touringPlansLink": "walt-disney-world-railroad-main-street-usa-station",
     "category": "ride",
     "latitude": 28.416587,
     "longitude": -81.581195
 },
 {
     "name": "Carousel Of Progress",
     "touringPlansLink": "walt-disneys-carousel-of-progress",
     "category": "entertainment",
     "latitude": 28.417753,
     "longitude": -81.578843
 },
 {
     "name": "Enchanted Tiki Rm",
     "touringPlansLink": "enchanted-tiki-room",
     "category": "entertainment",
     "latitude": 28.41826,
     "longitude": -81.583706
 }
];