import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Coworkers.module.css';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import PageTittleWithButton from '../../utils/PageTittleWithButton.jsx';

const Coworkers = () => {
    const navigate = useNavigate();

    const addCoworker = () => navigate('/commercial/devices/add');

    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <CommercialSidebar />
                <div className={styles.content}>
                    <PageTittleWithButton
                            text="Współpracownicy"
                            buttonText="Dodaj nowego współpracownika"
                            buttonFunction={addCoworker}
                    />
                </div>
            </div>
        </div>
    );
};

export default Coworkers;
