import React from 'react';

export const NoResultsMessage: React.FC = () => {
  return (
    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
      <p className="font-bold">No se encontraron resultados.</p>
      <p className="text-sm">Intenta ajustar tus criterios de búsqueda.</p>
    </div>
  );
};