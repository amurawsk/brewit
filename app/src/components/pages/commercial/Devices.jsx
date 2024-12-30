import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import PageTittleWithButton from '../../utils/PageTittleWithButton.jsx';
import ShowDevices from '../../modules/commercial/ShowDevices.jsx';
import ShowDeviceDetails from '../../modules/commercial/ShowDeviceDetails.jsx';
import styles from './Devices.module.css';
import api from '../../../api.js';

const Devices = () => {
    const navigate = useNavigate();

    const addDevice = () => navigate('/commercial/devices/add');
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [deviceFields, setDeviceFields] = useState({});
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const getData = async () => {
        try {
            const breweryId = 1;
            const response = await api.get(`devices/brewery/${breweryId}/`);
            if (response.status === 200) {
                setDevices(response.data);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log('Error fetching devices:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const openPanel = (device) => {
        setSelectedDevice(device);
        setDeviceFields({ ...device });
        setIsPanelOpen(true);
    };

    return (
        <div>
            <DashboardHeader />
            <div className={styles.appContainer}>
                <CommercialSidebar />
                <div className={styles.content}>
                    <PageTittleWithButton
                        text="Urządzenia"
                        buttonText="Dodaj nowe urządzenie"
                        buttonFunction={addDevice}
                    />

                    <ShowDevices devices={devices} openPanel={openPanel} />
                </div>
            </div>

            <ShowDeviceDetails
                isPanelOpen={isPanelOpen}
                setIsPanelOpen={setIsPanelOpen}
                deviceFields={deviceFields}
                selectedDevice={selectedDevice}
                setDeviceFields={setDeviceFields}
            />
        </div>
    );
};

export default Devices;
