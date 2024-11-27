import React from 'react';
import { useNavigate } from 'react-router-dom';

const Equipment = () => {
	const navigate = useNavigate();

	const goToTimeSlots = () => navigate('/time_slots');

	return (
    	<div className="equipment">
			<h1>Welcome to the Equipment!</h1>
				<p>Description</p>
				<button onClick={goToTimeSlots}>TimeSlots</button>
    </div>
	);
};

export default Equipment;
