import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../modules/NavigationBar.js';
import api from '../../api.js';

const Login = () => {
    const navigate = useNavigate();

    const goToCommercialDashboard = () => navigate('/commercial/dashboard');
    const goToContractBrewery = () => navigate('/contract/dashboard')

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await api.post('login/', { username, password });

            if (response.status === 200) {
                const { refresh, access, user_type } = response.data;

                localStorage.setItem('ACCESS_TOKEN', access);
                localStorage.setItem('REFRESH_TOKEN', refresh);
                localStorage.setItem('userType', user_type);
                
                if (user_type === 'commercial_brewery') {
                    goToCommercialDashboard();
                }
                else if (user_type === 'contract_brewery') {
                    goToContractBrewery();
                }
                else {
                    console.log('ERROR')
                    // TODO handle error
                }                
            } else {
                console.log(response);
                // TODO: Handle login error
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <NavigationBar />
            <div className="page-wrapper">
                <div className="myform-place">
                    <h4>Zaloguj się</h4>
                    <hr className="divider" />
                    <div className="myform-form">
                        <form className="myform" onSubmit={handleLogin}>
                            <div>
                                <label for="username">
                                    <b>Nazwa użytkownika: </b>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Wpisz nazwę użytkownika"
                                    onChange={(ev) =>
                                        setUsername(ev.target.value)
                                    }
                                    name="username"
                                    required></input>
                            </div>
                            <div>
                                <label for="password">
                                    <b>Hasło: </b>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Wpisz hasło"
                                    onChange={(ev) =>
                                        setPassword(ev.target.value)
                                    }
                                    name="password"
                                    required></input>
                            </div>
                            <button type="submit" className="bigdark-button">
                                Zaloguj się
                            </button>
                        </form>
                        <p className="link">
                            <a href="/register">
                                {' '}
                                Nie masz konta? Zarejestruj się...{' '}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
