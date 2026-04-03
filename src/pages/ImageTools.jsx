import { useState, useEffect, useRef, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Maximize2, Shield, Zap, Upload, Loader, Download, Sliders, X, ChevronLeft, ChevronRight } from 'lucide-react'
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import AdSpace from '../components/AdSpace'
import Breadcrumbs from '../components/Breadcrumbs'
import ShareTool from '../components/ShareTool'
import { useFileDrop } from '../hooks/useFileDrop'
import { IMAGE_TOOLS } from '../data/tools'
import { IMAGE_SEO_CONTENT, IMAGE_RELATED_TOOLS, IMAGE_READ_NEXT } from '../data/imageToolsData'
import ComingSoon from '../components/ComingSoon'
import { processImageFile } from '../utils/canvasUtils'
import { imageFilesToPdf, downloadBlob } from '../utils/pdfUtils'
import ToolCard from '../components/ToolCard'
import { useRatePopup } from '../hooks/useRatePopup'
import { useConfirm, useAlert } from '../context/ConfirmContext'
import { SITE_URL } from '../config/app.config'

const tools = IMAGE_TOOLS;


export default function ImageTools() {
  const { toolId } = useParams()
  const navigate = useNavigate()
  const { triggerRating } = useRatePopup()
  const confirm = useConfirm()
  const alert = useAlert()
  const initialTool = tools.find(t => t.id === toolId)?.id || null
  const [activeTool, setActiveTool] = useState(initialTool)

  useEffect(() => {
    if (toolId && tools.find(t => t.id === toolId)) {
      setActiveTool(toolId)
    } else {
      setActiveTool(null)
    }
  }, [toolId])
  const { files, setFiles, preview, handleFiles, handleDrop, removeFile } = useFileDrop(['image/'])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [processedPreview, setProcessedPreview] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [crop, setCrop] = useState({ unit: 'px', width: 0, height: 0, x: 0, y: 0 })
  const imgRef = useRef(null)
  const [processing, setProcessing] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const galleryRef = useRef(null)

  const objectUrls = useMemo(() => files.map(f => URL.createObjectURL(f)), [files])
  const selectedImageUrl = objectUrls[selectedIndex]

  useEffect(() => {
    return () => {
      objectUrls.forEach(url => URL.revokeObjectURL(url))
    }
  }, [objectUrls])

  // the required distance between touchStart and touchEnd to be considered a swipe
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null) // otherwise the swipe is fired even with very small moves
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setTouchStart(null)
      setTouchEnd(null)
      return
    }
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe || isRightSwipe) {
      if (isLeftSwipe) {
        setSelectedIndex(prev => (prev < files.length - 1 ? prev + 1 : 0))
      } else {
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : files.length - 1))
      }
    }
    setTouchStart(null)
    setTouchEnd(null)
  }

  useEffect(() => {
    if (galleryRef.current) {
      const activeThumb = galleryRef.current.querySelector('.gallery-thumb.active')
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }, [selectedIndex])
  const [showMobileSettings, setShowMobileSettings] = useState(false)

  // Redundant SettingsPanel removed to avoid logic duplication
  const [settings, setSettings] = useState({
    width: 800,
    height: 600,
    quality: 80,
    rotation: 0,
    maintainAspect: false,
    format: 'original',
    convertTo: 'png',
    watermarkText: 'PixTool',
    watermarkSize: 36,
    watermarkOpacity: 50,
    watermarkPosition: 'center',
    flipDirection: 'horizontal',
    colorEffect: 'grayscale',
    cropX: 0,
    cropY: 0,
    cropWidth: 500,
    cropHeight: 500,
    cropAspectRatio: 'auto',
    pdfPageSize: 'A4',
    pdfOrientation: 'portrait',
    pdfMargin: 24,
    bgTolerance: 40,
    bgFeather: 20,
    bgUseColorPicker: false,
    bgCustomColor: { r: 255, g: 255, b: 255, a: 255 },
    bgShowAdvanced: false,
    brushSize: 30,
    brushMode: 'erase' // 'erase' or 'restore'
  })
  const fileInputRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (files.length <= 1) return
      if (e.key === 'ArrowLeft') {
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : files.length - 1))
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex(prev => (prev < files.length - 1 ? prev + 1 : 0))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [files.length, triggerRating])

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

  const handleRemoveFile = (index) => {
    removeFile(index)
    if (selectedIndex >= files.length - 1) {
      setSelectedIndex(Math.max(0, files.length - 2))
    }
  }

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    // Initialize crop with 90% width/height in pixel units
    const initialCrop = centerCrop(
      makeAspectCrop(
        { unit: 'px', width: width * 0.9 },
        settings.maintainAspect ? settings.cropWidth / settings.cropHeight : undefined,
        width,
        height
      ),
      width,
      height
    );
    setCrop(initialCrop);

    // Update settings with natural coordinates
    const scaleX = e.currentTarget.naturalWidth / width;
    const scaleY = e.currentTarget.naturalHeight / height;
    setSettings(s => ({
      ...s,
      cropX: Math.round(initialCrop.x * scaleX),
      cropY: Math.round(initialCrop.y * scaleY),
      cropWidth: Math.round(initialCrop.width * scaleX),
      cropHeight: Math.round(initialCrop.height * scaleY)
    }));
  };

  const handlePreset = (aspectWidth, aspectHeight, label) => {
    if (!imgRef.current) return;

    const { width, height } = imgRef.current;

    if (aspectWidth === null) {
      // Auto / Free-form mode
      setSettings(s => ({ ...s, cropAspectRatio: 'auto', maintainAspect: false }));
      setCrop(c => {
        const { aspect: _, ...rest } = c;
        return { ...rest, unit: 'px' };
      });
      return;
    }

    const aspectValue = aspectWidth / aspectHeight;
    const newCrop = centerCrop(
      makeAspectCrop(
        { unit: 'px', width: width * 0.9 },
        aspectValue,
        width,
        height
      ),
      width,
      height
    );

    setCrop(newCrop);
    setSettings(s => ({ ...s, cropAspectRatio: label || `${aspectWidth}:${aspectHeight}`, maintainAspect: true }));
  };

  const onCropChange = (c) => {
    setCrop(c);
  };

  const onCropComplete = (pixelCrop) => {
    if (imgRef.current && activeTool === 'crop' && pixelCrop.width > 0) {
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

      setSettings(s => ({
        ...s,
        cropX: Math.round(pixelCrop.x * scaleX),
        cropY: Math.round(pixelCrop.y * scaleY),
        cropWidth: Math.round(pixelCrop.width * scaleX),
        cropHeight: Math.round(pixelCrop.height * scaleY)
      }));
    }
  };

  // Image processing logic will be extracted to canvasUtils.js in the next phase
  useEffect(() => {
    return () => {
      if (processedPreview) URL.revokeObjectURL(processedPreview)
    }
  }, [processedPreview])

  // Real-time preview effect
  useEffect(() => {
    const activeFile = files[selectedIndex]
    if (!activeFile || activeTool === 'image-to-pdf' || activeFile.size > 10 * 1024 * 1024) {
      setProcessedPreview(null)
      return
    }

    const timer = setTimeout(async () => {
      try {
        setIsProcessing(true)
        // For crop, we use ReactCrop's own preview, so we don't re-process here to avoid flickering
        if (activeTool === 'crop') {
          setProcessedPreview(null)
          setIsProcessing(false)
          return
        }

        const { blob } = await processImageFile(activeFile, activeTool, settings)
        const url = URL.createObjectURL(blob)
        setProcessedPreview(url)
      } catch (err) {
        console.error('Preview processing error:', err)
      } finally {
        setIsProcessing(false)
      }
    }, 400) // 400ms debounce

    return () => clearTimeout(timer)
  }, [files, selectedIndex, activeTool, settings])

  const processImage = async () => {
    if (files.length === 0) return
    setProcessing(true)
    try {
      if (activeTool === 'image-to-pdf') {
        const pdfBytes = await imageFilesToPdf(files, {
          pageSize: settings.pdfPageSize,
          orientation: settings.pdfOrientation,
          margin: settings.pdfMargin
        })
        downloadBlob(new Blob([pdfBytes], { type: 'application/pdf' }), `images-${Date.now()}.pdf`)
        triggerRating('image-tools/image-to-pdf')
        return
      }

      for (const file of files) {
        const { blob, name } = await processImageFile(file, activeTool, settings)
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = name
        a.click()
        setTimeout(() => URL.revokeObjectURL(url), 100)
      }

      // Trigger rating popup after successful tool use
      triggerRating(`image-tools/${activeTool}`)
    } catch (error) {
      console.error('Processing error:', error)
      await alert({
        title: 'Processing Error',
        message: 'Error processing images. Please ensure your dimensions are within image bounds.',
        type: 'danger'
      });
    } finally {
      setProcessing(false)
    }
  }

  const activeToolData = activeTool ? tools.find(t => t.id === activeTool) : null


  const seoContentMap = IMAGE_SEO_CONTENT;
  const seoContent = activeTool ? seoContentMap[activeTool] : null;

  // Dynamic SEO descriptions - enhanced for better SEO
  const pageTitle = activeToolData ? `Free Online ${activeToolData.title} Tool | PixTool` : "Free Image Resizer & Photo Editor Online | PixTool"
  const pageDescription = activeToolData ?
    seoContentMap[activeTool]?.description :
    "Free online image tools including image resizer, photo cropper, and compressor. No upload required, 100% browser-based and secure."
  const pageKeywords = activeToolData ?
    seoContentMap[activeTool]?.keywords :
    "free image resizer, online photo editor, compress image, resize image free, image compression online, photo cropper"
  const canonicalPath = activeTool ? `/image-tools/${activeTool}` : "/image-tools"

  const imageHubSchema = activeTool ? null : [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Free Online Image Studio - PixTool",
      "description": pageDescription,
      "url": `${SITE_URL}/image-tools`
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
          "applicationCategory": "MultimediaApplication"
        }
      }))
    }
  ];

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
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setSettings(s => ({ ...s, cropX: val }));
                    if (imgRef.current && activeTool === 'crop') {
                      const scaleX = imgRef.current.width / imgRef.current.naturalWidth;
                      setCrop(c => ({ ...c, x: val * scaleX }));
                    }
                  }}
                />
              </div>
              <div className="input-group">
                <label className="input-label">Y Pos</label>
                <input
                  type="number"
                  className="input"
                  value={settings.cropY}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setSettings(s => ({ ...s, cropY: val }));
                    if (imgRef.current && activeTool === 'crop') {
                      const scaleY = imgRef.current.height / imgRef.current.naturalHeight;
                      setCrop(c => ({ ...c, y: val * scaleY }));
                    }
                  }}
                />
              </div>
            </div>
            <div className="input-group">
              <label className="input-label">Crop Size (Pixels)</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input
                  type="number"
                  className="input"
                  placeholder="Width"
                  value={settings.cropWidth}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setSettings(s => ({ ...s, cropWidth: val }));
                    if (imgRef.current && activeTool === 'crop') {
                      const scaleX = imgRef.current.width / imgRef.current.naturalWidth;
                      setCrop(c => ({ ...c, width: val * scaleX }));
                    }
                  }}
                />
                <input
                  type="number"
                  className="input"
                  placeholder="Height"
                  value={settings.cropHeight}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setSettings(s => ({ ...s, cropHeight: val }));
                    if (imgRef.current && activeTool === 'crop') {
                      const scaleY = imgRef.current.height / imgRef.current.naturalHeight;
                      setCrop(c => ({ ...c, height: val * scaleY }));
                    }
                  }}
                />
              </div>
            </div>
            <div className="input-group">
              <label className="input-label">Social Presets</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                <button
                  className={`btn ${settings.cropAspectRatio === 'auto' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '0.7rem', padding: '0.4rem', fontWeight: 700 }}
                  onClick={() => handlePreset(null, null, 'auto')}
                >
                  Auto
                </button>
                {[
                  ['Insta Post', 1, 1],
                  ['Insta Story', 9, 16],
                  ['FB Cover', 16, 9],
                  ['Twitter', 16, 9],
                  ['LinkedIn', 1.91, 1],
                  ['YouTube', 16, 9],
                ].map(([label, w, h]) => (
                  <button
                    key={label}
                    className={`btn ${settings.cropAspectRatio === label ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ fontSize: '0.7rem', padding: '0.4rem', fontWeight: 700 }}
                    onClick={() => handlePreset(w, h, label)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="input-group">
              <label className="input-label">Display Presets</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {[
                  ['4:5 Port', 4, 5],
                  ['16:9 HD', 16, 9],
                  ['21:9 Wide', 21, 9],
                  ['2K Land', 2560, 1440],
                  ['4K Ultra', 3840, 2160],
                ].map(([label, w, h]) => {
                  const presetId = `${w}:${h}`;
                  return (
                    <button
                      key={label}
                      className={`btn ${settings.cropAspectRatio === presetId ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ fontSize: '0.7rem', padding: '0.4rem', fontWeight: 700 }}
                      onClick={() => handlePreset(w, h, presetId)}
                    >
                      {label}
                    </button>
                  )
                })}
                <button
                  className="btn btn-secondary"
                  style={{ fontSize: '0.7rem', padding: '0.4rem', fontWeight: 700 }}
                  onClick={() => {
                    if (imgRef.current) {
                      const { width, height, naturalWidth, naturalHeight } = imgRef.current;
                      setCrop({ unit: 'px', width, height, x: 0, y: 0 });
                      setSettings(s => ({ ...s, cropX: 0, cropY: 0, cropWidth: naturalWidth, cropHeight: naturalHeight, maintainAspect: false, cropAspectRatio: 'auto' }));
                    }
                  }}
                >
                  Full Image
                </button>
              </div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
              <input
                type="checkbox"
                checked={settings.maintainAspect}
                onChange={(e) => {
                  const checked = e.target.checked
                  setSettings(s => ({ ...s, maintainAspect: checked }))
                  if (checked && crop) {
                    const aspect = crop.width / crop.height
                    setCrop(c => ({ ...c, aspect }))
                  } else {
                    setCrop(c => ({ ...c, aspect: undefined }))
                  }
                }}
              />
              <span className="input-label" style={{ margin: 0 }}>Lock Aspect Ratio</span>
            </label>
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

        {activeTool === 'image-to-pdf' && (
          <>
            <div className="input-group">
              <label className="input-label">Page Size</label>
              <select
                className="select"
                value={settings.pdfPageSize}
                onChange={(e) => setSettings(s => ({ ...s, pdfPageSize: e.target.value }))}
              >
                <option value="A4">A4</option>
                <option value="Letter">Letter</option>
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Orientation</label>
              <select
                className="select"
                value={settings.pdfOrientation}
                onChange={(e) => setSettings(s => ({ ...s, pdfOrientation: e.target.value }))}
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Margin: {settings.pdfMargin}px</label>
              <input
                type="range"
                min={0}
                max={72}
                value={settings.pdfMargin}
                onChange={(e) => setSettings(s => ({ ...s, pdfMargin: parseInt(e.target.value, 10) || 0 }))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>
          </>
        )}

        {activeTool === 'remove-background' && (
          <>
            <div className="input-group">
              <label className="input-label">Removal Mode</label>
              <select
                className="select"
                value={settings.bgShowAdvanced ? 'advanced' : 'auto'}
                onChange={(e) => setSettings(s => ({ ...s, bgShowAdvanced: e.target.value === 'advanced' }))}
              >
                <option value="auto">Automatic (Corner Detection)</option>
                <option value="advanced">Advanced (Color Picker + Brush)</option>
              </select>
            </div>

            {!settings.bgShowAdvanced && (
              <>
                <div className="input-group">
                  <label className="input-label">Background Tolerance: {settings.bgTolerance}</label>
                  <input
                    type="range"
                    min={5}
                    max={120}
                    value={settings.bgTolerance}
                    onChange={(e) => setSettings(s => ({ ...s, bgTolerance: parseInt(e.target.value, 10) || 40 }))}
                    style={{ width: '100%', cursor: 'pointer' }}
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Edge Feather: {settings.bgFeather}</label>
                  <input
                    type="range"
                    min={0}
                    max={80}
                    value={settings.bgFeather}
                    onChange={(e) => setSettings(s => ({ ...s, bgFeather: parseInt(e.target.value, 10) || 0 }))}
                    style={{ width: '100%', cursor: 'pointer' }}
                  />
                </div>
                <div style={{ background: 'var(--bg-secondary)', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  ✓ Automatic detection uses corner pixels to find background. Best for solid color backgrounds.
                </div>
              </>
            )}

            {settings.bgShowAdvanced && (
              <>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <div className="input-group" style={{ flex: 1 }}>
                    <label className="input-label">Background Color</label>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <input
                        type="color"
                        value={`#${settings.bgCustomColor.r.toString(16).padStart(2, '0')}${settings.bgCustomColor.g.toString(16).padStart(2, '0')}${settings.bgCustomColor.b.toString(16).padStart(2, '0')}`}
                        onChange={(e) => {
                          const hex = e.target.value.substring(1);
                          const r = parseInt(hex.substring(0, 2), 16);
                          const g = parseInt(hex.substring(2, 4), 16);
                          const b = parseInt(hex.substring(4, 6), 16);
                          setSettings(s => ({ ...s, bgCustomColor: { r, g, b, a: 255 } }));
                        }}
                        style={{ cursor: 'pointer', height: '2.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                      />
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        RGB({settings.bgCustomColor.r}, {settings.bgCustomColor.g}, {settings.bgCustomColor.b})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Tolerance: {settings.bgTolerance}</label>
                  <input
                    type="range"
                    min={5}
                    max={120}
                    value={settings.bgTolerance}
                    onChange={(e) => setSettings(s => ({ ...s, bgTolerance: parseInt(e.target.value, 10) || 40 }))}
                    style={{ width: '100%', cursor: 'pointer' }}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Brush Size: {settings.brushSize}px</label>
                  <input
                    type="range"
                    min={5}
                    max={100}
                    value={settings.brushSize}
                    onChange={(e) => setSettings(s => ({ ...s, brushSize: parseInt(e.target.value, 10) }))}
                    style={{ width: '100%', cursor: 'pointer' }}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Brush Mode</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <button
                      className={`btn ${settings.brushMode === 'erase' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ fontSize: '0.875rem' }}
                      onClick={() => setSettings(s => ({ ...s, brushMode: 'erase' }))}
                    >
                      🗑️ Erase
                    </button>
                    <button
                      className={`btn ${settings.brushMode === 'restore' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ fontSize: '0.875rem' }}
                      onClick={() => setSettings(s => ({ ...s, brushMode: 'restore' }))}
                    >
                      ↩️ Restore
                    </button>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-secondary)', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  🎨 Advanced mode: Pick a custom background color, then use the brush to fine-tune the removal. Erase unwanted areas or restore accidentally removed parts.
                </div>
              </>
            )}
          </>
        )}

        {activeTool !== 'image-to-pdf' && activeTool !== 'remove-background' && (
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
        )}
      </div>

      <button
        className="btn btn-secondary"
        style={{ width: '100%', marginBottom: '1rem' }}
        onClick={async () => {
          const ok = await confirm({
            title: 'Reset Settings?',
            message: 'Are you sure you want to reset all image processing settings to their defaults?',
            confirmText: 'Reset Now',
            type: 'warning'
          });
          if (ok) {
            setSettings({
              width: 800,
              height: 600,
              quality: 80,
              rotation: 0,
              maintainAspect: true,
              format: 'original',
              convertTo: 'png',
              watermarkText: 'PixTool',
              watermarkSize: 36,
              watermarkOpacity: 50,
              watermarkPosition: 'center',
              flipDirection: 'horizontal',
              colorEffect: 'grayscale',
              cropX: 0,
              cropY: 0,
              cropWidth: 500,
              cropHeight: 500,
              cropAspectRatio: '1:1',
              pdfPageSize: 'A4',
              pdfOrientation: 'portrait',
              pdfMargin: 24,
              bgTolerance: 40,
              bgFeather: 20,
              bgUseColorPicker: false,
              bgCustomColor: { r: 255, g: 255, b: 255, a: 255 },
              bgShowAdvanced: false,
              brushSize: 30,
              brushMode: 'erase'
            })
            if (activeTool === 'crop') {
              handlePreset(1, 1)
            }
          }
        }}
      >
        Reset Settings
      </button>

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
        schema={imageHubSchema}
        toolName={activeToolData?.title}
        toolSteps={seoContent?.howTo}
        screenshot={activeToolData?.screenshot ? `${import.meta.env.VITE_SITE_URL}/screenshots/${activeToolData.screenshot}` : null}
        imageAlt={activeToolData?.imageAlt}
        imageTitle={activeToolData?.imageTitle}
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

            <div className="landing-center">
              <div className="page-hero">
                <div className="page-hero-content">
                  <h1 className="page-title" style={{ fontFamily: '"Manrope", sans-serif', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                    Studio-Grade <br/>
                    <span style={{ 
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundSize: '200% auto',
                      animation: 'gradient-flow 6s linear infinite',
                      display: 'inline-block',
                      padding: '0.1em 0'
                    }}>Image Processing</span>
                  </h1>
                  <p className="page-subtitle" style={{ fontFamily: '"Inter", sans-serif', fontSize: '1.25rem', opacity: 0.9, marginTop: '1rem', lineHeight: 1.6 }}>
                    The most powerful way to process images online. Professional-grade scaling, compression, and editing tools that run 100% locally in your browser.
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
                  { icon: Maximize2, title: 'Lossless Quality', desc: 'Advanced resampling algorithms to preserve every pixel.' },
                  { icon: Shield, title: 'Zero Uploads', desc: 'Your photos stay on your device. Military-grade privacy.' },
                  { icon: Zap, title: 'Instant Processing', desc: 'Hardware-accelerated editing directly in your browser.' }
                ].map((feat, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--accent-purple)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                      <feat.icon size={36} />
                    </div>
                    <h2 style={{ fontWeight: 900, marginBottom: '0.75rem', fontSize: '1.25rem' }}>{feat.title}</h2>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{feat.desc}</p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '5rem' }}>
                <ToolContent
                  title="Professional Image Tools"
                  description="Our image processing suite is engineered for speed and absolute privacy. Unlike traditional cloud editors, PixTool processes your high-resolution photos entirely on your own machine using advanced Canvas and WebAsembly APIs. This ensures zero latency and absolute security for your creative assets."
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
          </div>
        ) : (
          <>
            <div className="landing-layout">
              <AdSpace type="side" className="desktop-only" />

              <div className="landing-center">
                <AdSpace type="top" />

                {files.length === 0 ? (
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
                      <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>Select or Drop Images</h2>
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
                          <h3 style={{ fontWeight: 900, marginBottom: '0.75rem', fontSize: '1.1rem' }}>{feat.title}</h3>
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
                      {processing && (
                        <div className="processing-overlay">
                          <div className="processing-loader"></div>
                          <p className="processing-text">Processing Images...</p>
                        </div>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="mobile-hide-header">
                          <h1 style={{ fontSize: '1.25rem', fontWeight: 900, margin: 0, color: 'var(--accent-primary)' }}>
                            {activeToolData?.title}
                          </h1>
                          <div style={{ width: '1px', height: '20px', background: 'var(--border-color)' }}></div>
                          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: 'var(--text-secondary)' }}>
                            Files ({files.length})
                          </h2>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                          <button className="btn btn-secondary" onClick={async () => {
                            const ok = await confirm({
                              title: 'Clear All Files?',
                              message: 'Are you sure you want to remove all uploaded images?',
                              confirmText: 'Clear All',
                              type: 'danger'
                            });
                            if (ok) { setFiles([]); setSelectedIndex(0); }
                          }} style={{ padding: '0.6rem 1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderColor: 'transparent' }}>
                            <X size={18} /> Clear
                          </button>
                          <button className="btn btn-secondary" onClick={() => fileInputRef.current?.click()} style={{ padding: '0.6rem 1.25rem' }}>
                            <Upload size={18} /> Add More
                          </button>
                          <button className="btn btn-primary" onClick={processImage} style={{ padding: '0.6rem 2rem' }}>
                            <Download size={18} /> Export All
                          </button>
                        </div>
                      </div>

                      {/* Main Large Preview Area */}
                      <div
                        className="preview-display"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                      >
                        <div className="zoom-controls">
                          <button className="zoom-btn" onClick={() => setZoom(z => Math.max(0.1, z - 0.1))} title="Zoom Out">-</button>
                          <button className="zoom-value" onClick={() => setZoom(1)}>100%</button>
                          <button className="zoom-btn" onClick={() => setZoom(z => Math.min(3, z + 0.1))} title="Zoom In">+</button>
                        </div>

                        <div style={{ transform: `scale(${zoom})`, transition: 'transform 0.2s ease-out', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {activeTool === 'crop' && selectedImageUrl ? (
                            <ReactCrop
                              crop={crop}
                              onChange={onCropChange}
                              onComplete={onCropComplete}
                              aspect={settings.maintainAspect ? crop.aspect : undefined}
                              ruleOfThirds
                            >
                              <img
                                ref={imgRef}
                                src={selectedImageUrl}
                                alt={`Crop preview of ${files[selectedIndex]?.name}`}
                                className="preview-image-large"
                                onLoad={onImageLoad}
                                style={{ maxHeight: '500px', width: 'auto', transform: `rotate(${settings.rotation || 0}deg)`, transition: 'transform 0.3s ease-out' }}
                              />
                            </ReactCrop>
                          ) : selectedImageUrl ? (
                            <div style={{ position: 'relative' }}>
                              {isProcessing && (
                                <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(2px)', borderRadius: '12px' }}>
                                  <Loader className="spinning" size={40} />
                                </div>
                              )}
                              <img
                                src={processedPreview || selectedImageUrl}
                                alt={`Processed preview of ${files[selectedIndex]?.name}`}
                                className="preview-image-large"
                                style={{ maxHeight: '500px', width: 'auto', transform: `rotate(${settings.rotation || 0}deg)`, transition: 'transform 0.3s ease-out' }}
                              />
                            </div>
                          ) : null}
                        </div>

                        <div className="preview-info" style={{ flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                          <span className="preview-badge" style={{ fontSize: '0.65rem', opacity: 0.8 }}>
                            {files[selectedIndex]?.name}
                          </span>
                          <span className="preview-badge">
                            {(files[selectedIndex]?.size / 1024).toFixed(1)} KB
                          </span>
                        </div>

                        {/* Prev/Next Buttons */}
                        {files.length > 1 && (
                          <>
                            <button
                              className="btn-icon"
                              onClick={() => setSelectedIndex(prev => (prev > 0 ? prev - 1 : files.length - 1))}
                              style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'var(--bg-glass)', borderRadius: '50%', padding: '0.75rem' }}
                            >
                              <ChevronLeft size={24} />
                            </button>
                            <button
                              className="btn-icon"
                              onClick={() => setSelectedIndex(prev => (prev < files.length - 1 ? prev + 1 : 0))}
                              style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'var(--bg-glass)', borderRadius: '50%', padding: '0.75rem' }}
                            >
                              <ChevronRight size={24} />
                            </button>
                          </>
                        )}
                      </div>

                      {/* Horizontal Thumbnail Gallery Row */}
                      <div
                        className="tool-gallery-row custom-scrollbar"
                        ref={galleryRef}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                      >
                        {files.map((file, i) => (
                          <div
                            key={i}
                            className={`gallery-thumb ${selectedIndex === i ? 'active' : ''}`}
                            onClick={() => setSelectedIndex(i)}
                          >
                            <div className="thumb-container">
                              <img src={objectUrls[i] || null} alt={file.name} />
                              <div className="thumb-label">{file.name}</div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRemoveFile(i)
                              }}
                              className="gallery-thumb-remove"
                              aria-label="Remove"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <AdSpace type="bottom" />

                <div style={{ marginTop: '5rem' }}>
                  <ToolContent
                    title={activeToolData?.title || 'Image Tool'}
                    description={activeToolData?.description || (activeTool ? `Our ${activeToolData?.title} is a professional browser-based utility for photo editing.` : 'Professional Online Image Studio')}
                    toolId={activeTool}
                    benefits={activeToolData?.features || ["100% Privacy — files never leave your device", "No registration required", "Batch processing support", "All major formats supported"]}
                    howTo={activeToolData?.howItWorks || ["Upload your photos via drag & drop", "Configure your desired settings", "Preview the results in real-time", "Download high-quality images"]}
                    relatedTools={IMAGE_RELATED_TOOLS[activeTool] || []}
                    readNext={IMAGE_READ_NEXT[activeTool] || []}
                    alternativeTo={seoContent?.alternativeTo || []}
                    faq={seoContent?.faq || []}
                    tips={seoContent?.tips || []}
                    useCases={seoContent?.useCases || []}
                  />
                </div>
              </div>
              <AdSpace type="side" className="desktop-only" />
            </div>
          </>
        )}

        {/* Mobile Action Bar & Settings Drawer */}
        {preview && (
          <>
            <div className="mobile-bottom-bar">
              <button className="btn btn-secondary" onClick={() => setShowMobileSettings(true)}>
                <Sliders size={18} /> Settings
              </button>
              <button className="btn btn-primary" onClick={processImage}>
                <Download size={18} /> Export
              </button>
            </div>

            {showMobileSettings && (
              <div className="settings-drawer-overlay" onClick={() => setShowMobileSettings(false)}>
                <div className="settings-drawer-content" onClick={e => e.stopPropagation()}>
                  <div className="drawer-handle" />
                  <div className="drawer-header">
                    <h3 style={{ margin: 0, fontWeight: 900, fontSize: '1.25rem' }}>Tool Settings</h3>
                    <button
                      className="icon-btn"
                      onClick={() => setShowMobileSettings(false)}
                      aria-label="Close settings"
                      style={{ background: 'var(--bg-secondary)', border: 'none' }}
                    >
                      <X size={20} />
                    </button>
                  </div>
                  {renderSidebarSettings()}
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
      <ShareTool title={pageTitle} />
    </>
  )
}
