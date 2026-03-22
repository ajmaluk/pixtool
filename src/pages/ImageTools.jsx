import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Maximize2, Shield, Zap, Upload, Loader, Download, Sliders, X, Share2 } from 'lucide-react'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import AdSpace from '../components/AdSpace'
import Breadcrumbs from '../components/Breadcrumbs'
import ShareTool from '../components/ShareTool'
import { useFileDrop } from '../hooks/useFileDrop'
import { IMAGE_TOOLS } from '../data/tools'
import { SITE_URL, SITE_NAME } from '../data/constants'
import { IMAGE_SEO_CONTENT, IMAGE_RELATED_TOOLS, IMAGE_READ_NEXT } from '../data/imageToolsData'
import ComingSoon from '../components/ComingSoon'
import { processImageFile } from '../utils/canvasUtils'

const tools = IMAGE_TOOLS;


export default function ImageTools() {
  const { toolId } = useParams()
  const navigate = useNavigate()
  const initialTool = tools.find(t => t.id === toolId)?.id || 'resize'
  const [activeTool, setActiveTool] = useState(initialTool)
  const { files, preview, handleFiles, handleDrop, removeFile } = useFileDrop(['image/'])
  const [processing, setProcessing] = useState(false)
  const [showMobileSettings, setShowMobileSettings] = useState(false)
  const [settings, setSettings] = useState({
    width: 800,
    height: 600,
    quality: 80,
    rotation: 0,
    maintainAspect: true,
    format: 'original',
    convertTo: 'png',
    watermarkText: 'DailyTools',
    watermarkSize: 36,
    watermarkOpacity: 50,
    watermarkPosition: 'center',
    flipDirection: 'horizontal',
    colorEffect: 'grayscale',
    cropX: 0,
    cropY: 0,
    cropWidth: 500,
    cropHeight: 500,
    cropAspectRatio: '1:1'
  })
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (toolId) {
      const validTool = tools.find(t => t.id === toolId)
      if (validTool) {
        setActiveTool(validTool.id)
      } else {
        navigate('/image-tools', { replace: true })
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

  // Image processing logic will be extracted to canvasUtils.js in the next phase
  const processImage = async () => {
    if (files.length === 0) return
    setProcessing(true)
    try {
      for (const file of files) {
        const { blob, name } = await processImageFile(file, activeTool, settings)
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = name
        a.click()
        setTimeout(() => URL.revokeObjectURL(url), 100)
      }
    } catch (error) {
      console.error('Processing error:', error)
      alert('Error processing images. Please ensure your dimensions are within image bounds.')
    } finally {
      setProcessing(false)
    }
  }

  const activeToolData = activeTool ? tools.find(t => t.id === activeTool) : null


  const seoContentMap = IMAGE_SEO_CONTENT;
  const seoContent = activeTool ? seoContentMap[activeTool] : null;

  // Dynamic SEO descriptions - enhanced for better SEO
  const pageTitle = activeToolData ? `Free Online ${activeToolData.title} Tool | DailyTools` : "Professional Online Image Tools | Resize, Crop, Rotate, Compress, Convert, Watermark, Flip, Grayscale"
  const pageDescription = activeToolData ?
    seoContentMap[activeTool]?.description :
    "Professional suite of 100% private online image tools. Resize, crop, rotate, compress, and convert images instantly in your browser. No server uploads, military-grade privacy. Best free alternative to Photoshop and Squoosh for batch processing."
  const pageKeywords = activeToolData ?
    seoContentMap[activeTool]?.keywords :
    "free image tools online, resize image high quality, crop photo online pro, rotate image no loss, compress image for web, convert image format webp, add watermark batch, flip image mirror, professional grayscale converter, sepia filter online, browser-based image editor, free Photoshop alternative, batch image processing"
  const canonicalPath = activeTool ? `/image-tools/${activeTool}` : "/image-tools"


  const renderSidebarSettings = () => (
    <div className="sidebar-settings-content">
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          {activeToolData?.title} Settings
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Configure your options to perfection.
        </p>
      </div>

      <div className="settings-group" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {activeTool === 'resize' && (
          <>
            <div className="input-group">
              <label className="input-label">Width (px)</label>
              <input
                type="number"
                className="input"
                value={settings.width}
                onChange={(e) => setSettings(s => ({ ...s, width: parseInt(e.target.value) || 100 }))}
              />
            </div>
            <div className="input-group">
              <label className="input-label">Height (px)</label>
              <input
                type="number"
                className="input"
                value={settings.height}
                onChange={(e) => setSettings(s => ({ ...s, height: parseInt(e.target.value) || 100 }))}
                disabled={settings.maintainAspect}
              />
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
              <input
                type="checkbox"
                checked={settings.maintainAspect}
                onChange={(e) => setSettings(s => ({ ...s, maintainAspect: e.target.checked }))}
              />
              <span className="input-label" style={{ margin: 0 }}>Maintain aspect ratio</span>
            </label>
          </>
        )}

        {activeTool === 'rotate' && (
          <div className="input-group">
            <label className="input-label">Rotation</label>
            <select
              className="select"
              value={settings.rotation}
              onChange={(e) => setSettings(s => ({ ...s, rotation: parseInt(e.target.value) }))}
            >
              <option value={0}>0°</option>
              <option value={90}>90°</option>
              <option value={180}>180°</option>
              <option value={270}>270°</option>
            </select>
          </div>
        )}

        {activeTool === 'compress' && (
          <div className="input-group">
            <label className="input-label">Quality: {settings.quality}%</label>
            <input
              type="range"
              min={10}
              max={100}
              value={settings.quality}
              onChange={(e) => setSettings(s => ({ ...s, quality: parseInt(e.target.value) }))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>
        )}

        {activeTool === 'convert' && (
          <div className="input-group">
            <label className="input-label">Convert To</label>
            <select
              className="select"
              value={settings.convertTo}
              onChange={(e) => setSettings(s => ({ ...s, convertTo: e.target.value }))}
            >
              <option value="png">PNG</option>
              <option value="jpg">JPEG</option>
              <option value="webp">WebP</option>
              <option value="gif">GIF</option>
            </select>
          </div>
        )}

        {activeTool === 'crop' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="input-group">
                <label className="input-label">X Pos</label>
                <input
                  type="number"
                  className="input"
                  value={settings.cropX}
                  onChange={(e) => setSettings(s => ({ ...s, cropX: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div className="input-group">
                <label className="input-label">Y Pos</label>
                <input
                  type="number"
                  className="input"
                  value={settings.cropY}
                  onChange={(e) => setSettings(s => ({ ...s, cropY: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="input-group">
                <label className="input-label">Width</label>
                <input
                  type="number"
                  className="input"
                  value={settings.cropWidth}
                  onChange={(e) => setSettings(s => ({ ...s, cropWidth: parseInt(e.target.value) || 100 }))}
                />
              </div>
              <div className="input-group">
                <label className="input-label">Height</label>
                <input
                  type="number"
                  className="input"
                  value={settings.cropHeight}
                  onChange={(e) => setSettings(s => ({ ...s, cropHeight: parseInt(e.target.value) || 100 }))}
                />
              </div>
            </div>
            <div className="input-group">
              <label className="input-label">Quick Presets</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                <button
                  className="btn btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.5rem' }}
                  onClick={() => setSettings(s => ({ ...s, cropWidth: 1080, cropHeight: 1080 }))}
                >
                  1:1 Post
                </button>
                <button
                  className="btn btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.5rem' }}
                  onClick={() => setSettings(s => ({ ...s, cropWidth: 1080, cropHeight: 1350 }))}
                >
                  4:5 Port
                </button>
                <button
                  className="btn btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.5rem' }}
                  onClick={() => setSettings(s => ({ ...s, cropWidth: 1080, cropHeight: 1920 }))}
                >
                  9:16 St
                </button>
                <button
                  className="btn btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.5rem' }}
                  onClick={() => setSettings(s => ({ ...s, cropWidth: 1280, cropHeight: 720 }))}
                >
                  16:9 HD
                </button>
                <button
                  className="btn btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.5rem' }}
                  onClick={() => setSettings(s => ({ ...s, cropWidth: 2560, cropHeight: 1440 }))}
                >
                  2K Land
                </button>
                <button
                  className="btn btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.5rem' }}
                  onClick={() => setSettings(s => ({ ...s, cropWidth: 3840, cropHeight: 2160 }))}
                >
                  4K Ultra
                </button>
              </div>
            </div>
          </>
        )}

        {activeTool === 'watermark' && (
          <>
            <div className="input-group">
              <label className="input-label">Watermark Text</label>
              <input
                type="text"
                className="input"
                value={settings.watermarkText}
                onChange={(e) => setSettings(s => ({ ...s, watermarkText: e.target.value }))}
                placeholder="Enter watermark text"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Font Size: {settings.watermarkSize}px</label>
              <input
                type="range"
                min={12}
                max={120}
                value={settings.watermarkSize}
                onChange={(e) => setSettings(s => ({ ...s, watermarkSize: parseInt(e.target.value) }))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>
            <div className="input-group">
              <label className="input-label">Opacity: {settings.watermarkOpacity}%</label>
              <input
                type="range"
                min={10}
                max={100}
                value={settings.watermarkOpacity}
                onChange={(e) => setSettings(s => ({ ...s, watermarkOpacity: parseInt(e.target.value) }))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>
            <div className="input-group">
              <label className="input-label">Position</label>
              <select
                className="select"
                value={settings.watermarkPosition}
                onChange={(e) => setSettings(s => ({ ...s, watermarkPosition: e.target.value }))}
              >
                <option value="center">Center</option>
                <option value="top-left">Top Left</option>
                <option value="top-right">Top Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="bottom-right">Bottom Right</option>
              </select>
            </div>
          </>
        )}

        {activeTool === 'flip' && (
          <div className="input-group">
            <label className="input-label">Direction</label>
            <select
              className="select"
              value={settings.flipDirection}
              onChange={(e) => setSettings(s => ({ ...s, flipDirection: e.target.value }))}
            >
              <option value="horizontal">Horizontal (Mirror)</option>
              <option value="vertical">Vertical</option>
            </select>
          </div>
        )}

        {activeTool === 'grayscale' && (
          <div className="input-group">
            <label className="input-label">Color Effect</label>
            <select
              className="select"
              value={settings.colorEffect}
              onChange={(e) => setSettings(s => ({ ...s, colorEffect: e.target.value }))}
            >
              <option value="grayscale">Black & White</option>
              <option value="sepia">Sepia (Vintage)</option>
              <option value="invert">Invert Colors</option>
            </select>
          </div>
        )}

        <div className="input-group">
          <label className="input-label">Save As</label>
          <select
            className="select"
            value={settings.format}
            onChange={(e) => setSettings({ ...settings, format: e.target.value })}
          >
            <option value="original">Original Format</option>
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
            <option value="webp">WebP</option>
          </select>
        </div>
      </div>

      <button
        className="btn btn-primary"
        style={{ width: '100%', marginTop: 'auto' }}
        onClick={processImage}
        disabled={processing || files.length === 0}
      >
        {processing ? <Loader size={18} className="spinning" /> : <Download size={18} />}
        {processing ? 'Processing...' : `Export ${files.length > 0 ? `(${files.length})` : ''}`}
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
        toolName={activeToolData?.title}
        toolSteps={seoContent?.howTo}
        breadcrumbs={[
          { name: 'Image Tools', item: '/image-tools' },
          activeToolData && { name: activeToolData.title, item: `/image-tools/${activeTool}` }
        ].filter(Boolean)}
      />

      <div className="page-container" style={{ padding: (files.length > 0) ? '0' : '2rem' }}>
        {activeTool && !preview && (
          <div style={{ padding: (files.length > 0) ? '1rem 2rem 0' : '0' }}>
            <Breadcrumbs items={[
              { name: 'Image Tools', item: '/image-tools' },
              { name: activeToolData.title, item: `/image-tools/${activeTool}` }
            ]} />
          </div>
        )}

        {activeToolData?.status === 'coming-soon' ? (
          <>
            <ComingSoon 
              toolName={activeToolData.title} 
              description={activeToolData.description} 
            />
            <div style={{ marginTop: '5rem' }}>
              {seoContent ? (
                <ToolContent
                  title={activeToolData?.title || 'Image Tool'}
                  description={seoContent.description}
                  benefits={seoContent.benefits}
                  howTo={seoContent.howTo}
                  faq={seoContent.faq}
                  tips={seoContent.tips}
                  useCases={seoContent.useCases}
                  relatedTools={IMAGE_RELATED_TOOLS[activeTool] || []}
                  readNext={IMAGE_READ_NEXT[activeTool] || []}
                  alternativeTo={seoContent.alternativeTo || []}
                />
              ) : (
                <ToolContent
                  title={activeToolData?.title || 'Image Resizer'}
                  description={`Our ${activeToolData?.title || 'Image Resizer'} is an upcoming powerful browser-based utility for professional image editing.`}
                  benefits={["100% Privacy — files never leave your device", "No registration or signup required", "Batch processing support", "All major formats supported"]}
                  howTo={["Wait for the tool to be released", "Upload your photos via drag & drop", "Apply specialized AI effects", "Download high-quality results"]}
                  relatedTools={[
                    { name: 'All Image Tools', path: '/image-tools' },
                    { name: 'PDF Tools', path: '/pdf-tools' }
                  ]}
                />
              )}
            </div>
          </>
        ) : !activeTool ? (
          /* CATEGORY HUB MODE */
          <div className="landing-layout">
            <AdSpace type="side" className="desktop-only" />

            <div className="landing-center">
              <div className="page-hero">
                <div className="page-hero-content">
                  <h1 className="page-title">Image <span style={{ color: 'var(--accent-purple)' }}>Studio</span></h1>
                  <p className="page-subtitle">
                    The most powerful way to process images online. Professional-grade scaling, compression, and editing tools that run 100% locally in your browser.
                  </p>
                </div>
              </div>

              <div className="tools-grid" style={{ marginBottom: '6rem' }}>
                {tools.map(tool => (
                  <Link
                    key={tool.id}
                    to={`/image-tools/${tool.id}`}
                    className="tool-card"
                    style={{ border: '1px solid var(--border-color)', height: '100%', textDecoration: 'none', padding: 0, overflow: 'hidden' }}
                  >
                    <div style={{ aspectRatio: '16/9', background: 'var(--bg-secondary)', overflow: 'hidden', borderBottom: '1px solid var(--border-color)' }}>
                      <img 
                        src={`/screenshots/${tool.screenshot}`} 
                        alt={`${tool.title} interface preview - Professional browser-based image ${tool.id} tool by DailyTools`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.style.background = `${tool.color}10`;
                          e.target.parentElement.innerHTML = `<div style="height: 100%; display: flex; align-items: center; justify-content: center; color: ${tool.color}"><div style="padding: 1.5rem; background: ${tool.color}15; border-radius: 20px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></div></div>`;
                        }}
                      />
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                      <div className="tool-card-header">
                        <div className="tool-card-icon" style={{ background: `${tool.color}15`, color: tool.color }}>
                          <tool.icon size={22} />
                        </div>
                        <div className="tool-card-title-group">
                          <h3 className="tool-card-title">{tool.title}</h3>
                        </div>
                      </div>
                      <p className="tool-card-description">{tool.description}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginTop: '5rem' }}>
                {[
                  { icon: Maximize2, title: 'Lossless Quality', desc: 'Advanced resampling algorithms to preserve every pixel.' },
                  { icon: Shield, title: 'Zero Uploads', desc: 'Your photos stay on your device. Military-grade privacy.' },
                  { icon: Zap, title: 'Instant Processing', desc: 'Hardware-accelerated editing directly in your browser.' }
                ].map((feat, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--accent-purple)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                      <feat.icon size={36} />
                    </div>
                    <h4 style={{ fontWeight: 900, marginBottom: '0.75rem', fontSize: '1.1rem' }}>{feat.title}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{feat.desc}</p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '5rem' }}>
                <ToolContent
                  title="Professional Image Suite"
                  description="Our image processing suite is engineered for speed and absolute privacy. Unlike traditional cloud editors, DailyTools processes your high-resolution photos entirely on your own machine using advanced Canvas and WebAsembly APIs. This ensures zero latency and absolute security for your creative assets."
                  benefits={[
                    "100% Client-Side — zero server exposure",
                    "Batch Processing — edit hundreds of images instantly",
                    "Native Performance — uses your hardware power",
                    "Professional Formats — JPG, PNG, WebP, GIF & HEIC",
                    "No Subscriptions — access everything free forever"
                  ]}
                  howTo={[
                    "Choose a specialized tool from the studio grid",
                    "Upload your images using the high-speed drop zone",
                    "Configure your desired settings in the side panel",
                    "Save your professional results instantly"
                  ]}
                  relatedTools={[
                    { name: 'PDF Tools', path: '/pdf-tools' },
                    { name: 'Utility Tools', path: '/utility-tools' }
                  ]}
                />
              </div>
            </div>

            <AdSpace type="side" className="desktop-only" />
          </div>
        ) : (
          <>
            <div className="landing-layout">
              <AdSpace type="side" className="desktop-only" />

              <div className="landing-center">
                <AdSpace type="top" />

                {!preview ? (
                  <>
                    <div className="page-hero">
                      <div className="page-hero-content">
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                          <ShareTool title={pageTitle} />
                        </div>
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
                        border: '2px dashed var(--accent-purple)',
                        background: 'var(--bg-secondary)',
                        cursor: 'pointer',
                        transition: 'var(--transition)',
                        textAlign: 'center'
                      }}
                      onDrop={handleDrop}
                      onDragOver={(e) => e.preventDefault()}
                      onClick={() => fileInputRef.current?.click()}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--accent-purple)'}
                    >
                      <div className="tool-card-icon" style={{ background: 'var(--accent-purple-50)', color: 'var(--accent-purple)', width: '80px', height: '80px', borderRadius: '24px', marginBottom: '2rem' }}>
                        <Upload size={32} />
                      </div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>Select or Drop Images</h3>
                      <p style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Supports JPG, PNG, WebP, GIF & HEIC</p>
                      <button className="btn btn-primary" style={{ marginTop: '2rem', padding: '1rem 2.5rem' }}>
                        Browse Files
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginTop: '5rem' }}>
                      {[
                        { icon: Maximize2, title: 'Perfect Quality', desc: 'Advanced scaling algorithms to preserve every detail.' },
                        { icon: Loader, title: 'Lightning Fast', desc: 'Local processing means zero waiting for network uploads.' },
                        { icon: Sliders, title: 'Easy To Use', desc: 'Intuitive controls designed for professional workflows.' }
                      ].map((feat, i) => (
                        <div key={i} style={{ textAlign: 'center' }}>
                          <div style={{ color: 'var(--accent-purple)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                            <feat.icon size={36} />
                          </div>
                          <h4 style={{ fontWeight: 900, marginBottom: '0.75rem', fontSize: '1.1rem' }}>{feat.title}</h4>
                          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{feat.desc}</p>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="sidebar-layout">
                    {/* Desktop Sidebar Settings */}
                    <div className="sidebar-settings tool-panel" style={{ position: 'sticky', top: '2rem', height: 'fit-content' }}>
                      {renderSidebarSettings()}
                    </div>

                    <div className="preview-main">
                      <div className="tool-panel" style={{ position: 'relative', minHeight: '500px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {processing && (
                          <div className="processing-overlay">
                            <div className="processing-loader"></div>
                            <p className="processing-text">Processing Images...</p>
                          </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: 900, margin: 0 }}>
                            Files ({files.length})
                          </h3>
                          <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button className="btn btn-secondary" onClick={() => fileInputRef.current?.click()} style={{ padding: '0.6rem 1.25rem' }}>
                              <Upload size={18} /> Add More
                            </button>
                            <button className="btn btn-primary" onClick={processImage} style={{ padding: '0.6rem 2rem' }}>
                              <Download size={18} /> Export All
                            </button>
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem' }}>
                          {files.map((file, i) => (
                            <div key={i} className="tool-card" style={{ padding: '1rem', position: 'relative' }}>
                              <button
                                onClick={() => removeFile(i)}
                                className="btn-icon"
                                style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', padding: '0.4rem', background: 'var(--bg-glass)', borderRadius: '8px', zIndex: 5 }}
                              >
                                <X size={14} />
                              </button>
                              <div style={{ aspectRatio: '1/1', background: 'var(--bg-secondary)', borderRadius: '12px', overflow: 'hidden', marginBottom: '0.75rem', border: '1px solid var(--border-color)' }}>
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={file.name}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                              </div>
                              <p style={{ fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0, color: 'var(--text-secondary)' }}>
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
                )}

                <AdSpace type="bottom" />

                <div style={{ marginTop: '5rem' }}>
                  {seoContent ? (
                    <ToolContent
                      title={activeToolData?.title || 'Image Tool'}
                      description={seoContent.description}
                      benefits={seoContent.benefits}
                      howTo={seoContent.howTo}
                      faq={seoContent.faq}
                      tips={seoContent.tips}
                      useCases={seoContent.useCases}
                      relatedTools={IMAGE_RELATED_TOOLS[activeTool] || []}
                      readNext={IMAGE_READ_NEXT[activeTool] || []}
                      alternativeTo={seoContent.alternativeTo || []}
                    />
                  ) : (
                    <ToolContent
                      title={activeToolData?.title || 'Image Resizer'}
                      description={`Our ${activeToolData?.title || 'Image Resizer'} is a powerful browser-based utility for professional image editing.`}
                      benefits={["100% Privacy — files never leave your device", "No registration or signup required", "Batch processing for multiple images", "All major formats supported"]}
                      howTo={["Upload your photos via drag & drop or file picker", "Configure your desired settings", "Preview the results in real-time", "Download high-quality processed images"]}
                      relatedTools={[
                        { name: 'All Image Tools', path: '/image-tools' },
                        { name: 'PDF Tools', path: '/pdf-tools' }
                      ]}
                      readNext={[
                        { title: 'Lossless vs Lossy Image Compression', path: '/blog/image-compression-lossless-vs-lossy-2026' }
                      ]}
                    />
                  )}
                </div>
              </div>
              <AdSpace type="side" className="desktop-only" />
            </div>
          </>
        )}

        {/* Mobile Action Bar & Settings Modal */}
        {preview && (
          <>
            <div className="mobile-bottom-bar">
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowMobileSettings(true)}>
                <Sliders size={18} /> Settings
              </button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={processImage}>
                <Download size={18} /> Export
              </button>
            </div>

            {showMobileSettings && (
              <div className="modal-overlay" onClick={() => setShowMobileSettings(false)}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h3 style={{ margin: 0, fontWeight: 900 }}>Tool Settings</h3>
                    <button className="btn-icon" onClick={() => setShowMobileSettings(false)}><X size={20} /></button>
                  </div>
                  {renderSidebarSettings()}
                  <button className="btn btn-primary" style={{ width: '100%', marginTop: '2rem' }} onClick={() => setShowMobileSettings(false)}>
                    Apply Settings
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </div >
    </>
  )
}
