import { useState, useEffect } from 'react';

import { useDebounce } from './useDebounce'; // Asegúrate de importar tu hook de debounce
import { useApi } from './useApi';
import type { ReservationsApiResponse, ReservationSearchParams } from '../services/types';
import { getReservations } from '../services/reservations';

interface UseReservationsSearchResult {
  reservations: ReservationsApiResponse | undefined;
  isLoading: boolean;
  error: any; // Usaremos el tipo CustomError de useApi
  pasajeroSearch: string;
  reservaSearch: string;
  currentPage: number;
  pageSize: number;
  setPasajeroSearch: (value: string) => void;
  setReservaSearch: (value: string) => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  refetchReservations: () => void; // Para disparar la búsqueda manualmente
}

export function useReservationsSearch(): UseReservationsSearchResult {
  // Estados para los campos de búsqueda
  const [pasajeroSearch, setPasajeroSearch] = useState<string>('');
  const [reservaSearch, setReservaSearch] = useState<string>('');

  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5); // Default pageSize según la API

  // Debounce para las búsquedas de texto
  const debouncedPasajero = useDebounce(pasajeroSearch, 500); // 500ms de retardo
  const debouncedReserva = useDebounce(reservaSearch, 500);

  // Parámetros que se enviarán a la API. Estos serán las "dependencias" de useApi.
  const searchParams: ReservationSearchParams = {
    pasajero: debouncedPasajero || undefined, // Evitar enviar string vacío
    reserva: debouncedReserva || undefined,   // Evitar enviar string vacío
    page: currentPage,
    pageSize: pageSize,
  };

  // Usar el hook useApi para obtener los datos
  const {
    data: reservations,
    isLoading,
    error,
    fetchData: refetchReservations, // Renombramos fetchData para mayor claridad
  } = useApi<ReservationsApiResponse, ReservationSearchParams>(
    getReservations,
    searchParams,
    [debouncedPasajero, debouncedReserva, currentPage, pageSize] // Dependencias para re-fetch automático
  );

  // Reiniciar la página a 1 solo cuando cambian los términos de búsqueda
  useEffect(() => {
    // Solo resetear cuando cambian los términos de búsqueda, no cuando cambia la página
    if (debouncedPasajero || debouncedReserva) {
      setCurrentPage(1);
    }
  }, [debouncedPasajero, debouncedReserva]); // Quitamos currentPage de las dependencias


  return {
    reservations,
    isLoading,
    error,
    pasajeroSearch,
    reservaSearch,
    currentPage,
    pageSize,
    setPasajeroSearch,
    setReservaSearch,
    setCurrentPage,
    setPageSize,
    refetchReservations,
  };
}