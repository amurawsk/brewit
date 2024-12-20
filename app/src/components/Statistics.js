import React from 'react';
import { useNavigate } from 'react-router-dom';

const Statistics = () => {
    const navigate = useNavigate();

    const Logout = () => navigate('/');

    const handleLogout = () => {
        localStorage.removeItem('userType');
        Logout();
    };

    return (
        <div
            className="statistics"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
            }}>
            <button onClick={handleLogout} style={{ alignSelf: 'flex-end' }}>
                Wyloguj
            </button>
            <h1>Witaj w statystykach!</h1>
            <p>
                Tu będą wyświetlane statystyki (gatunki produkowanych piw, ilość
                wyprodukowanego piwa danego typu i ogólnie - histogramy z różną
                rozdzielczością czasową, liczba udanych/ nieudanych warek)
            </p>
        </div>
    );
};

export default Statistics;
