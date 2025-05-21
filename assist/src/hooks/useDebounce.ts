import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
    useEffect(() => {
      // Configura un temporizador que actualiza el valor debounciado después del delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      // Limpia el temporizador si el valor cambia antes de que se dispare
      // o si el componente se desmonta
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]); // Re-ejecuta el efecto si 'value' o 'delay' cambian
  
    return debouncedValue;
  }