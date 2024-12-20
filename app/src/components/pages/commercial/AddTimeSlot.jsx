import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import DashboardHeader from '../../modules/DashboardHeader.js';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.js';
import AddTimeSlotForm from '../../modules/commercial/AddTimeSlotForm.jsx';
import PageTittle from '../../modules/PageTittle.jsx';

import styles from './AddTimeSlot.module.css';

const AddTimeWindowForm = () => {
    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <CommercialSidebar />
                <div className={styles.content}>
                    <PageTittle text="Dodaj okno czasowe" />
                    <AddTimeSlotForm />
                </div>
            </div>
        </div>
    );
};

export default AddTimeWindowForm;
