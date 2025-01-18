import React from 'react';

import styles from './ShowDeviceDetails.module.css';

const ShowDeviceDetails = ({
    isPanelOpen,
    setIsPanelOpen,
    deviceFields,
    selectedDevice,
    setDeviceFields,
}) => {
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

    const changeDevice = () => {
        // TODO
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
            {selectedDevice && (
                <div className={styles.panelContent}>
                    <div className={styles.detailsHeader}>
                        <span className={styles.detailsHeaderLarge}>
                            Szczegóły urządzenia
                        </span>
                        <span className={styles.detailsHeaderSmall}>
                            W tym panelu możesz również edytować swoje urządzenie
                        </span>
                    </div>
                    <div
                        className={`${styles.deviceTypeBox} ${
                            styles[`deviceType${deviceFields.device_type}`]
                        }`}>
                        {resolveDeviceType(deviceFields.device_type)}
                    </div>
                    <label className={styles.panelContentLabel}>Nazwa:</label>
                    <input
                        className={styles.panelContentInput}
                        type="text"
                        placeholder="Wpisz nazwę"
                        value={deviceFields.name}
                        onChange={(e) =>
                            handleFieldChange('name', e.target.value)
                        }
                    />
                    {deviceFields.device_type !== 'BE' && 
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
                                value={deviceFields.capacity}
                                onChange={(e) =>
                                    handleFieldChange('capacity', e.target.value)
                                }
                            />
                        </div>
                    }                    
                    {deviceFields.device_type !== 'BE' &&
                        deviceFields.device_type && (
                            <div className={styles.panelContent}>
                                <label className={styles.panelContentLabel}>
                                    Temperatura minimalna (℃):
                                </label>
                                <input
                                    className={styles.panelContentInput}
                                    type="number"
                                    step="0.5"
                                    placeholder="Wpisz temperaturę minimalną"
                                    value={deviceFields.temperature_min}
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
                                    value={deviceFields.temperature_max}
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
                        checked={deviceFields.sour_beers}
                        onChange={(e) =>
                            handleFieldChange('sour_beers', e.target.checked)
                        }
                    />
                    {(deviceFields.device_type === 'AC' ||
                        deviceFields.device_type === 'BE') && (
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
                                    className={styles.checkboxInputLabel}
                                    htmlFor="CO2-N2">
                                    mieszanka
                                </label>
                            </div>
                        </div>
                    )}

                    {deviceFields.device_type === 'BE' && (
                        <div className={styles.panelContent}>
                            <label className={styles.panelContentLabel}>
                                Obsługiwane pojemniki:
                            </label>
                            <input
                                className={styles.panelContentInput}
                                type="text"
                                placeholder="Np. butelki, puszki, kegi..."
                                value={deviceFields.supported_containers}
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
                                changeDevice();
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
