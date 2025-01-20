import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaUser,
    FaCalendarAlt,
    FaBuilding,
    FaMapMarkerAlt,
    FaBarcode,
    FaUserTie,
    FaInfoCircle,
} from 'react-icons/fa';

import styles from './AccountInfo.module.css';

/**
 * AccountInfo - shows account details - username, created_at and some important brewery info
 * @param accountInfo - data
 */
const AccountInfo = ({ accountInfo }) => {
    const navigate = useNavigate();

    const goToBrewery = () => {
        if (localStorage.getItem('userType') === 'commercial_brewery') {
            navigate('/commercial/brewery');
        } else if (localStorage.getItem('userType') === 'contract_brewery') {
            navigate('/contract/brewery');
        }
    };

    return (
        <div className={styles.content}>
            <div className={styles.section}>
                <h3 className={styles.header}>
                    <FaUser className={styles.icon} /> Dane konta
                </h3>
                <p>
                    <FaUserTie className={styles.icon} /> Nazwa użytkownika:{' '}
                    <b>{accountInfo.username}</b>
                </p>
                <p>
                    <FaCalendarAlt className={styles.icon} /> Data utworzenia
                    konta:{' '}
                    <b>
                        {new Date(accountInfo.created_at).toLocaleString(
                            'pl-PL'
                        )}
                    </b>
                </p>
            </div>
            {localStorage.getItem('userType') !== 'intermediary_company' && (
                <div className={styles.section}>
                    <h3 className={styles.header}>
                        <FaBuilding className={styles.icon} /> Przypisany browar
                    </h3>
                    <p>
                        <FaBuilding className={styles.icon} /> Nazwa browaru:{' '}
                        <b>{accountInfo.brewery_name}</b>
                    </p>
                    {localStorage.getItem('userType') ===
                        'commercial_brewery' && (
                        <>
                            <p>
                                <FaBarcode className={styles.icon} /> NIP:{' '}
                                <b>{accountInfo.brewery_nip}</b>
                            </p>
                            <p>
                                <FaMapMarkerAlt className={styles.icon} />{' '}
                                Adres: <b>{accountInfo.brewery_address}</b>
                            </p>
                        </>
                    )}
                    {localStorage.getItem('userType') ===
                        'contract_brewery' && (
                        <>
                            <p>
                                <FaUserTie className={styles.icon} /> CEO:{' '}
                                <b>{accountInfo.brewery_ceo}</b>
                            </p>
                        </>
                    )}
                    {accountInfo.brewery_description !== '' && (
                        <p>
                            <FaInfoCircle className={styles.icon} /> Opis:
                            <p className={styles.descriptionText}>
                                {accountInfo.brewery_description}
                            </p>
                        </p>
                    )}
                    <span
                        className={styles.viewAll}
                        onClick={() => goToBrewery()}>
                        Wyświetl stronę browaru...
                    </span>
                </div>
            )}
        </div>
    );
};

export default AccountInfo;
