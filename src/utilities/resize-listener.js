import { useEffect } from 'react';

export const useResizeListener = (callback) => {
  const onResize = () => callback(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  });
};
