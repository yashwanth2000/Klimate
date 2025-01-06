import { useEffect, useState } from "react";

export const useLocalStorage = <T>(Key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(Key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(Key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [Key, storedValue]);

  return [storedValue, setStoredValue] as const;
};
