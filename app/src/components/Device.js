import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './modules/DashboardHeader.js';
import CommercialSidebar from './modules/CommercialSidebar.js';
import './Device.css';

const Device = () => {
    const navigate = useNavigate();

	const addDevice = () => navigate('/add-device')

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
                <div className="content">
					<div className="tittle-button">
						<h1 className="tittle">Moje urządzenia</h1>
						<button className="add-device-button" onClick={addDevice}>Dodaj nowe urządzenie</button>
					</div>
                    
                    <div className="all-devices">
                        {equipment.map((device, index) => (
                            <div className="device" key={index} onClick={() => openPanel(device)}>
                                <div className="device-text">
                                    <span className="device-text-title">{device.name}</span>
                                    <span className="device-description">typ urządzenia:
                                        <span className="device-description-value"> {device.type}</span>
                                    </span>
                                    <span className="device-description">nr seryjny:
                                        <span className="device-description-value"> {device.serial_number}</span>
                                    </span>
                                </div>
                                <div className="device-price">
                                    <span className="device-description">Cena:
                                        <span className="device-description-value"> {device.price} zł</span>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={`side-panel ${isPanelOpen ? 'open' : ''}`}>
                <button className="close-panel" onClick={closePanel}>×</button>
                {selectedDevice && (
                    <div className="panel-content">
                        <div className="details-header">
							<span className="details-header-large">Szczegóły urządzenia</span>	
							<span className="details-header-small">W tym panelu możesz również edytować swoje urządzenie</span>
						</div>
                        <label>Nazwa:</label>
                        <input type="text" value={deviceFields.name} onChange={(e) => handleFieldChange('name', e.target.value)} />
                        <label>Typ:</label>
                        <input type="text" value={deviceFields.type} readOnly />
                        <label>Pojemność (L):</label>
                        <input type="number" min="0" step="0.1" value={deviceFields.capacity} onChange={(e) => handleFieldChange('capacity', e.target.value)} />
                        <label>Zakres temperatur:</label>
                        <input type="text" value={deviceFields.temperature_range} onChange={(e) => handleFieldChange('temperature_range', e.target.value)} />
                        <label>Kwaśne piwa:</label>
                        <input type="checkbox" value="Zaznacz, jeśli obsługuje" checked={deviceFields.sour_beers} onChange={(e) => handleFieldChange('sour_beers', e.target.checked)} />
                        <label>Karbonizacja:</label>
						<div>
							<input
								type="checkbox"
								id="CO2"
								name="carbonation"
								value="CO2"
								checked={deviceFields.carbonation.includes("CO2")}
								onChange={(e) => handleFieldChange('carbonation', e.target.value, e.target.checked)}
							/>
							<label htmlFor="CO2">CO2</label>

							<input
								type="checkbox"
								id="N2"
								name="carbonation"
								value="N2"
								checked={deviceFields.carbonation.includes("N2")}
								onChange={(e) => handleFieldChange('carbonation', e.target.value, e.target.checked)}
							/>
							<label htmlFor="N2">N2</label>

							<input
								type="checkbox"
								id="CO2-N2"
								name="carbonation"
								value="mieszanka"
								checked={deviceFields.carbonation.includes("mieszanka")}
								onChange={(e) => handleFieldChange('carbonation', e.target.value, e.target.checked)}
							/>
							<label htmlFor="CO2-N2">mieszanka</label>
						</div>
                        <label>Obsługiwane pojemniki:</label>
                        <input type="text" value={deviceFields.supported_containers} onChange={(e) => handleFieldChange('supported_containers', e.target.value)} />
                        <label>Cena (zł):</label>
                        <input type="number" min="0" step="0.1" value={deviceFields.price} onChange={(e) => handleFieldChange('price', e.target.value)} />
					
						<div className="panel-buttons">
							<button className="cancel-button" onClick={closePanel}>Anuluj</button>
							<button className="apply-button" onClick={() => { changeDevice(deviceFields); setIsPanelOpen(false); }}>Zastosuj zmiany</button>
						</div>
					</div>
                )}
            </div>
        </div>
    );
};

export default Device;
