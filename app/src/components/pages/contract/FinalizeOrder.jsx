import React from 'react';
import { useLocation } from 'react-router-dom';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import PageTitle from '../../utils/PageTitle.jsx';
import FinalizeNewOrder from '../../modules/contract/FinalizeNewOrder.jsx';

import styles from './ChooseCommercial.module.css';

/**
 * FinalizeOrder for Contract Brewery - contains layout (Header, Sidebar)
 */
const FinalizeOrder = () => {
    const location = useLocation();
    const brewery = location.state?.brewery || null;
    const timeSlots = location.state?.timeSlots || [];

    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <ContractSidebar />
                <div className={styles.content}>
                    <PageTitle text="Potwierdź zlecenie" />
                    <FinalizeNewOrder
                        selectedBrewery={brewery}
                        timeSlots={timeSlots}
                    />
                </div>
            </div>
        </div>
    );
};

export default FinalizeOrder;
