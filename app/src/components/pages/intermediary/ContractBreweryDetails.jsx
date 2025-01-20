import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    FaEnvelope,
    FaPhone,
    FaUserTie,
    FaUserAlt,
    FaList,
    FaClock,
    FaCheck,
    FaTimes,
    FaHistory,
} from 'react-icons/fa';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import IntermediarySidebar from '../../modules/intermediary/IntermediarySidebar.jsx';
import PageTitle from '../../utils/PageTitle.jsx';
import LoadingOverlay from '../../utils/LoadingOverlay.jsx';

import styles from './ContractBreweryDetails.module.css';

import api from '../../../api.js';

/**
 * SelectTimeslots page - contains layout (Header, Sidebar, Title, Button)
 */
const ContractBreweryDetails = () => {
    const navigate = useNavigate();

    const goToContractBreweries = () => navigate('/intermediary/contract-breweries');

    const location = useLocation();
    const breweryId = location.state?.breweryId || null;

    const [breweryData, setBreweryData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get(
                    `contract-brewery/${breweryId}/`
                );
                if (response.status === 200) {
                    setBreweryData(response.data);
                    setIsLoading(false);
                } else {
                    alert(
                        'Błąd podczas pobierania informacji o browarze! Odśwież stronę i spróbuj ponownie.'
                    );
                    setIsLoading(false);
                }
            } catch (error) {
                setIsLoading(false);
                alert('Błąd sieci! Odśwież stronę i spróbuj ponownie.');
            }
        };
        setIsLoading(true);
        getData();
    }, [breweryId]);

    return (
        <div>
            <LoadingOverlay isLoading={isLoading} />
            <DashboardHeader />
            <div className={styles.container}>
                <IntermediarySidebar />
                <div className={styles.content}>
                    <PageTitle text="Informacje o browarze" />
                    {breweryData !== null && (
                        <>
                            <div className={styles.section}>
                                <h3 className={styles.breweryName}>
                                    Browar - {breweryData.name}
                                </h3>
                                <div
                                    className={`${styles.infoCard} ${styles.email}`}>
                                    <FaEnvelope className={styles.icon} />
                                    <span>Email kontaktowy:</span>{' '}
                                    <b>{breweryData.email}</b>
                                </div>
                                <div
                                    className={`${styles.infoCard} ${styles.phone}`}>
                                    <FaPhone className={styles.icon} />
                                    <span>Telefon kontaktowy:</span>{' '}
                                    <b>{breweryData.phone_number}</b>
                                </div>
                                <div
                                    className={`${styles.infoCard} ${styles.ceo}`}>
                                    <FaUserAlt className={styles.icon} />
                                    <span>
                                        Imię i nazwisko właściciela:
                                    </span>{' '}
                                    <b>{breweryData.ceo}</b>
                                </div>
                                <div
                                    className={`${styles.infoCard} ${styles.employees}`}>
                                    <FaUserTie className={styles.icon} />
                                    <span>Ilość pracowników:</span>{' '}
                                    <b>{breweryData.no_employees}</b>
                                </div>
                                {breweryData.description !== '' && (
                                    <div className={styles.descriptionSection}>
                                        <h4>Opis:</h4>
                                        <p className={styles.descriptionText}>
                                            {breweryData.description}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className={styles.section}>
                                <h3>Zlecenia</h3>
                                <div className={styles.orderSection}>
                                    <div className={styles.orderStatsContainer}>
                                        <div
                                            className={
                                                styles.orderStatBoxGeneral
                                            }>
                                            <FaList
                                                className={styles.orderIcon}
                                            />
                                            <span className={styles.orderLabel}>
                                                Ilość zleceń:
                                            </span>
                                            <span className={styles.orderValue}>
                                                {breweryData.no_orders}
                                            </span>
                                        </div>
                                        <div className={styles.orderStats}>
                                            <div
                                                className={`${styles.orderStatBox} ${styles.orderStatBoxNew}`}>
                                                <FaClock
                                                    className={styles.orderIcon}
                                                />
                                                <span
                                                    className={
                                                        styles.orderLabel
                                                    }>
                                                    Oczekujących:
                                                </span>
                                                <span
                                                    className={
                                                        styles.orderValue
                                                    }>
                                                    {breweryData.no_new}
                                                </span>
                                            </div>
                                            <div
                                                className={`${styles.orderStatBox} ${styles.orderStatBoxCurrent}`}>
                                                <FaCheck
                                                    className={styles.orderIcon}
                                                />
                                                <span
                                                    className={
                                                        styles.orderLabel
                                                    }>
                                                    Aktualnych:
                                                </span>
                                                <span
                                                    className={
                                                        styles.orderValue
                                                    }>
                                                    {breweryData.no_current}
                                                </span>
                                            </div>
                                            <div
                                                className={`${styles.orderStatBox} ${styles.orderStatBoxPast}`}>
                                                <FaHistory
                                                    className={styles.orderIcon}
                                                />
                                                <span
                                                    className={
                                                        styles.orderLabel
                                                    }>
                                                    Przeszłych:
                                                </span>
                                                <span
                                                    className={
                                                        styles.orderValue
                                                    }>
                                                    {breweryData.no_past}
                                                </span>
                                            </div>
                                            <div
                                                className={`${styles.orderStatBox} ${styles.orderStatBoxRejected}`}>
                                                <FaTimes
                                                    className={styles.orderIcon}
                                                />
                                                <span
                                                    className={
                                                        styles.orderLabel
                                                    }>
                                                    Odrzuconych:
                                                </span>
                                                <span
                                                    className={
                                                        styles.orderValue
                                                    }>
                                                    {breweryData.no_rejected}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    <div className={styles.buttonContainer}>
                        <button
                            onClick={() => goToContractBreweries()}
                            className={styles.backButton}
                        >
                            Cofnij
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContractBreweryDetails;
