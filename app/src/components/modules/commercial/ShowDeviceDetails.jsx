import React, { useEffect, useState } from 'react';

import styles from './ShowDeviceDetails.module.css';

import api from '../../../api.js';

const ShowDeviceDetails = ({ isPanelOpen, setIsPanelOpen, deviceFields, getData }) => {
    const [currentDeviceFields, setCurrentDeviceFields] =
        useState(deviceFields);

    const handleFieldChange = (field, value, checked) => {
        if (field === 'carbonation') {
            setCurrentDeviceFields((prevFields) => {
                let currentCarbonation = prevFields.carbonation
                    ? prevFields.carbonation.split(',')
                    : [];
                if (checked) {
                    if (!currentCarbonation.includes(value)) {
                        currentCarbonation.push(value);
                    }
                } else {
                    currentCarbonation = currentCarbonation.filter(
                        (item) => item !== value
                    );
                }
                const updatedCarbonation = currentCarbonation.join(',');
                return { ...prevFields, [field]: updatedCarbonation };
            });
        } else {
            const updatedValue = ['capacity', 'price'].includes(field)
                ? parseFloat(value)
                : value;
            setCurrentDeviceFields({
                ...currentDeviceFields,
                [field]: updatedValue,
            });
        }
    };

    useEffect(() => {
        setCurrentDeviceFields(deviceFields);
    }, [deviceFields]);

    const editDevice = () => {
        const postData = async () => {
            try {
                const response = await api.post(`devices/${currentDeviceFields.id}/edit/`, {
                    name: currentDeviceFields.name,
                    serial_number: currentDeviceFields.serial_number,
                    capacity: currentDeviceFields.capacity,
                    temperature_min: currentDeviceFields.temperature_min,
                    temperature_max: currentDeviceFields.temperature_max,
                    sour_beers: currentDeviceFields.sour_beers,
                    carbonation: currentDeviceFields.carbonation,
                    supported_containers: currentDeviceFields.supported_containers
                });
                if (response.status === 200) {
                    getData();
                } else {
                    console.log('Wystąpił błąd', response)
                }
            } catch (error) {
                console.error('Error fetching devices:', error);
                alert('Błąd sieci! Spróbuj ponownie później.');
            }
            setIsPanelOpen(false);
        };
        postData()
    };

    const resolveDeviceType = (type) => {
        if (type === 'BT') return 'Tank warzelny';
        if (type === 'BE') return 'Urządzenie do rozlewania';
        if (type === 'FT') return 'Pojemnik fermentacyjny';
        if (type === 'AC') return 'Kocioł do leżakowania';
    };

    return (
        <div
            className={`${styles.sidePanel} ${isPanelOpen ? styles.sidePanelOpen : ''}`}>
            <button
                className={styles.closePanel}
                onClick={() => setIsPanelOpen(false)}>
                ×
            </button>
            {currentDeviceFields && (
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
                    <div
                        className={`${styles.deviceTypeBox} ${
                            styles[
                                `deviceType${currentDeviceFields.device_type}`
                            ]
                        }`}>
                        {resolveDeviceType(currentDeviceFields.device_type)}
                    </div>
                    <label className={styles.panelContentLabel}>Nazwa:</label>
                    <input
                        className={styles.panelContentInput}
                        type="text"
                        placeholder="Wpisz nazwę"
                        value={currentDeviceFields.name}
                        onChange={(e) =>
                            handleFieldChange('name', e.target.value)
                        }
                    />
                    {currentDeviceFields.device_type !== 'BE' && (
                        <div className={styles.panelContent}>
                            <label className={styles.panelContentLabel}>
                                Pojemność (L):
                            </label>
                            <input
                                className={styles.panelContentInput}
                                type="number"
                                min="0"
                                step="0.1"
                                placeholder="Wpisz pojemność"
                                value={currentDeviceFields.capacity}
                                onChange={(e) =>
                                    handleFieldChange(
                                        'capacity',
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    )}
                    {currentDeviceFields.device_type !== 'BE' &&
                        currentDeviceFields.device_type && (
                            <div className={styles.panelContent}>
                                <label className={styles.panelContentLabel}>
                                    Temperatura minimalna (℃):
                                </label>
                                <input
                                    className={styles.panelContentInput}
                                    type="number"
                                    step="0.5"
                                    placeholder="Wpisz temperaturę minimalną"
                                    value={currentDeviceFields.temperature_min}
                                    onChange={(e) =>
                                        handleFieldChange(
                                            'temperature_min',
                                            e.target.value
                                        )
                                    }
                                />
                                <label className={styles.panelContentLabel}>
                                    Temperatura maksymalna (℃):
                                </label>
                                <input
                                    className={styles.panelContentInput}
                                    type="number"
                                    step="0.5"
                                    placeholder="Wpisz temperaturę maksymalną"
                                    value={currentDeviceFields.temperature_max}
                                    onChange={(e) =>
                                        handleFieldChange(
                                            'temperature_max',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        )}
                    <label className={styles.panelContentLabel}>
                        Kwaśne piwa:
                    </label>
                    <input
                        className={styles.checkboxInput}
                        type="checkbox"
                        value="Zaznacz, jeśli obsługuje"
                        checked={currentDeviceFields.sour_beers}
                        onChange={(e) =>
                            handleFieldChange('sour_beers', e.target.checked)
                        }
                    />
                    {(currentDeviceFields.device_type === 'AC' ||
                        currentDeviceFields.device_type === 'BE') && (
                        <div className={styles.panelContent}>
                            <label className={styles.panelContentLabel}>
                                Nagazowanie:
                            </label>
                            <div>
                                <input
                                    className={styles.checkboxInput}
                                    type="checkbox"
                                    id="CO2"
                                    name="carbonation"
                                    value="CO2"
                                    checked={currentDeviceFields.carbonation.includes(
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
                                    className={styles.checkboxInputLabel}
                                    htmlFor="CO2">
                                    CO2
                                </label>

                                <input
                                    className={styles.checkboxInput}
                                    type="checkbox"
                                    id="N2"
                                    name="carbonation"
                                    value="N2"
                                    checked={currentDeviceFields.carbonation.includes(
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
                                    className={styles.checkboxInputLabel}
                                    htmlFor="N2">
                                    N2
                                </label>

                                <input
                                    className={styles.checkboxInput}
                                    type="checkbox"
                                    id="CO2-N2"
                                    name="carbonation"
                                    value="mieszanka"
                                    checked={currentDeviceFields.carbonation.includes(
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
                                    className={styles.checkboxInputLabel}
                                    htmlFor="CO2-N2">
                                    mieszanka
                                </label>
                            </div>
                        </div>
                    )}

                    {currentDeviceFields.device_type === 'BE' && (
                        <div className={styles.panelContent}>
                            <label className={styles.panelContentLabel}>
                                Obsługiwane pojemniki:
                            </label>
                            <input
                                className={styles.panelContentInput}
                                type="text"
                                placeholder="Np. butelki, puszki, kegi..."
                                value={currentDeviceFields.supported_containers}
                                onChange={(e) =>
                                    handleFieldChange(
                                        'supported_containers',
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    )}

                    <div className={styles.panelButtons}>
                        <button
                            className={styles.cancelButton}
                            onClick={() => setIsPanelOpen(false)}>
                            Anuluj
                        </button>
                        <button
                            className={styles.applyButton}
                            onClick={() => {
                                editDevice();
                                setIsPanelOpen(false);
                            }}>
                            Zastosuj zmiany
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default ShowDeviceDetails;
