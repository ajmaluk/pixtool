import { 
  AlignLeft, ArrowUpDown, ArrowUpRight, AtSign, BarChart, Binary, BookOpen, 
  Braces, Calculator, Circle, Code, Crop, DollarSign, Edit3, Equal, 
  FileArchive, FileCheck, FileImage, FilePlus, FileSignature, FileText, 
  FlipHorizontal, Globe, Grid, Hash, Image as ImageIcon, Key, Lock, 
  Mail, Maximize2, Megaphone, MessageSquare, Palette, PenTool, 
  Percent, QrCode, RefreshCw, RotateCw, Scale, Search, Sliders, 
  Smartphone, SplitSquareHorizontal, TrendingUp, Type,
  CheckSquare, Layout, Pencil, Folder, Timer, StickyNote, Activity,
  ListTodo, ClipboardList, Zap
} from 'lucide-react';

export const IMAGE_TOOLS = [
  { 
    id: 'resize', title: 'Best Free Image Resizer 2026', icon: Maximize2, 
    description: 'The #1 professional image resizer online. Scale photos to exact dimensions or percentages with 100% privacy and no quality loss. Optimized for 4K.', 
    color: '#a855f7', path: '/image-tools/resize', screenshot: 'best-online-image-resizer-tool.png',
    imageAlt: 'PixTool Professional Image Resizer 2026 - High-Fidelity Scaling',
    imageTitle: 'Best Free Image Resizer Online [Official]',
    features: [
      'Industrial-grade pixel-perfect scaling for professional photography',
      'Advanced aspect ratio preservation engine to prevent image distortion',
      'High-velocity bulk processing support for entire image collections',
      'High-fidelity output optimized for 4K and Retina display standards'
    ],
    howItWorks: [
      'Simply drag and drop your high-resolution images into the secure input forge.',
      'Configure your precise pixel dimensions or use our smart percentage scaling.',
      'Preview the transformed result instantly with our non-destructive rendering.',
      'Download your optimized professional assets directly to your local storage.'
    ]
  },
  { 
    id: 'crop', title: 'Crop Image', icon: Crop, 
    description: 'Precision cropping for any aspect ratio. Optimized for social media posts, thumbnails, and profile pictures.', 
    color: '#a855f7', path: '/image-tools/crop', screenshot: 'professional-image-cropper-online.png',
    imageAlt: 'PixTool Image Cropper - Pixel-Perfect Aspect Ratio Selection',
    imageTitle: 'Crop Photos for Social Media',
    features: [
      'Professional custom aspect ratio presets for all social platforms',
      'Freehand precision crop tool for surgical compositional control',
      'Pre-configured social media thumbnails for YouTube, IG, and Meta',
      'High-fidelity pixel-perfect edge detection and alignment'
    ],
    howItWorks: [
      'Upload your source photo into our high-precision cropping studio.',
      'Choose a predefined social media aspect ratio or draw a custom area.',
      'Adjust the frame with our intuitive drag-and-drop handles for composition.',
      'Generate and download your cropped masterpiece with zero quality loss.'
    ]
  },
  { 
    id: 'rotate', title: 'Rotate Image', icon: RotateCw, 
    description: 'Rotate and flip images instantly — fix orientation, create mirror effects, correct EXIF data', 
    color: '#a855f7', path: '/image-tools/rotate', screenshot: 'free-online-image-rotator.png',
    imageAlt: 'PixTool Image Rotator - Instant 90/180 Degree Correction',
    imageTitle: 'Fix Photo Orientation Instantly',
    features: ['Clockwise rotation', 'Anti-clockwise rotation', 'Vertical/Horizontal flip', 'EXIF data preservation'],
    howItWorks: ['Drop your image here', 'Click rotate or flip buttons', 'Download oriented image']
  },
  { 
    id: 'compress', title: 'Compress Image', icon: FileArchive, 
    description: 'Intelligent image compression that reduces file size by up to 80% while retaining original visual quality.', 
    color: '#a855f7', path: '/image-tools/compress', screenshot: 'high-quality-image-compressor-online.png',
    imageAlt: 'PixTool Image Compressor - High-Fidelity Size Reduction',
    imageTitle: 'Optimize Images for Web Performance',
    features: ['Smart lossy compression', 'Adjustable quality level', 'Batch processing', 'Smallest possible file size'],
    howItWorks: ['Select your image files', 'Adjust compression slider', 'Download optimized assets']
  },
  { 
    id: 'convert', title: 'Convert Format', icon: RefreshCw, 
    description: 'Seamlessly convert between JPEG, PNG, WebP, and GIF formats instantly in your browser.', 
    color: '#a855f7', path: '/image-tools/convert', screenshot: 'online-image-format-converter-webp-png-jpg.png',
    imageAlt: 'PixTool Image Converter - Professional Format Transformation',
    imageTitle: 'Convert Image Formats Instantly',
    features: ['Supports PNG, JPG, WebP, GIF', 'Transparency preservation', 'Fast local conversion', 'No watermarks added'],
    howItWorks: ['Add images to the converter', 'Select target format', 'Download converted files']
  },
  { 
    id: 'watermark', title: 'Add Watermark', icon: Type, 
    description: 'Add custom text watermarks to protect your photos — adjustable font, size, and opacity', 
    color: '#a855f7', path: '/image-tools/watermark', screenshot: 'add-watermark-to-photos-online-free.png',
    imageAlt: 'PixTool Watermark Tool - Digital Asset Protection',
    imageTitle: 'Protect Photos with Text Watermarks',
    features: ['Custom text input', 'Font style selection', 'Transparency control', 'Positioning tools'],
    howItWorks: ['Upload your digital asset', 'Type your watermark text', 'Adjust position and save']
  },
  { 
    id: 'flip', title: 'Flip Image', icon: FlipHorizontal, 
    description: 'Flip images horizontally or vertically — create mirror effects and fix selfie orientation', 
    color: '#a855f7', path: '/image-tools/flip', screenshot: 'flip-and-mirror-images-online-instantly.png',
    imageAlt: 'PixTool Image Flip - Horizontal and Vertical Mirroring',
    imageTitle: 'Mirror Images One-Click',
    features: ['Horizontal mirroring', 'Vertical flipping', 'Instant preview', 'One-click processing'],
    howItWorks: ['Upload your image', 'Select flip direction', 'Save your mirrored photo']
  },
  { 
    id: 'grayscale', title: 'Grayscale', icon: Palette, 
    description: 'Convert color images to black & white, sepia, or vintage — artistic photo effects', 
    color: '#a855f7', path: '/image-tools/grayscale', screenshot: 'convert-image-to-grayscale-online.png',
    imageAlt: 'PixTool Grayscale Filter - Professional B&W Conversion',
    imageTitle: 'Artistic Black and White Photo Filters',
    features: ['B&W conversion', 'Sepia tone filters', 'Vintage photo effects', 'Lightness adjustment'],
    howItWorks: ['Upload any color photo', 'Choose your artistic filter', 'Download your black & white masterpiece']
  },
  { 
    id: 'upscale', title: 'AI Upscaler', icon: Maximize2, 
    description: 'Increase image resolution and quality using AI-enhanced upscaling — cleaner, sharper results for small photos.', 
    color: '#a855f7', status: 'coming-soon', path: '/image-tools/upscale', screenshot: 'best-online-image-resizer-tool.png',
    imageAlt: 'PixTool AI Upscaler coming soon',
    imageTitle: 'AI Image Enhancement',
    features: ['Super-resolution AI', 'Noise reduction', 'Sharpening algorithms', 'Quality preservation'],
    howItWorks: ['Upload low-res photo', 'Choose upscale factor', 'Download clear, sharp image']
  },
  { 
    id: 'restore', title: 'Photo Restoration', icon: RefreshCw, 
    description: 'Restore old, blurry, or low-quality photos — AI-powered enhancement for vintage digital images.', 
    color: '#a855f7', status: 'coming-soon', path: '/image-tools/restore', screenshot: 'professional-online-image-studio.png',
    imageAlt: 'PixTool AI Restoration coming soon',
    imageTitle: 'Fix Blurry Photos with AI',
    features: ['Scratch removal', 'Color restoration', 'Face enhancement', 'Blur correction'],
    howItWorks: ['Upload old or blurry photo', 'Apply AI restoration', 'Download restored memory']
  },
  { 
    id: 'image-to-pdf', title: 'Image to PDF', icon: ImageIcon, 
    description: 'Convert multiple images into a single professional PDF document — perfect for portfolios and reports.', 
    color: '#a855f7', path: '/image-tools/image-to-pdf', screenshot: 'secure-pdf-management-suite.png',
    imageAlt: 'PixTool Image to PDF conversion',
    imageTitle: 'Create PDF from Photos',
    features: ['Bulk image conversion', 'Maintain high resolution', 'Custom page ordering', 'Fast local processing'],
    howItWorks: ['Select your image collection', 'Arrange the page order', 'Generate and download PDF']
  },
  { 
    id: 'remove-background', title: 'BG Remover', icon: ImageIcon, 
    description: 'Remove image backgrounds instantly in your browser — AI-powered object isolation.', 
    color: '#a855f7', path: '/image-tools/remove-background', screenshot: 'professional-online-image-studio.png',
    imageAlt: 'PixTool AI Background Removal - Automatic Object Isolation',
    imageTitle: 'Remove Background with AI',
    features: ['Instant background removal', 'Edge-aware AI refinement', 'Transparent PNG export', 'No upload safety'],
    howItWorks: ['Upload your photo', 'Wait for AI to process', 'Download your transparent PNG']
  }
];

export const PDF_TOOLS = [
  { 
    id: 'merge', title: 'Merge PDF Online [Official]', icon: FilePlus, 
    description: 'The fastest secure PDF merger for 2026. Combine multiple documents into one professional PDF instantly without uploading. Reorder pages with ease, 100% free.', 
    color: '#06b6d4', path: '/pdf-tools/merge', screenshot: 'fast-pdf-merger-no-upload-pixtool.png',
    imageAlt: 'PixTool Professional PDF Merger - Secure Document Management',
    imageTitle: 'Merge PDF Files Safely without Uploading',
    features: ['Instant local merging', 'No upload required', 'Drag-and-drop reordering', 'Maintains original quality'],
    howItWorks: ['Upload multiple PDF files', 'Drag to reorder pages', 'Merge and download instantly']
  },
  { 
    id: 'split', title: 'Split PDF', icon: SplitSquareHorizontal, 
    description: 'Split PDF pages online for free. Extract specific pages or separate your PDF into multiple documents with pixel-perfect precision—no uploading required.', 
    color: '#06b6d4', path: '/pdf-tools/split', screenshot: 'split-pdf-pages-online-securely.png',
    imageAlt: 'PixTool PDF Splitter - Extract PDF pages online privately and securely',
    imageTitle: 'Split PDF Pages Online',
    features: ['Extract individual pages', 'Split by range', 'Custom splitting points', 'Zero-upload privacy'],
    howItWorks: ['Add your PDF document', 'Select pages to extract', 'Download your split files']
  },
  { 
    id: 'compress', title: 'Compress PDF', icon: FileCheck, 
    description: 'Compress PDF file size online for free. Reduce PDF size for email & web without losing quality. 100% private browser-based compression—no upload required.', 
    color: '#06b6d4', path: '/pdf-tools/compress', screenshot: 'optimize-pdf-file-size-online.png',
    imageAlt: 'PixTool PDF Compressor - Reduce PDF size online without uploading',
    imageTitle: 'Compress PDF Online Free',
    features: ['Precision size reduction', 'Maintains text clarity', 'Batch compression support', 'Secure local processing'],
    howItWorks: ['Upload your bulky PDF', 'Select compression level', 'Download the optimized file']
  },
  { 
    id: 'convert', title: 'PDF to Images', icon: FileImage, 
    description: 'Convert PDF pages to high-quality PNG, JPG, or WebP images instantly in your browser.', 
    color: '#06b6d4', path: '/pdf-tools/convert', screenshot: 'convert-pdf-to-images-online-high-res.png',
    imageAlt: 'PixTool PDF to Image - High-resolution page rendering locally',
    imageTitle: 'Convert PDF to Images Professionally',
    features: ['High-resolution output', 'Multi-format support', 'Page-by-page extraction', 'Instant zip download'],
    howItWorks: ['Drop your PDF document', 'Choose output format (JPG/PNG)', 'Extract and save all pages']
  },
  { 
    id: 'protect', title: 'Protect PDF', icon: Lock, 
    description: 'Add password protection and encryption to your PDF files — keep documents secure', 
    color: '#06b6d4', path: '/pdf-tools/protect', screenshot: 'secure-pdf-with-password-online.png',
    imageAlt: 'PixTool PDF Protection - AES-256 encryption interface',
    imageTitle: 'Secure PDF with Password',
    features: ['Strong AES-256 encryption', 'Set user/owner passwords', 'Restriction management', 'Private local processing'],
    howItWorks: ['Upload your sensitive PDF', 'Enter your secure password', 'Download protected document']
  },
  { 
    id: 'watermark', title: 'Watermark PDF', icon: Type, 
    description: 'Add text watermarks to all PDF pages — mark as CONFIDENTIAL, DRAFT, or custom text', 
    color: '#06b6d4', path: '/pdf-tools/watermark', screenshot: 'add-text-watermark-to-pdf-online.png',
    imageAlt: 'PixTool PDF Watermark - Document branding and security',
    imageTitle: 'Add Watermark to PDF',
    features: ['Custom text branding', 'Font and size control', 'Opacity adjustment', 'Batch page processing'],
    howItWorks: ['Upload your PDF file', 'Enter watermark text', 'Apply to all pages and save']
  },
  { 
    id: 'reorder', title: 'Reorder Pages', icon: ArrowUpDown, 
    description: 'Rearrange PDF pages in any order — drag-and-drop page reordering', 
    color: '#06b6d4', path: '/pdf-tools/reorder', screenshot: 'reorder-pdf-pages-online-free.png',
    imageAlt: 'PixTool PDF Reorder - Visual page management',
    imageTitle: 'Rearrange PDF Pages Online',
    features: ['Visual page previews', 'Drag-and-drop ordering', 'Delete unwanted pages', 'Instant local re-saving'],
    howItWorks: ['Select your PDF document', 'Drag pages to new positions', 'Download reordered file']
  },
  { 
    id: 'to-word', title: 'PDF to Word', icon: FileText, 
    description: 'Convert PDF files to editable Word documents (.docx) — high-fidelity conversion preserving layout.', 
    color: '#06b6d4', status: 'coming-soon', path: '/pdf-tools/to-word', screenshot: 'secure-pdf-management-suite.png',
    imageAlt: 'PixTool PDF to Word coming soon',
    imageTitle: 'Convert PDF to Word',
    features: ['Preserve document layout', 'Editable text output', 'Table structure recognition', 'Local browser conversion'],
    howItWorks: ['Upload your PDF file', 'Wait for Word processing', 'Download editable .docx']
  },
  { 
    id: 'to-excel', title: 'PDF to Excel', icon: Sliders, 
    description: 'Extract tables from PDF to Excel spreadsheets (.xlsx) — intelligent data extraction.', 
    color: '#06b6d4', status: 'coming-soon', path: '/pdf-tools/to-excel', screenshot: 'secure-pdf-management-suite.png',
    imageAlt: 'PixTool PDF to Excel coming soon',
    imageTitle: 'Extract PDF Tables to Excel',
    features: ['Intelligent table detection', 'Precise data extraction', 'Multi-sheet support', 'Numeric format preservation'],
    howItWorks: ['Select PDF with tables', 'Analyze data structures', 'Download Excel spreadsheet']
  },
  { 
    id: 'to-ppt', title: 'PDF to PPT', icon: FileImage, 
    description: 'Transform PDF pages into editable PowerPoint slides — perfect for presentations.', 
    color: '#06b6d4', status: 'coming-soon', path: '/pdf-tools/to-ppt', screenshot: 'secure-pdf-management-suite.png',
    imageAlt: 'PixTool PDF to PPT coming soon',
    imageTitle: 'Convert PDF to PowerPoint',
    features: ['Slide-by-page conversion', 'Editable vector elements', 'Maintain font consistency', 'Fast presentation export'],
    howItWorks: ['Upload your presentation PDF', 'Generate PPTX slides', 'Download editable presentation']
  },
  { 
    id: 'unlock', title: 'Unlock PDF', icon: Lock, 
    description: 'Remove passwords and permissions from protected PDF files — instant access.', 
    color: '#06b6d4', path: '/pdf-tools/unlock', screenshot: 'secure-pdf-with-password-online.png',
    imageAlt: 'PixTool PDF Unlock coming soon',
    imageTitle: 'Remove PDF Passwords',
    features: ['Remove owner password', 'Enable copying/printing', 'Unlock restricted content', 'Instant decryption'],
    howItWorks: ['Upload protected PDF', 'Enter known password', 'Download unlocked file']
  },
  { 
    id: 'ocr', title: 'PDF OCR', icon: Search, 
    description: 'Make scanned PDFs searchable and editable using on-device AI text recognition.', 
    color: '#06b6d4', path: '/pdf-tools/ocr', screenshot: 'secure-pdf-management-suite.png',
    imageAlt: 'PixTool PDF OCR coming soon',
    imageTitle: 'Searchable PDF with OCR',
    features: ['Multilingual text detection', 'Searchable PDF layer', 'High-accuracy AI OCR', 'Private on-device logic'],
    howItWorks: ['Upload scanned PDF', 'Run AI text recognition', 'Download searchable document']
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
    id: 'temp-mail', title: 'Free Temp Mail 2026 [Safe]', icon: Mail, 
    description: 'Instant anonymous disposable email generator. Protect your privacy with a 100% secure temporary inbox. Perfect for signups and avoiding spam.', 
    color: '#ec4899', path: '/temp-mail', screenshot: 'disposable-temporary-email-generator.png',
    imageAlt: 'PixTool Secure Temp Mail 2026 - Instant Anonymous Disposable Email',
    imageTitle: 'Best Disposable Email Service Online',
    features: ['No registration required', 'Instant inbox creation', 'Auto-refreshing messages', 'Safe for forum signups'],
    howItWorks: ['Generate your unique address', 'Use it for any signup', 'Watch your inbox live']
  },
  { 
    id: '10-minute-mail', title: '10 Minute Mail', icon: Mail, 
    description: 'Create a throwaway inbox that automatically expires in 10 minutes — absolute privacy for verification codes.', 
    color: '#ec4899', path: '/temp-mail/10-minute-mail', screenshot: '10-minute-mail-free-disposable-inbox.png',
    imageAlt: 'PixTool 10 Minute Mail - Secure expiring inbox for quick verification',
    imageTitle: '10 Minute Disposable Email Service',
    features: ['Auto-expiring inbox', 'Instant message delivery', 'Zero tracking cookies', 'No signup needed'],
    howItWorks: ['Get your 10-minute address', 'Use for quick Verifications', 'Wait for the code to appear']
  },
  { 
    id: 'change-email', title: 'Change Email', icon: RefreshCw, 
    description: 'Generate a new temporary email address instantly for multiple signups', 
    color: '#ec4899', path: '/temp-mail/change-email', screenshot: 'change-temporary-email-address-online.png',
    imageAlt: 'PixTool Change Email - Switch identities instantly',
    imageTitle: 'Change Temporary Email Address',
    features: ['Instant identity switch', 'Previous inbox cleanup', 'Secure token generation', 'Fast browser refresh'],
    howItWorks: ['Click change email button', 'Get your new secure address', 'Continue your private browsing']
  },
  { 
    id: 'typing-test', title: 'Typing Test', icon: Type, 
    description: 'Practice typing like MonkeyType — track WPM and accuracy, 100% free', 
    color: '#ec4899', path: '/typing-test', screenshot: 'professional-typing-speed-test-online.png',
    imageAlt: 'PixTool Typing Test - WPM and Accuracy diagnostics',
    imageTitle: 'Online Typing Speed Test',
    features: ['Real-time WPM tracking', 'Accuracy percentage', 'Detailed error analysis', 'High-score persistence'],
    howItWorks: ['Select your test duration', 'Start typing the words', 'Review your performance stats']
  },
  { 
    id: 'qr-scanner', title: 'QR Scanner', icon: Smartphone, 
    description: 'The fastest free online QR scanner. Scan from your camera or upload a photo instantly in your browser. No app download needed, 100% private & secure.', 
    color: '#10b981', path: '/qr-scanner', screenshot: 'fast-online-qr-code-scanner-browser.png',
    imageAlt: 'PixTool QR Scanner - Online reader for fast browser-native decoding',
    imageTitle: 'Scan QR Codes Online Free',
    features: ['Decode from Image File', 'Live Camera Scanning', 'Instant link detection', 'Privacy-first processing'],
    howItWorks: ['Grant camera access or upload', 'Point at code or select image', 'Access the decoded content']
  },
  { 
    id: 'qr-generator', title: 'Free QR Code Generator [Pro]', icon: QrCode, 
    description: 'Create high-resolution, branded QR codes for URLs, WiFi, & vCards. No sign-up, no hidden fees, 100% private generation.', 
    color: '#f59e0b', path: '/qr-generator', screenshot: 'best-free-qr-code-generator-online.png',
    imageAlt: 'PixTool Professional QR Generator - Custom Branded QR Codes',
    imageTitle: 'Create High-Res QR Codes Online Free',
    features: ['Custom Link Support', 'WiFi/vCard generation', 'High-res PNG Export', 'Privacy-first generation'],
    howItWorks: ['Choose your data type', 'Input your content details', 'Download your custom QR code']
  },
  { 
    id: 'fake-email', title: 'Fake Email', icon: Mail, 
    description: 'Generate a fake email identity for testing and privacy.', 
    color: '#ec4899', path: '/fake-email', screenshot: 'generate-fake-email-for-testing.png',
    imageAlt: 'PixTool Fake Email - Identity protection',
    imageTitle: 'Fake Email Identity Generator',
    features: ['Randomized addresses', 'Valid MX records', 'Safe for internal testing', 'One-click address reset'],
    howItWorks: ['Generate fake identity', 'Use for testing scenarios', 'Refresh for new identity']
  },
  { 
    id: 'disposable-email', title: 'Disposable Email', icon: Mail, 
    description: 'Create a one-time email address for anonymous signups.', 
    color: '#ec4899', path: '/disposable-email', screenshot: 'burner-email-address-generator-privacy.png',
    imageAlt: 'PixTool Disposable Email - Privacy first signups',
    imageTitle: 'Burner Email Address',
    features: ['Anti-spam protection', 'No-personal-data stored', 'Instant activation', 'Universal site compatibility'],
    howItWorks: ['Generate disposable address', 'Paste into signup form', 'Confirm and discard']
  },
  { 
    id: 'throwaway-email', title: 'Throwaway Email', icon: Mail, 
    description: 'Secure throwaway inbox for temporary communication.', 
    color: '#ec4899', path: '/throwaway-email', screenshot: 'throwaway-email-inbox-online-free.png',
    imageAlt: 'PixTool Throwaway Email - Instant secure inbox',
    imageTitle: 'Throwaway Inbox Online',
    features: ['Secure ephemeral storage', 'Zero logs policy', 'Fast message arrival', 'Stealth-mode inbox'],
    howItWorks: ['Open throwaway inbox', 'Recieve secure codes', 'Close to destroy data']
  },
  {
    id: 'code-diff', title: 'Code Diff', icon: Sliders,
    description: 'Compare two code blocks line by line and copy a unified diff patch instantly in your browser.',
    color: '#10b981', path: '/code-diff', screenshot: 'all-in-one-web-utility-toolbox.png',
    imageAlt: 'PixTool Code Diff - side by side comparison tool',
    imageTitle: 'Online Code Diff Checker',
    features: ['Line-by-line comparison', 'Side-by-side view', 'Patch generation', 'Syntax highlighting'],
    howItWorks: ['Paste original code', 'Paste modified code', 'Review and copy the diff']
  },
  {
    id: 'json-formatter', title: 'JSON Formatter', icon: Braces,
    description: 'Format, validate, and minify JSON data instantly — professional developer utility with zero server tracking.',
    color: '#ec4899', path: '/json-formatter', screenshot: 'all-in-one-web-utility-toolbox.png',
    imageAlt: 'PixTool JSON Formatter - Syntax highlighting and validation locally',
    imageTitle: 'Online JSON Formatter & Validator Pro',
    features: ['Instant code prettifying', 'Syntax error detection', 'Minification support', 'One-click copying'],
    howItWorks: ['Paste your raw JSON code', 'Fix errors or reformat', 'Copy the clean JSON instantly']
  },
  {
    id: 'unit-converter', title: 'Unit Converter', icon: Scale,
    description: 'Convert between Length, Weight, Temperature, and Volume units instantly.',
    color: '#10b981', path: '/unit-converter', screenshot: 'all-in-one-web-utility-toolbox.png',
    imageAlt: 'PixTool Unit Converter - Versatile conversion utility',
    imageTitle: 'Free Online Unit Converter',
    features: ['Multi-category support', 'Real-time calculation', 'Scientific precision', 'Clean intuitive UI'],
    howItWorks: ['Select measurement type', 'Enter source value', 'Get instant conversions']
  },
  {
    id: 'password-generator', title: 'Password Generator', icon: Key,
    description: 'Generate secure, random passwords with custom requirements — 100% private.',
    color: '#f59e0b', path: '/password-generator', screenshot: 'all-in-one-web-utility-toolbox.png',
    imageAlt: 'PixTool Password Generator - Secure entropy-based keys',
    imageTitle: 'Secure Random Password Generator',
    features: ['Custom length settings', 'Entropy-based randomness', 'Symbol/Number toggles', 'Zero server-side logs'],
    howItWorks: ['Adjust security settings', 'Generate random string', 'Copy secure password']
  }
];



export const AI_TOOLS = [
  {
    id: 'ai-chat', title: 'Deep Mind', icon: MessageSquare,
    description: 'Access non-linear intelligence for complex problem-solving, rapid knowledge synthesis, and professional consulting.',
    color: '#8b5cf6', path: '/ai-tools/chat', screenshot: 'ai-chat-assistant.png',
    imageAlt: 'PixTool Deep Mind - High-Authority General Intelligence Assistant',
    imageTitle: 'Professional AI Chat Assistant for Business',
    features: [
      'Context-aware reasoning engine for high-authority logical synthesis',
      'Comprehensive multilingual support across 50+ global dialects',
      'Creative brainstorming protocols for strategic business initiatives',
      'Industrial-grade logic solving for complex technical challenges'
    ],
    howItWorks: [
      'State your complex query or problem statement in the deep-mind input field.',
      'Select your desired cognitive intensity and tone of voice for the output.',
      'Watch as our non-linear intelligence synthesizes a high-authority response.',
      'Iterate and refine your conversation to reach a definitive strategic solution.'
    ]
  },
  {
    id: 'ai-content-generator', title: 'Content Forge', icon: PenTool,
    description: 'Architect high-authority blog posts, viral scripts, and professional articles with linguistic precision.',
    color: '#8b5cf6', path: '/ai-tools/content-generator', screenshot: 'ai-content-creation.png',
    imageAlt: 'PixTool Content Forge - High-Authority Writing Studio with AI',
    imageTitle: 'Generate High-Quality AI Content Professionally',
    features: [
      'SEO-optimized drafting engine aligned with current search algorithms',
      'Precision linguistic tone control from academic to viral social styles',
      'Structural brainstorming and outline generation for long-form manuscripts',
      'Plagiarism-aware output ensuring original and unique editorial voices'
    ],
    howItWorks: [
      'Define your primary topic blueprint and target list of SEO keywords.',
      'Select the linguistic atmosphere and information density for your forge.',
      'Let the AI architect a structured, high-conversion content manuscript.',
      'Audit the final draft and export directly into your professional workflow.'
    ]
  },
  {
    id: 'ai-grammar-fixer', title: 'Grammar Architect', icon: Edit3,
    description: 'Achieve linguistic perfection. Our AI analyzes your text for grammar, spelling, and professional semantic flow.',
    color: '#8b5cf6', path: '/ai-tools/grammar-fixer', screenshot: 'ai-grammar-checker.png',
    imageAlt: 'PixTool Grammar Architect - Professional Proofreading Studio for Business',
    imageTitle: 'Fix Grammar and Style with AI precision',
    features: [
      'Advanced syntactic correction engine for professional business writing',
      'Deep context-aware spellcheck beyond simple dictionary matching',
      'Human-centric readability optimization and sentence flow analysis',
      'Consistent tone verification across long-form multi-page documents'
    ],
    howItWorks: [
      'Paste your draft manuscript into the Grammar Architect input workspace.',
      'Run the high-intensity intelligence scan to identify linguistic anomalies.',
      'Review the surgical fixes and professional stylistic recommendations.',
      'Accept the refined improvements and copy your polished text instantly.'
    ]
  },
  {
    id: 'ai-resume-generator', title: 'Resume Architect', icon: FileSignature,
    description: 'Build a career-winning, ATS-friendly resume through an interactive AI interview process and career-mapping.',
    color: '#8b5cf6', path: '/ai-tools/resume-generator', screenshot: 'ai-resume-builder.png',
    imageAlt: 'PixTool Resume Architect - Professional Career Builder for 2026',
    imageTitle: 'Build ATS-Friendly Resumes with AI assistance',
    features: [
      'Industrial-grade ATS-optimized structures for modern HR systems',
      'Smart keyword density analysis tailored to specific job descriptions',
      'Interactive career mapping interview to extract high-value achievements',
      'Professional high-fidelity PDF export with clean minimalist design'
    ],
    howItWorks: [
      'Begin the interactive career interview to document your professional saga.',
      'Define your target industry and specific level of seniority for the role.',
      'Watch as the Architect maps your skills to high-conversion ATS patterns.',
      'Generate your final polished portfolio and download as a secure PDF.'
    ]
  },
  {
    id: 'ai-coding-chat', title: 'Code Intelligence', icon: Code,
    description: 'Your 24/7 senior developer. Write, debug, and refactor code across 20+ languages with high-authority logic.',
    color: '#8b5cf6', path: '/ai-tools/coding-chat', screenshot: 'ai-code-assistant.png',
    imageAlt: 'PixTool Code Intelligence - Pro Developer AI Assistant with 20+ languages',
    imageTitle: 'Professional AI Programming assistance',
    features: [
      'Senior-level full-stack logic solving for modern framework architectures',
      'Advanced syntax optimization and algorithmic efficiency verification',
      'Industrial refactoring patterns for cleaner, more maintainable codebases',
      'Zero-transmission privacy protocols protecting your proprietary logic'
    ],
    howItWorks: [
      'Inject your code snippet or architectural logic into the intelligence forge.',
      'Request specific refactoring, debugging, or new feature implementations.',
      'Analyze the senior-level feedback and high-authority code suggestions.',
      'Implement the verified logic directly into your local development stack.'
    ]
  },
  {
    id: 'ai-email-writer', title: 'Professional Correspondence', icon: AtSign,
    description: 'Draft high-conversion professional emails and persuasive follow-ups tailored to any scenario.',
    color: '#8b5cf6', path: '/ai-tools/email-writer', screenshot: 'ai-email-drafter.png',
    imageAlt: 'PixTool Professional Correspondence - Business Communication',
    imageTitle: 'Write Business Emails with AI',
    features: [
      'Context-aware drafting for high-stakes business communication',
      'Dynamic tone of voice selection from persuasive to empathetic',
      'Automated follow-up logic to maintain momentum in sales cycles',
      'Universal multilingual translation for global business correspondence'
    ],
    howItWorks: [
      'Describe the core intent and target audience of your correspondence.',
      'Select the desired emotional resonance and professional level requested.',
      'Generate a high-conversion draft tailored for your specific recipient.',
      'Refine the manuscript and copy directly into your email provider.'
    ]
  },
  {
    id: 'ai-ad-copy', title: 'Marketing Pulse', icon: Megaphone,
    description: 'Generate high-performance marketing copy optimized for Google, Meta, and LinkedIn.',
    color: '#8b5cf6', path: '/ai-tools/ad-copy-generator', screenshot: 'ai-ad-copy.png',
    imageAlt: 'PixTool Marketing Pulse - Performance Copy Engine',
    imageTitle: 'Create Converting Ads with AI',
    features: [
      'Platform-specific conversion templates for Google, Meta, and X',
      'Automated A/B versioning logic to test multiple hook strategies',
      'High-click-through headline generation and psychological hooks',
      'Strategic call-to-action optimization to drive immediate conversions'
    ],
    howItWorks: [
      'Define your product blueprint and target customer demographics.',
      'Select the primary advertising platform and campaign objective.',
      'Forge high-performance copy variants with the Marketing Pulse engine.',
      'Select the winning version and deploy directly to your ad manager.'
    ]
  },
  {
    id: 'ai-caption', title: 'Social Pulse', icon: Hash,
    description: 'Scale your reach with viral, platform-optimized captions for Instagram, TikTok, and X.',
    color: '#8b5cf6', path: '/ai-tools/caption-generator', screenshot: 'ai-captions.png',
    imageAlt: 'PixTool Social Pulse - Social Media Viral Engine',
    imageTitle: 'Trending Social Captions with AI',
    features: [
      'Real-time viral trend integration for high-engagement social posts',
      'Smart emoji optimization engine for visual resonance and scroll-stopping',
      'Dynamic hashtag cluster suggestions tailored to categorical niches',
      'Precision length control optimized for TikTok, Instagram, and X feeds'
    ],
    howItWorks: [
      'Provide a brief summary of your visual content or core message.',
      'Configure the desired social platform and viral energy level.',
      'Generate a collection of platform-optimized, high-velocity captions.',
      'Select your favorite variant and copy directly to your social scheduler.'
    ]
  },
  {
    id: 'ai-paraphraser', title: 'Nuance Engine', icon: AlignLeft,
    description: 'Transform your writing. Effortlessly rephrase content to improve flow and authority.',
    color: '#8b5cf6', path: '/ai-tools/paraphraser', screenshot: 'ai-paraphrasing-tool.png',
    imageAlt: 'PixTool Nuance Engine - Advanced Stylistic Transformation',
    imageTitle: 'Professional AI Text Paraphraser',
    features: [
      'Advanced semantic preservation engine preventing logic loss during rephrasing',
      'Versatile transformation modes including Creative, Formal, and Simplified',
      'Dynamic vocabulary enhancement to boost the professional authority of text',
      'Effective plagiarism reduction via deep syntactic reconfiguration'
    ],
    howItWorks: [
      'Paste your original content into the high-precision Nuance input field.',
      'Select your target transformation mode and linguistic intensity.',
      'Watch as the engine re-architects your prose into a new stylistic form.',
      'Review the restructured manuscript and copy your unique version.'
    ]
  },
  {
    id: 'ai-summarizer', title: 'Intelligence Distiller', icon: FileText,
    description: 'Cut through the noise. Condense massive documents into actionable, high-level intelligence summaries instantly.',
    color: '#8b5cf6', path: '/ai-tools/summarizer', screenshot: 'ai-text-summarizer.png',
    imageAlt: 'PixTool Intelligence Distiller - Document Intelligence and Summarization',
    imageTitle: 'Summarize Long Documents with AI Intelligence',
    features: [
      'Latent Semantic Indexing (LSI) extraction for core keyword discovery',
      'Hierarchical bullet-point synthesis for rapid executive knowledge',
      'Strategic intelligence summaries focusing on actionable metrics and data',
      'High-velocity text processing capable of distilling 5000+ words instantly'
    ],
    howItWorks: [
      'Paste your long-form document or article into the Distiller input forge.',
      "Adjust the information density slider from 'Brief' to 'Granular' levels.",
      'Forge your high-level intelligence summary with one-click processing.',
      'Extract the actionable findings and share with your professional team.'
    ]
  },
  {
    id: 'ai-translator', title: 'Linguist Intelligence', icon: Globe,
    description: 'Break language barriers with context-aware translations in over 50 global languages.',
    color: '#8b5cf6', path: '/ai-tools/translator', screenshot: 'ai-translation.png',
    imageAlt: 'PixTool Linguist Intelligence - Accurate Translation',
    imageTitle: 'Professional Language Translation with AI',
    features: [
      'Deep context-aware accuracy preserving cultural nuances and tech terms',
      'Universal support for 50+ global languages and regional dialects',
      'Automated source dialect identification for seamless interaction',
      'High-velocity on-device rendering for instant multilingual feedback'
    ],
    howItWorks: [
      'Inject your source text into the Linguist Intelligence input portal.',
      'Select your target global language from our comprehensive database.',
      'Get an instant, contextually accurate translation of your manuscript.',
      'Refine the output for specific tones and copy the localized version.'
    ]
  },
  {
    id: 'ai-keyword', title: 'SEO Architect', icon: Search,
    description: 'Unlock search dominance. Generate high-intent keywords and semantic tags to boost rankings.',
    color: '#8b5cf6', path: '/ai-tools/keyword-generator', screenshot: 'ai-seo-keywords.png',
    imageAlt: 'PixTool SEO Architect - Search Ranking Dominance',
    imageTitle: 'Find High-Intent SEO Keywords',
    features: [
      'Latent Semantic Indexing discovery for broad topical authority',
      'Search intent classification (Informational, Transactional, Navigational)',
      'Estimated keyword volume and difficulty logic for strategic planning',
      'Competitive grouping of semantic clusters to dominate niche rankings'
    ],
    howItWorks: [
      'Input your core seed topic or primary URL into the Architect forge.',
      'Define your target niche and preferred geographic search territory.',
      'Analyze the generated high-intent keyword clusters and semantic data.',
      'Download your SEO blueprint and integrate directly into your content.'
    ]
  },
  {
    id: 'ai-hashtag', title: 'Viral Density', icon: Hash,
    description: 'Find high-velocity hashtags for your niche. Beat the algorithms and expand your footprint.',
    color: '#8b5cf6', path: '/ai-tools/hashtag-generator', screenshot: 'ai-hashtag-discovery.png',
    imageAlt: 'PixTool Viral Density - Algorithm Optimization',
    imageTitle: 'Generate Viral Hashtags with AI',
    features: [
      'Real-time high-velocity detection for trending social media clusters',
      'Niche-specific hashtag generation tailored to your content category',
      'Algorithm compatibility verification for Instagram, TikTok, and X feeds',
      'One-click bulk copying of hashtag blocks for rapid social deployment'
    ],
    howItWorks: [
      'Briefly define your content niche or current viral objective.',
      'Select your priority social platform to align with specific algorithms.',
      'Forge a targeted collection of relevant high-density hashtags.',
      'Deploy the hashtag blocks directly to your post captions for reach.'
    ]
  },
  {
    id: 'ai-story', title: 'Narrative Forge', icon: BookOpen,
    description: 'Forge captivating fictional worlds, complex plot arcs, and deep character development.',
    color: '#8b5cf6', path: '/ai-tools/story-generator', screenshot: 'ai-creative-writing.png',
    imageAlt: 'PixTool Narrative Forge - Literary Architecture Partner',
    imageTitle: 'Write Engaging Stories with AI',
    features: [
      'Deep plot arc generation based on classic narrative structures',
      'Psychological character profiling for realistic fictional interaction',
      'World-building prompt library for rich environmental description',
      'Chapter-by-chapter flow orchestration to maintain story momentum'
    ],
    howItWorks: [
      'Define your core story genre and initial world-building premise.',
      'Select the primary emotional arc and narrative perspective required.',
      'Forge your creative manuscript with the AI Literary Architect.',
      'Refine the plot points and develop your saga into a full narrative.'
    ]
  }
];

export const MATH_TOOLS = [
  {
    id: 'scientific-calculator', title: 'Scientific Calculator', icon: Calculator,
    description: 'High-precision algebraic engine for complex engineering and scientific computations.',
    color: '#3b82f6', path: '/math-tools/scientific-calculator', screenshot: 'utility-tools-hub.png',
    imageAlt: 'PixTool Scientific Calculator - High-Precision Algebraic Engine',
    imageTitle: 'Advanced Scientific Calculator Online',
    features: [
      'High-precision algebraic logic engine for reliable scientific results',
      'Advanced trigonometric and logarithmic calculation capabilities',
      'Instant memory recall and history tracking for multi-stage proofs',
      'Industrial-grade decimal precision exceeding standard hardware units'
    ],
    howItWorks: [
      'Enter your complex mathematical expression into the algebraic forge.',
      'Select between Radian or Degree modes based on your research needs.',
      'Utilize scientific constants and history recalls for rapid computation.',
      'Receive instant high-precision results for engineering and analysis.'
    ]
  },
  {
    id: 'graph-visualizer', title: 'Graph Visualizer', icon: TrendingUp,
    description: 'Interactive functional plotting engine for 2D and 3D mathematical visualizations.',
    color: '#3b82f6', path: '/math-tools/graph-visualizer', screenshot: 'utility-tools-hub.png',
    imageAlt: 'PixTool Graph Visualizer - Interactive Functional Plotting',
    imageTitle: 'Expert Graphing Calculator Online',
    features: ['Multi-function plotting', 'Dynamic zooming', 'Coordinate tracking', 'High-res exports'],
    howItWorks: ['Add a function (e.g., sin(x))', 'Adjust view range', 'Analyze intersections']
  },
  {
    id: 'matrix-solver', title: 'Matrix Solver', icon: Grid,
    description: 'Professional linear algebra studio for matrix inversion, determinants, and rank calculations.',
    color: '#3b82f6', path: '/math-tools/matrix-solver', screenshot: 'utility-tools-hub.png',
    imageAlt: 'PixTool Matrix Solver - Linear Algebra Studio',
    imageTitle: 'Solve Matrix Equations Online',
    features: ['Inverse calculation', 'Determinant analysis', 'Matrix multiplication', 'Step-by-step logic'],
    howItWorks: ['Select matrix dimension', 'Input cell values', 'Perform linear operations']
  },
  {
    id: 'statistics-visualizer', title: 'Data Visualizer', icon: BarChart,
    description: 'Transform raw data into high-authority statistical charts and professional visualizations.',
    color: '#3b82f6', path: '/math-tools/statistics-visualizer', screenshot: 'expert-data-visualization-studio.png',
    imageAlt: 'PixTool Data Visualizer - Statistical Charting Studio',
    imageTitle: 'Generate Statistical Charts Online',
    features: ['Bar & Line charts', 'Distribution analysis', 'Mean/Median/StdDev', 'Web-ready exports'],
    howItWorks: ['Paste your data set', 'Select chart type', 'Download high-res visuals']
  },
  {
    id: 'equation-solver', title: 'Equation Solver', icon: Equal,
    description: 'Instant root finding and algebraic simplification for linear and quadratic equations.',
    color: '#3b82f6', path: '/math-tools/equation-solver', screenshot: 'algebraic-equation-solver.png',
    imageAlt: 'PixTool Equation Solver - Root Finding Engine',
    imageTitle: 'Solve Equations Online instantly',
    features: ['Linear & Quadratic support', 'Step-by-step simplification', 'Root finding logic', 'Variable isolation'],
    howItWorks: ['Enter your equation (e.g. 2x + 5 = 0)', 'Select solve for variable', 'Review the step-by-step solution']
  },
  {
    id: 'unit-circle', title: 'Unit Circle Studio', icon: Circle,
    description: 'Interactive trigonometry visualizer for understanding sines, cosines, and angle rotations.',
    color: '#3b82f6', path: '/math-tools/unit-circle', screenshot: 'utility-tools-hub.png',
    imageAlt: 'PixTool Unit Circle - Trigonometry Visualizer',
    imageTitle: 'Explore the Unit Circle Interactively',
    features: ['Interactive angle rotation', 'Sine/Cosine/Tangent values', 'Quadrant analysis', 'Degree/Radian toggle'],
    howItWorks: ['Drag the point on the circle', 'Analyze trigonometric values', 'Switch between units']
  },
  {
    id: 'financial-calculator', title: 'Finance Architect', icon: DollarSign,
    description: 'Advanced financial suite for TVM, Loan amortization, and ROI analysis.',
    color: '#3b82f6', path: '/math-tools/financial-calculator', screenshot: 'utility-tools-hub.png',
    imageAlt: 'PixTool Finance Architect - Business Logic Engine',
    imageTitle: 'Professional Financial Calculator Online',
    features: ['TVM calculations', 'Loan amortization schedules', 'Investment ROI analysis', 'Compound interest logic'],
    howItWorks: ['Choose financial calculator type', 'Input principal and interest', 'Generate amortization table']
  },
  {
    id: 'number-theory', title: 'Number Theory Forge', icon: Binary,
    description: 'Analyze number properties including prime factorization, GCD, and modular arithmetic.',
    color: '#3b82f6', path: '/math-tools/number-theory', screenshot: 'utility-tools-hub.png',
    imageAlt: 'PixTool Number Theory Forge - Prime Factorization',
    imageTitle: 'Number Theory & Prime Tools Online',
    features: ['Prime factorization', 'GCD & LCM calculator', 'Modular arithmetic', 'Integer analysis'],
    howItWorks: ['Enter any integer', 'Select theoretical operation', 'Review the mathematical breakdown']
  },
  {
    id: 'fraction-calculator', title: 'Fraction Pro', icon: Percent,
    description: 'Precise fractional arithmetic with simplified results and step-by-step logic.',
    color: '#3b82f6', path: '/math-tools/fraction-calculator', screenshot: 'utility-tools-hub.png',
    imageAlt: 'PixTool Fraction Pro - Precision Arithmetic',
    imageTitle: 'Add and Subtract Fractions Online',
    features: ['Simplified results', 'Mixed number support', 'Fraction-to-decimal conversion', 'Step-by-step arithmetic'],
    howItWorks: ['Input your fractions', 'Select operation (+, -, *, /)', 'Download or copy results']
  },
  {
    id: 'vector-calculator', title: 'Vector Forge', icon: ArrowUpRight,
    description: 'Calculate dot products, cross products, and magnitudes with 3D vector visualization.',
    color: '#3b82f6', path: '/math-tools/vector-calculator', screenshot: '3d-vector-calculator-visualizer.png',
    imageAlt: 'PixTool Vector Forge - 3D Magnitude Calculator',
    imageTitle: 'Solve Vector Equations Online',
    features: ['3D visualization', 'Dot & Cross products', 'Magnitude and unit vectors', 'Angle calculation'],
    howItWorks: ['Input vector coordinates (x, y, z)', 'Choose vector operation', 'Visualize the result in 3D']
  }
];

export const PRODUCTIVITY_TOOLS = [
  {
    id: 'todo', title: 'Todo List', icon: ListTodo,
    description: 'High-performance task management with priorities, categories, and browser-native persistence.',
    color: '#4f46e5', path: '/productivity-tools/todo', screenshot: 'pixtool-all-in-one-productivity-suite.png',
    imageAlt: 'PixTool Todo List - Private Task Management',
    imageTitle: 'Free Online Todo List with Persistence',
    features: ['Task priorities', 'Category grouping', 'Auto-save locally', 'One-click clearing'],
    howItWorks: ['Add your tasks', 'Set priority and category', 'Check off as you complete']
  },
  {
    id: 'kanban', title: 'Kanban Board', icon: Layout,
    description: 'Professional drag-and-drop board for visual project tracking. 100% private and on-device.',
    color: '#8b5cf6', path: '/productivity-tools/kanban', screenshot: 'pixtool-all-in-one-productivity-suite.png',
    imageAlt: 'PixTool Kanban Board - Visual Workflow Management',
    imageTitle: 'Free Online Kanban Board Pro',
    features: ['Drag-and-drop workflow', 'Custom card notes', 'Visual progress tracking', 'Instant local save'],
    howItWorks: ['Add your tasks to list', 'Drag cards between columns', 'Stay organized and focused']
  },
  {
    id: 'notepad', title: 'NotePad Pro', icon: FileText,
    description: 'Focus-built markdown editor with syntax highlighting, auto-save, and instant text exports.',
    color: '#06b6d4', path: '/productivity-tools/notepad', screenshot: 'pixtool-all-in-one-productivity-suite.png',
    imageAlt: 'PixTool Notepad - Secure Markdown Editor',
    imageTitle: 'Free Online Notepad with Auto-save',
    features: ['Markdown support', 'Live word count', 'Auto-save to browser', 'Download as .txt / .md'],
    howItWorks: ['Type your notes or draft', 'Format with markdown syntax', 'Download for safe keeping']
  },
  {
    id: 'drawing-board', title: 'Drawing Board', icon: Pencil,
    description: 'Full-featured digital canvas for sketching, wireframing, and creative design directly in your browser.',
    color: '#ec4899', path: '/productivity-tools/drawing-board', screenshot: 'pixtool-all-in-one-productivity-suite.png',
    imageAlt: 'PixTool Drawing Board - Digital Sketching Studio',
    imageTitle: 'Free Online Drawing Tool for Sketching',
    features: ['Brush & Shape tools', 'Multi-color palette', 'High-res exports', 'Layer-like control'],
    howItWorks: ['Select your drawing tool', 'Create your masterpiece', 'Export as high-res image']
  },
  {
    id: 'file-manager', title: 'File Vault', icon: Folder,
    description: 'Browser-native file manager. Store, organize, and manage your virtual files securely in IndexedDB.',
    color: '#f59e0b', path: '/productivity-tools/file-manager', screenshot: 'pixtool-all-in-one-productivity-suite.png',
    imageAlt: 'PixTool File Manager - Local Storage Explorer',
    imageTitle: 'Private Local File Manager Online',
    features: ['IndexedDB storage', 'Visual quota tracking', 'Folder organization', 'Import/Export system'],
    howItWorks: ['Add your local files', 'Organize into secure folders', 'Export for offline backup']
  },
  {
    id: 'pomodoro', title: 'Focus Clock', icon: Timer,
    description: 'Aesthetic Pomodoro timer designed to boost deep work through scientifically proven rest intervals.',
    color: '#ef4444', path: '/productivity-tools/pomodoro', screenshot: 'pixtool-all-in-one-productivity-suite.png',
    imageAlt: 'PixTool Pomodoro Timer - productivity focus tool',
    imageTitle: 'Free Online Pomodoro Timer',
    features: ['Custom work/break intervals', 'Notification sounds', 'Session tracking', 'Aesthetic minimalist design'],
    howItWorks: ['Set your work duration', 'Focus until the timer ends', 'Take your earned breaks']
  },
  {
    id: 'sticky-notes', title: 'Sticky Notes', icon: StickyNote,
    description: 'Virtual board for movable, color-coded sticky notes. Perfect for brainstorming and quick reminders.',
    color: '#10b981', path: '/productivity-tools/sticky-notes', screenshot: 'pixtool-all-in-one-productivity-suite.png',
    imageAlt: 'PixTool Sticky Notes - Digital Brainstorming Board',
    imageTitle: 'Online Virtual Sticky Notes Board',
    features: ['Multi-color notes', 'Drag-and-drop workspace', 'Browser-native auto-save', 'Rich text support'],
    howItWorks: ['Add a new sticky note', 'Type your brilliant idea', 'Rearrange and organize boards']
  },
  {
    id: 'habit-tracker', title: 'Habit Tracker', icon: Activity,
    description: 'Track your daily routines and build long-term consistency with our visual habit streak manager.',
    color: '#3b82f6', path: '/productivity-tools/habit-tracker', screenshot: 'pixtool-all-in-one-productivity-suite.png',
    imageAlt: 'PixTool Habit Tracker - Daily Routine Manager',
    imageTitle: 'Free Online Habit Tracker Pro',
    features: ['Daily streak tracking', 'Progress visualization', 'Customizable habit lists', 'Private local database'],
    howItWorks: ['Create your daily habits', 'Mark them done each day', 'Watch your consistency grow']
  }
];

export const ALL_TOOLS_MAP = {
  ...IMAGE_TOOLS.reduce((acc, t) => ({ ...acc, [t.path]: t }), {}),
  ...PDF_TOOLS.reduce((acc, t) => ({ ...acc, [t.path]: t }), {}),
  ...UTILITY_TOOLS.reduce((acc, t) => ({ ...acc, [t.path]: t }), {}),
  ...AI_TOOLS.reduce((acc, t) => ({ ...acc, [t.path]: t }), {}),
  ...MATH_TOOLS.reduce((acc, t) => ({ ...acc, [t.path]: t }), {}),
  ...PRODUCTIVITY_TOOLS.reduce((acc, t) => ({ ...acc, [t.path]: t }), {}),
  '/utility-tools': { title: 'Utility Suite', icon: Sliders },
  '/ai-tools': { title: 'AI Suite', icon: MessageSquare },
  '/math-tools': { title: 'Math Suite', icon: Calculator },
  '/productivity-tools': { title: 'Productivity Suite', icon: Zap }
};
