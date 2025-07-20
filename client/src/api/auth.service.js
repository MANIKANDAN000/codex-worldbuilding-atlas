import axios from 'axios';

class AuthService {
    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:5001/api/auth'
        });

        // Automatically set the Authorization header for all requests
        this.api.interceptors.request.use((config) => {
            const token = localStorage.getItem('authToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }

    login = (requestBody) => {
        return this.api.post('/login', requestBody);
    };

    signup = (requestBody) => {
        return this.api.post('/signup', requestBody);
    };

    verify = () => {
        return this.api.get('/me');
    };
}

const authService = new AuthService();
export default authService;