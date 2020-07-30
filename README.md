# React OneSignal

[![NPM](https://img.shields.io/npm/v/react-onesignal.svg)](https://www.npmjs.com/package/react-onesignal) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

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

```js
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

You can use `setEmail` and `getEmailId` to track user email.

```js
// Set email to track & notify specific users
OneSignal.setEmail('my_email@example.com');

// Check which email is configured in this browser
const emailId = await OneSignal.getEmailId();
```

### External User ID

You can use `setExternalUserId` and `getExternalUserId` to track external user ID.

```js
// Set external user ID
OneSignal.setExternalUserId('your_id');

// Get external user ID
const externalUserId = await OneSignal.getExternalUserId();
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

## Contributing

Pull requests are welcome! If you have any feedback, issue or suggestion, feel free to open [a new issue](https://github.com/pedro-lb/react-onesignal/issues/new) so we can talk about it 💬.

## Made possible by

<a href="https://github.com/pedro-lb/react-onesignal/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=pedro-lb/react-onesignal" />
</a>

## License

MIT © [pedro-lb](https://github.com/pedro-lb)
