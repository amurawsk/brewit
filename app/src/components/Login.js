import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();

	const goToDashboard = () => navigate('/dashboard');
	const goToRegister = () => navigate('/register');
	
	return (
		<div className="login" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
				<h1>Welcome to the Login!</h1>
					<p>Description</p>
					<form onSubmit={goToDashboard} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
						<div style={{padding: '10px'}}>
							<label for="username"><b>Username: </b></label>
							<input type="text" placeholder="Enter Username " name="username" required></input>
						</div>
						<div style={{padding: '10px'}}>
							<label for="password"><b>Password: </b></label>
							<input type="password" placeholder="Enter Password " name="password" required></input>
						</div>
						<button type="submit">Login</button>
					</form>
					<button onClick={goToRegister}>goToRegister</button>
		</div>
	);
};

export default Login;
