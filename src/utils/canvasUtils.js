/**
 * Canvas utility functions for high-performance image processing.
 * Part of the PixTool Architectural Harmonization.
 * Includes advanced brushing and color picker tools.
 */

export const loadImage = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
  });
};

export const processImageFile = async (file, activeTool, settings) => {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  let width = img.width;
  let height = img.height;
  let sourceX = 0;
  let sourceY = 0;
  let sourceWidth = img.width;
  let sourceHeight = img.height;

  // 1. Calculate Dimensions
  if (activeTool === 'resize') {
    width = settings.width;
    height = settings.maintainAspect
      ? Math.round(img.height * (settings.width / img.width))
      : settings.height;
  } else if (activeTool === 'rotate') {
    if (settings.rotation === 90 || settings.rotation === 270) {
      width = img.height;
      height = img.width;
    } else {
      width = img.width;
      height = img.height;
    }
  } else if (activeTool === 'crop') {
    width = settings.cropWidth;
    height = settings.cropHeight;
    sourceX = settings.cropX;
    sourceY = settings.cropY;
    sourceWidth = settings.cropWidth;
    sourceHeight = settings.cropHeight;
  }

  canvas.width = width;
  canvas.height = height;

  const removeBackground = () => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const tolerance = Number.isFinite(settings.bgTolerance) ? settings.bgTolerance : 40;
    const feather = Number.isFinite(settings.bgFeather) ? settings.bgFeather : 20;
    const patch = Math.max(1, Math.floor(Math.min(width, height) * 0.03));

    let r = 0;
    let g = 0;
    let b = 0;
    let count = 0;

    const samplePatch = (startX, startY) => {
      for (let y = startY; y < startY + patch; y += 1) {
        for (let x = startX; x < startX + patch; x += 1) {
          const idx = (y * width + x) * 4;
          r += data[idx];
          g += data[idx + 1];
          b += data[idx + 2];
          count += 1;
        }
      }
    };

    samplePatch(0, 0);
    samplePatch(width - patch, 0);
    samplePatch(0, height - patch);
    samplePatch(width - patch, height - patch);

    const bgR = r / Math.max(1, count);
    const bgG = g / Math.max(1, count);
    const bgB = b / Math.max(1, count);

    for (let i = 0; i < data.length; i += 4) {
      const dr = data[i] - bgR;
      const dg = data[i + 1] - bgG;
      const db = data[i + 2] - bgB;
      const distance = Math.sqrt(dr * dr + dg * dg + db * db);

      if (distance <= tolerance) {
        data[i + 3] = 0;
      } else if (distance <= tolerance + feather) {
        const ratio = (distance - tolerance) / Math.max(1, feather);
        data[i + 3] = Math.round(255 * ratio);
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  // 2. Perform Transform
  if (activeTool === 'rotate') {
    ctx.translate(width / 2, height / 2);
    ctx.rotate((settings.rotation * Math.PI) / 180);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
  } else if (activeTool === 'flip') {
    if (settings.flipDirection === 'horizontal') {
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
    } else {
      ctx.translate(0, height);
      ctx.scale(1, -1);
    }
    ctx.drawImage(img, 0, 0, width, height);
  } else if (activeTool === 'crop') {
    ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, width, height);
  } else if (activeTool === 'grayscale') {
    ctx.drawImage(img, 0, 0, width, height);
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      if (settings.colorEffect === 'grayscale') {
        const avg = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
      } else if (settings.colorEffect === 'sepia') {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
        data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
        data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
      } else if (settings.colorEffect === 'invert') {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
      }
    }
    ctx.putImageData(imageData, 0, 0);
  } else if (activeTool === 'watermark') {
    ctx.drawImage(img, 0, 0, width, height);
    ctx.globalAlpha = settings.watermarkOpacity / 100;
    ctx.font = `${settings.watermarkSize}px Arial`;
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    const text = settings.watermarkText || 'Watermark';
    const textWidth = ctx.measureText(text).width;
    let x, y;
    if (settings.watermarkPosition === 'center') {
      x = (width - textWidth) / 2;
      y = height / 2;
    } else if (settings.watermarkPosition === 'top-left') {
      x = 20;
      y = settings.watermarkSize + 20;
    } else if (settings.watermarkPosition === 'top-right') {
      x = width - textWidth - 20;
      y = settings.watermarkSize + 20;
    } else if (settings.watermarkPosition === 'bottom-left') {
      x = 20;
      y = height - 20;
    } else {
      x = width - textWidth - 20;
      y = height - 20;
    }
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
    ctx.globalAlpha = 1;
  } else if (activeTool === 'remove-background') {
    ctx.drawImage(img, 0, 0, width, height);
    removeBackground();
  } else {
    ctx.drawImage(img, 0, 0, width, height);
  }

  // 3. Prepare Blob
  const quality = activeTool === 'compress' ? settings.quality / 100 : 1;
  let mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
  if (activeTool === 'convert') {
    const formatMap = { png: 'image/png', jpg: 'image/jpeg', webp: 'image/webp', gif: 'image/gif' };
    mimeType = formatMap[settings.convertTo] || 'image/png';
  } else if (activeTool === 'remove-background') {
    mimeType = 'image/png';
  }

  const blob = await new Promise(resolve => canvas.toBlob(resolve, mimeType, quality));
  const ext = activeTool === 'convert' ? settings.convertTo : activeTool === 'remove-background' ? 'png' : file.name.split('.').pop();
  
  URL.revokeObjectURL(img.src);
  
  return {
    blob,
    name: `processed-${file.name.split('.')[0]}.${ext}`,
    type: mimeType
  };
};

/**
 * Color picker - extract color value from canvas at specific point
 */
export const getColorAtPoint = (canvas, ctx, x, y) => {
  const imageData = ctx.getImageData(x, y, 1, 1);
  const data = imageData.data;
  return {
    r: data[0],
    g: data[1],
    b: data[2],
    a: data[3],
    hex: `#${((data[0] << 16) | (data[1] << 8) | data[2]).toString(16).padStart(6, '0')}`
  };
};

/**
 * Brush tool - erase or restore pixels within a circular brush
 * mode: 'erase' (set alpha to 0) or 'restore' (restore from backup)
 */
export const applyBrush = (ctx, x, y, brushSize, mode, imageDataBackup) => {
  const radius = brushSize / 2;
  const imageData = ctx.getImageData(x - radius, y - radius, brushSize, brushSize);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const pixelIndex = i / 4;
    const pixelX = pixelIndex % brushSize;
    const pixelY = Math.floor(pixelIndex / brushSize);
    
    // Calculate distance from brush center
    const dx = pixelX - radius;
    const dy = pixelY - radius;
    const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
    
    // Soft brush edge using feathering
    if (distanceFromCenter < radius) {
      const softness = 1 - (distanceFromCenter / radius);
      const alphaAdjustment = Math.round(255 * softness);
      
      if (mode === 'erase') {
        // Erase: reduce alpha
        data[i + 3] = Math.max(0, data[i + 3] - alphaAdjustment);
      } else if (mode === 'restore' && imageDataBackup) {
        // Restore: copy from backup
        const backupData = imageDataBackup.data;
        const backupI = i;
        data[i] = backupData[backupI];
        data[i + 1] = backupData[backupI + 1];
        data[i + 2] = backupData[backupI + 2];
        data[i + 3] = backupData[backupI + 3];
      }
    } else if (distanceFromCenter < radius + 5) {
      // Anti-aliasing edge zone
      const softness = Math.max(0, 1 - ((distanceFromCenter - radius) / 5));
      const alphaAdjustment = Math.round(255 * softness * 0.5);
      
      if (mode === 'erase') {
        data[i + 3] = Math.max(0, data[i + 3] - alphaAdjustment);
      }
    }
  }
  
  ctx.putImageData(imageData, x - radius, y - radius);
};

/**
 * Create a canvas drawing state for manual editing
 * Returns object with canvas, context, and utility methods
 */
export const createEditableCanvas = async (file) => {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  
  canvas.width = img.width;
  canvas.height = img.height;
  
  // Draw original image
  ctx.drawImage(img, 0, 0);
  
  // Create backup for restore functionality
  const backupImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  return {
    canvas,
    ctx,
    backup: backupImageData,
    width: canvas.width,
    height: canvas.height,
    
    // Apply brush erase
    erase: (x, y, size) => {
      applyBrush(ctx, x, y, size, 'erase', null);
    },
    
    // Restore erased area
    restore: (x, y, size) => {
      applyBrush(ctx, x, y, size, 'restore', backupImageData);
    },
    
    // Get color at point
    getColor: (x, y) => {
      return getColorAtPoint(canvas, ctx, x, y);
    },
    
    // Remove background by custom color
    removeBackgroundCustom: (bgColor, tolerance, feather) => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const dr = data[i] - bgColor.r;
        const dg = data[i + 1] - bgColor.g;
        const db = data[i + 2] - bgColor.b;
        const distance = Math.sqrt(dr * dr + dg * dg + db * db);

        if (distance <= tolerance) {
          data[i + 3] = 0;
        } else if (distance <= tolerance + feather) {
          const ratio = (distance - tolerance) / Math.max(1, feather);
          data[i + 3] = Math.round(255 * ratio);
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
    },
    
    // Export canvas as blob
    toBlob: (mimeType = 'image/png', quality = 1) => {
      return new Promise(resolve => {
        canvas.toBlob(resolve, mimeType, quality);
      });
    }
  };
};
