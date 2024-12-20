import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import PageTittleWithButton from '../../utils/PageTittleWithButton.jsx';
import styles from './Device.module.css';
import api from '../../../api.js';

const Device = () => {
    const navigate = useNavigate();

    const addDevice = () => navigate('/add_device');
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

    const closePanel = () => {
        setIsPanelOpen(false);
    };

    const handleFieldChange = (field, value, checked) => {
        if (field === 'carbonation') {
            setDeviceFields((prevFields) => {
                let newCarbonation = [...prevFields.carbonation];
                if (checked) {
                    if (!newCarbonation.includes(value)) {
                        newCarbonation.push(value);
                    }
                } else {
                    newCarbonation = newCarbonation.filter(
                        (item) => item !== value
                    );
                }
                return { ...prevFields, [field]: newCarbonation };
            });
        } else {
            const updatedValue = ['capacity', 'price'].includes(field)
                ? parseFloat(value)
                : value;
            setDeviceFields({ ...deviceFields, [field]: updatedValue });
        }
    };

    const changeDevice = (deviceFields) => {
        // TODO
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

                    <div className={styles.allDevices}>
                        {devices.map((device, index) => (
                            <div
                                className={styles.device}
                                key={index}
                                onClick={() => openPanel(device)}>
                                <div className={styles.deviceText}>
                                    <span className={styles.deviceTextTitle}>
                                        {device.name}
                                    </span>
                                    <span className={styles.deviceDescription}>
                                        typ urządzenia:
                                        <span
                                            className={
                                                styles.deviceDescriptionValue
                                            }>
                                            {' '}
                                            {device.device_type}
                                        </span>
                                    </span>
                                    <span className={styles.deviceDescription}>
                                        nr seryjny:
                                        <span
                                            className={
                                                styles.deviceDescriptionValue
                                            }>
                                            {' '}
                                            {device.serial_number}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div
                className={`${styles.sidePanel} ${isPanelOpen ? styles.sidePanelOpen : ''}`}>
                <button className={styles.closePanel} onClick={closePanel}>
                    ×
                </button>
                {selectedDevice && (
                    <div className={styles.panelContent}>
                        <div className={styles.detailsHeader}>
                            <span className={styles.detailsHeaderLarge}>
                                Szczegóły urządzenia
                            </span>
                            <span className={styles.detailsHeaderSmall}>
                                W tym panelu możesz również edytować swoje
                                urządzenie
                            </span>
                        </div>
                        <label className={styles.panelContentLabel}>
                            Nazwa:
                        </label>
                        <input
                            className={styles.panelContentInput}
                            type="text"
                            value={deviceFields.name}
                            onChange={(e) =>
                                handleFieldChange('name', e.target.value)
                            }
                        />
                        <label className={styles.panelContentLabel}>Typ:</label>
                        <input
                            className={styles.panelContentInput}
                            type="text"
                            value={deviceFields.type}
                            readOnly
                        />
                        <label className={styles.panelContentLabel}>
                            Pojemność (L):
                        </label>
                        <input
                            className={styles.panelContentInput}
                            type="number"
                            min="0"
                            step="0.1"
                            value={deviceFields.capacity}
                            onChange={(e) =>
                                handleFieldChange('capacity', e.target.value)
                            }
                        />
                        <label className={styles.panelContentLabel}>
                            Zakres temperatur:
                        </label>
                        <input
                            className={styles.panelContentInput}
                            type="text"
                            value={deviceFields.temperature_min}
                            onChange={(e) =>
                                handleFieldChange(
                                    'temperature_min',
                                    e.target.value
                                )
                            }
                        />
                        <label className={styles.panelContentLabel}>
                            Kwaśne piwa:
                        </label>
                        <input
                            className={styles.checkboxInput}
                            type="checkbox"
                            value="Zaznacz, jeśli obsługuje"
                            checked={deviceFields.sour_beers}
                            onChange={(e) =>
                                handleFieldChange(
                                    'sour_beers',
                                    e.target.checked
                                )
                            }
                        />
                        <label className={styles.panelContentLabel}>
                            Karbonizacja:
                        </label>
                        <div>
                            <input
                                className={styles.checkboxInput}
                                type="checkbox"
                                id="CO2"
                                name="carbonation"
                                value="CO2"
                                checked={deviceFields.carbonation.includes(
                                    'CO2'
                                )}
                                onChange={(e) =>
                                    handleFieldChange(
                                        'carbonation',
                                        e.target.value,
                                        e.target.checked
                                    )
                                }
                            />
                            <label
                                className={styles.panelContentLabel}
                                htmlFor="CO2">
                                CO2
                            </label>

                            <input
                                className={styles.checkboxInput}
                                type="checkbox"
                                id="N2"
                                name="carbonation"
                                value="N2"
                                checked={deviceFields.carbonation.includes(
                                    'N2'
                                )}
                                onChange={(e) =>
                                    handleFieldChange(
                                        'carbonation',
                                        e.target.value,
                                        e.target.checked
                                    )
                                }
                            />
                            <label
                                className={styles.panelContentLabel}
                                htmlFor="N2">
                                N2
                            </label>

                            <input
                                className={styles.checkboxInput}
                                type="checkbox"
                                id="CO2-N2"
                                name="carbonation"
                                value="mieszanka"
                                checked={deviceFields.carbonation.includes(
                                    'mieszanka'
                                )}
                                onChange={(e) =>
                                    handleFieldChange(
                                        'carbonation',
                                        e.target.value,
                                        e.target.checked
                                    )
                                }
                            />
                            <label
                                className={styles.panelContentLabel}
                                htmlFor="CO2-N2">
                                mieszanka
                            </label>
                        </div>
                        <label className={styles.panelContentLabel}>
                            Obsługiwane pojemniki:
                        </label>
                        <input
                            className={styles.panelContentInput}
                            type="text"
                            value={deviceFields.supported_containers}
                            onChange={(e) =>
                                handleFieldChange(
                                    'supported_containers',
                                    e.target.value
                                )
                            }
                        />
                        <label className={styles.panelContentLabel}>
                            Cena (zł):
                        </label>
                        <input
                            className={styles.panelContentInput}
                            type="number"
                            min="0"
                            step="0.1"
                            value={deviceFields.price}
                            onChange={(e) =>
                                handleFieldChange('price', e.target.value)
                            }
                        />

                        <div className={styles.panelButtons}>
                            <button
                                className={styles.cancelButton}
                                onClick={closePanel}>
                                Anuluj
                            </button>
                            <button
                                className={styles.applyButton}
                                onClick={() => {
                                    changeDevice(deviceFields);
                                    setIsPanelOpen(false);
                                }}>
                                Zastosuj zmiany
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Device;
