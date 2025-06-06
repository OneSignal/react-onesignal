const u = "onesignal-sdk", l = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
let d = !1, s = !1;
typeof window < "u" && (window.OneSignalDeferred = window.OneSignalDeferred || [], f());
function c() {
  s = !0;
}
function f() {
  const i = document.createElement("script");
  i.id = u, i.defer = !0, i.src = l, i.onerror = () => {
    c();
  }, document.head.appendChild(i);
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
const h = () => w(), m = (i) => {
  var e;
  return d ? Promise.reject("OneSignal is already initialized.") : !i || !i.appId ? Promise.reject("You need to provide your OneSignal appId.") : document ? (((e = i.welcomeNotification) == null ? void 0 : e.disabled) !== void 0 && (i.welcomeNotification.disable = i.welcomeNotification.disabled), new Promise((n, r) => {
    var t;
    (t = window.OneSignalDeferred) == null || t.push((o) => {
      o.init(i).then(() => {
        d = !0, n();
      }).catch(r);
    });
  })) : Promise.reject("Document is not defined.");
};
function O(i, e) {
  return new Promise((n, r) => {
    var t;
    if (s) {
      r(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (t = window.OneSignalDeferred) == null || t.push((o) => {
        o.login(i, e).then(() => n()).catch((a) => r(a));
      });
    } catch (o) {
      r(o);
    }
  });
}
function v() {
  return new Promise((i, e) => {
    var n;
    if (s) {
      e(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (n = window.OneSignalDeferred) == null || n.push((r) => {
        r.logout().then(() => i()).catch((t) => e(t));
      });
    } catch (r) {
      e(r);
    }
  });
}
function D(i) {
  return new Promise((e, n) => {
    var r;
    if (s) {
      n(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (r = window.OneSignalDeferred) == null || r.push((t) => {
        t.setConsentGiven(i).then(() => e()).catch((o) => n(o));
      });
    } catch (t) {
      n(t);
    }
  });
}
function E(i) {
  return new Promise((e, n) => {
    var r;
    if (s) {
      n(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (r = window.OneSignalDeferred) == null || r.push((t) => {
        t.setConsentRequired(i).then(() => e()).catch((o) => n(o));
      });
    } catch (t) {
      n(t);
    }
  });
}
function P(i) {
  return new Promise((e, n) => {
    var r;
    if (s) {
      n(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (r = window.OneSignalDeferred) == null || r.push((t) => {
        t.Slidedown.promptPush(i).then(() => e()).catch((o) => n(o));
      });
    } catch (t) {
      n(t);
    }
  });
}
function L(i) {
  return new Promise((e, n) => {
    var r;
    if (s) {
      n(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (r = window.OneSignalDeferred) == null || r.push((t) => {
        t.Slidedown.promptPushCategories(i).then(() => e()).catch((o) => n(o));
      });
    } catch (t) {
      n(t);
    }
  });
}
function U(i) {
  return new Promise((e, n) => {
    var r;
    if (s) {
      n(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (r = window.OneSignalDeferred) == null || r.push((t) => {
        t.Slidedown.promptSms(i).then(() => e()).catch((o) => n(o));
      });
    } catch (t) {
      n(t);
    }
  });
}
function A(i) {
  return new Promise((e, n) => {
    var r;
    if (s) {
      n(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (r = window.OneSignalDeferred) == null || r.push((t) => {
        t.Slidedown.promptEmail(i).then(() => e()).catch((o) => n(o));
      });
    } catch (t) {
      n(t);
    }
  });
}
function N(i) {
  return new Promise((e, n) => {
    var r;
    if (s) {
      n(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (r = window.OneSignalDeferred) == null || r.push((t) => {
        t.Slidedown.promptSmsAndEmail(i).then(() => e()).catch((o) => n(o));
      });
    } catch (t) {
      n(t);
    }
  });
}
function y(i, e) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((r) => {
    r.Slidedown.addEventListener(i, e);
  });
}
function b(i, e) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((r) => {
    r.Slidedown.removeEventListener(i, e);
  });
}
function I(i) {
  return new Promise((e, n) => {
    var r;
    if (s) {
      n(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (r = window.OneSignalDeferred) == null || r.push((t) => {
        t.Notifications.setDefaultUrl(i).then(() => e()).catch((o) => n(o));
      });
    } catch (t) {
      n(t);
    }
  });
}
function T(i) {
  return new Promise((e, n) => {
    var r;
    if (s) {
      n(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (r = window.OneSignalDeferred) == null || r.push((t) => {
        t.Notifications.setDefaultTitle(i).then(() => e()).catch((o) => n(o));
      });
    } catch (t) {
      n(t);
    }
  });
}
function R() {
  return new Promise((i, e) => {
    var n;
    if (s) {
      e(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (n = window.OneSignalDeferred) == null || n.push((r) => {
        r.Notifications.requestPermission().then(() => i()).catch((t) => e(t));
      });
    } catch (r) {
      e(r);
    }
  });
}
function C(i, e) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((r) => {
    r.Notifications.addEventListener(i, e);
  });
}
function q(i, e) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((r) => {
    r.Notifications.removeEventListener(i, e);
  });
}
function G(i, e) {
  return new Promise((n, r) => {
    var t;
    if (s) {
      r(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (t = window.OneSignalDeferred) == null || t.push((o) => {
        o.Session.sendOutcome(i, e).then(() => n()).catch((a) => r(a));
      });
    } catch (o) {
      r(o);
    }
  });
}
function _(i) {
  return new Promise((e, n) => {
    var r;
    if (s) {
      n(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (r = window.OneSignalDeferred) == null || r.push((t) => {
        t.Session.sendUniqueOutcome(i).then(() => e()).catch((o) => n(o));
      });
    } catch (t) {
      n(t);
    }
  });
}
function k(i, e) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((r) => {
    r.User.addAlias(i, e);
  });
}
function K(i) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((n) => {
    n.User.addAliases(i);
  });
}
function x(i) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((n) => {
    n.User.removeAlias(i);
  });
}
function V(i) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((n) => {
    n.User.removeAliases(i);
  });
}
function z(i) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((n) => {
    n.User.addEmail(i);
  });
}
function M(i) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((n) => {
    n.User.removeEmail(i);
  });
}
function F(i) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((n) => {
    n.User.addSms(i);
  });
}
function Y(i) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((n) => {
    n.User.removeSms(i);
  });
}
function B(i, e) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((r) => {
    r.User.addTag(i, e);
  });
}
function H(i) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((n) => {
    n.User.addTags(i);
  });
}
function J(i) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((n) => {
    n.User.removeTag(i);
  });
}
function Q(i) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((n) => {
    n.User.removeTags(i);
  });
}
async function W() {
  var e;
  let i;
  return await ((e = window.OneSignalDeferred) == null ? void 0 : e.push((n) => {
    i = n.User.getTags();
  })), i;
}
function X(i, e) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((r) => {
    r.User.addEventListener(i, e);
  });
}
function Z(i, e) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((r) => {
    r.User.removeEventListener(i, e);
  });
}
function $(i) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((n) => {
    n.User.setLanguage(i);
  });
}
async function j() {
  var e;
  let i;
  return await ((e = window.OneSignalDeferred) == null ? void 0 : e.push((n) => {
    i = n.User.getLanguage();
  })), i;
}
function ee() {
  return new Promise((i, e) => {
    var n;
    if (s) {
      e(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (n = window.OneSignalDeferred) == null || n.push((r) => {
        r.User.PushSubscription.optIn().then(() => i()).catch((t) => e(t));
      });
    } catch (r) {
      e(r);
    }
  });
}
function ne() {
  return new Promise((i, e) => {
    var n;
    if (s) {
      e(new Error("OneSignal script failed to load."));
      return;
    }
    try {
      (n = window.OneSignalDeferred) == null || n.push((r) => {
        r.User.PushSubscription.optOut().then(() => i()).catch((t) => e(t));
      });
    } catch (r) {
      e(r);
    }
  });
}
function ie(i, e) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((r) => {
    r.User.PushSubscription.addEventListener(i, e);
  });
}
function re(i, e) {
  var n;
  (n = window.OneSignalDeferred) == null || n.push((r) => {
    r.User.PushSubscription.removeEventListener(i, e);
  });
}
function te(i) {
  var e;
  (e = window.OneSignalDeferred) == null || e.push((n) => {
    n.Debug.setLogLevel(i);
  });
}
const oe = {
  get id() {
    var i, e, n;
    return (n = (e = (i = window.OneSignal) == null ? void 0 : i.User) == null ? void 0 : e.PushSubscription) == null ? void 0 : n.id;
  },
  get token() {
    var i, e, n;
    return (n = (e = (i = window.OneSignal) == null ? void 0 : i.User) == null ? void 0 : e.PushSubscription) == null ? void 0 : n.token;
  },
  get optedIn() {
    var i, e, n;
    return (n = (e = (i = window.OneSignal) == null ? void 0 : i.User) == null ? void 0 : e.PushSubscription) == null ? void 0 : n.optedIn;
  },
  optIn: ee,
  optOut: ne,
  addEventListener: ie,
  removeEventListener: re
}, se = {
  get onesignalId() {
    var i, e;
    return (e = (i = window.OneSignal) == null ? void 0 : i.User) == null ? void 0 : e.onesignalId;
  },
  get externalId() {
    var i, e;
    return (e = (i = window.OneSignal) == null ? void 0 : i.User) == null ? void 0 : e.externalId;
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
  promptSmsAndEmail: N,
  addEventListener: y,
  removeEventListener: b
}, le = {
  get permissionNative() {
    var i, e;
    return ((e = (i = window.OneSignal) == null ? void 0 : i.Notifications) == null ? void 0 : e.permissionNative) ?? "default";
  },
  get permission() {
    var i, e;
    return ((e = (i = window.OneSignal) == null ? void 0 : i.Notifications) == null ? void 0 : e.permission) ?? !1;
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
