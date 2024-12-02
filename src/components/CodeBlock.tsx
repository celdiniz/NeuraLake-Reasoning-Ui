import React from 'react';

interface CodeBlockProps {
  language: string;
  value: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span className="code-language">{language}</span>
      </div>
      <pre className={`language-${language}`}>
        <code>{value}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;