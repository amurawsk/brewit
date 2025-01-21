import React from 'react';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import IntermediarySidebar from '../../modules/intermediary/IntermediarySidebar.jsx';
import IntermediaryDashboardContent from '../../modules/intermediary/IntermediaryDashboardContent.jsx';

import styles from './IntermediaryDashboard.module.css';

/**
 * Dashboard for Contract Brewery - contains layout (Header, Sidebar) and DashboardContent
 */
const IntermediaryDashboard = () => {
    return (
        <div>
            <DashboardHeader />
            <div className={styles.appContainer}>
                <IntermediarySidebar />
                <div className={styles.content}>
                    <IntermediaryDashboardContent />
                </div>
            </div>
        </div>
    );
};

export default IntermediaryDashboard;
