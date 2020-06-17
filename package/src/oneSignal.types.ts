export interface IOneSignal {
  notificationPermission: string[],
  registerForPushNotifications: () => Promise<any>,
  getNotificationPermission: () => Promise<string>,
  setEmail: (email: string) => Promise<string>,
  getEmailId: () => Promise<string>,
  getUserId: () => Promise<string>,
  setExternalUserId: (externalUserId: string | number) => Promise<void>,
  getExternalUserId: () => Promise<any>,
  initialized: boolean,
}

export interface OneSignalOptions {
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
}

export interface IOneSignalEventCallback{
  callback: (result: any) => any
}

export interface IOneSignalEvent {
  listener?: string;
  event: string;
  callback: IOneSignalEventCallback
}
