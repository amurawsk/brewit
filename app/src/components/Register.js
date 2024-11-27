import React from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const navigate = useNavigate();

	const goToLogin = () => navigate('/login');

	return (
    	<div className="register" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
			<h1>Welcome to the Register!</h1>
				<p>Description</p>
				<form onSubmit={goToLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
						<div style={{padding: '10px'}}>
							<label for="name"><b>Company name: </b></label>
							<input type="text" placeholder="Enter Company name " name="name" required></input>
						</div>
						<div style={{padding: '10px'}}>
							<label for="password"><b>Password: </b></label>
							<input type="password" placeholder="Enter Password " name="password" required></input>
						</div>
						<div style={{padding: '10px'}}>
							<label for="address"><b>Address: </b></label>
							<input type="text" placeholder="Enter Address " name="address" required></input>
						</div>
						<div style={{padding: '10px'}}>
							<label for="phone"><b>Phone number: </b></label>
							<input type="text" placeholder="Enter Phone number " name="phone" required></input>
						</div>
						<div style={{padding: '10px'}}>
							<label for="email"><b>Email: </b></label>
							<input type="text" placeholder="Enter Email " name="email" required></input>
						</div>
						<div style={{padding: '10px'}}>
							<label for="nip"><b>NIP: </b></label>
							<input type="text" placeholder="Enter NIP " name="nip" required></input>
						</div>
						<div style={{padding: '10px'}}>
							<label for="owner"><b>Owner name: </b></label>
							<input type="text" placeholder="Enter Owner name " name="owner" required></input>
						</div>
						<button type="submit">Register</button>
					</form>
				<button onClick={goToLogin}>goToLogin</button>
		</div>
	);
};

export default Register;
