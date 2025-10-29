import { useState, useEffect } from 'react';

// custom hook untuk menyimpan dan mengambil data di localStorage
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key); // untuk mengambil data dari localStorage
    return saved ? JSON.parse(saved) : initialValue;
  });

  // untuk menyimpan data ke localStorage setiap kali value berubah
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
