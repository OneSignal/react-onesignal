const ONESIGNAL_SDK_ID = 'onesignal-sdk';
const ONE_SIGNAL_SCRIPT_SRC = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";

type FunctionQueueItem = { name: string; args: IArguments; namespaceName?: string, promiseResolver?: (result: any) => any };
const reactOneSignalFunctionQueue: FunctionQueueItem[] = [];

// true if the script is successfully loaded from CDN.
let isOneSignalInitialized = false;
// true if the script fails to load from CDN. A separate flag is necessary
// to disambiguate between a CDN load failure and a delayed call to
// OneSignal#init.
let isOneSignalScriptFailed = false;

/* H E L P E R S */

const doesOneSignalExist = () => {
  if (window["OneSignalDeferred"]) {
    return true;
  }
  return false;
}

const handleOnLoad = (resolve: () => void, options: IInitObject) => {
  isOneSignalInitialized = true;

  // OneSignal is assumed to be loaded correctly because this method
  // is called after the script is successfully loaded by CDN, but
  // just in case.
  window["OneSignalDeferred"] = window["OneSignalDeferred"] || []

  window["OneSignalDeferred"].push((OneSignal) => {
    OneSignal.init(options);
  });

  window["OneSignalDeferred"].push(() => {
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
    const { name, args, namespaceName, promiseResolver } = element;

    if (!!promiseResolver) {
      OneSignalNamespace[namespaceName][name](...args).then(result => {
        promiseResolver(result);
      });
    } else {
      OneSignalNamespace[namespaceName][name](...args);
    }
  });
}

/**
 * @PublicApi
 */
const isPushSupported = (): boolean => {
  const supportsVapid = typeof PushSubscriptionOptions !== "undefined" && PushSubscriptionOptions.prototype.hasOwnProperty("applicationServerKey");
  const isSafariInIframe = navigator.vendor === "Apple Computer, Inc." && window.top !== window;
  const supportsSafari = typeof window.safari !== "undefined" && typeof window.safari.pushNotification !== "undefined" || isSafariInIframe;

  return supportsVapid || supportsSafari;
}

/**
 * @PublicApi
 */
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
  script.defer = true;
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
interface IOneSignalAutoPromptOptions { force?: boolean; forceSlidedownOverNative?: boolean; isInUpdateMode?: boolean; categoryOptions?: IOneSignalCategories; }
interface IOneSignalCategories { positiveUpdateButton: string; negativeUpdateButton: string; savingButtonText: string; errorButtonText: string; updateMessage: string; tags: IOneSignalTagCategory[]; }
interface IOneSignalTagCategory { tag: string; label: string; checked?: boolean; }
type PushSubscriptionNamespaceProperties = { id: string | null | undefined; token: string | null | undefined; optedIn: boolean; };
type SubscriptionChangeEvent = { previous: PushSubscriptionNamespaceProperties; current: PushSubscriptionNamespaceProperties; };
type NotificationEventName = 'click' | 'willDisplay' | 'dismiss' | 'permissionChange' | 'permissionPromptDisplay';
interface NotificationButtonData { action?: string; title?: string; icon?: string; url?: string; }
interface StructuredNotification { id: string; content: string; heading?: string; url?: string; data?: object; rr?: string; icon?: string; image?: string; tag?: string; badge?: string; vibrate?: string; buttons?: NotificationButtonData[]; }
type SlidedownEventName = 'slidedownShown';
type NotificationCallbackType = | ((obj: StructuredNotification) => void) | ((obj: { to: NotificationPermission }) => void) | ((obj: (arg: any) => void) => void);

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
	login(externalId: string, token?: string): Promise<void>
	logout(): Promise<void>
	init(options: IInitObject): Promise<void>
	setConsentGiven(consent: boolean): Promise<void>
	setConsentRequired(requiresConsent: boolean): Promise<void>
	Slidedown: ISlidedown;
	Notifications: INotifications;
	Session: ISession;
	User: IUser;
	Debug: IDebug;
	[index: string]: any;
}
interface INotifications {
	setDefaultUrl(url: string): Promise<void>
	setDefaultTitle(title: string): Promise<void>
	isPushSupported(): boolean
	getPermissionStatus(onComplete: Action<NotificationPermission>): Promise<NotificationPermission>
	requestPermission(): Promise<void>
	addEventListener(event: NotificationEventName, listener: NotificationCallbackType): void
	removeEventListener(event: NotificationEventName, listener: NotificationCallbackType): void
	[index: string]: any;
}
interface ISlidedown {
	promptPush(options?: AutoPromptOptions): Promise<void>
	promptPushCategories(options?: AutoPromptOptions): Promise<void>
	promptSms(options?: AutoPromptOptions): Promise<void>
	promptEmail(options?: AutoPromptOptions): Promise<void>
	promptSmsAndEmail(options?: AutoPromptOptions): Promise<void>
	addEventListener(event: SlidedownEventName, listener: (wasShown: boolean) => void): void
	removeEventListener(event: SlidedownEventName, listener: (wasShown: boolean) => void): void
	[index: string]: any;
}
interface IDebug {
	setLogLevel(logLevel: string): void
	[index: string]: any;
}
interface ISession {
	sendOutcome(outcomeName: string, outcomeWeight?: number): Promise<void>
	sendUniqueOutcome(outcomeName: string): Promise<void>
	[index: string]: any;
}
interface IUser {
	addAlias(label: string, id: string): void
	addAliases(aliases: { [key: string]: string }): void
	removeAlias(label: string): void
	removeAliases(labels: string[]): void
	addEmail(email: string): void
	removeEmail(email: string): void
	addSms(smsNumber: string): void
	removeSms(smsNumber: string): void
	PushSubscription: IPushSubscription;
	[index: string]: any;
}
interface IPushSubscription {
	optIn(): Promise<void>
	optOut(): Promise<void>
	addEventListener(event: string, listener: (change: SubscriptionChangeEvent) => void): void
	removeEventListener(event: string, listener: (change: SubscriptionChangeEvent) => void): void
	[index: string]: any;
}

function login(externalId: string, token?: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject();
    }

    if (!doesOneSignalExist()) {
      reactOneSignalFunctionQueue.push({
        name: 'login',
        namespaceName: '',
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      window["OneSignalDeferred"].push((OneSignal) => {
        OneSignal.login(externalId, token)
          .then((value: any) => resolve(value))
          .catch((error: any) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
}

function logout(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject();
    }

    if (!doesOneSignalExist()) {
      reactOneSignalFunctionQueue.push({
        name: 'logout',
        namespaceName: '',
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      window["OneSignalDeferred"].push((OneSignal) => {
        OneSignal.logout()
          .then((value: any) => resolve(value))
          .catch((error: any) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
}

function setConsentGiven(consent: boolean): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject();
    }

    if (!doesOneSignalExist()) {
      reactOneSignalFunctionQueue.push({
        name: 'setConsentGiven',
        namespaceName: '',
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      window["OneSignalDeferred"].push((OneSignal) => {
        OneSignal.setConsentGiven(consent)
          .then((value: any) => resolve(value))
          .catch((error: any) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
}

function setConsentRequired(requiresConsent: boolean): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject();
    }

    if (!doesOneSignalExist()) {
      reactOneSignalFunctionQueue.push({
        name: 'setConsentRequired',
        namespaceName: '',
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      window["OneSignalDeferred"].push((OneSignal) => {
        OneSignal.setConsentRequired(requiresConsent)
          .then((value: any) => resolve(value))
          .catch((error: any) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
}

function setDefaultUrl(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject();
    }

    if (!doesOneSignalExist()) {
      reactOneSignalFunctionQueue.push({
        name: 'setDefaultUrl',
        namespaceName: 'Notifications',
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      window["OneSignalDeferred"].push((OneSignal) => {
        OneSignal.Notifications.setDefaultUrl(url)
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
      reject();
    }

    if (!doesOneSignalExist()) {
      reactOneSignalFunctionQueue.push({
        name: 'setDefaultTitle',
        namespaceName: 'Notifications',
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      window["OneSignalDeferred"].push((OneSignal) => {
        OneSignal.Notifications.setDefaultTitle(title)
          .then((value: any) => resolve(value))
          .catch((error: any) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
}

function getPermissionStatus(onComplete: Action<NotificationPermission>): Promise<NotificationPermission> {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject();
    }

    if (!doesOneSignalExist()) {
      reactOneSignalFunctionQueue.push({
        name: 'getPermissionStatus',
        namespaceName: 'Notifications',
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      window["OneSignalDeferred"].push((OneSignal) => {
        OneSignal.Notifications.getPermissionStatus(onComplete)
          .then((value: any) => resolve(value))
          .catch((error: any) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
}

function requestPermission(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject();
    }

    if (!doesOneSignalExist()) {
      reactOneSignalFunctionQueue.push({
        name: 'requestPermission',
        namespaceName: 'Notifications',
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      window["OneSignalDeferred"].push((OneSignal) => {
        OneSignal.Notifications.requestPermission()
          .then((value: any) => resolve(value))
          .catch((error: any) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
}

function addNotificationsEventListener(event: NotificationEventName, listener: NotificationCallbackType): void {
  if (!doesOneSignalExist()) {
    reactOneSignalFunctionQueue.push({
      name: 'addNotificationsEventListener',
      namespaceName: 'Notifications',
      args: arguments,
    });
    return;
  }

  window["OneSignalDeferred"].push((OneSignal) => {
    OneSignal.Notifications.addNotificationsEventListener(event, listener)
  });
}

function removeNotificationsEventListener(event: NotificationEventName, listener: NotificationCallbackType): void {
  if (!doesOneSignalExist()) {
    reactOneSignalFunctionQueue.push({
      name: 'removeNotificationsEventListener',
      namespaceName: 'Notifications',
      args: arguments,
    });
    return;
  }

  window["OneSignalDeferred"].push((OneSignal) => {
    OneSignal.Notifications.removeNotificationsEventListener(event, listener)
  });
}

function promptPush(options?: AutoPromptOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject();
    }

    if (!doesOneSignalExist()) {
      reactOneSignalFunctionQueue.push({
        name: 'promptPush',
        namespaceName: 'Slidedown',
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      window["OneSignalDeferred"].push((OneSignal) => {
        OneSignal.Slidedown.promptPush(options)
          .then((value: any) => resolve(value))
          .catch((error: any) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
}

function promptPushCategories(options?: AutoPromptOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject();
    }

    if (!doesOneSignalExist()) {
      reactOneSignalFunctionQueue.push({
        name: 'promptPushCategories',
        namespaceName: 'Slidedown',
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      window["OneSignalDeferred"].push((OneSignal) => {
        OneSignal.Slidedown.promptPushCategories(options)
          .then((value: any) => resolve(value))
          .catch((error: any) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
}

function promptSms(options?: AutoPromptOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject();
    }

    if (!doesOneSignalExist()) {
      reactOneSignalFunctionQueue.push({
        name: 'promptSms',
        namespaceName: 'Slidedown',
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      window["OneSignalDeferred"].push((OneSignal) => {
        OneSignal.Slidedown.promptSms(options)
          .then((value: any) => resolve(value))
          .catch((error: any) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
}

function promptEmail(options?: AutoPromptOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject();
    }

    if (!doesOneSignalExist()) {
      reactOneSignalFunctionQueue.push({
        name: 'promptEmail',
        namespaceName: 'Slidedown',
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      window["OneSignalDeferred"].push((OneSignal) => {
        OneSignal.Slidedown.promptEmail(options)
          .then((value: any) => resolve(value))
          .catch((error: any) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
}

function promptSmsAndEmail(options?: AutoPromptOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject();
    }

    if (!doesOneSignalExist()) {
      reactOneSignalFunctionQueue.push({
        name: 'promptSmsAndEmail',
        namespaceName: 'Slidedown',
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      window["OneSignalDeferred"].push((OneSignal) => {
        OneSignal.Slidedown.promptSmsAndEmail(options)
          .then((value: any) => resolve(value))
          .catch((error: any) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
}

function addSlidedownEventListener(event: SlidedownEventName, listener: (wasShown: boolean) => void): void {
  if (!doesOneSignalExist()) {
    reactOneSignalFunctionQueue.push({
      name: 'addSlidedownEventListener',
      namespaceName: 'Slidedown',
      args: arguments,
    });
    return;
  }

  window["OneSignalDeferred"].push((OneSignal) => {
    OneSignal.Slidedown.addSlidedownEventListener(event, listener)
  });
}

function removeSlidedownEventListener(event: SlidedownEventName, listener: (wasShown: boolean) => void): void {
  if (!doesOneSignalExist()) {
    reactOneSignalFunctionQueue.push({
      name: 'removeSlidedownEventListener',
      namespaceName: 'Slidedown',
      args: arguments,
    });
    return;
  }

  window["OneSignalDeferred"].push((OneSignal) => {
    OneSignal.Slidedown.removeSlidedownEventListener(event, listener)
  });
}

function setLogLevel(logLevel: string): void {
  if (!doesOneSignalExist()) {
    reactOneSignalFunctionQueue.push({
      name: 'setLogLevel',
      namespaceName: 'Debug',
      args: arguments,
    });
    return;
  }

  window["OneSignalDeferred"].push((OneSignal) => {
    OneSignal.Debug.setLogLevel(logLevel)
  });
}

function sendOutcome(outcomeName: string, outcomeWeight?: number): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject();
    }

    if (!doesOneSignalExist()) {
      reactOneSignalFunctionQueue.push({
        name: 'sendOutcome',
        namespaceName: 'Session',
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      window["OneSignalDeferred"].push((OneSignal) => {
        OneSignal.Session.sendOutcome(outcomeName, outcomeWeight)
          .then((value: any) => resolve(value))
          .catch((error: any) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
}

function sendUniqueOutcome(outcomeName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject();
    }

    if (!doesOneSignalExist()) {
      reactOneSignalFunctionQueue.push({
        name: 'sendUniqueOutcome',
        namespaceName: 'Session',
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      window["OneSignalDeferred"].push((OneSignal) => {
        OneSignal.Session.sendUniqueOutcome(outcomeName)
          .then((value: any) => resolve(value))
          .catch((error: any) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
}

function addAlias(label: string, id: string): void {
  if (!doesOneSignalExist()) {
    reactOneSignalFunctionQueue.push({
      name: 'addAlias',
      namespaceName: 'User',
      args: arguments,
    });
    return;
  }

  window["OneSignalDeferred"].push((OneSignal) => {
    OneSignal.User.addAlias(label, id)
  });
}

function addAliases(aliases: { [key: string]: string }): void {
  if (!doesOneSignalExist()) {
    reactOneSignalFunctionQueue.push({
      name: 'addAliases',
      namespaceName: 'User',
      args: arguments,
    });
    return;
  }

  window["OneSignalDeferred"].push((OneSignal) => {
    OneSignal.User.addAliases(aliases)
  });
}

function removeAlias(label: string): void {
  if (!doesOneSignalExist()) {
    reactOneSignalFunctionQueue.push({
      name: 'removeAlias',
      namespaceName: 'User',
      args: arguments,
    });
    return;
  }

  window["OneSignalDeferred"].push((OneSignal) => {
    OneSignal.User.removeAlias(label)
  });
}

function removeAliases(labels: string[]): void {
  if (!doesOneSignalExist()) {
    reactOneSignalFunctionQueue.push({
      name: 'removeAliases',
      namespaceName: 'User',
      args: arguments,
    });
    return;
  }

  window["OneSignalDeferred"].push((OneSignal) => {
    OneSignal.User.removeAliases(labels)
  });
}

function addEmail(email: string): void {
  if (!doesOneSignalExist()) {
    reactOneSignalFunctionQueue.push({
      name: 'addEmail',
      namespaceName: 'User',
      args: arguments,
    });
    return;
  }

  window["OneSignalDeferred"].push((OneSignal) => {
    OneSignal.User.addEmail(email)
  });
}

function removeEmail(email: string): void {
  if (!doesOneSignalExist()) {
    reactOneSignalFunctionQueue.push({
      name: 'removeEmail',
      namespaceName: 'User',
      args: arguments,
    });
    return;
  }

  window["OneSignalDeferred"].push((OneSignal) => {
    OneSignal.User.removeEmail(email)
  });
}

function addSms(smsNumber: string): void {
  if (!doesOneSignalExist()) {
    reactOneSignalFunctionQueue.push({
      name: 'addSms',
      namespaceName: 'User',
      args: arguments,
    });
    return;
  }

  window["OneSignalDeferred"].push((OneSignal) => {
    OneSignal.User.addSms(smsNumber)
  });
}

function removeSms(smsNumber: string): void {
  if (!doesOneSignalExist()) {
    reactOneSignalFunctionQueue.push({
      name: 'removeSms',
      namespaceName: 'User',
      args: arguments,
    });
    return;
  }

  window["OneSignalDeferred"].push((OneSignal) => {
    OneSignal.User.removeSms(smsNumber)
  });
}

function optIn(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject();
    }

    if (!doesOneSignalExist()) {
      reactOneSignalFunctionQueue.push({
        name: 'optIn',
        namespaceName: 'PushSubscription',
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      window["OneSignalDeferred"].push((OneSignal) => {
        OneSignal.PushSubscription.optIn()
          .then((value: any) => resolve(value))
          .catch((error: any) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
}

function optOut(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject();
    }

    if (!doesOneSignalExist()) {
      reactOneSignalFunctionQueue.push({
        name: 'optOut',
        namespaceName: 'PushSubscription',
        args: arguments,
        promiseResolver: resolve,
      });
      return;
    }

    try {
      window["OneSignalDeferred"].push((OneSignal) => {
        OneSignal.PushSubscription.optOut()
          .then((value: any) => resolve(value))
          .catch((error: any) => reject(error));
      });
    } catch (error) {
      reject(error);
    }
  });
}

function addPushSubscriptionEventListener(event: string, listener: (change: SubscriptionChangeEvent) => void): void {
  if (!doesOneSignalExist()) {
    reactOneSignalFunctionQueue.push({
      name: 'addPushSubscriptionEventListener',
      namespaceName: 'PushSubscription',
      args: arguments,
    });
    return;
  }

  window["OneSignalDeferred"].push((OneSignal) => {
    OneSignal.PushSubscription.addPushSubscriptionEventListener(event, listener)
  });
}

function removePushSubscriptionEventListener(event: string, listener: (change: SubscriptionChangeEvent) => void): void {
  if (!doesOneSignalExist()) {
    reactOneSignalFunctionQueue.push({
      name: 'removePushSubscriptionEventListener',
      namespaceName: 'PushSubscription',
      args: arguments,
    });
    return;
  }

  window["OneSignalDeferred"].push((OneSignal) => {
    OneSignal.PushSubscription.removePushSubscriptionEventListener(event, listener)
  });
}
const PushSubscriptionNamespace: IPushSubscription = {
	optIn,
	optOut,
	addEventListener: addPushSubscriptionEventListener,
	removeEventListener: removePushSubscriptionEventListener,
};

const UserNamespace: IUser = {
	addAlias,
	addAliases,
	removeAlias,
	removeAliases,
	addEmail,
	removeEmail,
	addSms,
	removeSms,
	PushSubscription: PushSubscriptionNamespace,
};

const SessionNamespace: ISession = {
	sendOutcome,
	sendUniqueOutcome,
};

const DebugNamespace: IDebug = {
	setLogLevel,
};

const SlidedownNamespace: ISlidedown = {
	promptPush,
	promptPushCategories,
	promptSms,
	promptEmail,
	promptSmsAndEmail,
	addEventListener: addSlidedownEventListener,
	removeEventListener: removeSlidedownEventListener,
};

const NotificationsNamespace: INotifications = {
	setDefaultUrl,
	setDefaultTitle,
	isPushSupported,
	getPermissionStatus,
	requestPermission,
	addEventListener: addNotificationsEventListener,
	removeEventListener: removeNotificationsEventListener,
};

const OneSignalNamespace: IOneSignal = {
	login,
	logout,
	init,
	setConsentGiven,
	setConsentRequired,
	Slidedown: SlidedownNamespace,
	Notifications: NotificationsNamespace,
	Session: SessionNamespace,
	User: UserNamespace,
	Debug: DebugNamespace,
};

const OneSignal = OneSignalNamespace;
export default OneSignal;
