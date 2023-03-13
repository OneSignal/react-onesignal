interface Window {
  safari?: {
    pushNotificationPermission: (permissionData: any) => void;
    pushNotification: any;
  };
}
