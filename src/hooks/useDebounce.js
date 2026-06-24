import { useState, useEffect } from "react";

const useDebounce = value => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const time = setTimeout(() => {
      setDebouncedValue(value);
    }, 350);

    return () => clearTimeout(time);
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
