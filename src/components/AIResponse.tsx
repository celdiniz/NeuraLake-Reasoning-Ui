import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Brain, MessageSquare } from 'lucide-react';
import { parseResponse } from '../utils/responseParser';

interface AIResponseProps {
  response: string;
}

const AIResponse: React.FC<AIResponseProps> = ({ response }) => {
  const [showReasoning, setShowReasoning] = useState(true);
  const { reasoning, answer } = parseResponse(response);

  return (
    <div className="space-y-4">
      {reasoning && (
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Reasoning Process
              </h3>
            </div>
            <button
              onClick={() => setShowReasoning(!showReasoning)}
              className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 
                       hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {showReasoning ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  <span>Hide</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  <span>Show</span>
                </>
              )}
            </button>
          </div>
          {showReasoning && (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
              <div className="prose dark:text-white max-w-none">
                {reasoning}
              </div>
            </div>
          )}
        </div>
      )}

      {answer && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <MessageSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Answer
            </h3>
          </div>
          <div className="prose dark:text-white max-w-none">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIResponse;