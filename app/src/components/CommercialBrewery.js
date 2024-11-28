import React from 'react';
import { useNavigate } from 'react-router-dom';

const CommercialBrewery = () => {
	const navigate = useNavigate();

	const Logout = () => navigate('/');
	const goToEquipment = () => navigate('/equipment');

	const commercial_brewery = [
		{ parameter: 'Nazwa browaru', value: 'Zrób u nas piwo'},
		{ parameter: 'Adres', value: 'ul. Piwna 19, Warka, 05-660'},
		{ parameter: 'Numer telefonu', value: '123456789'},
		{ parameter: 'Email', value: 'zrobunaspiwo@hotmail.com'},
		{ parameter: 'NIP', value: '1234567890'}
	];

	const handleLogout = () => {
		localStorage.removeItem('userType');
		Logout();
	};

	return (
    	<div className="commercial_brewery" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
		<button onClick={handleLogout} style={{ alignSelf: 'flex-end'}}>Wyloguj</button>
		<h1>Witaj w Browarze Komercyjnym!</h1>
			<p>Opis</p>
			<h2>Browar Komercyjny</h2>
			<table border="1" cellPadding="10">
				<thead>
				<tr>
					<th>Nazwa parametru</th>
					<th>Wartość parametru</th>
				</tr>
				</thead>
				<tbody>
				{commercial_brewery.map((commercial_brewery, index) => (
					<tr key={index}  onClick={() => goToEquipment()} style={{ cursor: 'pointer' }}>
					<td>{commercial_brewery.parameter}</td>
					<td>{commercial_brewery.value}</td>
					</tr>
				))}
				</tbody>
			</table>
	</div>
	);
};

export default CommercialBrewery;
