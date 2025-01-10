import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import AddTimeSlotForm from '../../modules/commercial/AddTimeSlotForm.jsx';
import PageTitle from '../../utils/PageTitle.jsx';

import styles from './AddTimeSlot.module.css';

/**
 * Add TimeSlot page - contains layout (Header, Sidebar, Title) and form which allows to add time slot
 */
const AddTimeSlot = () => {
    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <CommercialSidebar />
                <div className={styles.content}>
                    <PageTitle text="Dodaj okno czasowe" />
                    <AddTimeSlotForm />
                </div>
            </div>
        </div>
    );
};

export default AddTimeSlot;
