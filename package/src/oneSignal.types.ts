export interface IOneSignal {
  notificationPermission: string[],
  registerForPushNotifications: () => Promise<any>,
  getNotificationPermission: () => Promise<string>,
  setEmail: (email: string) => Promise<string>,
  getEmailId: () => Promise<string>,
}
