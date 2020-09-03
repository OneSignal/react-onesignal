import {
  IOneSignal, OneSignalOptions, IOneSignalEvent, IOneSignalAutoPromptOptions,
} from './oneSignal.types';

const DEFAULT_BASE_SCRIPT_ID = 'react-onesignal-base';

const DEFAULT_MODULE_SCRIPT_ID = 'react-onesignal-module';

/**
 * Provides the OneSignal script to inject.
 */
const ONE_SIGNAL_SCRIPT_SRC = 'https://cdn.onesignal.com/sdks/OneSignalSDK.js';

/**
 * Error to be thrown when OneSignal is not setup correctly.
 */
const ONESIGNAL_NOT_SETUP_ERROR = 'OneSignal is not setup correctly.';

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
    let key = optionKeys[index];

    const hasOwnProperty = Object.prototype.hasOwnProperty.call(options, key);

    if (!hasOwnProperty) {
      continue;
    }

    const option = options[key];

    // Functions are not supported, so we'll ignore them
    if (typeof option === 'function') {
      continue;
    }

    if (key.includes('.')) {
      key = `"${key}"`;
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
 * Take our object of OneSignal events and construct listeners.
 *
 * @param eventsArr Array of event/callback key/value pairs defined by IOneSignalEvent interface.
 * @return {string} Script snippet for injecting into the native OneSignal.push()  method.
 */
const buildEventListeners = (eventsArr: IOneSignalEvent[]) => {
  let returnStr = '';

  // Let's make sure we've got an array that isn't empty.
  if (Array.isArray(eventsArr) && eventsArr.length) {
    eventsArr.forEach((event) => {
      event.listener = event.listener || 'on';
      returnStr += `OneSignal.${event.listener}('${event.event}', ${event.callback});`;
    });
  }
  return returnStr;
};

/**
 * Provides the module script content to inject.
 */
const getModuleScriptBody = (
  appId: string,
  options: OneSignalOptions = {},
  events: IOneSignalEvent[] = [],
) => {
  const mappedOptions = mapOptionsObject(options);
  const listeners = buildEventListeners(events);

  return `
    var OneSignal = window.OneSignal || [];
    OneSignal.push(function() {
      ${listeners}
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
export const getOneSignalInstance = () => {
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
const injectModuleScript = (
  appId: string,
  options: OneSignalOptions = {},
  events: IOneSignalEvent[] = [],
) => {
  injectScript(DEFAULT_MODULE_SCRIPT_ID, (script) => {
    script.innerHTML = getModuleScriptBody(appId, options, events);
    script.async = true;

    return script;
  });
};

/**
 * Initializes OneSignal.
 */
const initialize = (appId: string, options: OneSignalOptions, events: IOneSignalEvent[] = []) => {
  if (!appId) {
    throw new Error('You need to provide your OneSignal appId.');
  }

  if (!document) {
    return;
  }

  injectBaseScript();
  injectModuleScript(appId, options, events);
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
    reject(new Error(ONESIGNAL_NOT_SETUP_ERROR));
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
    reject(new Error(ONESIGNAL_NOT_SETUP_ERROR));
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
 * Shows a sliding modal prompt on the page for users.
 */
const showSlidedownPrompt = (
  options?: IOneSignalAutoPromptOptions,
) => new Promise<void>((resolve, reject) => {
  const oneSignal = getOneSignalInstance();

  if (!oneSignal) {
    reject(new Error(ONESIGNAL_NOT_SETUP_ERROR));
    return;
  }

  try {
    oneSignal.showSlidedownPrompt(options)
      .then(((value) => resolve(value)))
      .catch((error) => reject(error));
  } catch (error) {
    reject(error);
  }
});

/**
 * Shows a category sliding modal prompt on the page for users.
 */
const showCategorySlidedown = (
  options?: IOneSignalAutoPromptOptions,
) => new Promise<void>((resolve, reject) => {
  const oneSignal = getOneSignalInstance();

  if (!oneSignal) {
    reject(new Error(ONESIGNAL_NOT_SETUP_ERROR));
    return;
  }

  try {
    oneSignal.showCategorySlidedown(options)
      .then(((value) => resolve(value)))
      .catch((error) => reject(error));
  } catch (error) {
    reject(error);
  }
});

/**
 * Check if the user has already accepted push notifications and
 * successfully registered with Google's FCM server and OneSignal's
 * server (i.e. the user is able to receive notifications).
 * Only compatible with HTTPS
 *
 * @return {Promise<boolean>} A promise that return if the user is
 * able to receive notifications
 */
const isPushNotificationsEnabled = () => new Promise<boolean>((resolve, reject) => {
  const oneSignal = getOneSignalInstance();

  if (!oneSignal) {
    reject();
    return;
  }

  try {
    oneSignal.isPushNotificationsEnabled()
      .then(((value) => resolve(value)))
      .catch((error) => reject(error));
  } catch (error) {
    reject(error);
  }
});

/**
 * Check if the current browser environment viewing the page
 * supports push notifications.
 *
 * @return {boolean} The current browser environment viewing the page
 * supports push notifications.
 */
const isPushNotificationsSupported = () => {
  const oneSignal = getOneSignalInstance();

  if (!oneSignal) {
    return null;
  }

  return oneSignal.isPushNotificationsSupported();
};

/**
 * This function lets a site mute or unmute notifications for the current user.
 *
 * @param {boolean} unmute
 */
const setSubscription = (unmute: boolean) => new Promise<any>((resolve, reject) => {
  const oneSignal = getOneSignalInstance();

  if (!oneSignal) {
    reject(new Error(ONESIGNAL_NOT_SETUP_ERROR));
    return;
  }

  try {
    oneSignal.setSubscription(unmute)
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
    reject(new Error(ONESIGNAL_NOT_SETUP_ERROR));
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
 * Remove email on OneSignal instance.
 */
const logoutEmail = () => new Promise<void>((resolve, reject) => {
  const oneSignal = getOneSignalInstance();

  if (!oneSignal) {
    reject(new Error(ONESIGNAL_NOT_SETUP_ERROR));
    return;
  }

  try {
    oneSignal.logoutEmail()
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
    reject(new Error(ONESIGNAL_NOT_SETUP_ERROR));
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
    reject(new Error(ONESIGNAL_NOT_SETUP_ERROR));
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
    reject(new Error(ONESIGNAL_NOT_SETUP_ERROR));
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
 * Sets the external user ID on OneSignal instance.
 */
const removeExternalUserId = (
) => new Promise<void>((resolve, reject) => {
  const oneSignal = getOneSignalInstance();

  if (!oneSignal) {
    reject(new Error(ONESIGNAL_NOT_SETUP_ERROR));
    return;
  }

  try {
    oneSignal.removeExternalUserId()
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
    reject(new Error(ONESIGNAL_NOT_SETUP_ERROR));
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
    reject(new Error(ONESIGNAL_NOT_SETUP_ERROR));
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
    reject(new Error(ONESIGNAL_NOT_SETUP_ERROR));
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
  getOneSignalInstance,
  initialize,
  notificationPermission,
  getNotificationPermission,
  registerForPushNotifications,
  showSlidedownPrompt,
  showCategorySlidedown,
  isPushNotificationsEnabled,
  isPushNotificationsSupported,
  setSubscription,
  setEmail,
  logoutEmail,
  getEmailId,
  getPlayerId,
  setExternalUserId,
  removeExternalUserId,
  getExternalUserId,
  sendTag,
  sendTags,
};

export default ReactOneSignal;
