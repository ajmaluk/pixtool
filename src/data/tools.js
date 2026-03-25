import { 
  Maximize2, Crop, RotateCw, FileArchive, RefreshCw, Type, FlipHorizontal, Palette, 
  FilePlus, SplitSquareHorizontal, FileCheck, FileImage, Lock, ArrowUpDown, FileText, Sliders,
  Mail, Smartphone, QrCode, Image as ImageIcon, Search, Braces, Scale, Key, MessageSquare, 
  PenTool, Edit3, FileSignature, Code, AtSign, Megaphone, Hash, AlignLeft, Globe, 
  BookOpen
} from 'lucide-react';

export const IMAGE_TOOLS = [
  { 
    id: 'resize', title: 'Resize Image', icon: Maximize2, 
    description: 'Quickly resize images to exact dimensions or percentages using professional-grade scaling algorithms.', 
    color: '#a855f7', path: '/image-tools/resize', screenshot: 'best-online-image-resizer-tool.png',
    imageAlt: 'PixTool Image Resizer - Precision Scaling for High-Quality Photos',
    imageTitle: 'Resize Images Online with PixTool',
    features: ['Pixel-perfect scaling', 'Maintains aspect ratio', 'Support for bulk resizing', 'High-fidelity output'],
    howItWorks: ['Upload your image', 'Set your desired dimensions', 'Download the resized version']
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
    description: 'Combine multiple PDF documents into a single professional file instantly. Reorder pages with ease, 100% private.', 
    color: '#06b6d4', path: '/pdf-tools/merge', screenshot: 'fast-pdf-merger-no-upload-pixtool.png',
    imageAlt: 'PixTool PDF Merger - Secure and Fast Multi-File Joining locally',
    imageTitle: 'Merge PDF Files Online Securely',
    features: ['Instant local merging', 'No upload required', 'Drag-and-drop reordering', 'Maintains original quality'],
    howItWorks: ['Upload multiple PDF files', 'Drag to reorder pages', 'Merge and download instantly']
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
    description: 'Optimize PDF file sizes for email and web while maintaining professional document fidelity and clarity, 100% private.', 
    color: '#06b6d4', path: '/pdf-tools/compress', screenshot: 'optimize-pdf-file-size-online.png',
    imageAlt: 'PixTool PDF Compressor - Professional Size Reduction locally',
    imageTitle: 'Compress PDF Online without Uploading',
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
    description: 'Generate free disposable email addresses instantly — protect your inbox from spam, trackers, and Reddit-approved privacy.', 
    color: '#ec4899', path: '/temp-mail', screenshot: 'disposable-temporary-email-generator.png',
    imageAlt: 'PixTool Temp Mail - Instant anonymous inbox generation',
    imageTitle: 'Free Temporary Email Service for Privacy',
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
    description: 'Scan any QR code using your camera or by uploading an image — free, private, and professional.', 
    color: '#10b981', path: '/qr-scanner', screenshot: 'fast-online-qr-code-scanner-browser.png',
    imageAlt: 'PixTool QR Scanner - Browser-based decoding from Image/Camera',
    imageTitle: 'Scan QR Code Online from Photos',
    features: ['Decode from Image File', 'Live Camera Scanning', 'Instant link detection', 'Privacy-first processing'],
    howItWorks: ['Grant camera access or upload', 'Point at code or select image', 'Access the decoded content']
  },
  { 
    id: 'qr-generator', title: 'QR Generator', icon: QrCode, 
    description: 'Create custom branded QR codes for URLs, WiFi, text, email, and phone — high-resolution PNG downloads.', 
    color: '#f59e0b', path: '/qr-generator', screenshot: 'best-free-qr-code-generator-online.png',
    imageAlt: 'PixTool QR Generator - Professional Custom code creation',
    imageTitle: 'Generate High-Quality QR Codes Free',
    features: ['Custom Link Support', 'WiFi/vCard generation', 'High-res PNG Export', 'Privacy-first generation'],
    howItWorks: ['Choose your data type', 'Input your content details', 'Download your custom QR code']
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



export const AI_TOOLS = [
  {
    id: 'ai-chat', title: 'Deep Mind', icon: MessageSquare,
    description: 'Access non-linear intelligence for complex problem-solving, rapid knowledge synthesis, and professional consulting.',
    color: '#8b5cf6', path: '/ai-tools/chat', screenshot: 'ai-chat-assistant.png',
    imageAlt: 'PixTool Deep Mind - High-Authority General Intelligence Assistant',
    imageTitle: 'Professional AI Chat Assistant for Business',
    features: ['Context-aware reasoning', 'Multilingual support', 'Creative brainstorming', 'Complex logic solving'],
    howItWorks: ['Enter your query or problem', 'Receive high-authority response', 'Refine and iterate in real-time']
  },
  {
    id: 'ai-content-generator', title: 'Content Forge', icon: PenTool,
    description: 'Architect high-authority blog posts, viral scripts, and professional articles with linguistic precision.',
    color: '#8b5cf6', path: '/ai-tools/content-generator', screenshot: 'ai-content-creation.png',
    imageAlt: 'PixTool Content Forge - High-Authority Writing Studio with AI',
    imageTitle: 'Generate High-Quality AI Content Professionally',
    features: ['SEO-optimized drafting', 'Linguistic tone control', 'Structural brainstorming', 'Plagiarism-aware output'],
    howItWorks: ['Define your topic or niche', 'Select your preferred tone', 'Forge professional content']
  },
  {
    id: 'ai-grammar-fixer', title: 'Grammar Architect', icon: Edit3,
    description: 'Achieve linguistic perfection. Our AI analyzes your text for grammar, spelling, and professional semantic flow.',
    color: '#8b5cf6', path: '/ai-tools/grammar-fixer', screenshot: 'ai-grammar-checker.png',
    imageAlt: 'PixTool Grammar Architect - Professional Proofreading Studio for Business',
    imageTitle: 'Fix Grammar and Style with AI precision',
    features: ['Advanced syntax correction', 'Context-aware spellcheck', 'Readability optimization', 'Tone consistency check'],
    howItWorks: ['Paste your draft text', 'Review intelligence feedback', 'Apply professional fixes']
  },
  {
    id: 'ai-resume-generator', title: 'Resume Architect', icon: FileSignature,
    description: 'Build a career-winning, ATS-friendly resume through an interactive AI interview process and career-mapping.',
    color: '#8b5cf6', path: '/ai-tools/resume-generator', screenshot: 'ai-resume-builder.png',
    imageAlt: 'PixTool Resume Architect - Professional Career Builder for 2026',
    imageTitle: 'Build ATS-Friendly Resumes with AI assistance',
    features: ['ATS-optimized structures', 'Keyword density analysis', 'Interactive career interview', 'Professional PDF export'],
    howItWorks: ['Input your experience', 'Select target industry', 'Generate ATS-ready resume']
  },
  {
    id: 'ai-coding-chat', title: 'Code Intelligence', icon: Code,
    description: 'Your 24/7 senior developer. Write, debug, and refactor code across 20+ languages with high-authority logic.',
    color: '#8b5cf6', path: '/ai-tools/coding-chat', screenshot: 'ai-code-assistant.png',
    imageAlt: 'PixTool Code Intelligence - Pro Developer AI Assistant with 20+ languages',
    imageTitle: 'Professional AI Programming assistance',
    features: ['Full-stack logic solving', 'Syntax optimization', 'Refactoring patterns', 'On-device code privacy'],
    howItWorks: ['Paste your code or logic', 'Get senior-level feedback', 'Refine and implement fixes']
  },
  {
    id: 'ai-email-writer', title: 'Professional Correspondence', icon: AtSign,
    description: 'Draft high-conversion professional emails and persuasive follow-ups tailored to any scenario.',
    color: '#8b5cf6', path: '/ai-tools/email-writer', screenshot: 'ai-email-drafter.png',
    imageAlt: 'PixTool Professional Correspondence - Business Communication',
    imageTitle: 'Write Business Emails with AI'
  },
  {
    id: 'ai-ad-copy', title: 'Marketing Pulse', icon: Megaphone,
    description: 'Generate high-performance marketing copy optimized for Google, Meta, and LinkedIn.',
    color: '#8b5cf6', path: '/ai-tools/ad-copy-generator', screenshot: 'ai-ad-copy.png',
    imageAlt: 'PixTool Marketing Pulse - Performance Copy Engine',
    imageTitle: 'Create Converting Ads with AI'
  },
  {
    id: 'ai-caption', title: 'Social Pulse', icon: Hash,
    description: 'Scale your reach with viral, platform-optimized captions for Instagram, TikTok, and X.',
    color: '#8b5cf6', path: '/ai-tools/caption-generator', screenshot: 'ai-captions.png',
    imageAlt: 'PixTool Social Pulse - Social Media Viral Engine',
    imageTitle: 'Trending Social Captions with AI'
  },
  {
    id: 'ai-paraphraser', title: 'Nuance Engine', icon: AlignLeft,
    description: 'Transform your writing. Effortlessly rephrase content to improve flow and authority.',
    color: '#8b5cf6', path: '/ai-tools/paraphraser', screenshot: 'ai-paraphrasing-tool.png',
    imageAlt: 'PixTool Nuance Engine - Advanced Stylistic Transformation',
    imageTitle: 'Professional AI Text Paraphraser'
  },
  {
    id: 'ai-summarizer', title: 'Intelligence Distiller', icon: FileText,
    description: 'Cut through the noise. Condense massive documents into actionable, high-level intelligence summaries instantly.',
    color: '#8b5cf6', path: '/ai-tools/summarizer', screenshot: 'ai-text-summarizer.png',
    imageAlt: 'PixTool Intelligence Distiller - Document Intelligence and Summarization',
    imageTitle: 'Summarize Long Documents with AI Intelligence',
    features: ['Core keyword extraction', 'Bullet-point synthesis', 'Strategic summaries', 'Fast text processing'],
    howItWorks: ['Paste your long document', 'Select summary intensity', 'Extract actionable insights']
  },
  {
    id: 'ai-translator', title: 'Linguist Intelligence', icon: Globe,
    description: 'Break language barriers with context-aware translations in over 50 global languages.',
    color: '#8b5cf6', path: '/ai-tools/translator', screenshot: 'ai-translation.png',
    imageAlt: 'PixTool Linguist Intelligence - Accurate Translation',
    imageTitle: 'Professional Language Translation with AI'
  },
  {
    id: 'ai-keyword', title: 'SEO Architect', icon: Search,
    description: 'Unlock search dominance. Generate high-intent keywords and semantic tags to boost rankings.',
    color: '#8b5cf6', path: '/ai-tools/keyword-generator', screenshot: 'ai-seo-keywords.png',
    imageAlt: 'PixTool SEO Architect - Search Ranking Dominance',
    imageTitle: 'Find High-Intent SEO Keywords'
  },
  {
    id: 'ai-hashtag', title: 'Viral Density', icon: Hash,
    description: 'Find high-velocity hashtags for your niche. Beat the algorithms and expand your footprint.',
    color: '#8b5cf6', path: '/ai-tools/hashtag-generator', screenshot: 'ai-hashtag-discovery.png',
    imageAlt: 'PixTool Viral Density - Algorithm Optimization',
    imageTitle: 'Generate Viral Hashtags with AI'
  },
  {
    id: 'ai-story', title: 'Narrative Forge', icon: BookOpen,
    description: 'Forge captivating fictional worlds, complex plot arcs, and deep character development.',
    color: '#8b5cf6', path: '/ai-tools/story-generator', screenshot: 'ai-creative-writing.png',
    imageAlt: 'PixTool Narrative Forge - Literary Architecture Partner',
    imageTitle: 'Write Engaging Stories with AI'
  }
];

export const ALL_TOOLS_MAP = {
  ...IMAGE_TOOLS.reduce((acc, t) => ({ ...acc, [t.path]: t }), {}),
  ...PDF_TOOLS.reduce((acc, t) => ({ ...acc, [t.path]: t }), {}),
  ...UTILITY_TOOLS.reduce((acc, t) => ({ ...acc, [t.path]: t }), {}),
  ...AI_TOOLS.reduce((acc, t) => ({ ...acc, [t.path]: t }), {}),
  '/utility-tools': { title: 'Utility Suite', icon: Sliders },
  '/ai-tools': { title: 'AI Suite', icon: MessageSquare }
};
