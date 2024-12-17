import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { api } from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useEffect } from "react";


function ProtectedRoute({ children }) {
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        auth();
    }, []);


    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        
        try {
            const response = await api.post("token/refresh/", { refresh: refreshToken });
            localStorage.setItem(ACCESS_TOKEN, response.data.access);
            setAuthorized(true);
        }
        catch (error) {
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
            setAuthorized(false);
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setAuthorized(false);
        }
        else {
            const { expiration } = jwtDecode(token);
            if (expiration < Date.now() / 1000) {
                await refreshToken();
            }
            setAuthorized(true);
        }
    }

    if (authorized === null) {
        return <div>Loading...</div>;
    }

    return authorized ? children : <Navigate to="/login" />;
}