import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FileText, Upload, Download, Loader, X, ChevronDown, Share2, Eye, EyeOff } from 'lucide-react'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import AdSpace from '../components/AdSpace'
import Breadcrumbs from '../components/Breadcrumbs'
import ShareTool from '../components/ShareTool'
import { useFileDrop } from '../hooks/useFileDrop'
import { PDF_TOOLS } from '../data/tools'
import { PDF_SEO_CONTENT, PDF_RELATED_TOOLS, PDF_READ_NEXT } from '../data/pdfToolsData'
import ComingSoon from '../components/ComingSoon'
import ToolCard from '../components/ToolCard'
import { mergePdfs, splitPdf, watermarkPdf, compressPdf, unlockPdfWithPassword, extractPdfText, extractPdfTextWithTesseract, downloadBlob } from '../utils/pdfUtils'
import { SITE_URL, SITE_NAME } from '../data/constants'

const tools = PDF_TOOLS;

export default function PdfTools() {
  const { toolId } = useParams()
  const navigate = useNavigate()
  const initialTool = tools.find(t => t.id === toolId)?.id || 'merge'
  const [activeTool, setActiveTool] = useState(initialTool)
  const { files, setFiles, handleFiles, removeFile, moveFile } = useFileDrop(['application/pdf'])
  const [processing, setProcessing] = useState(false)
  const [showMobileSettings, setShowMobileSettings] = useState(false)
  const [settings, setSettings] = useState({
    quality: 'medium',
    startPage: 1,
    endPage: 1,
    outputFormat: 'png',
    compressionLevel: 'recommended',
    password: '',
    confirmPassword: '',
    unlockPassword: '',
    showUnlockPassword: false,
    pdfWatermarkText: 'CONFIDENTIAL',
    pdfWatermarkSize: 48,
    pdfWatermarkOpacity: 30,
    ocrOutputFormat: 'txt',
    ocrIncludePageBreaks: true,
    ocrMethod: 'text-extraction', // 'text-extraction' or 'tesseract'
    ocrLanguages: ['eng'], // Array of language codes
    ocrShowAdvanced: false
  })
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (toolId) {
      const validTool = tools.find(t => t.id === toolId)
      if (validTool) {
        setActiveTool(validTool.id)
      } else {
        navigate('/pdf-tools', { replace: true })
      }
    } else {
      setActiveTool(null)
    }
  }, [toolId, navigate])

  const handleFileSelect = (e) => {
    if (e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const sortFiles = (criterion) => {
    setFiles(prev => {
      const newFiles = [...prev];
      if (criterion === 'name') {
        newFiles.sort((a, b) => a.name.localeCompare(b.name));
      } else if (criterion === 'size') {
        newFiles.sort((a, b) => a.size - b.size);
      }
      return newFiles;
    });
  };

  const processPdf = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    try {
      if (activeTool === 'merge') {
        const pdfBytes = await mergePdfs(files);
        downloadBlob(new Blob([pdfBytes], { type: 'application/pdf' }), 'merged-pixtool.pdf');
      } else if (activeTool === 'split') {
        const pdfBytes = await splitPdf(files[0], settings.startPage, settings.endPage);
        downloadBlob(new Blob([pdfBytes], { type: 'application/pdf' }), `split-${files[0].name}`);
      } else if (activeTool === 'watermark') {
        for (const file of files) {
          const pdfBytes = await watermarkPdf(file, settings.pdfWatermarkText, settings.pdfWatermarkSize, settings.pdfWatermarkOpacity);
          downloadBlob(new Blob([pdfBytes], { type: 'application/pdf' }), `watermarked-${file.name}`);
        }
      } else if (activeTool === 'compress') {
        for (const file of files) {
          const pdfBytes = await compressPdf(file, settings.compressionLevel);
          downloadBlob(new Blob([pdfBytes], { type: 'application/pdf' }), `compressed-${file.name}`);
        }
      } else if (activeTool === 'unlock') {
        // Enhanced unlock with password support
        for (const file of files) {
          try {
            const result = await unlockPdfWithPassword(file, settings.unlockPassword || null);
            
            if (result.success) {
              const baseName = file.name.replace(/\.pdf$/i, '');
              downloadBlob(new Blob([result.bytes], { type: 'application/pdf' }), `${baseName}-unlocked.pdf`);
            } else if (result.requiresPassword) {
              // Prompt user for password
              const password = prompt(`This PDF is password-protected. Enter password for ${file.name}:`);
              if (password) {
                const retryResult = await unlockPdfWithPassword(file, password);
                if (retryResult.success) {
                  const baseName = file.name.replace(/\.pdf$/i, '');
                  downloadBlob(new Blob([retryResult.bytes], { type: 'application/pdf' }), `${baseName}-unlocked.pdf`);
                } else {
                  alert(`Failed to unlock ${file.name}: ${retryResult.error}`);
                }
              }
            } else {
              alert(`${result.error || 'Could not unlock ' + file.name}`);
            }
          } catch (err) {
            alert(`Error unlocking ${file.name}: ${err.message}`);
          }
        }
      } else if (activeTool === 'ocr') {
        // Advanced OCR with method selection
        for (const file of files) {
          try {
            let result;
            
            if (settings.ocrMethod === 'tesseract') {
              // Use Tesseract.js for full OCR (scanned images)
              result = await extractPdfTextWithTesseract(file, {
                languages: settings.ocrLanguages,
                includePageBreaks: settings.ocrIncludePageBreaks,
                onProgress: (progress) => {
                  console.log(`OCR Progress: ${progress.progress?.toFixed(1)}%`);
                }
              });
            } else {
              // Use standard text extraction (embedded text)
              result = await extractPdfText(file, {
                includePageBreaks: settings.ocrIncludePageBreaks
              });
            }

            const baseName = file.name.replace(/\.pdf$/i, '');
            const extension = settings.ocrOutputFormat === 'md' ? 'md' : 'txt';
            const header = settings.ocrOutputFormat === 'md'
              ? `# OCR Export: ${file.name}\n\nPages with extractable text: ${result.recognizedPages}/${result.pageCount}\nMethod: ${result.method === 'tesseract' ? 'Full OCR (Tesseract.js)' : 'Text Extraction'}\n\n`
              : `OCR Export: ${file.name}\nPages with extractable text: ${result.recognizedPages}/${result.pageCount}\nMethod: ${result.method === 'tesseract' ? 'Full OCR (Tesseract.js)' : 'Text Extraction'}\n\n`;

            downloadBlob(
              new Blob([`${header}${result.text}`], { type: 'text/plain;charset=utf-8' }),
              `${baseName}-ocr.${extension}`
            );

            if (result.recognizedPages === 0 && settings.ocrMethod === 'text-extraction') {
              alert(`No extractable text found in ${file.name}. Try switching to "Full OCR (Tesseract)" for scanned images.`);
            }
          } catch (err) {
            alert(`OCR failed for ${file.name}: ${err.message}`);
          }
        }
      }
    } catch (err) {
      console.error('PDF Error:', err);
      alert('Error processing PDF: ' + err.message);
    } finally {
      setProcessing(false);
    }
  }

  const activeToolData = activeTool ? tools.find(t => t.id === activeTool) : null

  const seoContentMap = PDF_SEO_CONTENT;
  const seoContent = activeTool ? seoContentMap[activeTool] : null;

  const pageTitle = activeToolData ? `Free Online ${activeToolData.title} Tool | PixTool` : "Free PDF Merger & Splitter Online | Secure PDF Tools"
  const pageDescription = activeToolData ?
    seoContentMap[activeTool]?.description :
    "Free online PDF tools to merge PDFs, split pages, and compress PDF securely. No upload required, absolutely zero privacy risk."
  const pageKeywords = activeToolData ?
    seoContentMap[activeTool]?.keywords :
    "free pdf merger online, split pdf without upload, compress pdf securely, online pdf tools free, merge pdf files, secure pdf editor"
  const canonicalPath = activeTool ? `/pdf-tools/${activeTool}` : "/pdf-tools"

  const pdfHubSchema = activeTool ? null : [
    {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Free Secure PDF Tools - PixTool",
        "description": pageDescription,
        "url": `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}/pdf-tools`
    },
    {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": tools.map((tool, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "SoftwareApplication",
                "name": tool.title,
                "description": tool.description,
                "applicationCategory": "BusinessApplication"
            }
        }))
    }
  ];

  const renderSidebarSettings = () => (
    <div className="sidebar-settings-content">
      <div className="settings-header">
        <h2 className="settings-title">
          {activeToolData?.title} Settings
        </h2>
        <p className="settings-subtitle">
          Configure your PDF processing options.
        </p>
      </div>

      <div className="settings-group" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {activeTool === 'merge' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="input-group">
              <label className="input-label">Sort Files</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className="btn btn-secondary"
                  style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem' }}
                  onClick={() => sortFiles('name')}
                >
                  Name (A-Z)
                </button>
                <button
                  className="btn btn-secondary"
                  style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem' }}
                  onClick={() => sortFiles('size')}
                >
                  Size
                </button>
              </div>
            </div>

            <button
              className="btn btn-secondary"
              style={{ width: '100%', color: '#ef4444', borderColor: '#fee2e2' }}
              onClick={() => setFiles([])}
            >
              Clear All Files
            </button>

            <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                <strong>Tip:</strong> Files will be merged in the order they appear. Use the arrows on cards to reorder manually.
              </p>
            </div>
          </div>
        )}

        {activeTool === 'compress' && (
          <div className="input-group">
            <label className="input-label">Compression Level</label>
            <select
              className="select"
              value={settings.compressionLevel}
              onChange={(e) => setSettings({ ...settings, compressionLevel: e.target.value })}
            >
              <option value="extreme">Extreme (Smallest size, lower quality)</option>
              <option value="recommended">Recommended (Good size, high quality)</option>
              <option value="less">Less (High size, best quality)</option>
            </select>
          </div>
        )}

        {activeTool === 'split' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="input-group">
              <label className="input-label">Start Page</label>
              <input
                type="number"
                className="input"
                min={1}
                value={settings.startPage}
                onChange={(e) => setSettings(s => ({ ...s, startPage: parseInt(e.target.value) || 1 }))}
              />
            </div>
            <div className="input-group">
              <label className="input-label">End Page</label>
              <input
                type="number"
                className="input"
                min={1}
                value={settings.endPage}
                onChange={(e) => setSettings(s => ({ ...s, endPage: parseInt(e.target.value) || 1 }))}
              />
            </div>
          </div>
        )}

        {activeTool === 'convert' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="input-group">
                <label className="input-label">Output Format</label>
                <select
                  className="select"
                  value={settings.outputFormat}
                  onChange={(e) => setSettings(s => ({ ...s, outputFormat: e.target.value }))}
                >
                  <option value="png">PNG</option>
                  <option value="jpg">JPG</option>
                  <option value="webp">WebP</option>
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Image Quality</label>
                <select
                  className="select"
                  value={settings.quality}
                  onChange={(e) => setSettings(s => ({ ...s, quality: e.target.value }))}
                >
                  <option value="high">High (300 DPI)</option>
                  <option value="medium">Medium (200 DPI)</option>
                  <option value="low">Low (72 DPI)</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="input-group">
                <label className="input-label">Start Page</label>
                <input
                  type="number"
                  className="input"
                  min={1}
                  value={settings.startPage}
                  onChange={(e) => setSettings(s => ({ ...s, startPage: parseInt(e.target.value) || 1 }))}
                />
              </div>
              <div className="input-group">
                <label className="input-label">End Page</label>
                <input
                  type="number"
                  className="input"
                  min={1}
                  value={settings.endPage}
                  onChange={(e) => setSettings(s => ({ ...s, endPage: parseInt(e.target.value) || 1 }))}
                />
              </div>
            </div>
          </div>
        )}

        {activeTool === 'protect' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                type="password"
                className="input"
                value={settings.password}
                onChange={(e) => setSettings(s => ({ ...s, password: e.target.value }))}
                placeholder="Enter password"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Confirm Password</label>
              <input
                type="password"
                className="input"
                value={settings.confirmPassword}
                onChange={(e) => setSettings(s => ({ ...s, confirmPassword: e.target.value }))}
                placeholder="Confirm password"
              />
            </div>
            {settings.password && settings.confirmPassword && settings.password !== settings.confirmPassword && (
              <p style={{ color: '#ef4444', fontSize: '0.8rem' }}>Passwords do not match</p>
            )}
          </div>
        )}

        {activeTool === 'watermark' && (
          <>
            <div className="input-group">
              <label className="input-label">Watermark Text</label>
              <input
                type="text"
                className="input"
                value={settings.pdfWatermarkText}
                onChange={(e) => setSettings(s => ({ ...s, pdfWatermarkText: e.target.value }))}
                placeholder="e.g., CONFIDENTIAL"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Font Size: {settings.pdfWatermarkSize}px</label>
              <input
                type="range"
                min={12}
                max={120}
                value={settings.pdfWatermarkSize}
                onChange={(e) => setSettings(s => ({ ...s, pdfWatermarkSize: parseInt(e.target.value) }))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>
            <div className="input-group">
              <label className="input-label">Opacity: {settings.pdfWatermarkOpacity}%</label>
              <input
                type="range"
                min={10}
                max={100}
                value={settings.pdfWatermarkOpacity}
                onChange={(e) => setSettings(s => ({ ...s, pdfWatermarkOpacity: parseInt(e.target.value) }))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>
          </>
        )}

        {activeTool === 'reorder' && (
          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Upload your PDF and drag page thumbnails in the preview area to reorder them as you wish.
            </p>
          </div>
        )}

        {activeTool === 'unlock' && (
          <>
            <div className="input-group">
              <label className="input-label">Password (if required)</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type={settings.showUnlockPassword ? 'text' : 'password'}
                  className="input"
                  value={settings.unlockPassword}
                  onChange={(e) => setSettings(s => ({ ...s, unlockPassword: e.target.value }))}
                  placeholder="Enter password if PDF is encrypted"
                  style={{ paddingRight: '2.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setSettings(s => ({ ...s, showUnlockPassword: !s.showUnlockPassword }))}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {settings.showUnlockPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                🔒 Removes common PDF permission locks and encryption. Enter password only if the PDF is password-protected. Processing is 100% browser-based and private.
              </p>
            </div>
          </>
        )}

        {activeTool === 'ocr' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="input-group">
              <label className="input-label">OCR Method</label>
              <select
                className="select"
                value={settings.ocrMethod}
                onChange={(e) => setSettings(s => ({ ...s, ocrMethod: e.target.value }))}
              >
                <option value="text-extraction">Text Extraction (Fast - Embedded Text Only)</option>
                <option value="tesseract">Full OCR (Tesseract.js - Scanned Images)</option>
              </select>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.5rem 0 0', lineHeight: 1.4 }}>
                {settings.ocrMethod === 'text-extraction' 
                  ? '✓ Fast extraction for PDFs with embedded text. Returns empty for image-only scans.' 
                  : '✓ Full OCR for scanned documents. Slower but works on any PDF, even image-only.'}
              </p>
            </div>

            {settings.ocrMethod === 'tesseract' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div className="input-group">
                  <label className="input-label">OCR Languages</label>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0 0 0.5rem' }}>
                    Select languages to recognize (multiple supported)
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    {[
                      { code: 'eng', name: 'English' },
                      { code: 'spa', name: 'Spanish' },
                      { code: 'fra', name: 'French' },
                      { code: 'deu', name: 'German' },
                      { code: 'ita', name: 'Italian' },
                      { code: 'por', name: 'Portuguese' },
                      { code: 'rus', name: 'Russian' },
                      { code: 'jpn', name: 'Japanese' },
                      { code: 'kor', name: 'Korean' },
                      { code: 'zho', name: 'Chinese' }
                    ].map(lang => (
                      <label key={lang.code} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                        <input
                          type="checkbox"
                          checked={settings.ocrLanguages.includes(lang.code)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSettings(s => ({ ...s, ocrLanguages: [...s.ocrLanguages, lang.code] }));
                            } else {
                              setSettings(s => ({ ...s, ocrLanguages: s.ocrLanguages.filter(l => l !== lang.code) }));
                            }
                          }}
                        />
                        <span>{lang.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                    ⚠️ First run downloads language models (~50MB+). Requires stable internet. Processing may take 1-5 minutes per page.
                  </p>
                </div>
              </div>
            )}

            <div className="input-group">
              <label className="input-label">Output Format</label>
              <select
                className="select"
                value={settings.ocrOutputFormat}
                onChange={(e) => setSettings(s => ({ ...s, ocrOutputFormat: e.target.value }))}
              >
                <option value="txt">TXT (Plain Text)</option>
                <option value="md">Markdown</option>
              </select>
            </div>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
              <input
                type="checkbox"
                checked={settings.ocrIncludePageBreaks}
                onChange={(e) => setSettings(s => ({ ...s, ocrIncludePageBreaks: e.target.checked }))}
              />
              <span className="input-label" style={{ margin: 0 }}>Include page separators</span>
            </label>

            <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                {settings.ocrMethod === 'tesseract' 
                  ? '🤖 Full OCR mode uses Tesseract.js (WASM). First run downloads ~50MB language models. Works fully offline after that.'
                  : '📄 Extract embedded/selectable text from PDF pages. Fast but limited to PDFs with embedded text.'}
              </p>
            </div>
          </div>
        )}
      </div>

      <button className="btn btn-primary" style={{ width: '100%', marginTop: 'auto', background: 'var(--accent-blue)', borderColor: 'var(--accent-blue)' }} onClick={processPdf}>
        {processing ? <Loader size={18} className="spinning" /> : <Download size={18} />}
        {processing ? 'Processing...' : `${activeToolData?.title} Now`}
      </button>
    </div>
  )

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords={pageKeywords}
        path={canonicalPath}
        schema={pdfHubSchema}
        toolSteps={seoContent?.howTo}
        faqs={seoContent?.faq}
        screenshot={activeToolData?.screenshot ? `${import.meta.env.VITE_SITE_URL}/screenshots/${activeToolData.screenshot}` : null}
        imageAlt={activeToolData?.imageAlt}
        imageTitle={activeToolData?.imageTitle}

        breadcrumbs={[
          { name: 'PDF Tools', item: '/pdf-tools' },
          activeToolData && { name: activeToolData.title, item: `/pdf-tools/${activeTool}` }
        ].filter(Boolean)}
      />

      <div className="page-container" style={{ maxWidth: '100%', padding: (files.length > 0) ? '0' : '2rem' }}>
        {activeTool && (
          <div style={{ padding: (files.length > 0) ? '1rem 2rem 0' : '0' }}>
            <Breadcrumbs items={[
              { name: 'PDF Tools', item: '/pdf-tools' },
              { name: activeToolData.title, item: `/pdf-tools/${activeTool}` }
            ]} />
          </div>
        )}

        {activeToolData?.status === 'coming-soon' ? (
          <>
            <ComingSoon 
              toolName={activeToolData.title} 
              description={activeToolData.description} 
            />
            <div style={{ marginTop: '5rem', padding: '0 2rem' }}>
              {seoContent ? (
                <ToolContent
                  title={activeToolData?.title || 'PDF Tool'}
                  description={seoContent.description}
                  benefits={seoContent.benefits}
                  howTo={seoContent.howTo}
                  faq={seoContent.faq}
                  tips={seoContent.tips}
                  useCases={seoContent.useCases}
                  relatedTools={PDF_RELATED_TOOLS[activeTool] || []}
                  readNext={PDF_READ_NEXT[activeTool] || []}
                  alternativeTo={seoContent.alternativeTo || []}
                />
              ) : (
                <ToolContent
                  title={activeToolData?.title || 'PDF Tool'}
                  description={`Our ${activeToolData?.title || 'PDF Tool'} is an upcoming powerful browser-based utility for professional document management.`}
                  benefits={["100% Privacy — files never leave your device", "No registration or signup required", "Secure local processing", "Free for professional use"]}
                  howTo={["Wait for the tool to be released", "Upload your PDF documents", "Apply professional edits", "Download secured files"]}
                  relatedTools={[
                    { name: 'All PDF Tools', path: '/pdf-tools' },
                    { name: 'Image Tools', path: '/image-tools' }
                  ]}
                />
              )}
            </div>
          </>
        ) : !activeTool ? (
          /* CATEGORY HUB MODE */
          <div className="landing-layout">
            <div className="landing-center">
              <div className="page-hero">
                <div className="page-hero-content">
                  <h1 className="page-title">PDF <span style={{ color: 'var(--accent-blue)' }}>Suite</span></h1>
                  <p className="page-subtitle">
                    The most efficient way to manage your PDF workflows. Merge, split, compress, and convert documents locally for ultimate security.
                  </p>
                </div>
              </div>

              <div className="tools-grid" style={{ marginBottom: '6rem' }}>
                {tools.map(tool => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginTop: '5rem' }}>
                {[
                  { icon: FileText, title: 'Secure & Private', desc: 'Files are processed in your browser. No server uploads.' },
                  { icon: Upload, title: 'No Limits', desc: 'Upload and process multiple PDF files at once, completely free.' },
                  { icon: Loader, title: 'Lightning Fast', desc: 'Native browser processing ensures high-speed execution.' }
                ].map((feat, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--accent-blue)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                      <feat.icon size={36} />
                    </div>
                    <h4 style={{ fontWeight: 900, marginBottom: '0.75rem', fontSize: '1.1rem' }}>{feat.title}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{feat.desc}</p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '5rem' }}>
                <ToolContent
                  title="PDF PixTool"
                  description="Our PDF suite offers military-grade security by processing all your sensitive documents directly in your browser. No files are ever uploaded or stored on any server."
                  benefits={["Offline Processing", "High Performance", "Multi-file Support", "100% Free Forever"]}
                  howTo={["Pick a PDF tool from the list", "Upload your documents", "Set your preferences", "Save the result instantly"]}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="landing-layout">
            <AdSpace type="side" className="desktop-only" />

            <div className="landing-center">
              <AdSpace type="top" />

              {files.length === 0 ? (
                /* LANDING MODE */
                <>
                  <div className="page-hero">
                    <div className="page-hero-content">
                      <h1 className="page-title">{activeToolData.title}</h1>
                      <p className="page-subtitle">
                        {activeToolData.description}
                      </p>
                    </div>
                  </div>

                  <div
                    className="tool-panel"
                    style={{
                      height: '350px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px dashed var(--accent-blue)',
                      background: 'var(--bg-secondary)',
                      cursor: 'pointer',
                      transition: 'var(--transition)',
                      textAlign: 'center'
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault()
                      handleFiles(e.dataTransfer.files)
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--accent-blue)'}
                  >
                    <div className="tool-card-icon" style={{ background: 'var(--accent-blue-50)', color: 'var(--accent-blue)', width: '80px', height: '80px', borderRadius: '24px', marginBottom: '2rem' }}>
                      <Upload size={32} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>Select or Drop PDF Files</h3>
                    <p style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Works in your browser. Maximum privacy.</p>
                    <button className="btn btn-primary" style={{ marginTop: '2rem', padding: '1rem 2.5rem' }}>
                      Browse Files
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginTop: '5rem' }}>
                    {[
                      { icon: FileText, title: 'Secure & Private', desc: 'Files are processed in your browser. No server uploads.' },
                      { icon: Upload, title: 'No Limits', desc: 'Upload and process multiple PDF files at once, completely free.' },
                      { icon: Loader, title: 'Lightning Fast', desc: 'Native browser processing ensures high-speed execution.' }
                    ].map((feat, i) => (
                      <div key={i} style={{ textAlign: 'center' }}>
                        <div style={{ color: 'var(--accent-blue)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                          <feat.icon size={36} />
                        </div>
                        <h4 style={{ fontWeight: 900, marginBottom: '0.75rem', fontSize: '1.1rem' }}>{feat.title}</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{feat.desc}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* EDITOR MODE */
                <div className="sidebar-layout">
                  <aside className="sidebar-settings tool-panel" style={{ position: 'sticky', top: '2rem', height: 'fit-content' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
                      <button className="btn btn-secondary" style={{ padding: '0.75rem' }} onClick={() => fileInputRef.current.click()}>
                        <Upload size={20} />
                      </button>
                      <button className="btn btn-secondary" style={{ padding: '0.75rem', marginLeft: 'auto' }} onClick={() => setFiles([])}>
                        <X size={20} />
                      </button>
                    </div>

                    {renderSidebarSettings()}
                  </aside>

                  <main className="preview-main">
                    <div className="tool-container">
                      <div className="tool-panel">
                        <div className="tool-panel-content">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, margin: 0 }}>
                              Files ({files.length})
                            </h3>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                              <button className="btn btn-secondary" onClick={() => fileInputRef.current?.click()} style={{ padding: '0.6rem 1.25rem' }}>
                                <Upload size={18} /> Add More
                              </button>
                              <button className="btn btn-primary" onClick={processPdf} style={{ padding: '0.6rem 2rem' }}>
                                <Download size={18} /> {processing ? 'Processing...' : `${activeToolData?.title} Now`}
                              </button>
                            </div>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem' }}>
                            {files.map((file, idx) => (
                              <div key={idx} className="tool-card" style={{ padding: '1.5rem', position: 'relative', textAlign: 'center' }}>
                                <button
                                  onClick={() => removeFile(idx)}
                                  className="btn-icon"
                                  style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', padding: '0.4rem', background: 'var(--bg-glass)', borderRadius: '8px', zIndex: 5 }}
                                  aria-label={`Remove file ${file.name}`}
                                >
                                  <X size={14} />
                                </button>

                                {activeTool === 'merge' && (
                                  <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', display: 'flex', gap: '0.25rem', zIndex: 5 }}>
                                    <button
                                      onClick={() => moveFile(idx, 'left')}
                                      disabled={idx === 0}
                                      className="btn-icon"
                                      style={{ padding: '0.4rem', background: 'var(--bg-glass)', borderRadius: '8px', opacity: idx === 0 ? 0.3 : 1 }}
                                      aria-label={`Move ${file.name} up`}
                                    >
                                      <ChevronDown size={14} style={{ transform: 'rotate(90deg)' }} />
                                    </button>
                                    <button
                                      onClick={() => moveFile(idx, 'right')}
                                      disabled={idx === files.length - 1}
                                      className="btn-icon"
                                      style={{ padding: '0.4rem', background: 'var(--bg-glass)', borderRadius: '8px', opacity: idx === files.length - 1 ? 0.3 : 1 }}
                                      aria-label={`Move ${file.name} down`}
                                    >
                                      <ChevronDown size={14} style={{ transform: 'rotate(-90deg)' }} />
                                    </button>
                                  </div>
                                )}

                                <div style={{ color: 'var(--accent-blue)', marginBottom: '1.25rem', display: 'flex', justifyContent: 'center' }}>
                                  <div style={{ padding: '0.75rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '12px' }}>
                                    <FileText size={40} />
                                  </div>
                                </div>
                                <p style={{ fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }}>
                                  {file.name}
                                </p>
                                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: '0.25rem 0 0' }}>
                                  {(file.size / 1024).toFixed(1)} KB
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </main>
                </div>
              )}

              <AdSpace type="bottom" />

              <div style={{ marginTop: '5rem' }}>
                {seoContent && (
                  <ToolContent
                    title={activeToolData?.title || 'PDF Tool'}
                    description={seoContent.description}
                    benefits={seoContent.benefits}
                    howTo={seoContent.howTo}
                    faq={seoContent.faq}
                    tips={seoContent.tips}
                    useCases={seoContent.useCases}
                    relatedTools={PDF_RELATED_TOOLS[activeTool] || []}
                    readNext={PDF_READ_NEXT[activeTool] || []}
                    alternativeTo={seoContent.alternativeTo || []}
                  />
                )}
              </div>
            </div>

            <AdSpace type="side" className="desktop-only" />
          </div>
        )
}

        {/* Mobile Settings Modal */}
        {
          showMobileSettings && (
            <div className="settings-modal-overlay" onClick={() => setShowMobileSettings(false)}>
              <div className="settings-modal-content" onClick={e => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Settings</h3>
                  <button className="btn-icon" onClick={() => setShowMobileSettings(false)} style={{ background: 'var(--bg-secondary)' }} aria-label="Close settings"><X /></button>
                </div>
                {renderSidebarSettings()}
              </div>
            </div>
          )
        }

        {
          processing && (
            <div className="processing-overlay">
              <div className="processing-loader"></div>
              <p className="processing-text">Processing your PDF...</p>
            </div>
          )
        }
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        <style dangerouslySetInnerHTML={{
          __html: `
          .remove-file-btn:hover {
            transform: scale(1.1);
            background: #ffffff !important;
            box-shadow: 0 6px 16px rgba(239, 68, 68, 0.2) !important;
            color: #dc2626 !important;
          }
          .remove-file-btn:active {
            transform: scale(0.95);
          }
        `}} />
      </div >
      <ShareTool title={`Free Online ${activeToolData?.title || 'PDF Tools'} | PixTool`} />
    </>
  )
}
