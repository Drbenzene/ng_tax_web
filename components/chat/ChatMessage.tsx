'use client';
import { FileText, File as FileIcon, Download, Image as ImageIcon, Maximize2 } from 'lucide-react';
import type { ChatMessage, FileData } from '@/services/ai.service';
import { useState, useMemo, useEffect } from 'react';
import DOMPurify from 'dompurify';
import dynamic from 'next/dynamic';

// Dynamically import react-pdf components to prevent SSR issues
const Document = dynamic(
  () => import('react-pdf').then((mod) => mod.Document),
  { ssr: false }
);
const Page = dynamic(
  () => import('react-pdf').then((mod) => mod.Page),
  { ssr: false }
);

// Configure PDF.js worker on client side only
if (typeof window !== 'undefined') {
  import('react-pdf').then((pdfjs) => {
    pdfjs.pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.pdfjs.version}/build/pdf.worker.min.js`;
  });
}

interface ChatMessageProps {
  message: ChatMessage;
  index: number;
}

export default function ChatMessageComponent({ message, index }: ChatMessageProps) {
  const [imageError, setImageError] = useState(false);
  const [fileURL, setFileURL] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [fileType, setFileType] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Create file URL only on client side - handle both File objects and FileData
  useEffect(() => {
    if (typeof window !== 'undefined' && message.file) {
      // Check if it's a File object
      if (message.file instanceof File) {
        const url = URL.createObjectURL(message.file);
        setFileURL(url);
        setFileName(message.file.name);
        setFileType(message.file.type);
        
        // Cleanup function to revoke the object URL
        return () => {
          URL.revokeObjectURL(url);
        };
      } 
      // Handle FileData (from localStorage)
      else if ('data' in message.file && 'name' in message.file && 'type' in message.file) {
        const fileData = message.file as FileData;
        // Convert base64 to blob
        const byteString = atob(fileData.data.split(',')[1]);
        const mimeString = fileData.data.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        const url = URL.createObjectURL(blob);
        setFileURL(url);
        setFileName(fileData.name);
        setFileType(fileData.type);
        
        // Cleanup function
        return () => {
          URL.revokeObjectURL(url);
        };
      }
    }
  }, [message.file]);

  // Function to render file attachments
  const renderFileAttachment = () => {
    // Return null if URL not yet created (during SSR or initial render)
    if (!fileURL) return null;

    // Audio files - render audio player
    if (fileType.startsWith('audio/')) {
      return (
        <div className="mt-2 bg-white/10 backdrop-blur rounded-lg p-3 border border-white/20">
          <div className="flex items-center space-x-2 mb-2">
            <FileIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{fileName}</span>
          </div>
          <audio controls className="w-full" preload="metadata">
            <source src={fileURL} type={fileType} />
            Your browser does not support audio playback.
          </audio>
        </div>
      );
    }

    // Image files - render image preview
    if (fileType.startsWith('image/')) {
      return (
        <div className="mt-2 rounded-lg overflow-hidden border border-white/20">
          {!imageError ? (
            <img
              src={fileURL}
              alt={fileName}
              className="max-w-full h-auto max-h-64 object-contain cursor-pointer hover:opacity-90 transition"
              onClick={() => window.open(fileURL, '_blank')}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="bg-white/10 backdrop-blur p-4 flex items-center space-x-2">
              <ImageIcon className="w-5 h-5" />
              <span className="text-sm">Failed to load image</span>
            </div>
          )}
          <div className="bg-white/10 backdrop-blur p-2 flex items-center justify-between">
            <span className="text-xs truncate flex-1">{fileName}</span>
            <a
              href={fileURL}
              download={fileName}
              className="ml-2 hover:bg-white/20 p-1 rounded transition"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>
        </div>
      );
    }

    // PDF files - render PDF preview with inline viewer
    if (fileType === 'application/pdf') {
      return (
        <div className="mt-2 bg-white/10 backdrop-blur rounded-lg border border-white/20 overflow-hidden">
          {/* PDF Preview */}
          <div className="relative group cursor-pointer" onClick={() => window.open(fileURL, '_blank')}>
            {isMounted ? (
              <Document
                file={fileURL}
                loading={
                  <div className="flex items-center justify-center h-48 bg-white/5">
                    <div className="text-sm opacity-70">Loading PDF...</div>
                  </div>
                }
                error={
                  <div className="flex items-center justify-center h-48 bg-white/5 p-6">
                    <div className="flex flex-col items-center space-y-3">
                      <FileText className="w-16 h-16 text-red-400" />
                      <div className="text-center">
                        <p className="text-sm font-medium">{fileName}</p>
                        <p className="text-xs opacity-70 mt-1">PDF Preview Unavailable</p>
                      </div>
                    </div>
                  </div>
                }
              >
                <Page
                  pageNumber={1}
                  width={400}
                  className="max-w-full"
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </Document>
            ) : (
              <div className="flex items-center justify-center h-48 bg-white/5">
                <div className="text-sm opacity-70">Loading PDF...</div>
              </div>
            )}
            {/* Hover overlay to indicate clickable */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="bg-white/90 text-gray-900 px-4 py-2 rounded-lg flex items-center space-x-2 font-medium">
                <Maximize2 className="w-4 h-4" />
                <span>Open Full PDF</span>
              </div>
            </div>
          </div>

          {/* File Info and Actions */}
          <div className="p-3 flex items-center justify-between border-t border-white/10">
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <FileText className="w-4 h-4 text-red-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{fileName}</p>
                <p className="text-xs opacity-70">PDF Document</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(fileURL, '_blank');
                }}
                className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-xs transition"
              >
                View
              </button>
              <a
                href={fileURL}
                download={fileName}
                onClick={(e) => e.stopPropagation()}
                className="p-1 hover:bg-white/20 rounded transition"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      );
    }

    // Other files - render generic file download
    return (
      <div className="mt-2 bg-white/10 backdrop-blur rounded-lg p-3 border border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 flex-1">
            <FileIcon className="w-5 h-5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{fileName}</p>
              <p className="text-xs opacity-70">{fileType || 'Unknown type'}</p>
            </div>
          </div>
          <a
            href={fileURL}
            download={fileName}
            className="p-2 hover:bg-white/20 rounded transition"
          >
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  };

  // Function to safely render HTML content
  const sanitizedHTML = useMemo(() => {
    // Check if content contains HTML tags
    const hasHTML = /<[a-z][\s\S]*>/i.test(message.content);
    
    if (hasHTML) {
      // Sanitize HTML to prevent XSS attacks
      return DOMPurify.sanitize(message.content, {
        ALLOWED_TAGS: [
          'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre', 'span', 'div',
          'table', 'thead', 'tbody', 'tr', 'th', 'td'
        ],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style'],
        ALLOW_DATA_ATTR: false,
      });
    }
    return null;
  }, [message.content]);

  const renderContent = (content: string) => {
    if (sanitizedHTML) {
      // Render sanitized HTML
      return (
        <div
          className={`prose prose-sm max-w-none ${
            message.role === 'user' 
              ? 'prose-invert prose-headings:text-white prose-p:text-white prose-strong:text-white prose-a:text-emerald-100 hover:prose-a:text-white' 
              : 'prose-headings:text-gray-900 prose-p:text-gray-800 prose-a:text-emerald-600 hover:prose-a:text-emerald-700'
          }`}
          dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        />
      );
    }

    // Render plain text with line breaks preserved
    return (
      <div className="whitespace-pre-wrap break-words">
        {content}
      </div>
    );
  };

  return (
    <div
      key={index}
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] ${
          message.role === 'user'
            ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-br-none'
            : 'bg-white text-gray-800 rounded-bl-none shadow-md'
        } p-3 rounded-2xl`}
      >
        {/* Message Content */}
        {renderContent(message.content)}

        {/* File Attachment Preview */}
        {message.file && renderFileAttachment()}

        {/* Timestamp */}
        {message.timestamp && (
          <div
            className={`text-xs mt-1 ${
              message.role === 'user' ? 'text-emerald-100' : 'text-gray-400'
            }`}
          >
            {new Date(message.timestamp).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        )}
      </div>
    </div>
  );
}
