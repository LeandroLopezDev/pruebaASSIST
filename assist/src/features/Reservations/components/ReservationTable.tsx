import React, { useState, useMemo } from 'react';
import type { Reservation } from '../../../services/types';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

interface ReservationTableProps {
  reservations: Reservation[];
  isLoading?: boolean;
}

type SortField = 'reserva' | 'pasajero' | 'destino' | 'estado' | 'fecha_regreso';
type SortDirection = 'asc' | 'desc';

export const ReservationTable: React.FC<ReservationTableProps> = ({ reservations, isLoading = false }) => {
  const [sortField, setSortField] = useState<SortField>('reserva');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedReservations = useMemo(() => {
    if (isLoading || reservations.length === 0) return [];
    
    return [...reservations].sort((a, b) => {
      const aValue = a[sortField]?.toLowerCase() || '';
      const bValue = b[sortField]?.toLowerCase() || '';
      
      if (sortDirection === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  }, [reservations, sortField, sortDirection, isLoading]);

  const renderSortIcon = (field: SortField) => {
    // Siempre devolvemos un elemento para mantener el espacio consistente
    // pero solo mostramos el icono cuando corresponde
    return (
      <span className="inline-block w-4 ml-1">
        {sortField === field && (
          sortDirection === 'asc' 
            ? <FiChevronUp className="transition-transform duration-200" /> 
            : <FiChevronDown className="transition-transform duration-200" />
        )}
      </span>
    );
  };
  
  // Skeleton loader
  if (isLoading) {
    return (
      <div className="overflow-x-auto shadow-md rounded">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left w-1/6 min-w-[120px]">Reserva</th>
              <th className="py-3 px-6 text-left w-1/5 min-w-[150px]">Pasajero</th>
              <th className="py-3 px-6 text-left w-1/5 min-w-[150px]">Destino</th>
              <th className="py-3 px-6 text-left w-1/6 min-w-[100px]">Estado</th>
              <th className="py-3 px-6 text-left w-1/5 min-w-[150px]">Fecha Regreso</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {Array(5).fill(0).map((_, index) => (
              <tr key={index} className="border-b border-gray-200">
                {Array(5).fill(0).map((_, cellIndex) => (
                  <td key={cellIndex} className="py-3 px-6 text-left">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-full max-w-[150px]"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (reservations.length === 0) {
    // Retornamos un contenedor vacío con la misma altura para mantener consistencia
    return (
      <div className="overflow-x-auto shadow-md rounded" >
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left w-1/6 min-w-[120px]">Reserva</th>
              <th className="py-3 px-6 text-left w-1/5 min-w-[150px]">Pasajero</th>
              <th className="py-3 px-6 text-left w-1/5 min-w-[150px]">Destino</th>
              <th className="py-3 px-6 text-left w-1/6 min-w-[100px]">Estado</th>
              <th className="py-3 px-6 text-left w-1/5 min-w-[150px]">Fecha Regreso</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {/* Espacio vacío con altura consistente */}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-md rounded" >
      <table className="min-w-full leading-normal">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th 
              className="py-3 px-6 text-left cursor-pointer hover:bg-gray-300 transition-colors duration-200 w-1/6 min-w-[120px]"
              onClick={() => handleSort('reserva')}
            >
              <div className="flex items-center">
                <span>Reserva</span>
                {renderSortIcon('reserva')}
              </div>
            </th>
            <th 
              className="py-3 px-6 text-left cursor-pointer hover:bg-gray-300 transition-colors duration-200 w-1/5 min-w-[150px]"
              onClick={() => handleSort('pasajero')}
            >
              <div className="flex items-center">
                <span>Pasajero</span>
                {renderSortIcon('pasajero')}
              </div>
            </th>
            <th 
              className="py-3 px-6 text-left cursor-pointer hover:bg-gray-300 transition-colors duration-200 w-1/5 min-w-[150px]"
              onClick={() => handleSort('destino')}
            >
              <div className="flex items-center">
                <span>Destino</span>
                {renderSortIcon('destino')}
              </div>
            </th>
            <th 
              className="py-3 px-6 text-left cursor-pointer hover:bg-gray-300 transition-colors duration-200 w-1/6 min-w-[100px]"
              onClick={() => handleSort('estado')}
            >
              <div className="flex items-center">
                <span>Estado</span>
                {renderSortIcon('estado')}
              </div>
            </th>
            <th 
              className="py-3 px-6 text-left cursor-pointer hover:bg-gray-300 transition-colors duration-200 w-1/5 min-w-[150px]"
              onClick={() => handleSort('fecha_regreso')}
            >
              <div className="flex items-center">
                <span>Fecha Regreso</span>
                {renderSortIcon('fecha_regreso')}
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {sortedReservations.map((reservation) => (
            <tr key={reservation.reserva} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center">
                  <span className="font-medium">{reservation.reserva}</span>
                </div>
              </td>
              <td className="py-3 px-6 text-left">
                <span>{reservation.pasajero}</span>
              </td>
              <td className="py-3 px-6 text-left">
                <span>{reservation.destino}</span>
              </td>
              <td className="py-3 px-6 text-left">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${reservation.estado === 'activa' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                  {reservation.estado}
                </span>
              </td>
              <td className="py-3 px-6 text-left">
                <span>{reservation.fecha_regreso}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};