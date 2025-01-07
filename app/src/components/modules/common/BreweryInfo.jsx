import React from 'react';

import styles from './BreweryInfo.module.css';

const BreweryInfo = ({ breweryData }) => {
    return (
        <div className={styles.content}>
            <div className={styles.section}>
                <h3>Informacje</h3>
                <p>
                    Nazwa browaru: <b>{breweryData.name}</b>
                </p>
                <p>
                    Email kontaktowy: <b>{breweryData.email}</b>
                </p>
                <p>
                    Telefon kontaktowy: <b>{breweryData.phone_number}</b>
                </p>
                {localStorage.getItem('userType') === 'commercial_brewery' && (
                    <>
                        <p>
                            NIP: <b>{breweryData.nip}</b>
                        </p>
                        <p>
                            Adres: <b>{breweryData.address}</b>
                        </p>
                    </>
                )}
                {localStorage.getItem('userType') === 'contract_brewery' && (
                    <>
                        <p>
                            Imię i nazwisko właściciela:{' '}
                            <b>{breweryData.ceo}</b>
                        </p>
                    </>
                )}
                <p>
                    Opis:
                    <p className={styles.descriptionText}>
                        {breweryData.description}
                    </p>
                </p>
            </div>
        </div>
    );
};

export default BreweryInfo;
