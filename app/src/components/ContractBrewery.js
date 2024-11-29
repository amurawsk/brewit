import React from 'react';
import { useNavigate } from 'react-router-dom';

const ContractBrewery = () => {
	const navigate = useNavigate();

	const Logout = () => navigate('/');
	const goToEquipment = () => navigate('/equipment');

	const contract_brewery = [
		{ parameter: 'Nazwa browaru', value: 'Robie piwo'},
		{ parameter: 'Adres', value: 'ul. Piwna 1, Warszawa, 00-265'}, //najdłuższa ulica na starym mieście
		{ parameter: 'Numer telefonu', value: '987654321'},
		{ parameter: 'Email', value: 'robiepiwo@hotmail.com'},
		{ parameter: 'Imię i nazwisko właściciela', value: 'Aleksandra Piastowska'}
	];

	const handleLogout = () => {
		localStorage.removeItem('userType');
		Logout();
	};

	return (
    	<div className="contract_brewery" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
		<button onClick={handleLogout} style={{ alignSelf: 'flex-end'}}>Wyloguj</button>
		<h1>Witaj w Browarze Kontraktowym!</h1>
			<p>Opis</p>
			<h2>Browar Kontraktowy</h2>
			<table border="1" cellPadding="10">
				<thead>
				<tr>
					<th>Nazwa parametru</th>
					<th>Wartość parametru</th>
				</tr>
				</thead>
				<tbody>
				{contract_brewery.map((contract_brewery, index) => (
					<tr key={index}>
					<td>{contract_brewery.parameter}</td>
					<td>{contract_brewery.value}</td>
					</tr>
				))}
				</tbody>
			</table>
	</div>
	);
};


export default ContractBrewery;
