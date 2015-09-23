# Meteor with gmaps
Super simple gmaps api example with markers while observing collection.

```javascript
 Markers.find().observe({
            changed: function (first, second) {
               marker.setPosition({lat: Number(second.lat), lng: Number(second.lng)});
            }
       });
```

```javascript
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
```
