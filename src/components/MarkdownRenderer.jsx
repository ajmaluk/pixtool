import React from 'react';

/**
 * A lightweight, dependency-free Markdown renderer for AI tool outputs.
 * Supports: bold, italic, headers, unordered lists, and basic code blocks.
 */
export default function MarkdownRenderer({ content, className = '' }) {
  if (!content) return null;

  // Split content into paragraphs or lines to process
  const lines = content.split('\n');
  const renderedElements = [];
  let currentList = [];

  const flushList = () => {
    if (currentList.length > 0) {
      renderedElements.push(
        <ul key={`list-${renderedElements.length}`} style={{ margin: '1rem 0', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
          {currentList.map((item, i) => (
            <li key={i} style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
              {parseInlineMarkdown(item)}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    // 1. Headers (h1-h6)
    const headerMatch = trimmedLine.match(/^(#{1,6})\s+(.*)$/);
    if (headerMatch) {
      flushList();
      const level = headerMatch[1].length;
      const text = headerMatch[2];
      const Tag = `h${level}`;
      const styles = {
        h1: { fontSize: '1.75rem', margin: '1.5rem 0 1rem', fontWeight: 900 },
        h2: { fontSize: '1.5rem', margin: '1.4rem 0 0.9rem', fontWeight: 850 },
        h3: { fontSize: '1.25rem', margin: '1.3rem 0 0.8rem', fontWeight: 800 },
        h4: { fontSize: '1.1rem', margin: '1.2rem 0 0.7rem', fontWeight: 750 },
        h5: { fontSize: '1rem', margin: '1.1rem 0 0.6rem', fontWeight: 700 },
        h6: { fontSize: '0.9rem', margin: '1rem 0 0.5rem', fontWeight: 700 },
      };
      
      renderedElements.push(
        <Tag key={index} style={{ ...styles[Tag], color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
          {parseInlineMarkdown(text)}
        </Tag>
      );
      return;
    }

    // 2. Unordered Lists
    const listMatch = trimmedLine.match(/^[-*+]\s+(.*)$/);
    if (listMatch) {
      currentList.push(listMatch[1]);
      return;
    } else {
      flushList();
    }

    // 3. Horizontal Rule
    if (trimmedLine.match(/^---$/)) {
      renderedElements.push(<hr key={index} style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--border-color)' }} />);
      return;
    }

    // 4. Paragraphs (empty lines produce a break, non-empty are paragraphs)
    if (trimmedLine === '') {
      renderedElements.push(<div key={index} style={{ height: '0.75rem' }} />);
    } else {
      renderedElements.push(
        <p key={index} style={{ marginBottom: '1rem', color: 'var(--text-primary)', lineHeight: 1.7 }}>
          {parseInlineMarkdown(line)}
        </p>
      );
    }
  });

  // Final list flush
  flushList();

  return (
    <div className={`markdown-body ${className}`} style={{ width: '100%', textAlign: 'left' }}>
      {renderedElements}
    </div>
  );
}

/**
 * Handles bold, italic, and inline code.
 */
function parseInlineMarkdown(text) {
  if (typeof text !== 'string') return text;

  // Split and map for inline elements
  // This is a simple version using parts and replacements
  let parts = [text];

  // Bold (**text** or __text__)
  parts = flatten(parts.map(p => {
    if (typeof p !== 'string') return p;
    const segments = p.split(/(\*\*.*?\*\*|__.*?__)/g);
    return segments.map(seg => {
      const match = seg.match(/^(\*\*|__)(.*?)\1$/);
      return match ? <strong key={seg} style={{ fontWeight: 800, color: 'var(--accent-primary)' }}>{match[2]}</strong> : seg;
    });
  }));

  // Italic (*text* or _text_)
  parts = flatten(parts.map(p => {
    if (typeof p !== 'string') return p;
    const segments = p.split(/(\*.*?\*|_.*?_)/g);
    return segments.map(seg => {
      const match = seg.match(/^(\*|_)(.*?)\1$/);
      return match ? <em key={seg} style={{ fontStyle: 'italic', opacity: 0.9 }}>{match[2]}</em> : seg;
    });
  }));

  // Inline Code (`text`)
  parts = flatten(parts.map(p => {
    if (typeof p !== 'string') return p;
    const segments = p.split(/(`.*?`)/g);
    return segments.map(seg => {
      const match = seg.match(/^`(.*?)`$/);
      return match ? (
        <code key={seg} style={{ 
          background: 'var(--bg-secondary)', 
          padding: '0.2rem 0.4rem', 
          borderRadius: '6px', 
          fontFamily: 'monospace', 
          fontSize: '0.9em',
          color: 'var(--accent-purple)',
          border: '1px solid var(--border-color)'
        }}>
          {match[1]}
        </code>
      ) : seg;
    });
  }));

  return parts;
}

function flatten(arr) {
  return arr.reduce((acc, val) => acc.concat(val), []);
}
