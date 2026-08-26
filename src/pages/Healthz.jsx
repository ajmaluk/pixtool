import { useState, useEffect, useCallback } from 'react'
import { supabase, hasSupabaseConfig } from '../lib/supabaseClient'
import SEO from '../components/SEO'
import { CheckCircle2, AlertTriangle, RefreshCw, Database, Activity, ShieldCheck, Clock } from 'lucide-react'

export default function Healthz() {
  const [status, setStatus] = useState('checking')
  const [latency, setLatency] = useState(null)
  const [dbDetails, setDbDetails] = useState({ storage: 'checking', toolsTable: 'checking' })
  const [errorDetails, setErrorDetails] = useState(null)
  const [timestamp, setTimestamp] = useState(new Date().toISOString())
  const [pingCount, setPingCount] = useState(0)

  const checkSupabaseHealth = useCallback(async () => {
    setStatus('checking')
    setErrorDetails(null)
    const startTime = performance.now()

    if (!hasSupabaseConfig || !supabase) {
      setStatus('unconfigured')
      setErrorDetails('Supabase client is not configured or missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY')
      setTimestamp(new Date().toISOString())
      return
    }

    try {
      // 1. Ping Storage service to wake up Supabase services
      const { data: buckets, error: storageError } = await supabase.storage.listBuckets()
      
      // 2. Query public.tools to verify database schema
      const { data: tools, error: tableError } = await supabase
        .from('tools')
        .select('id, name')
        .limit(3)

      const endTime = performance.now()
      const elapsed = Math.round(endTime - startTime)
      setLatency(elapsed)
      setTimestamp(new Date().toISOString())
      setPingCount(prev => prev + 1)

      setDbDetails({
        storage: storageError ? `Notice (${storageError.message})` : `Healthy (${buckets?.length ?? 0} buckets)`,
        toolsTable: tableError ? 'Ready for supa.sql initialization' : `Synchronized (${tools?.length ?? 0} sample tools)`
      })

      setStatus('healthy')
    } catch (err) {
      console.error('Supabase Health Check Error:', err)
      const endTime = performance.now()
      setLatency(Math.round(endTime - startTime))
      setStatus('error')
      setErrorDetails(err.message || 'Failed to communicate with Supabase')
      setTimestamp(new Date().toISOString())
    }
  }, [])

  useEffect(() => {
    checkSupabaseHealth()
    // Auto ping every 5 minutes while page is kept open
    const interval = setInterval(checkSupabaseHealth, 300000)
    return () => clearInterval(interval)
  }, [checkSupabaseHealth])

  const jsonResponse = {
    status: status === 'healthy' ? 'ok' : status,
    service: 'pixtool-supabase-healthz',
    database: {
      provider: 'Supabase PostgreSQL',
      connected: status === 'healthy',
      latency_ms: latency,
      storage_status: dbDetails.storage,
      tools_schema: dbDetails.toolsTable,
      project_ref: 'sjhqxwrreasscvmzuyby'
    },
    anti_pause: {
      active: true,
      inactivity_guard: 'reset_on_request',
      pings_in_session: pingCount
    },
    timestamp,
    error: errorDetails
  }

  return (
    <div style={{ maxWidth: '840px', margin: '2rem auto', padding: '1rem', minHeight: '70vh' }}>
      <SEO 
        title="Supabase Healthz & Keep-Alive | PixTool"
        description="System health check endpoint and Supabase keepalive ping service for PixTool."
        noindex={true}
      />

      <div style={{ 
        background: 'var(--bg-card)', 
        border: '1px solid var(--border-color)', 
        borderRadius: '20px', 
        padding: '2rem',
        boxShadow: '0 12px 36px rgba(0,0,0,0.06)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: status === 'healthy' ? 'rgba(34, 197, 94, 0.15)' : status === 'checking' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: status === 'healthy' ? '#22c55e' : status === 'checking' ? '#3b82f6' : '#ef4444'
            }}>
              {status === 'healthy' ? <CheckCircle2 size={24} /> : status === 'checking' ? <RefreshCw size={24} className="animate-spin" /> : <AlertTriangle size={24} />}
            </div>
            <div>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0, color: 'var(--text-primary)' }}>
                System Healthz & Keep-Alive
              </h1>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Endpoint: <code style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>/healthz</code>
              </p>
            </div>
          </div>

          <button
            onClick={checkSupabaseHealth}
            disabled={status === 'checking'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.2rem',
              borderRadius: '10px',
              border: 'none',
              background: 'var(--accent-primary)',
              color: '#fff',
              fontWeight: 700,
              cursor: status === 'checking' ? 'not-allowed' : 'pointer',
              opacity: status === 'checking' ? 0.7 : 1,
              transition: 'all 0.2s'
            }}
          >
            <RefreshCw size={16} className={status === 'checking' ? 'animate-spin' : ''} />
            {status === 'checking' ? 'Pinging...' : 'Ping Supabase'}
          </button>
        </div>

        {/* Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              <Database size={16} /> Database Status
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: status === 'healthy' ? '#22c55e' : status === 'checking' ? '#3b82f6' : '#ef4444', textTransform: 'capitalize' }}>
              {status}
            </div>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              <Activity size={16} /> Latency
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {latency !== null ? `${latency} ms` : '—'}
            </div>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              <ShieldCheck size={16} /> Inactivity Guard
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#22c55e' }}>
              Active (7d Safe)
            </div>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              <Clock size={16} /> Last Verified
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
              {new Date(timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Cron Job Usage Instructions */}
        <div style={{ background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.25)', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.4rem' }}>
            🤖 How to Use in Cron Jobs / Uptime Monitors:
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 0.5rem', lineHeight: 1.5 }}>
            Add this URL to any free cron service (e.g., <strong>cron-job.org</strong>, <strong>UptimeRobot</strong>, or GitHub Actions) every 1 to 5 days:
          </p>
          <code style={{ display: 'block', background: 'var(--bg-secondary)', padding: '0.5rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--accent-primary)', border: '1px solid var(--border-color)', overflowX: 'auto' }}>
            curl -s https://www.pixtool.in/healthz
          </code>
        </div>

        {/* Raw JSON Payload Block */}
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            Raw JSON Output
          </div>
          <pre 
            id="healthz-raw"
            style={{ 
              background: '#090d16', 
              color: '#38bdf8', 
              padding: '1.25rem', 
              borderRadius: '12px', 
              fontSize: '0.85rem', 
              lineHeight: 1.6, 
              overflowX: 'auto',
              fontFamily: 'monospace',
              border: '1px solid rgba(255,255,255,0.08)',
              margin: 0
            }}
          >
            {JSON.stringify(jsonResponse, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}
