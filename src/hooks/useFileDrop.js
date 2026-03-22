import { useState, useCallback } from 'react';

export const useFileDrop = (acceptedTypes = []) => {
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState(null);

  const handleFiles = useCallback((newFiles) => {
    const validFiles = Array.from(newFiles).filter(f => 
      acceptedTypes.length === 0 || acceptedTypes.some(type => f.type.startsWith(type) || f.type === type)
    );
    
    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      
      // Generate preview for first image file if applicable
      if (validFiles[0].type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target.result);
        reader.readAsDataURL(validFiles[0]);
      }
    }
    return validFiles;
  }, [acceptedTypes]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  }, [handleFiles]);

  const removeFile = useCallback((index) => {
    setFiles(prev => {
      const updated = prev.filter((_, i) => i !== index);
      if (updated.length === 0) setPreview(null);
      return updated;
    });
  }, []);

  const moveFile = useCallback((index, direction) => {
    setFiles(prev => {
      const newFiles = [...prev];
      const targetIndex = direction === 'left' ? index - 1 : index + 1;
      if (targetIndex >= 0 && targetIndex < newFiles.length) {
        [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
      }
      return newFiles;
    });
  }, []);

  return {
    files,
    setFiles,
    preview,
    setPreview,
    handleFiles,
    handleDrop,
    removeFile,
    moveFile
  };
};
