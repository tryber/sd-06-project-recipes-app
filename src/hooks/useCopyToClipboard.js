import { useState, useEffect, useCallback } from 'react';
import copy from 'clipboard-copy';

function useCopyToClipboard(resetInterval = null) {
  const [isCopied, setCopied] = useState(false);

  const handleCopy = useCallback((pathname) => {
    copy(`http://localhost:3000${pathname}`);
    setCopied(true);
  }, []);

  useEffect(() => {
    let timeout;

    if (isCopied && resetInterval) {
      timeout = setTimeout(() => setCopied(false), resetInterval);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isCopied, resetInterval]);

  return [isCopied, handleCopy];
}

export default useCopyToClipboard;
