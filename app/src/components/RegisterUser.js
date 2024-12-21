import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterUser = () => {
    const navigate = useNavigate();

    const Logout = () => navigate('/');
    const goBack = () => navigate(-1);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('userType');
        Logout();
    };

    return (
        <div
            className="register_user"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
            }}>
            <button onClick={handleLogout} style={{ alignSelf: 'flex-end' }}>
                Wyloguj
            </button>
            <h1>Witaj w rejestracji użytkowników!</h1>
            <p>Opis</p>
            <form
                onSubmit={goBack}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'right',
                    padding: '20px',
                }}>
                <div style={{ padding: '10px' }}>
                    <label for="username">
                        <b>Nazwa użytkownika: </b>
                    </label>
                    <input
                        type="text"
                        placeholder="Wpisz nazwę użytkownika"
                        onChange={(e) => setUsername(e.target.value)}
                        name="name"
                        required></input>
                </div>
                <div style={{ padding: '10px' }}>
                    <label for="password">
                        <b>Hasło: </b>
                    </label>
                    <input
                        type="password"
                        placeholder="Wpisz hasło"
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        required></input>
                </div>
                <button type="submit">Zarejestruj użytkownika</button>
            </form>
        </div>
    );
};

export default RegisterUser;
