import React from 'react';
import { useNavigate } from 'react-router-dom';

const Contract = () => {
	const navigate = useNavigate();

	const goToContractBrewery = () => navigate('/contract_brewery');

	return (
    	<div className="contract">
			<h1>Welcome to the Contract!</h1>
				<p>Description</p>
				<button onClick={goToContractBrewery}>ContractBrewery</button>
    	</div>
	);
};

export default Contract;
