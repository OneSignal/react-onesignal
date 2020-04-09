// eslint-disable-next-line no-unused-vars
import { IOneSignal } from './oneSignal.types';

const DEFAULT_BASE_SCRIPT_ID = 'react-onesignal-base';

const DEFAULT_MODULE_SCRIPT_ID = 'react-onesignal-module';

/**
 * Provides the OneSignal script to inject.
 */
const ONE_SIGNAL_SCRIPT_SRC = 'https://cdn.onesignal.com/sdks/OneSignalSDK.js';

/**
 * Provides the module script content to inject.
 */
const getModuleScriptBody = (appId: string) => `
  var OneSignal = window.OneSignal || [];
  OneSignal.push(function() {
    OneSignal.init({
      appId: "${appId}",
    });
  });
`;

/**
 * Gets the window OneSignal instance.
 */
const getOneSignalInstance = () => {
  const OneSignal: IOneSignal = window['OneSignal'];

  if (OneSignal?.initialized) {
    return OneSignal;
  }

  return null;
};

/**
 * Injects one script into the DOM.
 * @param id script id.
 * @param buildScript script factory.
 */
const injectScript = (
  id: string,
  buildScript: (script: HTMLScriptElement) => HTMLScriptElement,
) => {
  const hasScript = !!document.getElementById(id);

  if (hasScript) {
    return;
  }

  let script = document.createElement('script');

  script.id = id;

  script = buildScript(script);

  document.body.appendChild(script);
};

/**
 * Injects the base script for OneSignal
 */
const injectBaseScript = () => {
  injectScript(DEFAULT_BASE_SCRIPT_ID, (script) => {
    script.src = ONE_SIGNAL_SCRIPT_SRC;

    return script;
  });
};

/**
 * Injects the module script for OneSignal
 */
const injectModuleScript = (appId: string) => {
  injectScript(DEFAULT_MODULE_SCRIPT_ID, (script) => {
    script.innerHTML = getModuleScriptBody(appId);
    script.async = true;

    return script;
  });
};

/**
 * Initializes OneSignal.
 */
const initialize = (appId: string) => {
  if (!appId) {
    throw new Error('You need to provide your OneSignal appId.');
  }

  if (!document) {
    return;
  }

  injectBaseScript();
  injectModuleScript(appId);
};

/**
 * Array with every possible notification permission state.
 */
const notificationPermission = () => {
  const oneSignal = getOneSignalInstance();

  if (!oneSignal) {
    return null;
  }

  return oneSignal.notificationPermission;
};

/**
 * Gets the current notification permission state.
 */
const getNotificationPermission = () => new Promise<any>((resolve, reject) => {
  const oneSignal = getOneSignalInstance();

  if (!oneSignal) {
    reject();
  } else {
    resolve(oneSignal.getNotificationPermission);
  }
});

/**
 * Attempt to register for push notifications.
 * If the user hasn't authorized push notifications yet,
 * this will show a prompt to do so.
 */
const registerForPushNotifications = () => new Promise<any>((resolve, reject) => {
  const oneSignal = getOneSignalInstance();

  if (!oneSignal) {
    reject();
  } else {
    resolve(oneSignal.registerForPushNotifications);
  }
});

/**
 * Sets the email on OneSignal instance.
 * @param email email
 */
const setEmail = (email: string) => new Promise<any>((resolve, reject) => {
  const oneSignal = getOneSignalInstance();

  if (!oneSignal) {
    reject();
  } else {
    resolve(() => oneSignal.setEmail(email));
  }
});

/**
 * Gets the email ID configured on OneSignal instance.
 * @param email email
 */
const getEmailId = () => new Promise<any>((resolve, reject) => {
  const oneSignal = getOneSignalInstance();

  if (!oneSignal) {
    reject();
  } else {
    resolve(oneSignal.getEmailId);
  }
});

/**
 * Returns the Player ID from this browser.
 */
const getPlayerId = () => new Promise<any>((resolve, reject) => {
  const oneSignal = getOneSignalInstance();

  if (!oneSignal) {
    reject();
  } else {
    resolve(oneSignal.getUserId);
  }
});

/**
 * Object for manipulating OneSignal.
 */
const ReactOneSignal = {
  initialize,
  notificationPermission,
  getNotificationPermission,
  registerForPushNotifications,
  setEmail,
  getEmailId,
  getPlayerId,
};

export default ReactOneSignal;
