var AsanaLazyLoad = {
  inactiveClass: "inactiveLazyImage",
  lazySelector: ".videoAnimation,.lazyImage",
  observerRootMargin: "60% 0px",
  threshold: [0, 1],
  observer: null,
  swapInSrc: function(a) {
    a &&
      (!a.src && a.dataset.src && (a.src = a.dataset.src),
      !a.srcset && a.dataset.srcset && (a.srcset = a.dataset.srcset));
  },
  handleIntersect: function(a) {
    a.forEach(function(a) {
      var e = a.target;
      a.isIntersecting &&
        (e.classList.remove(AsanaLazyLoad.inactiveClass),
        (e instanceof HTMLImageElement || e instanceof HTMLVideoElement) &&
          AsanaLazyLoad.swapInSrc(e),
        AsanaLazyLoad.observer.unobserve(e));
    });
  },
  observe: function(a) {
    AsanaLazyLoad.observer.observe(a);
  },
  init: function() {
    (AsanaLazyLoad.observer = new IntersectionObserver(
      AsanaLazyLoad.handleIntersect,
      {
        threshold: AsanaLazyLoad.observerThresholds,
        rootMargin: AsanaLazyLoad.observerRootMargin
      }
    )),
      document
        .querySelectorAll(AsanaLazyLoad.lazySelector)
        .forEach(AsanaLazyLoad.observe);
  }
};
document.addEventListener("DOMContentLoaded", AsanaLazyLoad.init);
