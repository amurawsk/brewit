import React from 'react';
import styles from './AccountInfo.module.css';
import { useNavigate } from 'react-router-dom';

const AccountInfo = ({accountInfo, fromPage}) => {
    // TODO mock
    const navigate = useNavigate();

    const goToBrewery = () => {
        if (fromPage === 'commercial') {
            navigate('/commercial/brewery');
        } else if (fromPage === 'contract') {
            navigate('/contract/brewery');
        } else {
            // TODO handle error
        }
    }
    
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
                {fromPage === 'commercial' && (
                    <p>
                        NIP: <b>{accountInfo.brewery_nip}</b>
                    </p>
                )}
                {fromPage === 'contract' && (
                    <p>
                        Dane właściciela: <b>{accountInfo.brewery_owner_name}</b>
                    </p>
                )}
                <p>
                    Opis:
                    <p className={styles.descriptionText}>
                        {accountInfo.brewery_description}
                    </p>
                </p>
                <span className={styles.viewAll} onClick={() => goToBrewery()}>
                    Wyświetl stronę browaru...
                </span>
            </div>
        </div>
    );
};

export default AccountInfo;
