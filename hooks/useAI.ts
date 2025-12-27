import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import aiService, {
    ChatRequest,
    ChatResponse,
} from '@/services/ai.service';

// Query Keys
export const AI_QUERY_KEYS = {
    CHAT: 'chat',
    TAX_CALCULATION: 'tax-calculation',
    CONVERSATION: 'conversation',
};

/**
 * Hook for sending chat messages
 */
export function useSendMessage() {
    const queryClient = useQueryClient();

    return useMutation<ChatResponse, Error, ChatRequest>({
        mutationFn: (request) => aiService.sendMessage(request),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [AI_QUERY_KEYS.CONVERSATION] });
        },
        onError: (error) => {
            console.error('Failed to send message:', error);
        },
    });
}


/**
 * Example: Hook for fetching conversation history
 * (You'll need to implement this endpoint in your backend)
 */
export function useConversationHistory(conversationId?: string) {
    return useQuery({
        queryKey: [AI_QUERY_KEYS.CONVERSATION, conversationId],
        queryFn: async () => {
            // Implement your API call here
            // return api.get(`/ai/conversation/${conversationId}`);
            return [];
        },
        enabled: !!conversationId,
    });
}
