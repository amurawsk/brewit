import React from 'react';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import CommercialDashboardContent from '../../modules/commercial/CommercialDashboardContent.jsx';
import styles from './CommercialDashboard.module.css';

const CommercialDashboard = () => {
    return (
        <div>
            <DashboardHeader />
            <div className={styles.appContainer}>
                <CommercialSidebar />
                <div className={styles.content}>
                    <CommercialDashboardContent />
                </div>
            </div>
        </div>
    );
};

export default CommercialDashboard;
