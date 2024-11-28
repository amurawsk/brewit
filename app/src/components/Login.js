import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();

	const goToDashboard = () => navigate('/dashboard');
	const goToRegisterBrewery = () => navigate('/register_brewery');

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	
	const handleLogin = () => {
		let userType = '';
		if (username === 'spółka') {
			userType = 'admin';
		} else if (username === 'komercyjny') {
			userType = 'commercial';
		} else {
			userType = 'contract';
		}
		localStorage.setItem('userType', userType);
		goToDashboard();
	}
	
	return (
		<div className="login" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
				<h1>Witaj w ekranie logowania!</h1>
					<p>Opis</p>
					<form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', textAlign: 'right', padding: '20px' }}>
						<div style={{padding: '10px'}}>
							<label for="username"><b>Nazwa użytkownika: </b></label>
							<input type="text" placeholder="Wpisz nazwę użytkownika" onChange={(ev) => setUsername(ev.target.value)} name="username" required></input>
						</div>
						<div style={{padding: '10px'}}>
							<label for="password"><b>Hasło: </b></label>
							<input type="password" placeholder="Wpisz hasło" onChange={(ev) => setPassword(ev.target.value)} name="password" required></input>
						</div>
						<button type="submit">Zaloguj się</button>
					</form>
					<button onClick={goToRegisterBrewery}>Przejdź do rejestracji</button>
		</div>
	);
};

export default Login;
