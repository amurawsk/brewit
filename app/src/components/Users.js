import React from 'react';
import { useNavigate } from 'react-router-dom';

const Users = () => {
	const navigate = useNavigate();

	const Logout = () => navigate('/');
	const goToContractBrewery = () => navigate('/contract_brewery');
	const goToCommercialBrewery = () => navigate('/commercial_brewery');

	const breweries = [
		{ username: 'Piwowar', brewery_name: 'Zrób u nas piwo', type: 'Komercyjny'},
		{ username: 'Piwoszek', brewery_name:'Robie piwo', type: 'Kontraktowy'},
	  ];

	const handleLogout = () => {
		localStorage.removeItem('userType');
		Logout();
	};

	const handleRowClick = (brewery) => {
		if (brewery.type === 'Komercyjny') {
			goToCommercialBrewery();
		} else {
			goToContractBrewery();
		}
	};

	return (
    	<div className="users" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
			<button onClick={handleLogout} style={{ alignSelf: 'flex-end'}}>Wyloguj</button>
			<h1>Witaj w użytkownikach!</h1>
				<p>Opis</p>
				<h2>Użytkownicy</h2>
				<table border="1" cellPadding="10">
					<thead>
					<tr>
						<th>Nazwa użytkownika</th>
						<th>Nazwa browaru</th>
						<th>Rodzaj browaru</th>
					</tr>
					</thead>
					<tbody>
					{breweries.map((brewery, index) => (
						<tr key={index} onClick={() => handleRowClick(brewery)} style={{ cursor: 'pointer' }}>
						<td>{brewery.username}</td>
						<td>{brewery.brewery_name}</td>
						<td>{brewery.type}</td>
						</tr>
					))}
					</tbody>
				</table>
		</div>
	);
};

export default Users;
