(function () {
  "use strict";

  if (!window.L) {
    return;
  }

  document.querySelectorAll("[data-map-lat][data-map-lng]").forEach(function (el) {
    var lat = parseFloat(el.getAttribute("data-map-lat"));
    var lng = parseFloat(el.getAttribute("data-map-lng"));
    var radius = parseFloat(el.getAttribute("data-map-radius")) || 800;

    if (isNaN(lat) || isNaN(lng)) {
      return;
    }

    var map = L.map(el, {
      scrollWheelZoom: false,
      zoomControl: true
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 17,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var circle = L.circle([lat, lng], {
      radius: radius,
      color: "#37432c",
      fillColor: "#4c5c3e",
      fillOpacity: 0.25,
      weight: 2
    }).addTo(map);

    map.fitBounds(circle.getBounds(), { padding: [10, 10] });
  });
})();
