(function () {
  "use strict";

  var galleryImgs = Array.prototype.slice.call(document.querySelectorAll(".gallery-grid img"));

  if (!galleryImgs.length) {
    return;
  }

  var current = 0;
  var lastFocused = null;

  var overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Photo viewer");
  overlay.hidden = true;
  overlay.innerHTML =
    '<button class="lightbox-close" type="button" aria-label="Close">&times;</button>' +
    '<button class="lightbox-arrow lightbox-prev" type="button" aria-label="Previous photo">&#8249;</button>' +
    '<figure class="lightbox-figure">' +
      '<img class="lightbox-img" alt="">' +
      '<figcaption class="lightbox-caption"></figcaption>' +
    "</figure>" +
    '<button class="lightbox-arrow lightbox-next" type="button" aria-label="Next photo">&#8250;</button>';
  document.body.appendChild(overlay);

  var imgEl = overlay.querySelector(".lightbox-img");
  var captionEl = overlay.querySelector(".lightbox-caption");
  var closeBtn = overlay.querySelector(".lightbox-close");
  var prevBtn = overlay.querySelector(".lightbox-prev");
  var nextBtn = overlay.querySelector(".lightbox-next");

  function render() {
    var source = galleryImgs[current];
    imgEl.src = source.currentSrc || source.src;
    imgEl.alt = source.alt;
    captionEl.textContent = (current + 1) + " / " + galleryImgs.length;
  }

  function open(index) {
    current = index;
    lastFocused = document.activeElement;
    render();
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function close() {
    overlay.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  function next() {
    current = (current + 1) % galleryImgs.length;
    render();
  }

  function prev() {
    current = (current - 1 + galleryImgs.length) % galleryImgs.length;
    render();
  }

  galleryImgs.forEach(function (img, i) {
    img.setAttribute("tabindex", "0");
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", "View larger: " + img.alt);
    img.addEventListener("click", function () {
      open(i);
    });
    img.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open(i);
      }
    });
  });

  closeBtn.addEventListener("click", close);
  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      close();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (overlay.hidden) {
      return;
    }
    if (e.key === "Escape") {
      close();
    } else if (e.key === "ArrowRight") {
      next();
    } else if (e.key === "ArrowLeft") {
      prev();
    }
  });
})();
