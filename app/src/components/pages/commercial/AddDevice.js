import React from 'react';

import styles from './AddDevice.module.css';
import DashboardHeader from '../../modules/DashboardHeader.js';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.js';
import AddDeviceForm from '../../modules/commercial/AddDeviceForm.jsx';

const AddDevice = () => {
    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <CommercialSidebar />
                <div className={styles.addEquipment}>
                    <h1 className={styles.addDeviceTittle}>Dodaj urządzenie</h1>
                    <AddDeviceForm />
                </div>
            </div>
        </div>
    );
};

export default AddDevice;
