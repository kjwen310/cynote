import { useState, useEffect } from 'react';

export const useOrigin = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  return isMounted ? origin : '';
};
