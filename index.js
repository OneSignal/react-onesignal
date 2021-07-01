const ONESIGNAL_SDK_ID = 'onesignal-sdk';
const MODULE_ID = 'onesignal-module';
const ONE_SIGNAL_SCRIPT_SRC = 'https://cdn.onesignal.com/sdks/OneSignalSDK.js';
const ONESIGNAL_NOT_SETUP_ERROR = 'OneSignal is not setup correctly.';
const reactOneSignalFunctionQueue = [];
const MAX_TIMEOUT = 30;

const getModuleScriptBody = (options = {}) => {
    const mappedOptions = JSON.stringify(options, null, 2);

    return `
      var OneSignal = window.OneSignal || [];
      OneSignal.push(function() {
        OneSignal.init(${mappedOptions});
      });
    `;
};

const injectScript = (id, buildScript) => {
  const hasScript = !!document.getElementById(id);
  if (hasScript) {
    return;
  }
  let script = document.createElement('script');
  script.id = id;
  script = buildScript(script);
  document.body.appendChild(script);
};

const injectSDKScript = () => {
    injectScript(ONESIGNAL_SDK_ID, (script) => {
      script.src = ONE_SIGNAL_SCRIPT_SRC;
      return script;
    });
};

const injectModuleScript = (options= {}) => {
  injectScript(MODULE_ID, (script) => {
    script.innerHTML = getModuleScriptBody(options);
    script.async = true;
    return script;
  });
};

const processQueuedOneSignalFunctions = () => {
  reactOneSignalFunctionQueue.forEach(element => {
    const { name, args, promiseResolver } = element;

    if (!!promiseResolver) {
      OneSignalReact[name](...args).then(result => {
        promiseResolver(result);
      });
    } else {
      OneSignalReact[name](...args);
    }
  });
}

const init = (options) => new Promise(resolve => {
  if (!options || !options.appId) {
    throw new Error('You need to provide your OneSignal appId.');
  }
  if (!document) {
    return;
  }
  injectSDKScript();
  injectModuleScript(options);

  const timeout = setTimeout(() => {
    console.error(ONESIGNAL_NOT_SETUP_ERROR);
  }, MAX_TIMEOUT * 1_000);

  OneSignal.push(() => {
    clearTimeout(timeout);
    processQueuedOneSignalFunctions();
    resolve();
  });
});


function on(event, listener) {
  const oneSignal = window["OneSignal"] || null;
  if (!oneSignal) {
    reactOneSignalFunctionQueue.push({
      name: "on",
      args: arguments,
    });
    return;
  }

  OneSignal.push(() => {
    OneSignal.on(event, listener)
  });
};

function off(event, listener) {
  const oneSignal = window["OneSignal"] || null;
  if (!oneSignal) {
    reactOneSignalFunctionQueue.push({
      name: "off",
      args: arguments,
    });
    return;
  }

  OneSignal.push(() => {
    OneSignal.off(event, listener)
  });
};

function once(event, listener) {
  const oneSignal = window["OneSignal"] || null;
  if (!oneSignal) {
    reactOneSignalFunctionQueue.push({
      name: "once",
      args: arguments,
    });
    return;
  }

  OneSignal.push(() => {
    OneSignal.once(event, listener)
  });
};

function isPushNotificationsEnabled(callback) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "isPushNotificationsEnabled",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.isPushNotificationsEnabled(callback)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function showHttpPrompt(options) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "showHttpPrompt",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.showHttpPrompt(options)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function registerForPushNotifications(options) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "registerForPushNotifications",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.registerForPushNotifications(options)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function setDefaultNotificationUrl(url) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "setDefaultNotificationUrl",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.setDefaultNotificationUrl(url)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function setDefaultTitle(title) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "setDefaultTitle",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.setDefaultTitle(title)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function getTags(callback) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "getTags",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.getTags(callback)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function sendTag(key,  value,  callback) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "sendTag",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.sendTag(key,  value,  callback)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function sendTags(tags,  callback) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "sendTags",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.sendTags(tags,  callback)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function deleteTag(tag) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "deleteTag",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.deleteTag(tag)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function deleteTags(tags,  callback) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "deleteTags",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.deleteTags(tags,  callback)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function addListenerForNotificationOpened(callback) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "addListenerForNotificationOpened",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.addListenerForNotificationOpened(callback)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function setSubscription(newSubscription) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "setSubscription",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.setSubscription(newSubscription)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function showHttpPermissionRequest(options) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "showHttpPermissionRequest",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.showHttpPermissionRequest(options)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function showNativePrompt() {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "showNativePrompt",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.showNativePrompt()
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function showSlidedownPrompt(options) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "showSlidedownPrompt",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.showSlidedownPrompt(options)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function showCategorySlidedown(options) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "showCategorySlidedown",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.showCategorySlidedown(options)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function showSmsSlidedown(options) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "showSmsSlidedown",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.showSmsSlidedown(options)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function showEmailSlidedown(options) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "showEmailSlidedown",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.showEmailSlidedown(options)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function showSmsAndEmailSlidedown(options) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "showSmsAndEmailSlidedown",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.showSmsAndEmailSlidedown(options)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function getNotificationPermission(onComplete) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "getNotificationPermission",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.getNotificationPermission(onComplete)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function getUserId(callback) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "getUserId",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.getUserId(callback)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function getSubscription(callback) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "getSubscription",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.getSubscription(callback)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function setEmail(email,  options) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "setEmail",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.setEmail(email,  options)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function setSMSNumber(smsNumber,  options) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "setSMSNumber",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.setSMSNumber(smsNumber,  options)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function logoutEmail() {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "logoutEmail",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.logoutEmail()
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function logoutSMS() {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "logoutSMS",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.logoutSMS()
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function setExternalUserId(externalUserId,  authHash) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "setExternalUserId",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.setExternalUserId(externalUserId,  authHash)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function removeExternalUserId() {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "removeExternalUserId",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.removeExternalUserId()
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function getExternalUserId() {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "getExternalUserId",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.getExternalUserId()
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function provideUserConsent(consent) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "provideUserConsent",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.provideUserConsent(consent)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function getEmailId(callback) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "getEmailId",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.getEmailId(callback)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function getSMSId(callback) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "getSMSId",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.getSMSId(callback)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

function sendOutcome(outcomeName,  outcomeWeight) {
  return new Promise((resolve, reject) => {
    const oneSignal = window["OneSignal"] || null;
    if (!oneSignal) {
      reactOneSignalFunctionQueue.push({
        name: "sendOutcome",
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      OneSignal.push(() => {
        OneSignal.sendOutcome(outcomeName,  outcomeWeight)
          .then((value) => resolve(value))
          .catch((error) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
};

const OneSignalReact = {
	init,
	on,
	off,
	once,
	isPushNotificationsEnabled,
	showHttpPrompt,
	registerForPushNotifications,
	setDefaultNotificationUrl,
	setDefaultTitle,
	getTags,
	sendTag,
	sendTags,
	deleteTag,
	deleteTags,
	addListenerForNotificationOpened,
	setSubscription,
	showHttpPermissionRequest,
	showNativePrompt,
	showSlidedownPrompt,
	showCategorySlidedown,
	showSmsSlidedown,
	showEmailSlidedown,
	showSmsAndEmailSlidedown,
	getNotificationPermission,
	getUserId,
	getSubscription,
	setEmail,
	setSMSNumber,
	logoutEmail,
	logoutSMS,
	setExternalUserId,
	removeExternalUserId,
	getExternalUserId,
	provideUserConsent,
	getEmailId,
	getSMSId,
	sendOutcome,
};
export default OneSignalReact
