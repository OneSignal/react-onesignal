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
const h = () => w(), m = (r) => d ? Promise.reject("OneSignal is already initialized.") : !r || !r.appId ? Promise.reject("You need to provide your OneSignal appId.") : document ? new Promise((e, n) => {
  var i;
  (i = window.OneSignalDeferred) == null || i.push((t) => {
    t.init(r).then(() => {
      d = !0, e();
    }).catch(n);
  });
}) : Promise.reject("Document is not defined.");
function O(r, e) {
  return new Promise((n, i) => {
    var t;
    if (s) {
      i(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (t = window.OneSignalDeferred) == null || t.push((o) => {
        o.login(r, e).then(() => n()).catch((a) => i(a));
      });
    } catch (o) {
      i(o);
    }
  });
}
function v() {
  return new Promise((r, e) => {
    var n;
    if (s) {
      e(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (n = window.OneSignalDeferred) == null || n.push((i) => {
        i.logout().then(() => r()).catch((t) => e(t));
      });
    } catch (i) {
      e(i);
    }
  });
}
function D(r) {
  return new Promise((e, n) => {
    var i;
    if (s) {
      n(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (i = window.OneSignalDeferred) == null || i.push((t) => {
        t.setConsentGiven(r).then(() => e()).catch((o) => n(o));
      });
    } catch (t) {
      n(t);
    }
  });
}
function E(r) {
  return new Promise((e, n) => {
    var i;
    if (s) {
      n(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (i = window.OneSignalDeferred) == null || i.push((t) => {
        t.setConsentRequired(r).then(() => e()).catch((o) => n(o));
      });
    } catch (t) {
      n(t);
    }
  });
}
function P(r) {
  return new Promise((e, n) => {
    var i;
    if (s) {
      n(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (i = window.OneSignalDeferred) == null || i.push((t) => {
        t.Slidedown.promptPush(r).then(() => e()).catch((o) => n(o));
      });
    } catch (t) {
      n(t);
    }
  });
}
function L(r) {
  return new Promise((e, n) => {
    var i;
    if (s) {
      n(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (i = window.OneSignalDeferred) == null || i.push((t) => {
        t.Slidedown.promptPushCategories(r).then(() => e()).catch((o) => n(o));
      });
    } catch (t) {
      n(t);
    }
  });
}
function U(r) {
  return new Promise((e, n) => {
    var i;
    if (s) {
      n(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (i = window.OneSignalDeferred) == null || i.push((t) => {
        t.Slidedown.promptSms(r).then(() => e()).catch((o) => n(o));
      });
    } catch (t) {
      n(t);
    }
  });
}
function A(r) {
  return new Promise((e, n) => {
    var i;
    if (s) {
      n(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (i = window.OneSignalDeferred) == null || i.push((t) => {
        t.Slidedown.promptEmail(r).then(() => e()).catch((o) => n(o));
      });
    } catch (t) {
      n(t);
    }
  });
}
function y(r) {
  return new Promise((e, n) => {
    var i;
    if (s) {
      n(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (i = window.OneSignalDeferred) == null || i.push((t) => {
        t.Slidedown.promptSmsAndEmail(r).then(() => e()).catch((o) => n(o));
      });
    } catch (t) {
      n(t);
    }
  });
}
function N(r, e) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((i) => {
    i.Slidedown.addEventListener(r, e);
  });
}
function b(r, e) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((i) => {
    i.Slidedown.removeEventListener(r, e);
  });
}
function I(r) {
  return new Promise((e, n) => {
    var i;
    if (s) {
      n(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (i = window.OneSignalDeferred) == null || i.push((t) => {
        t.Notifications.setDefaultUrl(r).then(() => e()).catch((o) => n(o));
      });
    } catch (t) {
      n(t);
    }
  });
}
function T(r) {
  return new Promise((e, n) => {
    var i;
    if (s) {
      n(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (i = window.OneSignalDeferred) == null || i.push((t) => {
        t.Notifications.setDefaultTitle(r).then(() => e()).catch((o) => n(o));
      });
    } catch (t) {
      n(t);
    }
  });
}
function R() {
  return new Promise((r, e) => {
    var n;
    if (s) {
      e(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (n = window.OneSignalDeferred) == null || n.push((i) => {
        i.Notifications.requestPermission().then(() => r()).catch((t) => e(t));
      });
    } catch (i) {
      e(i);
    }
  });
}
function C(r, e) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((i) => {
    i.Notifications.addEventListener(r, e);
  });
}
function q(r, e) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((i) => {
    i.Notifications.removeEventListener(r, e);
  });
}
function G(r, e) {
  return new Promise((n, i) => {
    var t;
    if (s) {
      i(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (t = window.OneSignalDeferred) == null || t.push((o) => {
        o.Session.sendOutcome(r, e).then(() => n()).catch((a) => i(a));
      });
    } catch (o) {
      i(o);
    }
  });
}
function _(r) {
  return new Promise((e, n) => {
    var i;
    if (s) {
      n(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (i = window.OneSignalDeferred) == null || i.push((t) => {
        t.Session.sendUniqueOutcome(r).then(() => e()).catch((o) => n(o));
      });
    } catch (t) {
      n(t);
    }
  });
}
function k(r, e) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((i) => {
    i.User.addAlias(r, e);
  });
}
function K(r) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((n) => {
    n.User.addAliases(r);
  });
}
function x(r) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((n) => {
    n.User.removeAlias(r);
  });
}
function V(r) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((n) => {
    n.User.removeAliases(r);
  });
}
function z(r) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((n) => {
    n.User.addEmail(r);
  });
}
function M(r) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((n) => {
    n.User.removeEmail(r);
  });
}
function F(r) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((n) => {
    n.User.addSms(r);
  });
}
function Y(r) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((n) => {
    n.User.removeSms(r);
  });
}
function B(r, e) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((i) => {
    i.User.addTag(r, e);
  });
}
function H(r) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((n) => {
    n.User.addTags(r);
  });
}
function J(r) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((n) => {
    n.User.removeTag(r);
  });
}
function Q(r) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((n) => {
    n.User.removeTags(r);
  });
}
function W() {
  var e;
  let r;
  return (e = window.OneSignalDeferred) == null || e.push((n) => {
    r = n.User.getTags();
  }), r;
}
function X(r, e) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((i) => {
    i.User.addEventListener(r, e);
  });
}
function Z(r, e) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((i) => {
    i.User.removeEventListener(r, e);
  });
}
function $(r) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((n) => {
    n.User.setLanguage(r);
  });
}
function j() {
  var e;
  let r;
  return (e = window.OneSignalDeferred) == null || e.push((n) => {
    r = n.User.getLanguage();
  }), r;
}
function ee() {
  return new Promise((r, e) => {
    var n;
    if (s) {
      e(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (n = window.OneSignalDeferred) == null || n.push((i) => {
        i.User.PushSubscription.optIn().then(() => r()).catch((t) => e(t));
      });
    } catch (i) {
      e(i);
    }
  });
}
function ne() {
  return new Promise((r, e) => {
    var n;
    if (s) {
      e(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (n = window.OneSignalDeferred) == null || n.push((i) => {
        i.User.PushSubscription.optOut().then(() => r()).catch((t) => e(t));
      });
    } catch (i) {
      e(i);
    }
  });
}
function re(r, e) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((i) => {
    i.User.PushSubscription.addEventListener(r, e);
  });
}
function ie(r, e) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((i) => {
    i.User.PushSubscription.removeEventListener(r, e);
  });
}
function te(r) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((n) => {
    n.Debug.setLogLevel(r);
  });
}
const oe = {
  get id() {
    var r, e, n;
    return (n = (e = (r = window.OneSignal) == null ? void 0 : r.User) == null ? void 0 : e.PushSubscription) == null ? void 0 : n.id;
  },
  get token() {
    var r, e, n;
    return (n = (e = (r = window.OneSignal) == null ? void 0 : r.User) == null ? void 0 : e.PushSubscription) == null ? void 0 : n.token;
  },
  get optedIn() {
    var r, e, n;
    return (n = (e = (r = window.OneSignal) == null ? void 0 : r.User) == null ? void 0 : e.PushSubscription) == null ? void 0 : n.optedIn;
  },
  optIn: ee,
  optOut: ne,
  addEventListener: re,
  removeEventListener: ie
}, se = {
  get onesignalId() {
    var r, e;
    return (e = (r = window.OneSignal) == null ? void 0 : r.User) == null ? void 0 : e.onesignalId;
  },
  get externalId() {
    var r, e;
    return (e = (r = window.OneSignal) == null ? void 0 : r.User) == null ? void 0 : e.externalId;
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
    var r, e;
    return ((e = (r = window.OneSignal) == null ? void 0 : r.Notifications) == null ? void 0 : e.permissionNative) ?? "default";
  },
  get permission() {
    var r, e;
    return ((e = (r = window.OneSignal) == null ? void 0 : r.Notifications) == null ? void 0 : e.permission) ?? !1;
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
