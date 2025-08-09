'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockProps {
  children: string;
  language?: string;
}

export function CodeBlock({ children, language = 'bash' }: CodeBlockProps) {
  return (
    <div className="my-8">
      <SyntaxHighlighter
        language={language}
        style={oneLight}
        customStyle={{
          borderRadius: '8px',
          padding: '1.5rem',
          fontSize: '14px',
          lineHeight: '1.5',
          border: '1px solid #e5e7eb',
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}