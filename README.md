# React OneSignal

[![NPM](https://img.shields.io/npm/v/react-onesignal.svg?style=flat-square)](https://www.npmjs.com/package/react-onesignal)
[![Issues](https://img.shields.io/github/issues/pedro-lb/react-onesignal?style=flat-square)](#)
[![Stars](https://img.shields.io/github/stars/pedro-lb/react-onesignal?style=flat-square)](https://github.com/pedro-lb/react-onesignal/stargazers)
[![Forks](https://img.shields.io/github/forks/pedro-lb/react-onesignal?style=flat-square)](https://github.com/pedro-lb/react-onesignal/network/members)
[![Contributors](https://img.shields.io/github/contributors/pedro-lb/react-onesignal?style=flat-square)](https://github.com/pedro-lb/react-onesignal/graphs/contributors)
[![Languages](https://img.shields.io/github/languages/count/pedro-lb/react-onesignal?style=flat-square)](#)

This is a JavaScript module that can be used to easily include [OneSignal](https://onesignal.com/) code in a website or app that uses React for its front-end codebase.

OneSignal is the world's leader for Mobile Push Notifications, Web Push, and In-App Messaging. It is trusted by 800k businesses to send 5 billion Push Notifications per day.

You can find more information on OneSignal [here](https://onesignal.com/).

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

## Usage

Simply initialize OneSignal with your token:

```js
import OneSignal from 'react-onesignal';

OneSignal.initialize('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', options);
```

Where options is:

```ts
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
```

And `OneSignal` object contains:

```ts
notificationPermission: string[];
registerForPushNotifications: () => Promise<any>;
getNotificationPermission: () => Promise<string>;
isPushNotificationsEnabled: () => Promise<boolean>;
isPushNotificationsSupported: () => boolean;
setSubscription: (unmute: boolean) => Promise<any>;
setEmail: (email: string) => Promise<string>;
logoutEmail: () => Promise<void>;
getEmailId: () => Promise<string>;
getUserId: () => Promise<string>;
setExternalUserId: (externalUserId: string | number) => Promise<void>;
removeExternalUserId: () => Promise<void>;
getExternalUserId: () => Promise<any>;
initialized: boolean;
sendTag: (key: string, val: string) => Promise<string>;
sendTags: (keyValues: object) => Promise<any>;
```

## Advanced Usage

### Player ID

Player ID is an important information on OneSignal.

You can use `getPlayerId` to obtain it.

```js
// Obtains the current playerId from the browser
const playerId = await OneSignal.getPlayerId();
```

### Notification Permission Management

To manage notifications:

- Use `notificationPermission` to see all possible states.
- Use `getNotificationPermission` to check current notification permissions.
- Use `registerForPushNotifications` to ask for notification permissions.

```js
// Check all possible permission states
const permissions = OneSignal.notificationPermission;

// Check current permission state
const currentState = await OneSignal.getNotificationPermission();

// Ask the user for notification permissions, if not granted yet
await OneSignal.registerForPushNotifications();
```

### User Email Tracking

You can use `setEmail`, `getEmailId` and `logoutEmail` to track user email.

```js
// Set email to track & notify specific users
OneSignal.setEmail('my_email@example.com');

// Check which email is configured in this browser
const emailId = await OneSignal.getEmailId();

// Remove email tracking
OneSignal.logoutEmail();
```

### External User ID

You can use `setExternalUserId`, `getExternalUserId` and `removeExternalUserId` to track external user ID.

```js
// Set external user ID
OneSignal.setExternalUserId('your_id');

// Get external user ID
const externalUserId = await OneSignal.getExternalUserId();

// Remove external user ID
OneSignal.removeExternalUserId();
```

## Events and Event Listeners
You can also listen for native OneSignal events like `subscriptionChange`.

To add an event listener to the `OneSignal.push()` array, pass an array of events to the `ReactOneSignal.initialize()` function as the third parameter.

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


ReactOneSignal.initialize(applicationId, options, events);
```

### OneSignal Tags and Audience Segmenting

You can use `sendTag` and `sendTags` to set OneSignal tags for segment filtering.
```js
// Send a tag to OneSignal for the current player
OneSignal.sendTag('tag', 'tagValue');

// Send multiple tags to OneSignal for the current player
const keyValues = {
  'tag1': 'value1',
  'tag2': 'value2',
  'tag3': 'value3',
};
OneSignal.sendTags(keyValues);
```

### Setup hook

To avoid error due to OneSignal not initialized, you can use useOneSignalSetup hook, passing a callback to be called when OneSignal is ready

```ts
import OneSignal, { useOneSignalSetup } from 'react-onesignal';

type AppProps = {
  user: {
    id: string;
    Email: string;
  };
};

function App(props: AppProps) {
  const { user } = props;

  useOneSignalSetup(() => {
    OneSignal.setEmail(user.Email);
    OneSignal.setExternalUserId(user.id);
  });
}
```

## Contributing

Pull requests are welcome! If you have any feedback, issue or suggestion, feel free to open [a new issue](https://github.com/pedro-lb/react-onesignal/issues/new) so we can talk about it 💬.

## Made possible by

<a href="https://github.com/pedro-lb/react-onesignal/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=pedro-lb/react-onesignal" />
</a>

## License

MIT © [pedro-lb](https://github.com/pedro-lb)
