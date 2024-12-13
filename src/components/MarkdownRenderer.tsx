import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypePrism from 'rehype-prism-plus';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const processContent = (rawContent: string) => {
    // Store code blocks temporarily
    const codeBlocks: string[] = [];
    
    // Replace code blocks with placeholders
    let processedContent = rawContent.replace(/```([\s\S]*?)```/g, (match) => {
      codeBlocks.push(match);
      return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
    });

    // Escape HTML tags
    processedContent = processedContent
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Restore code blocks
    processedContent = processedContent.replace(/__CODE_BLOCK_(\d+)__/g, (_, index) => {
      return codeBlocks[parseInt(index)];
    });

    return processedContent;
  };

  const renderCode = ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    const value = Array.isArray(children) 
      ? children.map(child => child?.toString() || '').join('')
      : children?.toString() || '';

    if (!inline && match) {
      return (
        <div className="code-block-wrapper">
          <div className="code-block-header">
            <span className="code-language">{match[1]}</span>
          </div>
          <pre className={className}>
            <code {...props}>{value.trim()}</code>
          </pre>
        </div>
      );
    }

    return (
      <code className={inline ? 'inline-code' : ''} {...props}>
        {value.trim()}
      </code>
    );
  };

  return (
    <ReactMarkdown
      className="markdown-content"
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex, [rehypePrism, { showLineNumbers: true }]]}
      components={{
        code: renderCode,
        pre: ({ children }) => <>{children}</>,
      }}
    >
      {processContent(content)}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;