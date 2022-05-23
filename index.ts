const ONESIGNAL_SDK_ID = 'onesignal-sdk';
const ONE_SIGNAL_SCRIPT_SRC = 'https://cdn.onesignal.com/sdks/OneSignalSDK.js';
const reactOneSignalFunctionQueue = [];

// true if the script is successfully loaded from CDN.
let isOneSignalInitialized = false;
// true if the script fails to load from CDN. A separate flag is necessary
// to disambiguate between a CDN load failure and a delayed call to
// OneSignal#init.
let isOneSignalScriptFailed = false;

const doesOneSignalExist = () => {
  if (window["OneSignal"]) {
    return true;
  }
  return false;
}

const handleOnLoad = (resolve: () => void, options: IInitObject) => {
  isOneSignalInitialized = true;

  // OneSignal is assumed to be loaded correctly because this method
  // is called after the script is successfully loaded by CDN, but
  // just in case.
  window["OneSignal"] = window["OneSignal"] || []

  window["OneSignal"].push(() => {
    window["OneSignal"].init(options);
  });

  window["OneSignal"].push(() => {
    processQueuedOneSignalFunctions();
    resolve();
  });
}

const handleOnError = (resolve: () => void) => {
  isOneSignalScriptFailed = true;
  // Ensure that any unresolved functions are cleared from the queue,
  // even in the event of a CDN load failure.
  processQueuedOneSignalFunctions();
  resolve();
}

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

const init = (options: IInitObject) => new Promise<void>(resolve => {
  if (isOneSignalInitialized) {
    resolve();
    return;
  }

  if (!options || !options.appId) {
    throw new Error('You need to provide your OneSignal appId.');
  }
  if (!document) {
    resolve();
    return;
  }

  const script = document.createElement('script');
  script.id = ONESIGNAL_SDK_ID;
  script.src = ONE_SIGNAL_SCRIPT_SRC;
  script.async = true;

  script.onload = () => {
    handleOnLoad(resolve, options);
  };

  // Always resolve whether or not the script is successfully initialized.
  // This is important for users who may block cdn.onesignal.com w/ adblock.
  script.onerror = () => {
    handleOnError(resolve);
  }

  document.head.appendChild(script);
});

type Action<T> = (item: T) => void;
interface AutoPromptOptions { force?: boolean; forceSlidedownOverNative?: boolean; slidedownPromptOptions?: IOneSignalAutoPromptOptions; }
interface RegisterOptions { modalPrompt?: boolean; httpPermissionRequest?: boolean; slidedown?: boolean; autoAccept?: boolean }
interface SetSMSOptions { identifierAuthHash?: string; }
interface SetEmailOptions { identifierAuthHash?: string; emailAuthHash?: string; }
interface TagsObject<T> { [key: string]: T; }
interface IOneSignalAutoPromptOptions { force?: boolean; forceSlidedownOverNative?: boolean; isInUpdateMode?: boolean; categoryOptions?: IOneSignalCategories; }
interface IOneSignalCategories { positiveUpdateButton: string; negativeUpdateButton: string; savingButtonText: string; errorButtonText: string; updateMessage: string; tags: IOneSignalTagCategory[]; }
interface IOneSignalTagCategory { tag: string; label: string; checked?: boolean; }

interface IInitObject {
  appId: string;
  subdomainName?: string;
  requiresUserPrivacyConsent?: boolean;
  promptOptions?: object;
  welcomeNotification?: object;
  notifyButton?: object;
  persistNotification?: boolean;
  webhooks?: object;
  autoResubscribe?: boolean;
  autoRegister?: boolean;
  notificationClickHandlerMatch?: string;
  notificationClickHandlerAction?: string;
  serviceWorkerParam?: { scope: string };
  serviceWorkerPath?: string;
  serviceWorkerUpdaterPath?: string;
  path?: string;
  allowLocalhostAsSecureOrigin?: boolean;
  [key: string]: any;
}

interface IOneSignal {
	init(options: IInitObject): Promise<void>
	on(event: string, listener: (eventData?: any) => void): void
	off(event: string, listener: (eventData?: any) => void): void
	once(event: string, listener: (eventData?: any) => void): void
	isPushNotificationsEnabled(callback?: Action<boolean>): Promise<boolean>
	showHttpPrompt(options?: AutoPromptOptions): Promise<void>
	registerForPushNotifications(options?: RegisterOptions): Promise<void>
	setDefaultNotificationUrl(url: string): Promise<void>
	setDefaultTitle(title: string): Promise<void>
	getTags(callback?: Action<any>): Promise<void>
	sendTag(key: string, value: any, callback?: Action<Object>): Promise<Object | null>
	sendTags(tags: TagsObject<any>, callback?: Action<Object>): Promise<Object | null>
	deleteTag(tag: string): Promise<Array<string>>
	deleteTags(tags: Array<string>, callback?: Action<Array<string>>): Promise<Array<string>>
	addListenerForNotificationOpened(callback?: Action<Notification>): Promise<void>
	setSubscription(newSubscription: boolean): Promise<void>
	showHttpPermissionRequest(options?: AutoPromptOptions): Promise<any>
	showNativePrompt(): Promise<void>
	showSlidedownPrompt(options?: AutoPromptOptions): Promise<void>
	showCategorySlidedown(options?: AutoPromptOptions): Promise<void>
	showSmsSlidedown(options?: AutoPromptOptions): Promise<void>
	showEmailSlidedown(options?: AutoPromptOptions): Promise<void>
	showSmsAndEmailSlidedown(options?: AutoPromptOptions): Promise<void>
	getNotificationPermission(onComplete?: Action<NotificationPermission>): Promise<NotificationPermission>
	getUserId(callback?: Action<string | undefined | null>): Promise<string | undefined | null>
	getSubscription(callback?: Action<boolean>): Promise<boolean>
	setEmail(email: string, options?: SetEmailOptions): Promise<string|null>
	setSMSNumber(smsNumber: string, options?: SetSMSOptions): Promise<string | null>
	logoutEmail(): Promise<void>
	logoutSMS(): Promise<void>
	setExternalUserId(externalUserId: string | undefined | null, authHash?: string): Promise<void>
	removeExternalUserId(): Promise<void>
	getExternalUserId(): Promise<string | undefined | null>
	provideUserConsent(consent: boolean): Promise<void>
	getEmailId(callback?: Action<string | undefined>): Promise<string | null | undefined>
	getSMSId(callback?: Action<string | undefined>): Promise<string | null | undefined>
	sendOutcome(outcomeName: string, outcomeWeight?: number | undefined): Promise<void>
	[index: string]: Function;
}



  function on(event: string, listener: (eventData?: any) => void): void {
    if (!doesOneSignalExist()) {
      reactOneSignalFunctionQueue.push({
        name: 'on',
        args: arguments,
      });
      return;
    }

    window["OneSignal"].push(() => {
      window["OneSignal"].on(event, listener)
    });
  }

  function off(event: string, listener: (eventData?: any) => void): void {
    if (!doesOneSignalExist()) {
      reactOneSignalFunctionQueue.push({
        name: 'off',
        args: arguments,
      });
      return;
    }

    window["OneSignal"].push(() => {
      window["OneSignal"].off(event, listener)
    });
  }

  function once(event: string, listener: (eventData?: any) => void): void {
    if (!doesOneSignalExist()) {
      reactOneSignalFunctionQueue.push({
        name: 'once',
        args: arguments,
      });
      return;
    }

    window["OneSignal"].push(() => {
      window["OneSignal"].once(event, listener)
    });
  }

  function isPushNotificationsEnabled(callback?: Action<boolean>): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'isPushNotificationsEnabled',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].isPushNotificationsEnabled(callback)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function showHttpPrompt(options?: AutoPromptOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'showHttpPrompt',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].showHttpPrompt(options)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function registerForPushNotifications(options?: RegisterOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'registerForPushNotifications',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].registerForPushNotifications(options)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function setDefaultNotificationUrl(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'setDefaultNotificationUrl',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].setDefaultNotificationUrl(url)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function setDefaultTitle(title: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'setDefaultTitle',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].setDefaultTitle(title)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function getTags(callback?: Action<any>): Promise<void> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'getTags',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].getTags(callback)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function sendTag(key: string, value: any, callback?: Action<Object>): Promise<Object | null> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'sendTag',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].sendTag(key, value, callback)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function sendTags(tags: TagsObject<any>, callback?: Action<Object>): Promise<Object | null> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'sendTags',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].sendTags(tags, callback)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function deleteTag(tag: string): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'deleteTag',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].deleteTag(tag)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function deleteTags(tags: Array<string>, callback?: Action<Array<string>>): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'deleteTags',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].deleteTags(tags, callback)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function addListenerForNotificationOpened(callback?: Action<Notification>): Promise<void> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'addListenerForNotificationOpened',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].addListenerForNotificationOpened(callback)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function setSubscription(newSubscription: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'setSubscription',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].setSubscription(newSubscription)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function showHttpPermissionRequest(options?: AutoPromptOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'showHttpPermissionRequest',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].showHttpPermissionRequest(options)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function showNativePrompt(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'showNativePrompt',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].showNativePrompt()
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function showSlidedownPrompt(options?: AutoPromptOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'showSlidedownPrompt',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].showSlidedownPrompt(options)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function showCategorySlidedown(options?: AutoPromptOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'showCategorySlidedown',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].showCategorySlidedown(options)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function showSmsSlidedown(options?: AutoPromptOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'showSmsSlidedown',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].showSmsSlidedown(options)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function showEmailSlidedown(options?: AutoPromptOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'showEmailSlidedown',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].showEmailSlidedown(options)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function showSmsAndEmailSlidedown(options?: AutoPromptOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'showSmsAndEmailSlidedown',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].showSmsAndEmailSlidedown(options)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function getNotificationPermission(onComplete?: Action<NotificationPermission>): Promise<NotificationPermission> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'getNotificationPermission',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].getNotificationPermission(onComplete)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function getUserId(callback?: Action<string | undefined | null>): Promise<string | undefined | null> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'getUserId',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].getUserId(callback)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function getSubscription(callback?: Action<boolean>): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'getSubscription',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].getSubscription(callback)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function setEmail(email: string, options?: SetEmailOptions): Promise<string|null> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'setEmail',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].setEmail(email, options)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function setSMSNumber(smsNumber: string, options?: SetSMSOptions): Promise<string | null> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'setSMSNumber',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].setSMSNumber(smsNumber, options)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function logoutEmail(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'logoutEmail',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].logoutEmail()
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function logoutSMS(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'logoutSMS',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].logoutSMS()
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function setExternalUserId(externalUserId: string | undefined | null, authHash?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'setExternalUserId',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].setExternalUserId(externalUserId, authHash)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function removeExternalUserId(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'removeExternalUserId',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].removeExternalUserId()
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function getExternalUserId(): Promise<string | undefined | null> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'getExternalUserId',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].getExternalUserId()
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function provideUserConsent(consent: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'provideUserConsent',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].provideUserConsent(consent)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function getEmailId(callback?: Action<string | undefined>): Promise<string | null | undefined> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'getEmailId',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].getEmailId(callback)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function getSMSId(callback?: Action<string | undefined>): Promise<string | null | undefined> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'getSMSId',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].getSMSId(callback)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function sendOutcome(outcomeName: string, outcomeWeight?: number | undefined): Promise<void> {
    return new Promise((resolve, reject) => {
      if (isOneSignalScriptFailed) {
        resolve();
        return;
      }

      if (!doesOneSignalExist()) {
        reactOneSignalFunctionQueue.push({
          name: 'sendOutcome',
          args: arguments,
          promiseResolver: resolve,
        });
        return;
      }

      try {
        window["OneSignal"].push(() => {
          window["OneSignal"].sendOutcome(outcomeName, outcomeWeight)
            .then((value: any) => resolve(value))
            .catch((error: any) => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

const OneSignalReact: IOneSignal = {
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
