import { useState } from 'react';

import { getOneSignalInstance } from '../../oneSignal';
import useInterval from '../useInterval';

/**
 * Hook that waits for oneSignal initialization before executing the callback
 * useful for using setEmail and setExternalUserId without getting error
 * it uses setInterval to check if OneSignal is setup, calling the callback when it is
 *
 * @param callback the callback to be called when oneSignal is initialized.
 * @param pollingIntervalMs time between checks, null to disable.
 */
const useOneSignalSetup = (
  callback: () => void,
  pollingIntervalMs: number | null = 100,
) => {
  const [initialized, setInitialized] = useState(false);

  useInterval(() => {
    const oneSignal = getOneSignalInstance();
    if (oneSignal) {
      setInitialized(true);
      callback();
    }
  }, initialized ? null : pollingIntervalMs);
};

export default useOneSignalSetup;
