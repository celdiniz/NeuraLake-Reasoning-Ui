import React from 'react';
import { Brain } from 'lucide-react';

interface SearchPageProps {
  onSubmit: (query: string) => void;
  query: string;
  setQuery: (query: string) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ onSubmit, query, setQuery }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query.trim());
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 transition-all duration-500">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <div className="flex justify-center items-center space-x-4">
          <Brain className="w-16 h-16 text-indigo-600" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">AI Assistant</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask me anything..."
              className="w-full px-6 py-4 text-lg rounded-full border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg 
                       focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 
                       px-6 py-2 bg-indigo-600 text-white rounded-full 
                       hover:bg-indigo-700 transition-colors"
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