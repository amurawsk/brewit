import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaBeer,
    FaGlassCheers,
    FaClipboard,
    FaUsers,
    FaChartLine,
} from 'react-icons/fa';

import styles from './IntermediarySidebar.module.css';

/**
 * Defines sidebar for intermediary company, allows to navigate through the pages
 */
const IntermediarySidebar = () => {
    const navigate = useNavigate();

    const goToContractBreweries = () =>
        navigate('/intermediary/contract-breweries');
    const goToCommercialBreweries = () =>
        navigate('/intermediary/commercial-breweries');
    const goToOrders = () => navigate('/intermediary/orders');
    const goToCoworkers = () => navigate('/intermediary/coworkers');
    const goToStatistics = () => navigate('/intermediary/statistics');

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <span className={styles.sidebarHeaderSmall}>Panel boczny</span>
                <span className={styles.sidebarHeaderLarge}>
                    Wybierz zakładkę
                </span>
            </div>
            <div className={styles.sidebarMenu}>
                <hr className={styles.separator}></hr>
                <div
                    onClick={goToContractBreweries}
                    className={styles.sidebarItem}>
                    <FaBeer className={styles.icon} />
                    <div className={styles.sidebarText}>
                        <span>Browary kontraktowe</span>
                        <span className={styles.sidebarDescription}>
                            Przejdź do browarów kontraktowych
                        </span>
                    </div>
                </div>
                <div
                    onClick={goToCommercialBreweries}
                    className={styles.sidebarItem}>
                    <FaGlassCheers className={styles.icon} />
                    <div className={styles.sidebarText}>
                        <span>Browary komercyjne</span>
                        <span className={styles.sidebarDescription}>
                            Przejdź do browarów komercyjnych
                        </span>
                    </div>
                </div>
                <hr className={styles.separator}></hr>
                <div onClick={goToOrders} className={styles.sidebarItem}>
                    <FaClipboard className={styles.icon} />
                    <div className={styles.sidebarText}>
                        <span>Zlecenia</span>
                        <span className={styles.sidebarDescription}>
                            Przejdź do widoku zleceń
                        </span>
                    </div>
                </div>
                <div onClick={goToCoworkers} className={styles.sidebarItem}>
                    <FaUsers className={styles.icon} />
                    <div className={styles.sidebarText}>
                        <span>Współpracownicy</span>
                        <span className={styles.sidebarDescription}>
                            Przejdź do widoku współpracowników
                        </span>
                    </div>
                </div>
                <hr className={styles.separator}></hr>
                <div onClick={goToStatistics} className={styles.sidebarItem}>
                    <FaChartLine className={styles.icon} />
                    <div className={styles.sidebarText}>
                        <span>Statystyki</span>
                        <span className={styles.sidebarDescription}>
                            Wyświetl statystyki
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntermediarySidebar;
