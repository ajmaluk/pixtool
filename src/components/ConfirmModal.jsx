 
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

export default function ConfirmModal({ 
  isOpen, 
  title, 
  message, 
  confirmText = 'Confirm', 
  cancelText = 'Cancel', 
  onConfirm, 
  onCancel,
  type = 'danger' // 'danger', 'info', 'warning'
}) {
  const getIcon = () => {
    switch (type) {
      case 'danger': return <div style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: '16px' }}><AlertCircle size={28} /></div>;
      case 'warning': return <div style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)', padding: '12px', borderRadius: '16px' }}><AlertCircle size={28} /></div>;
      default: return <div style={{ color: 'var(--accent-primary)', background: 'var(--accent-glow)', padding: '12px', borderRadius: '16px' }}><AlertCircle size={28} /></div>;
    }
  };

  const getConfirmBtnStyle = () => {
    switch (type) {
      case 'danger': return { background: '#ef4444', color: 'white' };
      case 'warning': return { background: '#f59e0b', color: 'white' };
      default: return { background: 'var(--accent-primary)', color: 'white' };
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onCancel]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
          }}
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              background: 'var(--bg-primary)',
              width: '100%',
              maxWidth: '440px',
              borderRadius: '24px',
              padding: '2rem',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: '1px solid var(--border-color)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onCancel}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'var(--bg-secondary)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                transition: 'all 0.2s ease',
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
              {getIcon()}
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-0.02em', marginTop: '4px' }}>
                  {title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                  {message}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              {cancelText && (
                <button
                  onClick={onCancel}
                  style={{
                    padding: '0.75rem 1.25rem',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cancelText}
                </button>
              )}
              <button
                onClick={onConfirm}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '12px',
                  border: 'none',
                  fontWeight: 900,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  ...getConfirmBtnStyle(),
                  boxShadow: type === 'danger' ? '0 10px 20px rgba(239, 68, 68, 0.2)' : '0 10px 20px var(--accent-glow)',
                  transition: 'all 0.2s ease',
                }}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
