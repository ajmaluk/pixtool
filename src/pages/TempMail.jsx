import { useState, useEffect, useRef } from 'react'
import { Copy, RefreshCw, Trash2, Loader, Mail, Search, Shield, Zap, Clock, X, Inbox, CheckCircle2, ArrowLeft, ArrowRight, Eye, EyeOff, Key } from 'lucide-react'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import AdSpace from '../components/AdSpace'
import Breadcrumbs from '../components/Breadcrumbs'
import ShareTool from '../components/ShareTool'
import { ALL_TOOLS_MAP } from '../data/tools'
import { useRatePopup } from '../hooks/useRatePopup'
import { useConfirm } from '../context/ConfirmContext'
import { getErrorMessage } from '../utils/errorHandling'
import { API_ENDPOINTS, API_TIMEOUTS } from '../config/app.config'

const TEMPMAIL_DIRECT_BASE = 'https://api.mail.tm'

function decodeHTML(text) {
  if (!text || typeof text !== 'string') return ''
  const temp = document.createElement('textarea')
  temp.innerHTML = text
  return temp.value
}

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
    this.service = null // 'Mail.tm' | 'GuerrillaMail'
    this.token = null
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

    const pickSecure = (s) => {
      const array = new Uint32Array(1)
      window.crypto.getRandomValues(array)
      return s.charAt(array[0] % s.length)
    }

    const required = [pickSecure(lower), pickSecure(upper), pickSecure(digits), pickSecure(symbols)]
    let rest = ''
    for (let i = 0; i < Math.max(0, length - required.length); i++) {
      rest += pickSecure(all)
    }

    const combined = (required.join('') + rest).split('')
    for (let i = combined.length - 1; i > 0; i--) {
      const array = new Uint32Array(1)
      window.crypto.getRandomValues(array)
      const j = array[0] % (i + 1);
      [combined[i], combined[j]] = [combined[j], combined[i]]
    }
    return combined.join('')
  }

  randomString(length = 10) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  async authenticate() {
    if (this.service === 'GuerrillaMail') {
      return this.token
    }
    if (!this.email || !this.password) throw new Error('Missing credentials')
    const authResponse = await tempmailFetch('/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ address: this.email, password: this.password })
    })
    if (!authResponse.ok) {
      throw new Error(`Authentication failed (${authResponse.status})`)
    }
    const authData = await authResponse.json()
    if (!authData || !authData.token) {
      throw new Error('Invalid token received from mail service')
    }
    this.token = authData.token
    return this.token
  }

  async generateEmail() {
    try {
      // 1. Try Mail.tm first
      try {
        this.service = 'Mail.tm'
        const domainsResponse = await tempmailFetch('/domains')
        if (!domainsResponse.ok) {
          throw new Error(`Failed to fetch domains (${domainsResponse.status})`)
        }
        const domainsData = await domainsResponse.json()
        const domains = domainsData['hydra:member'] || []
        const activeDomains = domains.filter(d => d && d.domain && d.isActive)
        const availableDomains = activeDomains.length ? activeDomains : domains.filter(d => d && d.domain)
        if (!availableDomains.length) throw new Error('No domains available on Mail.tm')
        
        const startIndex = Math.floor(Math.random() * availableDomains.length)
        const maxAttempts = 3
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
          this.domain = availableDomains[(startIndex + attempt) % availableDomains.length].domain
          this.username = this.randomString(10)
          this.email = `${this.username}@${this.domain}`
          this.password = this.randomPassword(14)

          const accountResponse = await tempmailFetch('/accounts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ address: this.email, password: this.password })
          })

          if (accountResponse.status === 201) {
            await this.authenticate()
            this.service = 'Mail.tm'
            return this.email
          }
          if (accountResponse.status === 422 || accountResponse.status === 429 || accountResponse.status === 400) {
            continue
          }
          break
        }
        throw new Error('Mail.tm account creation failed')
      } catch (mailTmError) {
        console.warn('[TempMail] Mail.tm initialization failed, falling back to GuerrillaMail:', mailTmError)
        
        // 2. Fallback to GuerrillaMail
        this.service = 'GuerrillaMail'
        const response = await fetch('https://api.guerrillamail.com/ajax.php?f=get_email_address')
        if (!response.ok) {
          throw new Error(`GuerrillaMail initialization failed (${response.status})`)
        }
        const data = await response.json()
        if (!data || !data.email_addr || !data.sid_token) {
          throw new Error('Invalid response from GuerrillaMail')
        }
        
        this.email = data.email_addr
        const [username, domain] = this.email.split('@')
        this.username = username
        this.domain = domain
        this.token = data.sid_token
        this.password = data.sid_token
        return this.email
      }
    } catch (error) {
      console.error('Error generating email:', error)
      return null
    }
  }

  async checkInbox() {
    if (!this.token) return []
    try {
      if (this.service === 'GuerrillaMail') {
        const response = await fetch(`https://api.guerrillamail.com/ajax.php?f=get_email_list&offset=0&sid_token=${encodeURIComponent(this.token)}`)
        if (response.ok) {
          const data = await response.json()
          if (!data || !data.list) return []
          return (data.list || []).map(msg => {
            const rawSubject = (msg.mail_subject !== undefined && msg.mail_subject !== null)
              ? String(msg.mail_subject)
              : (msg.subject || '')
            const decodedSubject = decodeHTML(rawSubject).trim()
            const rawFrom = msg.mail_from || msg.from || ''
            const fromAddr = decodeHTML(String(rawFrom)).trim()

            return {
              id: String(msg.mail_id),
              from: {
                address: fromAddr,
                name: fromAddr.split('@')[0] || 'Unknown'
              },
              subject: decodedSubject.length > 0 ? decodedSubject : 'No Subject',
              intro: decodeHTML(String(msg.mail_excerpt || '')),
              seen: Boolean(msg.mail_read),
              createdAt: msg.mail_timestamp && Number(msg.mail_timestamp) > 0 
                ? new Date(msg.mail_timestamp * 1000).toISOString() 
                : new Date().toISOString()
            }
          })
        }
        return []
      }

      const response = await tempmailFetch('/messages', {
        headers: { 'Authorization': `Bearer ${this.token}` }
      })
      if (response.ok) {
        const data = await response.json()
        const rawMsgs = data['hydra:member'] || []
        return rawMsgs.map(m => ({
          ...m,
          subject: decodeHTML(String(m.subject || '')) || 'No Subject'
        }))
      }
      return []
    } catch (error) {
      console.error('Inbox error:', error)
      return []
    }
  }

  async getMessageDetails(id) {
    try {
      if (this.service === 'GuerrillaMail') {
        const response = await fetch(`https://api.guerrillamail.com/ajax.php?f=fetch_email&email_id=${encodeURIComponent(id)}&sid_token=${encodeURIComponent(this.token)}`)
        if (response.ok) {
          const data = await response.json()
          if (!data) return null
          const rawSubject = data.mail_subject !== undefined ? String(data.mail_subject) : (data.subject || '')
          const rawFrom = data.mail_from || ''
          const fromAddr = decodeHTML(String(rawFrom)).trim()

          return {
            id: String(data.mail_id),
            from: {
              address: fromAddr,
              name: fromAddr.split('@')[0] || 'Unknown'
            },
            subject: decodeHTML(rawSubject) || 'No Subject',
            text: (data.mail_body || '').replace(/<[^>]*>/g, ''),
            html: data.mail_body || '',
            seen: true,
            createdAt: data.mail_timestamp && Number(data.mail_timestamp) > 0 
              ? new Date(data.mail_timestamp * 1000).toISOString() 
              : new Date().toISOString(),
            attachments: []
          }
        }
        return null
      }

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
      if (this.service === 'GuerrillaMail') {
        await fetch(`https://api.guerrillamail.com/ajax.php?f=del_email&email_ids[]=${encodeURIComponent(id)}&sid_token=${encodeURIComponent(this.token)}`)
        return true
      }

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
  seoTitle = null,
  breadcrumbs: customBreadcrumbs = null,
  heroTitle = null,
  heroSubtitle = null,
  heroBadge = null,
  storageNamespace = 'temp-mail',
  rotateTrigger = null
}) {
  const toolData = ALL_TOOLS_MAP[seoPath] || ALL_TOOLS_MAP['/temp-mail'] || {}
  const toolTitle = toolData?.title || 'Temp Mail'
  const toolDescription = toolData?.description || 'Secure temporary email service.'

  // Use toolData for SEO and Breadcrumbs if not provided
  const finalSeoPath = seoPath || toolData?.path || '/temp-mail'
  const finalSeoTitle = seoTitle || toolData?.seo?.title || `${toolTitle} - Online Privacy Tool`
  const finalBreadcrumbs = customBreadcrumbs || [
    { name: 'Utility Tools', item: '/utility-tools' },
    { name: toolTitle, item: finalSeoPath }
  ]

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })
  const [refreshing, setRefreshing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [copiedPassword, setCopiedPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
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
        tempMailRef.current.service = saved.service || (saved.email.includes('guerrillamail') || saved.email.includes('sharklasers') ? 'GuerrillaMail' : 'Mail.tm')
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
                token: tempMailRef.current.token,
                service: tempMailRef.current.service
              })
            }
          } catch (e) { void e }
        }
        if (mounted) {
          setEmail(saved.email)
          setPassword(saved.password)
          const raw = localStorage.getItem(INBOX_PREFIX + saved.email)
          const cached = raw ? JSON.parse(raw) : []
          if (cached && cached.length) setMessages(cached)
        }
      } else {
        const newEmail = await tempMailRef.current.generateEmail()
        if (newEmail && mounted) {
          setEmail(newEmail)
          setPassword(tempMailRef.current.password)
          saveAccount({
            email: tempMailRef.current.email,
            password: tempMailRef.current.password,
            domain: tempMailRef.current.domain,
            username: tempMailRef.current.username,
            token: tempMailRef.current.token,
            service: tempMailRef.current.service
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

  const copyPassword = (e) => {
    e.stopPropagation()
    navigator.clipboard.writeText(password).then(() => {
      setCopiedPassword(true)
      showToast('Password copied to clipboard!')
      triggerRating('temp-mail')
      setTimeout(() => setCopiedPassword(false), 3000)
    })
  }

  const refreshInbox = async () => {
    setRefreshing(true)
    try {
      const msgs = await tempMailRef.current.checkInbox()
      if (msgs && Array.isArray(msgs)) {
        setMessages(msgs)
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
      setPassword(tempMailRef.current.password)
      setMessages([])
      setSelectedMessage(null)
      if (oldEmail) clearInbox(oldEmail)
      saveAccount({
        email: tempMailRef.current.email,
        password: tempMailRef.current.password,
        domain: tempMailRef.current.domain,
        username: tempMailRef.current.username,
        token: tempMailRef.current.token,
        service: tempMailRef.current.service
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
    setPassword('')
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
        {...toolData.seo}
        title={finalSeoTitle}
        description={toolDescription}
        path={finalSeoPath}
        breadcrumbs={finalBreadcrumbs}
      />



      <div className="page-container">
        <Breadcrumbs items={finalBreadcrumbs} />
        <div className="landing-layout">
          <AdSpace type="side" className="desktop-only" />

          <div className="landing-center">
            <AdSpace type="top" />

            <div className="page-hero">
              <div className="page-hero-content">
                <h1 className="page-title">
                  {(heroTitle || toolTitle).split(' ').length > 1 ? (
                    <>
                      {(heroTitle || toolTitle).split(' ').slice(0, -1).join(' ')} <span style={{ color: 'var(--accent-pink)' }}>{(heroTitle || toolTitle).split(' ').slice(-1)[0]}</span>
                    </>
                  ) : (heroTitle || toolTitle)}
                </h1>
                <p className="page-subtitle">{heroSubtitle || toolDescription}</p>
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '800px', margin: '0 auto', zIndex: 2, position: 'relative' }}>
                    <div
                      onClick={copyEmail}
                      className="tempmail-address-card"
                    >
                      <div className="tempmail-icon-glow">
                        <Mail size={22} />
                      </div>
                      <div className="tempmail-address-wrapper">
                        <span className="tempmail-label">Your Secure Email Address</span>
                        <span className="tempmail-address">
                          {email || 'Generating...'}
                        </span>
                      </div>
                      <div className={`tempmail-copy-btn ${copied ? 'copied' : ''}`}>
                        {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                      </div>
                    </div>

                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className="tempmail-address-card"
                    >
                      <div className="tempmail-icon-glow">
                        <Key size={20} />
                      </div>
                      <div className="tempmail-address-wrapper">
                        <span className="tempmail-label">Auto-Generated Password</span>
                        <span className="tempmail-address" style={{ letterSpacing: showPassword ? 'normal' : '0.15em' }}>
                          {password ? (showPassword ? password : '••••••••••••••') : 'Generating...'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', flexShrink: 0 }}>
                        <div
                          className="tempmail-copy-btn"
                          onClick={(e) => { e.stopPropagation(); setShowPassword(!showPassword) }}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </div>
                        <div
                          className={`tempmail-copy-btn ${copiedPassword ? 'copied' : ''}`}
                          onClick={copyPassword}
                        >
                          {copiedPassword ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                        </div>
                      </div>
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
                            {msg.from?.address?.split('@')?.[0] || 'Unknown Sender'}
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

            <div className="features-grid-4">
              {[
                { icon: Shield, title: 'Privacy First', desc: 'No personal data required. No tracking or logging.', color: 'var(--accent-emerald)' },
                { icon: Zap, title: 'Instant Setup', desc: 'Get a working email in under 2 seconds. Zero config.', color: 'var(--accent-orange)' },
                { icon: Clock, title: 'Auto Refresh', desc: 'Inbox checks for new mail every 5 seconds automatically.', color: 'var(--accent-primary)' },
                { icon: Mail, title: 'Real Emails', desc: 'Receive actual emails with attachments from any sender.', color: 'var(--accent-pink)' },
              ].map((feat, i) => (
                <div key={i} className="tool-card" style={{ textAlign: 'center', margin: 0, boxSizing: 'border-box' }}>
                  <div className="tool-card-icon" style={{ background: `${feat.color}15`, color: feat.color, margin: '0 auto 1rem' }}>
                    <feat.icon size={24} />
                  </div>
                  <h3 style={{ fontWeight: 900, marginBottom: '0.35rem', fontSize: '1.05rem', color: 'var(--text-primary)' }}>{feat.title}</h3>
                  <p className="tool-card-description" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>{feat.desc}</p>
                </div>
              ))}
            </div>

            <AdSpace type="bottom" />

            <div style={{ marginTop: '5rem' }}>
              <ToolContent {...toolData} />
            </div>

            <section className="tool-panel" style={{ marginTop: '4rem', textAlign: 'left' }} aria-labelledby="spam-mitigation-2026">
              <h2 id="spam-mitigation-2026" style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
                Spam Mitigation Strategy 2026
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.25rem', fontSize: '1rem' }}>
                Modern spam systems do more than send junk email. They profile user behavior, correlate signups across domains,
                and reuse leaked addresses for phishing and credential-stuffing campaigns. A disposable inbox strategy reduces
                this exposure by separating low-trust signups from your primary identity.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.5rem', fontSize: '1rem' }}>
                For best results, use dedicated temporary addresses per service category, rotate addresses after one-time OTP flows,
                and never reuse disposable inboxes for banking, recovery, or long-term account ownership. This reduces spam volume,
                limits cross-site profiling, and keeps high-value accounts isolated from breach fallout.
              </p>
              <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1.5rem', margin: '0', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <li>Use one temp address per trial platform to identify future leak sources quickly.</li>
                <li>Rotate addresses after verification to minimize retargeting and list resale spam.</li>
                <li>Keep your primary mailbox only for trusted, long-term providers.</li>
                <li>Review incoming links carefully before clicking, even inside disposable inboxes.</li>
              </ul>
            </section>

            <div className="tool-panel" style={{ marginTop: '3rem', textAlign: 'left' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
                <div id="free-temp-mail" style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '18px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(236, 72, 153, 0.12)', color: 'var(--accent-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Shield size={20} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-pink)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>100% Free & Private</span>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Free Temporary Email</h3>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6, fontSize: '0.9rem' }}>
                    Use your free temporary email for signups, verifications, and newsletters without sharing your real address. No registration required.
                  </p>
                </div>

                <div id="random-email" style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '18px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.12)', color: 'var(--accent-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <RefreshCw size={20} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-orange)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Instant Multi-Domain</span>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Random Email Address</h3>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6, fontSize: '0.9rem' }}>
                    Generate a random email address instantly. Rotate to a new address anytime to keep signups clean and anonymous.
                  </p>
                </div>

                <div id="no-registration" style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '18px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Zap size={20} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-emerald)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Zero Friction Flow</span>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>No Registration Temp Mail</h3>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6, fontSize: '0.9rem' }}>
                    Start using temp mail immediately with zero forms or accounts. Copy in one tap and receive messages in seconds.
                  </p>
                </div>
              </div>

              <div style={{ marginTop: '2.5rem' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>Related Privacy Tools</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))', gap: '1rem' }}>
                  {[
                    { title: 'Fake Email Generator', desc: 'Random temporary identities', path: '/identity-forge', badge: 'Generator' },
                    { title: 'Disposable Email', desc: 'One-time use throwaway inbox', path: '/burner-inbox', badge: 'Burner' },
                    { title: 'Throwaway Email', desc: 'Strict anti-spam privacy shield', path: '/ghost-inbox', badge: 'Ghost' },
                    { title: '10 Minute Mail', desc: 'Auto-expiring timer mailbox', path: '/temp-mail/10-minute-mail', badge: 'Timer' }
                  ].map((tool, i) => (
                    <a key={i} href={tool.path} className="tool-card" style={{ padding: '1.25rem', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ fontWeight: 800, fontSize: '1rem', margin: 0, color: 'var(--text-primary)' }}>{tool.title}</h4>
                        <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', background: 'var(--bg-secondary)', color: 'var(--accent-pink)', border: '1px solid var(--border-color)' }}>{tool.badge}</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{tool.desc}</p>
                    </a>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '3rem' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>Alternatives Comparison</h3>
                <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '450px' }}>
                    <thead>
                      <tr style={{ background: 'var(--bg-secondary)' }}>
                        <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', fontWeight: 800, fontSize: '0.85rem' }}>Service</th>
                        <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', fontWeight: 800, fontSize: '0.85rem' }}>Registration</th>
                        <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', fontWeight: 800, fontSize: '0.85rem' }}>Ads</th>
                        <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', fontWeight: 800, fontSize: '0.85rem' }}>Auto-Refresh</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { s: 'PixTool Temp Mail', r: 'No (Instant)', a: 'Minimal', f: 'Yes (5s Auto)' },
                        { s: 'TempMail.org Alternative', r: 'Varies', a: 'Heavy', f: 'Yes' },
                        { s: '10MinuteMail Alternative', r: 'No', a: 'Medium', f: 'Limited' }
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i === 0 ? 'rgba(236, 72, 153, 0.03)' : 'transparent' }}>
                          <td style={{ padding: '0.9rem 1rem', borderBottom: '1px solid var(--border-color)', fontWeight: i === 0 ? 800 : 600, color: i === 0 ? 'var(--accent-pink)' : 'var(--text-primary)', fontSize: '0.88rem' }}>{row.s}</td>
                          <td style={{ padding: '0.9rem 1rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>{row.r}</td>
                          <td style={{ padding: '0.9rem 1rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>{row.a}</td>
                          <td style={{ padding: '0.9rem 1rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>{row.f}</td>
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

        <div className="tool-panel" style={{ marginTop: '2.5rem', marginBottom: '3rem', textAlign: 'left' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-pink)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Privacy Architecture</span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 900, margin: '0.35rem 0 0.75rem', color: 'var(--text-primary)' }}>Why Use Temporary Email?</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6, fontSize: '0.95rem' }}>
              Disposable email addresses are an essential privacy shield in today's digital landscape. Protect yourself from spam, phishing, and continuous data harvesting.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
            {[
              { title: 'Avoid Spam & Junk Mail', desc: 'Keep your primary inbox clean by using disposable emails for newsletter signups, free trials, and one-time purchases.' },
              { title: 'Protect Your Privacy', desc: 'Don\'t reveal your real email address to websites you don\'t trust. Stay anonymous online and prevent tracking.' },
              { title: 'Prevent Data Breaches', desc: 'If a third-party website gets breached, your real email won\'t be exposed in leaked databases or credential dumps.' },
              { title: 'Quick Verifications & OTPs', desc: 'Get verification codes, OTPs, and confirmation links instantly without creating permanent accounts.' },
              { title: 'Test Apps & Services', desc: 'Developers and QA testers can create multiple test accounts quickly to verify signup flows and notifications.' },
              { title: 'Bypass Email Walls', desc: 'Access gated content, free downloads, whitepapers, and guides without polluting your primary inbox.' }
            ].map((item, i) => (
              <div key={i} style={{ padding: '1.25rem', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <h4 style={{ fontWeight: 800, margin: 0, fontSize: '0.98rem', color: 'var(--text-primary)' }}>{item.title}</h4>
                <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5, fontSize: '0.85rem' }}>{item.desc}</p>
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
                            {msg.from?.address?.split('@')?.[0] || 'Unknown'}
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
              <div style={{ flex: 1, display: isMobile && mobilePane === 'list' ? 'none' : 'flex', flexDirection: 'column', background: 'var(--bg-primary)', minWidth: 0, overflow: 'hidden', textAlign: 'left' }}>
                <div className="modal-header" style={{
                  borderBottom: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                  padding: isMobile ? '0.75rem 1rem' : '1.25rem 1.5rem',
                  background: 'var(--bg-primary)',
                  textAlign: 'left'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0, flex: 1 }}>
                    {isMobile && (
                      <button className="btn-icon" onClick={() => setMobilePane('list')} aria-label="Back to inbox" style={{ width: '32px', height: '32px', flexShrink: 0 }}><ArrowLeft size={16} /></button>
                    )}
                    <h3 style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: isMobile ? '0.95rem' : '1.1rem', fontWeight: 800 }}>
                      {selectedMessage.subject || '(No Subject)'}
                    </h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
                    {!isMobile && (
                      <div style={{ display: 'flex', background: 'var(--bg-secondary)', borderRadius: '10px', padding: '2px' }}>
                        <button className="btn-icon" onClick={navPrev} disabled={currentIndex <= 0} style={{ border: 'none', width: '30px', height: '30px' }} aria-label="Previous message"><ArrowLeft size={16} /></button>
                        <button className="btn-icon" onClick={navNext} disabled={currentIndex < 0 || currentIndex >= displayed.length - 1} style={{ border: 'none', width: '30px', height: '30px' }} aria-label="Next message"><ArrowRight size={16} /></button>
                      </div>
                    )}
                    <button className="btn-icon" onClick={toggleReadUnread} style={{ width: '32px', height: '32px' }} aria-label={selectedMessage.seen ? "Mark as unread" : "Mark as read"}>{selectedMessage.seen ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                    <button className="btn-icon" onClick={deleteCurrent} style={{ color: 'var(--accent-red)', width: '32px', height: '32px' }} aria-label="Delete message"><Trash2 size={16} /></button>
                    <button className="btn-icon" onClick={() => setSelectedMessage(null)} style={{ background: 'var(--bg-secondary)', borderRadius: '50%', width: '32px', height: '32px' }} aria-label="Close message"><X size={16} /></button>
                  </div>
                </div>
                <div
                  className="modal-body"
                  style={{ padding: isMobile ? '0.85rem' : '2rem', overflow: 'auto', background: 'var(--bg-primary)', textAlign: 'left' }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: isMobile ? '0.75rem' : '1.25rem',
                    marginBottom: isMobile ? '0.85rem' : '1.5rem',
                    padding: isMobile ? '0.75rem 1rem' : '1.25rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: '16px',
                    border: '1px solid var(--border-color)',
                    textAlign: 'left'
                  }}>
                    <div style={{
                      width: isMobile ? '38px' : '48px',
                      height: isMobile ? '38px' : '48px',
                      borderRadius: '12px',
                      background: 'var(--accent-pink)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: isMobile ? '1.1rem' : '1.35rem',
                      flexShrink: 0
                    }}>
                      {(selectedMessage.from?.address || '?').charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.25rem' }}>
                        <div style={{ minWidth: 0, flex: 1, textAlign: 'left' }}>
                          <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)', wordBreak: 'break-word', textAlign: 'left' }}>
                            {selectedMessage.from?.name || selectedMessage.from?.address?.split('@')?.[0] || 'Unknown Sender'}
                          </div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 500, wordBreak: 'break-all', marginTop: '2px', textAlign: 'left' }}>
                            From: {selectedMessage.from?.address}
                          </div>
                        </div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, flexShrink: 0, textAlign: isMobile ? 'left' : 'right', marginTop: isMobile ? '4px' : '0' }}>
                          {detailsLoading && <Loader size={14} className="spinning" style={{ marginRight: '4px', verticalAlign: 'middle' }} />}
                          <span>{new Date(selectedMessage.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}, {new Date(selectedMessage.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{
                    padding: isMobile ? '1rem' : '1.5rem',
                    background: 'var(--bg-primary)',
                    borderRadius: '16px',
                    minHeight: '260px',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-sm)',
                    position: 'relative',
                    overflow: 'hidden',
                    textAlign: 'left'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
                      <button
                        onClick={() => {
                          const content = selectedMessage.text || selectedMessage.html?.replace(/<[^>]*>/g, '') || '';
                          navigator.clipboard.writeText(content);
                          showToast('Message copied!');
                        }}
                        style={{
                          padding: '0.35rem 0.75rem',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          borderRadius: '8px',
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-secondary)',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Copy size={12} />
                        Copy Text
                      </button>
                    </div>
                    {selectedMessage.html ? (
                      <div
                        style={{
                          lineHeight: 1.65,
                          fontSize: '0.92rem',
                          color: 'var(--text-primary)',
                          fontFamily: 'var(--font-sans)',
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word',
                          overflowX: 'auto',
                          textAlign: 'left'
                        }}
                        dangerouslySetInnerHTML={{
                          __html: sanitizeHtml(selectedMessage.html || '')
                        }}
                      />
                    ) : (
                      <div style={{
                        whiteSpace: 'pre-wrap',
                        lineHeight: 1.65,
                        fontSize: '0.92rem',
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-sans)',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        textAlign: 'left'
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
      <ShareTool title={toolTitle} url={finalSeoPath} text={toolDescription} />

    </>
  )
}
