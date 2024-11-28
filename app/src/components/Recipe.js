import React from 'react';
import { useNavigate } from 'react-router-dom';

const Recipe = () => {
	const navigate = useNavigate();
	
	const Logout = () => navigate('/');

	const recipe = [ //tu powinny byc raczej etapy
		{ parameter: 'Nazwa piwa', value: 'Piastowski Dzban'},
		{ parameter: 'Czas produkcji', value: '1 miesiąc'},
		{ parameter: 'Produkowana objętość', value: '100L'}
	];

	const handleLogout = () => {
		localStorage.removeItem('userType');
		Logout();
	};

	return (
    	<div className="recipe" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
		<button onClick={handleLogout} style={{ alignSelf: 'flex-end'}}>Wyloguj</button>
		<h1>Witaj w Przepisie!</h1>
			<p>Opis</p>
			<h2>Przepis</h2>
			<table border="1" cellPadding="10">
				<thead>
				<tr>
					<th>Nazwa parametru</th>
					<th>Wartość parametru</th>
				</tr>
				</thead>
				<tbody>
				{recipe.map((recipe, index) => (
					<tr key={index}>
					<td>{recipe.parameter}</td>
					<td>{recipe.value}</td>
					</tr>
				))}
				</tbody>
			</table>
	</div>
);
};

export default Recipe;
