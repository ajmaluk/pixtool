import { 
  Maximize2, Crop, RotateCw, FileArchive, RefreshCw, Type, FlipHorizontal, Palette, 
  FilePlus, SplitSquareHorizontal, FileCheck, FileImage, Lock, ArrowUpDown, FileText, Sliders,
  Mail, Smartphone, QrCode, Image as ImageIcon, Search, Braces, Scale, Key
} from 'lucide-react';

export const IMAGE_TOOLS = [
  { 
    id: 'resize', title: 'Resize Image', icon: Maximize2, 
    description: 'Quickly resize images to exact dimensions or percentages using professional-grade scaling algorithms.', 
    color: '#a855f7', path: '/image-tools/resize', screenshot: 'best-online-image-resizer-tool.png',
    imageAlt: 'PixTool Image Resizer - Precision Scaling for High-Quality Photos',
    imageTitle: 'Resize Images Online with PixTool'
  },
  { 
    id: 'crop', title: 'Crop Image', icon: Crop, 
    description: 'Precision cropping for any aspect ratio. Optimized for social media posts, thumbnails, and profile pictures.', 
    color: '#a855f7', path: '/image-tools/crop', screenshot: 'professional-image-cropper-online.png',
    imageAlt: 'PixTool Image Cropper - Pixel-Perfect Aspect Ratio Selection',
    imageTitle: 'Crop Photos for Social Media'
  },
  { 
    id: 'rotate', title: 'Rotate Image', icon: RotateCw, 
    description: 'Rotate and flip images instantly — fix orientation, create mirror effects, correct EXIF data', 
    color: '#a855f7', path: '/image-tools/rotate', screenshot: 'free-online-image-rotator.png',
    imageAlt: 'PixTool Image Rotator - Instant 90/180 Degree Correction',
    imageTitle: 'Fix Photo Orientation Instantly'
  },
  { 
    id: 'compress', title: 'Compress Image', icon: FileArchive, 
    description: 'Intelligent image compression that reduces file size by up to 80% while retaining original visual quality.', 
    color: '#a855f7', path: '/image-tools/compress', screenshot: 'high-quality-image-compressor-online.png',
    imageAlt: 'PixTool Image Compressor - High-Fidelity Size Reduction',
    imageTitle: 'Optimize Images for Web Performance'
  },
  { 
    id: 'convert', title: 'Convert Format', icon: RefreshCw, 
    description: 'Seamlessly convert between JPEG, PNG, WebP, and GIF formats instantly in your browser.', 
    color: '#a855f7', path: '/image-tools/convert', screenshot: 'online-image-format-converter-webp-png-jpg.png',
    imageAlt: 'PixTool Image Converter - Professional Format Transformation',
    imageTitle: 'Convert Image Formats Instantly'
  },
  { 
    id: 'watermark', title: 'Add Watermark', icon: Type, 
    description: 'Add custom text watermarks to protect your photos — adjustable font, size, and opacity', 
    color: '#a855f7', path: '/image-tools/watermark', screenshot: 'add-watermark-to-photos-online-free.png',
    imageAlt: 'PixTool Watermark Tool - Digital Asset Protection',
    imageTitle: 'Protect Photos with Text Watermarks'
  },
  { 
    id: 'flip', title: 'Flip Image', icon: FlipHorizontal, 
    description: 'Flip images horizontally or vertically — create mirror effects and fix selfie orientation', 
    color: '#a855f7', path: '/image-tools/flip', screenshot: 'flip-and-mirror-images-online-instantly.png',
    imageAlt: 'PixTool Image Flip - Horizontal and Vertical Mirroring',
    imageTitle: 'Mirror Images One-Click'
  },
  { 
    id: 'grayscale', title: 'Grayscale', icon: Palette, 
    description: 'Convert color images to black & white, sepia, or vintage — artistic photo effects', 
    color: '#a855f7', path: '/image-tools/grayscale', screenshot: 'convert-image-to-grayscale-online.png',
    imageAlt: 'PixTool Grayscale Filter - Professional B&W Conversion',
    imageTitle: 'Artistic Black and White Photo Filters'
  },
  { 
    id: 'upscale', title: 'AI Upscaler', icon: Maximize2, 
    description: 'Increase image resolution and quality using AI-enhanced upscaling — cleaner, sharper results for small photos.', 
    color: '#a855f7', status: 'coming-soon', path: '/image-tools/upscale', screenshot: 'best-online-image-resizer-tool.png',
    imageAlt: 'PixTool AI Upscaler coming soon',
    imageTitle: 'AI Image Enhancement'
  },
  { 
    id: 'restore', title: 'Photo Restoration', icon: RefreshCw, 
    description: 'Restore old, blurry, or low-quality photos — AI-powered enhancement for vintage digital images.', 
    color: '#a855f7', status: 'coming-soon', path: '/image-tools/restore', screenshot: 'professional-online-image-studio.png',
    imageAlt: 'PixTool AI Restoration coming soon',
    imageTitle: 'Fix Blurry Photos with AI'
  },
  { 
    id: 'image-to-pdf', title: 'Image to PDF', icon: ImageIcon, 
    description: 'Convert multiple images into a single professional PDF document — perfect for portfolios and reports.', 
    color: '#a855f7', path: '/image-tools/image-to-pdf', screenshot: 'secure-pdf-management-suite.png',
    imageAlt: 'PixTool Image to PDF conversion',
    imageTitle: 'Create PDF from Photos'
  },
  { 
    id: 'remove-background', title: 'BG Remover', icon: ImageIcon, 
    description: 'Remove image backgrounds instantly in your browser — AI-powered object isolation.', 
    color: '#a855f7', path: '/image-tools/remove-background', screenshot: 'professional-online-image-studio.png',
    imageAlt: 'PixTool AI Background Removal coming soon',
    imageTitle: 'Remove BG with AI'
  }
];

export const PDF_TOOLS = [
  { 
    id: 'merge', title: 'Merge PDF', icon: FilePlus, 
    description: 'Combine multiple PDF documents into a single professional file instantly. Reorder pages with ease.', 
    color: '#06b6d4', path: '/pdf-tools/merge', screenshot: 'fast-pdf-merger-no-upload-pixtool.png',
    imageAlt: 'PixTool PDF Merger - Secure and Fast Multi-File Joining',
    imageTitle: 'Merge PDF Files Online'
  },
  { 
    id: 'split', title: 'Split PDF', icon: SplitSquareHorizontal, 
    description: 'Extract specific pages or separate your PDF into multiple documents with pixel-perfect precision.', 
    color: '#06b6d4', path: '/pdf-tools/split', screenshot: 'split-pdf-pages-online-securely.png',
    imageAlt: 'PixTool PDF Splitter - Professional Page Extraction Tool',
    imageTitle: 'Split and Extract PDF Pages'
  },
  { 
    id: 'compress', title: 'Compress PDF', icon: FileCheck, 
    description: 'Optimize PDF file sizes for email and web while maintaining high document fidelity and clarity.', 
    color: '#06b6d4', path: '/pdf-tools/compress', screenshot: 'optimize-pdf-file-size-online.png',
    imageAlt: 'PixTool PDF Compressor - Efficient Document Size Optimization',
    imageTitle: 'Compress PDF Online'
  },
  { 
    id: 'convert', title: 'PDF to Images', icon: FileImage, 
    description: 'Convert PDF pages to high-quality PNG, JPG, or WebP images instantly', 
    color: '#06b6d4', path: '/pdf-tools/convert', screenshot: 'convert-pdf-to-images-online-high-res.png',
    imageAlt: 'PixTool PDF to Image - High-resolution page rendering',
    imageTitle: 'Convert PDF to Images'
  },
  { 
    id: 'protect', title: 'Protect PDF', icon: Lock, 
    description: 'Add password protection and encryption to your PDF files — keep documents secure', 
    color: '#06b6d4', path: '/pdf-tools/protect', screenshot: 'secure-pdf-with-password-online.png',
    imageAlt: 'PixTool PDF Protection - AES-256 encryption interface',
    imageTitle: 'Secure PDF with Password'
  },
  { 
    id: 'watermark', title: 'Watermark PDF', icon: Type, 
    description: 'Add text watermarks to all PDF pages — mark as CONFIDENTIAL, DRAFT, or custom text', 
    color: '#06b6d4', path: '/pdf-tools/watermark', screenshot: 'add-text-watermark-to-pdf-online.png',
    imageAlt: 'PixTool PDF Watermark - Document branding and security',
    imageTitle: 'Add Watermark to PDF'
  },
  { 
    id: 'reorder', title: 'Reorder Pages', icon: ArrowUpDown, 
    description: 'Rearrange PDF pages in any order — drag-and-drop page reordering', 
    color: '#06b6d4', path: '/pdf-tools/reorder', screenshot: 'reorder-pdf-pages-online-free.png',
    imageAlt: 'PixTool PDF Reorder - Visual page management',
    imageTitle: 'Rearrange PDF Pages Online'
  },
  { 
    id: 'to-word', title: 'PDF to Word', icon: FileText, 
    description: 'Convert PDF files to editable Word documents (.docx) — high-fidelity conversion preserving layout.', 
    color: '#06b6d4', status: 'coming-soon', path: '/pdf-tools/to-word', screenshot: 'secure-pdf-management-suite.png',
    imageAlt: 'PixTool PDF to Word coming soon',
    imageTitle: 'Convert PDF to Word'
  },
  { 
    id: 'to-excel', title: 'PDF to Excel', icon: Sliders, 
    description: 'Extract tables from PDF to Excel spreadsheets (.xlsx) — intelligent data extraction.', 
    color: '#06b6d4', status: 'coming-soon', path: '/pdf-tools/to-excel', screenshot: 'secure-pdf-management-suite.png',
    imageAlt: 'PixTool PDF to Excel coming soon',
    imageTitle: 'Extract PDF Tables to Excel'
  },
  { 
    id: 'to-ppt', title: 'PDF to PPT', icon: FileImage, 
    description: 'Transform PDF pages into editable PowerPoint slides — perfect for presentations.', 
    color: '#06b6d4', status: 'coming-soon', path: '/pdf-tools/to-ppt', screenshot: 'secure-pdf-management-suite.png',
    imageAlt: 'PixTool PDF to PPT coming soon',
    imageTitle: 'Convert PDF to PowerPoint'
  },
  { 
    id: 'unlock', title: 'Unlock PDF', icon: Lock, 
    description: 'Remove passwords and permissions from protected PDF files — instant access.', 
    color: '#06b6d4', path: '/pdf-tools/unlock', screenshot: 'secure-pdf-with-password-online.png',
    imageAlt: 'PixTool PDF Unlock coming soon',
    imageTitle: 'Remove PDF Passwords'
  },
  { 
    id: 'ocr', title: 'PDF OCR', icon: Search, 
    description: 'Make scanned PDFs searchable and editable using on-device AI text recognition.', 
    color: '#06b6d4', path: '/pdf-tools/ocr', screenshot: 'secure-pdf-management-suite.png',
    imageAlt: 'PixTool PDF OCR coming soon',
    imageTitle: 'Searchable PDF with OCR'
  },
  { 
    id: 'edit', title: 'PDF Editor', icon: FileText, 
    description: 'Edit existing text and images in your PDF — professional document editing in your browser.', 
    color: '#06b6d4', status: 'coming-soon', path: '/pdf-tools/edit', screenshot: 'secure-pdf-management-suite.png',
    imageAlt: 'PixTool PDF Editor coming soon',
    imageTitle: 'Edit PDF Online'
  }
];

export const UTILITY_TOOLS = [
  { 
    id: 'temp-mail', title: 'Temp Mail', icon: Mail, 
    description: 'Generate free disposable email addresses instantly — protect your inbox from spam and trackers', 
    color: '#ec4899', path: '/temp-mail', screenshot: 'disposable-temporary-email-generator.png',
    imageAlt: 'PixTool Temp Mail - Instant anonymous inbox generation',
    imageTitle: 'Free Temporary Email Service'
  },
  { 
    id: '10-minute-mail', title: '10 Minute Mail', icon: Mail, 
    description: 'Create a throwaway inbox that automatically expires in 10 minutes — privacy-first', 
    color: '#ec4899', path: '/temp-mail/10-minute-mail', screenshot: '10-minute-mail-free-disposable-inbox.png',
    imageAlt: 'PixTool 10 Minute Mail - Secure expiring inbox',
    imageTitle: 'Disposable 10 Minute Email'
  },
  { 
    id: 'change-email', title: 'Change Email', icon: RefreshCw, 
    description: 'Generate a new temporary email address instantly for multiple signups', 
    color: '#ec4899', path: '/temp-mail/change-email', screenshot: 'change-temporary-email-address-online.png',
    imageAlt: 'PixTool Change Email - Switch identities instantly',
    imageTitle: 'Change Temporary Email Address'
  },
  { 
    id: 'typing-test', title: 'Typing Test', icon: Type, 
    description: 'Practice typing like MonkeyType — track WPM and accuracy, 100% free', 
    color: '#ec4899', path: '/typing-test', screenshot: 'professional-typing-speed-test-online.png',
    imageAlt: 'PixTool Typing Test - WPM and Accuracy diagnostics',
    imageTitle: 'Online Typing Speed Test'
  },
  { 
    id: 'qr-scanner', title: 'QR Scanner', icon: Smartphone, 
    description: 'Scan any QR code using your camera or by uploading an image — free and private', 
    color: '#10b981', path: '/qr-scanner', screenshot: 'fast-online-qr-code-scanner-browser.png',
    imageAlt: 'PixTool QR Scanner - Browser-based decoding',
    imageTitle: 'Scan QR Code Online'
  },
  { 
    id: 'qr-generator', title: 'QR Generator', icon: QrCode, 
    description: 'Create custom QR codes for URLs, WiFi, text, email, and phone — download as PNG', 
    color: '#f59e0b', path: '/qr-generator', screenshot: 'best-free-qr-code-generator-online.png',
    imageAlt: 'PixTool QR Generator - Custom code creation',
    imageTitle: 'Generate QR Codes Free'
  },
  { 
    id: 'fake-email', title: 'Fake Email', icon: Mail, 
    description: 'Generate a fake email identity for testing and privacy.', 
    color: '#ec4899', path: '/fake-email', screenshot: 'generate-fake-email-for-testing.png',
    imageAlt: 'PixTool Fake Email - Identity protection',
    imageTitle: 'Fake Email Identity Generator'
  },
  { 
    id: 'disposable-email', title: 'Disposable Email', icon: Mail, 
    description: 'Create a one-time email address for anonymous signups.', 
    color: '#ec4899', path: '/disposable-email', screenshot: 'burner-email-address-generator-privacy.png',
    imageAlt: 'PixTool Disposable Email - Privacy first signups',
    imageTitle: 'Burner Email Address'
  },
  { 
    id: 'throwaway-email', title: 'Throwaway Email', icon: Mail, 
    description: 'Secure throwaway inbox for temporary communication.', 
    color: '#ec4899', path: '/throwaway-email', screenshot: 'throwaway-email-inbox-online-free.png',
    imageAlt: 'PixTool Throwaway Email - Instant secure inbox',
    imageTitle: 'Throwaway Inbox Online'
  },
  {
    id: 'code-diff', title: 'Code Diff', icon: Sliders,
    description: 'Compare two code blocks line by line and copy a unified diff patch instantly in your browser.',
    color: '#10b981', path: '/code-diff', screenshot: 'all-in-one-web-utility-toolbox.png',
    imageAlt: 'PixTool Code Diff - side by side comparison tool',
    imageTitle: 'Online Code Diff Checker'
  },
  {
    id: 'json-formatter', title: 'JSON Formatter', icon: Braces,
    description: 'Format, validate, and minify JSON data instantly — professional developer utility.',
    color: '#ec4899', path: '/json-formatter', screenshot: 'all-in-one-web-utility-toolbox.png',
    imageAlt: 'PixTool JSON Formatter - Syntax highlighting and validation',
    imageTitle: 'Online JSON Formatter & Validator'
  },
  {
    id: 'unit-converter', title: 'Unit Converter', icon: Scale,
    description: 'Convert between Length, Weight, Temperature, and Volume units instantly.',
    color: '#10b981', path: '/unit-converter', screenshot: 'all-in-one-web-utility-toolbox.png',
    imageAlt: 'PixTool Unit Converter - Versatile conversion utility',
    imageTitle: 'Free Online Unit Converter'
  },
  {
    id: 'password-generator', title: 'Password Generator', icon: Key,
    description: 'Generate secure, random passwords with custom requirements — 100% private.',
    color: '#f59e0b', path: '/password-generator', screenshot: 'all-in-one-web-utility-toolbox.png',
    imageAlt: 'PixTool Password Generator - Secure entropy-based keys',
    imageTitle: 'Secure Random Password Generator'
  }
];


export const ALL_TOOLS_MAP = {
  ...IMAGE_TOOLS.reduce((acc, t) => ({ ...acc, [t.path]: { name: t.title, icon: t.icon } }), {}),
  ...PDF_TOOLS.reduce((acc, t) => ({ ...acc, [t.path]: { name: t.title, icon: t.icon } }), {}),
  ...UTILITY_TOOLS.reduce((acc, t) => ({ ...acc, [t.path]: { name: t.title, icon: t.icon } }), {}),
  '/utility-tools': { name: 'Utility Suite', icon: Sliders }
};
