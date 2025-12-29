'use client';
import { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, FileText, Image as ImageIcon, Music, Film } from 'lucide-react';

interface FileUploadZoneProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  onClose: () => void;
  maxSize?: number; // in bytes
}

export default function FileUploadZone({ 
  files, 
  onFilesChange, 
  onClose,
  maxSize = 10 * 1024 * 1024 // 10MB default
}: FileUploadZoneProps) {
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesChange([...files, ...acceptedFiles]);
  }, [files, onFilesChange]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    maxSize,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'audio/*': ['.mp3', '.wav', '.m4a', '.ogg'],
    },
  });

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    onFilesChange(updatedFiles);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <ImageIcon className="w-5 h-5 text-purple-500" />;
    if (file.type.startsWith('audio/')) return <Music className="w-5 h-5 text-green-500" />;
    if (file.type.startsWith('video/')) return <Film className="w-5 h-5 text-red-500" />;
    return <FileText className="w-5 h-5 text-blue-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-2xl shadow-2xl border border-emerald-100 p-4 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <Upload className="w-4 h-4 text-emerald-600" />
          Upload Files
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
          isDragActive
            ? 'border-emerald-500 bg-emerald-50'
            : 'border-gray-300 hover:border-emerald-400 bg-gray-50 hover:bg-emerald-50/30'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className={`w-10 h-10 mx-auto mb-2 transition-colors ${
          isDragActive ? 'text-emerald-600' : 'text-gray-400'
        }`} />
        {isDragActive ? (
          <p className="text-emerald-600 font-medium">Drop files here...</p>
        ) : (
          <>
            <p className="text-gray-700 font-medium mb-1">
              Drag & drop files here, or click to select
            </p>
            <p className="text-xs text-gray-500">
              Max {formatFileSize(maxSize)} per file
            </p>
          </>
        )}
      </div>

      {/* File Rejections */}
      {fileRejections.length > 0 && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-xs text-red-600 font-medium">Some files were rejected:</p>
          {fileRejections.map(({ file, errors }) => (
            <p key={file.name} className="text-xs text-red-500 mt-1">
              {file.name}: {errors.map(e => e.message).join(', ')}
            </p>
          ))}
        </div>
      )}

      {/* File Previews */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-100 group hover:shadow-md transition-all"
            >
              {/* File Icon or Thumbnail */}
              {file.type.startsWith('image/') ? (
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white border border-gray-200">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white border border-gray-200 flex-shrink-0">
                  {getFileIcon(file)}
                </div>
              )}

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(file.size)}
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFile(index)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full p-1.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
