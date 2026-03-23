import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import {
  adminApi,
  adminLogin,
  adminLogout,
  getAdminSession,
} from '../services/supabaseService';
import { hasSupabaseConfig } from '../lib/supabaseClient';

const PAGE_SIZE = 10;

const cardStyle = {
  background: 'var(--bg-secondary)',
  border: '1px solid var(--border-color)',
  borderRadius: '20px',
  padding: '1.5rem',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
};

const adminContainerStyle = {
  minHeight: '100vh',
  background: '#0f172a', // Deeper navy for a more professional admin feel
  color: '#f8fafc',
  display: 'flex',
  flexDirection: 'column',
};

export default function PixAdmin() {
  const [session, setSession] = useState(() => getAdminSession());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [dashboard, setDashboard] = useState({
    toolsCount: 0,
    ratingsCount: 0,
    testimonialsCount: 0,
    contactsCount: 0,
  });

  const [testimonialsPage, setTestimonialsPage] = useState(1);
  const [contactsPage, setContactsPage] = useState(1);
  const [testimonials, setTestimonials] = useState({ rows: [], meta: { page: 1, pageSize: PAGE_SIZE, count: 0, totalPages: 1, hasPrev: false, hasNext: false } });
  const [contacts, setContacts] = useState({ rows: [], meta: { page: 1, pageSize: PAGE_SIZE, count: 0, totalPages: 1, hasPrev: false, hasNext: false } });
  const [ratingsRows, setRatingsRows] = useState([]);
  const [allTools, setAllTools] = useState([]);

  const testimonialsPages = useMemo(() => testimonials.meta?.totalPages || 1, [testimonials.meta]);
  const contactsPages = useMemo(() => contacts.meta?.totalPages || 1, [contacts.meta]);

  const refreshDashboard = async () => {
    const data = await adminApi('dashboard');
    setDashboard(data);
    
    const toolsData = await adminApi('list_tools');
    setAllTools(toolsData.rows || []);
  };

  const refreshTestimonials = async (page = testimonialsPage) => {
    const data = await adminApi('list_testimonials', { page, pageSize: PAGE_SIZE });
    setTestimonials(data);
  };

  const refreshContacts = async (page = contactsPage) => {
    const data = await adminApi('list_contacts', { page, pageSize: PAGE_SIZE });
    setContacts(data);
  };

  const refreshRatings = async () => {
    const data = await adminApi('ratings_overview');
    setRatingsRows(data.rows || []);
  };

  const onAddTool = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get('name') || '');
    const slug = String(form.get('slug') || '');

    setLoading(true);
    setError('');
    try {
      await adminApi('add_tool', { name, slug });
      e.target.reset();
      await refreshDashboard();
    } catch (err) {
      setError(err.message || 'Failed to add tool.');
    } finally {
      setLoading(false);
    }
  };

  const onDeleteTool = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tool? This will also delete all its ratings and testimonials.')) return;
    setLoading(true);
    setError('');
    try {
      await adminApi('delete_tool', { id });
      await refreshDashboard();
    } catch (err) {
      setError(err.message || 'Failed to delete tool.');
    } finally {
      setLoading(false);
    }
  };

  const bootstrap = async () => {
    await Promise.all([
      refreshDashboard(),
      refreshTestimonials(1),
      refreshContacts(1),
      refreshRatings(),
    ]);
  };

  useEffect(() => {
    if (!session) return;
    let mounted = true;
    setLoading(true);
    setError('');

    bootstrap()
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || 'Failed to load admin data.');
        if (/expired|login/i.test(err.message || '')) {
          adminLogout();
          setSession(null);
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const onLogin = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const username = String(form.get('username') || '');
    const password = String(form.get('password') || '');

    setLoading(true);
    setError('');
    try {
      const nextSession = await adminLogin({ username, password });
      setSession(nextSession);
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const onApprove = async (id, approved) => {
    setLoading(true);
    setError('');
    try {
      await adminApi('approve_testimonial', { id, approved });
      await Promise.all([refreshTestimonials(), refreshDashboard()]);
    } catch (err) {
      setError(err.message || 'Unable to update testimonial.');
    } finally {
      setLoading(false);
    }
  };

  const onDeleteTestimonial = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    setLoading(true);
    setError('');
    try {
      await adminApi('delete_testimonial', { id });
      await Promise.all([refreshTestimonials(), refreshDashboard()]);
    } catch (err) {
      setError(err.message || 'Unable to delete testimonial.');
    } finally {
      setLoading(false);
    }
  };

  const onDeleteContact = async (id) => {
    if (!window.confirm('Delete this contact message?')) return;
    setLoading(true);
    setError('');
    try {
      await adminApi('delete_contact', { id });
      await Promise.all([refreshContacts(), refreshDashboard()]);
    } catch (err) {
      setError(err.message || 'Unable to delete contact message.');
    } finally {
      setLoading(false);
    }
  };

  const onStatusChange = async (id, status) => {
    setLoading(true);
    setError('');
    try {
      await adminApi('update_contact_status', { id, status });
      await refreshContacts();
    } catch (err) {
      setError(err.message || 'Unable to update contact status.');
    } finally {
      setLoading(false);
    }
  };

  if (!hasSupabaseConfig) {
    return (
      <div className="page-container" style={{ maxWidth: '860px', padding: '4rem 2rem', background: '#0f172a', minHeight: '100vh', color: '#fff' }}>
        <SEO title="Pix Admin" description="PixTool Admin Panel" path="/pix-admin" noIndex />
        <h1 style={{ marginBottom: '1.5rem', fontWeight: 900 }}>Pix Admin</h1>
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '1.5rem', borderRadius: '16px', marginBottom: '1.5rem' }}>
          <p style={{ color: '#f87171', fontWeight: 700, marginBottom: '0.5rem' }}>Supabase Configuration Missing</p>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
            The environment variables <code style={{ color: '#fff' }}>VITE_SUPABASE_URL</code> and <code style={{ color: '#fff' }}>VITE_SUPABASE_ANON_KEY</code> were not available during the build process.
          </p>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginTop: '0.75rem' }}>
            <strong>Note for Cloudflare Pages:</strong> Ensure these are set as <strong>Variables</strong> (Plaintext), not <strong>Secrets</strong>, as Secrets are not available during the Vite build step.
          </p>
        </div>
        <Link to="/" className="btn btn-secondary" style={{ display: 'inline-block' }}>Back to Home</Link>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="page-container" style={{ maxWidth: '100%', padding: 0, background: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <SEO title="Pix Admin Login" description="PixTool Admin Panel" path="/pix-admin" noIndex />
        <div style={{ maxWidth: '440px', width: '90%', padding: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.05em', color: '#fff' }}>Pix Admin</h1>
            <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Secure management portal</p>
          </div>
          <form onSubmit={onLogin} style={{ display: 'grid', gap: '1.5rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
            <label>
              <div style={{ marginBottom: '0.6rem', fontWeight: 600, fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Username</div>
              <input name="username" className="input" style={{ background: '#0f172a', border: '1px solid #334155', color: '#fff', height: '48px' }} autoComplete="username" required autoFocus />
            </label>
            <label>
              <div style={{ marginBottom: '0.6rem', fontWeight: 600, fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</div>
              <input name="password" type="password" className="input" style={{ background: '#0f172a', border: '1px solid #334155', color: '#fff', height: '48px' }} autoComplete="current-password" required />
            </label>
            <button className="btn btn-primary" type="submit" disabled={loading} style={{ height: '52px', fontSize: '1.1rem', fontWeight: 700, borderRadius: '14px', background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', border: 'none' }}>
              {loading ? 'Authenticating...' : 'Login to Dashboard'}
            </button>
            {error ? <div style={{ color: '#f87171', fontSize: '0.9rem', textAlign: 'center', padding: '0.75rem', background: 'rgba(248, 113, 113, 0.1)', borderRadius: '10px' }}>{error}</div> : null}
            <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
               <Link to="/" style={{ color: '#64748b', fontSize: '0.85rem', textDecoration: 'none' }}>← Back to PixTool.in</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={adminContainerStyle}>
      <SEO title="Pix Admin" description="PixTool Admin Panel" path="/pix-admin" noIndex />
      
      {/* Admin Navbar */}
      <nav style={{ 
        padding: '1rem 1.5rem', 
        borderBottom: '1px solid #334155', 
        background: '#1e293b',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#fff', fontWeight: 900, fontSize: '1.25rem', letterSpacing: '-0.04em' }}>
            Pix Admin
          </Link>
          
          {/* Desktop Tabs */}
          <div className="admin-tabs-desktop" style={{ display: 'flex', gap: '0.4rem' }}>
            {['dashboard', 'testimonials', 'contacts', 'ratings'].map((name) => (
              <button
                key={name}
                className={`btn ${tab === name ? 'btn-primary' : 'btn-secondary'}`}
                style={{ 
                  padding: '0.5rem 1rem', 
                  borderRadius: '10px', 
                  fontSize: '0.8rem', 
                  textTransform: 'capitalize',
                  background: tab === name ? '#6366f1' : 'transparent',
                  border: tab === name ? 'none' : '1px solid transparent',
                  color: tab === name ? '#fff' : '#94a3b8'
                }}
                onClick={() => setTab(name)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link to="/" className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.5rem 0.8rem', color: '#94a3b8', border: '1px solid #334155' }}>Site</Link>
          <button
            className="btn btn-secondary"
            style={{ fontSize: '0.75rem', padding: '0.5rem 0.8rem', background: '#ef4444', color: '#fff', border: 'none' }}
            onClick={() => {
              adminLogout();
              setSession(null);
            }}
          >
            Logout
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="admin-mobile-toggle"
            style={{ display: 'none', background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)', zIndex: 99, padding: '2rem',
          display: 'flex', flexDirection: 'column', gap: '1rem',
          justifyContent: 'center', alignItems: 'center',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <button 
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#fff', fontSize: '2rem' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            ✕
          </button>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '300px' }}>
            {['dashboard', 'testimonials', 'contacts', 'ratings'].map((name) => (
              <button
                key={name}
                style={{ 
                  padding: '1.5rem', borderRadius: '20px', fontSize: '1.25rem', 
                  fontWeight: 800, textAlign: 'center', 
                  background: tab === name ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' : '#1e293b',
                  border: 'none',
                  color: '#fff',
                  textTransform: 'capitalize',
                  boxShadow: tab === name ? '0 10px 20px -5px rgba(99, 102, 241, 0.4)' : 'none'
                }}
                onClick={() => { setTab(name); setMobileMenuOpen(false); }}
              >
                {name}
              </button>
            ))}
            <div style={{ height: '1px', background: '#334155', margin: '1rem 0' }} />
            <Link 
              to="/" 
              style={{ textAlign: 'center', color: '#94a3b8', textDecoration: 'none', fontWeight: 600 }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Back to Site
            </Link>
          </div>
        </div>
      )}

      <div className="page-container" style={{ maxWidth: '1400px', width: '100%', padding: '2rem 1.5rem', flex: 1, margin: '0 auto' }}>
        {loading && (
          <div style={{ position: 'fixed', top: '64px', left: 0, right: 0, height: '3px', background: 'rgba(99, 102, 241, 0.2)', zIndex: 101 }}>
            <div style={{ height: '100%', background: '#6366f1', width: '30%', animation: 'loading-bar 1.5s infinite ease-in-out' }} />
          </div>
        )}

        {error ? (
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            color: '#f87171', 
            padding: '1rem 1.5rem', 
            borderRadius: '16px', 
            marginBottom: '2rem',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>{error}</span>
            <button onClick={() => setError('')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>✕</button>
          </div>
        ) : null}

        {tab === 'dashboard' && (
          <div style={{ display: 'grid', gap: '2.5rem' }}>
            {/* Stats Cards */}
            <div className="admin-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              {[
                ['Total Tools', dashboard.toolsCount, '#3b82f6', '🛠️'],
                ['Total Ratings', dashboard.ratingsCount, '#10b981', '⭐'],
                ['Testimonials', dashboard.testimonialsCount, '#f59e0b', '💬'],
                ['Contacts', dashboard.contactsCount, '#ef4444', '📩'],
              ].map(([label, value, color, icon]) => (
                <div key={label} className="admin-stat-card" style={{ 
                  ...cardStyle, 
                  background: '#1e293b', 
                  border: '1px solid #334155', 
                  borderTop: `4px solid ${color}`, 
                  position: 'relative', 
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  minHeight: '160px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800 }}>{label}</div>
                    <div style={{ background: `${color}20`, color: color, padding: '8px', borderRadius: '12px', fontSize: '1.25rem' }}>{icon}</div>
                  </div>
                  <div style={{ fontSize: '3rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{value}</div>
                  <div style={{ position: 'absolute', right: '-10px', bottom: '-10px', fontSize: '5rem', opacity: 0.05, pointerEvents: 'none' }}>{icon}</div>
                </div>
              ))}
            </div>

            <div className="admin-dashboard-main" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
              {/* Add Tool Form */}
              <div style={{ ...cardStyle, background: '#1e293b', border: '1px solid #334155', padding: '2.5rem' }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff' }}>
                  <span style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '12px', borderRadius: '14px' }}>➕</span> Register New Tool
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>Define a new tool path to enable analytics and user feedback tracking.</p>
                <form onSubmit={onAddTool} style={{ display: 'grid', gap: '2rem' }}>
                  <label>
                    <div style={{ marginBottom: '0.75rem', fontSize: '0.85rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tool Name</div>
                    <input name="name" className="input" style={{ background: '#0f172a', border: '1px solid #334155', color: '#fff', height: '56px', borderRadius: '14px', padding: '0 1.25rem', fontSize: '1rem' }} placeholder="e.g. Photo Editor Pro" required />
                  </label>
                  <label>
                    <div style={{ marginBottom: '0.75rem', fontSize: '0.85rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Slug Path</div>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#475569', fontWeight: 700, fontSize: '1.1rem' }}>/</span>
                      <input name="slug" className="input" style={{ background: '#0f172a', border: '1px solid #334155', color: '#fff', height: '56px', paddingLeft: '2.25rem', borderRadius: '14px', fontSize: '1rem' }} placeholder="image-tools/editor" required />
                    </div>
                  </label>
                  <button className="btn btn-primary" type="submit" disabled={loading} style={{ height: '60px', fontSize: '1.1rem', fontWeight: 900, borderRadius: '16px', background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', border: 'none', boxShadow: '0 10px 20px -5px rgba(99, 102, 241, 0.4)', cursor: 'pointer', transition: 'transform 0.2s' }}>
                    {loading ? 'Processing...' : 'Create Tool Record'}
                  </button>
                </form>
              </div>

              {/* Existing Tools List */}
              <div style={{ ...cardStyle, background: '#1e293b', border: '1px solid #334155', padding: '2rem', maxHeight: '700px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff' }}>
                    <span style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '12px', borderRadius: '14px' }}>�</span> Inventory
                  </h2>
                  <button onClick={refreshDashboard} style={{ background: 'rgba(99, 102, 241, 0.1)', border: 'none', color: '#6366f1', padding: '8px 16px', borderRadius: '10px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 800 }}>Refresh</button>
                </div>
                <div className="custom-scrollbar" style={{ overflowY: 'auto', flex: 1, paddingRight: '0.5rem' }}>
                  {allTools.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
                       <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.1 }}>📂</div>
                       <p style={{ color: '#64748b', fontSize: '0.95rem', fontWeight: 600 }}>No tools found.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                      {allTools.map((tool) => (
                        <div key={tool.id} className="admin-tool-item" style={{ 
                          padding: '1.25rem', 
                          background: '#0f172a', 
                          borderRadius: '20px', 
                          border: '1px solid #334155',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'all 0.2s'
                        }}>
                          <div style={{ overflow: 'hidden', paddingRight: '1rem' }}>
                            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tool.name}</div>
                            <div style={{ color: '#6366f1', fontSize: '0.8rem', fontWeight: 700, marginTop: '0.25rem' }}>/{tool.slug}</div>
                          </div>
                          <button 
                            className="btn-delete-tool" 
                            style={{ 
                              background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: 'none', 
                              padding: '10px 18px', borderRadius: '12px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 800,
                              flexShrink: 0
                            }}
                            onClick={() => onDeleteTool(tool.id)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'testimonials' && (
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontWeight: 900, color: '#fff' }}>User Testimonials</h2>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.4rem' }}>Manage and approve user feedback for display on tool pages.</p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', background: '#1e293b', padding: '0.5rem', borderRadius: '14px', border: '1px solid #334155' }}>
                <button className="btn btn-sm" style={{ background: 'transparent', border: 'none', color: testimonials.meta?.hasPrev ? '#fff' : '#475569', cursor: testimonials.meta?.hasPrev ? 'pointer' : 'default', padding: '0.5rem 0.75rem' }} disabled={!testimonials.meta?.hasPrev || loading} onClick={() => { const next = testimonialsPage - 1; setTestimonialsPage(next); refreshTestimonials(next); }}>←</button>
                <span style={{ alignSelf: 'center', fontSize: '0.9rem', fontWeight: 800, color: '#fff', minWidth: '100px', textAlign: 'center' }}>Page {testimonialsPage} / {testimonialsPages}</span>
                <button className="btn btn-sm" style={{ background: 'transparent', border: 'none', color: testimonials.meta?.hasNext ? '#fff' : '#475569', cursor: testimonials.meta?.hasNext ? 'pointer' : 'default', padding: '0.5rem 0.75rem' }} disabled={!testimonials.meta?.hasNext || loading} onClick={() => { const next = testimonialsPage + 1; setTestimonialsPage(next); refreshTestimonials(next); }}>→</button>
              </div>
            </div>
            
            {testimonials.rows.length === 0 ? (
              <div style={{ ...cardStyle, background: '#1e293b', border: '#334155', padding: '5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem', opacity: 0.2 }}>💬</div>
                <h3 style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '1.5rem', fontWeight: 800 }}>No Testimonials Found</h3>
                <p style={{ color: '#94a3b8' }}>User reviews submitted on tool pages will appear here for your review.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {testimonials.rows.map((row) => (
                  <div key={row.id} style={{ 
                    ...cardStyle, 
                    background: '#1e293b', 
                    border: '1px solid #334155', 
                    borderLeft: `6px solid ${row.approved ? '#10b981' : '#f59e0b'}`, 
                    padding: '2rem',
                    position: 'relative'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1, minWidth: '280px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                          <strong style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 900 }}>{row.name}</strong>
                          <span style={{ 
                            background: row.approved ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', 
                            color: row.approved ? '#10b981' : '#f59e0b', 
                            fontSize: '0.7rem', 
                            fontWeight: 900, 
                            padding: '4px 12px', 
                            borderRadius: '20px', 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.05em',
                            border: `1px solid ${row.approved ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)'}`
                          }}>
                            {row.approved ? 'Published' : 'Under Review'}
                          </span>
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.6rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <span style={{ color: '#6366f1', background: 'rgba(99, 102, 241, 0.1)', padding: '2px 8px', borderRadius: '6px' }}>#{row.tools?.name || 'General'}</span>
                          <span style={{ opacity: 0.3 }}>•</span>
                          <span>{new Date(row.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        {!row.approved ? (
                          <button className="btn btn-sm" style={{ background: '#10b981', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '12px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px -2px rgba(16, 185, 129, 0.3)' }} onClick={() => onApprove(row.id, true)}>Approve</button>
                        ) : (
                          <button className="btn btn-sm" style={{ background: '#334155', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '12px', fontWeight: 800, cursor: 'pointer' }} onClick={() => onApprove(row.id, false)}>Unpublish</button>
                        )}
                        <button className="btn btn-sm" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '12px', fontWeight: 800, cursor: 'pointer' }} onClick={() => onDeleteTestimonial(row.id)}>Delete</button>
                      </div>
                    </div>
                    <div style={{ 
                      marginTop: '1.75rem', 
                      padding: '1.75rem', 
                      background: '#0f172a', 
                      borderRadius: '20px', 
                      border: '1px solid #334155', 
                      color: '#e2e8f0', 
                      lineHeight: 1.8, 
                      fontSize: '1.05rem', 
                      fontStyle: 'italic', 
                      position: 'relative',
                      boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)'
                    }}>
                      <span style={{ position: 'absolute', top: '-12px', left: '24px', background: '#1e293b', padding: '0 12px', fontSize: '2rem', color: '#475569', lineHeight: 1, borderRadius: '8px' }}>“</span>
                      {row.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'contacts' && (
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontWeight: 900, color: '#fff' }}>Inbox & Support</h2>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.4rem' }}>Direct messages and inquiries from users.</p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', background: '#1e293b', padding: '0.5rem', borderRadius: '14px', border: '1px solid #334155' }}>
                <button className="btn btn-sm" style={{ background: 'transparent', border: 'none', color: contacts.meta?.hasPrev ? '#fff' : '#475569', cursor: contacts.meta?.hasPrev ? 'pointer' : 'default', padding: '0.5rem 0.75rem' }} disabled={!contacts.meta?.hasPrev || loading} onClick={() => { const next = contactsPage - 1; setContactsPage(next); refreshContacts(next); }}>←</button>
                <span style={{ alignSelf: 'center', fontSize: '0.9rem', fontWeight: 800, color: '#fff', minWidth: '100px', textAlign: 'center' }}>Page {contactsPage} / {contactsPages}</span>
                <button className="btn btn-sm" style={{ background: 'transparent', border: 'none', color: contacts.meta?.hasNext ? '#fff' : '#475569', cursor: contacts.meta?.hasNext ? 'pointer' : 'default', padding: '0.5rem 0.75rem' }} disabled={!contacts.meta?.hasNext || loading} onClick={() => { const next = contactsPage + 1; setContactsPage(next); refreshContacts(next); }}>→</button>
              </div>
            </div>

            {contacts.rows.length === 0 ? (
              <div style={{ ...cardStyle, background: '#1e293b', border: '#334155', padding: '5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem', opacity: 0.15 }}>📩</div>
                <h3 style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '1.5rem', fontWeight: 800 }}>No Messages</h3>
                <p style={{ color: '#94a3b8' }}>All quiet in the inbox! New inquiries will show up here.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {contacts.rows.map((row) => (
                  <div key={row.id} style={{ 
                    ...cardStyle, 
                    background: '#1e293b', 
                    border: '1px solid #334155', 
                    borderLeft: `6px solid ${row.status === 'new' ? '#3b82f6' : (row.status === 'read' ? '#94a3b8' : '#10b981')}`, 
                    padding: '2rem' 
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1, minWidth: '280px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                          <strong style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 900 }}>{row.name}</strong>
                          <span style={{ 
                            background: row.status === 'new' ? 'rgba(59, 130, 246, 0.1)' : (row.status === 'read' ? 'rgba(148, 163, 184, 0.1)' : 'rgba(16, 185, 129, 0.1)'), 
                            color: row.status === 'new' ? '#3b82f6' : (row.status === 'read' ? '#94a3b8' : '#10b981'), 
                            fontSize: '0.7rem', 
                            fontWeight: 900, 
                            padding: '4px 12px', 
                            borderRadius: '20px', 
                            textTransform: 'uppercase',
                            border: `1px solid ${row.status === 'new' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(148, 163, 184, 0.2)'}`
                          }}>
                            {row.status === 'new' ? 'New Message' : row.status}
                          </span>
                        </div>
                        <div style={{ color: '#6366f1', fontSize: '0.95rem', fontWeight: 800, marginTop: '0.5rem' }}>{row.email}</div>
                        <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.6rem', fontWeight: 600 }}>
                          {new Date(row.created_at).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <select
                          className="select"
                          style={{ background: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '12px', padding: '0.75rem 1.25rem', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', outline: 'none' }}
                          value={row.status}
                          onChange={(e) => onStatusChange(row.id, e.target.value)}
                        >
                          <option value="new">Mark Unread</option>
                          <option value="read">Mark Read</option>
                          <option value="replied">Replied</option>
                        </select>
                        <button className="btn btn-sm" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: 'none', padding: '0.75rem 1.25rem', borderRadius: '12px', fontWeight: 800, cursor: 'pointer' }} onClick={() => onDeleteContact(row.id)}>Delete</button>
                      </div>
                    </div>
                    <div style={{ 
                      marginTop: '1.75rem', 
                      padding: '1.75rem', 
                      background: '#0f172a', 
                      borderRadius: '20px', 
                      border: '1px solid #334155', 
                      color: '#e2e8f0', 
                      lineHeight: 1.8, 
                      fontSize: '1rem', 
                      whiteSpace: 'pre-wrap',
                      boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)'
                    }}>
                      {row.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'ratings' && (
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontWeight: 800, color: '#fff' }}>Performance Overview</h2>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.4rem' }}>Detailed star breakdown for each tool.</p>
              </div>
              <button className="btn btn-sm" onClick={refreshRatings} disabled={loading} style={{ background: '#334155', color: '#fff', border: 'none', padding: '0.75rem 1.25rem', borderRadius: '12px', fontWeight: 700 }}>
                Refresh Stats
              </button>
            </div>
            
            {ratingsRows.length === 0 ? (
              <div style={{ ...cardStyle, background: '#1e293b', border: '#334155', padding: '5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem', opacity: 0.3 }}>⭐</div>
                <h3 style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '1.5rem', fontWeight: 800 }}>No Analytics Data</h3>
                <p style={{ color: '#94a3b8', maxWidth: '400px', margin: '0 auto' }}>Once users start rating your tools, you'll see a complete performance breakdown here.</p>
              </div>
            ) : (
              <div className="admin-ratings-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
                {ratingsRows.map((row) => (
                  <div key={row.tool_id} style={{ ...cardStyle, background: '#1e293b', border: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.tools?.name || 'Unknown tool'}</div>
                        <div style={{ color: '#6366f1', fontSize: '0.8rem', fontWeight: 700, marginTop: '0.2rem' }}>/{row.tools?.slug}</div>
                      </div>
                      <div style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', fontSize: '0.65rem', fontWeight: 900, padding: '4px 10px', borderRadius: '20px', textTransform: 'uppercase' }}>
                        ID: {row.tool_id.split('-')[0]}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', background: '#0f172a', padding: '1.5rem', borderRadius: '20px', border: '1px solid #334155' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}>
                          {(row.avg_rating || 0).toFixed(1)}
                          <span style={{ fontSize: '1rem', color: '#f59e0b', marginTop: '-0.5rem' }}>★</span>
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: 800, marginTop: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Average</div>
                      </div>
                      <div style={{ width: '1px', height: '40px', background: '#334155' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                          {[5, 4, 3, 2, 1].map((star) => {
                            const count = row[`rating_${star}`] || 0;
                            const percent = row.total_votes > 0 ? (count / row.total_votes) * 100 : 0;
                            const barColor = star >= 4 ? '#10b981' : (star >= 3 ? '#f59e0b' : '#ef4444');
                            return (
                              <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', width: '10px' }}>{star}</span>
                                <div style={{ flex: 1, height: '6px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
                                  <div style={{ width: `${percent}%`, height: '100%', background: barColor, borderRadius: '10px', transition: 'width 0.5s ease-out' }} />
                                </div>
                                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', minWidth: '25px', textAlign: 'right' }}>{count}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                        <span style={{ fontSize: '0.85rem', color: '#e2e8f0', fontWeight: 700 }}>{row.total_votes}</span>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>Votes</span>
                      </div>
                      <Link to={`/${row.tools?.slug}`} target="_blank" style={{ 
                        fontSize: '0.75rem', color: '#fff', textDecoration: 'none', fontWeight: 800, 
                        background: '#334155', padding: '0.6rem 1rem', borderRadius: '10px',
                        transition: 'all 0.2s'
                      }}>
                        View Live ↗
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Admin Specific Styles */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes loading-bar { 0% { left: -30%; } 100% { left: 100%; } }
        
        @media (max-width: 1024px) {
          .admin-dashboard-main { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .admin-tabs-desktop { display: none !important; }
          .admin-mobile-toggle { display: block !important; }
          .admin-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .admin-ratings-grid { grid-template-columns: 1fr !important; }
          .page-container { padding: 1.5rem 1rem !important; }
        }
        @media (max-width: 480px) {
          .admin-stats-grid { grid-template-columns: 1fr !important; }
          .admin-stat-card { min-height: 140px !important; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; borderRadius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
        
        .admin-tool-item:hover {
          border-color: #6366f1 !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
