import React from 'react';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import IntermediarySidebar from '../../modules/intermediary/IntermediarySidebar.jsx';

import styles from './Orders.module.css';

const Orders = () => {
    return (
        <div>
            <DashboardHeader />
            <div className={styles.appContainer}>
                <IntermediarySidebar />
                <div className={styles.content}>
                </div>
            </div>
        </div>
    );
};

export default Orders;
