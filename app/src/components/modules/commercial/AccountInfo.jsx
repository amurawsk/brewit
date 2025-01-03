import React from 'react';
import styles from './AccountInfo.module.css';
import { useNavigate } from 'react-router-dom';

const AccountInfo = () => {
    // TODO mock
    const accountInfo = {username: "testowy", created_at: '2024-01-01T10:00:00.000Z', brewery_name: "ABC", brewery_nip: '12345678901', brewery_description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem, tenetur facilis deserunt, dicta dolores, sint at quisquam cumque voluptas inventore vero doloribus. Voluptatem voluptatum deleniti veniam unde fugiat pariatur fuga!'};

    const navigate = useNavigate();

    const goToBrewery = () => navigate('/commercial/brewery');

    return (
        <div className={styles.content}>
            <div className={styles.section}>
                <h3>Dane konta</h3>
                <p>
                    Nazwa użytkownika: <b>{accountInfo.username}</b>
                </p>
                <p>
                    Data utworzenia konta: <b>{new Date(accountInfo.created_at).toLocaleString('pl-PL')}</b>
                </p>
            </div>
            <div className={styles.section}>
                <h3>Przypisany browar</h3>
                <p>
                    Nazwa browaru: <b>{accountInfo.brewery_name}</b>
                </p>
                <p>
                    NIP: <b>{accountInfo.brewery_nip}</b>
                </p>
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
