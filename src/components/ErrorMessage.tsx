import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-red-700 dark:text-red-200">{message}</p>
        </div>
        <button
          onClick={onDismiss}
          className="ml-3 flex-shrink-0 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
        >
          <span className="sr-only">Dismiss</span>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;