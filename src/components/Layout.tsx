import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LayoutProps {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ sidebar, content }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen relative">
      {/* Sidebar with slide animation */}
      <div
        className={`absolute md:relative h-full transition-all duration-300 ease-in-out z-20
                   ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:-translate-x-64'}`}
      >
        {sidebar}
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`absolute top-4 z-30 transition-all duration-300 ease-in-out
                   ${isSidebarOpen 
                     ? 'left-64 md:left-64' 
                     : 'left-4'
                   }`}
        aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        <div className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700">
          {isSidebarOpen ? (
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </div>
      </button>

      {/* Main content */}
      <div className="flex-1 relative">
        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        {content}
      </div>
    </div>
  );
};

export default Layout;