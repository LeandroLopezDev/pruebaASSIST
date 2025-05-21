import React from 'react';
import type { CustomError } from '../services/types';

interface ErrorMessageProps {
  error: CustomError;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">¡Error! </strong>
      <span className="block sm:inline">{error.message}</span>
      {error.statusCode && (
        <p className="text-sm mt-1">Código de estado: {error.statusCode}</p>
      )}
    </div>
  );
};