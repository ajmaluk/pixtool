import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Mail, MessageSquare, MapPin, Send, Github, Linkedin, Twitter, FileText, Image, Star, Zap } from 'lucide-react';
import { submitContactMessage } from '../services/supabaseService';
import { hasSupabaseConfig } from '../lib/supabaseClient';

export default function Contact() {
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    try {
      await submitContactMessage(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      let msg = error?.message || 'Unable to submit now.';
      if (msg.includes('Load failed')) {
        msg = 'Connection failed. This usually means the site is misconfigured or your browser is blocking the request. Check your internet or contact the admin.';
      }
      setErrorMessage(msg);
      setStatus('error');
    }
  };

  const contactSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact PixTool Support',
      description: 'Get in touch with PixTool for support and partnerships.',
      url: `${SITE_URL}/contact`,
    },
  ];

  return (
    <div className="page-container">
      <SEO
        title="Contact Us - Support & Feedback | PixTool"
        description="Send your message directly to PixTool support. Messages are stored securely with Supabase for fast admin follow-up."
        path="/contact"
        schema={contactSchema}
      />

      <section className="page-hero">
        <div className="page-hero-content container-narrow">
          <div className="status-badge">GET IN TOUCH</div>
          <h1 className="page-title">Let's Connect</h1>
          <p className="page-subtitle">
            Have a question, feedback, or business proposal? We'd love to hear from you.
          </p>
          {!hasSupabaseConfig && (
            <p style={{ marginTop: '0.75rem', color: '#f59e0b', fontWeight: 600 }}>
              Contact storage is disabled until Supabase env variables are configured.
            </p>
          )}
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="contact-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="info-card" style={{ padding: '1.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', padding: '10px', borderRadius: '10px' }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>Email</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>contact@uthakkan.com</p>
                  </div>
                </div>
              </div>

              <div className="info-card" style={{ padding: '1.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '10px', borderRadius: '10px' }}>
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>Social</h2>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                      <a href="https://github.com/ajmal-uk" className="icon-btn" style={{ width: '32px', height: '32px' }}><Github size={16} /></a>
                      <a href="https://linkedin.com/in/ajmaluk" className="icon-btn" style={{ width: '32px', height: '32px' }}><Linkedin size={16} /></a>
                      <a href="https://x.com/ajmal_uk_" className="icon-btn" style={{ width: '32px', height: '32px' }}><Twitter size={16} /></a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-card" style={{ padding: '1.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '10px', borderRadius: '10px' }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>Location</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Kannur, Kerala, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="info-card" style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.2rem' }}>Send a Message</h2>
              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                <label className="input-group">
                  <span className="input-label">Your Name</span>
                  <input
                    type="text"
                    className="input"
                    placeholder="Ajmal"
                    required
                    minLength={2}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </label>

                <label className="input-group">
                  <span className="input-label">Email Address</span>
                  <input
                    type="email"
                    className="input"
                    placeholder="ajmal@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </label>

                <label className="input-group">
                  <span className="input-label">Message</span>
                  <textarea
                    className="input"
                    style={{ minHeight: '140px', resize: 'vertical', paddingTop: '0.8rem' }}
                    placeholder="How can we help you?"
                    required
                    minLength={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </label>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  disabled={status === 'loading' || !hasSupabaseConfig}
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'} <Send size={16} />
                </button>

                {status === 'success' && (
                  <p style={{ color: '#10b981', fontSize: '0.95rem', fontWeight: 700 }}>
                    Message sent. Our admin team can now review it in the dashboard.
                  </p>
                )}
                {status === 'error' && (
                  <p style={{ color: '#ef4444', fontSize: '0.95rem', fontWeight: 700 }}>
                    {errorMessage || 'Unable to send now. Please retry in a few seconds.'}
                  </p>
                )}
              </form>
            </div>
          </div>

          <div style={{ marginTop: '5rem', textAlign: 'center' }}>
            <div className="status-badge" style={{ margin: '0 auto 1rem' }}>RESOURCES</div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.04em' }}>Quick Navigation</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
              Explore our most popular sections and find the tools you need instantly.
            </p>
            
            <div className="page-grid">
              {[
                { to: '/pdf-tools', icon: <FileText size={24} />, label: 'PDF Tools', desc: 'Merge, Split, Compress & Convert', color: 'rgba(59, 130, 246, 0.1)', textColor: '#3b82f6' },
                { to: '/image-tools', icon: <Image size={24} />, label: 'Image Tools', desc: 'Resize, Crop & AI Optimization', color: 'rgba(168, 85, 247, 0.1)', textColor: '#a855f7' },
                { to: '/testimonials', icon: <Star size={24} />, label: 'Testimonials', desc: 'Read what our users are saying', color: 'rgba(245, 158, 11, 0.1)', textColor: '#f59e0b' },
                { to: '/temp-mail', icon: <Zap size={24} />, label: 'Temp Mail', desc: 'Secure disposable email inbox', color: 'rgba(16, 185, 129, 0.1)', textColor: '#10b981' },
              ].map((item, idx) => (
                <Link 
                  key={idx}
                  to={item.to} 
                  className="info-card" 
                  style={{ 
                    padding: '2rem', 
                    textDecoration: 'none', 
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <div style={{ 
                    background: item.color, 
                    color: item.textColor, 
                    width: '52px', 
                    height: '52px', 
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{item.label}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
