import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import PageTitleWithButton from '../../utils/PageTitleWithButton.jsx';
import ShowDevices from '../../modules/commercial/ShowDevices.jsx';
import ShowDeviceDetails from '../../modules/commercial/ShowDeviceDetails.jsx';
import styles from './Devices.module.css';
import api from '../../../api.js';

/**
 * Devices page - contains layout (Header, Sidebar, Title, Button), displays devices for given brewery
 */
const Devices = () => {
    const navigate = useNavigate();
    const addDevice = () => navigate('/commercial/devices/add');

    const [devices, setDevices] = useState([]);
    const [deviceFields, setDeviceFields] = useState({});
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const getData = async () => {
        try {
            const breweryId = localStorage.getItem('breweryId');
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
        setDeviceFields({ ...device });
        setIsPanelOpen(true);
    };

    return (
        <div>
            <DashboardHeader />
            <div className={styles.appContainer}>
                <CommercialSidebar />
                <div className={styles.content}>
                    <PageTitleWithButton
                        text="Urządzenia"
                        buttonText="Dodaj nowe urządzenie"
                        buttonFunction={addDevice}
                    />

                    {devices.length === 0 ? (
                        <p className={styles.noDevicesMessage}>
                            Brak urządzeń. Dodaj nowe urządzenie.
                        </p>
                    ) : (
                        <ShowDevices
                            devices={devices}
                            openPanel={openPanel}
                            getData={getData}
                        />
                    )}
                </div>
            </div>

            <ShowDeviceDetails
                isPanelOpen={isPanelOpen}
                setIsPanelOpen={setIsPanelOpen}
                deviceFields={deviceFields}
                getData={getData}
            />
        </div>
    );
};

export default Devices;
