import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = () => {
	const navigate = useNavigate();


	const goToAboutUs = () => navigate('/');
	const goToManual = () => navigate('/manual');
	const goToLogin = () => navigate('/login');
	const goToRegisterBrewery = () => navigate('/register');

    return (
        <nav className="navigationbar">
            <div className="logo">brewIT</div>
            <div className="rest">
                <ul className="menu">
                    <li onClick={goToAboutUs}>Nasza misja</li>
                    <li onClick={goToManual}>Użytkowanie</li>
                </ul>
                <div className="button-group">
                    <button onClick={goToLogin} className="smalllight-button">Zaloguj</button>
                    <button onClick={goToRegisterBrewery} className="smalldark-button">Zarejestruj</button>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;
