# API Integration & TanStack Query Setup

## 🚀 Overview

This project uses **TanStack Query** (React Query) for data fetching and state management, combined with **Axios** for robust API calls.

## 📁 File Structure

```
taxpulse-web/
├── lib/
│   └── api.ts                 # Axios instance & API utilities
├── providers/
│   └── QueryProvider.tsx      # TanStack Query provider
├── services/
│   └── ai.service.ts          # AI API service layer
├── hooks/
│   └── useAI.ts               # Custom React Query hooks
└── components/
    └── examples/
        └── ExampleAIUsage.tsx # Usage examples
```

## 🔧 Core Files

### 1. `lib/api.ts` - API Utilities

Robust axios instance with:
- ✅ Request/Response interceptors
- ✅ Automatic auth token injection
- ✅ Error handling for all status codes
- ✅ Development logging
- ✅ Convenience methods (get, post, put, patch, delete, upload)

**Usage:**
```typescript
import api from '@/lib/api';

// GET request
const data = await api.get('/endpoint');

// POST request
const result = await api.post('/endpoint', { key: 'value' });

// File upload
const formData = new FormData();
formData.append('file', file);
const uploadResult = await api.upload('/upload', formData, (progress) => {
  console.log(`Upload progress: ${progress}%`);
});
```

### 2. `providers/QueryProvider.tsx` - Query Client

Configures TanStack Query with optimized defaults:
- ✅ 1-minute stale time
- ✅ 5-minute cache time
- ✅ No refetch on window focus
- ✅ Dev tools in development mode

### 3. `services/ai.service.ts` - AI API Layer

Type-safe service layer for AI endpoints:
- `sendMessage()` - Chat with AI
- `calculateTax()` - Tax calculations
- `uploadDocument()` - Document upload with progress

### 4. `hooks/useAI.ts` - React Query Hooks

Custom hooks for data fetching:
- `useSendMessage()` - Send chat messages
- `useCalculateTax()` - Calculate taxes
- `useUploadDocument()` - Upload documents
- `useConversationHistory()` - Fetch conversation history

## 💻 Usage Examples

### Chat Example

```typescript
import { useSendMessage } from '@/hooks/useAI';

function ChatComponent() {
  const sendMessage = useSendMessage();

  const handleSend = async (message: string) => {
    try {
      const response = await sendMessage.mutateAsync({
        message,
        conversationHistory: [],
      });
      console.log('AI Response:', response.response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {sendMessage.isPending && <div>Sending...</div>}
      {sendMessage.isError && <div>Error occurred</div>}
      <button onClick={() => handleSend('Hello')}>Send</button>
    </div>
  );
}
```

### Tax Calculation Example

```typescript
import { useCalculateTax } from '@/hooks/useAI';

function TaxCalculator() {
  const calculateTax = useCalculateTax();

  const handleCalculate = async () => {
    try {
      const result = await calculateTax.mutateAsync({
        income: 5000000,
        state: 'Lagos',
        taxType: 'PIT',
      });
      console.log('Tax:', result.totalTax);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {calculateTax.isPending && <div>Calculating...</div>}
      {calculateTax.data && (
        <div>Tax: ₦{calculateTax.data.totalTax.toLocaleString()}</div>
      )}
      <button onClick={handleCalculate}>Calculate</button>
    </div>
  );
}
```

### File Upload Example

```typescript
import { useUploadDocument } from '@/hooks/useAI';

function FileUploader() {
  const upload = useUploadDocument();
  const [progress, setProgress] = useState(0);

  const handleUpload = async (file: File) => {
    try {
      await upload.mutateAsync({
        file,
        onProgress: (percent) => setProgress(percent),
      });
      console.log('Upload complete!');
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) handleUpload(file);
      }} />
      {upload.isPending && <div>Uploading... {progress}%</div>}
    </div>
  );
}
```

## 🔐 Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

## 🎯 Features

### API Utilities (`lib/api.ts`)
- ✅ Automatic auth token handling
- ✅ Request/response logging in development
- ✅ Comprehensive error handling
- ✅ 401 auto-logout
- ✅ File upload with progress tracking
- ✅ TypeScript support

### TanStack Query
- ✅ Automatic caching
- ✅ Background refetching
- ✅ Optimistic updates
- ✅ Request deduplication
- ✅ Dev tools for debugging
- ✅ Mutation callbacks

## 📝 Best Practices

1. **Always use hooks in components** - Don't call service functions directly
2. **Handle loading states** - Use `isPending` from mutations/queries
3. **Handle errors** - Use `isError` and display user-friendly messages
4. **Invalidate queries** - After mutations, invalidate related queries
5. **Use TypeScript** - All types are defined in service files

## 🐛 Error Handling

Errors are automatically handled at three levels:

1. **Axios Interceptor** - Logs all errors, handles 401/403/404/500
2. **Mutation Callbacks** - `onError` in each hook
3. **Component Level** - Check `isError` state in components

## 🔄 Query Invalidation

After successful mutations, invalidate related queries:

```typescript
const mutation = useMutation({
  mutationFn: apiCall,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['key'] });
  },
});
```

## 📚 Additional Resources

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Axios Docs](https://axios-http.com/)

## 🎉 Ready to Use!

All setup is complete. Just import the hooks and start building! See `ExampleAIUsage.tsx` for complete examples.
