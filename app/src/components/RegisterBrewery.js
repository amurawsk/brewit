import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterBrewery = () => {

	const navigate = useNavigate();

	const goToLogin = () => navigate('/login');

	const [breweryType, setBreweryType] = useState("contract");
	const [breweryName, setBreweryName] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [NIP, setNIP] = useState("");
	const [owner, setOwner] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
    	<div className="register_brewery" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
			<h1>Witaj w rejestracji browarów!</h1>
				<p>Opis</p>
				<div style={{padding: '10px'}}>
					<label for="brewery_type"><b>Wybierz typ browaru: </b></label>
					<select value={breweryType} onChange={(e) => setBreweryType(e.target.value)}>
					<option value="contract">Browar Kontraktowy</option>
					<option value="commercial">Browar Komercyjny</option>
					</select>
				</div>
				<form onSubmit={goToLogin} style={{ display: 'flex', flexDirection: 'column', textAlign: 'right', padding: '20px' }}>
						<div style={{padding: '10px'}}>
							<label for="brewery_name"><b>Nazwa browaru: </b></label>
							<input type="text" placeholder="Wpisz nazwę browaru" onChange={(e) => setBreweryName(e.target.value)} name="name" required></input>
						</div>
						<div style={{padding: '10px'}}>
							<label for="address"><b>Adres: </b></label>
							<input type="text" placeholder="Wpisz adres" onChange={(e) => setAddress(e.target.value)} name="address" required></input>
						</div>
						<div style={{padding: '10px'}}>
							<label for="phone"><b>Numer telefonu: </b></label>
							<input type="text" placeholder="Wpisz numer telefonu" onChange={(e) => setPhone(e.target.value)} name="phone" required></input>
						</div>
						<div style={{padding: '10px'}}>
							<label for="email"><b>Email: </b></label>
							<input type="text" placeholder="Wpisz email" onChange={(e) => setEmail(e.target.value)} name="email" required></input>
						</div>
						{breweryType === 'contract' && (
						<div style={{padding: '10px'}}>
							<label for="owner"><b>Imię i nazwisko właściciela: </b></label>
							<input type="text" placeholder="Wpisz imię i nazwisko właściciela" onChange={(e) => setOwner(e.target.value)} name="owner" required></input>
						</div>
						)}
						{breweryType === 'commercial' && (
							<div style={{padding: '10px'}}>
								<label for="nip"><b>NIP: </b></label>
								<input type="text" placeholder="Wpisz NIP " onChange={(e) => setNIP(e.target.value)} name="nip" required></input>
							</div>
						)}
						<div style={{padding: '10px'}}>
							<label for="username"><b>Nazwa użytkownika: </b></label>
							<input type="text" placeholder="Wpisz nazwę użytkownika" onChange={(e) => setUsername(e.target.value)} name="name" required></input>
						</div>
						<div style={{padding: '10px'}}>
							<label for="password"><b>Hasło: </b></label>
							<input type="password" placeholder="Wpisz hasło" onChange={(e) => setPassword(e.target.value)} name="password" required></input>
						</div>
						<button type="submit">Zarejestruj się</button>
					</form>
				<button onClick={goToLogin}>Przejdź do logowania</button>
		</div>
	);
};

export default RegisterBrewery;
