import React from 'react';
import { useNavigate } from 'react-router-dom';

const CommercialBrewery = () => {
	const navigate = useNavigate();

	const goToEquipment = () => navigate('/equipment');

	return (
    	<div className="commercial_brewery">
			<h1>Welcome to the CommercialBrewery!</h1>
				<p>Description</p>
				<button onClick={goToEquipment}>Equipment</button>
		</div>
	);
};

export default CommercialBrewery;
