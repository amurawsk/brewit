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
	FaListOl
} from 'react-icons/fa';

const CommercialSidebar = () => {
    const navigate = useNavigate();

    const goToRecipes = () => navigate('/contract/recipes');
    const goToOrders = () => navigate('/contract/orders');
    const goToCoworkers = () => navigate('/contract/coworkers');
    const goToBrewery = () => navigate('/contract/brewery');
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
                <div onClick={goToRecipes} className={styles.sidebarItem}>
					<FaListOl className={styles.icon} />
					<div className={styles.sidebarText}>
						<span>Przepisy</span>
						<span className={styles.sidebarDescription}>
							Przejdź do widoku przepisów
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

export default CommercialSidebar;
