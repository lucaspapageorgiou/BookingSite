(function () {
  "use strict";

  var AUTO_ADVANCE_MS = 6000;

  document.querySelectorAll("[data-carousel]").forEach(function (root) {
    var slides = Array.prototype.slice.call(root.querySelectorAll(".carousel-slide"));
    var dotsWrap = root.querySelector(".carousel-dots");
    var prevBtn = root.querySelector('[data-carousel-action="prev"]');
    var nextBtn = root.querySelector('[data-carousel-action="next"]');
    var current = 0;
    var timer = null;

    if (!slides.length) {
      return;
    }

    var dots = slides.map(function (_, i) {
      var dot = document.createElement("button");
      dot.className = "carousel-dot";
      dot.type = "button";
      dot.setAttribute("aria-label", "Go to slide " + (i + 1) + " of " + slides.length);
      dot.addEventListener("click", function () {
        goTo(i);
        restartTimer();
      });
      dotsWrap.appendChild(dot);
      return dot;
    });

    function render() {
      slides.forEach(function (slide, i) {
        slide.classList.toggle("is-active", i === current);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === current);
      });
    }

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      render();
    }

    function next() {
      goTo(current + 1);
    }

    function prev() {
      goTo(current - 1);
    }

    function restartTimer() {
      if (timer) {
        window.clearInterval(timer);
      }
      timer = window.setInterval(next, AUTO_ADVANCE_MS);
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        next();
        restartTimer();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        prev();
        restartTimer();
      });
    }

    root.addEventListener("mouseenter", function () {
      if (timer) {
        window.clearInterval(timer);
      }
    });

    root.addEventListener("mouseleave", restartTimer);

    render();
    restartTimer();
  });
})();
