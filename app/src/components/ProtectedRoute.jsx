import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

function ProtectedRoute({ children, requiredType }) {
    const [authorized, setAuthorized] = useState(null);

    useEffect(() => {
        const checkUserType = () => {
            const userType = localStorage.getItem('userType');
            setAuthorized(userType === requiredType);
        };

        const auth = () => {
            const token = localStorage.getItem('ACCESS_TOKEN');
            if (!token) {
                setAuthorized(false);
                return;
            }

            try {
                const { exp } = jwtDecode(token);
                if (exp < Date.now() / 1000) {
                    setAuthorized(false);
                } else {
                    checkUserType();
                }
            } catch {
                setAuthorized(false);
            }
        };

        auth();
    }, [requiredType]);

    if (authorized === null) {
        return <div>Ładowanie...</div>;
    }

    return authorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
