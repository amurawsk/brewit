import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';

const TimeSlots = () => {
	const navigate = useNavigate();

	const Logout = () => navigate('/');
	const goToEquipment = () => navigate('/equipment');

	const [selectedDates, setSelectedDates] = useState([]);
 	const [takenDates, setTakenDates] = useState([]);
	
	const userType = localStorage.getItem('userType');

	const handleLogout = () => {
		localStorage.removeItem('userType');
		Logout();
	};
	
	const formatDate = (date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	};
	
	const handleDateClick = (date) => {
		const dateStr = formatDate(date);
		if (!takenDates.includes(dateStr)) {
			if (!selectedDates.includes(dateStr)) {
				setSelectedDates([...selectedDates, dateStr]);
			} else {
				setSelectedDates(selectedDates.filter((d) => d !== dateStr));
			}
		}
	};

	const tileClassName = ({ date }) => {
		const dateStr = formatDate(date);
		if (takenDates.includes(dateStr)) return 'taken';
		if (selectedDates.includes(dateStr)) return 'selected';	
		return '';
	};
	
	return (
    	<div className="time_slots" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
			<button onClick={handleLogout} style={{ alignSelf: 'flex-end'}}>Wyloguj</button>
			<h1>Witaj w oknach czasowych!</h1>
			<p>Opis</p>
			<div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
				<h2>Wybierz okna czasowe</h2>
				<Calendar onClickDay={handleDateClick} tileClassName={tileClassName}/>
				{userType === 'contract' && (
					<button onClick={() => goToEquipment}>Dodaj do koszyka</button>
				)}
				{userType === 'commercial' && (
					<button onClick={() => setTakenDates}>Zmień status</button>
				)}
				<style>
					{`
					.taken {
						background-color: red;
						color: white;
					}
					.selected {
						background-color: green;
						color: white;
					}
					`}
				</style>
			</div>
		</div>
	);
};

export default TimeSlots;
