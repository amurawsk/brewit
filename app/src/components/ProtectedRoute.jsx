import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api.js';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

function ProtectedRoute({ children, requiredType }) {
    const [authorized, setAuthorized] = useState(null);

    useEffect(() => {
        const refreshToken = async () => {
            const refreshToken = localStorage.getItem('REFRESH_TOKEN');

            if (!refreshToken) {
                handleUnauthorized();
                return;
            }

            try {
                const response = await api.post('token/refresh/', {
                    refresh: refreshToken,
                });
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                checkUserType();
            } catch (error) {
                handleUnauthorized();
            }
        };

        const checkUserType = () => {
            const userType = localStorage.getItem('userType');
            if (userType === requiredType) {
                setAuthorized(true);
            } else {
                setAuthorized(false);
            }
        };

        const auth = async () => {
            const token = localStorage.getItem('ACCESS_TOKEN');

            if (!token) {
                setAuthorized(false);
                return;
            }

            try {
                const { exp } = jwtDecode(token);
                if (exp < Date.now() / 1000) {
                    await refreshToken();
                } else {
                    checkUserType();
                }
            } catch (error) {
                handleUnauthorized();
            }
        };

        auth();
    }, [requiredType]);

    const handleUnauthorized = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        setAuthorized(false);
    };

    if (authorized === null) {
        return <div>Ładowanie...</div>;
    }

    return authorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
