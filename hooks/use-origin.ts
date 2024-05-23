import { useState } from 'react';
import { useIsMounted } from 'usehooks-ts';

export const useOrigin = () => {
  const isMounted = useIsMounted();

  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

    return isMounted() ? origin : "";
};
