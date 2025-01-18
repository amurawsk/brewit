import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Coworkers.module.css';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import PageTitleWithButton from '../../utils/PageTitleWithButton.jsx';

/**
 * SelectTimeslots page - contains layout (Header, Sidebar, Title, Button)
 */
const SelectTimeslots = () => {
    const location = useLocation();
    const breweryId = location.state?.breweryId || null;

    const navigate = useNavigate();
    const showSummary = () => navigate('/contract/orders/add/finalize');

    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <ContractSidebar />
                <div className={styles.content}>
                    <PageTitleWithButton
                        text="Dodaj okna czasowe"
                        buttonText="Wyświetl podsumowanie"
                        buttonFunction={showSummary}
                    />
                    {/* TODO filter */}

                </div>
            </div>
        </div>
    );
};

export default SelectTimeslots;
