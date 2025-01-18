import React from 'react';
import styles from './ContractSidebar.module.css';
import { useNavigate } from 'react-router-dom';
import {
    FaBeer,
    FaCalendarPlus,
    FaBook,
    FaClipboard,
    FaUsers,
    FaChartLine,
} from 'react-icons/fa';

const ContractSidebar = () => {
    const navigate = useNavigate();

    const goToOrders = () => navigate('/contract/orders');
    const goToCoworkers = () => navigate('/contract/coworkers');
    const goToBrewery = () => navigate('/contract/brewery');

    const goToNewOrder = () => navigate('/contract/orders/add/choose-brewery');
    const goToRecipes = () => navigate('/contract/recipes');
    const goToStatistics = () => navigate('/contract/statistics');

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
                <div onClick={goToBrewery} className={styles.sidebarItem}>
                    <FaBeer className={styles.icon} />
                    <div className={styles.sidebarText}>
                        <span>Mój browar</span>
                        <span className={styles.sidebarDescription}>
                            Przejdź do widoku browaru
                        </span>
                    </div>
                </div>
                <div onClick={goToOrders} className={styles.sidebarItem}>
                    <FaClipboard className={styles.icon} />
                    <div className={styles.sidebarText}>
                        <span>Moje zlecenia</span>
                        <span className={styles.sidebarDescription}>
                            Przejdź do widoku zleceń
                        </span>
                    </div>
                </div>
                <div onClick={goToNewOrder} className={styles.sidebarItem}>
                    <FaCalendarPlus className={styles.icon} />
                    <div className={styles.sidebarText}>
                        <span>Stwórz nowe zlecenie</span>
                        <span className={styles.sidebarDescription}>
                            Utwórz zlecenie
                        </span>
                    </div>
                </div>
                <hr className={styles.separator}></hr>
                <div onClick={goToRecipes} className={styles.sidebarItem}>
                    <FaBook className={styles.icon} />
                    <div className={styles.sidebarText}>
                        <span>Receptury</span>
                        <span className={styles.sidebarDescription}>
                            Przejdź do widoku receptur
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

export default ContractSidebar;
