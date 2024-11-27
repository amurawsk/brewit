import React from 'react';
import { useNavigate } from 'react-router-dom';

const Contracts = () => {
	const navigate = useNavigate();

	const goToContract = () => navigate('/contract');

	return (
    	<div className="contracts">
			<h1>Welcome to the Contracts!</h1>
				<p>Description</p>
				<button onClick={goToContract}>Contract</button>
    </div>
	);
};

export default Contracts;
