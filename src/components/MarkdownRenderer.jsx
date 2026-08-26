import React from 'react';
import { Link } from 'react-router-dom';

/**
 * High-performance, dependency-free Markdown renderer for AI tool outputs.
 * Supports: headers (h1-h6), bold, italic, links, ordered/unordered lists, code blocks, and horizontal rules.
 */
export default function MarkdownRenderer({ content, className = '' }) {
  if (!content) return null;

  const lines = content.split('\n');
  const renderedElements = [];
  let currentUnorderedList = [];
  let currentOrderedList = [];
  let inCodeBlock = false;
  let codeBlockLanguage = '';
  let codeBlockLines = [];

  const flushLists = () => {
    if (currentUnorderedList.length > 0) {
      renderedElements.push(
        <ul key={`ul-${renderedElements.length}`} style={{ margin: '1rem 0', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
          {currentUnorderedList.map((item, i) => (
            <li key={i} style={{ marginBottom: '0.4rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {parseInlineMarkdown(item)}
            </li>
          ))}
        </ul>
      );
      currentUnorderedList = [];
    }

    if (currentOrderedList.length > 0) {
      renderedElements.push(
        <ol key={`ol-${renderedElements.length}`} style={{ margin: '1rem 0', paddingLeft: '1.5rem', listStyleType: 'decimal' }}>
          {currentOrderedList.map((item, i) => (
            <li key={i} style={{ marginBottom: '0.4rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {parseInlineMarkdown(item)}
            </li>
          ))}
        </ol>
      );
      currentOrderedList = [];
    }
  };

  const flushCodeBlock = (idx) => {
    if (codeBlockLines.length > 0 || inCodeBlock) {
      const codeText = codeBlockLines.join('\n');
      renderedElements.push(
        <div key={`code-${idx}`} style={{ margin: '1.25rem 0', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
          {codeBlockLanguage && (
            <div style={{ padding: '0.4rem 0.8rem', background: 'var(--bg-secondary)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)', textTransform: 'uppercase' }}>
              {codeBlockLanguage}
            </div>
          )}
          <pre style={{ margin: 0, padding: '1rem', overflowX: 'auto', fontSize: '0.9rem', lineHeight: 1.5, fontFamily: 'monospace', color: 'var(--text-primary)' }}>
            <code>{codeText}</code>
          </pre>
        </div>
      );
      codeBlockLines = [];
      inCodeBlock = false;
      codeBlockLanguage = '';
    }
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    // Fenced Code Block Detection (```)
    if (trimmedLine.startsWith('```')) {
      flushLists();
      if (inCodeBlock) {
        flushCodeBlock(index);
      } else {
        inCodeBlock = true;
        codeBlockLanguage = trimmedLine.slice(3).trim();
        codeBlockLines = [];
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      return;
    }

    // 1. Headers (h1-h6)
    const headerMatch = trimmedLine.match(/^(#{1,6})\s+(.*)$/);
    if (headerMatch) {
      flushLists();
      const level = headerMatch[1].length;
      const text = headerMatch[2];
      const Tag = `h${level}`;
      const styles = {
        h1: { fontSize: '1.6rem', margin: '1.5rem 0 0.8rem', fontWeight: 900 },
        h2: { fontSize: '1.35rem', margin: '1.3rem 0 0.7rem', fontWeight: 850 },
        h3: { fontSize: '1.15rem', margin: '1.1rem 0 0.6rem', fontWeight: 800 },
        h4: { fontSize: '1.05rem', margin: '1rem 0 0.5rem', fontWeight: 750 },
        h5: { fontSize: '0.95rem', margin: '0.9rem 0 0.4rem', fontWeight: 700 },
        h6: { fontSize: '0.88rem', margin: '0.8rem 0 0.4rem', fontWeight: 700 },
      };

      renderedElements.push(
        <Tag key={index} style={{ ...styles[Tag], color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
          {parseInlineMarkdown(text)}
        </Tag>
      );
      return;
    }

    // 2. Unordered Lists (- or * or +)
    const uListMatch = trimmedLine.match(/^[-*+]\s+(.*)$/);
    if (uListMatch) {
      if (currentOrderedList.length > 0) flushLists();
      currentUnorderedList.push(uListMatch[1]);
      return;
    }

    // 3. Ordered Lists (1. 2. etc)
    const oListMatch = trimmedLine.match(/^(\d+)\.\s+(.*)$/);
    if (oListMatch) {
      if (currentUnorderedList.length > 0) flushLists();
      currentOrderedList.push(oListMatch[2]);
      return;
    }

    // Non-list line
    flushLists();

    // 4. Horizontal Rule (--- or ***)
    if (trimmedLine.match(/^([-*_]){3,}$/)) {
      renderedElements.push(<hr key={index} style={{ margin: '1.5rem 0', border: 'none', borderTop: '1px solid var(--border-color)' }} />);
      return;
    }

    // 5. Paragraphs
    if (trimmedLine === '') {
      renderedElements.push(<div key={index} style={{ height: '0.5rem' }} />);
    } else {
      renderedElements.push(
        <p key={index} style={{ marginBottom: '0.75rem', color: 'var(--text-primary)', lineHeight: 1.7 }}>
          {parseInlineMarkdown(line)}
        </p>
      );
    }
  });

  // Final flushes
  flushLists();
  flushCodeBlock(lines.length);

  return (
    <div className={`markdown-body ${className}`} style={{ width: '100%', textAlign: 'left' }}>
      {renderedElements}
    </div>
  );
}

/**
 * Handles bold, italic, links, and inline code.
 */
function parseInlineMarkdown(text) {
  if (typeof text !== 'string') return text;

  let parts = [text];

  // 1. Markdown Links [Text](url)
  parts = flatten(parts.map(p => {
    if (typeof p !== 'string') return p;
    const segments = p.split(/(\[[^\]]+\]\([^)]+\))/g);
    return segments.map((seg, idx) => {
      const match = seg.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (match) {
        const linkText = match[1];
        const linkUrl = match[2];
        const isInternal = linkUrl.startsWith('/') || linkUrl.includes('pixtool.in');
        if (isInternal && linkUrl.startsWith('/')) {
          return (
            <Link key={`link-${idx}-${linkUrl}`} to={linkUrl} style={{ color: 'var(--accent-primary)', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              {linkText}
            </Link>
          );
        }
        return (
          <a key={`link-${idx}-${linkUrl}`} href={linkUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            {linkText}
          </a>
        );
      }
      return seg;
    });
  }));

  // 2. Bold (**text** or __text__)
  parts = flatten(parts.map(p => {
    if (typeof p !== 'string') return p;
    const segments = p.split(/(\*\*.*?\*\*|__.*?__)/g);
    return segments.map(seg => {
      const match = seg.match(/^(\*\*|__)(.*?)\1$/);
      return match ? <strong key={seg} style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{match[2]}</strong> : seg;
    });
  }));

  // 3. Italic (*text* or _text_)
  parts = flatten(parts.map(p => {
    if (typeof p !== 'string') return p;
    const segments = p.split(/(\*.*?\*|_.*?_)/g);
    return segments.map(seg => {
      const match = seg.match(/^(\*|_)(.*?)\1$/);
      return match ? <em key={seg} style={{ fontStyle: 'italic', opacity: 0.9 }}>{match[2]}</em> : seg;
    });
  }));

  // 4. Inline Code (`text`)
  parts = flatten(parts.map(p => {
    if (typeof p !== 'string') return p;
    const segments = p.split(/(`.*?`)/g);
    return segments.map(seg => {
      const match = seg.match(/^`(.*?)`$/);
      return match ? (
        <code key={seg} style={{ 
          background: 'var(--bg-secondary)', 
          padding: '0.15rem 0.4rem', 
          borderRadius: '6px', 
          fontFamily: 'monospace', 
          fontSize: '0.9em',
          color: 'var(--accent-primary)',
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
