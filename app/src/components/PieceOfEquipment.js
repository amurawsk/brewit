import React from 'react';
import { useNavigate } from 'react-router-dom';

const PieceOfEquipment = () => {
    const navigate = useNavigate();

    const Logout = () => navigate('/');
    const goToAddTimeSlot = () => navigate('/add_timeslot');
    const goToTimeSlot = () => navigate('/time_slots');

    const recipe = [
        { parameter: 'Numer seryjny', value: '123456' },
        { parameter: 'Nazwa urządzenia', value: 'Tank warzelny #1' },
        { parameter: 'Typ urządzenia', value: 'Tank warzelny' },
        { parameter: 'Do produkcji kwaśnych piw', value: 'tak' },
        { parameter: 'Pojemność', value: '100L' },
        { parameter: 'Zakres temperatur', value: '80C-120C' },
        { parameter: 'Możliwość nagazowania', value: '-' },
        { parameter: 'Obsługiwane pojemniki', value: '-' },
        { parameter: 'Cena wynajmu', value: '300zł/h' },
    ];

    const userType = localStorage.getItem('userType');

    const handleLogout = () => {
        localStorage.removeItem('userType');
        Logout();
    };

    return (
        <div
            className="piece_of_equipment"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
            }}>
            <button onClick={handleLogout} style={{ alignSelf: 'flex-end' }}>
                Wyloguj
            </button>
            <h1>Witaj w Urządzeniu!</h1>
            <p>Opis</p>
            <h2>Urządzenie</h2>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '10px',
                }}>
                {userType === 'commercial' && (
                    <button
                        onClick={goToAddTimeSlot}
                        style={{ alignSelf: 'flex-end' }}>
                        Dodaj okno czasowe
                    </button>
                )}
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>Nazwa parametru</th>
                            <th>Wartość parametru</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipe.map((recipe, index) => (
                            <tr
                                key={index}
                                onClick={() => goToTimeSlot()}
                                style={{ cursor: 'pointer' }}>
                                <td>{recipe.parameter}</td>
                                <td>{recipe.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PieceOfEquipment;
