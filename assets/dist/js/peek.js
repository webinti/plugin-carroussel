var AsanaPeek = {
  scrollElementSelector: "[data-animate-scroll],.-animate-scroll",
  belowViewportClass: "-below-viewport",
  aboveViewportClass: "-above-viewport",
  partialViewportClass: "-partial-viewport",
  fullViewportClass: "-full-viewport",
  observerThresholds: [0, 0.5, 1],
  observer: null,
  handleIntersect: function(e) {
    e.forEach(function(e) {
      var s = e.target;
      e.isIntersecting
        ? 1 === e.intersectionRatio
          ? (s.classList.add(AsanaPeek.fullViewportClass),
            s.classList.remove(AsanaPeek.partialViewportClass),
            s.classList.remove(AsanaPeek.belowViewportClass),
            s.classList.remove(AsanaPeek.aboveViewportClass))
          : (s.classList.add(AsanaPeek.partialViewportClass),
            s.classList.remove(AsanaPeek.fullViewportClass),
            e.boundingClientRect.top < 0
              ? (s.classList.add(AsanaPeek.aboveViewportClass),
                s.classList.remove(AsanaPeek.belowViewportClass))
              : (s.classList.remove(AsanaPeek.aboveViewportClass),
                s.classList.add(AsanaPeek.belowViewportClass)))
        : (s.classList.remove(AsanaPeek.partialViewportClass),
          s.classList.remove(AsanaPeek.fullViewportClass),
          e.boundingClientRect.bottom < 0
            ? (s.classList.add(AsanaPeek.aboveViewportClass),
              s.classList.remove(AsanaPeek.belowViewportClass))
            : (s.classList.remove(AsanaPeek.aboveViewportClass),
              s.classList.add(AsanaPeek.belowViewportClass)));
    });
  },
  observe: function(e) {
    return (
      AsanaPeek.observer.observe(e),
      function() {
        AsanaPeek.unobserve(e);
      }
    );
  },
  unobserve: function(e) {
    e.classList.remove(
      AsanaPeek.aboveViewportClass,
      AsanaPeek.belowViewportClass,
      AsanaPeek.partialViewportClass,
      AsanaPeek.fullViewportClass
    ),
      AsanaPeek.observer.unobserve(e);
  },
  init: function() {
    (AsanaPeek.observer = new IntersectionObserver(AsanaPeek.handleIntersect, {
      threshold: AsanaPeek.observerThresholds
    })),
      document
        .querySelectorAll(AsanaPeek.scrollElementSelector)
        .forEach(AsanaPeek.observe);
  }
};
document.addEventListener("DOMContentLoaded", AsanaPeek.init);
