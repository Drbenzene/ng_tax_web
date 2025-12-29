'use client';
import { AlertCircle, File as FileIcon, FileText, Mic, Paperclip, Send, Sparkles, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useSendMessage } from '@/hooks/useAI';
import type { ChatMessage, FileData } from '@/services/ai.service';
import ChatMessageComponent from './ChatMessage';

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
  const [file,setFile] = useState<any>()

  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // API Hooks
  const sendMessageMutation = useSendMessage();
  
  // Save messages to localStorage whenever they change (client-side only)
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
    if (!inputMessage.trim() && !file) return;

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

    // Handle file uploads
    if (file) {
       const fileMessage: ChatMessage = {
            role: 'user',
            content: `${inputMessage ? inputMessage : ""} 📎 Uploaded: ${file.name}`,
            file: file,
            timestamp: timestamp + 1,

          };
          setMessages(prev => [...prev, fileMessage]);
    }

    const currentInput = inputMessage;
    setInputMessage('');
    setUploadedFiles([]);
    setFile(null);
    
    // Send message to AI API
    if (currentInput.trim() || file) {
      try {
        let payload:any = {
          message: currentInput,
        }
        if (file) {
          payload.file = file
        }
        const response = await sendMessageMutation.mutateAsync(payload);

        // Add AI response to chat
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: response?.data?.response,
          timestamp: Date.now(),
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFile(files[0])
    setUploadedFiles(prev => [...prev, ...files]);
    setShowAttachMenu(false);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };


      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioFile = new File([audioBlob], `voice-${Date.now()}.webm`, { type: 'audio/webm' });
        
        // Set the audio file to state
        setFile(audioFile);
        
        // Add a small delay to ensure state is updated before calling handleSendMessage
        setTimeout(() => {
          handleSendMessage();
        }, 100);
        
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setShowAttachMenu(false);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
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

                {/* File Upload Preview */}
                {uploadedFiles.length > 0 && (
                    <div className="px-4 py-2 border-t border-gray-200 bg-white">
                        <div className="flex flex-wrap gap-2">
                            {uploadedFiles.map((file, index) => (
                                <div key={index} className="flex items-center space-x-2 bg-emerald-50 rounded-lg px-3 py-2 text-sm">
                                    {file.type.startsWith('image/') ? (
                                        <FileText className="w-4 h-4 text-emerald-600" />
                                    ) : file.type.startsWith('audio/') ? (
                                        <Mic className="w-4 h-4 text-emerald-600" />
                                    ) : (
                                        <FileIcon className="w-4 h-4 text-emerald-600" />
                                    )}
                                    <span className="text-gray-700 max-w-[120px] truncate">{file.name}</span>
                                    <button
                                        onClick={() => removeFile(index)}
                                        className="text-gray-500 hover:text-red-600 transition"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Chat Input */}
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                        {/* Attach Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setShowAttachMenu(!showAttachMenu)}
                                className="text-gray-500 hover:text-emerald-600 p-2 rounded-full hover:bg-emerald-50 transition"
                            >
                                <Paperclip className="w-5 h-5" />
                            </button>
                
                            {showAttachMenu && (
                                <div className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-xl border border-gray-200 p-2 w-48">
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-emerald-50 transition text-left"
                                    >
                                        <FileIcon className="w-5 h-5 text-emerald-600" />
                                        <span className="text-gray-700">Upload File</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            fileInputRef.current?.click();
                                        }}
                                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-emerald-50 transition text-left"
                                    >
                                        <FileText className="w-5 h-5 text-emerald-600" />
                                        <span className="text-gray-700">Upload Image</span>
                                    </button>
                                </div>
                            )}
                
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,audio/*,.mp3,.wav,.m4a,.ogg"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                        </div>

                        {/* Voice Recording Button */}
                        <button
                            onClick={isRecording ? stopRecording : startRecording}
                            className={`p-2 rounded-full transition ${isRecording
                                    ? 'bg-red-500 text-white animate-pulse'
                                    : 'text-gray-500 hover:text-emerald-600 hover:bg-emerald-50'
                                }`}
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
                            onClick={handleSendMessage}
                            disabled={!inputMessage.trim() && uploadedFiles.length === 0}
                            className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-3 rounded-full hover:shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
            
                    {isRecording && (
                        <div className="mt-2 flex items-center justify-center space-x-2 text-red-600 text-sm">
                            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                            <span>Recording... Click mic to stop</span>
                        </div>
                    )}
                </div>
            </div>        </div>
    )
}