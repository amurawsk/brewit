import React from 'react';
import { useNavigate } from 'react-router-dom';

const TimeSlots = () => {
	const navigate = useNavigate();

	const Logout = () => navigate('/');

	const handleLogout = () => {
		localStorage.removeItem('userType');
		Logout();
	};
	
	return (
    	<div className="time_slots">
		<button onClick={handleLogout} style={{ alignSelf: 'flex-end'}}>Wyloguj</button>
			<h1>Witaj w oknach czasowych!</h1>
				<p>Na tym ekranie będzie kalendarz na którym będzie się zaznaczało wybrane dni a następnie dodawało do koszyka odpowiednim guzikiem.</p>
				<p>Dla browaru komercyjnego będą też dostępne guziki do zmiany statusu wybranych okien czasowych.</p>
		</div>
	);
};

export default TimeSlots;
