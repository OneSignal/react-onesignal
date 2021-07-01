<p align="center">
  <img src="https://media.onesignal.com/cms/Website%20Layout/logo-red.svg"/>
  <br/>
  <br/>
  <span style="color: grey !important">Showing web push notifications from Chrome, Safari, and Firefox</span>
</p>

# React OneSignal
---

This is a JavaScript module that can be used to easily include [OneSignal](https://onesignal.com/) code in a website or app that uses React for its front-end codebase.

OneSignal is the world's leader for Mobile Push Notifications, Web Push, and In-App Messaging. It is trusted by 800k businesses to send 5 billion Push Notifications per day.

You can find more information on OneSignal [here](https://onesignal.com/).

## Contents
- [Install](#install)
- [Usage](#usage)
- [API](#onesignal-api)
- [Advanced Usage](#advanced-usage)

---
## Install

You can use `yarn` or `npm`.


### Yarn

```bash
yarn add react-onesignal
```

### npm

```bash
npm install --save react-onesignal
```

---
## Usage

Initialize OneSignal with your app id:

```js
import OneSignal from 'react-onesignal';

OneSignal.initialize('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
```

The `initialize` function returns a promise that resolves when OneSignal is loaded.

**Examples**
```js
await OneSignal.initialize('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
// do other stuff
```
---

```js
const [initialized, setInitialized] = useState(false);
OneSignal.initialize('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx').then(() => {
  setInitialized(true);
  OneSignal.showSlidedownPrompt().then(() => {
    // do other stuff
  });
})
```

### Options
You can pass an `options` object as the second parameter to the `initialize` function.

Where options are:

```ts
interface Options {
  safari_web_id?: string;
  subdomainName?: string;
  allowLocalhostAsSecureOrigin?: boolean;
  requiresUserPrivacyConsent?: boolean;
  persistNotification?: boolean;
  autoResubscribe?: boolean;
  autoRegister?: boolean;
  notificationClickHandlerMatch?: string;
  notificationClickHandlerAction?: string;
  notifyButton?: {
    enable?: boolean;
    size?: 'small' | 'medium' | 'large';
    position?: 'bottom-left' | 'bottom-right';
    showCredit?: boolean;
    prenotify?: boolean;
      theme?: 'default' | 'inverse';
      offset?: {
        bottom?: string;
        right?: string;
        left?: string;
      },
      text?: {
        [key: string]: string;
      };
      colors?: {
        [key: string]: string;
      };
  }
}
```

---
## OneSignal API
See the [OneSignal Web SDK reference](https://documentation.onesignal.com/docs/web-push-sdk) for more info.

```ts
interface OneSignal {
  initialize(appId: string, options?: any, events?: Array<IOneSignalEvent>): Promise<void>
  isPushNotificationsEnabled(callback?: Action<boolean>): Promise<boolean>
  showHttpPrompt(options?: AutoPromptOptions): void
  registerForPushNotifications(options?: RegisterOptions): Promise<void>
  setDefaultNotificationUrl(url: string): void
  setDefaultTitle(title: string): void
  getTags(callback?: Action<any>): void
  sendTag(key: string,  value: any,  callback?: Action<Object>): Promise<Object | null>
  sendTags(tags: TagsObject<any>,  callback?: Action<Object>): Promise<Object | null>
  deleteTag(tag: string): Promise<Array<string>>
  deleteTags(tags: Array<string>,  callback?: Action<Array<string>>): Promise<Array<string>>
  addListenerForNotificationOpened(callback?: Action<Notification>): void
  setSubscription(newSubscription: boolean): Promise<void>
  showHttpPermissionRequest(options?: AutoPromptOptions): Promise<any>
  showNativePrompt(): Promise<void>
  showSlidedownPrompt(options?: AutoPromptOptions): Promise<void>
  showCategorySlidedown(options?: AutoPromptOptions): Promise<void>
  showSmsSlidedown(options?: AutoPromptOptions): Promise<void>
  showEmailSlidedown(options?: AutoPromptOptions): Promise<void>
  showSmsAndEmailSlidedown(options?: AutoPromptOptions): Promise<void>
  getNotificationPermission(onComplete?: Function): Promise<NotificationPermission>
  getUserId(callback?: Action<string | undefined | null>): Promise<string | undefined | null>
  getSubscription(callback?: Action<boolean>): Promise<boolean>
  setEmail(email: string,  options?: SetEmailOptions): Promise<string|null>
  setSMSNumber(smsNumber: string,  options?: SetSMSOptions): Promise<string | null>
  logoutEmail(): void
  logoutSMS(): void
  setExternalUserId(externalUserId: string | undefined | null,  authHash?: string): Promise<void>
  removeExternalUserId(): Promise<void>
  getExternalUserId(): Promise<string | undefined | null>
  provideUserConsent(consent: boolean): Promise<void>
  getEmailId(callback?: Action<string | undefined>): Promise<string | null | undefined>
  getSMSId(callback?: Action<string | undefined>): Promise<string | null | undefined>
  sendOutcome(outcomeName: string,  outcomeWeight?: number | undefined): Promise<void>
}
```

### OneSignal API
See the official [OneSignal WebSDK reference](https://documentation.onesignal.com/docs/web-push-sdk) for information on all available SDK functions.

### Typescript
This package includes Typescript support.

---
## Advanced Usage
### Events and Event Listeners
You can also listen for native OneSignal events like `subscriptionChange`.

To add an event listener to the `OneSignal.push()` array, pass an array of events to the `initialize()` function as the third parameter.

Each object in the array should contain:
* `listener` -- (optional) Default value: `'on'`.
Some events can be listened for via multiple listeners (e.g. `.on()`, `.once()`).
[Check the docs](https://documentation.onesignal.com/docs/web-push-sdk) to see which listeners listen for your event.
Example: `'on'` | `'once'`

* `event` -- Name of the event being listened for.
Example: `'subscriptionChange'`

* `callback` -- Callback function for event.
Example: `(value) => { console.log(value); }`

For documentation on events and event listeners, check out the [Web Push SDK docs](https://documentation.onesignal.com/docs/web-push-sdk).

```js
const events = [
  {
    listener: 'once',
    event: 'subscriptionChange',
    callback: (isSubscribed) => {
      if (true === isSubscribed) {
        console.log('The user subscription state is now:', isSubscribed);
      }
    },
  },
  {
    event: 'notificationDisplay',
    callback: (event) => {
      console.warn('OneSignal notification displayed:', event);
    },
  },
  {
    event: 'notificationDismiss',
    callback: (event) => {
      console.warn('OneSignal notification dismissed:', event);
    },
  },
];


OneSignal.initialize(applicationId, options, events);
```

---
## Thanks
Special thanks to [pedro-lb](https://github.com/pedro-lb) and others for work on the project this package is [based on](https://github.com/pedro-lb/react-onesignal).
<a href="https://github.com/onesignal/react-onesignal/graphs/contributors">
  <img src="https://user-images.githubusercontent.com/11739227/119415383-1d354700-bcb7-11eb-946d-01c40cd07010.png" />
</a>