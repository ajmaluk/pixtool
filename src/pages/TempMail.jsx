import { useState, useEffect, useRef } from 'react'
import { Copy, RefreshCw, Trash2, Loader, Mail, Search, Shield, Zap, Clock, X, Inbox, CheckCircle2, ArrowLeft, ArrowRight, Eye, EyeOff } from 'lucide-react'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import AdSpace from '../components/AdSpace'
import Breadcrumbs from '../components/Breadcrumbs'
import { UTILITY_READ_NEXT } from '../data/utilityToolsData'
import { TOOL_SPECIFIC_FAQS } from '../data/faqs'
import ShareTool from '../components/ShareTool'
import { useRatePopup } from '../hooks/useRatePopup'
import { useConfirm } from '../context/ConfirmContext'
import { getErrorMessage } from '../utils/errorHandling'
import { API_ENDPOINTS, API_TIMEOUTS } from '../config/app.config'

const TEMPMAIL_DIRECT_BASE = 'https://api.mail.tm'

async function tempmailFetch(path, options = {}) {
  const urlDirect = `${TEMPMAIL_DIRECT_BASE}${path}`
  const timeoutMs = 12000
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
  const mergedOptions = { ...options, signal: controller.signal }
  try {
    const response = await fetch(urlDirect, mergedOptions)
    clearTimeout(timeoutId)
    return response
  } catch {
    clearTimeout(timeoutId)
    return fetch(urlDirect, options)
  }
}

class TempMailReceiver {
  constructor() {
    this.email = null
    this.username = null
    this.domain = null
    this.password = null
    this.token = null
    this.checkInterval = null
    this.currentMessages = []
    this.currentFilter = 'all'
    this.searchTerm = ''
  }

  randomPassword(length = 14) {
    const lower = 'abcdefghijklmnopqrstuvwxyz'
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const digits = '0123456789'
    const symbols = '!@#$%^&*()-_=+'
    const all = lower + upper + digits + symbols
    const pick = (s) => s.charAt(Math.floor(Math.random() * s.length))
    const required = [pick(lower), pick(upper), pick(digits), pick(symbols)]
    let rest = ''
    for (let i = 0; i < Math.max(0, length - required.length); i++) rest += pick(all)
    const combined = (required.join('') + rest).split('')
    for (let i = combined.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combined[i], combined[j]] = [combined[j], combined[i]]
    }
    return combined.join('')
  }

  randomString(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  async authenticate() {
    if (!this.email || !this.password) throw new Error('Missing credentials')
    const authResponse = await tempmailFetch('/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: this.email, password: this.password })
    })
    if (!authResponse.ok) throw new Error('Authentication failed')
    const authData = await authResponse.json()
    this.token = authData.token
    return this.token
  }

  async generateEmail() {
    try {
      const domainsResponse = await tempmailFetch('/domains')
      if (!domainsResponse.ok) throw new Error('Failed to fetch domains')
      const domainsData = await domainsResponse.json()
      const domains = domainsData['hydra:member'] || []
      const activeDomain = domains.find(d => d && d.isActive && d.domain) || domains.find(d => d && d.domain)
      if (!activeDomain) throw new Error('No domains available')
      this.domain = activeDomain.domain

      const maxAttempts = 3
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        this.username = this.randomString(10)
        this.email = `${this.username}@${this.domain}`
        this.password = this.randomPassword(14)

        const accountResponse = await tempmailFetch('/accounts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address: this.email, password: this.password })
        })

        if (accountResponse.status === 201) {
          await this.authenticate()
          return this.email
        }
        if (accountResponse.status === 422 || accountResponse.status === 429 || accountResponse.status === 400) {
          continue
        }
        break
      }
      throw new Error('Account creation failed')
    } catch (error) {
      console.error('Error generating email:', error)
      return null
    }
  }

  async checkInbox() {
    if (!this.token) return []
    try {
      const response = await tempmailFetch('/messages', {
        headers: { 'Authorization': `Bearer ${this.token}` }
      })
      if (response.ok) {
        const data = await response.json()
        return data['hydra:member'] || []
      }
      return []
    } catch (error) {
      console.error('Inbox error:', error)
      return []
    }
  }

  async getMessageDetails(id) {
    try {
      const response = await tempmailFetch(`/messages/${id}`, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      })
      if (response.ok) {
        return await response.json()
      }
      return null
    } catch (error) {
      console.error('Error fetching message:', error)
      return null
    }
  }

  async deleteMessage(id) {
    try {
      const response = await tempmailFetch(`/messages/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${this.token}` }
      })
      return response.status === 204 || response.status === 200
    } catch (error) {
      console.error('Error deleting message:', error)
      return false
    }
  }
}

export default function TempMail({
  seoPath = "/temp-mail",
  seoTitle = "🔥 Free Temp Mail with Password - Temporary Email & OTP | PixTool",
  seoDescription = "Get instant free temp mail with password. Temporary email and password for login, OTP verification, Facebook & Instagram signups. Best tempmail alternative to 10MinuteMail & Guerrilla Mail. No registration, 100% anonymous.",
  seoKeywords = "temp mail, temporary email, tempmail, temp email, temp mail with password, temporary email and password, temporary email and password free, temp mail free, temp mail for facebook, 10 minute mail, fake email generator, throwaway email, free temporary email, temp mail generator, temp gmail, temp mail otp, burner email, disposable email, temp inbox, anonymous email, temp mail india, email generator, fake email and password, temp mail gmail, best temp mail, one time email, temp email with password, temp mail for instagram, temp mail for discord, temporary mail, free temp mail, temp mail org, temp mail login",
  breadcrumbs: customBreadcrumbs = [
    { name: 'Utility Tools', item: '/utility-tools' },
    { name: 'Temp Mail', item: '/temp-mail' }
  ],
  heroTitle = "Temp Mail — Temporary Email",
  heroSubtitle = "Free temporary email with password for instant login, OTP verification, and anonymous signups. No registration — best alternative to 10MinuteMail, Guerrilla Mail & Temp-Mail.org.",
  heroBadge = null,
  storageNamespace = 'temp-mail',
  rotateTrigger = null
}) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })
  const [refreshing, setRefreshing] = useState(false)
  const [copied, setCopied] = useState(false)
  const { triggerRating } = useRatePopup()
  const confirm = useConfirm()

  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.matchMedia('(max-width: 900px)').matches : false)
  const [mobilePane, setMobilePane] = useState('content') // 'list' | 'content'
  const tempMailRef = useRef(new TempMailReceiver())
  const prevRotateRef = useRef(null)
  const STORAGE_KEY = `dt_${storageNamespace}_account`
  const INBOX_PREFIX = `dt_${storageNamespace}_inbox:`

  const saveAccount = (acc) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(acc))
    } catch (e) { void e; return }
  }

  const loadAccount = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      return JSON.parse(raw)
    } catch (e) { void e; return null }
  }

  const clearInbox = (addr) => {
    try {
      localStorage.removeItem(INBOX_PREFIX + addr)
    } catch (e) { void e; return }
  }

  const toolTitle = seoTitle.replace(' - PixTool', '')
  const tempMailFaqs = TOOL_SPECIFIC_FAQS['temp-mail']

  const tempMailSteps = [
    "Visit the page - a temporary email address is generated automatically.",
    "Click on the email address or Copy button to copy it to your clipboard.",
    "Paste the email wherever you need to sign up or verify.",
    "Return to this page to see incoming messages - inbox refreshes automatically."
  ]

  useEffect(() => {
    let mounted = true
    const init = async () => {
      setLoading(true)
      const saved = loadAccount()
      if (saved && saved.email && saved.password) {
        tempMailRef.current.email = saved.email
        tempMailRef.current.password = saved.password
        tempMailRef.current.domain = saved.domain
        tempMailRef.current.username = saved.username
        tempMailRef.current.token = saved.token || null
        if (!tempMailRef.current.token) {
          try {
            const tok = await tempMailRef.current.authenticate()
            if (tok) {
              saveAccount({
                email: tempMailRef.current.email,
                password: tempMailRef.current.password,
                domain: tempMailRef.current.domain,
                username: tempMailRef.current.username,
                token: tempMailRef.current.token
              })
            }
          } catch (e) { void e }
        }
        if (mounted) {
          setEmail(saved.email)
          const raw = localStorage.getItem(INBOX_PREFIX + saved.email)
          const cached = raw ? JSON.parse(raw) : []
          if (cached && cached.length) setMessages(cached)
        }
      } else {
        const newEmail = await tempMailRef.current.generateEmail()
        if (newEmail && mounted) {
          setEmail(newEmail)
          saveAccount({
            email: tempMailRef.current.email,
            password: tempMailRef.current.password,
            domain: tempMailRef.current.domain,
            username: tempMailRef.current.username,
            token: tempMailRef.current.token
          })
          localStorage.setItem(INBOX_PREFIX + tempMailRef.current.email, JSON.stringify([]))
        }
      }
      setLoading(false)
    }
    init()
    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(() => {
    if (email && tempMailRef.current.token) {
      const interval = setInterval(async () => {
        const msgs = await tempMailRef.current.checkInbox()
        setMessages(msgs)
        try { localStorage.setItem(INBOX_PREFIX + email, JSON.stringify(msgs)) } catch (e) { void e }
      }, 5000)
      return () => clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email])

  useEffect(() => {
    if (email) {
      try { localStorage.setItem(INBOX_PREFIX + email, JSON.stringify(messages)) } catch (e) { void e }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, email])

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000)
  }

  const copyEmail = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true)
      showToast('Email copied to clipboard!')
      triggerRating('temp-mail')
      setTimeout(() => setCopied(false), 3000)
    })
  }

  const refreshInbox = async () => {
    setRefreshing(true)
    try {
      const msgs = await tempMailRef.current.checkInbox()
      if (msgs !== null && msgs !== undefined) {
        setMessages(msgs || [])
        if (email) {
          try { localStorage.setItem(INBOX_PREFIX + email, JSON.stringify(msgs)) } catch (e) { void e }
        }
      } else {
        setToast({ show: true, message: 'Failed to refresh inbox. Please try again.', type: 'error' })
      }
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'TEMPMAIL_REFRESH')
      setToast({ show: true, message: errorMsg, type: 'error' })
    }
    setRefreshing(false)
  }

  const doChangeEmail = async (silent = false) => {
    if (!silent) {
      const ok = await confirm({
        title: 'Generate New Email?',
        message: 'Are you sure you want to generate a new address? Your current inbox will be permanently cleared.',
        confirmText: 'Generate New',
        type: 'warning'
      })
      if (!ok) return
    }
    setLoading(true)
    const oldEmail = email
    const newEmail = await tempMailRef.current.generateEmail()
    if (newEmail) {
      setEmail(newEmail)
      setMessages([])
      setSelectedMessage(null)
      if (oldEmail) clearInbox(oldEmail)
      saveAccount({
        email: tempMailRef.current.email,
        password: tempMailRef.current.password,
        domain: tempMailRef.current.domain,
        username: tempMailRef.current.username,
        token: tempMailRef.current.token
      })
      try { localStorage.setItem(INBOX_PREFIX + tempMailRef.current.email, JSON.stringify([])) } catch (e) { void e }
      setToast({ show: true, message: 'New email generated successfully!', type: 'success' })
    } else {
      setToast({ show: true, message: 'Failed to generate new email. Please try again later.', type: 'error' })
    }
    setLoading(false)
  }

  const changeEmail = () => doChangeEmail(false)
  const rotateEmail = () => doChangeEmail(true)

  useEffect(() => {
    if (rotateTrigger === null) return
    if (prevRotateRef.current === null) {
      prevRotateRef.current = rotateTrigger
      return
    }
    if (rotateTrigger !== prevRotateRef.current) {
      prevRotateRef.current = rotateTrigger
      rotateEmail()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rotateTrigger])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(max-width: 900px)')
    const onChange = (e) => setIsMobile(e.matches)
    try {
      mq.addEventListener('change', onChange)
    } catch {
      mq.addListener(onChange)
    }
    setIsMobile(mq.matches)
    return () => {
      try {
        mq.removeEventListener('change', onChange)
      } catch {
        mq.removeListener(onChange)
      }
    }
  }, [])

  const deleteEmail = async () => {
    const ok = await confirm({
      title: 'Delete Email?',
      message: 'Are you sure you want to delete this email address permanently? This action cannot be undone.',
      confirmText: 'Delete Forever',
      type: 'danger'
    })
    if (!ok) return
    const oldEmail = email
    setEmail('')
    setMessages([])
    setSelectedMessage(null)
    try { localStorage.removeItem(STORAGE_KEY) } catch (e) { void e }
    if (oldEmail) clearInbox(oldEmail)
    showToast('Email deleted')
  }

  const filteredMessages = messages.filter(msg => {
    if (filter === 'unread' && msg.seen) return false
    if (filter === 'read' && !msg.seen) return false
    if (searchTerm) {
      const subject = (msg.subject || '').toLowerCase()
      const from = (msg.from?.address || '').toLowerCase()
      if (!subject.includes(searchTerm.toLowerCase()) && !from.includes(searchTerm.toLowerCase())) {
        return false
      }
    }
    return true
  })

  useEffect(() => {
    if (messages.length > 0 && filteredMessages.length === 0 && filter !== 'all') {
      setFilter('all')
    }
  }, [messages, filteredMessages, filter])

  const normalizeMessage = (m) => {
    const from = m && typeof m === 'object' ? (m.from || {}) : {}
    return {
      ...m,
      from,
      subject: m?.subject || '',
      createdAt: m?.createdAt || new Date().toISOString(),
      html: m?.html ?? null,
      text: m?.text ?? null,
      seen: !!m?.seen,
      id: m?.id || m?._id || String(Math.random())
    }
  }

  const [detailsLoading, setDetailsLoading] = useState(false)
  const viewMessage = async (msg) => {
    try {
      setSelectedMessage(normalizeMessage(msg))
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, seen: true } : m))
      if (isMobile) setMobilePane('content')
      setDetailsLoading(true)
      const details = await tempMailRef.current.getMessageDetails(msg.id)
      if (details) setSelectedMessage(normalizeMessage(details))
      setDetailsLoading(false)
    } catch {
      setDetailsLoading(false)
      setSelectedMessage(normalizeMessage(msg))
    }
  }

  const displayed = (filteredMessages.length ? filteredMessages : messages)
  const currentIndex = selectedMessage ? displayed.findIndex(m => m.id === selectedMessage.id) : -1
  const navigateOffset = (offset) => {
    if (!selectedMessage) return
    const idx = currentIndex
    const next = displayed[idx + offset]
    if (next) viewMessage(next)
  }
  const navPrev = () => navigateOffset(-1)
  const navNext = () => navigateOffset(1)

  const toggleReadUnread = () => {
    if (!selectedMessage) return
    const isRead = !!selectedMessage.seen
    setSelectedMessage({ ...selectedMessage, seen: !isRead })
    setMessages(prev => prev.map(m => m.id === selectedMessage.id ? { ...m, seen: !isRead } : m))
  }

  const deleteCurrent = async () => {
    if (!selectedMessage) return
    const ok = await tempMailRef.current.deleteMessage(selectedMessage.id)
    if (!ok) {
      // Proceed locally even if API fails, to keep UX responsive
      console.warn('Server delete failed, removing locally')
    }
    const idx = currentIndex
    const next = displayed[idx + 1] || displayed[idx - 1]
    setMessages(prev => prev.filter(m => m.id !== selectedMessage.id))
    setSelectedMessage(next || null)
    if (isMobile && !next) setMobilePane('list')
  }

  useEffect(() => {
    if (!selectedMessage) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setSelectedMessage(null)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        navPrev()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        navNext()
      } else if (e.key === 'Enter') {
        e.preventDefault()
        toggleReadUnread()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMessage, currentIndex, messages, filter, searchTerm])

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'Just now'
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  }

  const sanitizeHtml = (raw) => {
    let html = raw
    if (Array.isArray(html)) html = html.join('\n')
    if (typeof html !== 'string') html = ''
    html = html
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
      .replace(/\son\w+="[^"]*"/gi, '')
      .replace(/\son\w+='[^']*'/gi, '')
      .replace(/javascript:/gi, '')
    return html
  }

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        path={seoPath}
        toolName={toolTitle}
        toolSteps={tempMailSteps}
        breadcrumbs={customBreadcrumbs}
        faqs={tempMailFaqs}
        screenshot={`${import.meta.env.VITE_SITE_URL}/screenshots/disposable-temporary-email-generator.webp`}
        imageAlt="PixTool Temp Mail - Instant anonymous inbox interface"
        imageTitle="Free Temporary Email Service"
      />


      <div className="page-container">
        <Breadcrumbs items={customBreadcrumbs} />
        <div className="landing-layout">
          <AdSpace type="side" className="desktop-only" />

          <div className="landing-center">
            <AdSpace type="top" />

            <div className="page-hero">
              <div className="page-hero-content">
                <h1 className="page-title">
                  {heroTitle.split(' ').length > 1 ? (
                    <>
                      {heroTitle.split(' ').slice(0, -1).join(' ')} <span style={{ color: 'var(--accent-pink)' }}>{heroTitle.split(' ').slice(-1)[0]}</span>
                    </>
                  ) : heroTitle}
                </h1>
                <p className="page-subtitle">{heroSubtitle}</p>
                {heroBadge}
              </div>
            </div>

            {/* Email Generator Card */}
            <div className="tool-panel" style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                <div className="badge-status" style={{ background: email ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)' }}>
                  <div className={`badge-status-dot pulse`} style={{ background: email ? 'var(--accent-emerald)' : 'var(--accent-orange)' }} />
                  <span style={{ color: email ? 'var(--accent-emerald)' : 'var(--accent-orange)' }}>
                    {loading ? 'Generating...' : email ? 'Active & Receiving' : 'Inactive'}
                  </span>
                </div>
              </div>

              {loading ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', padding: '4rem 2rem' }}>
                  <div className="loader-orbit">
                    <div className="loader-inner" />
                    <Mail size={32} className="loader-icon" />
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.8rem' }}>Forging Secure Identity...</p>
                </div>
              ) : (
                <div className="tempmail-display-container">
                  <div className="tempmail-glow" />
                  <div
                    onClick={copyEmail}
                    className="tempmail-address-card"
                  >
                    <div className="tempmail-icon-glow">
                      <Mail size={28} />
                    </div>
                    <div className="tempmail-address-wrapper">
                      <span className="tempmail-label">Your Secure Address</span>
                      <span className="tempmail-address">
                        {email || 'Generating...'}
                      </span>
                    </div>
                    <div className={`tempmail-copy-btn ${copied ? 'copied' : ''}`}>
                      {copied ? <CheckCircle2 size={24} /> : <Copy size={24} />}
                    </div>
                  </div>

                  <div className="tempmail-actions-grid">
                    <button className="action-btn-premium refresh" onClick={refreshInbox} disabled={refreshing}>
                      <RefreshCw size={20} className={refreshing ? 'spinning' : ''} />
                      <span>{refreshing ? 'Syncing...' : 'Sync Inbox'}</span>
                    </button>
                    <button className="action-btn-premium rotate" onClick={changeEmail}>
                      <RefreshCw size={20} />
                      <span>New Identity</span>
                    </button>
                    <button className="action-btn-premium delete" onClick={deleteEmail}>
                      <Trash2 size={20} />
                      <span>Terminate</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '2rem' }}>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                {heroSubtitle}
              </p>
              {heroBadge}
            </div>

            <div className="tool-panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-emerald-50)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 900, margin: 0 }}>Inbox</h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      {messages.length} {messages.length === 1 ? 'Message' : 'Messages'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['all', 'unread', 'read'].map(f => (
                    <button
                      key={f}
                      className={`btn ${filter === f ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', ...(filter === f ? { background: 'var(--accent-pink)', borderColor: 'var(--accent-pink)' } : {}) }}
                      onClick={() => setFilter(f)}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  className="input"
                  placeholder="Search by sender or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ paddingLeft: '48px' }}
                />
              </div>

              {filteredMessages.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'var(--bg-secondary)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                  <Mail size={56} style={{ color: 'var(--text-muted)', opacity: 0.15, marginBottom: '1.5rem' }} />
                  <h3 style={{ fontWeight: 900, marginBottom: '0.5rem', fontSize: '1.25rem' }}>No messages yet</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '300px', margin: '0 auto' }}>
                    Emails sent to your disposable address will appear here automatically
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {filteredMessages.map(msg => (
                    <div
                      key={msg.id}
                      onClick={() => viewMessage(msg)}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '1.25rem',
                        padding: '1.25rem',
                        background: msg.seen ? 'transparent' : 'var(--bg-secondary)',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        border: '1px solid var(--border-color)',
                        transition: 'var(--transition)',
                        boxShadow: msg.seen ? 'none' : 'var(--shadow-sm)',
                        position: 'relative'
                      }}
                      className="inbox-item"
                    >
                      <div style={{
                        width: '48px', height: '48px', borderRadius: '12px',
                        background: msg.seen ? 'var(--bg-primary)' : 'var(--accent-pink)',
                        color: msg.seen ? 'var(--accent-pink)' : 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 900, fontSize: '1.25rem', flexShrink: 0,
                        border: '1px solid var(--border-color)',
                        transition: 'var(--transition)'
                      }}>
                        {(msg.from?.address || '?').charAt(0).toUpperCase()}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                          <span style={{
                            fontWeight: msg.seen ? 700 : 900,
                            fontSize: '1rem',
                            color: msg.seen ? 'var(--text-secondary)' : 'var(--text-primary)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {msg.from?.address?.split('@')[0] || 'Unknown Sender'}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                              {timeAgo(msg.createdAt)}
                            </span>
                            {!msg.seen && (
                              <div style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                background: 'var(--accent-pink)',
                                flexShrink: 0,
                                boxShadow: '0 0 12px rgba(236,72,153,0.5)'
                              }} />
                            )}
                          </div>
                        </div>
                        <p style={{
                          fontSize: '0.9rem',
                          color: 'var(--text-muted)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          margin: 0,
                          lineHeight: 1.4,
                          fontWeight: 500
                        }}>
                          {msg.subject || '(No Subject)'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginTop: '4rem', marginBottom: '4rem' }}>
              {[
                { icon: Shield, title: 'Privacy First', desc: 'No personal data required. No tracking or logging.', color: 'var(--accent-emerald)' },
                { icon: Zap, title: 'Instant Setup', desc: 'Get a working email in under 2 seconds. Zero config.', color: 'var(--accent-orange)' },
                { icon: Clock, title: 'Auto Refresh', desc: 'Inbox checks for new mail every 5 seconds automatically.', color: 'var(--accent-primary)' },
                { icon: Mail, title: 'Real Emails', desc: 'Receive actual emails with attachments from any sender.', color: 'var(--accent-pink)' },
              ].map((feat, i) => (
                <div key={i} className="tool-card" style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
                  <div className="tool-card-icon" style={{ background: `${feat.color}15`, color: feat.color, margin: '0 auto' }}>
                    <feat.icon size={26} />
                  </div>
                  <h2 style={{ fontWeight: 900, marginBottom: '0.5rem', fontSize: '1.1rem' }}>{feat.title}</h2>
                  <p className="tool-card-description" style={{ fontSize: '0.9rem' }}>{feat.desc}</p>
                </div>
              ))}
            </div>

            <AdSpace type="bottom" />

            <div style={{ marginTop: '5rem' }}>
              <ToolContent
                title={heroTitle}
                description={seoDescription}
                benefits={[
                  "100% Free — no hidden costs or premium upgrades ever",
                  "Instant Generation — get a working email in under 1 second",
                  "No Registration — use it immediately without sharing personal info",
                  "Auto-Refresh Inbox — checks for new messages every 5 seconds",
                  "Total Anonymity — no logs, no tracking, no cookies required",
                  "Mobile Optimized — works perfectly on iOS, Android, and tablets",
                  "Unlimited Mailboxes — generate as many addresses as you need",
                  "Spam Protection — keep your real inbox clean from junk mail",
                  "Privacy First — all processing happens in your secure browser tab",
                  "Global Reach — receive emails from any sender worldwide instantly"
                ]}
                howTo={[
                  "Open the Temp Mail page — a unique email address is generated automatically",
                  "Click the email address or tap 'Copy Email' to copy it to your clipboard",
                  "Paste the address into any signup form, download gate, or verification page",
                  "Return to this page to see incoming messages — the inbox auto-refreshes every 5 seconds",
                  "Click 'New Email' to generate a fresh address whenever you need one"
                ]}
                tips={[
                  "Keep the tab open until you receive your verification code — closing it will end your session for maximum privacy.",
                  "If a website blocks one disposable email domain, click 'New Email' for a fresh address on a different domain.",
                  "Use temp mail for free trial signups, software downloads, and accessing gated content behind email walls.",
                  "Avoid using temporary email for critical accounts like banking or primary social media — use a permanent email for those.",
                  "Bookmark this page so you can generate a new temp inbox instantly whenever you need one."
                ]}
                useCases={[
                  { title: "Website Signups & Free Trials", description: "Register for free trials, SaaS products, and online services without giving away your personal email. Avoid post-trial spam forever." },
                  { title: "Online Shopping & Coupons", description: "Sign up for discount codes and special offers from e-commerce sites without flooding your real inbox with daily promotional emails." },
                  { title: "Public WiFi & Hotspot Access", description: "Use a disposable email to log into airport, hotel, and café WiFi captive portals without exposing your real email to unknown networks." },
                  { title: "Forum & Community Registration", description: "Join forums, Reddit-style communities, and discussion boards anonymously without linking your real identity." },
                  { title: "App Testing & QA", description: "Create multiple test accounts for your own applications to verify email notifications, onboarding flows, and user registration." },
                  { title: "Newsletter Previews", description: "Subscribe to newsletters you're curious about but not committed to. Read the first few issues and decide if it's worth your real email." }
                ]}
                faq={tempMailFaqs}
                relatedTools={[
                  { name: 'QR Generator', path: '/qr-generator' },
                  { name: 'QR Scanner', path: '/qr-scanner' },
                  { name: 'PDF Tools', path: '/pdf-tools' },
                  { name: '10 Minute Mail', path: '/temp-mail/10-minute-mail' },
                  { name: 'Change Temporary Email', path: '/temp-mail/change-email' },
                  { name: 'Image Tools', path: '/image-tools' },
                  { name: 'Code Diff', path: '/code-diff' }
                ]}
                readNext={UTILITY_READ_NEXT['temp-mail']}
                alternativeTo={["10MinuteMail", "Temp-Mail.org", "Guerrilla Mail", "Mailinator", "ThrowAwayMail", "YOPmail"]}
              />
            </div>

            <div className="tool-panel" style={{ marginTop: '3rem' }}>
              <div id="free-temp-mail" style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>Free Temporary Email</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.7 }}>
                  Use your free temporary email for signups, verifications, and newsletters without sharing your real address. No registration required.
                </p>
              </div>
              <div id="random-email" style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>Random Email Address</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.7 }}>
                  Generate a random email address instantly. Rotate to a new address anytime to keep signups clean and anonymous.
                </p>
              </div>
              <div id="no-registration" style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>No Registration Temp Mail</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.7 }}>
                  Start using temp mail immediately with zero forms or accounts. Copy in one tap and receive messages in seconds.
                </p>
              </div>

              <div style={{ marginTop: '4rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '2rem' }}>Related Tools</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {[
                    { title: 'Fake Email Generator', desc: 'Random fake emails', path: '/fake-email' },
                    { title: 'Disposable Email', desc: 'One-time use inbox', path: '/disposable-email' },
                    { title: 'Throwaway Email', desc: 'Privacy protection', path: '/throwaway-email' },
                    { title: '10 Minute Mail', desc: 'Auto-expiring inbox', path: '/temp-mail/10-minute-mail' }
                  ].map((tool, i) => (
                    <a key={i} href={tool.path} className="tool-card" style={{ padding: '1.5rem' }}>
                      <h3 style={{ fontWeight: 800, marginBottom: '0.5rem', fontSize: '1.1rem' }}>{tool.title}</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>{tool.desc}</p>
                    </a>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '4rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '2rem' }}>Alternatives Comparison</h2>
                <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: 'var(--bg-secondary)' }}>
                        <th style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', fontWeight: 800 }}>Service</th>
                        <th style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', fontWeight: 800 }}>Registration</th>
                        <th style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', fontWeight: 800 }}>Ads</th>
                        <th style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', fontWeight: 800 }}>Auto-Refresh</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { s: 'PixTool Temp Mail', r: 'No', a: 'Minimal', f: 'Yes (5s)' },
                        { s: 'TempMail.org alternative', r: 'Varies', a: 'High', f: 'Yes' },
                        { s: '10MinuteMail alternative', r: 'No', a: 'Medium', f: 'Limited' }
                      ].map((row, i) => (
                        <tr key={i}>
                          <td style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>{row.s}</td>
                          <td style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)' }}>{row.r}</td>
                          <td style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)' }}>{row.a}</td>
                          <td style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)' }}>{row.f}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <AdSpace type="side" className="desktop-only" />
        </div>

        <div className="tool-panel" style={{ marginTop: '3rem', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem', textAlign: 'center' }}>Why Use Temporary Email?</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Disposable email addresses are an essential privacy tool in today's digital landscape. Protect yourself from spam, phishing, and data harvesting.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { title: 'Avoid Spam & Junk Mail', desc: 'Keep your primary inbox clean by using disposable emails for newsletter signups, free trials, and one-time purchases. Never get unwanted marketing emails again.' },
              { title: 'Protect Your Privacy', desc: 'Don\'t reveal your real email address to websites you don\'t trust. Stay fully anonymous online and prevent companies from building a profile on you.' },
              { title: 'Prevent Data Breaches', desc: 'If a website gets hacked, your real email won\'t be exposed. Add an extra layer of security to your digital footprint with throwaway addresses.' },
              { title: 'Quick Verifications & OTPs', desc: 'Get verification codes, OTPs, and confirmation links instantly without creating yet another permanent account on a service you may never use again.' },
              { title: 'Test Apps & Services', desc: 'Developers and QA testers can create multiple test accounts quickly to verify signup flows, email notifications, and onboarding sequences.' },
              { title: 'Bypass Email Walls', desc: 'Access gated content, free downloads, whitepapers, and educational resources hidden behind email registration forms without compromising your real inbox.' }
            ].map((item, i) => (
              <div key={i} style={{ padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontWeight: 800, marginBottom: '1rem', color: 'var(--accent-pink)' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6, fontSize: '0.95rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {selectedMessage && (
          <div className="modal-overlay" onClick={() => setSelectedMessage(null)}>
            <div
              className="modal-content"
              onClick={e => e.stopPropagation()}
              style={{
                width: isMobile ? '100%' : 'min(1280px, 95%)',
                maxWidth: 'none',
                height: isMobile ? '100%' : '85vh',
                display: 'flex',
                background: 'var(--bg-primary)',
                padding: 0,
                borderRadius: isMobile ? 0 : '32px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: isMobile ? '100%' : '380px',
                  minWidth: isMobile ? '100%' : '300px',
                  borderRight: isMobile ? 'none' : '1px solid var(--border-color)',
                  display: isMobile ? (mobilePane === 'list' ? 'flex' : 'none') : 'flex',
                  flexDirection: 'column',
                  background: 'var(--bg-secondary)',
                  overflow: 'hidden'
                }}
              >
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-primary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-pink-50, rgba(236, 72, 153, 0.1))', color: 'var(--accent-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Inbox size={18} />
                    </div>
                    <span style={{ fontSize: '1.1rem', letterSpacing: '-0.02em' }}>Your Inbox</span>
                  </div>
                  {isMobile && (
                    <button className="btn-icon" onClick={() => setSelectedMessage(null)} aria-label="Close message view"><X size={18} /></button>
                  )}
                </div>
                <div style={{ overflow: 'auto', padding: '0.75rem' }}>
                  {(filteredMessages.length ? filteredMessages : messages).map(msg => (
                    <div
                      key={msg.id}
                      onClick={() => viewMessage(msg)}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '1rem',
                        padding: '1rem',
                        cursor: 'pointer',
                        borderRadius: '16px',
                        marginBottom: '0.5rem',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        background: selectedMessage?.id === msg.id ? 'var(--bg-primary)' : 'transparent',
                        border: '1px solid',
                        borderColor: selectedMessage?.id === msg.id ? 'var(--accent-pink)' : 'transparent',
                        boxShadow: selectedMessage?.id === msg.id ? '0 8px 20px rgba(236,72,153,0.1)' : 'none',
                        transform: selectedMessage?.id === msg.id ? 'scale(1.02)' : 'scale(1)',
                        position: 'relative'
                      }}
                      className="inbox-item"
                    >
                      <div style={{
                        width: '42px', height: '42px', borderRadius: '12px',
                        background: selectedMessage?.id === msg.id ? 'var(--accent-pink)' : 'var(--bg-primary)',
                        color: selectedMessage?.id === msg.id ? 'white' : 'var(--accent-pink)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 800, flexShrink: 0,
                        border: '1px solid var(--border-color)',
                        transition: 'all 0.3s ease'
                      }}>
                        {(msg.from?.address || '?').charAt(0).toUpperCase()}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.2rem' }}>
                          <div style={{
                            fontWeight: msg.seen ? 600 : 900,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontSize: '0.9rem',
                            color: msg.seen ? 'var(--text-secondary)' : 'var(--text-primary)'
                          }}>
                            {msg.from?.address?.split('@')[0] || 'Unknown'}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 600, flexShrink: 0 }}>
                              {timeAgo(msg.createdAt)}
                            </div>
                            {!msg.seen && (
                              <div style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: 'var(--accent-pink)',
                                flexShrink: 0,
                                boxShadow: '0 0 8px rgba(236,72,153,0.4)'
                              }} />
                            )}
                          </div>
                        </div>
                        <div style={{
                          fontSize: '0.8rem',
                          color: 'var(--text-muted)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          lineHeight: 1.4
                        }}>
                          {msg.subject || '(No Subject)'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Pane: Email content */}
              <div style={{ flex: 1, display: isMobile && mobilePane === 'list' ? 'none' : 'flex', flexDirection: 'column', background: 'var(--bg-primary)', minWidth: 0, overflow: 'hidden' }}>
                <div className="modal-header" style={{
                  borderBottom: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  padding: '1.25rem 1.5rem',
                  background: 'var(--bg-primary)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: 0, flex: 1 }}>
                    {isMobile && (
                      <button className="btn-icon" onClick={() => setMobilePane('list')} aria-label="Back to inbox"><ArrowLeft size={18} /></button>
                    )}
                    <h3 style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '1.1rem', fontWeight: 900 }}>
                      {selectedMessage.subject || '(No Subject)'}
                    </h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ display: 'flex', background: 'var(--bg-secondary)', borderRadius: '12px', padding: '2px' }}>
                      <button className="btn-icon" onClick={navPrev} disabled={currentIndex <= 0} style={{ border: 'none' }} aria-label="Previous message"><ArrowLeft size={18} /></button>
                      <button className="btn-icon" onClick={navNext} disabled={currentIndex < 0 || currentIndex >= displayed.length - 1} style={{ border: 'none' }} aria-label="Next message"><ArrowRight size={18} /></button>
                    </div>
                    <button className="btn-icon" onClick={toggleReadUnread} aria-label={selectedMessage.seen ? "Mark as unread" : "Mark as read"}>{selectedMessage.seen ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                    <button className="btn-icon" onClick={deleteCurrent} style={{ color: 'var(--accent-red)' }} aria-label="Delete message"><Trash2 size={18} /></button>
                    <button className="btn-icon" onClick={() => setSelectedMessage(null)} style={{ background: 'var(--bg-secondary)', borderRadius: '50%' }} aria-label="Close message"><X size={18} /></button>
                  </div>
                </div>
                <div
                  className="modal-body"
                  style={{ padding: isMobile ? '1.5rem' : '3rem', overflow: 'auto', background: 'var(--bg-primary)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--accent-pink)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.5rem', boxShadow: '0 8px 30px rgba(236,72,153,0.2)' }}>
                      {(selectedMessage.from?.address || '?').charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                        <div>
                          <div style={{ fontWeight: 900, fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                            {selectedMessage.from?.name || selectedMessage.from?.address?.split('@')[0] || 'Unknown Sender'}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
                            <span style={{ background: 'var(--bg-primary)', padding: '4px 12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                              From: {selectedMessage.from?.address}
                            </span>
                          </div>
                        </div>
                        <div style={{ textAlign: isMobile ? 'left' : 'right', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 700 }}>
                          {detailsLoading && <Loader size={16} className="spinning" style={{ marginRight: '8px' }} />}
                          <div>{new Date(selectedMessage.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}</div>
                          <div>{new Date(selectedMessage.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{
                    padding: isMobile ? '1.5rem' : '2rem',
                    background: 'var(--bg-primary)',
                    borderRadius: '24px',
                    minHeight: '400px',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                    position: 'relative',
                    overflow: 'hidden',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word'
                  }}>
                    <button
                      onClick={() => {
                        const content = selectedMessage.text || selectedMessage.html?.replace(/<[^>]*>/g, '') || '';
                        navigator.clipboard.writeText(content);
                        showToast('Message copied!');
                      }}
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        padding: '0.5rem 1rem',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        borderRadius: '10px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        zIndex: 10
                      }}
                    >
                      <Copy size={12} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                      Copy Text
                    </button>
                    {selectedMessage.html ? (
                      <div
                        style={{
                          lineHeight: 1.7,
                          fontSize: '1rem',
                          color: 'var(--text-primary)',
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word',
                          overflow: 'hidden'
                        }}
                        dangerouslySetInnerHTML={{
                          __html: sanitizeHtml(selectedMessage.html || '')
                        }}
                      />
                    ) : (
                      <div style={{
                        whiteSpace: 'pre-wrap',
                        lineHeight: 1.7,
                        fontSize: '1rem',
                        color: 'var(--text-primary)',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word'
                      }}>
                        {selectedMessage.text || 'No content'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={`toast ${toast.show ? 'show' : ''} ${toast.type}`}>
          {toast.message}
        </div>

      </div>
      <ShareTool title={seoTitle} />
    </>
  )
}
