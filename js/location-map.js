(function () {
  "use strict";

  var containers = Array.prototype.slice.call(document.querySelectorAll("[data-map-lat][data-map-lng]"));

  if (!containers.length) {
    return;
  }

  containers.forEach(function (el) {
    el.textContent = "Loading map...";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.color = "#6b6259";
    el.style.fontSize = "0.9rem";
  });

  if (!window.L) {
    containers.forEach(function (el) {
      el.textContent = "Map could not load.";
    });
    return;
  }

  containers.forEach(function (el) {
    var lat = parseFloat(el.getAttribute("data-map-lat"));
    var lng = parseFloat(el.getAttribute("data-map-lng"));
    var radius = parseFloat(el.getAttribute("data-map-radius")) || 800;

    if (isNaN(lat) || isNaN(lng)) {
      el.textContent = "Map location not set yet.";
      return;
    }

    el.textContent = "";
    el.removeAttribute("style");

    try {
      var map = L.map(el, {
        scrollWheelZoom: false,
        zoomControl: true
      });

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
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

      window.setTimeout(function () {
        map.invalidateSize();
      }, 250);
    } catch (err) {
      el.textContent = "Map could not load.";
      if (window.console && console.error) {
        console.error("Location map failed to initialize:", err);
      }
    }
  });
})();
