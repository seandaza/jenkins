import { useEffect } from 'react';

export const useOutsideClick = (ref, isOpen, callback) => {
  const handleClick = (e) => {
    if (isOpen && ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};
