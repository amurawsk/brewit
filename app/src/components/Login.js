import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();

	const Login = () => navigate('/dashboard');
	const goToRegister = () => navigate('/register');
	
	return (
    	<div className="login">
			<h1>Welcome to the Login!</h1>
				<p>Description</p>
				<button onClick={Login}>Login</button>
				<button onClick={goToRegister}>goToRegister</button>
		</div>
	);
};

export default Login;
