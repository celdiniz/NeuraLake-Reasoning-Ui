import React, { useState, useEffect } from 'react';
import { Brain, MessageSquare, Eye, EyeOff } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

interface AIResponseProps {
  response: string;
}

interface ParsedResponse {
  reasoning: string;
  answer: string;
}

const AIResponse: React.FC<AIResponseProps> = ({ response }) => {
  const [showReasoning, setShowReasoning] = useState(true);
  const [parsedResponse, setParsedResponse] = useState<ParsedResponse>({
    reasoning: '',
    answer: ''
  });

  useEffect(() => {
    const parseResponse = (text: string) => {
      const reasoningRegex = /<Reasoning>([\s\S]*?)<\/Reasoning>/;
      const reasoningMatch = text.match(reasoningRegex);
      
      // Convert any potential objects to strings
      const reasoning = reasoningMatch 
        ? reasoningMatch[1].toString().trim()
        : '';
      
      // Get everything after the </Reasoning> tag as the answer
      const answer = text
        .replace(/<Reasoning>[\s\S]*?<\/Reasoning>/, '')
        .toString()
        .trim();

      return {
        reasoning,
        answer
      };
    };

    setParsedResponse(parseResponse(response.toString()));
  }, [response]);

  const renderSection = (content: string, title: string, icon: React.ReactNode) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-2 p-4 border-b border-gray-200 dark:border-gray-700">
        {icon}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <div className="p-4">
        <MarkdownRenderer content={content.toString()} />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {parsedResponse.reasoning && (
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
              className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {showReasoning ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  <span>Hide</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  <span>Show</span>
                </>
              )}
            </button>
          </div>
          {showReasoning && renderSection(
            parsedResponse.reasoning,
            "Reasoning",
            <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          )}
        </div>
      )}

      {parsedResponse.answer && renderSection(
        parsedResponse.answer,
        "Final Answer",
        <MessageSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
      )}
    </div>
  );
};

export default AIResponse;