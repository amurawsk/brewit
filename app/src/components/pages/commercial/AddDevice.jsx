import React from 'react';

import styles from './AddDevice.module.css';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import AddDeviceForm from '../../modules/commercial/AddDeviceForm.jsx';
import PageTittle from '../../utils/PageTittle.jsx';

/**
 * Add Device page - contains layout (Header, Sidebar, Tittle) and form which allows to add device
 */
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
