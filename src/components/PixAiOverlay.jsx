/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Webhook } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fetchTextResponse } from '../services/aiApi'

export default function PixAiOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! I am Pix AI. How can I help you navigate PixTool today? E.g. "Take me to the image cropper"' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const promptContext = `
Pix AI: Official PixTool guide.
ROLE: Assist navigation.
FORMAT: ALWAYS use markdown links "[Text](/path)" for tools. 
HUBS: /image-tools, /pdf-tools, /utility-tools, /ai-tools, /math-tools.
SPECIFIC: /image-tools/crop, /image-tools/resize, /pdf-tools/merge, /temp-mail, /math-tools/scientific-calculator.
POLICY: friendly, concise.
User: ${input}
`;

      const res = await fetchTextResponse(promptContext);
      setMessages([...newMessages, { role: 'assistant', text: res }]);
    } catch (error) {
      console.error('Pix AI Error:', error);
      setMessages([...newMessages, { role: 'assistant', text: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  }

  // Enhanced parser to render markdown links and raw paths as React Router Links
  const renderMessageContent = (text) => {
    // 1. Detect Markdown Links: [Text](/path)
    const markdownRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    // 2. Detect Raw Paths: /hub/tool (not followed by punctuation/space usually)
    const rawPathRegex = /(^|\s)(\/(?:image|pdf|utility|ai|math|temp-mail)[^\s.,!?;)]*)/g;
    
    let parts = [];
    let lastIndex = 0;
    
    // First pass: Markdown Links
    let match;
    const markdownMatches = [];
    while ((match = markdownRegex.exec(text)) !== null) {
      markdownMatches.push({
        start: match.index,
        end: markdownRegex.lastIndex,
        text: match[1],
        path: match[2],
        type: 'markdown'
      });
    }

    // Second pass: Raw Paths (only if not already inside a markdown match)
    let rawMatch;
    while ((rawMatch = rawPathRegex.exec(text)) !== null) {
      const start = rawMatch.index + rawMatch[1].length;
      const end = rawPathRegex.lastIndex;
      const path = rawMatch[2];
      
      const isOverlap = markdownMatches.some(m => (start >= m.start && start < m.end) || (end > m.start && end <= m.end));
      
      if (!isOverlap) {
        markdownMatches.push({
          start,
          end,
          text: path,
          path,
          type: 'raw'
        });
      }
    }

    // Sort all matches by start position
    markdownMatches.sort((a,b) => a.start - b.start);

    lastIndex = 0;
    markdownMatches.forEach((m, i) => {
      if (m.start > lastIndex) {
        parts.push(text.substring(lastIndex, m.start));
      }
      parts.push(
        <Link key={i} to={m.path} style={{ color: 'var(--accent-primary)', textDecoration: 'underline', fontWeight: 600 }} onClick={() => setIsOpen(false)}>
          {m.text}
        </Link>
      );
      lastIndex = m.end;
    });

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts.length > 0 ? parts : text;
  }

  return (
    <>
      {/* Floating Action Button */}
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999 }}>
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                bottom: '80px',
                right: '0',
                width: '350px',
                height: '500px',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              {/* Header */}
              <div style={{ padding: '1.25rem', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '36px', height: '36px', background: 'var(--accent-primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <Webhook size={20} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Pix AI</h3>
                    <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>• Online</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem' }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Chat Area */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--bg-primary)' }}>
                {messages.map((msg, idx) => (
                  <div key={idx} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                    <div style={{ 
                      background: msg.role === 'user' ? 'var(--accent-primary)' : 'var(--bg-secondary)', 
                      color: msg.role === 'user' ? '#fff' : 'var(--text-primary)',
                      padding: '0.75rem 1rem', 
                      borderRadius: '16px',
                      borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                      borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : '16px',
                      fontSize: '0.95rem',
                      lineHeight: 1.5,
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                      {renderMessageContent(msg.text)}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div style={{ alignSelf: 'flex-start' }}>
                    <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem 1rem', borderRadius: '16px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      Typing...
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  placeholder="Ask Pix AI..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                  disabled={loading}
                />
                <button 
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  style={{ background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: '12px', padding: '0 1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Send size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close Pix AI Chat" : "Open Pix AI Chat"}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '30px',
            background: 'var(--accent-primary)',
            color: '#fff',
            border: 'none',
            boxShadow: '0 10px 25px rgba(139, 92, 246, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10000
          }}
        >
          {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        </motion.button>
      </div>
    </>
  )
}
