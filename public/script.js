var xhr = new XMLHttpRequest();

mapboxgl.accessToken = 'pk.eyJ1IjoibWFhNDU4IiwiYSI6ImNrNnhxemhqNzBxMDMzZG8yZzB0M2ZzczAifQ.QT2QvPmKjTlb4yQrzqVJjg';
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/maa458/ck6xr2a0a2ob01imw65mdc1np', // hosted style id
  center: [0, 0], // map center
  zoom: 2 // starting zoom
});
map.addControl(new mapboxgl.NavigationControl()); // add zoom and rotation controls to the map.

var d = document.createElement('div'); // create DOM element for the marker
d.id = 'marker';

marker = new mapboxgl.Marker(d, {draggable: true}); // create marker
marker.setLngLat([0, 0]);
marker.addTo(map);
var lngLat = marker.getLngLat();

var popup = new mapboxgl.Popup({ offset: 25 }).setHTML('Longitude: ' + lngLat.lng + '<br>Latitude: ' + lngLat.lat); // create popup
marker.setPopup(popup); // set popup on marker
popup.addTo(map);

function onDragEnd() {
  lngLat = marker.getLngLat();
  popup.setHTML('Longitude: ' + lngLat.lng + '<br>Latitude: ' + lngLat.lat);
  xhr.open("GET", "/getlocation?lat="+lngLat.lat+"&long="+lngLat.lng, true); 
  xhr.send();
}
marker.on('dragend', onDragEnd);
