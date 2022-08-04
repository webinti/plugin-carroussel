var AsanaStorage = {
  STORAGE_KEYS: {
    ENCRYPTED_USER_ID: "ga__ec_ui",
    ECOMMERCE_CONFIG: "ga__ecommerce_config",
    USER_SIGNUP_EMAIL: "user_signup_email",
    ECOMMERCE_REVERT: "ecommerce_revert"
  },
  getFromSessionStorage: function(e) {
    try {
      return sessionStorage.getItem(e);
    } catch (e) {
      Bugsnag.notifyException(e);
    }
  },
  setToSessionStorage: function(e, t) {
    try {
      sessionStorage.setItem(e, t);
    } catch (e) {
      Bugsnag.notifyException(e);
    }
  },
  removeFromSessionStorage: function(e) {
    try {
      sessionStorage.removeItem(e);
    } catch (e) {
      Bugsnag.notifyException(e);
    }
  },
  getFromLocalStorage: function(e) {
    try {
      return localStorage.getItem(e);
    } catch (e) {
      Bugsnag.notifyException(e);
    }
  },
  setToLocalStorage: function(e, t) {
    try {
      localStorage.setItem(e, t);
    } catch (e) {
      Bugsnag.notifyException(e);
    }
  },
  removeFromLocalStorage: function(e) {
    try {
      localStorage.removeItem(e);
    } catch (e) {
      Bugsnag.notifyException(e);
    }
  },
  getEcommerceConfig: function() {
    var e = this.getFromSessionStorage(this.STORAGE_KEYS.ECOMMERCE_CONFIG);
    if (!e) return {};
    try {
      return JSON.parse(e);
    } catch (e) {
      Bugsnag.notifyException(e);
    }
  },
  setEcommerceConfig: function(e) {
    this.setToSessionStorage(
      this.STORAGE_KEYS.ECOMMERCE_CONFIG,
      JSON.stringify(e)
    );
  },
  removeEcommerceConfig: function() {
    this.removeFromSessionStorage(this.STORAGE_KEYS.ECOMMERCE_CONFIG);
  },
  updateEcommerceConfig: function(e) {
    var t = this.getEcommerceConfig();
    e(t), this.setEcommerceConfig(t);
  },
  setEcommerceRevertEnrollment: function(e) {
    e && this.setToLocalStorage(this.STORAGE_KEYS.ECOMMERCE_REVERT, e);
  },
  isUserEnrolledInEcommerceRevert: function(e) {
    return (
      JSON.parse(
        this.getFromLocalStorage(this.STORAGE_KEYS.ECOMMERCE_REVERT)
      ) || null
    );
  },
  setEncryptedUserId: function(e) {
    e && this.setToLocalStorage(this.STORAGE_KEYS.ENCRYPTED_USER_ID, e);
  },
  getEncryptedUserId: function() {
    return (
      this.getFromLocalStorage(this.STORAGE_KEYS.ENCRYPTED_USER_ID) || null
    );
  },
  removeEncryptedUserId: function() {
    this.removeFromLocalStorage(this.STORAGE_KEYS.ENCRYPTED_USER_ID);
  },
  getCookie: function(e) {
    var t = document.cookie,
      o = t.indexOf(" " + e + "=");
    if ((-1 == o && (o = t.indexOf(e + "=")), -1 == o)) t = null;
    else {
      o = t.indexOf("=", o) + 1;
      var n = t.indexOf(";", o);
      -1 == n && (n = t.length), (t = unescape(t.substring(o, n)));
    }
    return t;
  },
  setCookie: function(e, t, o, n, i) {
    n = void 0 !== n;
    var r = new Date();
    r.setTime(r.getTime() + 24 * o * 60 * 60 * 1e3);
    var s =
      e +
      "=" +
      t +
      ";" +
      ("expires=" + r.toUTCString()) +
      ";path=" +
      (i || "/") +
      (!0 === n ? ";domain=.asana.com" : "") +
      ";SameSite=Lax;secure";
    (document.cookie = s),
      this.getCookie("xsrf_token") || (document.cookie = e + "=" + t + ";");
  },
  deleteCookie: function(e, t) {
    var o = t || "/";
    this.setCookie(e, null, 0, !1, o);
  },
  setUserEmailCookie: function(e) {
    for (
      var t = [
          "/thank-you",
          "/thankyou",
          "/thank",
          "/thanks",
          "/confirm",
          "/confirmation",
          "/invite-confirmation"
        ],
        o = 0;
      o < t.length;
      o++
    )
      this.setCookie(this.STORAGE_KEYS.USER_SIGNUP_EMAIL, e, 1 / 24, !1, t[o]);
  },
  getUserEmailCookie: function() {
    return this.getCookie(this.STORAGE_KEYS.USER_SIGNUP_EMAIL);
  },
  removeUserEmailCookie: function() {
    for (
      var e = [
          "/thank-you",
          "/thankyou",
          "/thank",
          "/thanks",
          "/confirm",
          "/confirmation"
        ],
        t = 0;
      t < e.length;
      t++
    )
      this.deleteCookie(this.STORAGE_KEYS.USER_SIGNUP_EMAIL, e[t]);
  }
};
