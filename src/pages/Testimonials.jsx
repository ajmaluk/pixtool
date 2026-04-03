import { useEffect, useMemo, useState } from 'react';
import SEO from '../components/SEO';
import { Quote, Star, User } from 'lucide-react';
import { getApprovedTestimonials, submitTestimonial } from '../services/supabaseService';
import { hasSupabaseConfig } from '../lib/supabaseClient';
import { IMAGE_TOOLS, PDF_TOOLS, UTILITY_TOOLS } from '../data/tools';

const PAGE_SIZE = 12;
const allTools = [...IMAGE_TOOLS, ...PDF_TOOLS, ...UTILITY_TOOLS].map((tool) => ({
  label: tool.title,
  slug: tool.path.replace(/^\//, ''),
}));

const emptyForm = {
  name: '',
  message: '',
  toolSlug: '',
};

export default function Testimonials() {
  const [selectedTool, setSelectedTool] = useState('');
  const [rows, setRows] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState(emptyForm);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(count / PAGE_SIZE)), [count]);

  const fetchRows = async (currentPage, toolSlug) => {
    if (!hasSupabaseConfig) {
      setRows([]);
      setCount(0);
      return;
    }
    setLoading(true);
    try {
      const { rows: nextRows, count: nextCount } = await getApprovedTestimonials({
        toolSlug: toolSlug || null,
        page: currentPage,
        pageSize: PAGE_SIZE,
      });
      setRows(nextRows);
      setCount(nextCount);
    } catch {
      setRows([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows(page, selectedTool);
  }, [page, selectedTool]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    try {
      await submitTestimonial({
        name: form.name,
        message: form.message,
        toolSlug: form.toolSlug || null,
      });
      setStatus('success');
      setForm(emptyForm);
    } catch (error) {
      setErrorMessage(error?.message || 'Unable to submit now.');
      setStatus('error');
    }
  };

  return (
    <div className="testimonials-page">
      <SEO
        title="Testimonials - Verified User Feedback | PixTool"
        description="Read approved user testimonials and submit your own feedback for moderation."
        path="/testimonials"
      />

      <section className="hero" style={{ padding: '4rem 1.5rem 2.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div className="status-badge" style={{ margin: '0 auto 1rem', width: 'fit-content' }}>USER FEEDBACK</div>
          <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 6vw, 3.2rem)', fontWeight: 900, marginBottom: '0.8rem' }}>Testimonials</h1>
          <p className="hero-subtitle" style={{ color: 'var(--text-secondary)' }}>
            Only approved testimonials are shown publicly. New submissions are moderated first.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 1rem 4rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gap: '1.2rem' }}>
          <div className="tool-card" style={{ padding: '1rem', display: 'grid', gap: '0.6rem' }}>
            <label className="input-label" htmlFor="testimonial-tool-filter" style={{ marginBottom: 0 }}>Filter by tool</label>
            <select
              id="testimonial-tool-filter"
              name="testimonialToolFilter"
              className="select"
              value={selectedTool}
              onChange={(e) => {
                setSelectedTool(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All tools</option>
              {allTools.map((tool) => (
                <option key={tool.slug} value={tool.slug}>{tool.label}</option>
              ))}
            </select>
          </div>

          {!hasSupabaseConfig ? (
            <div className="tool-card" style={{ padding: '1.5rem' }}>
              Supabase is not configured yet. Set env variables to enable moderated testimonials.
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1rem' }}>
                {rows.map((t) => (
                  <div key={t.id} className="tool-card" style={{ padding: '1.3rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />)}
                    </div>
                    <Quote size={24} style={{ color: 'var(--accent-primary)', opacity: 0.2 }} />
                    <p style={{ fontStyle: 'italic', lineHeight: 1.6, flex: 1 }}>
                      "{t.message}"
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.7rem' }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '999px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={16} />
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.92rem' }}>{t.name}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{t.tools?.name || 'General feedback'}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {loading && <div>Loading testimonials...</div>}
              {!loading && rows.length === 0 && (
                <div className="tool-card" style={{ padding: '1.2rem' }}>No approved testimonials yet.</div>
              )}

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }}>
                <button className="btn btn-secondary" disabled={page <= 1 || loading} onClick={() => setPage((p) => p - 1)}>Prev</button>
                <span>Page {page}/{totalPages}</span>
                <button className="btn btn-secondary" disabled={page >= totalPages || loading} onClick={() => setPage((p) => p + 1)}>Next</button>
              </div>

              <div className="tool-card" style={{ padding: '1.2rem' }}>
                <h2 style={{ fontSize: '1.35rem', marginBottom: '0.8rem' }}>Submit Testimonial</h2>
                <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.8rem' }}>
                  <label className="input-label" htmlFor="testimonial-name">Your name</label>
                  <input
                    id="testimonial-name"
                    name="name"
                    className="input"
                    placeholder="Your name"
                    autoComplete="name"
                    value={form.name}
                    required
                    minLength={2}
                    onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                  />
                  <label className="input-label" htmlFor="testimonial-tool">Tool used</label>
                  <select
                    id="testimonial-tool"
                    name="toolSlug"
                    className="select"
                    value={form.toolSlug}
                    onChange={(e) => setForm((s) => ({ ...s, toolSlug: e.target.value }))}
                  >
                    <option value="">General feedback</option>
                    {allTools.map((tool) => (
                      <option key={tool.slug} value={tool.slug}>{tool.label}</option>
                    ))}
                  </select>
                  <label className="input-label" htmlFor="testimonial-message">Your experience</label>
                  <textarea
                    id="testimonial-message"
                    name="message"
                    className="input"
                    style={{ minHeight: '120px', paddingTop: '0.8rem', width: '100%', boxSizing: 'border-box' }}
                    placeholder="Your experience"
                    rows={5}
                    value={form.message}
                    required
                    minLength={5}
                    onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                  />
                  <button className="btn btn-primary" type="submit" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Submitting...' : 'Submit for review'}
                  </button>
                  {status === 'success' && <div style={{ color: '#10b981' }}>Thanks. Your testimonial was submitted for moderation.</div>}
                  {status === 'error' && <div style={{ color: '#ef4444' }}>{errorMessage || 'Unable to submit now. Please retry.'}</div>}
                </form>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
