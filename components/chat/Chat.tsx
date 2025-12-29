'use client';
import { AlertCircle, File as FileIcon, FileText, Mic, Paperclip, Send, Sparkles, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useSendMessage } from '@/hooks/useAI';
import type { ChatMessage, FileData } from '@/services/ai.service';
import ChatMessageComponent from './ChatMessage';
import FileUploadZone from './FileUploadZone';
import AudioRecorderModal from './AudioRecorderModal';

interface IChat{
  isChatOpen: boolean;
  setIsChatOpen:any
}

// Utility function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Utility function to convert audio blob to WAV format
const convertToWav = async (audioBlob: Blob): Promise<Blob> => {
  const arrayBuffer = await audioBlob.arrayBuffer();
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  
  // Convert to WAV
  const wavBuffer = audioBufferToWav(audioBuffer);
  return new Blob([wavBuffer], { type: 'audio/wav' });
};

// Convert AudioBuffer to WAV format
const audioBufferToWav = (buffer: AudioBuffer): ArrayBuffer => {
  const length = buffer.length * buffer.numberOfChannels * 2 + 44;
  const arrayBuffer = new ArrayBuffer(length);
  const view = new DataView(arrayBuffer);
  const channels: Float32Array[] = [];
  let offset = 0;
  let pos = 0;

  // Write WAV header
  const setUint16 = (data: number) => {
    view.setUint16(pos, data, true);
    pos += 2;
  };
  const setUint32 = (data: number) => {
    view.setUint32(pos, data, true);
    pos += 4;
  };

  // RIFF identifier
  setUint32(0x46464952);
  // file length
  setUint32(length - 8);
  // RIFF type
  setUint32(0x45564157);
  // format chunk identifier
  setUint32(0x20746d66);
  // format chunk length
  setUint32(16);
  // sample format (raw)
  setUint16(1);
  // channel count
  setUint16(buffer.numberOfChannels);
  // sample rate
  setUint32(buffer.sampleRate);
  // byte rate (sample rate * block align)
  setUint32(buffer.sampleRate * buffer.numberOfChannels * 2);
  // block align (channel count * bytes per sample)
  setUint16(buffer.numberOfChannels * 2);
  // bits per sample
  setUint16(16);
  // data chunk identifier
  setUint32(0x61746164);
  // data chunk length
  setUint32(length - pos - 4);

  // Write interleaved data
  for (let i = 0; i < buffer.numberOfChannels; i++) {
    channels.push(buffer.getChannelData(i));
  }

  while (pos < length) {
    for (let i = 0; i < buffer.numberOfChannels; i++) {
      let sample = channels[i][offset];
      sample = Math.max(-1, Math.min(1, sample));
      view.setInt16(pos, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
      pos += 2;
    }
    offset++;
  }

  return arrayBuffer;
};

// Utility function to serialize messages for localStorage
const serializeMessages = async (messages: ChatMessage[]): Promise<string> => {
  const serialized = await Promise.all(
    messages.map(async (msg) => {
      if (msg.file && msg.file instanceof File) {
        const base64 = await fileToBase64(msg.file);
        const fileData: FileData = {
          name: msg.file.name,
          type: msg.file.type,
          data: base64
        };
        return { ...msg, file: fileData };
      }
      return msg;
    })
  );
  return JSON.stringify(serialized);
};

export default function Chat({setIsChatOpen,isChatOpen }:IChat) {

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Load messages from localStorage on initial render (client-side only)
    if (typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem('taxpadi_chat_messages');
      if (savedMessages) {
        return JSON.parse(savedMessages);
      }
    }
    return [
      { 
        role: 'assistant', 
        content: 'Hello! I\'m TaxPadi, your AI tax assistant. How can I help you with your tax needs today?', 
        timestamp: Date.now() 
      }
    ];
  });
  const [files,setFiles] = useState<any>()

  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessageMutation = useSendMessage();
  
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      // Serialize messages with files converted to base64
      serializeMessages(messages).then(serialized => {
        localStorage.setItem('taxpadi_chat_messages', serialized);
      });
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {

    if (!inputMessage.trim() && !files) return;

    const timestamp = Date.now();

    // Add user message to UI immediately
    if (inputMessage.trim()) {
      const userMessage: ChatMessage = {
        role: 'user',
        content: inputMessage,
        timestamp,
      };
      setMessages(prev => [...prev, userMessage]);
    }

    if (files && files.length > 0) {
    const fileMessages = await Promise.all(
          files.map(async (file: File, index: number) => {
            const base64 = await fileToBase64(file);
            const fileData: FileData = {
              name: file.name,
              type: file.type,
              data: base64
            };
            return {
              role: 'user' as const,
              content: `📎 Uploaded: ${file.name}`,
              file: fileData,
              timestamp: timestamp + index + 1,
            };
          })
        );
    setMessages(prev => [...prev, ...fileMessages]);
    }


    const currentInput = inputMessage;
    setInputMessage('');
    setUploadedFiles([]);
    setShowFileUpload(false);
    setFiles(null);
    
    if (currentInput.trim() || files) {
      try {
        let payload:any = {
          message: currentInput,
        }
        if (files) {
          payload.files = files
        }
        const response = await sendMessageMutation.mutateAsync(payload);

        // Add AI response to chat
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: response?.data?.response,
          timestamp: Date.now(),
          fileType: 'text',
        };
        setMessages(prev => [...prev, assistantMessage]);
      } catch (error) {
        console.error('Failed to send message:', error);
                const fallbackMessage: ChatMessage = {
          role: 'assistant',
          content: 'Sorry, I\'m having trouble connecting right now. Please try again in a moment.',
          timestamp: Date.now(),
        };
        setMessages(prev => [...prev, fallbackMessage]);
      }
    }
  };

  const handleAudioFromModal = async (audioFile: File) => {
    console.log('Audio received from modal:', {
      name: audioFile.name,
      type: audioFile.type,
      size: audioFile.size
    });

      console.log('Converting to WAV format...');
      const arrayBuffer = await audioFile.arrayBuffer();
      const audioBlob = new Blob([arrayBuffer], { type: audioFile.type });
      const wavBlob = await convertToWav(audioBlob);
      const wavFile = new File([wavBlob], `voice-${Date.now()}.wav`, { type: 'audio/wav' });
      
      console.log('WAV conversion successful:', {
        name: wavFile.name,
        type: wavFile.type,
        size: wavFile.size
      });
      setFiles([wavFile]);
      
    handleSendMessage();
  };

  const clearChatHistory = () => {
    if (typeof window !== 'undefined' && confirm('Are you sure you want to clear all chat history?')) {
      const initialMessage: ChatMessage = { 
        role: 'assistant', 
        content: 'Hello! I\'m TaxPadi, your AI tax assistant. How can I help you with your tax needs today?',
        timestamp: Date.now()
      };
      setMessages([initialMessage]);
      localStorage.removeItem('taxpadi_chat_messages');
    }
  };
    return (
        <div>
            <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-emerald-100">
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-4 rounded-t-2xl flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">TaxPadi</h3>
                            <p className="text-xs text-emerald-100">Always here to help</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={clearChatHistory}
                            className="text-white hover:bg-white/20 rounded-full p-2 transition"
                            title="Clear chat history"
                        >
                            <AlertCircle className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setIsChatOpen(false)}
                            className="text-white hover:bg-white/20 rounded-full p-2 transition"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((message, index) => (
                        <ChatMessageComponent key={index} message={message} index={index} />
                    ))}
                    {sendMessageMutation.isPending && (
                        <div className="flex justify-start">
                            <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-md">
                                <div className="flex space-x-2">
                                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>



                {/* Chat Input */}
                <div className="p-4 border-t border-gray-200 relative">
                    {/* File Upload Zone */}
                    {showFileUpload && (
                        <FileUploadZone
                            files={uploadedFiles}
                            onFilesChange={(files) => {
                                setUploadedFiles(files);
                                setFiles(files);
                            }}
                            onClose={() => setShowFileUpload(false)}
                        />
                    )}

                    <div className="flex items-center space-x-2">
                        {/* Attach Button */}
                        <button
                            onClick={() => setShowFileUpload(!showFileUpload)}
                            className={`p-2 rounded-full transition ${
                                showFileUpload
                                    ? 'bg-emerald-100 text-emerald-600'
                                    : 'text-gray-500 hover:text-emerald-600 hover:bg-emerald-50'
                            }`}
                        >
                            <Paperclip className="w-5 h-5" />
                        </button>

                        {/* Voice Recording Button */}
                        <button
                            onClick={() => setShowRecordingModal(true)}
                            className="p-2 rounded-full transition text-gray-500 hover:text-emerald-600 hover:bg-emerald-50"
                        >
                            <Mic className="w-5 h-5" />
                        </button>

                        <input
                            type="text"
                            value={inputMessage}                
                           onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Welcome! How can i help you today"
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            disabled={isRecording}
                        />
              
                        <button
                            onClick={() =>handleSendMessage()}
                            disabled={!inputMessage.trim() && uploadedFiles.length === 0}
                            className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-3 rounded-full hover:shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
            
                    {/* Audio Recording Modal */}
                    <AudioRecorderModal
                        isOpen={showRecordingModal}
                        onClose={() => setShowRecordingModal(false)}
                        onSend={handleAudioFromModal}
                    />
                </div>
            </div>        </div>
    )
}