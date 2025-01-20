import React from 'react';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import IntermediarySidebar from '../../modules/intermediary/IntermediarySidebar.jsx';

import styles from './Statistics.module.css';

const Statistics = () => {
    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <IntermediarySidebar />
                <div className={styles.content}></div>
            </div>
        </div>
    );
};

export default Statistics;