import React from 'react';
import type { Reservation } from '../../../services/types';

interface ReservationTableProps {
  reservations: Reservation[];
}

export const ReservationTable: React.FC<ReservationTableProps> = ({ reservations }) => {
  if (reservations.length === 0) {
    return null; // O podrías retornar un mensaje de "No hay datos para mostrar" aquí si quieres
  }

  return (
    <div className="overflow-x-auto shadow-md rounded">
      <table className="min-w-full leading-normal">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Reserva</th>
            <th className="py-3 px-6 text-left">Pasajero</th>
            <th className="py-3 px-6 text-left">Destino</th>
            <th className="py-3 px-6 text-left">Estado</th>
            <th className="py-3 px-6 text-left">Fecha Regreso</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {reservations.map((reservation) => (
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