/**
 * PDF utility functions for client-side processing.
 * Using pdf-lib and pdfjs-dist.
 */
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

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
