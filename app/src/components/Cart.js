import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
	const navigate = useNavigate();

	const Logout = () => navigate('/');
	const goToTimeSlots = () => navigate('/time_slots');
	const AddContract = () => navigate('/contracts');

	const [beerType, setBeerType] = useState("contract");
	const [beerVolume, setBeerVolume] = useState("");
	const [description, setDescription] = useState("");

	const timeslots = [
		{ type: 'Tank warzelny', start: '29.11.2024, 11:00', end: '29.11.2024, 16:00'},
		{ type: 'Pojemnik fermentacyjny', start: '29.11.2024', end: '10.12.2024'},
		{ type: 'Kocioł do leżakowania', start: '10.12.2024', end: '10.01.2025'},
		{ type: 'Urządzenie do rozlewania', start: '10.01.2025, 12:00', end: '10.01.2025, 14:00'}
	];

	const handleLogout = () => {
		localStorage.removeItem('userType');
		Logout();
	};

	return (
    	<div className="cart" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
			<button onClick={handleLogout} style={{ alignSelf: 'flex-end'}}>Wyloguj</button>
			<h1>Witaj w Koszyku!</h1>
				<p>Opis</p>
					<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
					<h2>Koszyk</h2>
						<table border="1" cellPadding="10">
							<thead>
							<tr>
								<th>Typ urządzenia</th>
								<th>Początek okna czasowego</th>
								<th>Koniec okna czasowego</th>
							</tr>
							</thead>
							<tbody>
							{timeslots.map((timeslots, index) => (
								<tr key={index} onClick={() => goToTimeSlots()} style={{ cursor: 'pointer' }}>
								<td>{timeslots.type}</td>
								<td>{timeslots.start}</td>
								<td>{timeslots.end}</td>
								</tr>
							))}
							</tbody>
						</table>
				</div>
				<form onSubmit={AddContract} style={{ display: 'flex', flexDirection: 'column', textAlign: 'right', padding: '20px' }}>
						<div style={{padding: '10px'}}>
							<label for="beer_type"><b>Typ piwa: </b></label>
							<input type="text" placeholder="Wpisz typ piwa" onChange={(e) => setBeerType(e.target.value)} name="beer_type" required></input>
						</div>
						<div style={{padding: '10px'}}>
							<label for="volume"><b>Objętość produkowanego piwa: </b></label>
							<input type="text" placeholder="Wpisz objętość piwa" onChange={(e) => setBeerVolume(e.target.value)} name="volume" required></input>
						</div>
						<div style={{padding: '10px'}}>
							<label for="description"><b>Opis: </b></label>
							<input type="text" placeholder="Wpisz opis" onChange={(e) => setDescription(e.target.value)} name="description" required></input>
						</div>
						<button type="submit">Złóż zlecenie</button>
					</form>
    </div>
	);
};

export default Cart;
