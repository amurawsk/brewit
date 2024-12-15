import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardHeader.css';

const DashboardHeader = () => {
	const navigate = useNavigate();

    const logOut = () => navigate('/login')

    return (
        <nav className="dashboardheader">
            <div className="logo">Panel Główny</div>
            <div className="rest">
                <div className="button-group">
                    <button className="smalllight-button">Moje Konto</button>
                    <button onClick={logOut} className="smalldark-button">Wyloguj się</button>
                </div>
            </div>
        </nav>
    );
};

export default DashboardHeader;
