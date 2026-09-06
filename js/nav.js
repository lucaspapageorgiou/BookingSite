(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");

  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  var overlayHeader = document.querySelector(".site-header.header-overlay");
  if (overlayHeader) {
    var updateSolid = function () {
      overlayHeader.classList.toggle("is-solid", window.scrollY > 60);
    };
    window.addEventListener("scroll", updateSolid, { passive: true });
    updateSolid();
  }
})();
