import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import DashboardHeader from '../../modules/DashboardHeader.js';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.js';
import AddTimeSlotForm from '../../modules/commercial/AddTimeSlotForm.jsx';

import styles from './AddTimeSlot.module.css';

const AddTimeWindowForm = () => {
    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <CommercialSidebar />
                <div className={styles.content}>
                    <h1 className={styles.addTimeSlotTittle}>
                        Dodaj okno czasowe
                    </h1>
                    <AddTimeSlotForm />
                </div>
            </div>
        </div>
    );
};

export default AddTimeWindowForm;
