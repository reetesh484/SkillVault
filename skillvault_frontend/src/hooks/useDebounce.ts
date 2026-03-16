import { useState, useEffect } from "react";

export const useDebounce = <T>(input: T, timer = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState(input);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(input), timer);

    return () => {
      clearTimeout(timeout);
    };
  }, [input, timer]);

  return debouncedValue;
};
