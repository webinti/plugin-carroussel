var AsanaSignupUtils = {
  signupButtons: {
    requestClassName: "-request",
    request: function(e) {
      e.addClass(this.requestClassName);
    },
    reset: function(e) {
      e.removeClass(this.requestClassName);
    }
  },
  validateDomain: {
    hasTriedInvalidDomain: !1,
    signupForm: null,
    emailInput: null,
    invalidDomainError: null,
    activeErrorClass: "-active",
    invalidInputClass: "-invalid",
    setFormElements: function(e) {
      (this.signupForm = e),
        (this.emailInput = this.signupForm.querySelector("input.signup-email")),
        (this.invalidDomainError = this.signupForm.querySelector(
          "#signup-email__invalid-domain"
        )),
        (this.submitButton = this.signupForm.querySelector(
          ".signupForm-submit"
        )),
        this.emailInput.addEventListener("input", this.clearErrors.bind(this));
    },
    invalidateSignupForm: function(e) {
      this.setFormElements(e),
        (this.hasTriedInvalidDomain = !0),
        this.showError(this.emailInput, this.invalidDomainError),
        AsanaSignupUtils.signupButtons.reset($(this.submitButton));
    },
    showError: function(e, i) {
      e.classList.add(this.invalidInputClass),
        i.classList.add(this.activeErrorClass);
    },
    hideError: function(e, i) {
      e.classList.remove(this.invalidInputClass),
        i.classList.remove(this.activeErrorClass);
    },
    clearErrors: function() {
      this.hasTriedInvalidDomain &&
        ((this.hasTriedInvalidDomain = !1),
        this.hideError(this.emailInput, this.invalidDomainError));
    }
  },
  setLoginWithSSOSAMLCookie: function(e, i, s, r) {
    e && AsanaStorage.setCookie("email_domain_provider", e),
      !0 === i
        ? AsanaStorage.setCookie("sso_status", "gsuite_required")
        : "enabled" === s
        ? (AsanaStorage.setCookie("sso_status", "saml_optional"),
          AsanaStorage.setCookie("sso_redirect", r))
        : "required" === s
        ? (AsanaStorage.setCookie("sso_status", "saml_required"),
          AsanaStorage.setCookie("sso_redirect", r))
        : "off" === s &&
          e &&
          "gsuite" === e &&
          AsanaStorage.setCookie("sso_status", "gsuite_optional");
  },
  getRedirectAfterSignup: function() {
    return AsanaSignupUtils.shouldGoToConfirmationPage()
      ? AsanaSignupUtils.getConfirmationPageRedirect()
      : (AsanaSignupUtils.shouldGoToJoinOrCreatePage()
          ? ((e = "/join-or-create"),
            AsanaSignupUtils.setPreviousScreen("join_or_create_team"))
          : ((e = AsanaSignupUtils.shouldSkipPlanStart()
              ? "/billing"
              : "/plan-start"),
            AsanaSignupUtils.setPreviousScreen("email_signup_screen")),
        "true" === AsanaStorage.getCookie("show_tiny_teams") &&
          (e += "?" + AsanaHelpers.TINY_TEAMS_URL_PARAMETER),
        e);
    var e;
  },
  getConfirmationPageRedirect: function() {
    var e = AsanaHelpers.signupEmailType.isSignupEmailTypePersonal(),
      i = AsanaHelpers.signupEmailType.isSignupEmailTypeWork();
    return AsanaHelpers.tier.isTierFree() && i
      ? "/thanks"
      : AsanaHelpers.tier.isTierFree() && e
      ? "/thank"
      : AsanaHelpers.tier.isTierPremium() && i
      ? "/thank-you"
      : AsanaHelpers.tier.isTierPremium() && e
      ? "/thankyou"
      : AsanaHelpers.tier.isTierBusiness() && i
      ? "/confirm"
      : AsanaHelpers.tier.isTierBusiness() && e
      ? "/confirmation"
      : "thank";
  },
  shouldGoToJoinOrCreatePage: function() {
    return (
      (AsanaHelpers.billableGroupType.isOrg() ||
        AsanaHelpers.billableGroupType.isTeam()) &&
      !this.isOnJoinCreatePage()
    );
  },
  shouldGoToConfirmationPage: function() {
    return (
      (AsanaHelpers.tier.isTierFree() && !this.shouldGoToJoinOrCreatePage()) ||
      AsanaHelpers.tier.isTierFree() ||
      AsanaHelpers.billableGroupType.isFullyPaid() ||
      !this.shouldSeeEcommerceExperience()
    );
  },
  shouldSkipPlanStart: function() {
    return (
      this.isFromPricingPage() || this.isFromBuyPage() || this.isOnPricingPage()
    );
  },
  shouldSeeEcommerceExperience: function() {
    return (
      (AsanaHelpers.trial.isInTrialFlow &&
        !AsanaStorage.isUserEnrolledInEcommerceRevert()) ||
      !AsanaHelpers.trial.isInTrialFlow
    );
  },
  getPreviousScreen: function() {
    return AsanaStorage.getEcommerceConfig().previous_screen;
  },
  setPreviousScreen: function(i) {
    AsanaStorage.updateEcommerceConfig(function(e) {
      return (e.previous_screen = i), e;
    });
  },
  getPathPriorToSignup: function() {
    return AsanaStorage.getEcommerceConfig().path_prior_to_signup;
  },
  setPathPriorToSignup: function(i) {
    AsanaStorage.updateEcommerceConfig(function(e) {
      return (e.path_prior_to_signup = i), e;
    });
  },
  isFromPricingPage: function() {
    var e = this.getPathPriorToSignup();
    return !!e && /pricing/g.test(e);
  },
  isFromBuyPage: function() {
    var e = this.getPathPriorToSignup();
    return !!e && /(buy-)(premium|business)/g.test(e);
  },
  isOnPricingPage: function() {
    return /pricing/g.test(window.location.pathname);
  },
  isOnJoinCreatePage: function() {
    return /join-or-create/g.test(window.location.pathname);
  }
};
