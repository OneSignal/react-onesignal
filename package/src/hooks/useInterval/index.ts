import { useEffect, useRef } from 'react';

/**
 * Hook that exposes an interval, similar to setInterval.
 * @param callback The callback function
 * @param delay The delay
 */
function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    if (delay !== null && savedCallback.current) {
      const tick = () => {
        savedCallback.current!();
      };

      const id = setInterval(tick, delay);

      return () => clearInterval(id);
    }

    return () => {};
  }, [delay]);
}

export default useInterval;
