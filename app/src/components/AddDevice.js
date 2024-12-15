import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddDevice.css';
import DashboardHeader from './modules/DashboardHeader.js';
import CommercialSidebar from './modules/CommercialSidebar.js';

const AddDevice = () => {

    const navigate = useNavigate();

    const AddEquipment = () => navigate('/device');

    const [name, setName] = useState("contract");
    const [deviceType, setDeviceType] = useState("");
    const [serialNumber, setSerialNumber] = useState("");
    const [capacity, setCapacity] = useState("");
    const [temperatureMin, setTemperatureMin] = useState("");
	const [temperatureMax, setTemperatureMax] = useState("");
    const [sourBeers, setSourBeers] = useState("");
    const [price, setPrice] = useState("");
    const [carbonation, setCarbonation] = useState("");
    const [supportedContainers, setSupportedContainers] = useState("");

    return (
		<div>
			<DashboardHeader />
			<div className='container'>
				<CommercialSidebar />
				<div className="add-equipment">
					<h1 className="add-device-tittle">Dodaj urządzenie</h1>
					<div className='device-type-dropbox'>
						<label htmlFor="device_type"><b>Wybierz typ urządzenia: </b></label>
						<select className='dropbox-input' value={deviceType} onChange={(e) => setDeviceType(e.target.value)}>
							<option value="brewer">Tank Warzelny</option>
							<option value="fermenter">Pojemnik fermentacyjny</option>
							<option value="lager">Kocioł do leżakowania</option>
							<option value="filler">Urządzenie do rozlewania</option>
						</select>
					</div>
					<form className='add-device-form' onSubmit={AddEquipment}>
						<div>
							<label htmlFor="name"><b>Nazwa urządzenia: </b></label>
							<input type="text" placeholder="Wpisz nazwę urządzenia" onChange={(e) => setName(e.target.value)} name="name" required />
						</div>
						<div>
							<label htmlFor="serial_number"><b>Numer seryjny: </b></label>
							<input type="text" placeholder="Wpisz numer seryjny" onChange={(e) => setSerialNumber(e.target.value)} name="serial_number" required />
						</div>
						<div>
							<label htmlFor="capacity"><b>Pojemność: </b></label>
							<input type="text" placeholder="Wpisz pojemność" onChange={(e) => setCapacity(e.target.value)} name="capacity" required />
						</div>
						{deviceType !== 'filler' && (
							<div>
								<div>
									<label htmlFor="temperature_min"><b>Temperatura minimalna: </b></label>
									<input type="text" placeholder="Wpisz temperaturę minimlalną" onChange={(e) => setTemperatureMin(e.target.value)} name="temperature_min" required />
								</div>
								<div>
									<label htmlFor="temperature_max"><b>Temperatura maksymalna: </b></label>
									<input type="text" placeholder="Wpisz temperaturę maksymalną" onChange={(e) => setTemperatureMax(e.target.value)} name="temperature_max" required />
								</div>
							</div>
							
						)}
						<div className='sour-beer-checkbox'>
							<label htmlFor="sour_beers"><b>Do produkcji kwaśnych piw: </b></label>
							<input type="checkbox" onChange={(e) => setSourBeers(e.target.checked)}></input>
						</div>
						<div>
							<label htmlFor="price"><b>Cena wynajmu: </b></label>
							<input type="text" placeholder="Wpisz cenę wynajmu" onChange={(e) => setPrice(e.target.value)} name="price" required />
						</div>
						{(deviceType === 'lager' || deviceType === 'filler') && (
							<div>
								<label htmlFor="carbonation"><b>Nagazowanie: </b></label>
								<select className="dropbox-input" value={carbonation} onChange={(e) => setCarbonation(e.target.value)}>
									<option value="CO2">CO2</option>
									<option value="NO2">NO2</option>
									<option value="mieszanka CO2/NO2">Mieszanka CO2/NO2</option>
									<option value="nie">Nie</option>
								</select>
							</div>
						)}
						{(deviceType === 'filler') && (
							<div>
								<label htmlFor="supported_containers"><b>Obsługiwane pojemniki: </b></label>
								<select className="dropbox-input" value={supportedContainers} onChange={(e) => setSupportedContainers(e.target.value)}>
									<option value="butelka">Butelki</option>
									<option value="puszka">Puszki</option>
									<option value="keg">Kegi</option>
								</select>
							</div>
						)}
						<button className="insert-device-button" onClick={AddEquipment} type="submit">Dodaj urządzenie</button>
					</form>
				</div>
			</div>
			
		</div>

    );
};

export default AddDevice;
