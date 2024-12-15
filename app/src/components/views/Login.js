
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../modules/NavigationBar.js';

const Login = () => {
	const navigate = useNavigate();

	const goToDashboard = () => navigate('/dashboard');

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	
	const handleLogin = (event) => {
		event.preventDefault();
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
        <div>
            <NavigationBar />
			<div className="page-wrapper">
				<div className="myform-place">
					<h4>Zaloguj się</h4>
					<hr className="divider" />
					<div className="myform-form">
						<form className = "myform" onSubmit={handleLogin}>
							<div>
								<label for="username"><b>Nazwa użytkownika: </b></label>
								<input type="text" placeholder="Wpisz nazwę użytkownika" onChange={(ev) => setUsername(ev.target.value)} name="username" required></input>
							</div>
							<div>
								<label for="password"><b>Hasło: </b></label>
								<input type="password" placeholder="Wpisz hasło" onChange={(ev) => setPassword(ev.target.value)} name="password" required></input>
							</div>
							<button type="submit" className="bigdark-button">Zaloguj się</button>
						</form>
						<p className="link">
							<a href="/register"> Nie masz konta? Zarejestruj się... </a>
						</p>
					</div>
				</div>
			</div>
		</div>
    );
};

export default Login;
