import React from 'react';
import styles from './Orders.module.css';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import PageTittle from '../../utils/PageTittle.jsx';

const Orders = () => {
    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <CommercialSidebar />
                <div className={styles.content}>
                    <PageTittle text="Zlecenia" />
                </div>
            </div>
        </div>
    );
};

export default Orders;
