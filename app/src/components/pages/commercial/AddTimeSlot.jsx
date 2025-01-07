import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import AddTimeSlotForm from '../../modules/commercial/AddTimeSlotForm.jsx';
import PageTittle from '../../utils/PageTittle.jsx';

import styles from './AddTimeSlot.module.css';

const AddTimeSlot = () => {
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

export default AddTimeSlot;
