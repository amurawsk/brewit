import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './BreweryShortStats.module.css';

const BreweryShortStats = ({ statsData }) => {
    const navigate = useNavigate();

    const viewDevices = () => navigate('/commercial/devices');
    const viewOrders = () => {
        if (localStorage.getItem('userType') === 'commercial_brewery') {
            navigate('/commercial/orders');
        } else if (localStorage.getItem('userType') === 'contract_brewery') {
            navigate('/contract/orders');
        } else {
            // TODO handle error
        }
    };
    const viewCoworkers = () => {
        if (localStorage.getItem('userType') === 'commercial_brewery') {
            navigate('/commercial/coworkers');
        } else if (localStorage.getItem('userType') === 'contract_brewery') {
            navigate('/contract/coworkers');
        } else {
            // TODO handle error
        }
    };

    const viewRecipes = () => navigate('/contract/recipes');

    return (
        <div className={styles.content}>
            <div className={styles.section}>
                {localStorage.getItem('userType') === 'commercial_brewery' && (
                    <>
                        <h3>Urządzenia</h3>
                        <p>
                            Ilość urządzeń: <b>{statsData.no_devices}</b>
                        </p>
                        <p className={styles.indentText}>
                            - tanków warzelnych: <b>{statsData.no_bt}</b>
                        </p>
                        <p className={styles.indentText}>
                            - pojemników fermentacyjnych:{' '}
                            <b>{statsData.no_ft}</b>
                        </p>
                        <p className={styles.indentText}>
                            - kotłów do leżakowania: <b>{statsData.no_ac}</b>
                        </p>
                        <p className={styles.indentText}>
                            - urządzeń do rozlewania: <b>{statsData.no_be}</b>
                        </p>
                        <span
                            className={styles.viewAll}
                            onClick={() => viewDevices()}>
                            Wyświetl wszystkie urządzenia...
                        </span>
                    </>
                )}
                {localStorage.getItem('userType') === 'contract_brewery' && (
                    <>
                        <p>
                            Przepisy: <b>{statsData.no_recipes}</b>
                        </p>
                        <span
                            className={styles.viewAll}
                            onClick={() => viewRecipes()}>
                            Wyświetl wszystkie przepisy...
                        </span>
                    </>
                )}
            </div>
            <div className={styles.section}>
                <h3>Zlecenia</h3>
                <p>
                    Ilość zleceń: <b>{statsData.no_orders}</b>
                </p>
                <p className={styles.indentText}>
                    - oczekujących: <b>{statsData.no_new}</b>
                </p>
                <p className={styles.indentText}>
                    - aktualnych: <b>{statsData.no_current}</b>
                </p>
                <p className={styles.indentText}>
                    - przeszłych: <b>{statsData.no_past}</b>
                </p>
                <p className={styles.indentText}>
                    - odrzuconych: <b>{statsData.no_rejected}</b>
                </p>
                <span className={styles.viewAll} onClick={() => viewOrders()}>
                    Wyświetl wszystkie zlecenia...
                </span>
            </div>
            <div className={styles.section}>
                <h3>Pracownicy</h3>
                <p>
                    Ilość pracowników: <b>{statsData.no_employees}</b>
                </p>
                <span
                    className={styles.viewAll}
                    onClick={() => viewCoworkers()}>
                    Wyświetl wszystkich współpracowników...
                </span>
            </div>
        </div>
    );
};

export default BreweryShortStats;
