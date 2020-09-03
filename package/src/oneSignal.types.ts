export interface IOneSignal {
  notificationPermission: string[];
  registerForPushNotifications: () => Promise<any>;
  showSlidedownPrompt: (options?: IOneSignalAutoPromptOptions) => Promise<any>;
  showCategorySlidedown: (options?: IOneSignalAutoPromptOptions) => Promise<any>;
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
}

export interface OneSignalOptions {
  // eslint-disable-next-line camelcase
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
    };
    text?: {
      [key: string]: string;
    };
    colors?: {
      [key: string]: string;
    };
  }
}

export interface IOneSignalEventCallback{
  callback: (result: any) => any
}

export interface IOneSignalEvent {
  listener?: string;
  event: string;
  callback: IOneSignalEventCallback
}

export interface IOneSignalTagCategory {
  tag: string;
  label: string;
  checked?: boolean;
}

export interface IOneSignalCategories {
  positiveUpdateButton: string;
  negativeUpdateButton: string;
  savingButtonText: string;
  errorButtonText: string;
  updateMessage: string;
  tags: IOneSignalTagCategory[];
}

export interface IOneSignalAutoPromptOptions {
  force?: boolean;
  forceSlidedownOverNative?: boolean;
  isInUpdateMode?: boolean;
  categoryOptions?: IOneSignalCategories;
}
