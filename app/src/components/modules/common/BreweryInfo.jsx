import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard, FaUserTie } from 'react-icons/fa';
import styles from './BreweryInfo.module.css';

/**
 * BreweryInfo - shows brewery details - name, email, phone_number, ceo / nip, no_employees
 * @param breweryData - data
 */
const BreweryInfo = ({ breweryData }) => {
    return (
        <div className={styles.content}>
            <div className={styles.section}>
                <h3 className={styles.breweryName}>Browar - {breweryData.name}</h3>
                <div className={`${styles.infoCard} ${styles.email}`}>
                    <FaEnvelope className={styles.icon} />
                    <span>Email kontaktowy:</span> <b>{breweryData.email}</b>
                </div>
                <div className={`${styles.infoCard} ${styles.phone}`}>
                    <FaPhone className={styles.icon} />
                    <span>Telefon kontaktowy:</span> <b>{breweryData.phone_number}</b>
                </div>
                {localStorage.getItem('userType') === 'commercial_brewery' && (
                    <>
                        <div className={`${styles.infoCard} ${styles.nip}`}>
                            <FaIdCard className={styles.icon} />
                            <span>NIP:</span> <b>{breweryData.nip}</b>
                        </div>
                        <div className={`${styles.infoCard} ${styles.address}`}>
                            <FaMapMarkerAlt className={styles.icon} />
                            <span>Adres:</span> <b>{breweryData.address}</b>
                        </div>
                    </>
                )}
                {localStorage.getItem('userType') === 'contract_brewery' && (
                    <div className={`${styles.infoCard} ${styles.ceo}`}>
                        <FaUserTie className={styles.icon} />
                        <span>Imię i nazwisko właściciela:</span> <b>{breweryData.ceo}</b>
                    </div>
                )}
                
                <div className={`${styles.infoCard} ${styles.employees}`}>
                    <FaUserTie className={styles.icon} />
                    <span>Ilość pracowników:</span> <b>{breweryData.no_employees}</b>
                </div>

                {breweryData.description !== '' &&
                    <div className={styles.descriptionSection}>
                        <h4>Opis:</h4>
                        <p className={styles.descriptionText}>{breweryData.description}</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default BreweryInfo;
