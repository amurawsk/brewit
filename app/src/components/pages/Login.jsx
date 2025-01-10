import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../modules/NavigationBar.jsx';
import api from '../../api.js';
import styles from './Login.module.css';

const Login = () => {
    const navigate = useNavigate();

    const goToCommercialDashboard = () => navigate('/commercial/dashboard');
    const goToContractBrewery = () => navigate('/contract/dashboard');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        try {
            const response = await api.post('login/', { username, password });

            if (response.status === 200) {
                const { refresh, access, user_type, user_id, brewery_id } = response.data;

                localStorage.setItem('ACCESS_TOKEN', access);
                localStorage.setItem('REFRESH_TOKEN', refresh);
                localStorage.setItem('userType', user_type);
                localStorage.setItem('userId', user_id);
                localStorage.setItem('breweryId', brewery_id);

                if (user_type === 'commercial_brewery') {
                    goToCommercialDashboard();
                } else if (user_type === 'contract_brewery') {
                    goToContractBrewery();
                } else {
                    console.log('ERROR');
                    //GoToSuperuser
                }
            } else {
                console.log(response);
                // TODO: This never happens because it's handled by try-catch
            }
        } catch (error) {
            setErrorMessage('Niepoprawne dane logowania');
            console.log(error);
        }
    };

    return (
        <div>
            <NavigationBar />
            <div className={styles.pageWrapper}>
                <div className={styles.myformPlace}>
                    <h4>Zaloguj się</h4>
                    <hr className={styles.divider} />
                    <div className={styles.myformForm}>
                        <form className={styles.myform} onSubmit={handleLogin}>
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
                            <div className={styles.errorMessage}>
                                {errorMessage}
                            </div>
                            <button type="submit" className={styles.darkButton}>
                                Zaloguj się
                            </button>
                        </form>
                        <p className={styles.link}>
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
