// eslint-disable-next-line no-unused-vars
import { IOneSignal, OneSignalOptions } from './oneSignal.types';

const DEFAULT_BASE_SCRIPT_ID = 'react-onesignal-base';

const DEFAULT_MODULE_SCRIPT_ID = 'react-onesignal-module';

/**
 * Provides the OneSignal script to inject.
 */
const ONE_SIGNAL_SCRIPT_SRC = 'https://cdn.onesignal.com/sdks/OneSignalSDK.js';

/**
 * Maps The Options Object Into A String For The Module Script
 * @param options the options object
 * @param indent
 */
const mapOptionsObject = (options: any, indent: number = 0) => {
  const TABS_LENGTH = 2;

  let result = '';

  const optionKeys = Object.keys(options || {});

  for (let index = 0; index < optionKeys.length; index += 1) {
    const key = optionKeys[index];

    const hasOwnProperty = Object.prototype.hasOwnProperty.call(options, key);

    if (!hasOwnProperty) {
      continue;
    }

    const option = options[key];

    // Functions are not supported, so we'll ignore them
    if (typeof option === 'function') {
      continue;
    }

    result += `${new Array(TABS_LENGTH * indent + 1).join(' ') + key}: `;

    switch (typeof option) {
      case 'object':
        result += `{\n${mapOptionsObject(option, indent + 1)}${new Array(4 * indent + 1).join(' ')}}`;
        break;

      case 'boolean':
      case 'number':
        result += option;
        break;

      default:
        result += `"${option}"`;
        break;
    }

    result += ',\n';
  }

  return result;
};

/**
 * Provides the module script content to inject.
 */
const getModuleScriptBody = (appId: string, options: OneSignalOptions) => {
  const mappedOptions = mapOptionsObject(options);

  return `
    var OneSignal = window.OneSignal || [];
    OneSignal.push(function() {
      OneSignal.init({
        appId: "${appId}",
        ${mappedOptions}
      });
    });
  `;
};

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
const injectModuleScript = (appId: string, options: OneSignalOptions) => {
  injectScript(DEFAULT_MODULE_SCRIPT_ID, (script) => {
    script.innerHTML = getModuleScriptBody(appId, options);
    script.async = true;

    return script;
  });
};

/**
 * Initializes OneSignal.
 */
const initialize = (appId: string, options: OneSignalOptions) => {
  if (!appId) {
    throw new Error('You need to provide your OneSignal appId.');
  }

  if (!document) {
    return;
  }

  injectBaseScript();
  injectModuleScript(appId, options);
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
 * Sets the external user ID on OneSignal instance.
 * @param externalUserId The external user ID
 */
const setExternalUserId = (
  externalUserId: string | number,
) => new Promise<void>((resolve, reject) => {
  const oneSignal = getOneSignalInstance();

  if (!oneSignal) {
    reject();
    return;
  }

  try {
    oneSignal.setExternalUserId(externalUserId)
      .then(() => resolve())
      .catch((error) => reject(error));
  } catch (error) {
    reject(error);
  }
});

/**
 * Gets the external user ID configured on OneSignal instance.
 */
const getExternalUserId = () => new Promise<string>((resolve, reject) => {
  const oneSignal = getOneSignalInstance();

  if (!oneSignal) {
    reject();
    return;
  }

  try {
    oneSignal.getExternalUserId()
      .then((value) => resolve(value))
      .catch((error) => reject(error));
  } catch (error) {
    reject(error);
  }
});

/**
 * Sets a key/value "tag" pair on OneSignal.
 *
 * @param key string
 * @param val string
 */
const sendTag = (key: string, val: string) => new Promise<string>((resolve, reject) => {
  const oneSignal = getOneSignalInstance();

  if (!oneSignal) {
    reject();
    return;
  }

  try {
    oneSignal.sendTag(key, val)
        .then((value) => resolve(value))
        .catch((error) => reject(error));
  } catch (error) {
    reject(error);
  }
});

/**
 * Sets a collection of key/value "tag" pairs on OneSignal.
 *
 * @param keyValues obj
 */
const sendTags = (keyValues: object) => new Promise<string>((resolve, reject) => {
  const oneSignal = getOneSignalInstance();

  if (!oneSignal) {
    reject();
    return;
  }

  try {
    oneSignal.sendTags(keyValues)
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
  setExternalUserId,
  getExternalUserId,
  sendTag,
  sendTags,
};

export default ReactOneSignal;
