import React from 'react';
import { useNavigate } from 'react-router-dom';

const CommercialBreweries = () => {
	const navigate = useNavigate();

	const Logout = () => navigate('/');
	const goToCommercialBrewery = () => navigate('/commercial_brewery');

	const breweries = [
		{ brewery_name: 'Zrób u nas piwo', address: 'ul. Piwna 19, Warka, 05-660', contact_phone_number: '123456789', contact_email: 'zrobunaspiwo@hotmail.com', nip: '1234567890' }
	  ];

	const handleLogout = () => {
		localStorage.removeItem('userType');
		Logout();
	};

	return (
    	<div className="commercial_breweries" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
		<button onClick={handleLogout} style={{ alignSelf: 'flex-end'}}>Wyloguj</button>
		<h1>Witaj w Browarach kontaktowych!</h1>
			<p>Opis</p>
			<h2>Browary kontraktowe</h2>
			<table border="1" cellPadding="10">
				<thead>
				<tr>
					<th>Nazwa browaru</th>
					<th>Adres</th>
					<th>Numer telefonu</th>
					<th>Email</th>
					<th>NIP</th>
				</tr>
				</thead>
				<tbody>
				{breweries.map((brewery, index) => (
					<tr key={index} onClick={() => goToCommercialBrewery()} style={{ cursor: 'pointer' }}>
					<td>{brewery.brewery_name}</td>
					<td>{brewery.address}</td>
					<td>{brewery.contact_phone_number}</td>
					<td>{brewery.contact_email}</td>
					<td>{brewery.nip}</td>
					</tr>
				))}
				</tbody>
			</table>
	</div>
);
};

export default CommercialBreweries;
