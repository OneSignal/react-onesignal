declare module 'react-onesignal' {
	interface Action<T>{ (item: T): void; }
	interface AutoPromptOptions { force?: boolean; forceSlidedownOverNative?: boolean; slidedownPromptOptions?: IOneSignalAutoPromptOptions; }
	interface RegisterOptions { modalPrompt?: boolean; httpPermissionRequest?: boolean; slidedown?: boolean; autoAccept?: boolean }
	interface SetSMSOptions { identifierAuthHash?: string; }
	interface SetEmailOptions { identifierAuthHash?: string; emailAuthHash?: string; }
	interface TagsObject<T> { [key: string]: T; }
	interface IOneSignalAutoPromptOptions { force?: boolean; forceSlidedownOverNative?: boolean; isInUpdateMode?: boolean; categoryOptions?: IOneSignalCategories; }
	interface IOneSignalCategories { positiveUpdateButton: string; negativeUpdateButton: string; savingButtonText: string; errorButtonText: string; updateMessage: string; tags: IOneSignalTagCategory[]; }
  interface IOneSignalTagCategory { tag: string; label: string; checked?: boolean; }

	interface OneSignalReact {
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
	const OneSignalReact: OneSignalReact;
	export default OneSignalReact;
}
