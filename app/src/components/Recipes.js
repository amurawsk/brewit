import React from 'react';
import { useNavigate } from 'react-router-dom';

const Recipes = () => {
	const navigate = useNavigate();

	const goToRecipe = () => navigate('/recipe');

	return (
    	<div className="recipes">
			<h1>Welcome to the Recipes!</h1>
				<p>Description</p>
				<button onClick={goToRecipe}>Recipe</button>
		</div>
	);
};

export default Recipes;
