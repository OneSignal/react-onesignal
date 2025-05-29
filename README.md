<h1 align="center">Welcome to react-onesignal 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/react-onesignal" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/react-onesignal.svg">
  </a>
  <a href="https://github.com/OneSignal/react-onesignal#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/OneSignal/react-onesignal/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://twitter.com/onesignal" target="_blank">
    <img alt="Twitter: onesignal" src="https://img.shields.io/twitter/follow/onesignal.svg?style=social" />
  </a>
</p>

> This is a JavaScript module that can be used to easily include [OneSignal](https://onesignal.com/) code in a website or app in practically any JS front-end codebase (not limited to React).

- 🏠 [Homepage](https://github.com/OneSignal/react-onesignal#readme)
- 🖤 [npm](https://www.npmjs.com/package/react-onesignal)

OneSignal is the world's leader for Mobile Push Notifications, Web Push, and In-App Messaging. It is trusted by 2 million+ developers to send 12 billion Push Notifications per day.

You can find more information on OneSignal [here](https://onesignal.com/).

### Migration Guides

Version 3.0 was recently released and includes breaking changes. See the [Migration Guide](https://github.com/OneSignal/react-onesignal/blob/main/MigrationGuide.md) to update your implementation.

## Contents

- [Install](#install)
- [Usage](#usage)
- [API](#onesignal-api)
- [Advanced Usage](#advanced-usage)

---

## Install

### npm

```bash
npm install --save react-onesignal
```

### yarn

```bash
yarn add react-onesignal
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
  OneSignal.Slidedown.promptPush();
  // do other stuff
});
```

### Init Options
You can pass other [options](https://documentation.onesignal.com/docs/web-sdk-reference#init) to the `init` function. Use these options to configure personalized prompt options, auto-resubscribe, and more.

<details>
  <summary>Expand to see more options</summary>

| Property Name                    | Type                 | Description                                              |
| -------------------------------- | -------------------- | -------------------------------------------------------- |
| `appId`                          | `string`             | The ID of your OneSignal app.                            |
| `autoRegister`                   | `boolean` (optional) | Whether or not to automatically register the user.       |
| `autoResubscribe`                | `boolean` (optional) | Whether or not to automatically resubscribe the user.    |
| `path`                           | `string` (optional)  | The path to the OneSignal service worker file.           |
| `serviceWorkerPath`              | `string` (optional)  | The path to the OneSignal service worker script.         |
| `serviceWorkerUpdaterPath`       | `string` (optional)  | The path to the OneSignal service worker updater script. |
| `subdomainName`                  | `string` (optional)  | The subdomain of your OneSignal app.                     |
| `allowLocalhostAsSecureOrigin`   | `boolean` (optional) | Whether or not to allow localhost as a secure origin.    |
| `requiresUserPrivacyConsent`     | `boolean` (optional) | Whether or not the user's consent is required.           |
| `persistNotification`            | `boolean` (optional) | Whether or not notifications should persist.             |
| `notificationClickHandlerMatch`  | `string` (optional)  | The URL match pattern for notification clicks.           |
| `notificationClickHandlerAction` | `string` (optional)  | The action to perform when a notification is clicked.    |
| `welcomeNotification`            | `object` (optional)  | The welcome notification configuration.                  |
| `notifyButton`                   | `object` (optional)  | The notify button configuration.                         |
| `promptOptions`                  | `object` (optional)  | Additional options for the subscription prompt.          |
| `webhooks`                       | `object` (optional)  | The webhook configuration.                               |
| `[key: string]`                  | `any`                | Additional properties can be added as needed.            |

**Service Worker Params**
You can customize the location and filenames of service worker assets. You are also able to specify the specific scope that your service worker should control. You can read more [here](https://documentation.onesignal.com/docs/onesignal-service-worker-faq#sdk-parameter-reference-for-service-workers).

In this distribution, you can specify the parameters via the following:

| Field                | Details                                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `serviceWorkerParam` | Use to specify the scope, or the path the service worker has control of. Example: `{ scope: "/js/push/onesignal/" }` |
| `serviceWorkerPath`  | The path to the service worker file.                                                                                 |

</details>

---

### Service Worker File

If you haven't done so already, you will need to add the [OneSignal Service Worker file](https://github.com/OneSignal/OneSignal-Website-SDK/files/11480764/OneSignalSDK-v16-ServiceWorker.zip) to your site ([learn more](https://documentation.onesignal.com/docs/web-push-quickstart#step-6-upload-files)).

The OneSignal SDK file must be publicly accessible. You can put them in your top-level root or a subdirectory. However, if you are placing the file not on top-level root make sure to specify the path via the service worker params in the init options (see section above).

**Tip:**
Visit `https://yoursite.com/OneSignalSDKWorker.js` in the address bar to make sure the files are being served successfully.

---

### Typescript

This package includes Typescript support.

```ts
interface IOneSignalOneSignal {
  Slidedown: IOneSignalSlidedown;
  Notifications: IOneSignalNotifications;
  Session: IOneSignalSession;
  User: IOneSignalUser;
  Debug: IOneSignalDebug;
  login(externalId: string, jwtToken?: string): Promise<void>;
  logout(): Promise<void>;
  init(options: IInitObject): Promise<void>;
  setConsentGiven(consent: boolean): Promise<void>;
  setConsentRequired(requiresConsent: boolean): Promise<void>;
}
```

### OneSignal API

See the official [OneSignal WebSDK reference](https://documentation.onesignal.com/docs/web-sdk-reference) for information on all available SDK functions.

---

## Advanced Usage

### Events and Event Listeners

Use listeners to react to OneSignal-related events:

### Notifications Namespace

| Event Name                | Callback Argument Type                 |
| ------------------------- | -------------------------------------- |
| 'click'                   | NotificationClickEvent                 |
| 'foregroundWillDisplay'   | NotificationForegroundWillDisplayEvent |
| 'dismiss'                 | NotificationDismissEvent               |
| 'permissionChange'        | boolean                                |
| 'permissionPromptDisplay' | void                                   |

### Slidedown Namespace

| Event Name       | Callback Argument Type |
| ---------------- | ---------------------- |
| 'slidedownShown' | boolean                |

### Push Subscription Namespace

| Event Name | Callback Argument Type |
| ---------- | ---------------------- |
| 'change'   | boolean                |

**Example**

```js
OneSignal.Notifications.addEventListener('click', (event) => {
  console.log('The notification was clicked!', event);
});
```



See the [OneSignal WebSDK Reference](https://documentation.onesignal.com/docs/web-sdk-reference#addeventlistener-push-notification) for all available event listeners.

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

- [Website](https://onesignal.com)
- Twitter: [@onesignal](https://twitter.com/onesignal)
- Github: [@OneSignal](https://github.com/OneSignal)
- LinkedIn: [@onesignal](https://linkedin.com/company/onesignal)

## Discord

Reach out to us via our [Discord server](https://discord.com/invite/EP7gf6Uz7G)!

## 📝 License

Copyright © 2023 [OneSignal](https://github.com/OneSignal).<br />
This project is [Modified MIT](https://github.com/OneSignal/react-onesignal/blob/master/LICENSE) licensed.

## Thanks

Special thanks to [pedro-lb](https://github.com/pedro-lb) and others for work on the project this package is [based on](https://github.com/pedro-lb/react-onesignal).
<a href="https://github.com/onesignal/react-onesignal/graphs/contributors">
<img src="https://user-images.githubusercontent.com/11739227/119415383-1d354700-bcb7-11eb-946d-01c40cd07010.png" />
</a>

Enjoy!
