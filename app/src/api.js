import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('REFRESH_TOKEN');
            if (!refreshToken) {
                handleLogout();
                return Promise.reject(error);
            }
            try {
                const response = await api.post('token/refresh/', { refresh: refreshToken });
                localStorage.setItem('ACCESS_TOKEN', response.data.access);
                originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
                return api(originalRequest);
            } catch (refreshError) {
                if (refreshError.response && (refreshError.response.status === 401 || refreshError.response.status === 403)) {
                    handleLogout();
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

const handleLogout = () => {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('breweryId');
    window.location.href = '/login';
};

export default api;
