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
    file?: File | FileData;
    fileType?: string;
}

export interface ChatRequest {
    message: string;
    files?: any[];
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
};

// AI Service
export const aiService = {
    /**
     * Send chat message to AI
     * Automatically uses FormData if file is present, otherwise sends JSON
     */
    sendMessage: async (request: ChatRequest): Promise<ChatResponse> => {
        // If files are present, send as FormData
        if (request.files && request.files.length > 0) {
            const formData = new FormData();
            formData.append('message', request.message);
            request.files.forEach((file: File) => {
                formData.append('files', file);
            });

            console.log('Sending FormData with files:', request.files.length);
            return api.upload<ChatResponse>(ENDPOINTS.CHAT, formData);
        }

        // Otherwise send as regular JSON
        return api.post<ChatResponse>(ENDPOINTS.CHAT, request);
    },

};

export default aiService;
