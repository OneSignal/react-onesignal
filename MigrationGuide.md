
# Migration Guide
Review the updated documentation in the [README](https://github.com/OneSignal/react-onesignal/blob/master/README.md).

> Migrating from version 1 to 2 (see [v2 migration guide](#version-2))

## Version 3
### Intro
In this release, we are making a significant shift from a device-centered model to a user-centered model. This means that instead of identifying devices, we now focus on identifying individual users. This update is part of a larger effort to shift towards a user-oriented omni-channel messaging system.

To facilitate this change, the externalId approach for identifying users is being replaced by the login and logout methods. In addition, the SDK now makes use of namespaces such as User, Notifications, and Slidedown to better separate code.

This guide will walk you through these and other important changes in the version 16 update.

### Overview
Under the new model, the concept of a "player" is being updated to include three new concepts: users, subscriptions, and aliases.

### Users
Users own subscriptions and are identified by aliases which are used to point to users using different alias schemes.

### Subscriptions

Subscriptions refer to the way in which a user can receive various communication methods offered by OneSignal, including push notifications, SMS, and email.

### Aliases
Aliases are identifiers that point to users and are made up of an alias label and id. Users can have multiple aliases. Consider the need to identify a user with your own application's unique identifier as well as identifiers from other integrated applications.

The SDK will use `external_id` as the default alias label for the public `OneSignal.login("1234")` method.

**Alias Example:**
```
"aliases": [
  {
    "label": "external_id",
    "id": "1234"
  },
  {
    "label": "my_alias",
    "id": "5678"
  }
]
```

```js
// WebSDK-specific example
{
  external_id: "1234",
  my_alias: "5678"
}
```

# Guide
## 1. Setup Changes
### Service Worker File

From:
```js
importScripts("https://onesignal.com/sdks/OneSignalSDKWorker.js");
```

To:
```js
importScripts("https://onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
```

## 2. External User ID
Update any usages of `OneSignal.setExternalId` to `OneSignal.login` or `OneSignal.logout`
From:
```js
OneSignal.setExternalId("myId");
```

To:
```js
OneSignal.login("myId");
```

Use `OneSignal.logout();` instead anywhere you have `OneSignal.setExternalId("");` or are setting it to `null`.

## 3. API Changes
Update your code to use the new API. The following namespaces are on the `OneSignal` object.

### User Namespace

Example:
```js
OneSignal.User.addAlias("my_alias", "1234");
```

All user functions are synchronous.

| Function Name   | Description                                    | Argument List                        |
| --------------- | ---------------------------------------------- | ------------------------------------ |
| `addAlias`      | Adds a new alias for the current user.         | `label: string, id: string`          |
| `addAliases`    | Adds multiple aliases for the current user.    | `aliases: { [key: string]: string }` |
| `removeAlias`   | Removes an alias for the current user.         | `label: string`                      |
| `removeAliases` | Removes multiple aliases for the current user. | `labels: string[]`                   |
| `addEmail`      | Adds an email address for the current user.    | `email: string`                      |
| `removeEmail`   | Removes an email address for the current user. | `email: string`                      |
| `addSms`        | Adds an SMS number for the current user.       | `smsNumber: string`                  |
| `removeSms`     | Removes an SMS number for the current user.    | `smsNumber: string`                  |
| `addTag`        | Adds a tag for the current user.               | `key: string, value: string`         |
| `addTags`       | Adds multiple tags for the current user.       | `tags: { [key: string]: string }`    |
| `removeTag`     | Removes a tag for the current user.            | `key: string`                        |
| `removeTags`    | Removes multiple tags for the current user.    | `keys: string[]`                     |

### Notifications Namespace

Example:
```js
await OneSignal.Notifications.requestPermission();
```


| Sync/Async | Property/Function       | Description                                                                                                                                                                             | Argument List                                                                                                                                                     |
| ---------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `async`    | `setDefaultUrl()`       | Sets the default URL for notifications.                                                                                                                                                 | `url` (string)                                                                                                                                                   |
| `async`    | `setDefaultTitle()`     | Sets the default title for notifications.                                                                                                                                               | `title` (string)                                                                                                                                                 |
| `sync`     | `isPushSupported()`     | Returns true if the current browser supports web push.                                                                                                                                  |                                                                                                                                                                  |
| `async`    | `requestPermission()`   | Requests push notifications permission via the native browser prompt.                                                                                                                   |                                                                                                                                                                  |
|            | `permission`            | Returns true if your site has permission to display notifications.                                                                                    |                                 |
|            | `permissionNative`      | Returns browser's native notification permission status; `"default"`(end-user has not accept or decided yet), `"granted"`, or `"denied"`.             |                                 |
| `sync`     | `addEventListener()`    | Adds an event listener for the following events:<br><br>- `click`<br>- `foregroundWillDisplay`<br>- `dismiss`<br>- `permissionPromptDisplay`<br>- `permissionChange`*<br> * argument type: bool | - `<event>` (string)<br>- `(arg: <type>) => {}` (callback)                                                                                                       |
| `sync`     | `removeEventListener()` | Removes the event listener.                                                                                                                                                             | `() => {}` (the event listener you want to remove)                                                                                                               |



### Slidedown Namespace

Example:
```js
await OneSignal.Slidedown.promptPush();
```

| Sync/Async | Function Name          | Description                                                              | Argument List                                                                |
| ---------- | ---------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| `async`    | `promptPush`           | Displays the notification permission prompt.                             | `options` (AutoPromptOptions)                                                |
| `async`    | `promptPushCategories` | Displays the notification permission prompt for notification categories. | `options` (AutoPromptOptions)                                                |
| `async`    | `promptSms`            | Displays the SMS subscription prompt.                                    | `options` (AutoPromptOptions)                                                |
| `async`    | `promptEmail`          | Displays the email subscription prompt.                                  | `options` (AutoPromptOptions)                                                |
| `async`    | `promptSmsAndEmail`    | Displays the SMS and email subscription prompts.                         | `options` (AutoPromptOptions)                                                |
| `sync`     | `addEventListener`     | Adds an event listener for the `slidedownShown` event.                   | - `event` ("slidedownShown"), <br>- `listener` ((wasShown: boolean) => void) |
| `sync`     | `removeEventListener`  | Removes an event listener for the `slidedownShown` event.                | - `event` ("slidedownShown")<br>- `listener` ((wasShown: boolean) => void)   |



### Push Subscription Namespace

Example:
```js
OneSignal.User.PushSubscription.optIn();
```

| Sync/Async | Property/Function       | Description                                                                                   | Argument List                                                                                |
| ---------- | ----------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
|            | `id`                    | Gets the current user's ID.                                                                   |                                                                                              |
|            | `token`                 | Gets the current user's push notification token.                                              |                                                                                              |
|            | `optedIn`               | Gets a boolean value indicating whether the current user is subscribed to push notifications. |                                                                                              |
| `async`    | `optIn()`               | Subscribes the current user to push notifications.                                            |                                                                                              |
| `async`    | `optOut()`              | Unsubscribes the current user from push notifications.                                        |                                                                                              |
| `sync`     | `addEventListener()`    | Adds an event listener for the `change` event.                                    | - `event` ("change")<br>- `listener` ((change: SubscriptionChangeEvent) => void) |
| `sync`     | `removeEventListener()` | Removes an event listener for the `change` event.                                 | - `event` ("change")<br>- `listener` ((change: SubscriptionChangeEvent) => void) |

### Debug Namespace

Example:
```js
OneSignal.Debug.setLogLevel(“trace”);
```

| Function Name   | Description                                    | Argument List                        |
| --------------- | ---------------------------------------------- | ------------------------------------ |
| `setLogLevel`      | Turns on logging with the given log level.                                    | `setLogLevel: string`<br>- `"trace"`<br>- `"debug"`<br>- `"info"`<br>- `"warn"`<br>- `"error"` |

# Limitations
* HTTP environments are no longer supported.
* AMP environments are not supported.
* Identity verification not available yet, coming soon.

# Glossary

**OneSignal user**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*(noun) lowercase*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A user of the OneSignal service.

**user**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*(noun) lowercase*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An end-user of an application using the OneSignal service. They may or may not have a subscription.

**user ID**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*(noun) lowercase*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A OneSignal-provisioned unique identifier for Users (User.onesignal_id).


**user external ID**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*(noun) lowercase*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A customer-provisioned unique identifier for Users (User.external_id).


**user alias**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*(noun) lowercase*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A customer provisioned key-value pair used to uniquely identify a User.


**subscription**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*(noun) lowercase*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An established communication channel between an App and its User, such as a push-subscribed device, email address, or SMS-subscribed phone number.


**subscription ID**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*(noun) lowercase*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A OneSignal-provisioned unique identifier for a single subscription.


**notification**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*(noun) lowercase*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A unidirectional outbound communication message from an App to one or more Users via their Subscriptions.


**notification ID**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*(noun) lowercase*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A OneSignal-provisioned unique identifier for Notifications (Notification.id).


**notification external ID**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*(noun) lowercase*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A customer-provisioned unique identifier for Notifications (Notification.external_id).


## Version 2
<details>
  <summary>Click to expand</summary>

  Version 2.0 includes breaking changes. Make sure to follow this migration guide carefully, review the updated documentation, and test your application thoroughly.

  ## Key Changes
  - Update your OneSignal initialization function (see below)
  - Remove the initialization hook (now handled for you automagically)
  - Event listeners are now set up using the `on` function
  - New functions supporting newer OneSignal features

  ### OneSignal Initialization
  The initialization function has been changed to match 1:1 with the underlying OneSignal WebSDK. The function has been renamed `init`. The `appId` is now set via the single config options argument passed to the `init` function:

  ```js
  import OneSignal from 'react-onesignal';

  OneSignal.init({ appId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' });
  ```

  Furthermore, there is no longer a need to wrap the initialization in the `useOneSignalSetup` hook. The order of functions relative to the OneSignal initialization no longer matters (although we still recommend initializing OneSignal in a top-level component).

  ### Event Listeners
  Event listeners can now be added directly via the `on` function. This function takes an event string and a callback.

  ### New Features
  We have added new functions to support the latest OneSignal functions and features.

  ### Typings
  Typings are included in the package automatically. See below for a full list of the functions included in this package:
  ```ts
  interface OneSignal {
    init(options?: any): Promise<void>
    on(event: string, listener: Function): void
    off(event: string, listener: Function): void
    once(event: string, listener: Function): void
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

  ## Summary
  Consider the above changes when migrating to version 2 and make sure to thoroughly test your application.

  Enjoy!
</details>
