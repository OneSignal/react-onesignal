declare global {
    interface Window {
        OneSignalDeferred?: OneSignalDeferredLoadedCallback[];
        OneSignal?: IOneSignalOneSignal;
        safari?: {
            pushNotification: any;
        };
    }
}
export interface AutoPromptOptions {
    force?: boolean;
    forceSlidedownOverNative?: boolean;
    slidedownPromptOptions?: IOneSignalAutoPromptOptions;
}
export interface IOneSignalAutoPromptOptions {
    force?: boolean;
    forceSlidedownOverNative?: boolean;
    isInUpdateMode?: boolean;
    categoryOptions?: IOneSignalCategories;
}
export interface IOneSignalCategories {
    positiveUpdateButton: string;
    negativeUpdateButton: string;
    savingButtonText: string;
    errorButtonText: string;
    updateMessage: string;
    tags: IOneSignalTagCategory[];
}
export interface IOneSignalTagCategory {
    tag: string;
    label: string;
    checked?: boolean;
}
export type PushSubscriptionNamespaceProperties = {
    id: string | null | undefined;
    token: string | null | undefined;
    optedIn: boolean;
};
export type SubscriptionChangeEvent = {
    previous: PushSubscriptionNamespaceProperties;
    current: PushSubscriptionNamespaceProperties;
};
export type NotificationEventName = 'click' | 'foregroundWillDisplay' | 'dismiss' | 'permissionChange' | 'permissionPromptDisplay';
export type SlidedownEventName = 'slidedownAllowClick' | 'slidedownCancelClick' | 'slidedownClosed' | 'slidedownQueued' | 'slidedownShown';
export type OneSignalDeferredLoadedCallback = (onesignal: IOneSignalOneSignal) => void;
export interface IOSNotification {
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
export interface IOSNotificationActionButton {
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
export interface NotificationClickResult {
    readonly actionId?: string;
    readonly url?: string;
}
export type NotificationEventTypeMap = {
    'click': NotificationClickEvent;
    'foregroundWillDisplay': NotificationForegroundWillDisplayEvent;
    'dismiss': NotificationDismissEvent;
    'permissionChange': boolean;
    'permissionPromptDisplay': void;
};
export interface NotificationForegroundWillDisplayEvent {
    readonly notification: IOSNotification;
    preventDefault(): void;
}
export interface NotificationDismissEvent {
    notification: IOSNotification;
}
export interface NotificationClickEvent {
    readonly notification: IOSNotification;
    readonly result: NotificationClickResult;
}
export type UserChangeEvent = {
    current: UserNamespaceProperties;
};
export type UserNamespaceProperties = {
    onesignalId: string | undefined;
    externalId: string | undefined;
};
export interface IInitObject {
    appId: string;
    subdomainName?: string;
    requiresUserPrivacyConsent?: boolean;
    promptOptions?: {
        slidedown: {
            prompts: {
                /**
                 * Whether to automatically display the prompt.
                 * `true` will display the prompt based on the delay options.
                 * `false` will prevent the prompt from displaying until the Slidedowns methods are used.
                 */
                autoPrompt: boolean;
                /**
                 * Only available for type: category. Up to 10 categories.
                 * @example
                 *  categories: [{ tag: 'local_news', label: 'Local News' }] // The user will be tagged with local_news but will see "Local News" in the prompt.
                 */
                categories: {
                    /** Should identify the action. */
                    tag: string;
                    /** What the user will see. */
                    label: string;
                }[];
                /**
                 * The delay options for the prompt.
                 * @example delay: { pageViews: 3, timeDelay: 20 } // The user will not be shown the prompt until 20 seconds after the 3rd page view.
                 */
                delay: {
                    /** The number of pages a user needs to visit before the prompt is displayed. */
                    pageViews?: number;
                    /** The number of seconds a user needs to wait before the prompt is displayed.Both options must be satisfied for the prompt to display */
                    timeDelay?: number;
                };
                /**
                 * The text to display in the prompt.
                 */
                text?: {
                    /** The callout asking the user to opt-in. Up to 90 characters. */
                    actionMessage?: string;
                    /** Triggers the opt-in. Up to 15 characters. */
                    acceptButton?: string;
                    /** Cancels opt-in. Up to 15 characters. */
                    cancelMessage?: string;
                    /** The message of the confirmation prompt displayed after the email and/or phone number is provided. Up to 90 characters. */
                    confirmMessage?: string;
                    /** Identifies the email text field. Up to 15 characters. */
                    emailLabel?: string;
                    /** Cancels the category update. Up to 15 characters. */
                    negativeUpdateButton?: string;
                    /** Saves the updated category tags. Up to 15 characters. */
                    positiveUpdateButton?: string;
                    /** Identifies the phone number text field. Up to 15 characters. */
                    smsLabel?: string;
                    /** A different message shown to subscribers presented the prompt again to update categories. Up to 90 characters. */
                    updateMessage?: string;
                };
                /**
                 * The type of prompt to display.
                 * `push` which is the Slide Prompt without categories.
                 * `category` which is the Slide Prompt with categories.
                 * `sms` only asks for phone number.
                 * `email` only asks for email address.
                 * `smsAndEmail` asks for both phone number and email address.
                 */
                type: 'push' | 'category' | 'sms' | 'email' | 'smsAndEmail';
            }[];
        };
    };
    welcomeNotification?: {
        /**
         * Disables sending a welcome notification to new site visitors. If you want to disable welcome notifications, this is the only option you need.
         * @deprecated Use 'disable' instead. This will be removed in a future version.
         */
        disabled?: boolean;
        /**
         * Disables sending a welcome notification to new site visitors. If you want to disable welcome notifications, this is the only option you need.
         */
        disable?: boolean;
        /**
         * The welcome notification's message. You can localize this to your own language.
         * If left blank or set to blank, the default of 'Thanks for subscribing!' will be used.
         */
        message: string;
        /**
         * The welcome notification's title. You can localize this to your own language. If not set, or left blank, the site's title will be used.
         * Set to one space ' ' to clear the title, although this is not recommended.
         */
        title?: string;
        /**
         * By default, clicking the welcome notification does not open any link.
         * This is recommended because the user has just visited your site and subscribed.
         */
        url?: string;
    };
    /**
     * Will enable customization of the notify/subscription bell button.
     */
    notifyButton?: {
        /**
         * A function you define that returns true to show the Subscription Bell, or false to hide it.
         * Typically used the hide the Subscription Bell after the user is subscribed.
         * This function is not re-evaluated on every state change; this function is only evaluated once when the Subscription Bell begins to show.
         */
        displayPredicate?: () => boolean | Promise<boolean>;
        /**
         * Enable the Subscription Bell. The Subscription Bell is otherwise disabled by default.
         */
        enable?: boolean;
        /** Specify CSS-valid pixel offsets using bottom, left, and right. */
        offset?: {
            bottom: string;
            left: string;
            right: string;
        };
        /**
         * If `true`, the Subscription Bell will display an icon that there is 1 unread message.
         * When hovering over the Subscription Bell, the user will see custom text set by message.prenotify.
         */
        prenotify: boolean;
        /** Either `bottom-left` or `bottom-right`. The Subscription Bell will be fixed at this location on your page. */
        position?: 'bottom-left' | 'bottom-right';
        /**  Set `false` to hide the 'Powered by OneSignal' text in the Subscription Bell dialog popup. */
        showCredit: boolean;
        /**
         * The Subscription Bell will initially appear at one of these sizes, and then shrink down to size `small` after the user subscribes.
         */
        size?: 'small' | 'medium' | 'large';
        /** Customize the Subscription Bell text. */
        text: {
            'dialog.blocked.message': string;
            'dialog.blocked.title': string;
            'dialog.main.button.subscribe': string;
            'dialog.main.button.unsubscribe': string;
            'dialog.main.title': string;
            'message.action.resubscribed': string;
            'message.action.subscribed': string;
            'message.action.subscribing': string;
            'message.action.unsubscribed': string;
            'message.prenotify': string;
            'tip.state.blocked': string;
            'tip.state.subscribed': string;
            'tip.state.unsubscribed': string;
        };
    };
    persistNotification?: boolean;
    webhooks?: {
        /**
         * Enable this setting only if your server has CORS enabled and supports non-simple CORS requests.
         * If this setting is disabled, your webhook will not need CORS to receive data, but it will not receive the custom headers.
         * The simplest option is to leave it disabled.
         * @default false
         */
        cors: boolean;
        /**
         * This event occurs after a notification is clicked.
         * @example https://site.com/hook
         */
        'notification.clicked'?: string;
        /**
         * This event occurs after a notification is intentionally dismissed by the user (clicking the notification body or one of the notification action buttons does not trigger the dismissed webhook),
         * after a group of notifications are all dismissed (with this notification as part of that group), or after a notification expires on its own time and disappears. This event is supported on Chrome only.
         * @example https://site.com/hook
         */
        'notification.dismissed'?: string;
        /**
         * This event occurs after a notification is displayed.
         * @example https://site.com/hook
         */
        'notification.willDisplay'?: string;
    };
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
export interface IOneSignalOneSignal {
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
export interface IOneSignalNotifications {
    permissionNative: NotificationPermission;
    permission: boolean;
    setDefaultUrl(url: string): Promise<void>;
    setDefaultTitle(title: string): Promise<void>;
    isPushSupported(): boolean;
    requestPermission(): Promise<void>;
    addEventListener<K extends NotificationEventName>(event: K, listener: (obj: NotificationEventTypeMap[K]) => void): void;
    removeEventListener<K extends NotificationEventName>(event: K, listener: (obj: NotificationEventTypeMap[K]) => void): void;
}
export interface IOneSignalSlidedown {
    promptPush(options?: AutoPromptOptions): Promise<void>;
    promptPushCategories(options?: AutoPromptOptions): Promise<void>;
    promptSms(options?: AutoPromptOptions): Promise<void>;
    promptEmail(options?: AutoPromptOptions): Promise<void>;
    promptSmsAndEmail(options?: AutoPromptOptions): Promise<void>;
    addEventListener(event: SlidedownEventName, listener: (wasShown: boolean) => void): void;
    removeEventListener(event: SlidedownEventName, listener: (wasShown: boolean) => void): void;
}
export interface IOneSignalDebug {
    setLogLevel(logLevel: 'trace' | 'debug' | 'info' | 'warn' | 'error'): void;
}
export interface IOneSignalSession {
    sendOutcome(outcomeName: string, outcomeWeight?: number): Promise<void>;
    sendUniqueOutcome(outcomeName: string): Promise<void>;
}
export interface IOneSignalUser {
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
export interface IOneSignalPushSubscription {
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
