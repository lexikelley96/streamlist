import { useState, useEffect } from 'react';

const useWarning = () => {
  const [warning, setWarning] = useState(null);

  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => {
        setWarning(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [warning]);

  return { warning, setWarning };
};

export default useWarning;
