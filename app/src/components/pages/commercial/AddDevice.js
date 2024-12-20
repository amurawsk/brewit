import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddDevice.module.css'
import DashboardHeader from '../../modules/DashboardHeader.js';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.js';
import AddDeviceForm from '../../modules/commercial/AddDeviceForm.jsx'
import api from '../../../api.js';

const AddDevice = () => {

    const navigate = useNavigate();

    const devices = () => navigate('/device')

    const [name, setName] = useState("");
    const [device_type, setDeviceType] = useState("");
    const [serial_number, setSerialNumber] = useState("");
    const [capacity, setCapacity] = useState();
    const [temperature_min, setTemperatureMin] = useState(0);
	const [temperature_max, setTemperatureMax] = useState(0);
    const [sour_beers, setSourBeers] = useState(false);
    const [carbonation, setCarbonation] = useState("");
    const [supported_containers, setSupportedContainers] = useState("");

	const postData = async () => {
		try {
			const response = await api.post(`devices/add/`, {
				"name": name,
				"device_type": device_type,
				"serial_number": serial_number,
				"capacity": parseFloat(capacity),
				"temperature_min": parseFloat(temperature_min),
				"temperature_max": parseFloat(temperature_max),
				"sour_beers": sour_beers, 
				"carbonation": carbonation,
				"supported_containers": supported_containers,
			});
			// devices();
			if (response.status === 201) {
			} else {
				console.log(response);
				// TODO: Handle error
			}
		} catch (error) {
			console.log('Error fetching devices:', error);
		}
	};

    return (
		<div>
			<DashboardHeader />
			<div className={styles.container}>
				<CommercialSidebar />
				<div className={styles.addEquipment}>
					<h1 className={styles.addDeviceTittle}>Dodaj urządzenie</h1>
					<AddDeviceForm 
						device_type = {device_type}
						setDeviceType = {setDeviceType}
						setName = {setName}
						setSerialNumber = {setSerialNumber}
						setCapacity = {setCapacity}
						setTemperatureMin = {setTemperatureMin}
						setTemperatureMax = {setTemperatureMax}
						setSourBeers = {setSourBeers}
						setCarbonation = {setCarbonation}
						setSupportedContainers = {setSupportedContainers}
						postData = {postData}
					/>
				</div>
			</div>
		</div>

    );
};

export default AddDevice;
