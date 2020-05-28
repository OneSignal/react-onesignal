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

You can use `setExternalUserId` and `getExternalUserId` to track user email.

```js
OneSignal.setExternalUserId('your_id');

const externalUserId = await OneSignal.getExternalUserId();
```

## Contributing

Pull requests are welcome! If you have any feedback, issue or suggestion, feel free to open [a new issue](https://github.com/pedro-lb/react-onesignal/issues/new) so we can talk about it 💬.

## License

MIT © [pedro-lb](https://github.com/pedro-lb)
