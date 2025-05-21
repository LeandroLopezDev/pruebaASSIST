import axios from 'axios';
import type { AxiosInstance, AxiosError } from 'axios';
import type { CustomError } from './types.d'; // Importamos el tipo de error que definimos
 // Importamos el tipo de error que definimos

// URL Base de la API proporcionada en el desafío
const API_BASE_URL = 'https://3ccfrjulc8.execute-api.us-west-1.amazonaws.com/dev';

// Crear una instancia de Axios
const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000, // Tiempo de espera para la solicitud (10 segundos)
});

/**
 * Wrapper genérico para las llamadas a la API.
 * Encapsula la lógica de manejo de errores y normaliza la respuesta.
 * @param requestFn La función que realiza la llamada a la API (ej. api.get, api.post).
 * @returns Un objeto con `data` si la llamada fue exitosa, o `error` si hubo un problema.
 */
export async function safeApiCall<T>(
    requestFn: Promise<T>
  ): Promise<{ data: T; error: undefined } | { data: undefined; error: CustomError }> {
    try {
      const response = await requestFn;
      return { data: response, error: undefined };
    } catch (err) {
      const axiosError = err as AxiosError; // Casteamos el error a AxiosError para acceder a sus propiedades
  
      const customError: CustomError = {
        message: 'Ocurrió un error inesperado.',
        originalError: axiosError,
      };
  
      if (axiosError.response) {
        // El servidor respondió con un status code fuera del rango 2xx
        customError.statusCode = axiosError.response.status;
        // Intenta extraer un mensaje de error del cuerpo de la respuesta si está disponible
        // Asume que la API podría retornar un objeto con un 'message' o 'error'
        if (axiosError.response.data && typeof axiosError.response.data === 'object' && 'message' in axiosError.response.data) {
          customError.message = (axiosError.response.data as any).message;
        } else if (axiosError.response.data && typeof axiosError.response.data === 'string') {
          customError.message = axiosError.response.data;
        } else {
          customError.message = `Error ${axiosError.response.status}: ${axiosError.response.statusText || 'Error del servidor'}`;
        }
      } else if (axiosError.request) {
        // La solicitud fue hecha pero no se recibió respuesta (ej. problema de red)
        customError.message = 'No se recibió respuesta del servidor. Verifica tu conexión a internet.';
        customError.statusCode = 0; // Indicador de error de red
      } else {
        // Algo sucedió al configurar la solicitud que disparó un Error
        customError.message = axiosError.message || 'Error al configurar la solicitud.';
      }
  
      // Puedes agregar lógica adicional aquí, como loguear el error o disparar un Toast notification global
      console.error('API Call Error:', customError);
  
      return { data: undefined, error: customError };
    }
  }
  
export default api;