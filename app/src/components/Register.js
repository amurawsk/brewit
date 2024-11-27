import React from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const navigate = useNavigate();

	const Register = () => navigate('/login');
	const goToLogin = () => navigate('/login');

	return (
    	<div className="register">
			<h1>Welcome to the Register!</h1>
				<p>Description</p>
				<button onClick={Register}>Register</button>
				<button onClick={goToLogin}>goToLogin</button>
		</div>
	);
};

export default Register;
