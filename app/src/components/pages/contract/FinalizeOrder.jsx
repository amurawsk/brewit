import React, { useState } from 'react';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import PageTitle from '../../utils/PageTitle.jsx';

import styles from './ChooseCommercial.module.css';

/**
 * FinalizeOrder for Contract Brewery - contains layout (Header, Sidebar)
 */
const FinalizeOrder = () => {

    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <ContractSidebar />
                <div className={styles.content}>
                    <PageTitle text="Potwierdź zlecenie" />
                    
                </div>
            </div>
        </div>
    );
};

export default FinalizeOrder;
