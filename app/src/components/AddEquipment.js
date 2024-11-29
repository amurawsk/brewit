import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEquipment = () => {

	const navigate = useNavigate();

	const Logout = () => navigate('/');
	const AddEquipment = () => navigate('/equipment');

	const [name, setName] = useState("contract");
	const [deviceType, setDeviceType] = useState("");
	const [serialNumber, setSerialNumber] = useState("");
	const [capacity, setCapacity] = useState("");
	const [temperatureRange, setTemperatureRange] = useState("");
	const [sourBeers, setSourBeers] = useState("");
	const [price, setPrice] = useState("");
	const [carbonation, setCarbonation] = useState("");
	const [supportedContainers, setSupportedContainers] = useState("");

	const handleLogout = () => {
		localStorage.removeItem('userType');
		Logout();
	};

	return (
    	<div className="add_equipment" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
			<button onClick={handleLogout} style={{ alignSelf: 'flex-end'}}>Wyloguj</button>
			<h1>Witaj w dodawaniu urządzeń!</h1>
				<p>Opis</p>
				<div style={{padding: '10px'}}>
					<label for="device_type"><b>Wybierz typ urządzenia: </b></label>
					<select value={deviceType} onChange={(e) => setDeviceType(e.target.value)}>
					<option value="brewer">Tank Warzelny</option>
					<option value="fermenter">Pojemnik fermentacyjny</option>
					<option value="lager">Kocioł do leżakowania</option>
					<option value="filler">Urządzenie do rozlewania</option>
					</select>
				</div>
				<form onSubmit={AddEquipment} style={{ display: 'flex', flexDirection: 'column', textAlign: 'right', padding: '20px' }}>
						<div style={{padding: '10px'}}>
							<label for="name"><b>Nazwa urządzenia: </b></label>
							<input type="text" placeholder="Wpisz nazwę urządzenia" onChange={(e) => setName(e.target.value)} name="name" required></input>
						</div>
						<div style={{padding: '10px'}}>
							<label for="serial_number"><b>Numer seryjny: </b></label>
							<input type="text" placeholder="Wpisz numer seryjny" onChange={(e) => setSerialNumber(e.target.value)} name="serial_number" required></input>
						</div>
						<div style={{padding: '10px'}}>
							<label for="capacity"><b>Numer objętość: </b></label>
							<input type="text" placeholder="Wpisz objętość" onChange={(e) => setCapacity(e.target.value)} name="capacity" required></input>
						</div>
						{deviceType !== 'filler' && (
						<div style={{padding: '10px'}}>
							<label for="temperature_range"><b>Zakres temperatur: </b></label>
							<input type="text" placeholder="Wpisz zakres temperatur" onChange={(e) => setTemperatureRange(e.target.value)} name="temperature_range" required></input>
						</div>
						)}
						<div style={{padding: '10px'}}>
							<label for="sour_beers"><b>Do produkcji kwaśnych piw: </b></label>
							<select value={sourBeers} onChange={(e) => setSourBeers(e.target.value)}>
							<option value="tak">Tak</option>
							<option value="nie">Nie</option>
							</select>
						</div>
							<div style={{padding: '10px'}}>
								<label for="price"><b>Cena wynajmu: </b></label>
								<input type="text" placeholder="Wpisz cenę wyajmu" onChange={(e) => setPrice(e.target.value)} name="price" required></input>
							</div>
						{(deviceType === 'lager' || deviceType === 'filler') && (
						<div style={{padding: '10px'}}>
						<label for="carbonation"><b>Nagazowanie: </b></label>
						<select value={carbonation} onChange={(e) => setCarbonation(e.target.value)}>
						<option value="CO2">CO2</option>
						<option value="NO2">NO2</option>
						<option value="mieszanka CO2/NO2">Mieszanka CO2/NO2</option>
						<option value="nie">Nie</option>
						</select>
						</div>
						)}
						{(deviceType === 'filler') && (
						<div style={{padding: '10px'}}>
						<label for="supported_containers"><b>Obsługiwane pojemniki: </b></label>
						<select value={supportedContainers} onChange={(e) => setSupportedContainers(e.target.value)}>
						<option value="butelka">Butelki</option>
						<option value="puszka">Puszki</option>
						<option value="keg">Kegi</option>
						</select>
						</div>
						)}
						<button type="submit">Dodaj urządzenie</button>
					</form>
		</div>
	);
};

export default AddEquipment;
