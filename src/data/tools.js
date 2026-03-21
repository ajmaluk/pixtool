import { 
  Maximize2, Crop, RotateCw, FileArchive, RefreshCw, Type, FlipHorizontal, Palette, 
  FilePlus, SplitSquareHorizontal, FileCheck, FileImage, Lock, ArrowUpDown, FileText, Sliders,
  Mail, Smartphone, QrCode, Image as ImageIcon, Search
} from 'lucide-react';

export const IMAGE_TOOLS = [
  { id: 'resize', title: 'Resize Image', icon: Maximize2, description: 'Resize photos by pixels or percentage — free online image resizer for social media, web, and print', color: '#a855f7', path: '/image-tools/resize', screenshot: 'best-online-image-resizer-tool.png' },
  { id: 'crop', title: 'Crop Image', icon: Crop, description: 'Crop images to any aspect ratio — perfect for Instagram, YouTube thumbnails, and profile pictures', color: '#a855f7', path: '/image-tools/crop', screenshot: 'professional-image-cropper-online.png' },
  { id: 'rotate', title: 'Rotate Image', icon: RotateCw, description: 'Rotate and flip images instantly — fix orientation, create mirror effects, correct EXIF data', color: '#a855f7', path: '/image-tools/rotate', screenshot: 'free-online-image-rotator.png' },
  { id: 'compress', title: 'Compress Image', icon: FileArchive, description: 'Reduce image file size by up to 80% without quality loss — optimize for web and email', color: '#a855f7', path: '/image-tools/compress', screenshot: 'high-quality-image-compressor-online.png' },
  { id: 'convert', title: 'Convert Format', icon: RefreshCw, description: 'Convert images between JPEG, PNG, WebP, and GIF — free format converter', color: '#a855f7', path: '/image-tools/convert', screenshot: 'online-image-format-converter-webp-png-jpg.png' },
  { id: 'watermark', title: 'Add Watermark', icon: Type, description: 'Add custom text watermarks to protect your photos — adjustable font, size, and opacity', color: '#a855f7', path: '/image-tools/watermark', screenshot: 'add-watermark-to-photos-online-free.png' },
  { id: 'flip', title: 'Flip Image', icon: FlipHorizontal, description: 'Flip images horizontally or vertically — create mirror effects and fix selfie orientation', color: '#a855f7', path: '/image-tools/flip', screenshot: 'flip-and-mirror-images-online-instantly.png' },
  { id: 'grayscale', title: 'Grayscale', icon: Palette, description: 'Convert color images to black & white, sepia, or vintage — artistic photo effects', color: '#a855f7', path: '/image-tools/grayscale', screenshot: 'convert-image-to-grayscale-online.png' },
  { id: 'upscale', title: 'AI Upscaler', icon: Maximize2, description: 'Increase image resolution and quality using AI-enhanced upscaling — cleaner, sharper results for small photos.', color: '#a855f7', status: 'coming-soon', path: '/image-tools/upscale', screenshot: 'best-online-image-resizer-tool.png' },
  { id: 'restore', title: 'Photo Restoration', icon: RefreshCw, description: 'Restore old, blurry, or low-quality photos — AI-powered enhancement for vintage digital images.', color: '#a855f7', status: 'coming-soon', path: '/image-tools/restore', screenshot: 'professional-online-image-studio.png' },
  { id: 'image-to-pdf', title: 'Image to PDF', icon: ImageIcon, description: 'Convert multiple images into a single professional PDF document — perfect for portfolios and reports.', color: '#a855f7', status: 'coming-soon', path: '/image-tools/image-to-pdf', screenshot: 'secure-pdf-management-suite.png' },
  { id: 'remove-background', title: 'BG Remover', icon: ImageIcon, description: 'Remove image backgrounds instantly in your browser — AI-powered object isolation.', color: '#a855f7', status: 'coming-soon', path: '/image-tools/remove-background', screenshot: 'professional-online-image-studio.png' }
];

export const PDF_TOOLS = [
  { id: 'merge', title: 'Merge PDF', icon: FilePlus, description: 'Combine multiple PDF files into one document — free online PDF merger with drag-and-drop', color: '#06b6d4', path: '/pdf-tools/merge', screenshot: 'fast-pdf-merger-no-upload-dailytools.png' },
  { id: 'split', title: 'Split PDF', icon: SplitSquareHorizontal, description: 'Extract specific pages or split PDF into separate files — no upload required', color: '#06b6d4', path: '/pdf-tools/split', screenshot: 'split-pdf-pages-online-securely.png' },
  { id: 'compress', title: 'Compress PDF', icon: FileCheck, description: 'Reduce PDF file size by up to 90% while maintaining document quality', color: '#06b6d4', path: '/pdf-tools/compress', screenshot: 'optimize-pdf-file-size-online.png' },
  { id: 'convert', title: 'PDF to Images', icon: FileImage, description: 'Convert PDF pages to high-quality PNG, JPG, or WebP images instantly', color: '#06b6d4', path: '/pdf-tools/convert', screenshot: 'convert-pdf-to-images-online-high-res.png' },
  { id: 'protect', title: 'Protect PDF', icon: Lock, description: 'Add password protection and encryption to your PDF files — keep documents secure', color: '#06b6d4', path: '/pdf-tools/protect', screenshot: 'secure-pdf-with-password-online.png' },
  { id: 'watermark', title: 'Watermark PDF', icon: Type, description: 'Add text watermarks to all PDF pages — mark as CONFIDENTIAL, DRAFT, or custom text', color: '#06b6d4', path: '/pdf-tools/watermark', screenshot: 'add-text-watermark-to-pdf-online.png' },
  { id: 'reorder', title: 'Reorder Pages', icon: ArrowUpDown, description: 'Rearrange PDF pages in any order — drag-and-drop page reordering', color: '#06b6d4', path: '/pdf-tools/reorder', screenshot: 'reorder-pdf-pages-online-free.png' },
  { id: 'to-word', title: 'PDF to Word', icon: FileText, description: 'Convert PDF files to editable Word documents (.docx) — high-fidelity conversion preserving layout.', color: '#06b6d4', status: 'coming-soon', path: '/pdf-tools/to-word', screenshot: 'secure-pdf-management-suite.png' },
  { id: 'to-excel', title: 'PDF to Excel', icon: Sliders, description: 'Extract tables from PDF to Excel spreadsheets (.xlsx) — intelligent data extraction.', color: '#06b6d4', status: 'coming-soon', path: '/pdf-tools/to-excel', screenshot: 'secure-pdf-management-suite.png' },
  { id: 'to-ppt', title: 'PDF to PPT', icon: FileImage, description: 'Transform PDF pages into editable PowerPoint slides — perfect for presentations.', color: '#06b6d4', status: 'coming-soon', path: '/pdf-tools/to-ppt', screenshot: 'secure-pdf-management-suite.png' },
  { id: 'unlock', title: 'Unlock PDF', icon: Lock, description: 'Remove passwords and permissions from protected PDF files — instant access.', color: '#06b6d4', status: 'coming-soon', path: '/pdf-tools/unlock', screenshot: 'secure-pdf-with-password-online.png' },
  { id: 'ocr', title: 'PDF OCR', icon: Search, description: 'Make scanned PDFs searchable and editable using on-device AI text recognition.', color: '#06b6d4', status: 'coming-soon', path: '/pdf-tools/ocr', screenshot: 'secure-pdf-management-suite.png' },
  { id: 'edit', title: 'PDF Editor', icon: FileText, description: 'Edit existing text and images in your PDF — professional document editing in your browser.', color: '#06b6d4', status: 'coming-soon', path: '/pdf-tools/edit', screenshot: 'secure-pdf-management-suite.png' }
];

export const UTILITY_TOOLS = [
  { id: 'temp-mail', title: 'Temp Mail', icon: Mail, description: 'Generate free disposable email addresses instantly — protect your inbox from spam and trackers', color: '#ec4899', path: '/temp-mail', screenshot: 'disposable-temporary-email-generator.png' },
  { id: '10-minute-mail', title: '10 Minute Mail', icon: Mail, description: 'Create a throwaway inbox that automatically expires in 10 minutes — privacy-first', color: '#ec4899', path: '/temp-mail/10-minute-mail', screenshot: '10-minute-mail-free-disposable-inbox.png' },
  { id: 'change-email', title: 'Change Email', icon: RefreshCw, description: 'Generate a new temporary email address instantly for multiple signups', color: '#ec4899', path: '/temp-mail/change-email', screenshot: 'change-temporary-email-address-online.png' },
  { id: 'typing-test', title: 'Typing Test', icon: Type, description: 'Practice typing like MonkeyType — track WPM and accuracy, 100% free', color: '#ec4899', path: '/typing-test', screenshot: 'professional-typing-speed-test-online.png' },
  { id: 'qr-scanner', title: 'QR Scanner', icon: Smartphone, description: 'Scan any QR code using your camera or by uploading an image — free and private', color: '#10b981', path: '/qr-scanner', screenshot: 'fast-online-qr-code-scanner-browser.png' },
  { id: 'qr-generator', title: 'QR Generator', icon: QrCode, description: 'Create custom QR codes for URLs, WiFi, text, email, and phone — download as PNG', color: '#f59e0b', path: '/qr-generator', screenshot: 'best-free-qr-code-generator-online.png' },
  { id: 'fake-email', title: 'Fake Email', icon: Mail, description: 'Generate a fake email identity for testing and privacy.', color: '#ec4899', path: '/fake-email', screenshot: 'generate-fake-email-for-testing.png' },
  { id: 'disposable-email', title: 'Disposable Email', icon: Mail, description: 'Create a one-time email address for anonymous signups.', color: '#ec4899', path: '/disposable-email', screenshot: 'burner-email-address-generator-privacy.png' },
  { id: 'throwaway-email', title: 'Throwaway Email', icon: Mail, description: 'Secure throwaway inbox for temporary communication.', color: '#ec4899', path: '/throwaway-email', screenshot: 'throwaway-email-inbox-online-free.png' }
];

export const ALL_TOOLS_MAP = {
  ...IMAGE_TOOLS.reduce((acc, t) => ({ ...acc, [t.path]: { name: t.title, icon: t.icon } }), {}),
  ...PDF_TOOLS.reduce((acc, t) => ({ ...acc, [t.path]: { name: t.title, icon: t.icon } }), {}),
  ...UTILITY_TOOLS.reduce((acc, t) => ({ ...acc, [t.path]: { name: t.title, icon: t.icon } }), {}),
  '/utility-tools': { name: 'Utility Suite', icon: Sliders }
};
