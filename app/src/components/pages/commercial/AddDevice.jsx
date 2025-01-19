import React from 'react';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import AddDeviceForm from '../../modules/commercial/AddDeviceForm.jsx';
import PageTitle from '../../utils/PageTitle.jsx';

import styles from './AddDevice.module.css';

/**
 * Add Device page - contains layout (Header, Sidebar, Title) and form which allows to add device
 */
const AddDevice = () => {
    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <CommercialSidebar />
                <div className={styles.addEquipment}>
                    <PageTitle text="Dodaj urządzenie" />
                    <AddDeviceForm />
                </div>
            </div>
        </div>
    );
};

export default AddDevice;
