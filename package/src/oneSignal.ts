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
const getModuleScriptBody = (appId: string, isCustomCode: boolean) => `
  var OneSignal = window.OneSignal || [];
  OneSignal.push(function() {
    OneSignal.init({
      appId: "${appId}",
      notifyButton: {
        enable: ${isCustomCode},
      },
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
const injectModuleScript = (appId: string, isCustomCode: boolean) => {
  injectScript(DEFAULT_MODULE_SCRIPT_ID, (script) => {
    script.innerHTML = getModuleScriptBody(appId, isCustomCode);
    script.async = true;

    return script;
  });
};

/**
 * Initializes OneSignal.
 */
const initialize = (
  appId: string,
  isCustomCode: boolean = false,
) => {
  if (!appId) {
    throw new Error('You need to provide your OneSignal appId.');
  }

  if (!document) {
    return;
  }

  injectBaseScript();
  injectModuleScript(appId, isCustomCode);
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
const getNotificationPermission = () => new Promise<string>((resolve, reject) => {
  const oneSignal = getOneSignalInstance();

  if (!oneSignal) {
    reject();
    return;
  }

  try {
    oneSignal.getNotificationPermission()
      .then((value) => resolve(value))
      .catch((error) => reject(error));
  } catch (error) {
    reject(error);
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
    return;
  }

  try {
    oneSignal.registerForPushNotifications()
      .then((value) => resolve(value))
      .catch((error) => reject(error));
  } catch (error) {
    reject(error);
  }
});

/**
 * Sets the email on OneSignal instance.
 * @param email email
 */
const setEmail = (email: string) => new Promise<string>((resolve, reject) => {
  const oneSignal = getOneSignalInstance();

  if (!oneSignal) {
    reject();
    return;
  }

  try {
    oneSignal.setEmail(email)
      .then((value) => resolve(value))
      .catch((error) => reject(error));
  } catch (error) {
    reject(error);
  }
});

/**
 * Gets the email ID configured on OneSignal instance.
 * @param email email
 */
const getEmailId = () => new Promise<string>((resolve, reject) => {
  const oneSignal = getOneSignalInstance();

  if (!oneSignal) {
    reject();
    return;
  }

  try {
    oneSignal.getEmailId()
      .then((value) => resolve(value))
      .catch((error) => reject(error));
  } catch (error) {
    reject(error);
  }
});

/**
 * Returns the Player ID from this browser.
 */
const getPlayerId = () => new Promise<string>((resolve, reject) => {
  const oneSignal = getOneSignalInstance();

  if (!oneSignal) {
    reject();
    return;
  }

  try {
    oneSignal.getUserId()
      .then((value) => resolve(value))
      .catch((error) => reject(error));
  } catch (error) {
    reject(error);
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
