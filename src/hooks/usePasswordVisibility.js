import { useState, useCallback } from 'react';

/**
 * Custom hook for managing password visibility toggle
 * @returns {Object} Password visibility state and toggle function
 */
export const usePasswordVisibility = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsVisible(prev => !prev);
  }, []);

  return {
    isVisible,
    toggleVisibility,
    inputType: isVisible ? 'text' : 'password',
    iconSrc: isVisible ? '/icons/EyeClose.png' : '/icons/EyeOpen.png',
  };
};

export default usePasswordVisibility;
