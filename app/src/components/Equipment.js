import React from 'react';
import { useNavigate } from 'react-router-dom';

//dodac dodawanie i przechodzenie do opisu urzadzenia

const Equipment = () => {
	const navigate = useNavigate();

	const Logout = () => navigate('/');
	const goToAddEquipment = () => navigate('/add_equipment');
	const goToPieceOfEquipment = () => navigate('/piece_of_equipment');

	const equipment = [
		{ name: 'Tank warzelny #1', type: 'Tank warzelny', serial_number: '123456', capacity: '100L', temperature_range: '80C-120C', sour_beers: 'tak', price: '300zł/h', carbonation: '-', supported_containers: '-'},
		{ name: 'Pojemnik fermentacyjny #1', type: 'Pojemnik fermentacyjny', serial_number: '234567', capacity: '100L', temperature_range: '10C-30C', sour_beers: 'tak', price: '300zł/h', carbonation: '-', supported_containers: '-'},
		{ name: 'Kocioł do leżakowania #1', type: 'Kocioł do leżakowania', serial_number: '345678', capacity: '100L', temperature_range: '-5C-20C', sour_beers: 'nie', price: '300zł/h', carbonation: 'mieszanka CO2/N2', supported_containers: '-'},
		{ name: 'Urządzenie do rozlewania #1', type: 'Urządzenie do rozlewania', serial_number: '456789', capacity: '100L', temperature_range: '-', sour_beers: 'tak', price: '300zł/h', carbonation: 'nie', supported_containers: 'butelki'}
	];

	const userType = localStorage.getItem('userType');

	const handleLogout = () => {
		localStorage.removeItem('userType');
		Logout();
	};

	return (
    	<div className="equipment" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
			<button onClick={handleLogout} style={{ alignSelf: 'flex-end'}}>Wyloguj</button>
			<h1>Witaj w urządzeniach!</h1>
				<p>Opis</p>
				{userType === 'commercial' && (
					<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px'}}>
						<h2>Urządzenia</h2>
						<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
						{userType === 'commercial' && (
							<button onClick={goToAddEquipment} style={{ alignSelf: 'flex-end'}}>Dodaj urządzenie</button>
						)}
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
									<th>Obsługiwane pojemniki</th>
									<th>Cena wynajmu</th>
								</tr>
								</thead>
								<tbody>
								{equipment.map((equipment, index) => (
									<tr key={index} onClick={() => goToPieceOfEquipment()} style={{ cursor: 'pointer' }}>
									<td>{equipment.serial_number}</td>
									<td>{equipment.name}</td>
									<td>{equipment.type}</td>
									<td>{equipment.sour_beers}</td>
									<td>{equipment.capacity}</td>
									<td>{equipment.temperature_range}</td>
									<td>{equipment.carbonation}</td>
									<td>{equipment.supported_containers}</td>
									<td>{equipment.price}</td>
									</tr>
								))}
								</tbody>
							</table>
						</div>
					</div>
				)}
				{(userType === 'contract' || userType === 'admin') && (
					<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
					<h2>Urządzenia</h2>
						<table border="1" cellPadding="10">
							<thead>
							<tr>
								<th>Nazwa urządzenia</th>
								<th>Typ urządzenia</th>
								<th>Do produkcji kwaśnych piw</th>
								<th>Pojemność</th>
								<th>Zakres temperatur</th>
								<th>Możliwość nagazowania</th>
								<th>Obsługiwane pojemniki</th>
								<th>Cena wynajmu</th>
							</tr>
							</thead>
							<tbody>
							{equipment.map((equipment, index) => (
								<tr key={index} onClick={() => goToPieceOfEquipment()} style={{ cursor: 'pointer' }}>
								<td>{equipment.name}</td>
								<td>{equipment.type}</td>
								<td>{equipment.sour_beers}</td>
								<td>{equipment.capacity}</td>
								<td>{equipment.temperature_range}</td>
								<td>{equipment.carbonation}</td>
								<td>{equipment.supported_containers}</td>
								<td>{equipment.price}</td>
								</tr>
							))}
							</tbody>
						</table>
				</div>
				)}
    </div>
	);
};

export default Equipment;
