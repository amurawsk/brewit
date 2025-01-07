import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NavigationBar.module.css';

const NavigationBar = () => {
    const navigate = useNavigate();

    const goToAboutUs = () => navigate('/');
    const goToManual = () => navigate('/manual');
    const goToLogin = () => navigate('/login');
    const goToRegisterBrewery = () => navigate('/register');

    return (
        <nav className={styles.navigationBar}>
            <div className={styles.logo}>brewIT</div>
            <div className={styles.rest}>
                <ul className={styles.menu}>
                    <li onClick={goToAboutUs}>Nasza misja</li>
                    <li onClick={goToManual}>Użytkowanie</li>
                </ul>
                <div className={styles.buttonGroup}>
                    <button onClick={goToLogin} className={styles.lightButton}>
                        Zaloguj
                    </button>
                    <button
                        onClick={goToRegisterBrewery}
                        className={styles.darkButton}>
                        Zarejestruj
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;
