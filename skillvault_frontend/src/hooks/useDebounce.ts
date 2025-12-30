import { useState, useEffect } from "react";

export const useDebounce = (input: string, timer = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(input);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(input), timer);

    return () => {
      clearTimeout(timeout);
    };
  }, [input, timer]);

  return debouncedValue;
};
