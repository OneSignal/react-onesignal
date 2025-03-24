const u = "onesignal-sdk", l = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
let d = !1, s = !1;
typeof window < "u" && (window.OneSignalDeferred = window.OneSignalDeferred || [], f());
function c() {
  s = !0;
}
function f() {
  const r = document.createElement("script");
  r.id = u, r.defer = !0, r.src = l, r.onerror = () => {
    c();
  }, document.head.appendChild(r);
}
function w() {
  return g() || S();
}
function p() {
  return window.top !== window && // isContextIframe
  navigator.vendor === "Apple Computer, Inc." && // isSafari
  navigator.platform === "MacIntel";
}
function S() {
  return window.safari && typeof window.safari.pushNotification < "u" || p();
}
function g() {
  return typeof PushSubscriptionOptions < "u" && PushSubscriptionOptions.prototype.hasOwnProperty("applicationServerKey");
}
const h = () => w(), m = (r) => {
  if (d)
    return Promise.reject("OneSignal is already initialized.");
  if (!r || !r.appId)
    throw new Error("You need to provide your OneSignal appId.");
  return document ? new Promise((n) => {
    var e;
    (e = window.OneSignalDeferred) == null || e.push((i) => {
      i.init(r).then(() => {
        d = !0, n();
      });
    });
  }) : Promise.reject("Document is not defined.");
};
function O(r, n) {
  return new Promise((e, i) => {
    var t;
    if (s) {
      i(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (t = window.OneSignalDeferred) == null || t.push((o) => {
        o.login(r, n).then(() => e()).catch((a) => i(a));
      });
    } catch (o) {
      i(o);
    }
  });
}
function v() {
  return new Promise((r, n) => {
    var e;
    if (s) {
      n(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (e = window.OneSignalDeferred) == null || e.push((i) => {
        i.logout().then(() => r()).catch((t) => n(t));
      });
    } catch (i) {
      n(i);
    }
  });
}
function D(r) {
  return new Promise((n, e) => {
    var i;
    if (s) {
      e(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (i = window.OneSignalDeferred) == null || i.push((t) => {
        t.setConsentGiven(r).then(() => n()).catch((o) => e(o));
      });
    } catch (t) {
      e(t);
    }
  });
}
function E(r) {
  return new Promise((n, e) => {
    var i;
    if (s) {
      e(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (i = window.OneSignalDeferred) == null || i.push((t) => {
        t.setConsentRequired(r).then(() => n()).catch((o) => e(o));
      });
    } catch (t) {
      e(t);
    }
  });
}
function P(r) {
  return new Promise((n, e) => {
    var i;
    if (s) {
      e(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (i = window.OneSignalDeferred) == null || i.push((t) => {
        t.Slidedown.promptPush(r).then(() => n()).catch((o) => e(o));
      });
    } catch (t) {
      e(t);
    }
  });
}
function L(r) {
  return new Promise((n, e) => {
    var i;
    if (s) {
      e(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (i = window.OneSignalDeferred) == null || i.push((t) => {
        t.Slidedown.promptPushCategories(r).then(() => n()).catch((o) => e(o));
      });
    } catch (t) {
      e(t);
    }
  });
}
function U(r) {
  return new Promise((n, e) => {
    var i;
    if (s) {
      e(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (i = window.OneSignalDeferred) == null || i.push((t) => {
        t.Slidedown.promptSms(r).then(() => n()).catch((o) => e(o));
      });
    } catch (t) {
      e(t);
    }
  });
}
function A(r) {
  return new Promise((n, e) => {
    var i;
    if (s) {
      e(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (i = window.OneSignalDeferred) == null || i.push((t) => {
        t.Slidedown.promptEmail(r).then(() => n()).catch((o) => e(o));
      });
    } catch (t) {
      e(t);
    }
  });
}
function y(r) {
  return new Promise((n, e) => {
    var i;
    if (s) {
      e(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (i = window.OneSignalDeferred) == null || i.push((t) => {
        t.Slidedown.promptSmsAndEmail(r).then(() => n()).catch((o) => e(o));
      });
    } catch (t) {
      e(t);
    }
  });
}
function N(r, n) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((i) => {
    i.Slidedown.addEventListener(r, n);
  });
}
function b(r, n) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((i) => {
    i.Slidedown.removeEventListener(r, n);
  });
}
function I(r) {
  return new Promise((n, e) => {
    var i;
    if (s) {
      e(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (i = window.OneSignalDeferred) == null || i.push((t) => {
        t.Notifications.setDefaultUrl(r).then(() => n()).catch((o) => e(o));
      });
    } catch (t) {
      e(t);
    }
  });
}
function T(r) {
  return new Promise((n, e) => {
    var i;
    if (s) {
      e(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (i = window.OneSignalDeferred) == null || i.push((t) => {
        t.Notifications.setDefaultTitle(r).then(() => n()).catch((o) => e(o));
      });
    } catch (t) {
      e(t);
    }
  });
}
function R() {
  return new Promise((r, n) => {
    var e;
    if (s) {
      n(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (e = window.OneSignalDeferred) == null || e.push((i) => {
        i.Notifications.requestPermission().then(() => r()).catch((t) => n(t));
      });
    } catch (i) {
      n(i);
    }
  });
}
function C(r, n) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((i) => {
    i.Notifications.addEventListener(r, n);
  });
}
function q(r, n) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((i) => {
    i.Notifications.removeEventListener(r, n);
  });
}
function G(r, n) {
  return new Promise((e, i) => {
    var t;
    if (s) {
      i(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (t = window.OneSignalDeferred) == null || t.push((o) => {
        o.Session.sendOutcome(r, n).then(() => e()).catch((a) => i(a));
      });
    } catch (o) {
      i(o);
    }
  });
}
function _(r) {
  return new Promise((n, e) => {
    var i;
    if (s) {
      e(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (i = window.OneSignalDeferred) == null || i.push((t) => {
        t.Session.sendUniqueOutcome(r).then(() => n()).catch((o) => e(o));
      });
    } catch (t) {
      e(t);
    }
  });
}
function k(r, n) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((i) => {
    i.User.addAlias(r, n);
  });
}
function K(r) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((e) => {
    e.User.addAliases(r);
  });
}
function x(r) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((e) => {
    e.User.removeAlias(r);
  });
}
function V(r) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((e) => {
    e.User.removeAliases(r);
  });
}
function z(r) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((e) => {
    e.User.addEmail(r);
  });
}
function M(r) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((e) => {
    e.User.removeEmail(r);
  });
}
function F(r) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((e) => {
    e.User.addSms(r);
  });
}
function Y(r) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((e) => {
    e.User.removeSms(r);
  });
}
function B(r, n) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((i) => {
    i.User.addTag(r, n);
  });
}
function H(r) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((e) => {
    e.User.addTags(r);
  });
}
function J(r) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((e) => {
    e.User.removeTag(r);
  });
}
function Q(r) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((e) => {
    e.User.removeTags(r);
  });
}
function W() {
  var n;
  let r;
  return (n = window.OneSignalDeferred) == null || n.push((e) => {
    r = e.User.getTags();
  }), r;
}
function X(r, n) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((i) => {
    i.User.addEventListener(r, n);
  });
}
function Z(r, n) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((i) => {
    i.User.removeEventListener(r, n);
  });
}
function $(r) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((e) => {
    e.User.setLanguage(r);
  });
}
function j() {
  var n;
  let r;
  return (n = window.OneSignalDeferred) == null || n.push((e) => {
    r = e.User.getLanguage();
  }), r;
}
function ee() {
  return new Promise((r, n) => {
    var e;
    if (s) {
      n(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (e = window.OneSignalDeferred) == null || e.push((i) => {
        i.User.PushSubscription.optIn().then(() => r()).catch((t) => n(t));
      });
    } catch (i) {
      n(i);
    }
  });
}
function ne() {
  return new Promise((r, n) => {
    var e;
    if (s) {
      n(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (e = window.OneSignalDeferred) == null || e.push((i) => {
        i.User.PushSubscription.optOut().then(() => r()).catch((t) => n(t));
      });
    } catch (i) {
      n(i);
    }
  });
}
function re(r, n) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((i) => {
    i.User.PushSubscription.addEventListener(r, n);
  });
}
function ie(r, n) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((i) => {
    i.User.PushSubscription.removeEventListener(r, n);
  });
}
function te(r) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((e) => {
    e.Debug.setLogLevel(r);
  });
}
const oe = {
  get id() {
    var r, n, e;
    return (e = (n = (r = window.OneSignal) == null ? void 0 : r.User) == null ? void 0 : n.PushSubscription) == null ? void 0 : e.id;
  },
  get token() {
    var r, n, e;
    return (e = (n = (r = window.OneSignal) == null ? void 0 : r.User) == null ? void 0 : n.PushSubscription) == null ? void 0 : e.token;
  },
  get optedIn() {
    var r, n, e;
    return (e = (n = (r = window.OneSignal) == null ? void 0 : r.User) == null ? void 0 : n.PushSubscription) == null ? void 0 : e.optedIn;
  },
  optIn: ee,
  optOut: ne,
  addEventListener: re,
  removeEventListener: ie
}, se = {
  get onesignalId() {
    var r, n;
    return (n = (r = window.OneSignal) == null ? void 0 : r.User) == null ? void 0 : n.onesignalId;
  },
  get externalId() {
    var r, n;
    return (n = (r = window.OneSignal) == null ? void 0 : r.User) == null ? void 0 : n.externalId;
  },
  addAlias: k,
  addAliases: K,
  removeAlias: x,
  removeAliases: V,
  addEmail: z,
  removeEmail: M,
  addSms: F,
  removeSms: Y,
  addTag: B,
  addTags: H,
  removeTag: J,
  removeTags: Q,
  getTags: W,
  addEventListener: X,
  removeEventListener: Z,
  setLanguage: $,
  getLanguage: j,
  PushSubscription: oe
}, ae = {
  sendOutcome: G,
  sendUniqueOutcome: _
}, de = {
  setLogLevel: te
}, ue = {
  promptPush: P,
  promptPushCategories: L,
  promptSms: U,
  promptEmail: A,
  promptSmsAndEmail: y,
  addEventListener: N,
  removeEventListener: b
}, le = {
  get permissionNative() {
    var r, n;
    return ((n = (r = window.OneSignal) == null ? void 0 : r.Notifications) == null ? void 0 : n.permissionNative) ?? "default";
  },
  get permission() {
    var r, n;
    return ((n = (r = window.OneSignal) == null ? void 0 : r.Notifications) == null ? void 0 : n.permission) ?? !1;
  },
  setDefaultUrl: I,
  setDefaultTitle: T,
  isPushSupported: h,
  requestPermission: R,
  addEventListener: C,
  removeEventListener: q
}, ce = {
  login: O,
  logout: v,
  init: m,
  setConsentGiven: D,
  setConsentRequired: E,
  Slidedown: ue,
  Notifications: le,
  Session: ae,
  User: se,
  Debug: de
}, fe = ce;
export {
  fe as default
};
//# sourceMappingURL=index.es.js.map
