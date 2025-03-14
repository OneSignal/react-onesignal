declare global {
    interface Window {
        OneSignalDeferred?: OneSignalDeferredLoadedCallback[];
        OneSignal?: IOneSignalOneSignal;
        safari?: {
            pushNotification: any;
        };
    }
}
interface AutoPromptOptions {
    force?: boolean;
    forceSlidedownOverNative?: boolean;
    slidedownPromptOptions?: IOneSignalAutoPromptOptions;
}
interface IOneSignalAutoPromptOptions {
    force?: boolean;
    forceSlidedownOverNative?: boolean;
    isInUpdateMode?: boolean;
    categoryOptions?: IOneSignalCategories;
}
interface IOneSignalCategories {
    positiveUpdateButton: string;
    negativeUpdateButton: string;
    savingButtonText: string;
    errorButtonText: string;
    updateMessage: string;
    tags: IOneSignalTagCategory[];
}
interface IOneSignalTagCategory {
    tag: string;
    label: string;
    checked?: boolean;
}
declare type PushSubscriptionNamespaceProperties = {
    id: string | null | undefined;
    token: string | null | undefined;
    optedIn: boolean;
};
declare type SubscriptionChangeEvent = {
    previous: PushSubscriptionNamespaceProperties;
    current: PushSubscriptionNamespaceProperties;
};
declare type NotificationEventName = 'click' | 'foregroundWillDisplay' | 'dismiss' | 'permissionChange' | 'permissionPromptDisplay';
declare type SlidedownEventName = 'slidedownShown';
declare type OneSignalDeferredLoadedCallback = (onesignal: IOneSignalOneSignal) => void;
interface IOSNotification {
    /**
     * The OneSignal notification id;
     *  - Primary id on OneSignal's REST API and dashboard
     */
    readonly notificationId: string;
    /**
     * Visible title text on the notification
     */
    readonly title?: string;
    /**
     * Visible body text on the notification
     */
    readonly body: string;
    /**
     * Visible icon the notification; URL format
     */
    readonly icon?: string;
    /**
     * Visible small badgeIcon that displays on some devices; URL format
     * Example: On Android's status bar
     */
    readonly badgeIcon?: string;
    /**
     * Visible image on the notification; URL format
     */
    readonly image?: string;
    /**
     * Visible buttons on the notification
     */
    readonly actionButtons?: IOSNotificationActionButton[];
    /**
     * If this value is the same as existing notification, it will replace it
     * Can be set when creating the notification with "Web Push Topic" on the dashboard
     * or web_push_topic from the REST API.
     */
    readonly topic?: string;
    /**
     * Custom object that was sent with the notification;
     * definable when creating the notification from the OneSignal REST API or dashboard
     */
    readonly additionalData?: object;
    /**
     * URL to open when clicking or tapping on the notification
     */
    readonly launchURL?: string;
    /**
     * Confirm the push was received by reporting back to OneSignal
     */
    readonly confirmDelivery: boolean;
}
interface IOSNotificationActionButton {
    /**
     * Any unique identifier to represent which button was clicked. This is typically passed back to the service worker
     * and host page through events to identify which button was clicked.
     * e.g. 'like-button'
     */
    readonly actionId: string;
    /**
     * The notification action button's text.
     */
    readonly text: string;
    /**
     * A valid publicly reachable HTTPS URL to an image.
     */
    readonly icon?: string;
    /**
     * The URL to open the web browser to when this action button is clicked.
     */
    readonly launchURL?: string;
}
interface NotificationClickResult {
    readonly actionId?: string;
    readonly url?: string;
}
declare type NotificationEventTypeMap = {
    'click': NotificationClickEvent;
    'foregroundWillDisplay': NotificationForegroundWillDisplayEvent;
    'dismiss': NotificationDismissEvent;
    'permissionChange': boolean;
    'permissionPromptDisplay': void;
};
interface NotificationForegroundWillDisplayEvent {
    readonly notification: IOSNotification;
    preventDefault(): void;
}
interface NotificationDismissEvent {
    notification: IOSNotification;
}
interface NotificationClickEvent {
    readonly notification: IOSNotification;
    readonly result: NotificationClickResult;
}
declare type UserChangeEvent = {
    current: UserNamespaceProperties;
};
declare type UserNamespaceProperties = {
    onesignalId: string | undefined;
    externalId: string | undefined;
};
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
    path?: string;
    serviceWorkerParam?: {
        scope: string;
    };
    serviceWorkerPath?: string;
    serviceWorkerOverrideForTypical?: boolean;
    serviceWorkerUpdaterPath?: string;
    allowLocalhostAsSecureOrigin?: boolean;
    [key: string]: any;
}
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
interface IOneSignalNotifications {
    permissionNative: NotificationPermission;
    permission: boolean;
    setDefaultUrl(url: string): Promise<void>;
    setDefaultTitle(title: string): Promise<void>;
    isPushSupported(): boolean;
    requestPermission(): Promise<void>;
    addEventListener<K extends NotificationEventName>(event: K, listener: (obj: NotificationEventTypeMap[K]) => void): void;
    removeEventListener<K extends NotificationEventName>(event: K, listener: (obj: NotificationEventTypeMap[K]) => void): void;
}
interface IOneSignalSlidedown {
    promptPush(options?: AutoPromptOptions): Promise<void>;
    promptPushCategories(options?: AutoPromptOptions): Promise<void>;
    promptSms(options?: AutoPromptOptions): Promise<void>;
    promptEmail(options?: AutoPromptOptions): Promise<void>;
    promptSmsAndEmail(options?: AutoPromptOptions): Promise<void>;
    addEventListener(event: SlidedownEventName, listener: (wasShown: boolean) => void): void;
    removeEventListener(event: SlidedownEventName, listener: (wasShown: boolean) => void): void;
}
interface IOneSignalDebug {
    setLogLevel(logLevel: string): void;
}
interface IOneSignalSession {
    sendOutcome(outcomeName: string, outcomeWeight?: number): Promise<void>;
    sendUniqueOutcome(outcomeName: string): Promise<void>;
}
interface IOneSignalUser {
    onesignalId: string | undefined;
    externalId: string | undefined;
    PushSubscription: IOneSignalPushSubscription;
    addAlias(label: string, id: string): void;
    addAliases(aliases: {
        [key: string]: string;
    }): void;
    removeAlias(label: string): void;
    removeAliases(labels: string[]): void;
    addEmail(email: string): void;
    removeEmail(email: string): void;
    addSms(smsNumber: string): void;
    removeSms(smsNumber: string): void;
    addTag(key: string, value: string): void;
    addTags(tags: {
        [key: string]: string;
    }): void;
    removeTag(key: string): void;
    removeTags(keys: string[]): void;
    getTags(): {
        [key: string]: string;
    };
    addEventListener(event: 'change', listener: (change: UserChangeEvent) => void): void;
    removeEventListener(event: 'change', listener: (change: UserChangeEvent) => void): void;
    setLanguage(language: string): void;
    getLanguage(): string;
}
interface IOneSignalPushSubscription {
    id: string | null | undefined;
    token: string | null | undefined;
    optedIn: boolean | undefined;
    optIn(): Promise<void>;
    optOut(): Promise<void>;
    addEventListener(event: 'change', listener: (change: SubscriptionChangeEvent) => void): void;
    removeEventListener(event: 'change', listener: (change: SubscriptionChangeEvent) => void): void;
}
declare const OneSignal: IOneSignalOneSignal;
export default OneSignal;
