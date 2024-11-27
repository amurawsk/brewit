import React from 'react';
import { useNavigate } from 'react-router-dom';

const CommercialBreweries = () => {
	const navigate = useNavigate();

	const goToCommercialBrewery = () => navigate('/commercial_brewery');

	return (
    	<div className="commercial_breweries">
			<h1>Welcome to the CommercialBreweries!</h1>
				<p>Description</p>
				<button onClick={goToCommercialBrewery}>CommercialBrewery</button>
		</div>
	);
};

export default CommercialBreweries;
