import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaBeer,
    FaCogs,
    FaTachometerAlt,
    FaList,
    FaClock,
    FaCheck,
    FaTimes,
    FaHistory,
    FaWineBottle,
} from 'react-icons/fa';

import styles from './BreweryShortStats.module.css';

/**
 * BreweryShortStats - displays basic stats - number of devices, recipes, orders, coworkers
 * @param statsData - stats
 */
const BreweryShortStats = ({ statsData }) => {
    const navigate = useNavigate();

    const viewDevices = () => navigate('/commercial/devices');
    const viewOrders = () => {
        if (localStorage.getItem('userType') === 'commercial_brewery') {
            navigate('/commercial/orders');
        } else if (localStorage.getItem('userType') === 'contract_brewery') {
            navigate('/contract/orders');
        }
    };

    const viewRecipes = () => navigate('/contract/recipes');

    return (
        <div className={styles.content}>
            <div className={styles.section}>
            	{localStorage.getItem('userType') === 'commercial_brewery' && (
                    <>
                        <h3>Urządzenia</h3>
                        <div className={styles.deviceStats}>
                            <div
                                className={`${styles.deviceStatBox} ${styles.deviceStatBoxBt}`}>
                                <FaBeer className={styles.deviceIcon} />
                                <span className={styles.deviceLabel}>
                                    Ilość tanków warzelnych:
                                </span>
                                <span className={styles.deviceValue}>
                                    {statsData.no_bt}
                                </span>
                            </div>
                            <div
                                className={`${styles.deviceStatBox} ${styles.deviceStatBoxFt}`}>
                                <FaCogs className={styles.deviceIcon} />
                                <span className={styles.deviceLabel}>
                                    Ilość pojemników fermentacyjnych:
                                </span>
                                <span className={styles.deviceValue}>
                                    {statsData.no_ft}
                                </span>
                            </div>
                            <div
                                className={`${styles.deviceStatBox} ${styles.deviceStatBoxAc}`}>
                                <FaTachometerAlt
                                    className={styles.deviceIcon}
                                />
                                <span className={styles.deviceLabel}>
                                    Ilość kotłów do leżakowania:
                                </span>
                                <span className={styles.deviceValue}>
                                    {statsData.no_ac}
                                </span>
                            </div>
                            <div
                                className={`${styles.deviceStatBox} ${styles.deviceStatBoxBe}`}>
                                <FaWineBottle className={styles.deviceIcon} />
                                <span className={styles.deviceLabel}>
                                    Ilość urządzeń do rozlewania:
                                </span>
                                <span className={styles.deviceValue}>
                                    {statsData.no_be}
                                </span>
                            </div>
                        </div>
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
                <div className={styles.orderSection}>
                    <div className={styles.orderStatsContainer}>
                        <div className={styles.orderStatBoxGeneral}>
                            <FaList className={styles.orderIcon} />
                            <span className={styles.orderLabel}>
                                Ilość zleceń:
                            </span>
                            <span className={styles.orderValue}>
                                {statsData.no_orders}
                            </span>
                        </div>
                        <div className={styles.orderStats}>
                            <div
                                className={`${styles.orderStatBox} ${styles.orderStatBoxNew}`}>
                                <FaClock className={styles.orderIcon} />
                                <span className={styles.orderLabel}>
                                    Oczekujących:
                                </span>
                                <span className={styles.orderValue}>
                                    {statsData.no_new}
                                </span>
                            </div>
                            <div
                                className={`${styles.orderStatBox} ${styles.orderStatBoxCurrent}`}>
                                <FaCheck className={styles.orderIcon} />
                                <span className={styles.orderLabel}>
                                    Aktualnych:
                                </span>
                                <span className={styles.orderValue}>
                                    {statsData.no_current}
                                </span>
                            </div>
                            <div
                                className={`${styles.orderStatBox} ${styles.orderStatBoxPast}`}>
                                <FaHistory className={styles.orderIcon} />
                                <span className={styles.orderLabel}>
                                    Przeszłych:
                                </span>
                                <span className={styles.orderValue}>
                                    {statsData.no_past}
                                </span>
                            </div>
                            <div
                                className={`${styles.orderStatBox} ${styles.orderStatBoxRejected}`}>
                                <FaTimes className={styles.orderIcon} />
                                <span className={styles.orderLabel}>
                                    Odrzuconych:
                                </span>
                                <span className={styles.orderValue}>
                                    {statsData.no_rejected}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <span className={styles.viewAll} onClick={() => viewOrders()}>
                    Wyświetl wszystkie zlecenia...
                </span>
            </div>
        </div>
    );
};

export default BreweryShortStats;
