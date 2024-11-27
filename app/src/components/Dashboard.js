import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
	const navigate = useNavigate();

	const goToStatistics = () => navigate('/statistics');
	const goToUsers = () => navigate('/users');
	const goToCart = () => navigate('/cart');
	const goToContracts = () => navigate('/contracts');
	const goToRecipes = () => navigate('/recipes');
	const goToCommercialBreweries = () => navigate('/commercial_breweries');
	const goToInUse = () => navigate('/in_use');
	const Logout = () => navigate('/');

	return (
    	<div className="dashboard">
			<h1>Welcome to the Dashboard!</h1>
				<p>Description</p>
				<button onClick={goToStatistics}>Statistics</button>
				<button onClick={goToUsers}>Users</button>
				<button onClick={goToCart}>Cart</button>
				<button onClick={goToContracts}>Contracts</button>
				<button onClick={goToRecipes}>Recipes</button>
				<button onClick={goToCommercialBreweries}>CommercialBreweries</button>
				<button onClick={goToInUse}>InUse</button>
				<button onClick={Logout}>Logout</button>
		</div>
	);
};

export default Dashboard;
