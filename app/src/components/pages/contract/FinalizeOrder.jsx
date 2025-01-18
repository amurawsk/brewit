import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import PageTitle from '../../utils/PageTitle.jsx';

import styles from './ChooseCommercial.module.css';
import FinalizeNewOrder from '../../modules/contract/FinalizeNewOrder.jsx';

/**
 * FinalizeOrder for Contract Brewery - contains layout (Header, Sidebar)
 */
const FinalizeOrder = () => {
    const location = useLocation();
    const brewery = location.state?.brewery || null;
    const timeSlots = location.state?.timeSlots || null

    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <ContractSidebar />
                <div className={styles.content}>
                    <PageTitle text="Potwierdź zlecenie" />
                    <FinalizeNewOrder selectedBrewery={brewery} timeSlots={timeSlots} />
                </div>
            </div>
        </div>
    );
};

export default FinalizeOrder;
