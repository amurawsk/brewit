import React from 'react';
import { useNavigate } from 'react-router-dom';

const Users = () => {
	const navigate = useNavigate();

	const goToContractBrewery = () => navigate('/contract_brewery');
	const goToCommercialBrewery = () => navigate('/commercial_brewery');

	return (
    	<div className="users">
			<h1>Welcome to the Users!</h1>
				<p>Description</p>
				<button onClick={goToContractBrewery}>ContractBrewery</button>
				<button onClick={goToCommercialBrewery}>CommercialBrewery</button>
		</div>
	);
};

export default Users;
