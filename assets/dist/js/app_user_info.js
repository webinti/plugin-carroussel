"asana.com" != window.location.hostname &&
  "blog.asana.com" != window.location.hostname &&
  (Bugsnag.releaseStage = "development");
var AsanaAppUserInfo = {
  get: function(n, e) {
    var o = new XMLHttpRequest();
    o.open("GET", "https://app.asana.com/-/marketing_info", !0),
      (o.withCredentials = !0),
      (o.responseType = "json"),
      o.send(),
      (o.onloadend = function() {
        o.readyState === o.DONE && 200 === o.status
          ? n(o.response)
          : ("function" == typeof e && e(),
            Bugsnag.notify("Non-200 response from /-/marketing_info"));
      }.bind(this));
  }
};
