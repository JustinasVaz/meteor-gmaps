Router.route('/', {

    action: function () {
        if (this.ready())
            return true;
    }
});

Markers = new Meteor.Collection('markers');


if (Meteor.isClient) {

    Template.locations.events({
        'click .directions': function (evt, tmpl) {
            var item = evt.target;
            var lat = $(item).attr('lat');
            var lng = $(item).attr('lng');
            var marker = Markers.findOne();
            if (marker) {
                Markers.update(marker._id, {
                    $set: {
                        lat: lat,
                        lng: lng
                    }
                });
                console.log('updated');
            } else {
                Markers.insert({
                    lat: lat,
                    lng: lng
                });
                console.log('inserted');
            }
        }
    });




    var map;
    Template.mapview.rendered = function () {

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;

        directionsDisplay = new google.maps.DirectionsRenderer({
            suppressMarkers: true
        });




            map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: {lat: 54.688486, lng: 25.279861},
            zoom: 14
        });

        var waypts = [
            {
                location: {lat: 54.695533, lng: 25.295609},
                stopover: true
            }];

        createMarker();

        function createMarker() {


            var image = {
                url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAADFBMVEUAAADAwMD////cMTHYIE0PAAAAAXRSTlMAQObYZgAAAEFJREFUeF5lytEJACEMA9BAB3DPm+kmKAVXEFyoAwgxWPDHBN5HCIBMYXPI1gRILUYu+fkv3eO1PtfOON4dqZaVDa25JKCSbwixAAAAAElFTkSuQmCC',
                // This marker is 20 pixels wide by 32 pixels high.
                size: new google.maps.Size(20, 32),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32)
            };

            var marker = new google.maps.Marker({
                position: {lat: 54.688518, lng: 25.279890},
                map: map,
                title: 'First',
                icon: image
            });


            Markers.find().observe({
                changed: function(first, second) {
                    marker.setPosition({ lat: Number(second.lat), lng: Number(second.lng) });
                }
            });

            marker.addListener('click', test);
        }

        function test() {
            console.log('clicked');
        }

        directionsDisplay.setMap(map);
        directionsService.route({
            origin: {lat: 54.688518, lng: 25.279890},
            destination: {lat: 54.705425, lng: 25.304387},
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING
        }, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            } else {
                console.log('something went wrong mate' + status)
            }
        });

    };
}