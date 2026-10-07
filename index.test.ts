import { afterEach, beforeAll, beforeEach, describe, expect, test, vi } from 'vitest';

import OneSignal from './index';

const APP_ID = '123456';

const originalDocument = window.document;
const documentSpy = vi.spyOn(window, 'document', 'get');

beforeAll(() => {
  // jsdom lacks PushSubscriptionOptions; stub it so init()'s push-support check passes.
  function PushSubscriptionOptionsStub() {}
  PushSubscriptionOptionsStub.prototype = { applicationServerKey: undefined };
  (globalThis as unknown as { PushSubscriptionOptions: unknown }).PushSubscriptionOptions =
    PushSubscriptionOptionsStub;
});

const init = vi.fn();
// @ts-expect-error - mocking OneSignal class that comes from the cdn
window.OneSignal = {
  init,
};
window.OneSignalDeferred = [];
Object.defineProperty(window.OneSignalDeferred, 'push', {
  value: (cb: (OneSignal: typeof window.OneSignal) => void) => {
    cb(window.OneSignal);
  },
});

describe('React OneSignal', () => {
  test('init method', async () => {
    // no document error
    // @ts-expect-error - simulating missing document
    documentSpy.mockReturnValue(undefined);
    await expect(OneSignal.init({ appId: APP_ID })).rejects.toThrow(
      'Document is not defined.',
    );
    documentSpy.mockImplementation(() => originalDocument);

    // no appId error
    // @ts-expect-error - appId is required but purposely not provided for this test
    await expect(OneSignal.init({})).rejects.toThrow(
      'You need to provide your OneSignal appId.',
    );

    // init error
    init.mockRejectedValue(new Error('init error'));
    await expect(OneSignal.init({ appId: APP_ID })).rejects.toThrow(
      'init error',
    );

    // init success
    init.mockResolvedValue(undefined);
    await expect(OneSignal.init({ appId: APP_ID })).resolves.not.toThrow();

    // already initialized error
    await expect(OneSignal.init({ appId: APP_ID })).rejects.toThrow(
      'OneSignal is already initialized.',
    );
  });
});

describe('identity guards', () => {
  const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);

  beforeEach(() => {
    error.mockClear();
  });

  test('login rejects empty and a null byte and keeps whitespace', async () => {
    const login = vi.fn().mockResolvedValue(undefined);
    window.OneSignal = { login } as unknown as typeof window.OneSignal;
    await OneSignal.login('');
    await OneSignal.login('ab\u0000c');
    await OneSignal.login(' user ');
    expect(login).toHaveBeenCalledTimes(1);
    expect(login).toHaveBeenCalledWith(' user ', undefined);
    expect(error).toHaveBeenCalledWith('[OneSignal] login: externalId is required');
    expect(error).toHaveBeenCalledWith('[OneSignal] login: externalId contains a null byte');
  });

  test('empty tag values are kept and a null byte in a key is rejected', () => {
    const addTag = vi.fn();
    const addTags = vi.fn();
    const setLanguage = vi.fn();
    window.OneSignal = {
      User: { addTag, addTags, setLanguage },
    } as unknown as typeof window.OneSignal;
    OneSignal.User.addTag('kept', '');
    OneSignal.User.addTag('nul-value', 'a\u0000b');
    OneSignal.User.addTag('', 'nope');
    OneSignal.User.addTags({ '\u0000': 'nope', sibling: 'nope' });
    OneSignal.User.addTags({ ok: null as unknown as string });
    OneSignal.User.setLanguage('');
    OneSignal.User.setLanguage('en\u0000');
    expect(addTag).toHaveBeenCalledTimes(2);
    expect(addTag).toHaveBeenCalledWith('kept', '');
    expect(addTag).toHaveBeenCalledWith('nul-value', 'a\u0000b');
    expect(addTags).not.toHaveBeenCalled();
    expect(setLanguage).toHaveBeenCalledTimes(1);
    expect(setLanguage).toHaveBeenCalledWith('');
  });
});

describe('init() rejects instead of hanging', () => {
  let OneSignalModule: typeof import('./index').default;

  beforeEach(async () => {
    vi.resetModules();
    window.OneSignalDeferred = [];
    // addSDKScript() short-circuits if #onesignal-sdk already exists in the DOM.
    document.querySelectorAll('script#onesignal-sdk').forEach((el) => el.remove());
    OneSignalModule = (await import('./index')).default;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('rejects when the browser does not support Web Push', async () => {
    const originalPushSubscriptionOptions = (
      globalThis as unknown as { PushSubscriptionOptions: unknown }
    ).PushSubscriptionOptions;
    (globalThis as unknown as { PushSubscriptionOptions: unknown }).PushSubscriptionOptions =
      undefined;
    window.safari = undefined;

    try {
      await expect(OneSignalModule.init({ appId: APP_ID })).rejects.toThrow(
        'This browser does not support Web Push notifications.',
      );
    } finally {
      (globalThis as unknown as { PushSubscriptionOptions: unknown }).PushSubscriptionOptions =
        originalPushSubscriptionOptions;
    }
  });

  test('rejects when the SDK script fails to load', async () => {
    const initPromise = OneSignalModule.init({ appId: APP_ID });

    const scriptElement = document.getElementById('onesignal-sdk') as HTMLScriptElement | null;
    expect(scriptElement).not.toBeNull();
    scriptElement?.onerror?.(new Event('error'));

    await expect(initPromise).rejects.toThrow('OneSignal script failed to load.');
  });
});
