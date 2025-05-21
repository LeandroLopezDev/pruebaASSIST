import { useState, useEffect, useCallback, useRef } from 'react';
import type { CustomError } from '../services/types.d';

interface UseApiResult<T> {
  data: T | undefined;
  isLoading: boolean;
  error: CustomError | undefined;
  fetchData: (initialParams?: any) => Promise<void>; // Función para disparar la llamada manualmente
}

/**
 * Custom hook genérico para realizar llamadas a la API y manejar sus estados de carga, datos y error.
 * @param apiCallFn Una función que devuelve una promesa de la llamada a la API (ej. () => getReservations(params)).
 * @param initialParams Parámetros iniciales para la función de llamada a la API.
 * @param dependencies Un array de dependencias para el useEffect, similar a las dependencias de useEffect.
 * La llamada a la API se disparará automáticamente cuando estas cambien.
 * @returns Un objeto con `data`, `isLoading`, `error` y una función `WorkspaceData` para re-disparar la llamada.
 */
export function useApi<T, P = any>( // P es el tipo de los parámetros que recibe apiCallFn
    apiCallFn: (params?: P) => Promise<{ data: T | undefined; error: CustomError | undefined }>,
    initialParams?: P,
    dependencies: any[] = [] // Default a un array vacío
  ): UseApiResult<T> {
    const [data, setData] = useState<T | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<CustomError | undefined>(undefined);
  
    // Usamos useRef para mantener una referencia mutable a los parámetros actuales
    // Esto permite que fetchData pueda ser llamado con parámetros opcionales y sobrescribir los del estado
    const currentParamsRef = useRef<P | undefined>(initialParams);
  
    // useCallback para memorizar fetchData y evitar re-creaciones innecesarias
    const fetchData = useCallback(async (paramsOverride?: P) => {
      setIsLoading(true);
      setError(undefined); // Limpiar errores previos
  
      // Usar los parámetros pasados a fetchData, o los del ref, o los iniciales
      const paramsToUse = paramsOverride !== undefined ? paramsOverride : currentParamsRef.current;

      try {
        const result = await apiCallFn(paramsToUse);
        if (result.error) {
          setError(result.error);
          setData(undefined);
        } else {
          setData(result.data);
          setError(undefined);
        }
      } catch (err) {
        // Este catch es más bien un fallback si safeApiCall no manejó algo inesperado
        setError({
          message: 'Error inesperado en el hook useApi.',
          originalError: err,
        });
        setData(undefined);
      } finally {
        setIsLoading(false);
      }
    }, [apiCallFn]); // Depende solo de la función de llamada a la API
  
    // Efecto para disparar la carga inicial o cuando cambian las dependencias
    useEffect(() => {
      // Actualizar el ref de parámetros si initialParams o las dependencias cambian
      currentParamsRef.current = initialParams;
      fetchData(initialParams); // Dispara la carga inicial con los initialParams
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies); // Solo usamos las dependencias explícitas pasadas al hook
  
    return { data, isLoading, error, fetchData };
  }