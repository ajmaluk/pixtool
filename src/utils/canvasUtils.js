/**
 * Canvas utility functions for high-performance image processing.
 * Part of the PixTool Architectural Harmonization.
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
  } else {
    ctx.drawImage(img, 0, 0, width, height);
  }

  // 3. Prepare Blob
  const quality = activeTool === 'compress' ? settings.quality / 100 : 1;
  let mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
  if (activeTool === 'convert') {
    const formatMap = { png: 'image/png', jpg: 'image/jpeg', webp: 'image/webp', gif: 'image/gif' };
    mimeType = formatMap[settings.convertTo] || 'image/png';
  }

  const blob = await new Promise(resolve => canvas.toBlob(resolve, mimeType, quality));
  const ext = activeTool === 'convert' ? settings.convertTo : file.name.split('.').pop();
  
  URL.revokeObjectURL(img.src);
  
  return {
    blob,
    name: `processed-${file.name.split('.')[0]}.${ext}`,
    type: mimeType
  };
};
