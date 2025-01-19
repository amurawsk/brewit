import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './DashboardHeader.module.css';

const DashboardHeader = () => {
    const navigate = useNavigate();

    const logOut = () => navigate('/login');
    const dashboard = () => {
        if (localStorage.getItem('userType') === 'commercial_brewery') {
            navigate('/commercial/dashboard');
        } else if (localStorage.getItem('userType') === 'contract_brewery') {
            navigate('/contract/dashboard');
        }
    };

    const myAccount = () => {
        if (localStorage.getItem('userType') === 'commercial_brewery') {
            navigate('/commercial/account');
        } else if (localStorage.getItem('userType') === 'contract_brewery') {
            navigate('/contract/account');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('REFRESH_TOKEN');
        localStorage.removeItem('userType');
        localStorage.removeItem('userId');
        localStorage.removeItem('breweryId');
        logOut();
    };

    return (
        <nav className={styles.dashboardHeader}>
            <div onClick={dashboard} className={styles.dashboardHeaderLogo}>
                Panel Główny
            </div>
            <div className={styles.rest}>
                <div>
                    <button onClick={myAccount} className={styles.lightButton}>
                        Moje Konto
                    </button>
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
