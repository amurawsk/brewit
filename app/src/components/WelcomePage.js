import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
	const navigate = useNavigate();

	const goToLogin = () => navigate('/login');
	const goToRegisterBrewery = () => navigate('/register_brewery');

	return (
    	<div className="welcome_page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
			<h1>Witaj w brewIT!</h1>
				<p>Opis</p>
				<div>
					<button onClick={goToLogin} >Przejdź do logowania</button>
					<button onClick={goToRegisterBrewery}>Przejdź do rejestracji</button>
				</div>
		</div>
	);
};

export default WelcomePage;
