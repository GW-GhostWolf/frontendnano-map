"use strict";
var app = app || {};

app.PlaceList = ko.observableArray([
{ atlasId: 4200000360, name: 'The Alamo', street: '300 Alamo Plaza', city: 'San Antonio', state: 'TX', zip: 78205, website: 'http://thealamo.org' },
{ atlasId: 4200000362, name: 'Fort Sam Houston Museum', street: '1947 N New Braunfels Ave', city: 'Ft. Sam Houston', state: 'TX', zip: 78234, website: 'http://www.arnorth.army.mil/units/fsh-museum' },
{ atlasId: 4200000365, name: 'Institute of Texan Cultures', street: '801 S Bowie St', city: 'San Antonio', state: 'TX', zip: 78205, website: 'http://www.texancultures.com/' },
{ atlasId: 4200000368, name: 'San Antonio Missions NHP Visitor Center', street: '2202 Roosevelt Ave', city: 'San Antonio', state: 'TX', zip: 78210, website: 'https://www.nps.gov/SAAN/index.htm' },
{ atlasId: 4200000370, name: 'Spanish Governor\'s Palace', street: '105 Military Plaza', city: 'San Antonio', state: 'TX', zip: 78283, website: 'http://www.spanishgovernorspalace.org/' },
{ atlasId: 4200000371, name: 'Edward Steves Homestead', street: '509 King William Street', city: 'San Antonio', state: 'TX', zip: 78204, website: 'http://saconservation.org' },
{ atlasId: 4200000373, name: 'Texas Transportation Museum', street: '11731 Wetmore Road', city: 'San Antonio', state: 'TX', zip: 78247, website: 'http://txtransportationmuseum.org' },
{ atlasId: 4200000374, name: 'US Army Medical Department Museum', street: '2310 Stanley Road  Bldg 1046', city: 'Ft Sam Houston', state: 'TX', zip: 78234, website: 'http://www.ameddmuseumfoundation.org' },
{ atlasId: 4200000375, name: 'Witte Museum', street: '3801 Broadway', city: 'San Antonio', state: 'TX', zip: 78209, website: 'http://wittemuseum.org' },
{ atlasId: 4200000582, name: 'USAF Security Forces Museum', street: '1300 Femoyer Street, Lackland Air Force Base', city: 'San Antonio', state: 'TX', zip: 78227, website: 'http://www.securityforcesmuseum.org/' },
{ atlasId: 4200000584, name: 'Casa Navarro State Historic Site', street: '228 S Laredo St', city: 'San Antonio', state: 'TX', zip: 78207, website: 'http://www.thc.state.tx.us/historic-sites' },
{ atlasId: 4200000589, name: 'Magic Lantern Castle Museum', street: '1419 Austin Hwy', city: 'San Antonio', state: 'TX', zip: 78209, website: 'http://magiclanterns.org' },
{ atlasId: 4200000815, name: 'Texas Air Museum at Stinson Field', street: '1234 99th Street', city: 'San Antonio', state: 'TX', zip: 78214, website: 'http://www.texasairmuseum.org/' },
{ atlasId: 4200000988, name: 'Northside Independent School District School Museum', street: '6632 Bandera Road, Bldg. A', city: 'San Antonio', state: 'TX', zip: 78238, website: 'https://nisd.net/community/museum' },
{ atlasId: 4200001070, name: 'Villa Finale', street: '401 King William Street', city: 'San Antonio', state: 'TX', zip: 78204, website: 'http://www.villafinale.org/' },
{ atlasId: 4200001138, name: 'South Texas Heritage Center', street: '3801 Broadway', city: 'San Antonio', state: 'TX', zip: 78209, website: 'http://sthc.wittemuseum.org/' },
{ atlasId: 4200001140, name: 'Buckhorn Museum and Texas Ranger Museum', street: '318 E. Houston Street', city: 'San Antonio', state: 'TX', zip: 78205, website: 'http://www.buckhornmuseum.com/' },
{ atlasId: 4200001141, name: 'Texas A&M University-San Antonio Educational and Cultural Arts Center', street: '101 S. Santa Rosa Avenue', city: 'San Antonio', state: 'TX', zip: 78207, website: 'http://www2.tamusa.tamus.edu/tamusacampuses' },
{ atlasId: 4200001142, name: 'Guenther House', street: '205 E. Guenther St', city: 'San Antonio', state: 'TX', zip: 78204, website: 'https://www.guentherhouse.com/' },
{ atlasId: 4200001143, name: 'Holocaust Memorial Museum of San Antonio', street: '12500 NW Military Hwy', city: 'San Antonio', state: 'TX', zip: 78213, website: 'http://hmmsa.org/' },
{ atlasId: 4200001144, name: 'O. Henry House Museum', street: '601 Dolorosa Street', city: 'San Antonio', state: 'TX', zip: 78207, website: 'http://ohenryhouse.org/' },
{ atlasId: 4200001145, name: 'Wooden Nickel Historical Museum', street: '345 Old Austin Road', city: 'San Antonio', state: 'TX', zip: 78209, website: 'http://www.wooden-nickel.com/museum' },
{ atlasId: 4200001146, name: 'Yturri Edmunds Historic Site', street: '128 Mission Road', city: 'San Antonio', state: 'TX', zip: 78204, website: 'https://www.saconservation.org/' }
]);