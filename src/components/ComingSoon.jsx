import { } from 'framer-motion';
import { Rocket, Clock, Zap, Lock } from 'lucide-react';

const ComingSoon = ({ toolName, description }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(16px)',
        borderRadius: '32px',
        border: '1px solid var(--border-color)',
        maxWidth: '700px',
        margin: '2rem auto'
      }}
    >
      <div style={{ 
        width: '80px', 
        height: '80px', 
        background: 'rgba(99, 102, 241, 0.1)', 
        borderRadius: '24px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        margin: '0 auto 2rem',
        color: 'var(--accent-primary)'
      }}>
        <Rocket size={40} />
      </div>
      
      <div style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '0.5rem', 
        padding: '0.5rem 1rem', 
        background: 'var(--accent-glow)', 
        borderRadius: '100px',
        color: 'var(--accent-primary)',
        fontSize: '0.75rem',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '1.5rem'
      }}>
        <Clock size={14} /> Under Development
      </div>
      
      <h2 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
        {toolName} is <span style={{ color: 'var(--accent-primary)' }}>Launching Soon</span>
      </h2>
      
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
        We're building a high-performance, 100% browser-based {toolName.toLowerCase()} tool. {description || "Stay tuned for a premium, secure, and lightning-fast experience."}
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
        {[
          { icon: Zap, title: 'Edge Processing', desc: 'Runs 100% in your browser memory.' },
          { icon: Lock, title: 'Zero Storage', desc: 'Your files never touch our servers.' }
        ].map((feat, i) => (
          <div key={i} style={{ padding: '1.5rem', background: 'var(--bg-primary)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
            <div style={{ color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>
              <feat.icon size={24} />
            </div>
            <h4 style={{ fontWeight: 800, marginBottom: '0.25rem' }}>{feat.title}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>{feat.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ComingSoon;
