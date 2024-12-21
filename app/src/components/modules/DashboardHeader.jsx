import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DashboardHeader.module.css';

const DashboardHeader = () => {
    const navigate = useNavigate();

    const logOut = () => navigate('/login');
    const dashboard = () => navigate('/dashboard');

    const handleLogout = () => {
        localStorage.removeItem('userType');
        logOut();
    };

    return (
        <nav className={styles.dashboardHeader}>
            <div onClick={dashboard} className={styles.dashboardHeaderLogo}>
                Panel Główny
            </div>
            <div className={styles.rest}>
                <div>
                    <button className={styles.lightButton}>Moje Konto</button>
                    <button
                        onClick={handleLogout}
                        className={styles.darkButton}>
                        Wyloguj się
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default DashboardHeader;
