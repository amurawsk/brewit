import React from 'react';
import { useNavigate } from 'react-router-dom';

const Contracts = () => {
    const navigate = useNavigate();
    const Logout = () => navigate('/');
    const goToContract = () => navigate('/contract');

    const contracts = [
        {
            created_at: '28.10.2024',
            status: 'przeszłe',
            beer_type: 'pszeniczne',
            beer_volume: '100L',
            description:
                'piwo, które od razu kojarzy się z tradycją, historią i Polską średniowieczną',
            rate: 'udane',
            ended_at: '28.11.2024',
        },
    ];

    const handleLogout = () => {
        localStorage.removeItem('userType');
        Logout();
    };

    return (
        <div
            className="contracts"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
            }}>
            <button onClick={handleLogout} style={{ alignSelf: 'flex-end' }}>
                Wyloguj
            </button>
            <h1>Witaj w Zleceniach!</h1>
            <p>Opis</p>
            <h2>Zlecenia</h2>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Data stworzenia</th>
                        <th>Data zakończenia</th>
                        <th>Gatunek piwa</th>
                        <th>Opis</th>
                        <th>Objętość piwa</th>
                        <th>Ocena</th>
                    </tr>
                </thead>
                <tbody>
                    {contracts.map((contracts, index) => (
                        <tr
                            key={index}
                            onClick={() => goToContract()}
                            style={{ cursor: 'pointer' }}>
                            <td>{contracts.status}</td>
                            <td>{contracts.created_at}</td>
                            <td>{contracts.ended_at}</td>
                            <td>{contracts.beer_type}</td>
                            <td>{contracts.description}</td>
                            <td>{contracts.beer_volume}</td>
                            <td>{contracts.rate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Contracts;
