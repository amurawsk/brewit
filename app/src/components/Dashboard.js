import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
	const navigate = useNavigate();

	const Logout = () => navigate('/');
	const goToStatistics = () => navigate('/statistics');
	const goToUsers = () => navigate('/users');
	const goToRegisterUser = () => navigate('/register_user');
	const goToEquipment = () => navigate('/equipment');
	const goToInUse = () => navigate('/in_use');
	const goToCart = () => navigate('/cart');
	const goToContracts = () => navigate('/contracts');
	const goToRecipes = () => navigate('/recipes');
	const goToCommercialBreweries = () => navigate('/commercial_breweries');

	const userType = localStorage.getItem('userType');

	const handleLogout = () => {
		localStorage.removeItem('userType');
		Logout();
	};

	return (
    	<div className="dashboard" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
			<button onClick={handleLogout} style={{ alignSelf: 'flex-end'}}>Wyloguj</button>
			<h1>Witaj w ekranie głównym!</h1>
				<p>Opis</p>
				{userType === 'admin' && (
					<div style={{ padding: '10px' }}>
						<button onClick={goToUsers}>Użytkownicy</button>
						<button onClick={goToStatistics}>Statystyki</button>
					</div>
				)}
				{userType === 'commercial_brewery' && (
					<div style={{ padding: '10px' }}>
						<button onClick={goToRegisterUser}>Zarejestruj użytkownika</button>
						<button onClick={goToEquipment}>Urządzenia</button>
						<button onClick={goToContracts}>Zlecenia</button>
						<button onClick={goToInUse}>W użyciu</button>
						<button onClick={goToStatistics}>Statystyki</button>
					</div>
				)}
				{userType === 'contract_brewery' && (
					<div style={{ padding: '10px' }}>
						<button onClick={goToRegisterUser}>Zarejestruj użytkownika</button>
						<button onClick={goToCommercialBreweries}>Browary Komercyjne</button>
						<button onClick={goToCart}>Koszyk</button>
						<button onClick={goToContracts}>Zlecenia</button>
						<button onClick={goToRecipes}>Przepisy</button>
						<button onClick={goToStatistics}>Statystyki</button>
					</div>
				)}
		</div>
	);
};

export default Dashboard;
