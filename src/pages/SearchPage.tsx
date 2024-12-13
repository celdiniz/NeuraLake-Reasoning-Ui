import React, { useState } from 'react';
import { Boxes } from 'lucide-react';

interface SearchPageProps {
  onSubmit: (query: string) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query.trim());
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <div className="flex justify-center items-center space-x-4">
          <Boxes className="w-16 h-16 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            NeuraLake Chat
          </h1>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Dream Big Here..."
              className="w-full px-6 py-4 text-lg rounded-full border border-gray-300 
                       dark:border-gray-600 bg-white dark:bg-gray-800 
                       text-gray-900 dark:text-white shadow-xl 
                       focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                       placeholder-gray-400 dark:placeholder-gray-500"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 
                       px-6 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-full 
                       hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
            >
              Ask
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchPage;