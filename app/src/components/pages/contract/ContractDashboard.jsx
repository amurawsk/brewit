import React from 'react';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import styles from './ContractDashboard.module.css';

const ContractDashboard = () => {
    return (
        <div>
            <DashboardHeader />
            <div className={styles.appContainer}>
                <ContractSidebar />
                <div className={styles.content}>
                    {/* TODO */}
                    Witaj w aplikacji
                </div>
            </div>
        </div>
    );
};

export default ContractDashboard;
