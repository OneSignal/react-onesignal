import { useEffect, useRef } from 'react';

// custom hook inspired by Dan Abramov. https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// eslint-disable-next-line import/prefer-default-export
export function useInterval(callback: () => void, delay: number | null) {
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
