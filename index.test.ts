import OneSignal from './index';

const originalDocument = global.document;
const documentSpy = vi.spyOn(global, 'document', 'get');

const APP_ID = '123456';

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
