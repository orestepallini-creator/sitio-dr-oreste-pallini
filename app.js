/* Animaciones suaves al hacer scroll y cierre del menú móvil. Sin dependencias. */
(function () {
  var reducir = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var els = document.querySelectorAll(".revelar");
  if (reducir || !("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("visible"); });
  } else {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }
  var menu = document.querySelector(".menu-movil");
  if (menu) {
    menu.addEventListener("click", function (ev) {
      if (ev.target.closest("a")) { menu.removeAttribute("open"); }
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape") { menu.removeAttribute("open"); }
    });
  }
})();
