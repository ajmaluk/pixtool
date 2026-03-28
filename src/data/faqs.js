export const GLOBAL_FAQS = [
  { q: "Is PixTool really free?", a: "Yes, 100% free. Every tool on PixTool is available without any cost, subscription, or hidden fees. We support the platform through non-intrusive advertising." },
  { q: "Are my files safe and private?", a: "Absolutely. PixTool processes your files entirely within your browser. Your images, PDFs, and documents are never uploaded to any server. Once you close the tab, your data is gone." },
  { q: "What image formats are supported?", a: "Our image tools support all major formats including JPEG, PNG, WebP, GIF, BMP, and TIFF. You can also convert between formats while resizing, cropping, or compressing." },
  { q: "Can I merge more than two PDFs?", a: "Yes! Our PDF merger supports combining as many PDF files as you need into a single document. Simply upload all your files and arrange them in the desired order." },
  { q: "Do I need to install anything?", a: "No installation required. PixTool runs entirely in your web browser. Just visit the site and start using any tool immediately on any device." },
  { q: "What is the maximum file size?", a: "Since processing happens in your browser, the limit depends on your device's available memory. Most modern devices can handle files up to 100MB+ without issues." },
  { q: "How secure are the AI tools?", a: "Extremely secure. Unlike other platforms, PixTool AI tools use a privacy-first integration. Your prompt context is only used to generate the response and is never stored, sold, or used for training models." },
  { q: "Do the AI tools work offline?", a: "Currently, our AI tools (Chat, Resume Architect, etc.) require an internet connection to communicate with our secure inference backend. However, all image and PDF processing remains 100% offline." },
  { q: "Which AI models power PixTool?", a: "We leverage a blend of state-of-the-art LLMs (including Gemini 2.0 Pro and GPT-4o) via our high-speed, secure API to ensure you get professional-grade results for free." },
];

export const TOOL_SPECIFIC_FAQS = {
  'temp-mail': [
    { q: "What is a temporary email service?", a: "A temporary email (also known as temp mail, 10-minute mail, or disposable email) provides you with a short-lived inbox to receive verification codes and sign up for services without exposing your real email to potential spam or data breaches." },
    { q: "How long does my temporary email address stay active?", a: "Your email address remains active as long as you keep the browser tab open. Once you close the page or click 'New Email', the mailbox is permanently deleted for your security." },
    { q: "Is PixTool Temp Mail truly private?", a: "Yes. Our service runs directly in your browser and communicates with the mail server via secure APIs. We never store your messages on our servers, and we don't track your identity." },
    { q: "Can I send emails from this address?", a: "To prevent abuse and maintain the integrity of our service, we currently only support receiving emails. This covers 99% of use cases like account verification and newsletter signups." }
  ],
  'qr-generator': [
    { q: "Is this QR generator free for commercial use?", a: "Yes. You can generate unlimited QR codes for your business, marketing materials, or personal projects without any licensing fees or attribution required." },
    { q: "Do these QR codes expire?", a: "No. Our QR codes are static, meaning they contain the data directly. As long as the link or information inside is valid, the QR code will work forever." },
    { q: "Can I customize the color and logo?", a: "Yes! Our professional generator allows you to change colors, add custom logos, and choose different frame styles to match your brand identity." }
  ]
};
