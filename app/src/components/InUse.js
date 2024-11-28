import React from 'react';
import { useNavigate } from 'react-router-dom';

const InUse = () => {
	const navigate = useNavigate();
	const Logout = () => navigate('/');
	const goToTimeSlots = () => navigate('/time_slots');

	const in_use = [
		{ name: 'Tank warzelny #1', type: 'Tank warzelny', serial_number: '123456', capacity: '100L', temperature_range: '80C-120C', sour_beers: 'tak', price: '300zł/h', carbonation: '-', supported_containers: '-'},
		{ name: 'Pojemnik fermentacyjny #1', type: 'Pojemnik fermentacyjny', serial_number: '234567', capacity: '100L', temperature_range: '10C-30C', sour_beers: 'tak', price: '300zł/h', carbonation: '-', supported_containers: '-'},
		{ name: 'Kocioł do leżakowania #1', type: 'Kocioł do leżakowania', serial_number: '345678', capacity: '100L', temperature_range: '-5C-20C', sour_beers: 'nie', price: '300zł/h', carbonation: 'mieszanka CO2/N2', supported_containers: '-'},
		{ name: 'Urządzenie do rozlewania #1', type: 'Urządzenie do rozlewania', serial_number: '456789', capacity: '100L', temperature_range: '-', sour_beers: 'tak', price: '300zł/h', carbonation: 'nie', supported_containers: 'butelki'}
	];

	const handleLogout = () => {
		localStorage.removeItem('userType');
		Logout();
	};

	return (
    	<div className="in_use" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
			<button onClick={handleLogout} style={{ alignSelf: 'flex-end'}}>Wyloguj</button>
			<h1>Witaj w urządzeniach!</h1>
				<p>Opis</p>
				<h2>Urządzenia w użytku</h2>
				<table border="1" cellPadding="10">
					<thead>
					<tr>
						<th>Numer seryjny</th>
						<th>Nazwa urządzenia</th>
						<th>Typ urządzenia</th>
						<th>Do produkcji kwaśnych piw</th>
						<th>Pojemność</th>
						<th>Zakres temperatur</th>
						<th>Możliwość nagazowania</th>
						<th>Wspierane pojemniki</th>
						<th>Cena wynajmu</th>
					</tr>
					</thead>
					<tbody>
					{in_use.map((in_use, index) => (
						<tr key={index} onClick={() => goToTimeSlots()} style={{ cursor: 'pointer' }}>
						<td>{in_use.serial_number}</td>
						<td>{in_use.name}</td>
						<td>{in_use.type}</td>
						<td>{in_use.sour_beers}</td>
						<td>{in_use.capacity}</td>
						<td>{in_use.temperature_range}</td>
						<td>{in_use.carbonation}</td>
						<td>{in_use.supported_containers}</td>
						<td>{in_use.price}</td>
						</tr>
					))}
					</tbody>
				</table>
    	</div>
	);
};

export default InUse;
