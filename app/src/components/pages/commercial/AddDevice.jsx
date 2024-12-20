import React from 'react';

import styles from './AddDevice.module.css';
import DashboardHeader from '../../modules/DashboardHeader.js';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import AddDeviceForm from '../../modules/commercial/AddDeviceForm.jsx';
import PageTittle from '../../modules/PageTittle.jsx';

const AddDevice = () => {
    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <CommercialSidebar />
                <div className={styles.addEquipment}>
                    <PageTittle text="Dodaj urządzenie" />
                    <AddDeviceForm />
                </div>
            </div>
        </div>
    );
};

export default AddDevice;
