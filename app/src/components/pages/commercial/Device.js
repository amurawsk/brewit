import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../modules/DashboardHeader.js';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.js';
import styles from './Device.module.css'


const Device = () => {
    const navigate = useNavigate();

	const addDevice = () => navigate('/add_device')

    const [selectedDevice, setSelectedDevice] = useState(null);
    const [deviceFields, setDeviceFields] = useState({});
    const [isPanelOpen, setIsPanelOpen] = useState(false);

	const equipment = [
		{ name: 'Tank warzelny #1', type: 'Tank warzelny', serial_number: '123456', capacity: 100, temperature_range: '80C-120C', sour_beers: true, price: 300, carbonation: ['CO2', 'mieszanka'], supported_containers: '-' },
		{ name: 'Pojemnik fermentacyjny #1', type: 'Pojemnik fermentacyjny', serial_number: '234567', capacity: 100, temperature_range: '10C-30C', sour_beers: false, price: 250, carbonation: [], supported_containers: '-' },
		{ name: 'Kocioł do leżakowania #1', type: 'Kocioł do leżakowania', serial_number: '345678', capacity: 100, temperature_range: '-5C-20C', sour_beers: true, price: 300, carbonation: ['mieszanka', 'N2'], supported_containers: '-' },
		{ name: 'Urządzenie do rozlewania #1', type: 'Urządzenie do rozlewania', serial_number: '456789', capacity: 100, temperature_range: '-', sour_beers: false, price: 250, carbonation: [], supported_containers: 'butelki' }
	];

    const openPanel = (device) => {
        setSelectedDevice(device);
        setDeviceFields({ ...device });
        setIsPanelOpen(true);
    };

    const closePanel = () => {
        setIsPanelOpen(false);
    };

	const handleFieldChange = (field, value, checked) => {
		if (field === "carbonation") {
			setDeviceFields(prevFields => {
				let newCarbonation = [...prevFields.carbonation];
				if (checked) {
					if (!newCarbonation.includes(value)) {
						newCarbonation.push(value);
					}
				} else {
					newCarbonation = newCarbonation.filter(item => item !== value);
				}
				return { ...prevFields, [field]: newCarbonation };
			});
		} else {
			const updatedValue = ['capacity', 'price'].includes(field) ? parseFloat(value) : value;
			setDeviceFields({ ...deviceFields, [field]: updatedValue });
		}
	};
	
	

	const changeDevice = (deviceFields) => {
		// TODO
	}

    return (
        <div>
            <DashboardHeader />
            <div className='app-container'>
                <CommercialSidebar />
                <div className={styles.content}>
					<div className={styles.tittleButton}>
						<h1 className={styles.tittle}>Moje urządzenia</h1>
						<button className={styles.addDeviceButton} onClick={addDevice}>Dodaj nowe urządzenie</button>
					</div>
                    
                    <div className={styles.allDevices}>
                        {equipment.map((device, index) => (
                            <div className={styles.device} key={index} onClick={() => openPanel(device)}>
                                <div className={styles.deviceText}>
                                    <span className={styles.deviceTextTitle}>{device.name}</span>
                                    <span className={styles.deviceDescription}>typ urządzenia:
                                        <span className={styles.deviceDescriptionValue}> {device.type}</span>
                                    </span>
                                    <span className={styles.deviceDescription}>nr seryjny:
                                        <span className={styles.deviceDescriptionValue}> {device.serial_number}</span>
                                    </span>
                                </div>
                                <div className={styles.devicePrice}>
                                    <span className={styles.deviceDescription}>Cena:
                                        <span className={styles.deviceDescriptionValue}> {device.price} zł</span>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={`${styles.sidePanel} ${isPanelOpen ? styles.sidePanelOpen : ''}`}>
                <button className={styles.closePanel} onClick={closePanel}>×</button>
                {selectedDevice && (
                    <div className={styles.panelContent}>
                        <div className={styles.detailsHeader}>
							<span className={styles.detailsHeaderLarge}>Szczegóły urządzenia</span>	
							<span className={styles.detailsHeaderSmall}>W tym panelu możesz również edytować swoje urządzenie</span>
						</div>
                        <label className={styles.panelContentLabel}>Nazwa:</label>
                        <input className={styles.panelContentInput} type="text" value={deviceFields.name} onChange={(e) => handleFieldChange('name', e.target.value)} />
                        <label className={styles.panelContentLabel}>Typ:</label>
                        <input className={styles.panelContentInput} type="text" value={deviceFields.type} readOnly />
                        <label className={styles.panelContentLabel}>Pojemność (L):</label>
                        <input className={styles.panelContentInput} type="number" min="0" step="0.1" value={deviceFields.capacity} onChange={(e) => handleFieldChange('capacity', e.target.value)} />
                        <label className={styles.panelContentLabel}>Zakres temperatur:</label>
                        <input className={styles.panelContentInput} type="text" value={deviceFields.temperature_range} onChange={(e) => handleFieldChange('temperature_range', e.target.value)} />
                        <label className={styles.panelContentLabel}>Kwaśne piwa:</label>
                        <input className={styles.checkboxInput} type="checkbox" value="Zaznacz, jeśli obsługuje" checked={deviceFields.sour_beers} onChange={(e) => handleFieldChange('sour_beers', e.target.checked)} />
                        <label className={styles.panelContentLabel}>Karbonizacja:</label>
						<div>
							<input
								className={styles.checkboxInput}
								type="checkbox"
								id="CO2"
								name="carbonation"
								value="CO2"
								checked={deviceFields.carbonation.includes("CO2")}
								onChange={(e) => handleFieldChange('carbonation', e.target.value, e.target.checked)}
							/>
							<label className={styles.panelContentLabel} htmlFor="CO2">CO2</label>

							<input
								className={styles.checkboxInput}
								type="checkbox"
								id="N2"
								name="carbonation"
								value="N2"
								checked={deviceFields.carbonation.includes("N2")}
								onChange={(e) => handleFieldChange('carbonation', e.target.value, e.target.checked)}
							/>
							<label className={styles.panelContentLabel} htmlFor="N2">N2</label>

							<input
								className={styles.checkboxInput}
								type="checkbox"
								id="CO2-N2"
								name="carbonation"
								value="mieszanka"
								checked={deviceFields.carbonation.includes("mieszanka")}
								onChange={(e) => handleFieldChange('carbonation', e.target.value, e.target.checked)}
							/>
							<label className={styles.panelContentLabel} htmlFor="CO2-N2">mieszanka</label>
						</div>
                        <label className={styles.panelContentLabel}>Obsługiwane pojemniki:</label>
                        <input className={styles.panelContentInput} type="text" value={deviceFields.supported_containers} onChange={(e) => handleFieldChange('supported_containers', e.target.value)} />
                        <label className={styles.panelContentLabel}>Cena (zł):</label>
                        <input className={styles.panelContentInput} type="number" min="0" step="0.1" value={deviceFields.price} onChange={(e) => handleFieldChange('price', e.target.value)} />
					
						<div className={styles.panelButtons}>
							<button className={styles.cancelButton} onClick={closePanel}>Anuluj</button>
							<button className={styles.applyButton} onClick={() => { changeDevice(deviceFields); setIsPanelOpen(false); }}>Zastosuj zmiany</button>
						</div>
					</div>
                )}
            </div>
        </div>
    );
};

export default Device;
