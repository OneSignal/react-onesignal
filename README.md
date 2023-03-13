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

### Migration Guide
Version 2.0 was recently released. Read the [Migration Guide](https://github.com/OneSignal/react-onesignal/blob/master/MigrationGuide.md) here if you're coming from a version 1 release of the SDK.

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

Initialize OneSignal with your `appId` via the `options` parameter:

```js
import OneSignal from 'react-onesignal';

OneSignal.init({ appId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' });
```

The `init` function returns a promise that resolves when OneSignal is loaded.

**Examples**
```js
await OneSignal.init({ appId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' });
// do other stuff
```
---

```js
const [initialized, setInitialized] = useState(false);
OneSignal.init({ appId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' }).then(() => {
  setInitialized(true);
  OneSignal.showSlidedownPrompt().then(() => {
    // do other stuff
  });
})
```

### Init Options
You can pass other [options](https://documentation.onesignal.com/docs/web-push-sdk#init) to the `init` function. Use these options to configure personalized prompt options, auto-resubscribe, and more.

**Service Worker Params**
You can customize the location and filenames of service worker assets. You are also able to specify the specific scope that your service worker should control. You can read more [here](https://documentation.onesignal.com/docs/onesignal-service-worker-faq#sdk-parameter-reference-for-service-workers).

In this distribution, you can specify the parameters via the following:

| Field                      | Details                                                                                                                |
|----------------------------|------------------------------------------------------------------------------------------------------------------------|
| `serviceWorkerParam`       | Use to specify the scope, or the path the service worker has control of.  Example:  `{ scope: "/js/push/onesignal/" }` |
| `serviceWorkerPath`        | The path to the service worker file.                                                                                   |

### Service Worker File
If you haven't done so already, you will need to add the [OneSignal Service Worker file](https://github.com/OneSignal/OneSignal-Website-SDK/files/7585231/OneSignal-Web-SDK-HTTPS-Integration-Files.zip) to your site ([learn more](https://documentation.onesignal.com/docs/web-push-quickstart#step-6-upload-files)).

The OneSignal SDK file must be publicly accessible. You can put them in your top-level root or a subdirectory. However, if you are placing the file not on top-level root make sure to specify the path via the service worker params in the init options (see section above).

**Tip:**
Visit `https://yoursite.com/OneSignalSDKWorker.js` in the address bar to make sure the files are being served successfully.

---
## OneSignal API
### Typescript
This package includes Typescript support.

```ts
interface OneSignal {
  init(options: IInitObject): Promise<void>;
  on(event: string, listener: () => void): void;
  off(event: string, listener: () => void): void;
  once(event: string, listener: () => void): void;
  isPushNotificationsEnabled(callback?: Action<boolean>): Promise<boolean>;
  showHttpPrompt(options?: AutoPromptOptions): Promise<void>;
  registerForPushNotifications(options?: RegisterOptions): Promise<void>;
  setDefaultNotificationUrl(url: string): Promise<void>;
  setDefaultTitle(title: string): Promise<void>;
  getTags(callback?: Action<any>): Promise<void>;
  sendTag(key: string, value: any, callback?: Action<Object>): Promise<Object | null>;
  sendTags(tags: TagsObject<any>, callback?: Action<Object>): Promise<Object | null>;
  deleteTag(tag: string): Promise<Array<string>>;
  deleteTags(tags: Array<string>, callback?: Action<Array<string>>): Promise<Array<string>>;
  addListenerForNotificationOpened(callback?: Action<Notification>): Promise<void>;
  setSubscription(newSubscription: boolean): Promise<void>;
  showHttpPermissionRequest(options?: AutoPromptOptions): Promise<any>;
  showNativePrompt(): Promise<void>;
  showSlidedownPrompt(options?: AutoPromptOptions): Promise<void>;
  showCategorySlidedown(options?: AutoPromptOptions): Promise<void>;
  showSmsSlidedown(options?: AutoPromptOptions): Promise<void>;
  showEmailSlidedown(options?: AutoPromptOptions): Promise<void>;
  showSmsAndEmailSlidedown(options?: AutoPromptOptions): Promise<void>;
  getNotificationPermission(onComplete?: Action<NotificationPermission>): Promise<NotificationPermission>;
  getUserId(callback?: Action<string | undefined | null>): Promise<string | undefined | null>;
  getSubscription(callback?: Action<boolean>): Promise<boolean>;
  setEmail(email: string, options?: SetEmailOptions): Promise<string | null>;
  setSMSNumber(smsNumber: string, options?: SetSMSOptions): Promise<string | null>;
  logoutEmail(): Promise<void>;
  logoutSMS(): Promise<void>;
  setExternalUserId(externalUserId: string | undefined | null, authHash?: string): Promise<void>;
  removeExternalUserId(): Promise<void>;
  getExternalUserId(): Promise<string | undefined | null>;
  provideUserConsent(consent: boolean): Promise<void>;
  getEmailId(callback?: Action<string | undefined>): Promise<string | null | undefined>;
  getSMSId(callback?: Action<string | undefined>): Promise<string | null | undefined>;
  sendOutcome(outcomeName: string, outcomeWeight?: number | undefined): Promise<void>;
}
```

### OneSignal API
See the official [OneSignal WebSDK reference](https://documentation.onesignal.com/docs/web-push-sdk) for information on all available SDK functions.

---
## Advanced Usage
### Events and Event Listeners
Use listeners to react to OneSignal-related events:

* `subscriptionChange`
* `permissionPromptDisplay`
* `notificationPermissionChange`
* `popoverShown`
* `customPromptClick`
* `notificationDisplay`
* `notificationDismiss`

**Example**
```js
OneSignal.on('subscriptionChange', function(isSubscribed) {
  console.log("The user's subscription state is now:", isSubscribed);
});
```

See the [OneSignal WebSDK Reference](https://documentation.onesignal.com/docs/web-push-sdk) for all available event listeners.

## Troubleshooting
### `window.OneSignal already defined as 'object'!`
You will get this error if you initialize twice. Make sure you are only initializing one time. When wrapped with `React.StrictMode`, your app might be rendering twice.

## Example App
This repo includes an `example` React application implementing OneSignal. It was created using `create-react-app`. The app uses this repository's root level directory as the `react-onesignal` package and will bundle any changes on every run.

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/OneSignal/react-onesignal/issues).

## Show your support

Give a ⭐️ if this project helped you!

## OneSignal

* [Website](https://onesignal.com)
* Twitter: [@onesignal](https://twitter.com/onesignal)
* Github: [@OneSignal](https://github.com/OneSignal)
* LinkedIn: [@onesignal](https://linkedin.com/company/onesignal)

## Discord
Reach out to us via our [Discord server](https://discord.com/invite/EP7gf6Uz7G)!

## 📝 License

Copyright © 2022 [OneSignal](https://github.com/OneSignal).<br />
This project is [Modified MIT](https://github.com/OneSignal/react-onesignal/blob/master/LICENSE) licensed.

## Thanks
Special thanks to [pedro-lb](https://github.com/pedro-lb) and others for work on the project this package is [based on](https://github.com/pedro-lb/react-onesignal).
<a href="https://github.com/onesignal/react-onesignal/graphs/contributors">
  <img src="https://user-images.githubusercontent.com/11739227/119415383-1d354700-bcb7-11eb-946d-01c40cd07010.png" />
</a>

Enjoy!
