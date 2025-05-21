import React from 'react';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

interface ReservationSearchFormProps {
  pasajeroSearch: string;
  reservaSearch: string;
  onPasajeroChange: (value: string) => void;
  onReservaChange: (value: string) => void;
  onSearch: () => void;
}

export const ReservationSearchForm: React.FC<ReservationSearchFormProps> = ({
  pasajeroSearch,
  reservaSearch,
  onPasajeroChange,
  onReservaChange,
  onSearch,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="pasajeroSearch"
          label="Buscar por Pasajero"
          type="text"
          placeholder="Nombre o apellido del pasajero"
          value={pasajeroSearch}
          onChange={(e) => onPasajeroChange(e.target.value)}
        />
        <Input
          id="reservaSearch"
          label="Buscar por Número de Reserva"
          type="text"
          placeholder="Número de reserva (AX321)"
          value={reservaSearch}
          onChange={(e) => onReservaChange(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-end">
        <Button type="submit">
          Buscar Reservas
        </Button>
      </div>
    </form>
  );
};