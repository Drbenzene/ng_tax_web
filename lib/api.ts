import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Base API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';
const API_TIMEOUT = 30000; // 30 seconds

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Add auth token if available
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('auth_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        // Log requests in development
        if (process.env.NODE_ENV === 'development') {
            console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config.data);
        }

        return config;
    },
    (error) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
    }
);

// Response Interceptor
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        // Log responses in development
        if (process.env.NODE_ENV === 'development') {
            console.log(`[API Response] ${response.config.url}`, response.data);
        }
        return response;
    },
    (error: AxiosError) => {
        // Handle different error scenarios
        if (error.response) {
            // Server responded with error status
            const status = error.response.status;
            const message = (error.response.data as any)?.message || error.message;

            console.error(`[API Error ${status}]`, message);

            // Handle specific status codes
            switch (status) {
                case 401:
                    // Unauthorized - clear token and redirect to login
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('auth_token');
                        // You can add redirect logic here
                    }
                    break;
                case 403:
                    console.error('Forbidden: You don\'t have permission');
                    break;
                case 404:
                    console.error('Resource not found');
                    break;
                case 500:
                    console.error('Server error');
                    break;
            }
        } else if (error.request) {
            // Request made but no response received
            console.error('[API No Response]', error.request);
        } else {
            // Error in request setup
            console.error('[API Setup Error]', error.message);
        }

        return Promise.reject(error);
    }
);

// Generic API call function
export async function apiCall<T = any>(
    endpoint: string,
    options?: AxiosRequestConfig
): Promise<T> {
    try {
        const response = await apiClient.request<T>({
            url: endpoint,
            ...options,
        });
        return response?.data;
    } catch (error) {
        throw error;
    }
}

// Convenience methods
export const api = {
    /**
     * GET request
     */
    get: async <T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
        return apiCall<T>(endpoint, { method: 'GET', ...config });
    },

    /**
     * POST request
     */
    post: async <T = any>(
        endpoint: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> => {
        return apiCall<T>(endpoint, { method: 'POST', data, ...config });
    },

    /**
     * PUT request
     */
    put: async <T = any>(
        endpoint: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> => {
        return apiCall<T>(endpoint, { method: 'PUT', data, ...config });
    },

    /**
     * PATCH request
     */
    patch: async <T = any>(
        endpoint: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> => {
        return apiCall<T>(endpoint, { method: 'PATCH', data, ...config });
    },

    /**
     * DELETE request
     */
    delete: async <T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
        return apiCall<T>(endpoint, { method: 'DELETE', ...config });
    },

    /**
     * Upload file(s)
     */
    upload: async <T = any>(
        endpoint: string,
        formData: FormData,
        onUploadProgress?: (progressEvent: any) => void
    ): Promise<T> => {
        return apiCall<T>(endpoint, {
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress,
        });
    },
};

// Export axios instance for advanced usage
export { apiClient };

export default api;
