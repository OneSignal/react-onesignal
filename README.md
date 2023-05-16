<p align="center">
  <img src="https://media.onesignal.com/cms/Website%20Layout/logo-red.svg"/>
  <br/>
  <br/>
  <span style="color: grey !important">Showing web push notifications from Chrome, Safari, and Firefox</span>
</p>

> This is a JavaScript module that can be used to easily include [OneSignal](https://onesignal.com/) code in a website or app in practically any JS front-end codebase (not limited to React).

This is a JavaScript module that can be used to easily include [OneSignal](https://onesignal.com/) code in a website or app that uses React for its front-end codebase.

OneSignal is the world's leader for Mobile Push Notifications, Web Push, and In-App Messaging. It is trusted by 2 million+ businesses to send 9 billion Push Notifications per day.

You can find more information on OneSignal [here](https://onesignal.com/).

### Migration Guides
Versions 2.0 and 3.0 were recently released and include breaking changes. See the [Migration Guide](https://github.com/OneSignal/react-onesignal/blob/user-model/v1/MigrationGuide.md) to update your implementation.

> ATTENTION: v3 is currently in Beta 🚧 and includes a fundamental shift to the OneSignal subscriber ("player") model. Learn more [here](https://documentation.onesignal.com/v11.0/docs/user-model).

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
  OneSignal.Slidedown.promptPush();
  // do other stuff
})
```

### Init Options
You can pass other [options](https://documentation.onesignal.com/v11.0/docs/web-sdk#initializing-the-sdk) to the `init` function. Use these options to configure personalized prompt options, auto-resubscribe, and more.

<details>
  <summary>Expand to see more options</summary>

  | Property Name               | Type                  | Description                                        |
| ---------------------------| --------------------- | -------------------------------------------------- |
| `appId`                     | `string`              | The ID of your OneSignal app.                      |
| `autoRegister`              | `boolean` (optional)  | Whether or not to automatically register the user. |
| `autoResubscribe`           | `boolean` (optional)  | Whether or not to automatically resubscribe the user. |
| `path`                      | `string` (optional)   | The path to the OneSignal service worker file.     |
| `serviceWorkerPath`         | `string` (optional)   | The path to the OneSignal service worker script.   |
| `serviceWorkerUpdaterPath`  | `string` (optional)   | The path to the OneSignal service worker updater script. |
| `subdomainName`             | `string` (optional)   | The subdomain of your OneSignal app.               |
| `allowLocalhostAsSecureOrigin` | `boolean` (optional) | Whether or not to allow localhost as a secure origin. |
| `requiresUserPrivacyConsent`| `boolean` (optional)  | Whether or not the user's consent is required.     |
| `persistNotification`       | `boolean` (optional)  | Whether or not notifications should persist.       |
| `notificationClickHandlerMatch`| `string` (optional) | The URL match pattern for notification clicks.     |
| `notificationClickHandlerAction`| `string` (optional)| The action to perform when a notification is clicked. |
| `welcomeNotification`       | `object` (optional)   | The welcome notification configuration.            |
| `notifyButton`              | `object` (optional)   | The notify button configuration.                   |
| `promptOptions`             | `object` (optional)   | Additional options for the subscription prompt.    |
| `webhooks`                  | `object` (optional)   | The webhook configuration.                         |
| `[key: string]`             | `any`                 | Additional properties can be added as needed.      |

**Service Worker Params**
You can customize the location and filenames of service worker assets. You are also able to specify the specific scope that your service worker should control. You can read more [here](https://documentation.onesignal.com/docs/onesignal-service-worker-faq#sdk-parameter-reference-for-service-workers).

In this distribution, you can specify the parameters via the following:

| Field                      | Details                                                                                                                |
|----------------------------|------------------------------------------------------------------------------------------------------------------------|
| `serviceWorkerParam`       | Use to specify the scope, or the path the service worker has control of.  Example:  `{ scope: "/js/push/onesignal/" }` |
| `serviceWorkerPath`        | The path to the service worker file.                                                                                   |

</details>

---

### Service Worker File
If you haven't done so already, you will need to add the [OneSignal Service Worker file](https://github.com/OneSignal/OneSignal-Website-SDK/files/7585231/OneSignal-Web-SDK-HTTPS-Integration-Files.zip) to your site ([learn more](https://documentation.onesignal.com/docs/web-push-quickstart#step-6-upload-files)).

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
See the official [OneSignal WebSDK reference](https://documentation.onesignal.com/v11.0/docs/web-sdk) for information on all available SDK functions.

---
## Advanced Usage
### Events and Event Listeners
Use listeners to react to OneSignal-related events:

### Notifications Namespace
| Event Name | Callback Argument Type |
|-|-|
|'click'      | NotificationClickResult|
|'foregroundWillDisplay'| NotificationForegroundWillDisplayEvent
| 'dismiss'| OSNotificationDataPayload|
|'permissionChange'| boolean|
|'permissionPromptDisplay'| void|

<details>
  <summary>Expand to see associated types</summary>

#### `NotificationClickResult`
| Property                    | Description                                 |
|-------------------------|---------------------------------------------|
| `actionId`              | A string representing the action ID associated with the click event |
| `url`                   | A string representing the URL associated with the click event |

#### `NotificationForegroundWillDisplayEvent`
| Property                    | Description                                 |
|-------------------------|---------------------------------------------|
| `notification`              | An `OSNotification` type object |

#### `OSNotification`
| Property              | Description                                                                                                          |
|-----------------------|----------------------------------------------------------------------------------------------------------------------|
| `id`                  | Optional string representing the unique identifier of the notification.                                              |
| `title`               | Optional string representing the title of the notification.                                                          |
| `body`                | Optional string representing the body of the notification.                                                           |
| `data`                | Optional data object associated with the notification.                                                               |
| `url`                 | Optional string representing the URL to be opened when the notification is clicked.                                  |
| `icon`                | Optional string representing the URL of the icon to be displayed with the notification.                              |
| `image`               | Optional string representing the URL of the image to be displayed with the notification.                             |
| `tag`                 | Optional string representing a unique identifier for a group of notifications.                                       |
| `requireInteraction`  | Optional boolean indicating whether the notification requires user interaction or not.                               |
| `renotify`            | Optional boolean indicating whether the notification should be replaced or not, if a notification with the same tag is already displayed. |
| `actions`             | Optional array of `NotificationActionButton` objects representing the action buttons associated with the notification.                         |

#### `NotificationActionButton`
| Property    | Description                                                                                   |
|-------------|-----------------------------------------------------------------------------------------------|
| `action`    | A string representing the action associated with the button.                                 |
| `title`     | A string representing the title of the button.                                               |
| `icon`      | Optional string representing the URL of the icon to be displayed with the button.            |
| `url`       | Optional string representing the URL to be opened when the button is clicked.                |

#### `OSNotificationDataPayload`
| Property    | Description                                                                                   |
|-------------|-----------------------------------------------------------------------------------------------|
| `id`        | A string representing the unique identifier of the notification data payload.                |
| `content`   | A string representing the content of the notification data payload.                          |
| `heading`   | Optional string representing the heading of the notification data payload.                   |
| `url`       | Optional string representing the URL to be opened when the notification data payload is clicked. |
| `data`      | Optional object containing additional data associated with the notification data payload.     |
| `rr`        | Optional string with value 'y' or 'n' representing whether or not the notification has [Confirmed Delivery](https://documentation.onesignal.com/docs/confirmed-deliveries).              |
| `icon`      | Optional string representing the URL of the icon to be displayed with the notification data payload. |
| `image`     | Optional string representing the URL of the image to be displayed with the notification data payload. |
| `tag`       | Optional string representing a unique identifier for a group of notification data payloads.   |
| `badge`     | Optional string representing the URL of the badge to be displayed with the notification data payload. |
| `vibrate`   | Optional array of numbers representing the vibration pattern of the notification data payload. |
| `buttons`   | Optional array of `NotificationButtonData` objects representing the button data associated with the notification data payload. |

#### `NotificationButtonData`
| Property | Description                                                                                          |
|----------|------------------------------------------------------------------------------------------------------|
| `url`    | A string representing the URL to be opened when the button is clicked.                                 |
| `id`     | A string representing the ID of the action.                                                          |
| `action` | A string representing the type of the action (inherited from `NotificationAction`).                  |
| `title`  | A string representing the title of the action button (inherited from `NotificationAction`).          |
| `icon`   | Optional string representing the URL of the icon to be displayed with the action button.              |

</details>

### Slidedown Namespace
| Event Name | Callback Argument Type |
|-|-|
|'slidedownShown'      | boolean |

### Push Subscription Namespace
| Event Name | Callback Argument Type |
|-|-|
|'change'      | boolean |

**Example**
```js
OneSignal.Notifications.addEventListener('click', (result) => {
  console.log("The notification was clicked!", result);
});
```

See the [OneSignal WebSDK Reference](https://documentation.onesignal.com/v11.0/docs/web-sdk) for all available event listeners.

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

Copyright © 2023 [OneSignal](https://github.com/OneSignal).<br />
This project is [Modified MIT](https://github.com/OneSignal/react-onesignal/blob/master/LICENSE) licensed.

## Thanks
Special thanks to [pedro-lb](https://github.com/pedro-lb) and others for work on the project this package is [based on](https://github.com/pedro-lb/react-onesignal).
<a href="https://github.com/onesignal/react-onesignal/graphs/contributors">
  <img src="https://user-images.githubusercontent.com/11739227/119415383-1d354700-bcb7-11eb-946d-01c40cd07010.png" />
</a>

Enjoy!
