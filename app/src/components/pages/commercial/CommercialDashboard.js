import React from 'react';
// import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../modules/DashboardHeader.js';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.js';
import styles from './CommercialDashboard.module.css';

const CommercialDashboard = () => {
    // const navigate = useNavigate();

    return (
        <div>
            <DashboardHeader />
            <div className={styles.appContainer}>
                <CommercialSidebar />
                <div className={styles.content}>
                    <h1>Witaj w aplikacji!</h1>
                    <p>To jest przykładowy tekst obok panelu.</p>
                </div>
            </div>
        </div>
    );
};

export default CommercialDashboard;
