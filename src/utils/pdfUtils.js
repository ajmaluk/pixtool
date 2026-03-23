/**
 * PDF utility functions for client-side processing.
 * Using pdf-lib, pdfjs-dist, and Tesseract.js for advanced OCR.
 */
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist'
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import Tesseract from 'tesseract.js'

GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const PDF_PAGE_SIZES = {
  A4: [595.28, 841.89],
  Letter: [612, 792]
};

const loadImageForPdf = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error(`Failed to load image: ${file.name}`));
    };
    img.src = objectUrl;
  });
};

const imageToPngBytes = async (file) => {
  const img = await loadImageForPdf(file);
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) {
    throw new Error(`Failed to convert image to PNG: ${file.name}`);
  }
  return await blob.arrayBuffer();
};

export const imageFilesToPdf = async (files, options = {}) => {
  const pageSize = options.pageSize || 'A4';
  const orientation = options.orientation || 'portrait';
  const margin = Number.isFinite(options.margin) ? options.margin : 24;

  const [baseW, baseH] = PDF_PAGE_SIZES[pageSize] || PDF_PAGE_SIZES.A4;
  const pageWidth = orientation === 'landscape' ? baseH : baseW;
  const pageHeight = orientation === 'landscape' ? baseW : baseH;

  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    const pngBytes = await imageToPngBytes(file);
    const embedded = await pdfDoc.embedPng(pngBytes);
    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    const maxW = Math.max(1, pageWidth - margin * 2);
    const maxH = Math.max(1, pageHeight - margin * 2);
    const scale = Math.min(maxW / embedded.width, maxH / embedded.height);

    const drawW = embedded.width * scale;
    const drawH = embedded.height * scale;
    const x = (pageWidth - drawW) / 2;
    const y = (pageHeight - drawH) / 2;

    page.drawImage(embedded, { x, y, width: drawW, height: drawH });
  }

  return await pdfDoc.save();
};

/**
 * Merges multiple PDF files into one.
 */
export const mergePdfs = async (files) => {
  const mergedPdf = await PDFDocument.create();
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  return await mergedPdf.save();
};

/**
 * Splits a PDF by page range.
 */
export const splitPdf = async (file, startPage, endPage) => {
  const arrayBuffer = await file.arrayBuffer();
  const sourceDoc = await PDFDocument.load(arrayBuffer);
  const pdfDoc = await PDFDocument.create();
  
  const start = Math.max(1, startPage) - 1;
  const end = Math.min(sourceDoc.getPageCount(), endPage) - 1;
  
  if (start <= end) {
    const indices = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    const pages = await pdfDoc.copyPages(sourceDoc, indices);
    pages.forEach(p => pdfDoc.addPage(p));
  }
  
  return await pdfDoc.save();
};

/**
 * Adds a watermark to a PDF.
 */
export const watermarkPdf = async (file, text, size, opacity) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  const pages = pdfDoc.getPages();
  pages.forEach(page => {
    const { width, height } = page.getSize();
    page.drawText(text || 'PixTool', {
      x: width / 2 - (text.length * size) / 4,
      y: height / 2,
      size: size,
      font,
      color: rgb(0.5, 0.5, 0.5),
      opacity: opacity / 100,
      rotate: { angle: 45, type: 'degrees' },
    });
  });
  
  return await pdfDoc.save();
};

/**
 * Compresses a PDF (Simulated via optimization if possible).
 */
export const compressPdf = async (file) => {
  // pdf-lib doesn't support complex compression natively yet, 
  // but we can re-save with specific flags if available.
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  return await pdfDoc.save({ useObjectStreams: false });
};

export const unlockPdf = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  let pdfDoc;
  try {
    pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  } catch {
    throw new Error('Unable to unlock this PDF in browser. It may use unsupported encryption.');
  }
  return await pdfDoc.save({ useObjectStreams: false });
};

export const extractPdfText = async (file, options = {}) => {
  const includePageBreaks = options.includePageBreaks !== false;
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;

  const pages = [];
  let recognizedPages = 0;

  for (let pageNo = 1; pageNo <= pdf.numPages; pageNo += 1) {
    const page = await pdf.getPage(pageNo);
    const content = await page.getTextContent();
    const text = content.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (text.length > 0) {
      recognizedPages += 1;
      pages.push(text);
    } else {
      pages.push('');
    }
  }

  await loadingTask.destroy();

  const text = includePageBreaks
    ? pages.map((p, idx) => `--- Page ${idx + 1} ---\n${p || '[No extractable text found]'}\n`).join('\n')
    : pages.join('\n').trim();

  return {
    text,
    pageCount: pdf.numPages,
    recognizedPages
  };
};

/**
 * Helper to download a blob
 */
export const downloadBlob = (blob, fileName) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 100);
};

/**
 * Convert PDF page to canvas image for OCR processing
 */
const pdfPageToCanvas = async (pdf, pageNo, scale = 2) => {
  const page = await pdf.getPage(pageNo);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({ canvasContext: ctx, viewport }).promise;
  return canvas;
};

/**
 * Extract text from PDF using Tesseract.js for scanned images
 * Supports multiple languages via language parameter
 */
export const extractPdfTextWithTesseract = async (file, options = {}) => {
  const languages = options.languages || ['eng']; // Default to English
  const includePageBreaks = options.includePageBreaks !== false;
  const onProgress = options.onProgress || (() => {});
  
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;

  const pages = [];
  let processedPages = 0;
  const totalPages = pdf.numPages;

  // Try to initialize Tesseract worker with selected languages
  const worker = await Tesseract.createWorker({
    logger: (m) => {
      if (m.status === 'recognizing') {
        onProgress({
          type: 'ocr',
          progress: m.progress * 100,
          pageNo: processedPages + 1,
          totalPages
        });
      }
    }
  });

  try {
    // Load languages into worker
    const langString = languages.join('+');
    await worker.loadLanguage(langString);
    await worker.initialize(langString);

    for (let pageNo = 1; pageNo <= totalPages; pageNo += 1) {
      try {
        const canvas = await pdfPageToCanvas(pdf, pageNo, 2);
        const { data: { text } } = await worker.recognize(canvas);
        pages.push(text || '');
        processedPages += 1;
        onProgress({
          type: 'page',
          pageNo,
          totalPages,
          progress: (pageNo / totalPages) * 100
        });
      } catch (pageError) {
        console.warn(`OCR failed for page ${pageNo}:`, pageError);
        pages.push(`[OCR Error on page ${pageNo}]`);
      }
    }

    await worker.terminate();
  } catch (error) {
    console.error('Tesseract initialization error:', error);
    await worker.terminate();
    throw new Error('Failed to initialize OCR engine. Please check your internet connection.');
  }

  await loadingTask.destroy();

  const text = includePageBreaks
    ? pages.map((p, idx) => `--- Page ${idx + 1} ---\n${p || '[No text recognized]'}\n`).join('\n')
    : pages.join('\n').trim();

  return {
    text,
    pageCount: totalPages,
    recognizedPages: pages.filter(p => p.trim().length > 0).length,
    method: 'tesseract'
  };
};

/**
 * Enhanced unlock with password support
 * First tries standard unlock, then prompts for password if needed
 */
export const unlockPdfWithPassword = async (file, password = null) => {
  const arrayBuffer = await file.arrayBuffer();
  let pdfDoc;

  try {
    // First attempt: try without password (standard encryption)
    pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    return {
      success: true,
      bytes: await pdfDoc.save({ useObjectStreams: false }),
      requiresPassword: false
    };
  } catch {
    // If password provided, try with password
    if (password) {
      try {
        pdfDoc = await PDFDocument.load(arrayBuffer, { userPassword: password, ownerPassword: password });
        return {
          success: true,
          bytes: await pdfDoc.save({ useObjectStreams: false }),
          requiresPassword: true
        };
      } catch {
        return {
          success: false,
          error: 'Invalid password or unsupported encryption',
          requiresPassword: true
        };
      }
    }
    
    return {
      success: false,
      error: 'PDF is password-protected. Please provide a password.',
      requiresPassword: true
    };
  }
};
