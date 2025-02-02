import React from 'react';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import CommercialDashboardContent from '../../modules/commercial/CommercialDashboardContent.jsx';

import styles from './CommercialDashboard.module.css';

/**
 * Dashboard for Commercial Brewery - contains layout (Header, Sidebar) and DashboardContent
 */
const CommercialDashboard = () => {
    return (
        <div>
            <DashboardHeader />
            <div className={styles.appContainer}>
                {localStorage.getItem('userType') === 'commercial_brewery' && (
                    <CommercialSidebar />
                )}
                {localStorage.getItem('userType') === 'contract_brewery' && (
                    <ContractSidebar />
                )}
                <div className={styles.content}>
                    <CommercialDashboardContent />
                </div>
            </div>
        </div>
    );
};

export default CommercialDashboard;
