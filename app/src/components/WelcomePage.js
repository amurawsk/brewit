import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
	const navigate = useNavigate();

	const goToLogin = () => navigate('/login');
	const goToRegister = () => navigate('/register');

	return (
    	<div className="welcome_page">
			<h1>Welcome to the WelcomePage!</h1>
				<p>Description</p>
				<button onClick={goToLogin}>goToLogin</button>
				<button onClick={goToRegister}>goToRegister</button>
		</div>
	);
};

export default WelcomePage;
