import api, { safeApiCall } from './api';
import type { ReservationSearchParams, ReservationsApiResponse, CustomError } from './types.d';

/**
 * Obtiene las reservas activas de la API.
 * @param params Parámetros de búsqueda para filtrar y paginar las reservas.
 * @returns Una promesa que resuelve a los datos de las reservas o un objeto de error.
 */
export async function getReservations( params: ReservationSearchParams = {} ): Promise<{ data: ReservationsApiResponse | undefined; error: CustomError | undefined }> {
    // Construye los parámetros de la URL. Axios maneja la serialización de objetos a query strings.
    const queryParams = {
      pasajero: params.pasajero,
      reserva: params.reserva,
      page: params.page,
      pageSize: params.pageSize,
    };

    // Filtra los parámetros que son undefined para no enviarlos en la URL
    const cleanedParams = Object.fromEntries(
    Object.entries(queryParams).filter(([, value]) => value !== undefined && value !== null)
  );

  // Realiza la llamada GET a la API usando la instancia de Axios y el wrapper safeApiCall
  // La URL completa será: API_BASE_URL + '/dev/reservasHandler'
  const response = await safeApiCall(api.get<ReservationsApiResponse>('/reservasHandler', { params: cleanedParams }));
  
  return {
    data: response.data?.data,
    error: response.error
  };
}

