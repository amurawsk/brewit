import React from 'react';
import styles from './AccountInfo.module.css';
import { useNavigate } from 'react-router-dom';

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
        } else {
            // TODO handle error
        }
    };

    return (
        <div className={styles.content}>
            <div className={styles.section}>
                <h3>Dane konta</h3>
                <p>
                    Nazwa użytkownika: <b>{accountInfo.username}</b>
                </p>
                <p>
                    Data utworzenia konta:{' '}
                    <b>
                        {new Date(accountInfo.created_at).toLocaleString(
                            'pl-PL'
                        )}
                    </b>
                </p>
            </div>
            <div className={styles.section}>
                <h3>Przypisany browar</h3>
                <p>
                    Nazwa browaru: <b>{accountInfo.brewery_name}</b>
                </p>
                {localStorage.getItem('userType') === 'commercial_brewery' && (
                    <>
                        <p>
                            NIP: <b>{accountInfo.brewery_nip}</b>
                        </p>
                        <p>
                            Adres: <b>{accountInfo.brewery_address}</b>
                        </p>
                    </>
                )}
                {localStorage.getItem('userType') === 'contract_brewery' && (
                    <>
                        <p>
                            CEO: <b>{accountInfo.brewery_ceo}</b>
                        </p>
                    </>
                )}
                {accountInfo.brewery_description !== '' &&
                    <p>
                    Opis:
                    <p className={styles.descriptionText}>
                        {accountInfo.brewery_description}
                    </p>
                </p>
                }
                <span className={styles.viewAll} onClick={() => goToBrewery()}>
                    Wyświetl stronę browaru...
                </span>
            </div>
        </div>
    );
};

export default AccountInfo;
