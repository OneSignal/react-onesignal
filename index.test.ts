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
