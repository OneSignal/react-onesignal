'use strict';

const ONESIGNAL_SDK_ID = 'onesignal-sdk';
const ONE_SIGNAL_SCRIPT_SRC = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
// true if the script is successfully loaded from CDN.
let isOneSignalInitialized = false;
// true if the script fails to load from CDN. A separate flag is necessary
// to disambiguate between a CDN load failure and a delayed call to
// OneSignal#init.
let isOneSignalScriptFailed = false;
if (typeof window !== 'undefined') {
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    addSDKScript();
}
/* H E L P E R S */
function handleOnError() {
    isOneSignalScriptFailed = true;
}
function addSDKScript() {
    const script = document.createElement('script');
    script.id = ONESIGNAL_SDK_ID;
    script.defer = true;
    script.src = ONE_SIGNAL_SCRIPT_SRC;
    // Always resolve whether or not the script is successfully initialized.
    // This is important for users who may block cdn.onesignal.com w/ adblock.
    script.onerror = () => {
        handleOnError();
    };
    document.head.appendChild(script);
}
/**
 * The following code is copied directly from the native SDK source file BrowserSupportsPush.ts
 * S T A R T
 */
// Checks if the browser supports push notifications by checking if specific
//   classes and properties on them exist
function isPushNotificationsSupported() {
    return supportsVapidPush() || supportsSafariPush();
}
function isMacOSSafariInIframe() {
    // Fallback detection for Safari on macOS in an iframe context
    return window.top !== window && // isContextIframe
        navigator.vendor === "Apple Computer, Inc." && // isSafari
        navigator.platform === "MacIntel"; // isMacOS
}
function supportsSafariPush() {
    return (window.safari && typeof window.safari.pushNotification !== "undefined") ||
        isMacOSSafariInIframe();
}
// Does the browser support the standard Push API
function supportsVapidPush() {
    return typeof PushSubscriptionOptions !== "undefined" &&
        PushSubscriptionOptions.prototype.hasOwnProperty("applicationServerKey");
}
/* E N D */
/**
 * This is a SPECIAL FUNCTION
 * It is a hardcoded implementation copied from the upstream/native WebSDK since we want to return a boolean immediately
 * Natively, this is done via the shimloading mechanism (i.e. if the SDK loads, push is supported)
 * @PublicApi
 */
const isPushSupported = () => {
    return isPushNotificationsSupported();
};
/**
 * @PublicApi
 */
const init = (options) => {
    if (isOneSignalInitialized) {
        return Promise.reject(`OneSignal is already initialized.`);
    }
    if (!options || !options.appId) {
        throw new Error('You need to provide your OneSignal appId.');
    }
    if (!document) {
        return Promise.reject(`Document is not defined.`);
    }
    return new Promise((resolve) => {
        var _a;
        (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
            OneSignal.init(options).then(() => {
                isOneSignalInitialized = true;
                resolve();
            });
        });
    });
};
function oneSignalLogin(externalId, jwtToken) {
    return new Promise((resolve, reject) => {
        var _a;
        if (isOneSignalScriptFailed) {
            reject(new Error('OneSignal script failed to load.'));
            return;
        }
        try {
            (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
                OneSignal.login(externalId, jwtToken).then(() => resolve())
                    .catch((error) => reject(error));
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
function oneSignalLogout() {
    return new Promise((resolve, reject) => {
        var _a;
        if (isOneSignalScriptFailed) {
            reject(new Error('OneSignal script failed to load.'));
            return;
        }
        try {
            (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
                OneSignal.logout().then(() => resolve())
                    .catch((error) => reject(error));
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
function oneSignalSetConsentGiven(consent) {
    return new Promise((resolve, reject) => {
        var _a;
        if (isOneSignalScriptFailed) {
            reject(new Error('OneSignal script failed to load.'));
            return;
        }
        try {
            (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
                OneSignal.setConsentGiven(consent).then(() => resolve())
                    .catch((error) => reject(error));
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
function oneSignalSetConsentRequired(requiresConsent) {
    return new Promise((resolve, reject) => {
        var _a;
        if (isOneSignalScriptFailed) {
            reject(new Error('OneSignal script failed to load.'));
            return;
        }
        try {
            (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
                OneSignal.setConsentRequired(requiresConsent).then(() => resolve())
                    .catch((error) => reject(error));
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
function slidedownPromptPush(options) {
    return new Promise((resolve, reject) => {
        var _a;
        if (isOneSignalScriptFailed) {
            reject(new Error('OneSignal script failed to load.'));
            return;
        }
        try {
            (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
                OneSignal.Slidedown.promptPush(options).then(() => resolve())
                    .catch((error) => reject(error));
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
function slidedownPromptPushCategories(options) {
    return new Promise((resolve, reject) => {
        var _a;
        if (isOneSignalScriptFailed) {
            reject(new Error('OneSignal script failed to load.'));
            return;
        }
        try {
            (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
                OneSignal.Slidedown.promptPushCategories(options).then(() => resolve())
                    .catch((error) => reject(error));
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
function slidedownPromptSms(options) {
    return new Promise((resolve, reject) => {
        var _a;
        if (isOneSignalScriptFailed) {
            reject(new Error('OneSignal script failed to load.'));
            return;
        }
        try {
            (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
                OneSignal.Slidedown.promptSms(options).then(() => resolve())
                    .catch((error) => reject(error));
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
function slidedownPromptEmail(options) {
    return new Promise((resolve, reject) => {
        var _a;
        if (isOneSignalScriptFailed) {
            reject(new Error('OneSignal script failed to load.'));
            return;
        }
        try {
            (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
                OneSignal.Slidedown.promptEmail(options).then(() => resolve())
                    .catch((error) => reject(error));
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
function slidedownPromptSmsAndEmail(options) {
    return new Promise((resolve, reject) => {
        var _a;
        if (isOneSignalScriptFailed) {
            reject(new Error('OneSignal script failed to load.'));
            return;
        }
        try {
            (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
                OneSignal.Slidedown.promptSmsAndEmail(options).then(() => resolve())
                    .catch((error) => reject(error));
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
function slidedownAddEventListener(event, listener) {
    var _a;
    (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
        OneSignal.Slidedown.addEventListener(event, listener);
    });
}
function slidedownRemoveEventListener(event, listener) {
    var _a;
    (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
        OneSignal.Slidedown.removeEventListener(event, listener);
    });
}
function notificationsSetDefaultUrl(url) {
    return new Promise((resolve, reject) => {
        var _a;
        if (isOneSignalScriptFailed) {
            reject(new Error('OneSignal script failed to load.'));
            return;
        }
        try {
            (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
                OneSignal.Notifications.setDefaultUrl(url).then(() => resolve())
                    .catch((error) => reject(error));
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
function notificationsSetDefaultTitle(title) {
    return new Promise((resolve, reject) => {
        var _a;
        if (isOneSignalScriptFailed) {
            reject(new Error('OneSignal script failed to load.'));
            return;
        }
        try {
            (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
                OneSignal.Notifications.setDefaultTitle(title).then(() => resolve())
                    .catch((error) => reject(error));
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
function notificationsRequestPermission() {
    return new Promise((resolve, reject) => {
        var _a;
        if (isOneSignalScriptFailed) {
            reject(new Error('OneSignal script failed to load.'));
            return;
        }
        try {
            (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
                OneSignal.Notifications.requestPermission().then(() => resolve())
                    .catch((error) => reject(error));
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
function notificationsAddEventListener(event, listener) {
    var _a;
    (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
        OneSignal.Notifications.addEventListener(event, listener);
    });
}
function notificationsRemoveEventListener(event, listener) {
    var _a;
    (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
        OneSignal.Notifications.removeEventListener(event, listener);
    });
}
function sessionSendOutcome(outcomeName, outcomeWeight) {
    return new Promise((resolve, reject) => {
        var _a;
        if (isOneSignalScriptFailed) {
            reject(new Error('OneSignal script failed to load.'));
            return;
        }
        try {
            (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
                OneSignal.Session.sendOutcome(outcomeName, outcomeWeight).then(() => resolve())
                    .catch((error) => reject(error));
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
function sessionSendUniqueOutcome(outcomeName) {
    return new Promise((resolve, reject) => {
        var _a;
        if (isOneSignalScriptFailed) {
            reject(new Error('OneSignal script failed to load.'));
            return;
        }
        try {
            (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
                OneSignal.Session.sendUniqueOutcome(outcomeName).then(() => resolve())
                    .catch((error) => reject(error));
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
function userAddAlias(label, id) {
    var _a;
    (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
        OneSignal.User.addAlias(label, id);
    });
}
function userAddAliases(aliases) {
    var _a;
    (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
        OneSignal.User.addAliases(aliases);
    });
}
function userRemoveAlias(label) {
    var _a;
    (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
        OneSignal.User.removeAlias(label);
    });
}
function userRemoveAliases(labels) {
    var _a;
    (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
        OneSignal.User.removeAliases(labels);
    });
}
function userAddEmail(email) {
    var _a;
    (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
        OneSignal.User.addEmail(email);
    });
}
function userRemoveEmail(email) {
    var _a;
    (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
        OneSignal.User.removeEmail(email);
    });
}
function userAddSms(smsNumber) {
    var _a;
    (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
        OneSignal.User.addSms(smsNumber);
    });
}
function userRemoveSms(smsNumber) {
    var _a;
    (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
        OneSignal.User.removeSms(smsNumber);
    });
}
function userAddTag(key, value) {
    var _a;
    (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
        OneSignal.User.addTag(key, value);
    });
}
function userAddTags(tags) {
    var _a;
    (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
        OneSignal.User.addTags(tags);
    });
}
function userRemoveTag(key) {
    var _a;
    (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
        OneSignal.User.removeTag(key);
    });
}
function userRemoveTags(keys) {
    var _a;
    (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
        OneSignal.User.removeTags(keys);
    });
}
function userGetTags() {
    var _a;
    let retVal;
    (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
        retVal = OneSignal.User.getTags();
    });
    return retVal;
}
function userAddEventListener(event, listener) {
    var _a;
    (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
        OneSignal.User.addEventListener(event, listener);
    });
}
function userRemoveEventListener(event, listener) {
    var _a;
    (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
        OneSignal.User.removeEventListener(event, listener);
    });
}
function userSetLanguage(language) {
    var _a;
    (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
        OneSignal.User.setLanguage(language);
    });
}
function userGetLanguage() {
    var _a;
    let retVal;
    (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
        retVal = OneSignal.User.getLanguage();
    });
    return retVal;
}
function pushSubscriptionOptIn() {
    return new Promise((resolve, reject) => {
        var _a;
        if (isOneSignalScriptFailed) {
            reject(new Error('OneSignal script failed to load.'));
            return;
        }
        try {
            (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
                OneSignal.User.PushSubscription.optIn().then(() => resolve())
                    .catch((error) => reject(error));
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
function pushSubscriptionOptOut() {
    return new Promise((resolve, reject) => {
        var _a;
        if (isOneSignalScriptFailed) {
            reject(new Error('OneSignal script failed to load.'));
            return;
        }
        try {
            (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
                OneSignal.User.PushSubscription.optOut().then(() => resolve())
                    .catch((error) => reject(error));
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
function pushSubscriptionAddEventListener(event, listener) {
    var _a;
    (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
        OneSignal.User.PushSubscription.addEventListener(event, listener);
    });
}
function pushSubscriptionRemoveEventListener(event, listener) {
    var _a;
    (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
        OneSignal.User.PushSubscription.removeEventListener(event, listener);
    });
}
function debugSetLogLevel(logLevel) {
    var _a;
    (_a = window.OneSignalDeferred) === null || _a === void 0 ? void 0 : _a.push((OneSignal) => {
        OneSignal.Debug.setLogLevel(logLevel);
    });
}
const PushSubscriptionNamespace = {
    get id() { var _a, _b, _c; return (_c = (_b = (_a = window.OneSignal) === null || _a === void 0 ? void 0 : _a.User) === null || _b === void 0 ? void 0 : _b.PushSubscription) === null || _c === void 0 ? void 0 : _c.id; },
    get token() { var _a, _b, _c; return (_c = (_b = (_a = window.OneSignal) === null || _a === void 0 ? void 0 : _a.User) === null || _b === void 0 ? void 0 : _b.PushSubscription) === null || _c === void 0 ? void 0 : _c.token; },
    get optedIn() { var _a, _b, _c; return (_c = (_b = (_a = window.OneSignal) === null || _a === void 0 ? void 0 : _a.User) === null || _b === void 0 ? void 0 : _b.PushSubscription) === null || _c === void 0 ? void 0 : _c.optedIn; },
    optIn: pushSubscriptionOptIn,
    optOut: pushSubscriptionOptOut,
    addEventListener: pushSubscriptionAddEventListener,
    removeEventListener: pushSubscriptionRemoveEventListener,
};
const UserNamespace = {
    get onesignalId() { var _a, _b; return (_b = (_a = window.OneSignal) === null || _a === void 0 ? void 0 : _a.User) === null || _b === void 0 ? void 0 : _b.onesignalId; },
    get externalId() { var _a, _b; return (_b = (_a = window.OneSignal) === null || _a === void 0 ? void 0 : _a.User) === null || _b === void 0 ? void 0 : _b.externalId; },
    addAlias: userAddAlias,
    addAliases: userAddAliases,
    removeAlias: userRemoveAlias,
    removeAliases: userRemoveAliases,
    addEmail: userAddEmail,
    removeEmail: userRemoveEmail,
    addSms: userAddSms,
    removeSms: userRemoveSms,
    addTag: userAddTag,
    addTags: userAddTags,
    removeTag: userRemoveTag,
    removeTags: userRemoveTags,
    getTags: userGetTags,
    addEventListener: userAddEventListener,
    removeEventListener: userRemoveEventListener,
    setLanguage: userSetLanguage,
    getLanguage: userGetLanguage,
    PushSubscription: PushSubscriptionNamespace,
};
const SessionNamespace = {
    sendOutcome: sessionSendOutcome,
    sendUniqueOutcome: sessionSendUniqueOutcome,
};
const DebugNamespace = {
    setLogLevel: debugSetLogLevel,
};
const SlidedownNamespace = {
    promptPush: slidedownPromptPush,
    promptPushCategories: slidedownPromptPushCategories,
    promptSms: slidedownPromptSms,
    promptEmail: slidedownPromptEmail,
    promptSmsAndEmail: slidedownPromptSmsAndEmail,
    addEventListener: slidedownAddEventListener,
    removeEventListener: slidedownRemoveEventListener,
};
const NotificationsNamespace = {
    get permissionNative() { var _a, _b, _c; return (_c = (_b = (_a = window.OneSignal) === null || _a === void 0 ? void 0 : _a.Notifications) === null || _b === void 0 ? void 0 : _b.permissionNative) !== null && _c !== void 0 ? _c : 'default'; },
    get permission() { var _a, _b, _c; return (_c = (_b = (_a = window.OneSignal) === null || _a === void 0 ? void 0 : _a.Notifications) === null || _b === void 0 ? void 0 : _b.permission) !== null && _c !== void 0 ? _c : false; },
    setDefaultUrl: notificationsSetDefaultUrl,
    setDefaultTitle: notificationsSetDefaultTitle,
    isPushSupported,
    requestPermission: notificationsRequestPermission,
    addEventListener: notificationsAddEventListener,
    removeEventListener: notificationsRemoveEventListener,
};
const OneSignalNamespace = {
    login: oneSignalLogin,
    logout: oneSignalLogout,
    init,
    setConsentGiven: oneSignalSetConsentGiven,
    setConsentRequired: oneSignalSetConsentRequired,
    Slidedown: SlidedownNamespace,
    Notifications: NotificationsNamespace,
    Session: SessionNamespace,
    User: UserNamespace,
    Debug: DebugNamespace,
};
const OneSignal = OneSignalNamespace;

module.exports = OneSignal;
//# sourceMappingURL=index.js.map
