import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaIdCard,
    FaUserTie,
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

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import IntermediarySidebar from '../../modules/intermediary/IntermediarySidebar.jsx';
import PageTitleWithButton from '../../utils/PageTitleWithButton.jsx';
import LoadingOverlay from '../../utils/LoadingOverlay.jsx';

import styles from './CommercialBreweryDetails.module.css';

import api from '../../../api.js';

/**
 * SelectTimeslots page - contains layout (Header, Sidebar, Title, Button)
 */
const CommercialBreweryDetails = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const breweryId = location.state?.breweryId || null;

    const [breweryData, setBreweryData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const viewTimeSlots = () => {
        navigate('/intermediary/commercial-breweries/brewery-timeslots', {
            state: { breweryId: breweryId },
        });
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get(
                    `commercial-brewery/${breweryId}/`
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
                    <PageTitleWithButton
                        text="Informacje o browarze"
                        buttonText="Wyświetl okna czasowe"
                        buttonFunction={viewTimeSlots}
                    />
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
                                    className={`${styles.infoCard} ${styles.nip}`}>
                                    <FaIdCard className={styles.icon} />
                                    <span>NIP:</span> <b>{breweryData.nip}</b>
                                </div>
                                <div
                                    className={`${styles.infoCard} ${styles.address}`}>
                                    <FaMapMarkerAlt className={styles.icon} />
                                    <span>Adres:</span>{' '}
                                    <b>{breweryData.address}</b>
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
                                <h3>Urządzenia</h3>
                                <div className={styles.deviceStats}>
                                    <div
                                        className={`${styles.deviceStatBox} ${styles.deviceStatBoxBt}`}>
                                        <FaBeer className={styles.deviceIcon} />
                                        <span className={styles.deviceLabel}>
                                            Ilość tanków warzelnych:
                                        </span>
                                        <span className={styles.deviceValue}>
                                            {breweryData.no_bt}
                                        </span>
                                    </div>
                                    <div
                                        className={`${styles.deviceStatBox} ${styles.deviceStatBoxFt}`}>
                                        <FaCogs className={styles.deviceIcon} />
                                        <span className={styles.deviceLabel}>
                                            Ilość pojemników fermentacyjnych:
                                        </span>
                                        <span className={styles.deviceValue}>
                                            {breweryData.no_ft}
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
                                            {breweryData.no_ac}
                                        </span>
                                    </div>
                                    <div
                                        className={`${styles.deviceStatBox} ${styles.deviceStatBoxBe}`}>
                                        <FaWineBottle
                                            className={styles.deviceIcon}
                                        />
                                        <span className={styles.deviceLabel}>
                                            Ilość urządzeń do rozlewania:
                                        </span>
                                        <span className={styles.deviceValue}>
                                            {breweryData.no_be}
                                        </span>
                                    </div>
                                </div>
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
                </div>
            </div>
        </div>
    );
};

export default CommercialBreweryDetails;
