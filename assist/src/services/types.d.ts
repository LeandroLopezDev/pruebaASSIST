// Tipos de datos para una reserva individual tal como viene de la API
export interface Reservation {
    reserva: string;
    pasajero: string;
    destino: string;
    estado: string;
    fecha_regreso: string; // Podríamos usar `Date` si se parseara
}

// Estructura completa de la respuesta de la API de reservas
export interface ReservationsApiResponse {
    total: number;
    page: number;
    pageSize: number;
    resultados: Reservation[];
}

// Parámetros de búsqueda que se pueden enviar a la API
export interface ReservationSearchParams {
    pasajero?: string;
    reserva?: string;
    page?: number;
    pageSize?: number;
}

// Tipo de error customizado para el manejo de errores en los servicios
export interface CustomError {
    message: string;
    statusCode?: number;
    errorCode?: string;
    originalError?: any; // Para mantener la referencia al error original de Axios/JS
}