(function () {
  "use strict";

  var groups = Array.prototype.slice.call(document.querySelectorAll(".room-photo"));

  if (!groups.length) {
    return;
  }

  var currentGroup = [];
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
      '<p class="lightbox-counter"></p>' +
    "</figure>" +
    '<button class="lightbox-arrow lightbox-next" type="button" aria-label="Next photo">&#8250;</button>';
  document.body.appendChild(overlay);

  var imgEl = overlay.querySelector(".lightbox-img");
  var captionEl = overlay.querySelector(".lightbox-caption");
  var counterEl = overlay.querySelector(".lightbox-counter");
  var closeBtn = overlay.querySelector(".lightbox-close");
  var prevBtn = overlay.querySelector(".lightbox-prev");
  var nextBtn = overlay.querySelector(".lightbox-next");

  function render() {
    var source = currentGroup[current];
    imgEl.src = source.currentSrc || source.src;
    imgEl.alt = source.alt;
    captionEl.textContent = source.alt;
    counterEl.textContent = currentGroup.length > 1 ? (current + 1) + " / " + currentGroup.length : "";
    var multi = currentGroup.length > 1;
    prevBtn.hidden = !multi;
    nextBtn.hidden = !multi;
  }

  function open(imgs, index) {
    currentGroup = imgs;
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
    current = (current + 1) % currentGroup.length;
    render();
  }

  function prev() {
    current = (current - 1 + currentGroup.length) % currentGroup.length;
    render();
  }

  groups.forEach(function (group) {
    var imgs = Array.prototype.slice.call(group.querySelectorAll("img"));
    if (!imgs.length) {
      return;
    }
    group.setAttribute("tabindex", "0");
    group.setAttribute("role", "button");
    group.setAttribute(
      "aria-label",
      imgs.length > 1 ? "View " + imgs.length + " photos: " + imgs[0].alt : "View larger: " + imgs[0].alt
    );
    group.addEventListener("click", function () {
      open(imgs, 0);
    });
    group.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open(imgs, 0);
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
