(function(){
var fontanes = { lat: 45.5450756, lng: 4.4311971 };
var gite = { lat: 45.5441883, lng: 4.4837727 };
var f1 = { lat: 45.5040887, lng: 4.563365 };
var ibis = { lat: 45.4671061, lng: 4.3754981 };
var church = { lat: 45.4798278, lng: 4.4274113 };

var map;
var directionsService;
var directionsDisplay;

// In the following example, markers appear when the user clicks on the map.
// Each marker is labeled with a single alphabetical character.
window.initMap = function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: church
  });

  // Add a marker at the center of the map.
  addMarker('fontanes', fontanes, map, 'images/icon_wedding.png');
  addMarker('gite', gite, map);
  addMarker("f1", f1, map);
  addMarker('ibis', ibis, map);
  addMarker('church', church, map, 'images/icon_church.png');

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('directions'));
}

function resetMap(){
  map.setCenter(church)
  map.setZoom(11)
  directionsDisplay.set("directions", null);
}

// Adds a marker to the map.
function addMarker(id, location, map, icon) {
   icon = icon || undefined
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    icon:icon
  });

  $(".col." + id).data('location', location)
  $(".col." + id).data('marker', marker)
  marker.addListener('click', function(){
    $(".col." + id + " .card img").click()
  });

  return marker;
}

$(".col").hover(function() {
  $(this).siblings().addClass("grayscale");
  if($(this).data("marker")){
    $(this).data("marker").setAnimation(google.maps.Animation.BOUNCE);
  }
}, function() {
  $(this).siblings().removeClass("grayscale");
  if($(this).data("marker")) {
    $(this).data("marker").setAnimation(null);
  }
});

$(".card img, .card .side-b").click(function() {
  var isFlipped = $(this).parents('.card').hasClass('flipped')
  $('.card').removeClass("flipped");
  if(isFlipped){
    return resetMap()
  }

  $(this).parents('.card').addClass("flipped");
  var location = $(this).parents('.col').data('location')

  if($(this).parents('.col').hasClass('fontanes')){
    return
  }

  calculateAndDisplayRoute(location);
  $("#directions").detach().appendTo($(this).parents('.col').find('.side-b'));
});

function calculateAndDisplayRoute(destination) {
  directionsService.route({
    origin: fontanes,
    destination: destination,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

})()
