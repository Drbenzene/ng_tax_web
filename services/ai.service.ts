import api from '@/lib/api';

// Types
export interface FileData {
    name: string;
    type: string;
    data: string; // base64 encoded file data
}

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp?: number;
    file?: File | FileData; // Support both File objects and serializable file data
}

export interface ChatRequest {
    message: string;
    conversationHistory?: ChatMessage[];
    file?: File;
}

export interface ChatResponse {
    data: {
        response: string;
    }
    conversationId?: string;
}

// API Endpoints
const ENDPOINTS = {
    CHAT: '/ai/chat',
    FILE_UPLOAD: '/ai/upload',
};

// AI Service
export const aiService = {
    /**
     * Send chat message to AI
     * Automatically uses FormData if file is present, otherwise sends JSON
     */
    sendMessage: async (request: ChatRequest): Promise<ChatResponse> => {
        // If file is present, send as FormData
        if (request.file) {
            const formData = new FormData();
            formData.append('message', request.message);
            formData.append('file', request.file);
            return api.upload<ChatResponse>(ENDPOINTS.CHAT, formData);
        }

        // Otherwise send as regular JSON
        return api.post<ChatResponse>(ENDPOINTS.CHAT, request);
    },
    /**
     * Upload document for processing
     */
    uploadDocument: async (
        file: File,
        onProgress?: (progress: number) => void
    ): Promise<any> => {
        const formData = new FormData();
        formData.append('file', file);

        return api.upload(ENDPOINTS.FILE_UPLOAD, formData, (progressEvent) => {
            if (onProgress && progressEvent.total) {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                onProgress(percentCompleted);
            }
        });
    },
};

export default aiService;
