
# Migration Guide
Review the updated documentation in the [README](https://github.com/OneSignal/react-onesignal/blob/master/README.md).

## Version 2
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
