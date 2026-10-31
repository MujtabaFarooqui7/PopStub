import { useEffect, useState } from "react";

export function useLocalStorage(initialState, key, legacyKey) {
  const [value, setValue] = useState(function () {
    const storedValue =
      localStorage.getItem(key) ?? localStorage.getItem(legacyKey);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
      if (legacyKey) localStorage.removeItem(legacyKey);
    },
    [key, legacyKey, value],
  );

  return [value, setValue];
}
