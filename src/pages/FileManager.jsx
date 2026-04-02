import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Folder, File, Upload, Search, 
  Trash2, Download, MoreVertical, 
  Plus, Eye, Grid, List, ChevronRight, X,
  HardDrive, FolderPlus, ArrowLeft, FileText, Image as ImageIcon, Video, Music
} from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import AdSpace from '../components/AdSpace'
import { PRODUCTIVITY_SEO_CONTENT } from '../data/productivityToolsData'
import { pixDB, STORES } from '../lib/db'

export default function FileManager() {
  const [items, setItems] = useState([])
  const [currentFolderId, setCurrentFolderId] = useState('root')
  const [breadcrumbs, setBreadcrumbs] = useState([{ id: 'root', name: 'My Vault' }])
  const [quota, setQuota] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const loadItems = async () => {
    try {
      const allItems = await pixDB.getAll(STORES.FILES)
      setItems(allItems)
      const q = await pixDB.getQuota()
      setQuota(q)
      setErrorMessage('')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to load stored files')
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  const navigateTo = (folder) => {
    setCurrentFolderId(folder.id)
    setBreadcrumbs((current) => [...current, folder])
  }

  const navigateBack = (index) => {
    const newBreadcrumbs = breadcrumbs.slice(0, index + 1)
    setBreadcrumbs(newBreadcrumbs)
    setCurrentFolderId(newBreadcrumbs[newBreadcrumbs.length - 1].id)
  }

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return
    setIsUploading(true)

    try {
      for (const file of files) {
        const id = Date.now().toString() + Math.random().toString(36).substr(2, 5)
        const newItem = {
          id,
          name: file.name,
          type: file.type,
          size: file.size,
          parentId: currentFolderId,
          content: file,
          isFolder: false,
          createdAt: new Date().toISOString()
        }
        await pixDB.set(STORES.FILES, newItem)
      }
      await loadItems()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to upload files')
    } finally {
      setIsUploading(false)
    }
  }

  const createFolder = async () => {
    const name = prompt('Folder Name:')
    if (!name) return
    try {
      const id = 'folder_' + Date.now().toString()
      const newFolder = {
        id,
        name,
        parentId: currentFolderId,
        isFolder: true,
        createdAt: new Date().toISOString()
      }
      await pixDB.set(STORES.FILES, newFolder)
      await loadItems()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to create folder')
    }
  }

  const deleteItem = async (id, isFolder) => {
    if (!confirm(`Delete this ${isFolder ? 'folder and all its contents' : 'file'}?`)) return
    try {
      if (isFolder) {
        await pixDB.deleteByParent(STORES.FILES, id)
      }
      await pixDB.delete(STORES.FILES, id)
      await loadItems()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to delete item')
    }
  }

  const downloadFile = (item) => {
    if (!item.content) {
      setErrorMessage('This file is missing content and cannot be downloaded')
      return
    }
    const url = URL.createObjectURL(item.content)
    const a = document.createElement('a')
    a.href = url
    a.download = item.name
    a.click()
    URL.revokeObjectURL(url)
  }

  const currentItems = items.filter(item => 
    item.parentId === currentFolderId && 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatSize = (bytes) => {
    if (!bytes) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getIcon = (item) => {
    if (item.isFolder) return <Folder fill="var(--accent-primary)" color="var(--accent-primary)" />
    const type = item.type || ''
    if (type.includes('image')) return <ImageIcon color="#10b981" />
    if (type.includes('pdf')) return <FileText color="#ef4444" />
    if (type.includes('video')) return <Video color="#6366f1" />
    return <File color="var(--text-muted)" />
  }

  return (
    <>
      <SEO 
        {...PRODUCTIVITY_SEO_CONTENT['file-manager']}
        path="/productivity-tools/file-manager"
        breadcrumbs={[{ name: 'Productivity', item: '/productivity-tools' }, { name: 'File Vault', item: '/productivity-tools/file-manager' }]}
      />

      <div className="page-container" style={{ paddingTop: '2rem' }}>
        <Breadcrumbs items={[{ name: 'Productivity', item: '/productivity-tools' }, { name: 'File Vault', item: '/productivity-tools/files' }]} />
        <div className="landing-layout">
          <AdSpace type="side" className="desktop-only" />
          <div className="landing-center" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            <AdSpace type="top" />
        <div style={{ textAlign: 'center', marginBottom: '2.5rem', paddingTop: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
            File <span style={{ color: 'var(--accent-primary)' }}>Vault</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
            Secure, browser-native file management powered by IndexedDB.
          </p>
        </div>

        {errorMessage && (
          <div style={{ maxWidth: '1200px', margin: '0 auto 1.5rem', padding: '1rem 1.25rem', borderRadius: '16px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', color: 'var(--accent-red)', fontWeight: 700 }}>
            {errorMessage}
          </div>
        )}

        <div className="vault-container" style={{ 
          background: 'var(--bg-card)', 
          borderRadius: '32px', 
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-2xl)',
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '1200px',
          margin: '2rem auto 0',
          overflow: 'hidden'
        }}>
          {/* Vault Header */}
          <div style={{ 
            padding: '1.5rem 2rem', 
            background: 'var(--bg-secondary)', 
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-card)', padding: '0.6rem 1rem', borderRadius: '12px', border: '1px solid var(--border-color)', flex: 1, maxWidth: '400px' }}>
                <Search size={18} color="var(--text-muted)" />
                <input 
                  placeholder="Search your vault..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ background: 'none', border: 'none', padding: '0 0.75rem', color: 'var(--text-primary)', outline: 'none', width: '100%' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                onClick={createFolder}
                className="btn-toolbar" 
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', borderRadius: '12px', 
                  border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-primary)', 
                  fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', transition: 'var(--transition-base)'
                }}
              >
                <FolderPlus size={18} /> New Folder
              </button>
              <label 
                className="btn btn-primary" 
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '12px', 
                  fontSize: '0.9rem', fontWeight: 800, cursor: 'pointer', marginBottom: 0
                }}
              >
                <Upload size={18} /> {isUploading ? 'Uploading...' : 'Upload Files'}
                <input type="file" multiple onChange={handleUpload} hidden />
              </label>
            </div>
          </div>

          {/* Breadcrumbs */}
          <div style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem', overflowX: 'auto', whiteSpace: 'nowrap' }}>
             {breadcrumbs.map((crumb, i) => (
                <div key={crumb.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {i > 0 && <ChevronRight size={14} color="var(--text-muted)" />}
                  <button 
                    onClick={() => navigateBack(i)}
                    style={{ 
                      background: 'none', border: 'none', color: i === breadcrumbs.length - 1 ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer'
                    }}
                  >
                    {crumb.name}
                  </button>
                </div>
             ))}
          </div>

          {/* Content Area */}
          <div style={{ flex: 1, padding: '1.5rem 2rem', overflowY: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem' }}>
              {currentItems.length > 0 ? (
                currentItems.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5 }}
                    onDoubleClick={() => item.isFolder && navigateTo(item)}
                    style={{
                      background: 'var(--bg-card)',
                      padding: '1.5rem',
                      borderRadius: '20px',
                      border: '1px solid var(--border-color)',
                      textAlign: 'center',
                      position: 'relative',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                      {getIcon(item)}
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '0.25rem' }}>
                      {item.name}
                    </div>
                    {!item.isFolder && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                        {formatSize(item.size)}
                      </div>
                    )}

                    {/* Quick Menu */}
                    <div className="item-actions" style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', display: 'flex', gap: '0.25rem' }}>
                      {!item.isFolder && (
                         <button onClick={(e) => { e.stopPropagation(); downloadFile(item); }} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', padding: '4px', cursor: 'pointer' }}>
                          <Download size={14} />
                         </button>
                      )}
                      <button onClick={(e) => { e.stopPropagation(); deleteItem(item.id, item.isFolder); }} style={{ background: 'none', border: 'none', color: 'var(--accent-red)', padding: '4px', cursor: 'pointer' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📂</div>
                  <h3 style={{ fontWeight: 800, color: 'var(--text-primary)' }}>Empty Vault</h3>
                  <p>Start by uploading files or creating folders.</p>
                </div>
              )}
            </div>
          </div>

          {/* Storage Footer */}
          <div style={{ 
            padding: '1rem 2rem', 
            background: 'var(--bg-secondary)', 
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.8rem',
            fontWeight: 800,
            color: 'var(--text-muted)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <HardDrive size={16} />
              {quota ? (
                <span>
                  Storage: {formatSize(quota.usage)} / {formatSize(quota.quota)} ({(quota.usage / quota.quota * 100).toFixed(1)}%)
                </span>
              ) : (
                <span>Storage usage unknown</span>
              )}
            </div>
            <div style={{ color: 'var(--accent-emerald)' }}>
              100% Confidential • Locally Hosted
            </div>
          </div>
        </div>

          <AdSpace type="bottom" style={{ marginTop: '4rem' }} />
          <div style={{ marginTop: '6rem' }}>
            <ToolContent {...PRODUCTIVITY_SEO_CONTENT['file-manager']} />
          </div>
              </div>
            <AdSpace type="side" className="desktop-only" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .item-actions {
          opacity: 0;
          transition: opacity 0.2s;
        }
        .vault-container div:hover > .item-actions {
          opacity: 1;
        }
      `}} />
    </>
  )
}
