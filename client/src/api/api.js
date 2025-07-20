// client/src/api/api.js

import axios from 'axios';

// Create a new instance of axios with a custom configuration
const api = axios.create({
    // Set the base URL for all API requests
    baseURL: 'http://localhost:5005/api', 
});

// Add a request interceptor to automatically add the JWT token to every outgoing request
api.interceptors.request.use((config) => {
    // Get the token from localStorage
    const storedToken = localStorage.getItem('authToken');

    // If the token exists, add it to the Authorization header
    if (storedToken) {
        config.headers.Authorization = `Bearer ${storedToken}`;
    }

    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

export default api;