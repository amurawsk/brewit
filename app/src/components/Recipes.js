import React from 'react';
import { useNavigate } from 'react-router-dom';

const Recipes = () => {
	const navigate = useNavigate();
	const Logout = () => navigate('/');
	const goToRecipe = () => navigate('/recipe');

	const recipes = [
		{ name: 'Piastowski Dzban', full_time: '1 miesiąc', full_volume: '100L'} //a ocena :oo trzeba bedzie w zleceniach suzkac :((
	];

	const handleLogout = () => {
		localStorage.removeItem('userType');
		Logout();
	};

	return (
    	<div className="recipes" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
		<button onClick={handleLogout} style={{ alignSelf: 'flex-end'}}>Wyloguj</button>
		<h1>Witaj w Przepisach!</h1>
			<p>Opis</p>
			<h2>Przepisy</h2>
			<table border="1" cellPadding="10">
				<thead>
				<tr>
					<th>Nazwa piwa</th>
					<th>Czas produkcji</th>
					<th>Produkowana objętość</th>
				</tr>
				</thead>
				<tbody>
				{recipes.map((recipes, index) => (
					<tr key={index} onClick={() => goToRecipe()} style={{ cursor: 'pointer' }}>
					<td>{recipes.name}</td>
					<td>{recipes.full_time}</td>
					<td>{recipes.full_volume}</td>
					</tr>
				))}
				</tbody>
			</table>
	</div>
);
};

export default Recipes;
