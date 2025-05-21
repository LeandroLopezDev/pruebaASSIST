import { ErrorMessage } from "../../components/ErrorMessage";
// import { LoadingSpinner } from "../../components/LoadingSpinner";
import { NoResultsMessage } from "../../components/NoResultsMessage";
import { Pagination } from "../../components/Pagination";
import { ReservationSearchForm } from "./components/ReservationSearchForm";
import { ReservationTable } from "./components/ReservationTable";
import { useReservationsSearch } from "../../hooks/useReservationsSearch";


export const ReservationsFeature: React.FC = () => {
    // Consumir nuestro custom hook para obtener toda la lógica y datos
    const {
      reservations,
      isLoading,
      error,
      pasajeroSearch,
      reservaSearch,
      currentPage,
      // pageSize,
      setPasajeroSearch,
      setReservaSearch,
      setCurrentPage,
      // setPageSize,
      refetchReservations, // Función para forzar una nueva búsqueda si es necesario
    } = useReservationsSearch();

    return (
        <div className="container mx-auto p-4 max-w-5xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Búsqueda de Reservas Activas
            </h1>
    
            {/* Formulario de Búsqueda */}
            <ReservationSearchForm
              pasajeroSearch={pasajeroSearch}
              reservaSearch={reservaSearch}
              onPasajeroChange={setPasajeroSearch}
              onReservaChange={setReservaSearch}
              // Cuando se da click en buscar, el useDebounce ya habrá actualizado los parámetros
              // pero podemos agregar un refetch explícito si queremos que ignore el debounce
              onSearch={refetchReservations}
            />
    
            {/* Indicadores de Estado */}
            {error && <ErrorMessage error={error} />}
    
            {/* Mostrar resultados o mensaje de no resultados */}
            {!error && (
            <>
                {reservations && reservations.resultados.length > 0 ? (
                <>
                    <ReservationTable 
                      reservations={reservations.resultados} 
                      isLoading={isLoading}
                    />
                    {!isLoading && (
                      <Pagination
                        totalItems={reservations.total}
                        itemsPerPage={reservations.pageSize}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage} // El hook ya manejará la lógica de re-fetch
                      />
                    )}
                </>
                ) : (
                // Solo mostrar NoResultsMessage si no estamos cargando y no hay error, y no hay resultados
                !isLoading && !error && reservations && reservations.resultados.length === 0 && <NoResultsMessage />
                )}
            </>
            )}
        </div>
    );
};