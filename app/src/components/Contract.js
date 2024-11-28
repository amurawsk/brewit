import React from 'react';
import { useNavigate } from 'react-router-dom';

const Contract = () => {
	const navigate = useNavigate();

	const Logout = () => navigate('/');
	const goToRecipe = () => navigate('/recipe');

	const contract = [
		{ parameter: 'Status', value: 'przeszłe'},
		{ parameter: 'Data stworzenia', value: '28.10.2024'},
		{ parameter: 'Data zakończenia', value: '28.11.2024'},
		{ parameter: 'Gatunek piwa', value: 'pszeniczne'},
		{ parameter: 'Opis', value: 'piwo, które od razu kojarzy się z tradycją, historią i Polską średniowieczną'},
		{ parameter: 'Objętość piwa', value: '100L'},
		{ parameter: 'Ocena', value: 'udane'}
	];

	const handleLogout = () => {
		localStorage.removeItem('userType');
		Logout();
	};

	return (
    	<div className="contract" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
		<button onClick={handleLogout} style={{ alignSelf: 'flex-end'}}>Wyloguj</button>
		<h1>Witaj w Zleceniu!</h1>
			<p>Opis</p>
			<h2>Zlecenie</h2>
			<table border="1" cellPadding="10">
				<thead>
				<tr>
					<th>Nazwa parametru</th>
					<th>Wartość parametru</th>
				</tr>
				</thead>
				<tbody>
				{contract.map((contract, index) => (
					<tr key={index} onClick={() => goToRecipe()} style={{ cursor: 'pointer' }}>
					<td>{contract.parameter}</td>
					<td>{contract.value}</td>
					</tr>
				))}
				</tbody>
			</table>
	</div>
	);
};

export default Contract;
