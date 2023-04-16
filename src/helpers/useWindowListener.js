import { useEffect } from 'react';

export function useWindowListener(eventType, listener, dependencies = []) {
  useEffect(() => {
    window.addEventListener(eventType, listener);
    return () => {
      window.removeEventListener(eventType, listener);
    };
  }, dependencies.concat([eventType, listener]));
}