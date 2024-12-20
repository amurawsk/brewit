import React from 'react';
import styles from './CommercialSidebar.module.css';
import { useNavigate } from 'react-router-dom';
import {
    FaBeer,
    FaTools,
    FaClock,
    FaClipboard,
    FaUsers,
    FaChartLine,
} from 'react-icons/fa';

const CommercialSidebar = () => {
    const navigate = useNavigate();

    const goToDevices = () => navigate('/device');
    const goToTimeSlots = () => navigate('/time_slots');

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
                <div className={styles.sidebarItem}>
                    <FaBeer className={styles.icon} />
                    <div className={styles.sidebarText}>
                        <span>Mój browar</span>
                        <span className={styles.sidebarDescription}>
                            Przejdź do widoku browaru
                        </span>
                    </div>
                </div>
                <div onClick={goToDevices} className={styles.sidebarItem}>
                    <FaTools className={styles.icon} />
                    <div className={styles.sidebarText}>
                        <span>Urządzenia</span>
                        <span className={styles.sidebarDescription}>
                            Przejdź do widoku urządzeń
                        </span>
                    </div>
                </div>
                <div onClick={goToTimeSlots} className={styles.sidebarItem}>
                    <FaClock className={styles.icon} />
                    <div className={styles.sidebarText}>
                        <span>Okna Czasowe</span>
                        <span className={styles.sidebarDescription}>
                            Przejdź do widoku okien czasowych
                        </span>
                    </div>
                </div>
                <hr className={styles.separator}></hr>
                <div className={styles.sidebarItem}>
                    <FaClipboard className={styles.icon} />
                    <div className={styles.sidebarText}>
                        <span>Zlecenia</span>
                        <span className={styles.sidebarDescription}>
                            Przejdź do widoku zleceń
                        </span>
                    </div>
                </div>
                <div className={styles.sidebarItem}>
                    <FaUsers className={styles.icon} />
                    <div className={styles.sidebarText}>
                        <span>Współpracownicy</span>
                        <span className={styles.sidebarDescription}>
                            Przejdź do widoku współpracowników
                        </span>
                    </div>
                </div>
                <hr className={styles.separator}></hr>
                <div className={styles.sidebarItem}>
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

export default CommercialSidebar;
