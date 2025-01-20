import React, { useState, useEffect } from 'react';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import IntermediarySidebar from '../../modules/intermediary/IntermediarySidebar.jsx';
import PageTitle from '../../utils/PageTitle.jsx';
import LoadingOverlay from '../../utils/LoadingOverlay.jsx';

import styles from './Users.module.css';

import api from '../../../api.js';
import ShowUsers from '../../modules/intermediary/ShowUsers.jsx';

const Users = () => {
    const [users, setUsers] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(`users/`);
                if (response.status === 200) {
                    setIsLoading(false);
                    setUsers(response.data);
                } else {
                    setIsLoading(false);
                    alert(
                        'Błąd podczas pobierania użytkowników! Odśwież stronę i spróbuj ponownie.'
                    );
                }
            } catch (error) {
                setIsLoading(false);
                alert('Błąd sieci! Odśwież stronę i spróbuj ponownie.');
            }
        };
        getData();
    }, []);

    return (
        <div>
            <LoadingOverlay isLoading={isLoading} />
            <DashboardHeader />
            <div className={styles.container}>
                <IntermediarySidebar />
                <div className={styles.content}>
                    <PageTitle text="Użytkownicy" />
                    {users !== null && <ShowUsers users={users} />}
                </div>
            </div>
        </div>
    );
};

export default Users;
